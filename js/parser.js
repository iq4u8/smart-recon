/* ==========================================================================
   RECONIQ — DATA PARSER & COLUMN DETECTOR (DEFENSIVE & SECURE)
   Enterprise-Grade CSV / TSV Ingestion, Flexible Date Normalization & XSS Defense
   ========================================================================== */

window.ReconParser = {
  // Sanitize string to prevent DOM injection and control characters
  sanitizeString: function(val) {
    if (val === null || val === undefined) return "";
    return String(val)
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // Strip control characters
      .trim();
  },

  // Normalize any date format (DD/MM/YYYY, DD-MM-YYYY, YYYY-MM-DD, DD-MMM-YYYY) into ISO YYYY-MM-DD
  parseFlexibleDate: function(dateStr) {
    if (!dateStr) return "";
    const cleanStr = String(dateStr).trim().split(" ")[0]; // Strip timestamp if present

    // Match DD/MM/YYYY or DD-MM-YYYY
    const dmyMatch = cleanStr.match(/^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})$/);
    if (dmyMatch) {
      const day = dmyMatch[1].padStart(2, '0');
      const month = dmyMatch[2].padStart(2, '0');
      const year = dmyMatch[3];
      return `${year}-${month}-${day}`;
    }

    // Match YYYY-MM-DD or YYYY/MM/DD
    const ymdMatch = cleanStr.match(/^(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})$/);
    if (ymdMatch) {
      const year = ymdMatch[1];
      const month = ymdMatch[2].padStart(2, '0');
      const day = ymdMatch[3].padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    // Match DD-Mon-YYYY (e.g. 31-Mar-2026 or 31 Mar 2026)
    const monthMap = {
      jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06",
      jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12"
    };
    const monMatch = cleanStr.match(/^(\d{1,2})[\s\-\/\.]?([a-zA-Z]{3})[\s\-\/\.]?(\d{4})$/);
    if (monMatch) {
      const day = monMatch[1].padStart(2, '0');
      const monthName = monMatch[2].toLowerCase();
      const year = monMatch[3];
      if (monthMap[monthName]) {
        return `${year}-${monthMap[monthName]}-${day}`;
      }
    }

    return cleanStr;
  },

  // Clean financial number string into float (handles Indian commas, currency symbols, and signs)
  parseCurrency: function(value) {
    if (value === null || value === undefined || value === "") return 0;
    if (typeof value === "number") return isNaN(value) ? 0 : value;

    let str = String(value).trim();
    // Check for negative in parentheses: (1200.50) or prefix/suffix minus: -1200 or 1200-
    let isNegative = /^\(.*\)$/.test(str) || str.startsWith("-") || str.endsWith("-");
    
    // Check for explicit Dr suffix (indicating debit/withdrawal in Indian banking statements)
    let isDr = /\bdr\b/i.test(str);

    // Strip currency symbols (₹, $, Rs, EUR), commas, spaces
    let cleaned = str.replace(/[^0-9.]/g, "");
    let num = parseFloat(cleaned);
    if (isNaN(num)) return 0;

    return isNegative ? -num : num;
  },

  // Helper to identify whether a row contains semantic table column headers
  isLikelyHeaderRow: function(cells) {
    if (!cells || !Array.isArray(cells) || cells.length < 2) return false;
    let score = 0;
    const keywords = /\b(date|dt|txn.*date|value.*date|posting.*date|ref|chq|cheque|utr|particulars?|narration|desc|description|debit|withdrawal|credit|deposit|payment|receipt|balance|amount|dr|cr)\b/i;
    cells.forEach(c => {
      const str = String(c || "").trim();
      if (str && keywords.test(str)) score++;
    });
    return score >= 2;
  },

  // Parse Excel (.xlsx, .xls) workbook ArrayBuffer using SheetJS (XLSX)
  parseWorkbook: function(arrayBuffer) {
    if (typeof window.XLSX === "undefined" || !window.XLSX.read) {
      throw new Error("Excel parsing engine (SheetJS) is unavailable. Please upload as CSV or ensure internet connection for SheetJS.");
    }

    const wb = window.XLSX.read(new Uint8Array(arrayBuffer), { type: "array" });
    if (!wb || !wb.SheetNames || wb.SheetNames.length === 0) {
      throw new Error("Uploaded Excel workbook contains no sheets.");
    }

    // Pick first worksheet with data
    let targetSheet = null;
    let rawRows = [];
    for (const name of wb.SheetNames) {
      const sheet = wb.Sheets[name];
      const rows = window.XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, defval: "" });
      if (rows && rows.length > 1) {
        targetSheet = sheet;
        rawRows = rows;
        break;
      }
    }

    if (!targetSheet || rawRows.length < 2) {
      throw new Error("No data rows found in uploaded Excel file.");
    }

    // Locate actual table header row (skipping bank statement preambles like A/c No, IFSC, Address)
    let headerIdx = 0;
    for (let i = 0; i < Math.min(rawRows.length, 30); i++) {
      if (this.isLikelyHeaderRow(rawRows[i])) {
        headerIdx = i;
        break;
      }
    }

    const rawHeaders = rawRows[headerIdx] || [];
    const headers = rawHeaders.map((h, i) => {
      const clean = String(h || "").trim();
      return clean || ("Col_" + (i + 1));
    });

    const records = [];
    for (let i = headerIdx + 1; i < rawRows.length; i++) {
      const rowVals = rawRows[i];
      if (!rowVals || !Array.isArray(rowVals)) continue;
      // Skip completely empty rows
      if (rowVals.every(v => String(v || "").trim() === "")) continue;

      const record = {};
      headers.forEach((h, colIdx) => {
        record[h] = rowVals[colIdx] !== undefined ? String(rowVals[colIdx]).trim() : "";
      });
      records.push(record);
    }

    return { headers, records };
  },

  // Parse CSV / TSV / Delimited plain text line by line respecting quotes & whitespace
  parseCSVText: function(text) {
    if (!text || typeof text !== "string") return { headers: [], records: [] };
    const rawLines = text.split(/\r\n|\n|\r/).map(l => l.trim()).filter(l => l.length > 0);
    if (rawLines.length < 2) return { headers: [], records: [] };

    // Auto-detect delimiter from the top lines (comma, tab, semicolon, pipe)
    const sample = rawLines.slice(0, 10).join("\n");
    const counts = {
      ",": (sample.match(/,/g) || []).length,
      "\t": (sample.match(/\t/g) || []).length,
      ";": (sample.match(/;/g) || []).length,
      "|": (sample.match(/\|/g) || []).length
    };
    let delim = ",";
    let maxCount = 0;
    for (const [d, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxCount = count;
        delim = d;
      }
    }

    const parseLine = (line) => {
      const result = [];
      let cur = "";
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"' || char === "'") {
          // Double quote inside quotes escapes quote
          if (inQuotes && line[i + 1] === char) {
            cur += char;
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if ((char === delim || (delim === "," && char === "\t")) && !inQuotes) {
          result.push(cur.trim().replace(/^["']|["']$/g, ""));
          cur = "";
        } else {
          cur += char;
        }
      }
      result.push(cur.trim().replace(/^["']|["']$/g, ""));
      return result;
    };

    // Locate header row in text (skipping preamble/header text)
    let headerIdx = 0;
    for (let i = 0; i < Math.min(rawLines.length, 15); i++) {
      const cells = parseLine(rawLines[i]);
      if (this.isLikelyHeaderRow(cells)) {
        headerIdx = i;
        break;
      }
    }

    const rawHeaders = parseLine(rawLines[headerIdx]);
    const headers = rawHeaders.map((h, i) => {
      const clean = h.replace(/["']/g, "").trim();
      return clean || ("Col_" + (i + 1));
    });
    const records = [];

    for (let i = headerIdx + 1; i < rawLines.length; i++) {
      const values = parseLine(rawLines[i]);
      // Only include rows that have at least one non-empty value
      if (values.some(v => v !== "")) {
        const row = {};
        headers.forEach((h, idx) => {
          row[h] = values[idx] !== undefined ? values[idx].trim() : "";
        });
        records.push(row);
      }
    }
    return { headers, records };
  },

  // Detect semantic columns from arbitrary header names with prioritized matching
  detectColumns: function(headers) {
    const cleanHeaders = headers.map(h => h.trim());

    // Priority 1: Explicit Debit / Withdrawal vs Credit / Deposit
    let debitCol = cleanHeaders.find(h => /\bdebit\b|\bwithdrawal\b|\bwithdrawals\b|\bdr\b|\bdr\.|\bdr\s+amount/i.test(h));
    let creditCol = cleanHeaders.find(h => /\bcredit\b|\bdeposit\b|\bdeposits\b|\bcr\b|\bcr\.|\bcr\s+amount/i.test(h));

    // Priority 2: Fallback to Payment / Outflow vs Receipt / Inflow
    if (!debitCol) {
      debitCol = cleanHeaders.find(h => /\b(payment|payments|outflow|paid)\b/i.test(h));
    }
    if (!creditCol) {
      creditCol = cleanHeaders.find(h => /\b(receipt|receipts|inflow|received)\b/i.test(h));
    }

    const dateCol = cleanHeaders.find(h => /\b(date|dt|trans.*date|txn.*date|value.*date)\b/i.test(h));
    const refCol = cleanHeaders.find(h => /\b(ref|cheque|chq|utr|txn.*id|reference|chq.*no|instrument|doc.*no)\b/i.test(h));
    const descCol = cleanHeaders.find(h => /\b(desc|particular|particulars|narration|details|remark|counterparty)\b/i.test(h));
    const balCol = cleanHeaders.find(h => /\b(balance|bal|closing.*bal|running.*bal)\b/i.test(h));

    return {
      date: dateCol,
      refNo: refCol,
      description: descCol,
      debit: debitCol,
      credit: creditCol,
      balance: balCol
    };
  },

  // Normalize parsed records into standardized Cash Book schema
  normalizeCashBook: function(records, mapping) {
    return records
      .map((r, idx) => {
        const debit = this.parseCurrency(r[mapping.debit]);
        const credit = this.parseCurrency(r[mapping.credit]);
        // Ignore rows that have 0 debit AND 0 credit AND no description
        if (debit === 0 && credit === 0 && !r[mapping.description]) return null;

        return {
          id: "CB-" + (idx + 1),
          date: this.parseFlexibleDate(r[mapping.date]),
          refNo: this.sanitizeString(r[mapping.refNo]),
          description: this.sanitizeString(r[mapping.description] || "Transaction " + (idx + 1)),
          debit: debit,
          credit: credit
        };
      })
      .filter(item => item !== null);
  },

  // Normalize parsed records into standardized Bank Statement schema
  normalizeBankStatement: function(records, mapping) {
    return records
      .map((r, idx) => {
        const withdrawal = this.parseCurrency(r[mapping.debit]); // In bank: debit is withdrawal
        const deposit = this.parseCurrency(r[mapping.credit]);    // In bank: credit is deposit
        if (withdrawal === 0 && deposit === 0 && !r[mapping.description]) return null;

        return {
          id: "BK-" + (idx + 1),
          date: this.parseFlexibleDate(r[mapping.date]),
          refNo: this.sanitizeString(r[mapping.refNo]),
          description: this.sanitizeString(r[mapping.description] || "Bank Entry " + (idx + 1)),
          withdrawal: withdrawal,
          deposit: deposit
        };
      })
      .filter(item => item !== null);
  }
};
