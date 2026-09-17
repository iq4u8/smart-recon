/* ==========================================================================
   IQ4U8 RECON — APPLICATION LOGIC & MULTI-LANGUAGE COMPARATIVE LEDGER
   Dual Workspace: Live Production Dashboard vs Interactive Demo Scenarios
   Author: Priyanshu Pandey (IQ4U8)
   ========================================================================== */

(function() {
  // Master Application State
  const state = {
    mode: "dashboard", // "landing", "dashboard", or "demo"
    currentPreset: "techCorp",
    dateToleranceDays: 4,
    activeFilter: "all",
    searchQuery: "",

    // Demo Mode Store (pre-filled commercial scenarios)
    demo: {
      cashBook: [],
      bankStatement: [],
      metadata: {
        companyName: "Company Cash Book",
        bankName: "Corporate Bank Account",
        reconciliationDate: new Date().toISOString().slice(0, 10),
        openingCashBookBalance: 0,
        openingBankBalance: 0
      },
      reconResult: null
    },

    // Real / Production Dashboard Store (starts 100% blank)
    dashboard: {
      cashBook: [],
      bankStatement: [],
      metadata: {
        companyName: "Your Company Cash Book",
        bankName: "Your Bank Statement",
        reconciliationDate: new Date().toISOString().slice(0, 10),
        openingCashBookBalance: 0,
        openingBankBalance: 0
      },
      reconResult: null,
      customFileNameCB: "",
      customFileNameBK: ""
    }
  };

  // Expose global mode switcher early so inline onclick handlers always work
  window.reconSetMode = function(newMode) {
    if (typeof setMode === "function") {
      setMode(newMode);
    }
  };

  const dom = {
    // Brand & Navigation
    mainWorkspace: document.getElementById("mainWorkspace"),
    landingView: document.getElementById("landingView"),
    supportView: document.getElementById("supportView"),
    sourceView: document.getElementById("sourceView"),
    brandLink: document.getElementById("brandLink"),
    tabNavDemo: document.getElementById("tabNavDemo"),
    tabNavDashboard: document.getElementById("tabNavDashboard"),
    navLinkSupport: document.getElementById("navLinkSupport"),
    navLinkSource: document.getElementById("navLinkSource"),
    dashboardLiveBanner: document.getElementById("dashboardLiveBanner"),
    demoDisclaimerBanner: document.getElementById("demoDisclaimerBanner"),
    landingCtaDashboard: document.getElementById("landingCtaDashboard"),
    landingCtaDemo: document.getElementById("landingCtaDemo"),
    landingCtaSource: document.getElementById("landingCtaSource"),
    landingCtaSupportDock: document.getElementById("landingCtaSupportDock"),
    appFooter: document.querySelector(".app-footer"),
    demoScenarioBar: document.getElementById("demoScenarioBar"),
    demoActiveTitle: document.getElementById("demoActiveTitle"),
    demoActiveSub: document.getElementById("demoActiveSub"),
    demoHighlightText: document.getElementById("demoHighlightText"),
    btnDownloadSampleCB: document.getElementById("btnDownloadSampleCB"),
    btnDownloadSampleBK: document.getElementById("btnDownloadSampleBK"),
    btnReloadSample: document.getElementById("btnReloadSample"),

    // Header Controls & Groups
    headerOps: document.getElementById("headerOps"),
    languageSelect: document.getElementById("languageSelect"),
    presetSelect: document.getElementById("presetSelect"),
    btnPasteModal: document.getElementById("btnPasteModal"),
    btnClearData: document.getElementById("btnClearData"),
    btnExportCSV: document.getElementById("btnExportCSV"),
    btnViewBRS: document.getElementById("btnViewBRS"),
    btnPrintBRS: document.getElementById("btnPrintBRS"),
    btnCloseModal: document.getElementById("btnCloseModal"),
    modalBRS: document.getElementById("modalBRS"),
    modalBodyBRS: document.getElementById("modalBodyBRS"),
    themeToggle: document.getElementById("themeToggle"),

    // Paste Modal
    modalPaste: document.getElementById("modalPaste"),
    btnClosePasteModal: document.getElementById("btnClosePasteModal"),
    btnSubmitPaste: document.getElementById("btnSubmitPaste"),
    pasteTextArea: document.getElementById("pasteTextArea"),

    // Dropzones
    dropzoneCB: document.getElementById("dropzoneCB"),
    fileInputCB: document.getElementById("fileInputCB"),
    dropzoneBK: document.getElementById("dropzoneBK"),
    fileInputBK: document.getElementById("fileInputBK"),
    statusCB: document.getElementById("statusCB"),
    statusBK: document.getElementById("statusBK"),

    // KPI Metrics
    kpiCashBookBal: document.getElementById("kpiCashBookBal"),
    kpiCashBookSub: document.getElementById("kpiCashBookSub"),
    kpiBankBal: document.getElementById("kpiBankBal"),
    kpiBankSub: document.getElementById("kpiBankSub"),
    kpiVariance: document.getElementById("kpiVariance"),
    kpiVarianceSub: document.getElementById("kpiVarianceSub"),
    kpiMatchRate: document.getElementById("kpiMatchRate"),

    // Tolerance, Filters & Table
    toleranceSlider: document.getElementById("toleranceSlider"),
    toleranceVal: document.getElementById("toleranceVal"),
    tableBodyAligned: document.getElementById("tableBodyAligned"),
    countLedger: document.getElementById("countLedger"),
    filterTabs: document.querySelectorAll(".filter-tab"),
    searchInput: document.getElementById("searchInput")
  };

  // Safe HTML Entity Escaper
  const escapeHtml = (str) => {
    if (str === null || str === undefined) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  // Helper translation wrapper
  const t = (k, p) => window.ReconI18n ? window.ReconI18n.t(k, p) : k;

  // Indian Currency Formatter
  const formatCurr = (amt) => {
    if (amt === undefined || amt === null || isNaN(amt) || amt === 0) return "—";
    return "₹" + Number(amt).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Get active data store based on mode
  const getActiveStore = () => state[state.mode];

  // Initialize Application
  function init() {
    setupEventListeners();
    init3DTilt();

    // Initialize translations from localStorage or default
    if (window.ReconI18n) {
      window.ReconI18n.applyTranslations();
      if (dom.languageSelect) {
        dom.languageSelect.value = window.ReconI18n.getLang();
      }
    }

    // Default to Landing Page on first load
    setMode("landing");

    // Support deep-link routing via hash
    if (window.location.hash === "#support") {
      setMode("support");
    } else if (window.location.hash === "#source") {
      setMode("source");
    }
  }

  // Interactive 3D Tilt for Kiro Mockup Bezel with Smooth Lerp & Specular Lighting
  function init3DTilt() {
    const stage = document.getElementById("mockupStage");
    const bezel = document.getElementById("mockupBezel");
    const glare = document.getElementById("bezelGlare");
    if (!stage || !bezel) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let isHovered = false;

    // Default resting 3D tilt: 8 degrees on X
    const baseRotX = 8;
    const baseRotY = 0;

    function render3D() {
      // Smooth lerp (damping factor 0.08)
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      if (window.innerWidth > 960) {
        if (isHovered) {
          // Dynamic tilt: rotateX varies from ~2 to ~14 deg, rotateY varies +/- 6 deg
          const rotX = baseRotX - (currentY * 6);
          const rotY = baseRotY + (currentX * 6);
          bezel.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-8px) scale(0.98)`;
          
          if (glare) {
            const glareX = 50 + currentX * 35;
            const glareY = 25 + currentY * 35;
            glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.24) 0%, transparent 60%)`;
            glare.style.opacity = "1";
          }
        } else {
          bezel.style.transform = `rotateX(${baseRotX}deg) rotateY(0deg) translateY(-8px) scale(0.98)`;
          if (glare) {
            glare.style.background = `radial-gradient(circle at 50% 20%, rgba(255,255,255,0.16) 0%, transparent 60%)`;
            glare.style.opacity = "0.65";
          }
        }
      }

      requestAnimationFrame(render3D);
    }
    requestAnimationFrame(render3D);

    stage.addEventListener("mousemove", (e) => {
      isHovered = true;
      const rect = stage.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    });

    stage.addEventListener("mouseleave", () => {
      isHovered = false;
      mouseX = 0;
      mouseY = 0;
    });
  }

  // Switch between Landing, Dashboard, Demo, Support, and Source modes
  function setMode(newMode) {
    window.reconSetMode = setMode;
    state.mode = (newMode === "landing" || newMode === "support" || newMode === "source") ? "dashboard" : newMode; // store always points to dashboard or demo for data

    // Clear active state on all nav tabs
    [dom.tabNavDashboard, dom.tabNavDemo, dom.navLinkSupport, dom.navLinkSource].forEach(el => {
      if (el) el.classList.remove("active");
    });

    if (newMode === "support") {
      // --- DEDICATED SUPPORT PAGE ---
      if (dom.landingView) dom.landingView.style.display = "none";
      if (dom.mainWorkspace) dom.mainWorkspace.style.display = "none";
      if (dom.sourceView) dom.sourceView.style.display = "none";
      if (dom.supportView) {
        dom.supportView.style.display = "block";
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      if (dom.navLinkSupport) dom.navLinkSupport.classList.add("active");
      if (dom.brandLink) dom.brandLink.classList.remove("active");
      if (dom.headerOps) dom.headerOps.style.display = "none";
      if (dom.appFooter) dom.appFooter.style.display = "none";
      return;
    }

    if (newMode === "source") {
      // --- DEDICATED SOURCE CODE & OFFLINE RUN PAGE ---
      if (dom.landingView) dom.landingView.style.display = "none";
      if (dom.mainWorkspace) dom.mainWorkspace.style.display = "none";
      if (dom.supportView) dom.supportView.style.display = "none";
      if (dom.sourceView) {
        dom.sourceView.style.display = "block";
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      if (dom.navLinkSource) dom.navLinkSource.classList.add("active");
      if (dom.brandLink) dom.brandLink.classList.remove("active");
      if (dom.headerOps) dom.headerOps.style.display = "none";
      if (dom.appFooter) dom.appFooter.style.display = "none";
      return;
    }

    if (newMode === "landing") {
      // --- LANDING MODE: Clean atmospheric canvas ---
      if (dom.supportView) dom.supportView.style.display = "none";
      if (dom.sourceView) dom.sourceView.style.display = "none";
      if (dom.landingView) dom.landingView.style.display = "flex";
      if (dom.mainWorkspace) dom.mainWorkspace.style.display = "none";
      if (dom.brandLink) dom.brandLink.classList.add("active");

      // Hide entire operational controls container
      if (dom.headerOps) dom.headerOps.style.display = "none";

      // Hide individual operational buttons
      if (dom.presetSelect) dom.presetSelect.style.display = "none";
      if (dom.btnPasteModal) dom.btnPasteModal.style.display = "none";
      if (dom.btnClearData) dom.btnClearData.style.display = "none";
      if (dom.btnExportCSV) dom.btnExportCSV.style.display = "none";
      if (dom.btnViewBRS) dom.btnViewBRS.style.display = "none";
      if (dom.appFooter) dom.appFooter.style.display = "none";

      window.scrollTo({ top: 0, behavior: "smooth" });
      return; // No data operations needed
    }

    // --- WORKSPACE MODES (Dashboard / Demo): Show main workspace, hide others ---
    if (dom.supportView) dom.supportView.style.display = "none";
    if (dom.sourceView) dom.sourceView.style.display = "none";
    if (dom.brandLink) dom.brandLink.classList.remove("active");
    if (dom.landingView) dom.landingView.style.display = "none";
    if (dom.mainWorkspace) dom.mainWorkspace.style.display = "flex";
    if (dom.headerOps) dom.headerOps.style.display = "flex";

    // Restore operational header buttons visibility
    if (dom.btnExportCSV) dom.btnExportCSV.style.display = "inline-flex";
    if (dom.btnViewBRS) dom.btnViewBRS.style.display = "inline-flex";
    if (dom.appFooter) dom.appFooter.style.display = "block";

    // Trigger smooth workspace entrance animation
    if (dom.mainWorkspace) {
      dom.mainWorkspace.classList.remove("workspace-enter");
      void dom.mainWorkspace.offsetWidth; // force reflow
      dom.mainWorkspace.classList.add("workspace-enter");
    }

    if (newMode === "dashboard") {
      // 1. Navigation state
      if (dom.tabNavDashboard) dom.tabNavDashboard.classList.add("active");

      // 2. Buttons: Hide Scenario dropdown in Dashboard; show Paste Data & Reset
      if (dom.presetSelect) dom.presetSelect.style.display = "none";
      if (dom.btnPasteModal) dom.btnPasteModal.style.display = "inline-flex";
      if (dom.btnClearData) dom.btnClearData.style.display = "inline-flex";

      // 3. Banners: Show live workspace banner; hide demo privacy disclaimer & demo cockpit
      if (dom.dashboardLiveBanner) dom.dashboardLiveBanner.style.display = "flex";
      if (dom.demoDisclaimerBanner) dom.demoDisclaimerBanner.style.display = "none";
      if (dom.demoScenarioBar) dom.demoScenarioBar.style.display = "none";

      // 4. In Dashboard mode, run reconciliation on dashboard data
      if (state.dashboard.cashBook.length > 0 || state.dashboard.bankStatement.length > 0) {
        executeReconciliation();
      } else {
        renderBlankDashboard();
      }
    } else {
      // Demo Mode
      if (dom.tabNavDemo) dom.tabNavDemo.classList.add("active");

      // Buttons: Show Scenario dropdown; hide Paste Data & Reset
      if (dom.presetSelect) dom.presetSelect.style.display = "inline-block";
      if (dom.btnPasteModal) dom.btnPasteModal.style.display = "none";
      if (dom.btnClearData) dom.btnClearData.style.display = "none";

      // Banners: Hide live workspace banner; show demo privacy disclaimer & demo cockpit
      if (dom.dashboardLiveBanner) dom.dashboardLiveBanner.style.display = "none";
      if (dom.demoDisclaimerBanner) dom.demoDisclaimerBanner.style.display = "flex";
      if (dom.demoScenarioBar) dom.demoScenarioBar.style.display = "block";

      // Load active preset in demo mode
      loadPreset(state.currentPreset);
    }
  }

  // Render clean original blank state in Dashboard mode
  function renderBlankDashboard() {
    dom.statusCB.innerHTML = t("drop_cb_meta");
    dom.statusBK.innerHTML = t("drop_bk_meta");
    dom.dropzoneCB.classList.remove("loaded");
    dom.dropzoneBK.classList.remove("loaded");

    dom.kpiCashBookBal.textContent = "₹0.00";
    dom.kpiCashBookSub.textContent = t("kpi_cb_sub");
    dom.kpiBankBal.textContent = "₹0.00";
    dom.kpiBankSub.textContent = t("kpi_bk_sub");
    dom.kpiVariance.textContent = "₹0.00";
    dom.kpiVariance.style.color = "var(--text-primary)";
    dom.kpiVarianceSub.textContent = t("kpi_variance_settled");
    dom.kpiMatchRate.textContent = "0%";

    updateFilterCounts();
    dom.tableBodyAligned.innerHTML = `
      <tr>
        <td colspan="10" style="text-align: center; color: var(--text-muted); padding: 56px 20px;">
          <div style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
            ${t("empty_ledger")}
          </div>
          <div style="font-size: 0.8rem; color: var(--text-secondary); max-width: 500px; margin: 0 auto;">
            ${t("live_workspace_desc")}
          </div>
        </td>
      </tr>
    `;
    dom.countLedger.textContent = `0 ${t("rows_label")}`;
  }

  // Hook for Language Changes
  window.onReconLanguageChanged = function(newLang) {
    if (state.mode === "dashboard" && state.dashboard.cashBook.length === 0 && state.dashboard.bankStatement.length === 0) {
      renderBlankDashboard();
    } else {
      updateKPIs();
      renderLedger();
    }

    if (dom.modalBRS && dom.modalBRS.style.display === "flex") {
      const activeStore = getActiveStore();
      if (activeStore && activeStore.reconResult) {
        dom.modalBodyBRS.innerHTML = window.ReconExport.generateBRSHtml(activeStore.reconResult);
      }
    }
  };

  // Bind Event Listeners
  function setupEventListeners() {
    // Brand Logo → Landing Page
    if (dom.brandLink) {
      dom.brandLink.addEventListener("click", (e) => {
        e.preventDefault();
        setMode("landing");
      });
    }

    // Mode Switchers (Dashboard / Demo)
    if (dom.tabNavDemo) {
      dom.tabNavDemo.addEventListener("click", () => setMode("demo"));
    }
    if (dom.tabNavDashboard) {
      dom.tabNavDashboard.addEventListener("click", () => setMode("dashboard"));
    }

    // Landing Page CTA Buttons
    if (dom.landingCtaDashboard) {
      dom.landingCtaDashboard.addEventListener("click", () => setMode("dashboard"));
    }
    if (dom.landingCtaDemo) {
      dom.landingCtaDemo.addEventListener("click", () => setMode("demo"));
    }
    // Dedicated Support & Source Page Navigation (NO POPUPS)
    if (dom.landingCtaSource) {
      dom.landingCtaSource.addEventListener("click", () => setMode("source"));
    }
    if (dom.landingCtaSupportDock) {
      dom.landingCtaSupportDock.addEventListener("click", () => setMode("support"));
    }
    if (dom.navLinkSupport) {
      dom.navLinkSupport.addEventListener("click", () => setMode("support"));
    }
    if (dom.navLinkSource) {
      dom.navLinkSource.addEventListener("click", () => setMode("source"));
    }

    // Back & Workspace Navigation on Dedicated Support & Source Pages
    const btnSupportBackWorkspace = document.getElementById("btnSupportBackWorkspace");
    const btnSupportBackLanding = document.getElementById("btnSupportBackLanding");
    const btnSourceBackWorkspace = document.getElementById("btnSourceBackWorkspace");
    const btnSourceBackLanding = document.getElementById("btnSourceBackLanding");
    const btnSourceLaunchWorkspace = document.getElementById("btnSourceLaunchWorkspace");

    if (btnSupportBackWorkspace) btnSupportBackWorkspace.addEventListener("click", () => setMode("dashboard"));
    if (btnSupportBackLanding) btnSupportBackLanding.addEventListener("click", () => setMode("landing"));
    if (btnSourceBackWorkspace) btnSourceBackWorkspace.addEventListener("click", () => setMode("dashboard"));
    if (btnSourceBackLanding) btnSourceBackLanding.addEventListener("click", () => setMode("landing"));
    if (btnSourceLaunchWorkspace) btnSourceLaunchWorkspace.addEventListener("click", () => setMode("dashboard"));

    // Copy buttons on Dedicated Support Page
    const btnPageCopyEmail = document.getElementById("btnPageCopyEmail");
    if (btnPageCopyEmail) {
      btnPageCopyEmail.addEventListener("click", () => {
        navigator.clipboard.writeText("priyanshupandey8301@gmail.com").then(() => {
          const prev = btnPageCopyEmail.textContent;
          btnPageCopyEmail.textContent = "Copied ✓";
          btnPageCopyEmail.style.borderColor = "#2ca56d";
          btnPageCopyEmail.style.color = "#2ca56d";
          setTimeout(() => {
            btnPageCopyEmail.textContent = prev;
            btnPageCopyEmail.style.borderColor = "";
            btnPageCopyEmail.style.color = "";
          }, 2000);
        });
      });
    }

    const btnPageCopyTelegram = document.getElementById("btnPageCopyTelegram");
    if (btnPageCopyTelegram) {
      btnPageCopyTelegram.addEventListener("click", () => {
        navigator.clipboard.writeText("iq4u8").then(() => {
          const prev = btnPageCopyTelegram.textContent;
          btnPageCopyTelegram.textContent = "Copied ✓";
          btnPageCopyTelegram.style.borderColor = "#29b6f6";
          btnPageCopyTelegram.style.color = "#29b6f6";
          setTimeout(() => {
            btnPageCopyTelegram.textContent = prev;
            btnPageCopyTelegram.style.borderColor = "";
            btnPageCopyTelegram.style.color = "";
          }, 2000);
        });
      });
    }

    const btnPageCopyGithub = document.getElementById("btnPageCopyGithub");
    if (btnPageCopyGithub) {
      btnPageCopyGithub.addEventListener("click", () => {
        navigator.clipboard.writeText("https://github.com/iq4u8").then(() => {
          const prev = btnPageCopyGithub.textContent;
          btnPageCopyGithub.textContent = "Copied ✓";
          btnPageCopyGithub.style.borderColor = "#a855f7";
          btnPageCopyGithub.style.color = "#c084fc";
          setTimeout(() => {
            btnPageCopyGithub.textContent = prev;
            btnPageCopyGithub.style.borderColor = "";
            btnPageCopyGithub.style.color = "";
          }, 2000);
        });
      });
    }

    // Language Switcher Dropdown (Single-Click Instant Translation)
    if (dom.languageSelect) {
      dom.languageSelect.addEventListener("change", (e) => {
        if (window.ReconI18n) {
          window.ReconI18n.setLang(e.target.value);
        }
      });
    }

    // Scenario Dropdown in Demo Mode
    if (dom.presetSelect) {
      dom.presetSelect.addEventListener("change", (e) => {
        state.currentPreset = e.target.value;
        loadPreset(e.target.value);
      });
    }

    // Interactive Demo Scenario Chips
    document.querySelectorAll("#demoPresetsChips .demo-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const key = chip.getAttribute("data-preset");
        if (key && window.RECON_PRESETS && window.RECON_PRESETS[key]) {
          loadPreset(key);
        }
      });
    });

    // 1-Click Sample CSV File Downloads
    if (dom.btnDownloadSampleCB) {
      dom.btnDownloadSampleCB.addEventListener("click", () => {
        if (typeof window.downloadPresetCSV === "function") {
          window.downloadPresetCSV(state.currentPreset, "CB");
        }
      });
    }
    if (dom.btnDownloadSampleBK) {
      dom.btnDownloadSampleBK.addEventListener("click", () => {
        if (typeof window.downloadPresetCSV === "function") {
          window.downloadPresetCSV(state.currentPreset, "BK");
        }
      });
    }
    if (dom.btnReloadSample) {
      dom.btnReloadSample.addEventListener("click", () => {
        loadPreset(state.currentPreset);
      });
    }

    // Reset Data in Dashboard Mode
    if (dom.btnClearData) {
      dom.btnClearData.addEventListener("click", () => {
        clearDashboardData();
      });
    }

    // Modern Theme Toggle
    if (dom.themeToggle) {
      const savedTheme = localStorage.getItem("iq_recon_theme") || "dark";
      document.documentElement.setAttribute("data-theme", savedTheme);

      dom.themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        try {
          localStorage.setItem("iq_recon_theme", newTheme);
        } catch(e) {}
      });
    }

    // Export CSV
    dom.btnExportCSV.addEventListener("click", () => {
      const activeStore = getActiveStore();
      if (!activeStore) return;

      if (!activeStore.reconResult && (activeStore.cashBook.length > 0 || activeStore.bankStatement.length > 0)) {
        executeReconciliation();
      }

      if (!activeStore.reconResult || (activeStore.cashBook.length === 0 && activeStore.bankStatement.length === 0)) {
        alert("Please upload your Cash Book & Bank Statement (or switch to Demo mode) before exporting.");
        return;
      }
      window.ReconExport.downloadReconCSV(activeStore.reconResult);
    });

    // View BRS Statement Modal
    dom.btnViewBRS.addEventListener("click", () => {
      const activeStore = getActiveStore();
      if (!activeStore) return;

      if (!activeStore.reconResult && (activeStore.cashBook.length > 0 || activeStore.bankStatement.length > 0)) {
        executeReconciliation();
      }

      if (!activeStore.reconResult || (activeStore.cashBook.length === 0 && activeStore.bankStatement.length === 0)) {
        alert("Please upload your Cash Book & Bank Statement (or switch to Demo mode) to view the BRS statement.");
        return;
      }
      dom.modalBodyBRS.innerHTML = window.ReconExport.generateBRSHtml(activeStore.reconResult);
      dom.modalBRS.style.display = "flex";
    });

    dom.btnPrintBRS.addEventListener("click", () => window.print());
    dom.btnCloseModal.addEventListener("click", () => dom.modalBRS.style.display = "none");
    dom.modalBRS.addEventListener("click", (e) => {
      if (e.target === dom.modalBRS) dom.modalBRS.style.display = "none";
    });

    // Paste Modal Controls (Dashboard Mode)
    if (dom.btnPasteModal) {
      dom.btnPasteModal.addEventListener("click", () => {
        dom.modalPaste.style.display = "flex";
        dom.pasteTextArea.focus();
      });
      dom.btnClosePasteModal.addEventListener("click", () => dom.modalPaste.style.display = "none");
      dom.modalPaste.addEventListener("click", (e) => {
        if (e.target === dom.modalPaste) dom.modalPaste.style.display = "none";
      });

      dom.btnSubmitPaste.addEventListener("click", () => {
        const text = dom.pasteTextArea.value.trim();
        if (!text) return;

        const targetRadio = document.querySelector("input[name='pasteTarget']:checked");
        const type = targetRadio ? targetRadio.value : "CB";

        const parsed = window.ReconParser.parseCSVText(text);
        if (!parsed.records || parsed.records.length === 0) {
          alert("No records parsed. Check your headers and data rows.");
          return;
        }

        const mapping = window.ReconParser.detectColumns(parsed.headers);
        const store = state.dashboard;

        if (type === "CB") {
          store.cashBook = window.ReconParser.normalizeCashBook(parsed.records, mapping);
          dom.statusCB.innerHTML = `✓ Pasted Cash Book (${store.cashBook.length} txns)`;
          dom.dropzoneCB.classList.add("loaded");
        } else {
          store.bankStatement = window.ReconParser.normalizeBankStatement(parsed.records, mapping);
          dom.statusBK.innerHTML = `✓ Pasted Bank Statement (${store.bankStatement.length} txns)`;
          dom.dropzoneBK.classList.add("loaded");
        }

        dom.modalPaste.style.display = "none";
        dom.pasteTextArea.value = "";
        executeReconciliation();
      });
    }

    // Terminal Code Copy Buttons on Dedicated Source Page
    document.querySelectorAll(".code-copy-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-copy-target");
        const el = document.getElementById(targetId);
        if (el) {
          navigator.clipboard.writeText(el.textContent.trim()).then(() => {
            const prev = btn.textContent;
            btn.textContent = "Copied ✓";
            btn.style.borderColor = "#2ca56d";
            btn.style.color = "#2ca56d";
            setTimeout(() => {
              btn.textContent = prev;
              btn.style.borderColor = "";
              btn.style.color = "";
            }, 2000);
          });
        }
      });
    });

    // Keyboard Shortcuts
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (dom.modalBRS) dom.modalBRS.style.display = "none";
        if (dom.modalPaste) dom.modalPaste.style.display = "none";
      }
    });

    // Tolerance Slider
    if (dom.toleranceSlider) {
      dom.toleranceSlider.addEventListener("input", (e) => {
        const val = e.target.value;
        dom.toleranceVal.textContent = `${val}d`;
        state.dateToleranceDays = Number(val);
        const activeStore = getActiveStore();
        if (activeStore.cashBook.length > 0 || activeStore.bankStatement.length > 0) {
          executeReconciliation();
        }
      });
    }

    // Dropzone CB
    dom.dropzoneCB.addEventListener("click", () => dom.fileInputCB.click());
    dom.fileInputCB.addEventListener("change", (e) => handleFileSelect(e, "CB"));
    setupDragDrop(dom.dropzoneCB, "CB");

    // Dropzone BK
    dom.dropzoneBK.addEventListener("click", () => dom.fileInputBK.click());
    dom.fileInputBK.addEventListener("change", (e) => handleFileSelect(e, "BK"));
    setupDragDrop(dom.dropzoneBK, "BK");

    // Filter Tabs
    dom.filterTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        dom.filterTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        state.activeFilter = tab.getAttribute("data-filter");
        renderLedger();
      });
    });

    // Search Input
    dom.searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value.toLowerCase().trim();
      renderLedger();
    });

    // Modern Wheel Scroll Hand-off & Seamless Momentum Chaining
    const ledgerWrap = document.querySelector(".ledger-table-wrap");
    if (ledgerWrap) {
      setupModernScrollChaining(ledgerWrap);
    }
  }

  // Modern Wheel Scroll Chaining (Allows whole screen to scroll seamlessly when hitting top/bottom)
  function setupModernScrollChaining(scrollEl) {
    if (!scrollEl) return;

    scrollEl.addEventListener("wheel", (e) => {
      const delta = e.deltaY;
      if (!delta) return;

      const atTop = scrollEl.scrollTop <= 1;
      const atBottom = scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight - 1;

      // When already at top and continuing to scroll up -> hand off directly to window
      if (delta < 0 && atTop) {
        window.scrollBy({ top: delta, behavior: "auto" });
        return;
      }

      // When already at bottom and continuing to scroll down -> hand off directly to window
      if (delta > 0 && atBottom) {
        window.scrollBy({ top: delta, behavior: "auto" });
        return;
      }

      // If scrolling up and stroke reaches the top boundary, hand off the remaining delta
      if (delta < 0 && scrollEl.scrollTop < Math.abs(delta)) {
        const remaining = delta + scrollEl.scrollTop;
        scrollEl.scrollTop = 0;
        window.scrollBy({ top: remaining, behavior: "auto" });
        e.preventDefault();
        return;
      }

      // If scrolling down and stroke reaches the bottom boundary, hand off the remaining delta
      const distToBottom = scrollEl.scrollHeight - scrollEl.scrollTop - scrollEl.clientHeight;
      if (delta > 0 && distToBottom < delta) {
        const remaining = delta - distToBottom;
        scrollEl.scrollTop = scrollEl.scrollHeight;
        window.scrollBy({ top: remaining, behavior: "auto" });
        e.preventDefault();
        return;
      }
    }, { passive: false });
  }

  // Setup Drag & Drop Handlers
  function setupDragDrop(zone, type) {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
      zone.classList.add("dragover");
    });
    zone.addEventListener("dragleave", () => zone.classList.remove("dragover"));
    zone.addEventListener("drop", (e) => {
      e.preventDefault();
      zone.classList.remove("dragover");
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        processUploadedFile(e.dataTransfer.files[0], type);
      }
    });
  }

  // Handle File Input Selection
  function handleFileSelect(e, type) {
    if (e.target.files && e.target.files[0]) {
      processUploadedFile(e.target.files[0], type);
    }
  }

  // Read and parse uploaded file (Supports Excel .xlsx, .xls, .csv, .tsv, .txt)
  function processUploadedFile(file, type) {
    if (!file) return;

    const fileName = (file.name || "").toLowerCase();
    const isExcel = fileName.endsWith(".xlsx") || fileName.endsWith(".xls") || fileName.endsWith(".ods");

    const reader = new FileReader();
    reader.onerror = () => alert(`Error reading ${file.name}`);

    reader.onload = (evt) => {
      try {
        let parsed;
        if (isExcel) {
          parsed = window.ReconParser.parseWorkbook(evt.target.result);
        } else {
          parsed = window.ReconParser.parseCSVText(evt.target.result);
        }

        if (!parsed || !parsed.records || parsed.records.length === 0) {
          alert(`No valid tabular transaction rows found in ${file.name}. Please check that the file has column headers and rows.`);
          return;
        }

        const mapping = window.ReconParser.detectColumns(parsed.headers);
        const store = getActiveStore();

        if (type === "CB") {
          store.cashBook = window.ReconParser.normalizeCashBook(parsed.records, mapping);
          dom.statusCB.innerHTML = `✓ ${escapeHtml(file.name)} (${store.cashBook.length} txns)`;
          dom.dropzoneCB.classList.add("loaded");
        } else {
          store.bankStatement = window.ReconParser.normalizeBankStatement(parsed.records, mapping);
          dom.statusBK.innerHTML = `✓ ${escapeHtml(file.name)} (${store.bankStatement.length} txns)`;
          dom.dropzoneBK.classList.add("loaded");
        }

        executeReconciliation();
      } catch (err) {
        console.error("Recon file parse error:", err);
        alert(`Error processing ${file.name}: ` + err.message);
      }
    };

    if (isExcel) {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }
  }

  // Load Preset in Demo Mode (Silent, Clean)
  function loadPreset(presetKey) {
    const preset = window.RECON_PRESETS[presetKey] || window.RECON_PRESETS.techCorp;
    state.currentPreset = presetKey;
    state.demo.metadata = {
      companyName: preset.name,
      bankName: preset.bankName,
      reconciliationDate: preset.reconciliationDate,
      openingCashBookBalance: preset.openingCashBookBalance,
      openingBankBalance: preset.openingBankBalance
    };
    state.demo.cashBook = JSON.parse(JSON.stringify(preset.cashBookRows));
    state.demo.bankStatement = JSON.parse(JSON.stringify(preset.bankStatementRows));

    // Update Dropzone indicators with clean company titles
    const shortCompanyName = preset.name.split("(")[0].trim();
    const shortBankName = preset.bankName.split("(")[0].trim();
    dom.statusCB.innerHTML = `✓ <strong>${shortCompanyName}</strong> (${state.demo.cashBook.length} records)`;
    dom.statusBK.innerHTML = `✓ <strong>${shortBankName}</strong> (${state.demo.bankStatement.length} records)`;
    dom.dropzoneCB.classList.add("loaded");
    dom.dropzoneBK.classList.add("loaded");

    // Synchronize Header Preset Selector
    if (dom.presetSelect && dom.presetSelect.value !== presetKey) {
      dom.presetSelect.value = presetKey;
    }

    // Synchronize Cockpit Chip Buttons
    document.querySelectorAll("#demoPresetsChips .demo-chip").forEach(chip => {
      chip.classList.toggle("active", chip.getAttribute("data-preset") === presetKey);
    });

    // Update Cockpit Titles & Intel Highlights
    if (dom.demoActiveTitle) dom.demoActiveTitle.textContent = preset.name;
    if (dom.demoActiveSub) dom.demoActiveSub.textContent = `${preset.bankName} · Reconciliation As Of ${preset.reconciliationDate}`;
    if (dom.demoHighlightText) dom.demoHighlightText.textContent = preset.highlights || "Authentic corporate banking scenario.";

    executeReconciliation();
  }

  // Clear Dashboard Data
  function clearDashboardData() {
    state.dashboard.cashBook = [];
    state.dashboard.bankStatement = [];
    state.dashboard.reconResult = null;
    dom.fileInputCB.value = "";
    dom.fileInputBK.value = "";
    renderBlankDashboard();
  }

  // Execute Core Reconciliation
  function executeReconciliation() {
    const store = getActiveStore();
    if (store.cashBook.length === 0 && store.bankStatement.length === 0) {
      renderBlankDashboard();
      return;
    }

    store.reconResult = window.ReconEngine.reconcile(
      store.cashBook, 
      store.bankStatement, 
      store.metadata,
      {
        dateToleranceDays: state.dateToleranceDays
      }
    );

    updateKPIs();
    updateFilterCounts();
    renderLedger();
  }

  // Update Top Metric Stat Cards
  function updateKPIs() {
    const store = getActiveStore();
    if (!store.reconResult) return;
    const { summary } = store.reconResult;

    dom.kpiCashBookBal.textContent = formatCurr(summary.closingCashBookBalance);
    dom.kpiCashBookSub.textContent = store.metadata.companyName.split(" ")[0] + " " + (t("kpi_cb_bal").split(" ")[0] || "Ledger");

    dom.kpiBankBal.textContent = formatCurr(summary.closingBankBalance);
    dom.kpiBankSub.textContent = store.metadata.bankName.split(" ")[0] + " " + (t("kpi_bk_bal").split(" ")[0] || "Passbook");

    dom.kpiVariance.textContent = summary.variance < 0.05 ? "₹0.00 (NIL)" : formatCurr(summary.variance);
    dom.kpiVariance.style.color = summary.variance < 0.05 ? "var(--status-matched)" : "var(--status-discrepancy)";
    dom.kpiVarianceSub.textContent = summary.variance < 0.05 ? t("kpi_variance_settled") : t("kpi_variance_unsettled");

    dom.kpiMatchRate.textContent = `${summary.matchRate}%`;
  }

  // Update counts on filter tabs
  function updateFilterCounts() {
    const store = getActiveStore();
    const r = store ? store.reconResult : null;
    const countAll = r ? r.alignedRows.length : 0;
    const countMatched = r ? r.matchedPairs.length : 0;
    const countTiming = r ? r.timingDifferences.length : 0;
    const countMissing = r ? r.missingInCashBook.length : 0;
    const countDiscrepancies = r ? r.discrepancies.length : 0;

    const setBadge = (id, count) => {
      const el = document.getElementById(id);
      if (el) el.textContent = count;
    };

    setBadge("countTabAll", countAll);
    setBadge("countTabMatched", countMatched);
    setBadge("countTabTiming", countTiming);
    setBadge("countTabMissing", countMissing);
    setBadge("countTabDiscrepancy", countDiscrepancies);
  }

  // Render Aligned Side-by-Side Reconciliation Ledger
  function renderLedger() {
    const store = getActiveStore();
    if (!store || !store.reconResult) {
      renderBlankDashboard();
      return;
    }
    const r = store.reconResult;
    const q = state.searchQuery;

    const filterPredicate = (row) => {
      if (state.activeFilter === "all") return true;
      if (state.activeFilter === "matched") return row.status === "MATCHED";
      if (state.activeFilter === "timing") return row.status === "TIMING";
      if (state.activeFilter === "missing") return row.status === "MISSING";
      if (state.activeFilter === "discrepancy") return row.status === "DISCREPANCY";
      return true;
    };

    const matchQuery = (row) => {
      if (!q) return true;
      return (
        row.cbDesc.toLowerCase().includes(q) ||
        row.bkDesc.toLowerCase().includes(q) ||
        row.cbRef.toLowerCase().includes(q) ||
        row.bkRef.toLowerCase().includes(q) ||
        row.cbDate.includes(q) ||
        row.bkDate.includes(q)
      );
    };

    let html = "";
    let visibleCount = 0;

    r.alignedRows.forEach(row => {
      if (!filterPredicate(row) || !matchQuery(row)) return;
      visibleCount++;

      const isMismatch = row.status === "DISCREPANCY";
      const isMatched = row.status === "MATCHED";
      const isTiming = row.status === "TIMING";
      const isMissing = row.status === "MISSING";

      const rowClass = isMatched ? "row-matched" : isTiming ? "row-timing" : isMismatch ? "row-discrepancy" : "";
      const badgeLabel = row.badgeKey ? t(row.badgeKey) : row.label;
      const notesText = row.notesKey ? t(row.notesKey, row.notesParams) : row.notes;

      html += `
        <tr class="${rowClass}">
          <td><span class="badge ${row.badgeClass}">${escapeHtml(badgeLabel)}</span></td>
          <td class="col-date">${escapeHtml(row.cbDate)}</td>
          <td class="col-ref">${escapeHtml(row.cbRef || "—")}</td>
          <td class="col-desc" style="max-width: 200px;">${escapeHtml(row.cbDesc)}</td>
          <td class="col-amount" style="text-align: right; font-weight: 700;">
            ${formatCurr(row.cbAmount)}
          </td>
          <td style="text-align: center; color: var(--text-muted); font-size: 0.8rem;">
            ${isMatched ? '⇄' : isMismatch ? '⚠️' : isTiming ? '⏳' : '⚡'}
          </td>
          <td class="col-amount" style="text-align: right; font-weight: 700; ${isMismatch ? 'color: var(--status-discrepancy);' : ''}">
            ${formatCurr(row.bkAmount)}
          </td>
          <td class="col-desc" style="max-width: 220px;">${escapeHtml(row.bkDesc)}</td>
          <td class="col-date">${escapeHtml(row.bkDate)}</td>
          <td style="font-size: 0.74rem; color: ${isMismatch ? 'var(--status-discrepancy)' : isTiming ? 'var(--status-timing)' : isMissing ? 'var(--status-unrecorded)' : 'var(--text-muted)'}; font-family: var(--font-mono);">
            ${escapeHtml(notesText)}
          </td>
        </tr>
      `;
    });

    dom.tableBodyAligned.innerHTML = html || `<tr><td colspan="10" style="text-align: center; color: var(--text-muted); padding: 32px;">${t("no_matching_found")}</td></tr>`;
    dom.countLedger.textContent = `${visibleCount} ${t("rows_label")}`;
  }

  // Start on load
  document.addEventListener("DOMContentLoaded", init);
})();
