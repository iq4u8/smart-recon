/* ==========================================================================
   IQ RECON — EXPORT & REPORT GENERATOR (SECURE & MULTI-LANGUAGE CA-COMPLIANT)
   CSV Injection Hardened & XSS-Sanitized Audit Statements
   Author: Priyanshu Pandey (IQ4U8)
   ========================================================================== */

// Universal Fail-Safe CSV Saver (Handles UTF-8 BOM, FileSaver, and Chrome 60s Revocation)
window.reconSaveCSV = function(csvContent, filename) {
  if (!filename) filename = "Reconciliation_Export.csv";
  if (!filename.toLowerCase().endsWith(".csv")) {
    filename += ".csv";
  }

  // Prepend UTF-8 BOM if not already present
  const contentWithBOM = (csvContent && csvContent.charCodeAt(0) === 0xFEFF)
    ? csvContent 
    : "\uFEFF" + (csvContent || "");

  const blob = new Blob([contentWithBOM], { type: "text/csv;charset=utf-8;" });

  // 1. If FileSaver.js saveAs is available, prioritize it
  if (typeof window.saveAs === "function") {
    try {
      window.saveAs(blob, filename);
      return;
    } catch (err) {
      console.warn("FileSaver saveAs failed, falling back to robust native anchor:", err);
    }
  }

  // 2. Robust Native HTML5 <a> tag download
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.setAttribute("href", blobUrl);
  a.setAttribute("download", filename);
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);

  // Dispatch real mouse event
  try {
    const clickEvt = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window
    });
    a.dispatchEvent(clickEvt);
  } catch (e) {
    a.click();
  }

  // CRITICAL: Keep alive for 60 seconds so Chrome download manager never loses metadata and never falls back to a UUID!
  setTimeout(() => {
    try {
      if (a.parentNode) a.parentNode.removeChild(a);
    } catch (e) {}
    URL.revokeObjectURL(blobUrl);
  }, 60000);
};

