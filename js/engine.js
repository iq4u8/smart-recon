/* ==========================================================================
   IQ RECON — HEURISTIC RECONCILIATION ENGINE
   Constructs Aligned Side-by-Side Comparative Ledgers & Mathematical BRS
   Author: Priyanshu Pandey (IQ4U8)
   ========================================================================== */

window.ReconEngine = {
  reconcile: function(cashBookRows, bankStatementRows, initialMeta = {}, options = {}) {
    const cb = JSON.parse(JSON.stringify(cashBookRows || []));
    const bk = JSON.parse(JSON.stringify(bankStatementRows || []));
    const dateTolerance = options.dateToleranceDays !== undefined ? Number(options.dateToleranceDays) : 4;

    const cbMatchedIds = new Set();
    const bkMatchedIds = new Set();

    const matchedPairs = [];
    const discrepancies = [];
    const timingDifferences = [];
    const missingInCashBook = [];
    const alignedRows = []; // Unified aligned side-by-side reconciliation stream

    const extractCleanRef = (ref) => {
      if (!ref) return "";
      const numMatch = String(ref).match(/\d{4,}/);
      return numMatch ? numMatch[0] : String(ref).trim().toLowerCase();
    };

    const daysBetween = (d1Str, d2Str) => {
      if (!d1Str || !d2Str) return 999;
      const t1 = new Date(d1Str).getTime();
      const t2 = new Date(d2Str).getTime();
      if (isNaN(t1) || isNaN(t2)) return 999;
      return Math.abs(Math.round((t2 - t1) / (1000 * 60 * 60 * 24)));
    };

    // PASS 1: Exact Reference + Amount Matching
    cb.forEach(cItem => {
      if (cbMatchedIds.has(cItem.id)) return;
      const cRef = extractCleanRef(cItem.refNo);
      if (!cRef) return;

      bk.forEach(bItem => {
        if (bkMatchedIds.has(bItem.id) || cbMatchedIds.has(cItem.id)) return;
        const bRef = extractCleanRef(bItem.refNo);
        if (!bRef || cRef !== bRef) return;

        const isPaymentMatch = cItem.credit > 0 && Math.abs(cItem.credit - bItem.withdrawal) < 0.01;
        const isReceiptMatch = cItem.debit > 0 && Math.abs(cItem.debit - bItem.deposit) < 0.01;

        if (isPaymentMatch || isReceiptMatch) {
          const daysDiff = daysBetween(cItem.date, bItem.date);

          // Only match if clearing falls within allowed date tolerance window
          if (daysDiff <= dateTolerance) {
            cbMatchedIds.add(cItem.id);
            bkMatchedIds.add(bItem.id);
            const amt = isPaymentMatch ? cItem.credit : cItem.debit;
            const pairObj = {
              type: "MATCHED",
              cashBook: cItem,
              bank: bItem,
              amount: amt,
              direction: isPaymentMatch ? "OUTFLOW" : "INFLOW",
              notes: daysDiff > 0 ? `Matched: Ref #${cItem.refNo} (${daysDiff}d clearing)` : `Matched: Ref #${cItem.refNo}`
            };
            matchedPairs.push(pairObj);
            alignedRows.push({
              status: "MATCHED",
              badgeClass: "badge-matched",
              label: "MATCHED",
              badgeKey: "badge_matched",
              cbDate: cItem.date,
              cbRef: cItem.refNo,
              cbDesc: cItem.description,
              cbAmount: amt,
              bkDate: bItem.date,
              bkRef: bItem.refNo,
              bkDesc: bItem.description,
              bkAmount: amt,
              difference: 0,
              notes: daysDiff > 0 ? `Reconciled & Cleared (${daysDiff}d)` : "Reconciled & Cleared",
              notesKey: "note_reconciled"
            });
          }
        }
      });
    });

    // PASS 2: Matching Reference with Amount Discrepancy (Rule of 9 Transposition)
    cb.forEach(cItem => {
      if (cbMatchedIds.has(cItem.id)) return;
      const cRef = extractCleanRef(cItem.refNo);
      if (!cRef) return;

      bk.forEach(bItem => {
        if (bkMatchedIds.has(bItem.id) || cbMatchedIds.has(cItem.id)) return;
        const bRef = extractCleanRef(bItem.refNo);
        if (!bRef || cRef !== bRef) return;

        const cbAmt = cItem.credit > 0 ? cItem.credit : cItem.debit;
        const bkAmt = bItem.withdrawal > 0 ? bItem.withdrawal : bItem.deposit;
        const diff = Math.abs(cbAmt - bkAmt);

        if (diff > 0.01) {
          cbMatchedIds.add(cItem.id);
          bkMatchedIds.add(bItem.id);
          const isTransposition = (Math.round(diff * 100) % 900 === 0) || (Math.round(diff) % 9 === 0);

          const discObj = {
            type: "AMOUNT_MISMATCH",
            cashBook: cItem,
            bank: bItem,
            cbAmount: cbAmt,
            bkAmount: bkAmt,
            difference: diff,
            isTransposition: isTransposition,
            notes: isTransposition 
              ? `Transposition error: digits flipped (diff ₹${diff.toLocaleString('en-IN')})` 
              : `Amount variance: ₹${diff.toLocaleString('en-IN')}`
          };
          discrepancies.push(discObj);
          alignedRows.push({
            status: "DISCREPANCY",
            badgeClass: "badge-discrepancy",
            label: "MISMATCH",
            badgeKey: "badge_discrepancy",
            cbDate: cItem.date,
            cbRef: cItem.refNo,
            cbDesc: cItem.description,
            cbAmount: cbAmt,
            bkDate: bItem.date,
            bkRef: bItem.refNo,
            bkDesc: bItem.description,
            bkAmount: bkAmt,
            difference: diff,
            notes: discObj.notes,
            notesKey: isTransposition ? "note_transposition" : "note_amount_mismatch",
            notesParams: { diff: diff.toLocaleString('en-IN') }
          });
        }
      });
    });

    // PASS 3: Unreferenced Amount & Date Proximity Match
    cb.forEach(cItem => {
      if (cbMatchedIds.has(cItem.id)) return;

      bk.forEach(bItem => {
        if (bkMatchedIds.has(bItem.id) || cbMatchedIds.has(cItem.id)) return;

        const isPaymentMatch = cItem.credit > 0 && Math.abs(cItem.credit - bItem.withdrawal) < 0.01;
        const isReceiptMatch = cItem.debit > 0 && Math.abs(cItem.debit - bItem.deposit) < 0.01;
        const daysDiff = daysBetween(cItem.date, bItem.date);

        if ((isPaymentMatch || isReceiptMatch) && daysDiff <= dateTolerance) {
          cbMatchedIds.add(cItem.id);
          bkMatchedIds.add(bItem.id);
          const amt = isPaymentMatch ? cItem.credit : cItem.debit;
          matchedPairs.push({
            type: "MATCHED_PROXIMITY",
            cashBook: cItem,
            bank: bItem,
            amount: amt,
            direction: isPaymentMatch ? "OUTFLOW" : "INFLOW",
            notes: `Amount matched within ${daysDiff}d clearing window`
          });
          alignedRows.push({
            status: "MATCHED",
            badgeClass: "badge-matched",
            label: "MATCHED",
            badgeKey: "badge_matched",
            cbDate: cItem.date,
            cbRef: cItem.refNo,
            cbDesc: cItem.description,
            cbAmount: amt,
            bkDate: bItem.date,
            bkRef: bItem.refNo,
            bkDesc: bItem.description,
            bkAmount: amt,
            difference: 0,
            notes: `Cleared within ${daysDiff} day(s)`,
            notesKey: "note_reconciled"
          });
        }
      });
    });

    // PASS 4: Timing Differences (Unmatched in Cash Book)
    cb.forEach(cItem => {
      if (cbMatchedIds.has(cItem.id)) return;

      if (cItem.credit > 0) {
        timingDifferences.push({
          type: "UNCLEARED_CHEQUE_ISSUED",
          cashBook: cItem,
          amount: cItem.credit,
          notes: `Cheque #${cItem.refNo || 'N/A'} issued, pending presentation at bank`
        });
        alignedRows.push({
          status: "TIMING",
          badgeClass: "badge-timing",
          label: "IN TRANSIT",
          badgeKey: "badge_timing",
          cbDate: cItem.date,
          cbRef: cItem.refNo,
          cbDesc: cItem.description,
          cbAmount: cItem.credit,
          bkDate: "—",
          bkRef: "—",
          bkDesc: "Pending bank clearance",
          bkAmount: 0,
          difference: cItem.credit,
          notes: "Cheque issued, not yet presented",
          notesKey: "note_cheque_unpresented"
        });
      } else if (cItem.debit > 0) {
        timingDifferences.push({
          type: "UNCLEARED_CHEQUE_DEPOSITED",
          cashBook: cItem,
          amount: cItem.debit,
          notes: `Receipt/Cheque deposited, clearing pending at bank`
        });
        alignedRows.push({
          status: "TIMING",
          badgeClass: "badge-timing",
          label: "IN TRANSIT",
          badgeKey: "badge_timing",
          cbDate: cItem.date,
          cbRef: cItem.refNo,
          cbDesc: cItem.description,
          cbAmount: cItem.debit,
          bkDate: "—",
          bkRef: "—",
          bkDesc: "Deposit clearing in progress",
          bkAmount: 0,
          difference: cItem.debit,
          notes: "Cheque deposited, clearing pending",
          notesKey: "note_cheque_uncredited"
        });
      }
    });

    // PASS 5: Bank Direct Entries (Unmatched in Bank Statement)
    bk.forEach(bItem => {
      if (bkMatchedIds.has(bItem.id)) return;

      if (bItem.withdrawal > 0) {
        missingInCashBook.push({
          type: "BANK_DIRECT_DEBIT",
          bank: bItem,
          amount: bItem.withdrawal,
          notes: `Bank debit / charges of ₹${bItem.withdrawal.toLocaleString('en-IN')} on ${bItem.date}`
        });
        alignedRows.push({
          status: "MISSING",
          badgeClass: "badge-unrecorded",
          label: "BANK CHARGE",
          badgeKey: "badge_bank_charge",
          cbDate: "—",
          cbRef: "—",
          cbDesc: "Unrecorded in Cash Book",
          cbAmount: 0,
          bkDate: bItem.date,
          bkRef: bItem.refNo,
          bkDesc: bItem.description,
          bkAmount: bItem.withdrawal,
          difference: bItem.withdrawal,
          notes: "Direct bank charge / debit",
          notesKey: "note_direct_debit"
        });
      } else if (bItem.deposit > 0) {
        missingInCashBook.push({
          type: "BANK_DIRECT_CREDIT",
          bank: bItem,
          amount: bItem.deposit,
          notes: `Bank interest / direct credit of ₹${bItem.deposit.toLocaleString('en-IN')} on ${bItem.date}`
        });
        alignedRows.push({
          status: "MISSING",
          badgeClass: "badge-unrecorded",
          label: "DIRECT CR",
          badgeKey: "badge_direct_credit",
          cbDate: "—",
          cbRef: "—",
          cbDesc: "Unrecorded in Cash Book",
          cbAmount: 0,
          bkDate: bItem.date,
          bkRef: bItem.refNo,
          bkDesc: bItem.description,
          bkAmount: bItem.deposit,
          difference: bItem.deposit,
          notes: "Direct bank credit / Interest",
          notesKey: "note_direct_credit"
        });
      }
    });

    // BRS Calculations
    const openingCB = initialMeta.openingCashBookBalance || 0;
    const totalCBDebit = cb.reduce((sum, r) => sum + (r.debit || 0), 0);
    const totalCBCredit = cb.reduce((sum, r) => sum + (r.credit || 0), 0);
    const closingCB = openingCB + totalCBDebit - totalCBCredit;

    const openingBK = initialMeta.openingBankBalance || 0;
    const totalBKDeposit = bk.reduce((sum, r) => sum + (r.deposit || 0), 0);
    const totalBKWithdrawal = bk.reduce((sum, r) => sum + (r.withdrawal || 0), 0);
    const closingBK = openingBK + totalBKDeposit - totalBKWithdrawal;

    const addUnclearedIssued = timingDifferences
      .filter(t => t.type === "UNCLEARED_CHEQUE_ISSUED")
      .reduce((sum, t) => sum + t.amount, 0);

    const addDirectCredits = missingInCashBook
      .filter(m => m.type === "BANK_DIRECT_CREDIT")
      .reduce((sum, m) => sum + m.amount, 0);

    const lessUnclearedDeposited = timingDifferences
      .filter(t => t.type === "UNCLEARED_CHEQUE_DEPOSITED")
      .reduce((sum, t) => sum + t.amount, 0);

    const lessDirectDebits = missingInCashBook
      .filter(m => m.type === "BANK_DIRECT_DEBIT")
      .reduce((sum, m) => sum + m.amount, 0);

    let errorAdjustment = 0;
    discrepancies.forEach(d => {
      if (d.cashBook.credit > 0 && d.bkAmount > d.cbAmount) {
        errorAdjustment -= d.difference;
      } else if (d.cashBook.credit > 0 && d.bkAmount < d.cbAmount) {
        errorAdjustment += d.difference;
      }
    });

    const reconciledBalance = closingCB + addUnclearedIssued + addDirectCredits - lessUnclearedDeposited - lessDirectDebits + errorAdjustment;
    const variance = Math.abs(reconciledBalance - closingBK);
    const totalTxns = cb.length + bk.length;
    const matchedTxnsCount = (matchedPairs.length * 2);
    const matchRate = totalTxns > 0 ? Math.round((matchedTxnsCount / totalTxns) * 100) : 0;

    return {
      metadata: initialMeta,
      matchedPairs,
      discrepancies,
      timingDifferences,
      missingInCashBook,
      alignedRows, // Unified side-by-side aligned ledger
      summary: {
        totalCashBookRows: cb.length,
        totalBankRows: bk.length,
        closingCashBookBalance: closingCB,
        closingBankBalance: closingBK,
        reconciledBalance: reconciledBalance,
        variance: variance,
        isPerfectReconciliation: variance < 0.05,
        matchRate: matchRate,
        brsAdditions: {
          unclearedIssued: addUnclearedIssued,
          directCredits: addDirectCredits,
          totalAdd: addUnclearedIssued + addDirectCredits
        },
        brsDeductions: {
          unclearedDeposited: lessUnclearedDeposited,
          directDebits: lessDirectDebits,
          errorAdjustment: errorAdjustment,
          totalDeduct: lessUnclearedDeposited + lessDirectDebits - errorAdjustment
        }
      }
    };
  }
};