window.ReconExport = {
  saveCSV: window.reconSaveCSV,
  // HTML entity sanitizer to prevent XSS in dynamic reports
  escapeHtml: function(text) {
    if (text === null || text === undefined) return "";
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  },

  // Format currency with Indian Rupee commas
  formatCurrency: function(amount) {
    if (amount === undefined || amount === null || isNaN(amount)) return "₹0.00";
    return "₹" + Number(amount).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  },

  // Defend against CSV Formula Injection (=, +, -, @) and format CSV cell
  sanitizeCSVCell: function(value) {
    if (value === null || value === undefined) return '""';
    let str = String(value).trim();
    // Neutralize formula injection risk
    if (/^[=+\-@\t\r]/.test(str)) {
      str = "'" + str;
    }
    // Escape internal double quotes
    return `"${str.replace(/"/g, '""')}"`;
  },

  // Export matched and discrepancy records as a downloadable CSV
  downloadReconCSV: function(reconResult) {
    if (!reconResult) return;
    const { summary, alignedRows, matchedPairs, timingDifferences, missingInCashBook, discrepancies, metadata } = reconResult;
    const sc = this.sanitizeCSVCell.bind(this);

    const lines = [];

    // 1. Executive BRS Audit Metadata Header
    const company = (metadata && metadata.companyName) || "Company Cash Book";
    const bank = (metadata && metadata.bankName) || "Corporate Bank Account";
    const reconDate = (metadata && metadata.reconciliationDate) || new Date().toISOString().slice(0, 10);
    const isBalanced = summary && (summary.isPerfectReconciliation || Math.abs(summary.variance) < 0.05);

    lines.push([sc("IQ4U8 SMART RECONCILIATION AUDIT STATEMENT"), sc("")].join(","));
    lines.push([sc("Entity Name"), sc(company)].join(","));
    lines.push([sc("Bank Account"), sc(bank)].join(","));
    lines.push([sc("Reconciliation As Of"), sc(reconDate)].join(","));
    lines.push([sc("Export Timestamp"), sc(new Date().toISOString())].join(","));
    if (summary) {
      lines.push([sc("Cash Book Closing Balance"), summary.closingCashBookBalance].join(","));
      lines.push([sc("Bank Passbook Closing Balance"), summary.closingBankBalance].join(","));
      lines.push([sc("Net BRS Variance"), summary.variance].join(","));
      lines.push([sc("Audit Settlement Status"), sc(isBalanced ? "SETTLED & BALANCED ✓" : "VARIANCE DETECTED")].join(","));
      lines.push([sc("Reconciliation Match Rate"), sc(`${summary.matchRate}%`)].join(","));
    }
    lines.push(""); // Empty separator row

    // 2. Tabular Column Headers
    const headers = [
      "Status",
      "Audit Category",
      "Cash Book Date",
      "Cash Book Ref",
      "Cash Book Particulars",
      "Cash Book Amount",
      "Bank Date",
      "Bank Ref",
      "Bank Statement Narration",
      "Bank Amount",
      "Variance / Diff",
      "Audit Notes"
    ];
    lines.push(headers.map(sc).join(","));

    // 3. Tabular Rows (from alignedRows if present, else fallback)
    if (Array.isArray(alignedRows) && alignedRows.length > 0) {
      alignedRows.forEach(row => {
        lines.push([
          sc(row.status || "UNCLASSIFIED"),
          sc(row.label || row.status || ""),
          sc(row.cbDate !== "—" ? row.cbDate : ""),
          sc(row.cbRef !== "—" ? row.cbRef : ""),
          sc(row.cbDesc !== "—" ? row.cbDesc : ""),
          Number(row.cbAmount || 0),
          sc(row.bkDate !== "—" ? row.bkDate : ""),
          sc(row.bkRef !== "—" ? row.bkRef : ""),
          sc(row.bkDesc !== "—" ? row.bkDesc : ""),
          Number(row.bkAmount || 0),
          Number(row.difference || 0),
          sc(row.notes || "")
        ].join(","));
      });
    } else {
      (matchedPairs || []).forEach(m => {
        const cb = m.cashBook || {};
        const bk = m.bank || {};
        lines.push([
          sc("MATCHED"),
          sc("Reconciled Entry"),
          sc(cb.date || ""),
          sc(cb.refNo || ""),
          sc(cb.description || ""),
          Number(m.amount || cb.credit || cb.debit || 0),
          sc(bk.date || ""),
          sc(bk.refNo || ""),
          sc(bk.description || ""),
          Number(m.amount || bk.withdrawal || bk.deposit || 0),
          0,
          sc(m.notes || "Reconciled")
        ].join(","));
      });

      (timingDifferences || []).forEach(t => {
        const cb = t.cashBook || {};
        lines.push([
          sc("TIMING"),
          sc(t.type || "In Transit"),
          sc(cb.date || ""),
          sc(cb.refNo || ""),
          sc(cb.description || ""),
          Number(t.amount || 0),
          "",
          "",
          sc("Pending bank clearance"),
          0,
          Number(t.amount || 0),
          sc(t.notes || "In transit")
        ].join(","));
      });

      (missingInCashBook || []).forEach(m => {
        const bk = m.bank || {};
        lines.push([
          sc("MISSING"),
          sc(m.type || "Bank Direct Entry"),
          "",
          "",
          sc("Unrecorded in Cash Book"),
          0,
          sc(bk.date || ""),
          sc(bk.refNo || ""),
          sc(bk.description || ""),
          Number(m.amount || 0),
          Number(m.amount || 0),
          sc(m.notes || "Bank Direct Entry")
        ].join(","));
      });

      (discrepancies || []).forEach(d => {
        const cb = d.cashBook || {};
        const bk = d.bank || {};
        lines.push([
          sc("DISCREPANCY"),
          sc("Amount Mismatch"),
          sc(cb.date || ""),
          sc(cb.refNo || ""),
          sc(cb.description || ""),
          Number(d.cbAmount || 0),
          sc(bk.date || ""),
          sc(bk.refNo || ""),
          sc(bk.description || ""),
          Number(d.bkAmount || 0),
          Number(d.difference || 0),
          sc(d.notes || "Discrepancy")
        ].join(","));
      });
    }

    // 4. Safe Client-Side UTF-8 Blob Download (Works in all browsers without truncation or UUID errors)
    const cleanCompany = String(company).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 30);
    const filename = `IQ4U8_Reconciliation_Audit_${cleanCompany}_${reconDate}.csv`;
    window.reconSaveCSV(lines.join("\r\n"), filename);
  },

  // Build the HTML for the formal Bank Reconciliation Statement (Multi-Language Supported)
  generateBRSHtml: function(reconResult) {
    if (!reconResult) return "<p>No reconciliation data available.</p>";
    const { summary, timingDifferences, missingInCashBook, discrepancies, metadata } = reconResult;
    const fc = this.formatCurrency;
    const esc = this.escapeHtml;
    const t = (k, p) => window.ReconI18n ? window.ReconI18n.t(k, p) : k;

    return `
      <div class="brs-document">
        <div class="brs-header">
          <div>
            <h2 class="brs-title">${esc(t("brs_modal_title"))}</h2>
            <div class="brs-meta" style="margin-top: 4px;">
              <strong>Company:</strong> ${esc(metadata.companyName || "Commercial Entity Pvt Ltd")}<br>
              <strong>Bank Account:</strong> ${esc(metadata.bankName || "Corporate Current Account")}<br>
              <strong>${esc(t("brs_as_on"))}:</strong> ${esc(metadata.reconciliationDate || new Date().toISOString().slice(0, 10))}
            </div>
          </div>
          <div style="text-align: right;">
            <div style="display: inline-block; padding: 4px 10px; border: 1.5px solid #1c1917; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase;">
              ${summary.isPerfectReconciliation ? esc(t("brs_balanced_stamp")) : esc(t("brs_unbalanced_stamp"))}
            </div>
            <div style="font-size: 0.75rem; color: #78716c; margin-top: 4px;">IQ Recon Verification Engine</div>
          </div>
        </div>

        <table class="brs-table">
          <thead>
            <tr>
              <th style="width: 70%;">${esc(t("brs_col_particulars"))}</th>
              <th style="text-align: right; width: 30%;">${esc(t("brs_col_amt"))}</th>
            </tr>
          </thead>
          <tbody>
            <tr class="brs-row-head">
              <td><strong>${esc(t("brs_cb_bal_label"))}</strong></td>
              <td style="text-align: right; font-weight: 800;">${fc(summary.closingCashBookBalance)}</td>
            </tr>

            <!-- ADD SECTION -->
            <tr style="background: #f4ede2;">
              <td colspan="2" style="font-weight: 700; color: #15803d; font-size: 0.8rem; letter-spacing: 0.05em;">
                ${esc(t("brs_add_header"))}
              </td>
            </tr>
            ${timingDifferences.filter(item => item.type === "UNCLEARED_CHEQUE_ISSUED").map(item => `
              <tr>
                <td style="padding-left: 20px;">
                  ${esc(t("note_cheque_unpresented"))} (${esc(item.cashBook.refNo)} - ${esc(item.cashBook.description)})
                </td>
                <td style="text-align: right; color: #15803d;">+ ${fc(item.amount)}</td>
              </tr>
            `).join('')}
            ${missingInCashBook.filter(m => m.type === "BANK_DIRECT_CREDIT").map(m => `
              <tr>
                <td style="padding-left: 20px;">
                  ${esc(t("note_direct_credit"))} (${esc(m.bank.description)})
                </td>
                <td style="text-align: right; color: #15803d;">+ ${fc(m.amount)}</td>
              </tr>
            `).join('')}

            <!-- SUB-TOTAL -->
            <tr style="border-top: 1px dashed #ded8cc; font-weight: 600;">
              <td style="text-align: right; color: #57534e;">Total Additions:</td>
              <td style="text-align: right; color: #15803d;">+ ${fc(summary.brsAdditions.totalAdd)}</td>
            </tr>

            <!-- LESS SECTION -->
            <tr style="background: #f4ede2;">
              <td colspan="2" style="font-weight: 700; color: #b91c1c; font-size: 0.8rem; letter-spacing: 0.05em;">
                ${esc(t("brs_less_header"))}
              </td>
            </tr>
            ${timingDifferences.filter(item => item.type === "UNCLEARED_CHEQUE_DEPOSITED").map(item => `
              <tr>
                <td style="padding-left: 20px;">
                  ${esc(t("note_cheque_uncredited"))} (${esc(item.cashBook.refNo)} - ${esc(item.cashBook.description)})
                </td>
                <td style="text-align: right; color: #b91c1c;">- ${fc(item.amount)}</td>
              </tr>
            `).join('')}
            ${missingInCashBook.filter(m => m.type === "BANK_DIRECT_DEBIT").map(m => `
              <tr>
                <td style="padding-left: 20px;">
                  ${esc(t("note_direct_debit"))} (${esc(m.bank.description)})
                </td>
                <td style="text-align: right; color: #b91c1c;">- ${fc(m.amount)}</td>
              </tr>
            `).join('')}
            ${discrepancies.map(d => `
              <tr>
                <td style="padding-left: 20px;">
                  ${esc(t("note_amount_mismatch", { diff: d.difference.toLocaleString('en-IN') }))} (${esc(d.cashBook.refNo)} - ${esc(d.notes)})
                </td>
                <td style="text-align: right; color: #b91c1c;">- ${fc(d.difference)}</td>
              </tr>
            `).join('')}

            <!-- SUB-TOTAL -->
            <tr style="border-top: 1px dashed #ded8cc; font-weight: 600;">
              <td style="text-align: right; color: #57534e;">Total Deductions:</td>
              <td style="text-align: right; color: #b91c1c;">- ${fc(summary.brsDeductions.totalDeduct)}</td>
            </tr>

            <!-- FINAL BALANCE -->
            <tr class="brs-total-row">
              <td><strong>${esc(t("brs_computed_bk_bal"))}</strong></td>
              <td style="text-align: right;">${fc(summary.reconciledBalance)}</td>
            </tr>
            <tr>
              <td style="color: #78716c; font-size: 0.8rem;">${esc(t("brs_actual_bk_bal"))}</td>
              <td style="text-align: right; color: #78716c; font-size: 0.8rem;">${fc(summary.closingBankBalance)}</td>
            </tr>
            <tr>
              <td style="font-weight: 700;">${esc(t("brs_diff_label"))}:</td>
              <td style="text-align: right; font-weight: 800; color: ${summary.variance < 0.05 ? '#15803d' : '#b91c1c'};">
                ${summary.variance < 0.05 ? "NIL (₹0.00)" : fc(summary.variance)}
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Sign-off Block -->
        <div style="margin-top: 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; font-size: 0.8rem;">
          <div>
            <div style="border-bottom: 1px solid #1c1917; height: 35px; width: 180px;"></div>
            <p style="margin-top: 6px; font-weight: 700;">Prepared by Accountant</p>
            <p style="color: #78716c; font-size: 0.75rem;">Date: ${new Date().toLocaleDateString('en-IN')}</p>
          </div>
          <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end;">
            <div style="border-bottom: 1px solid #1c1917; height: 35px; width: 180px;"></div>
            <p style="margin-top: 6px; font-weight: 700;">Verified by Finance Head / Auditor</p>
            <p style="color: #78716c; font-size: 0.75rem;">Digital Seal: IQ-RECON-VERIFIED</p>
          </div>
        </div>
      </div>
    `;
  }
};
