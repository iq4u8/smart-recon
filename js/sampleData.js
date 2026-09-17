/* ==========================================================================
   IQ4U8 SMARTRECON — MULTI-SCENARIO COMMERCIAL DATASETS
   100% Authentic Indian Corporate & SME Financial Scenarios
   Author: Priyanshu Pandey (IQ4U8)
   ========================================================================== */

window.RECON_PRESETS = {
  // PRESET 1: Tech Startup Q4 Fiscal Closing (Realistic Mixed BRS with Transit & Charges)
  techCorp: {
    id: "techCorp",
    name: "Apex Cloud Technologies Pvt Ltd (Q4 Fiscal Closing)",
    bankName: "HDFC Bank Corporate Current A/c #50200088921102",
    reconciliationDate: "2026-03-31",
    openingCashBookBalance: 580450.00,
    openingBankBalance: 580450.00,
    highlights: "28 Transactions · 2 Cheques in Transit · 1 Transposition Error (Rule-of-9 Flagged) · 2 Direct Bank Entries",
    cashBookRows: [
      { id: "CB-101", date: "2026-03-02", refNo: "NEFT-7811", description: "InfraSoft Solutions - Monthly Cloud SaaS Subscription", debit: 0, credit: 45000.00 },
      { id: "CB-102", date: "2026-03-04", refNo: "RTGS-9901", description: "Client Inflow - Zen Retail Corp Inward Payment", debit: 280000.00, credit: 0 },
      { id: "CB-103", date: "2026-03-06", refNo: "CHQ-401810", description: "Office Space Lease - DLF CyberCity Towers", debit: 0, credit: 125000.00 },
      { id: "CB-104", date: "2026-03-08", refNo: "IMPS-3342", description: "Chroma Electronics - Workstation Peripherals", debit: 0, credit: 34200.00 },
      { id: "CB-105", date: "2026-03-10", refNo: "CMS-5512", description: "Client Retainer - Tata Consultancy Services", debit: 340000.00, credit: 0 },
      { id: "CB-106", date: "2026-03-12", refNo: "CHQ-401812", description: "Airtel Enterprise Dedicated Leased Line 1Gbps", debit: 0, credit: 14850.00 },
      { id: "CB-107", date: "2026-03-14", refNo: "NEFT-4421", description: "March Mid-Month Engineering Incentive Payout", debit: 0, credit: 96000.00 },
      { id: "CB-108", date: "2026-03-16", refNo: "CHQ-401815", description: "Shree Logistics Express Cargo Freight", debit: 0, credit: 24500.00 }, // Transposition with Bank (Bank: 25,400)
      { id: "CB-109", date: "2026-03-17", refNo: "RTGS-1102", description: "Client Milestone Retainer - Reliance Jio Infocomm", debit: 410000.00, credit: 0 },
      { id: "CB-110", date: "2026-03-19", refNo: "CHQ-401818", description: "Statutory Auditor & Tax Audit Professional Fees", debit: 0, credit: 50000.00 },
      { id: "CB-111", date: "2026-03-20", refNo: "NEFT-9021", description: "GitHub Enterprise Annual License Renewal", debit: 0, credit: 62400.00 },
      { id: "CB-112", date: "2026-03-21", refNo: "RTGS-3310", description: "Client Inward Milestone - Infosys BPM Ltd", debit: 195000.00, credit: 0 },
      { id: "CB-113", date: "2026-03-22", refNo: "CHQ-401819", description: "Star Health Corporate Group Mediclaim Premium", debit: 0, credit: 78500.00 },
      { id: "CB-114", date: "2026-03-23", refNo: "IMPS-5501", description: "Google Workspace & Cloud Storage 150 Seats", debit: 0, credit: 18900.00 },
      { id: "CB-115", date: "2026-03-24", refNo: "CMS-6620", description: "Customer Milestone - Wipro Technologies Ltd", debit: 225000.00, credit: 0 },
      { id: "CB-116", date: "2026-03-25", refNo: "NEFT-8814", description: "Executive Team Travel Reimbursements (MakeMyTrip)", debit: 0, credit: 31200.00 },
      { id: "CB-117", date: "2026-03-26", refNo: "RTGS-4412", description: "Client Inflow - HCL Technologies Enterprise App", debit: 315000.00, credit: 0 },
      { id: "CB-118", date: "2026-03-26", refNo: "CHQ-401820", description: "Office Pantry & Cafeteria Vendor Supplies", debit: 0, credit: 16500.00 },
      { id: "CB-119", date: "2026-03-27", refNo: "NEFT-6632", description: "Contract DevOps Engineering Agency Retainer", debit: 0, credit: 88000.00 },
      { id: "CB-120", date: "2026-03-27", refNo: "CMS-7740", description: "Client Payment - L&T Technology Services", debit: 175000.00, credit: 0 },
      { id: "CB-121", date: "2026-03-28", refNo: "CHQ-401821", description: "Dell India - Server Hardware Blade Upgrade", debit: 0, credit: 124500.00 }, // Uncleared Issued Cheque
      { id: "CB-122", date: "2026-03-28", refNo: "IMPS-7711", description: "Datadog Cloud Observability Monthly Tier", debit: 0, credit: 22800.00 },
      { id: "CB-123", date: "2026-03-29", refNo: "CHQ-401822", description: "WeWork Executive Meeting Suites Booking", debit: 0, credit: 12600.00 },
      { id: "CB-124", date: "2026-03-29", refNo: "RTGS-7890", description: "Client Inflow - Tech Mahindra Cloud Migration", debit: 260000.00, credit: 0 },
      { id: "CB-125", date: "2026-03-30", refNo: "CHQ-401825", description: "Office Supplies Mart - Fiscal Year Stationery", debit: 0, credit: 18400.00 }, // Uncleared Issued Cheque
      { id: "CB-126", date: "2026-03-30", refNo: "DEP-881204", description: "Customer Cheque - Starlight Media Ltd", debit: 85000.00, credit: 0 }, // Deposited Not Cleared
      { id: "CB-127", date: "2026-03-31", refNo: "NEFT-9912", description: "March Month-End Engineering Salary Bulk NEFT", debit: 0, credit: 485000.00 },
      { id: "CB-128", date: "2026-03-31", refNo: "DEP-994101", description: "Direct Client Deposit - Cognizant India", debit: 145000.00, credit: 0 }  // Deposited Not Cleared
    ],
    bankStatementRows: [
      { id: "BK-201", date: "2026-03-02", refNo: "NEFT-7811", description: "ACH DR INFRA SOFT SOLUTIONS BENGALURU", withdrawal: 45000.00, deposit: 0 },
      { id: "BK-202", date: "2026-03-04", refNo: "RTGS-9901", description: "RTGS CR ZEN RETAIL CORP CORP TRF MUMBAI", withdrawal: 0, deposit: 280000.00 },
      { id: "BK-203", date: "2026-03-07", refNo: "CHQ-401810", description: "CLEARING CTS CHQ 401810 DLF TOWERS GURGAON", withdrawal: 125000.00, deposit: 0 },
      { id: "BK-204", date: "2026-03-08", refNo: "IMPS-3342", description: "IMPS P2A CHROMA LTD BENGALURU", withdrawal: 34200.00, deposit: 0 },
      { id: "BK-205", date: "2026-03-10", refNo: "CMS-5512", description: "CMS COLL TATA CONSULTANCY SERVICES", withdrawal: 0, deposit: 340000.00 },
      { id: "BK-206", date: "2026-03-13", refNo: "CHQ-401812", description: "CLEARING CTS CHQ 401812 BHARTI AIRTEL", withdrawal: 14850.00, deposit: 0 },
      { id: "BK-207", date: "2026-03-14", refNo: "NEFT-4421", description: "BULK SALARY TRF NEFT-4421 HRMS", withdrawal: 96000.00, deposit: 0 },
      { id: "BK-208", date: "2026-03-17", refNo: "CHQ-401815", description: "CLEARING CTS CHQ 401815 SHREE LOGISTICS", withdrawal: 25400.00, deposit: 0 }, // Actual Bank: 25400 (Diff: 900)
      { id: "BK-209", date: "2026-03-17", refNo: "RTGS-1102", description: "RTGS INWARD RELIANCE JIO INFOCOMM MUMBAI", withdrawal: 0, deposit: 410000.00 },
      { id: "BK-210", date: "2026-03-20", refNo: "CHQ-401818", description: "CTS CLG CHQ 401818 AUDIT PARTNERS", withdrawal: 50000.00, deposit: 0 },
      { id: "BK-211", date: "2026-03-20", refNo: "NEFT-9021", description: "NEFT OUTWARD GITHUB ENTERPRISE SUBS", withdrawal: 62400.00, deposit: 0 },
      { id: "BK-212", date: "2026-03-21", refNo: "RTGS-3310", description: "RTGS CR INFOSYS BPM BENGALURU TRF", withdrawal: 0, deposit: 195000.00 },
      { id: "BK-213", date: "2026-03-23", refNo: "CHQ-401819", description: "CTS CLEARING STAR HEALTH ALLIED INS", withdrawal: 78500.00, deposit: 0 },
      { id: "BK-214", date: "2026-03-23", refNo: "IMPS-5501", description: "IMPS GOOGLE CLOUD INDIA HYDERABAD", withdrawal: 18900.00, deposit: 0 },
      { id: "BK-215", date: "2026-03-24", refNo: "CMS-6620", description: "CMS INWARD WIPRO ENTERPRISE SERVICES", withdrawal: 0, deposit: 225000.00 },
      { id: "BK-216", date: "2026-03-25", refNo: "NEFT-8814", description: "NEFT MAKEMYTRIP INDIA CORP TRAVEL", withdrawal: 31200.00, deposit: 0 },
      { id: "BK-217", date: "2026-03-26", refNo: "RTGS-4412", description: "RTGS INWARD HCL TECHNOLOGIES NOIDA", withdrawal: 0, deposit: 315000.00 },
      { id: "BK-218", date: "2026-03-27", refNo: "CHQ-401820", description: "CLEARING CTS CHQ 401820 SODEXO PANTRY", withdrawal: 16500.00, deposit: 0 },
      { id: "BK-219", date: "2026-03-27", refNo: "NEFT-6632", description: "NEFT DEVOPS CONSULTING SERVICES", withdrawal: 88000.00, deposit: 0 },
      { id: "BK-220", date: "2026-03-27", refNo: "CMS-7740", description: "CMS COLL L&T TECHNOLOGY SERVICES", withdrawal: 0, deposit: 175000.00 },
      { id: "BK-221", date: "2026-03-28", refNo: "IMPS-7711", description: "IMPS DATADOG OBSERVABILITY USA", withdrawal: 22800.00, deposit: 0 },
      { id: "BK-222", date: "2026-03-29", refNo: "CHQ-401822", description: "CTS CLG WEWORK WORKPLACES INDIA", withdrawal: 12600.00, deposit: 0 },
      { id: "BK-223", date: "2026-03-29", refNo: "RTGS-7890", description: "RTGS CR TECH MAHINDRA ENTERPRISE", withdrawal: 0, deposit: 260000.00 },
      { id: "BK-224", date: "2026-03-31", refNo: "NEFT-9912", description: "BULK SALARY DISBURSEMENT MARCH NEFT", withdrawal: 485000.00, deposit: 0 },
      { id: "BK-225", date: "2026-03-30", refNo: "AUTODR-8921", description: "POS INTL AWS CLOUD SERVICES AMAZON WEB SEATTLE", withdrawal: 42300.00, deposit: 0 }, // Auto Debit Bank Only
      { id: "BK-226", date: "2026-03-31", refNo: "CHG-HDFC-Q4", description: "Q4 CORP NETBANKING AMC + GST 18%", withdrawal: 885.00, deposit: 0 }, // Bank Charge
      { id: "BK-227", date: "2026-03-31", refNo: "INT-SWEEP-03", description: "INTEREST CR SWEEP DEPOSIT 91D TERM AUTO", withdrawal: 0, deposit: 12450.00 }, // Bank Interest
      { id: "BK-228", date: "2026-03-31", refNo: "DIV-TCS-03", description: "ACH CR DIVIDEND TCS EQUITY TREASURY PORTFOLIO", withdrawal: 0, deposit: 8200.00 } // Direct Inward Dividend
    ]
  },

  // PRESET 2: Supermarket Retail Chain (High-Volume POS, Supplier Cheques & Card Fees)
  retailMart: {
    id: "retailMart",
    name: "SmartBazaar Hypermarket & Retail Outlets LLP",
    bankName: "State Bank of India Corporate Current A/c #39100293810",
    reconciliationDate: "2026-03-31",
    openingCashBookBalance: 320000.00,
    openingBankBalance: 320000.00,
    highlights: "26 Transactions · Daily Card/UPI Settlements · Supplier Cheques In Transit · Bank Swipe MDR Fee",
    cashBookRows: [
      { id: "CB-201", date: "2026-03-02", refNo: "POS-4401", description: "Weekend POS & UPI Collection - Flagship Store #01", debit: 185400.00, credit: 0 },
      { id: "CB-202", date: "2026-03-03", refNo: "CHQ-9102", description: "Amul Dairy Fresh Milk & Dairy Consignment", debit: 0, credit: 64200.00 },
      { id: "CB-203", date: "2026-03-05", refNo: "NEFT-1120", description: "Hindustan Unilever FMCG Consignment Payout", debit: 0, credit: 112000.00 },
      { id: "CB-204", date: "2026-03-07", refNo: "POS-4402", description: "Mid-Week Card & UPI Collection - Express Store #02", debit: 142000.00, credit: 0 },
      { id: "CB-205", date: "2026-03-09", refNo: "CHQ-9105", description: "Store Electricity & Diesel Generator Fuel (MP Discom)", debit: 0, credit: 28500.00 },
      { id: "CB-206", date: "2026-03-11", refNo: "POS-4403", description: "Store #03 Counter Collections (Paytm/PineLabs)", debit: 168000.00, credit: 0 },
      { id: "CB-207", date: "2026-03-13", refNo: "CHQ-9108", description: "Nestle India Baby Foods & Maggi Noodles Stock", debit: 0, credit: 84300.00 },
      { id: "CB-208", date: "2026-03-15", refNo: "NEFT-2214", description: "Mid-Month Cashier & Store Staff Advance Payroll", debit: 0, credit: 95000.00 },
      { id: "CB-209", date: "2026-03-16", refNo: "POS-4404", description: "Sunday Mega Sale POS Settlements (All Outlets)", debit: 345000.00, credit: 0 },
      { id: "CB-210", date: "2026-03-18", refNo: "CHQ-9109", description: "ITC Ltd Food & Consumer Goods Supply", debit: 0, credit: 128000.00 },
      { id: "CB-211", date: "2026-03-20", refNo: "NEFT-3341", description: "Commercial Rent for Retail Hub Mall Store #01", debit: 0, credit: 165000.00 },
      { id: "CB-212", date: "2026-03-22", refNo: "POS-4405", description: "Weekly Counter Collections - Store #04", debit: 124000.00, credit: 0 },
      { id: "CB-213", date: "2026-03-24", refNo: "CHQ-9112", description: "Mother Dairy Ice Cream & Ghee Replenishment", debit: 0, credit: 42000.00 },
      { id: "CB-214", date: "2026-03-25", refNo: "NEFT-5510", description: "Packaging Material Bags & Carton Boxes", debit: 0, credit: 18500.00 },
      { id: "CB-215", date: "2026-03-26", refNo: "POS-4406", description: "Mid-Week Card Settlements - Store #01 & #02", debit: 198000.00, credit: 0 },
      { id: "CB-216", date: "2026-03-27", refNo: "CHQ-9114", description: "Haldiram Snacks & Confectionery Delivery", debit: 0, credit: 56000.00 },
      { id: "CB-217", date: "2026-03-28", refNo: "CHQ-9115", description: "SIS Security Agency Guard Monthly Billing", debit: 0, credit: 36000.00 },
      { id: "CB-218", date: "2026-03-29", refNo: "CHQ-9118", description: "Britannia Biscuits & Bakery Restock", debit: 0, credit: 47800.00 }, // Uncleared Issued Cheque
      { id: "CB-219", date: "2026-03-29", refNo: "CHQ-9119", description: "Dabur India Ayurvedic & Personal Care Supply", debit: 0, credit: 38900.00 }, // Uncleared Issued Cheque
      { id: "CB-220", date: "2026-03-30", refNo: "DEP-9920", description: "B2B Catering Cheque - Hotel Grand Palace", debit: 75000.00, credit: 0 }, // Deposited Uncleared
      { id: "CB-221", date: "2026-03-30", refNo: "POS-4407", description: "Weekend Mega Sale Card Swipe Batch #4407", debit: 290000.00, credit: 0 },
      { id: "CB-222", date: "2026-03-31", refNo: "CHQ-9120", description: "Coca-Cola India Beverage Bottling Supply", debit: 0, credit: 62000.00 },
      { id: "CB-223", date: "2026-03-31", refNo: "DEP-9925", description: "Institutional Client Cheque - City Club Cafeteria", debit: 52000.00, credit: 0 }, // Deposited Uncleared
      { id: "CB-224", date: "2026-03-31", refNo: "NEFT-8890", description: "Store Staff Month-End Consolidated Wages", debit: 0, credit: 215000.00 },
      { id: "CB-225", date: "2026-03-31", refNo: "CHQ-9122", description: "Pest Control & Sanitation Services (All Stores)", debit: 0, credit: 14500.00 }
    ],
    bankStatementRows: [
      { id: "BK-301", date: "2026-03-02", refNo: "POS-4401", description: "UPI/EDC BATCH SETTLEMENT STORE #01 PINELABS", withdrawal: 0, deposit: 185400.00 },
      { id: "BK-302", date: "2026-03-04", refNo: "CHQ-9102", description: "CTS CLEARING CHQ 9102 GUJARAT CO-OP AMUL", withdrawal: 64200.00, deposit: 0 },
      { id: "BK-303", date: "2026-03-05", refNo: "NEFT-1120", description: "NEFT OUTWARD HINDUSTAN UNILEVER BENGALURU", withdrawal: 112000.00, deposit: 0 },
      { id: "BK-304", date: "2026-03-07", refNo: "POS-4402", description: "EDC SETTLEMENT STORE #02 SBI SWIPE", withdrawal: 0, deposit: 142000.00 },
      { id: "BK-305", date: "2026-03-10", refNo: "CHQ-9105", description: "CLEARING CHQ 9105 MP DISCOM POWER", withdrawal: 28500.00, deposit: 0 },
      { id: "BK-306", date: "2026-03-11", refNo: "POS-4403", description: "PAYTM EDC MERCHANT BATCH SETTLEMENT STORE 03", withdrawal: 0, deposit: 168000.00 },
      { id: "BK-307", date: "2026-03-14", refNo: "CHQ-9108", description: "CTS CLG CHQ 9108 NESTLE INDIA GURGAON", withdrawal: 84300.00, deposit: 0 },
      { id: "BK-308", date: "2026-03-15", refNo: "NEFT-2214", description: "SALARY DISBURSEMENT ADVANCE NEFT HRMS", withdrawal: 95000.00, deposit: 0 },
      { id: "BK-309", date: "2026-03-17", refNo: "POS-4404", description: "PINELABS EDC SUNDAY BATCH TRF ALL STORES", withdrawal: 0, deposit: 345000.00 },
      { id: "BK-310", date: "2026-03-19", refNo: "CHQ-9109", description: "CTS CLG CHQ 9109 ITC LIMITED FOODS", withdrawal: 128000.00, deposit: 0 },
      { id: "BK-311", date: "2026-03-20", refNo: "NEFT-3341", description: "RTGS OUTWARD PHOENIX MALL LEASING CORP", withdrawal: 165000.00, deposit: 0 },
      { id: "BK-312", date: "2026-03-23", refNo: "POS-4405", description: "UPI QR SETTLEMENT BATCH STORE #04", withdrawal: 0, deposit: 124000.00 },
      { id: "BK-313", date: "2026-03-25", refNo: "CHQ-9112", description: "CTS CLEARING MOTHER DAIRY FRUIT & VEG", withdrawal: 42000.00, deposit: 0 },
      { id: "BK-314", date: "2026-03-25", refNo: "NEFT-5510", description: "NEFT PACKAGING SOLUTIONS INDORE", withdrawal: 18500.00, deposit: 0 },
      { id: "BK-315", date: "2026-03-27", refNo: "POS-4406", description: "EDC SWIPE SETTLEMENT STORE #01 #02", withdrawal: 0, deposit: 198000.00 },
      { id: "BK-316", date: "2026-03-28", refNo: "CHQ-9114", description: "CTS CLG HALDIRAM SNACKS NAGPUR", withdrawal: 56000.00, deposit: 0 },
      { id: "BK-317", date: "2026-03-29", refNo: "CHQ-9115", description: "CTS CLEARING SIS SECURITY GUARDS SERVICES", withdrawal: 36000.00, deposit: 0 },
      { id: "BK-318", date: "2026-03-31", refNo: "POS-4407", description: "PINELABS WEEKEND BATCH CR SWIPE", withdrawal: 0, deposit: 290000.00 },
      { id: "BK-319", date: "2026-03-31", refNo: "CHQ-9120", description: "CTS CLG HINDUSTAN COCA COLA BEVERAGES", withdrawal: 62000.00, deposit: 0 },
      { id: "BK-320", date: "2026-03-31", refNo: "NEFT-8890", description: "BULK SALARY TRF NEFT-8890 STAFF HRMS", withdrawal: 215000.00, deposit: 0 },
      { id: "BK-321", date: "2026-03-31", refNo: "CHQ-9122", description: "CTS CLG SANITATION HYGIENE VENDOR", withdrawal: 14500.00, deposit: 0 },
      { id: "BK-322", date: "2026-03-31", refNo: "SBI-POS-CHG", description: "MONTHLY POS TERMINAL SWIPE MDR FEES", withdrawal: 3450.00, deposit: 0 }, // Unrecorded Bank Charge
      { id: "BK-323", date: "2026-03-31", refNo: "SBI-SMS-Q4", description: "SMS ALERT AND LEDGER FOLIO CHARGES Q4", withdrawal: 17.70, deposit: 0 }, // Unrecorded Charge
      { id: "BK-324", date: "2026-03-31", refNo: "CMS-CASH-DEP", description: "CMS VAN CASH DEPOSIT ARMED CASH TRANSIT", withdrawal: 0, deposit: 110000.00 } // Direct Cash Deposit
    ]
  },

  // PRESET 3: Manufacturing & Heavy Engineering (B2B Trade, Letters of Credit & Cheque Returns)
  manufacturing: {
    id: "manufacturing",
    name: "Bharat Precision Forgings & Heavy Engineering Ltd",
    bankName: "Bank of Baroda Industrial Prime A/c #08410200014589",
    reconciliationDate: "2026-03-31",
    openingCashBookBalance: 1450000.00,
    openingBankBalance: 1450000.00,
    highlights: "24 Transactions · B2B Industrial Trade · Letter of Credit (LC) Debits · Customer Cheque Bounce",
    cashBookRows: [
      { id: "CB-401", date: "2026-03-03", refNo: "RTGS-7701", description: "Tata Steel Ltd - Raw Steel Billet Consignment #44", debit: 0, credit: 650000.00 },
      { id: "CB-402", date: "2026-03-05", refNo: "RTGS-9920", description: "Customer Receipt - Mahindra & Mahindra Automotive OEM", debit: 920000.00, credit: 0 },
      { id: "CB-403", date: "2026-03-07", refNo: "CHQ-6601", description: "Industrial Gases Cylinder Supply (Inox Air Products)", debit: 0, credit: 48500.00 },
      { id: "CB-404", date: "2026-03-10", refNo: "NEFT-1125", description: "Sandvik Coromant India - CNC Tooling Inserts", debit: 0, credit: 135000.00 },
      { id: "CB-405", date: "2026-03-12", refNo: "RTGS-8830", description: "Customer Inflow - Escorts Kubota Tractor Components", debit: 740000.00, credit: 0 },
      { id: "CB-406", date: "2026-03-14", refNo: "CHQ-6604", description: "MSEDCL High Tension Factory Electricity Bill", debit: 0, credit: 285000.00 },
      { id: "CB-407", date: "2026-03-16", refNo: "RTGS-7705", description: "JSW Steel Ltd - Hot Rolled Coils Supply", debit: 0, credit: 520000.00 },
      { id: "CB-408", date: "2026-03-18", refNo: "CMS-4412", description: "Client Milestone - Bharat Forge Sub-Contract Batch #12", debit: 580000.00, credit: 0 },
      { id: "CB-409", date: "2026-03-20", refNo: "CHQ-6608", description: "VRL Logistics Heavy Freight Trailers Transportation", debit: 0, credit: 74000.00 },
      { id: "CB-410", date: "2026-03-22", refNo: "NEFT-4419", description: "Plant Machinery Lubricants & Hydraulic Oils (Castrol)", debit: 0, credit: 38500.00 },
      { id: "CB-411", date: "2026-03-24", refNo: "RTGS-9940", description: "Customer Receipt - Sonalika Tractors Transmission Gears", debit: 460000.00, credit: 0 },
      { id: "CB-412", date: "2026-03-25", refNo: "CHQ-6610", description: "Factory Worker Safety Gear & Uniform Supplier", debit: 0, credit: 26400.00 },
      { id: "CB-413", date: "2026-03-26", refNo: "RTGS-7712", description: "Hindalco Industries - Aluminum Extrusions Batch", debit: 0, credit: 340000.00 },
      { id: "CB-414", date: "2026-03-27", refNo: "CHQ-6612", description: "Industrial Water Treatment Plant Annual Maintenance", debit: 0, credit: 32000.00 },
      { id: "CB-415", date: "2026-03-28", refNo: "CHQ-6615", description: "Siemens Automation - PLC Controller System Spares", debit: 0, credit: 380000.00 }, // Uncleared Issued Cheque
      { id: "CB-416", date: "2026-03-29", refNo: "DEP-8830", description: "Customer Cheque - Jindal Fabricators Components", debit: 425000.00, credit: 0 }, // Deposited Not Cleared
      { id: "CB-417", date: "2026-03-30", refNo: "CHQ-6618", description: "Apex Industrial Weighbridge Annual Calibration Fee", debit: 0, credit: 15000.00 },
      { id: "CB-418", date: "2026-03-30", refNo: "DEP-8835", description: "Customer Advance Cheque - Precision Steels Pune", debit: 180000.00, credit: 0 }, // Deposited Not Cleared
      { id: "CB-419", date: "2026-03-31", refNo: "RTGS-9960", description: "Month-End Factory Technicians & Engineers Consolidated Wages", debit: 0, credit: 620000.00 }
    ],
    bankStatementRows: [
      { id: "BK-501", date: "2026-03-03", refNo: "RTGS-7701", description: "RTGS OUTWARD TATA STEEL JAMSHEDPUR", withdrawal: 650000.00, deposit: 0 },
      { id: "BK-502", date: "2026-03-05", refNo: "RTGS-9920", description: "RTGS CR MAHINDRA & MAHINDRA AUTO PUNE", withdrawal: 0, deposit: 920000.00 },
      { id: "BK-503", date: "2026-03-08", refNo: "CHQ-6601", description: "CTS CLG CHQ 6601 INOX AIR PRODUCTS", withdrawal: 48500.00, deposit: 0 },
      { id: "BK-504", date: "2026-03-10", refNo: "NEFT-1125", description: "NEFT SANDVIK COROMANT PUNE CNC", withdrawal: 135000.00, deposit: 0 },
      { id: "BK-505", date: "2026-03-12", refNo: "RTGS-8830", description: "RTGS INWARD ESCORTS KUBOTA FARIDABAD", withdrawal: 0, deposit: 740000.00 },
      { id: "BK-506", date: "2026-03-15", refNo: "CHQ-6604", description: "CTS CLEARING MSEDCL POWER BILL", withdrawal: 285000.00, deposit: 0 },
      { id: "BK-507", date: "2026-03-16", refNo: "RTGS-7705", description: "RTGS JSW STEEL BELLARY KARNATAKA", withdrawal: 520000.00, deposit: 0 },
      { id: "BK-508", date: "2026-03-18", refNo: "CMS-4412", description: "CMS COLL BHARAT FORGE PUNE COMPONENTS", withdrawal: 0, deposit: 580000.00 },
      { id: "BK-509", date: "2026-03-21", refNo: "CHQ-6608", description: "CTS CLG VRL LOGISTICS HUBLI", withdrawal: 74000.00, deposit: 0 },
      { id: "BK-510", date: "2026-03-22", refNo: "NEFT-4419", description: "NEFT CASTROL LUBRICANTS INDIA", withdrawal: 38500.00, deposit: 0 },
      { id: "BK-511", date: "2026-03-24", refNo: "RTGS-9940", description: "RTGS CR SONALIKA TRACTORS HOSHIARPUR", withdrawal: 0, deposit: 460000.00 },
      { id: "BK-512", date: "2026-03-26", refNo: "CHQ-6610", description: "CTS CLEARING SAFETY SOLUTIONS SURAT", withdrawal: 26400.00, deposit: 0 },
      { id: "BK-513", date: "2026-03-26", refNo: "RTGS-7712", description: "RTGS HINDALCO EXT INDORE", withdrawal: 340000.00, deposit: 0 },
      { id: "BK-514", date: "2026-03-28", refNo: "CHQ-6612", description: "CTS CLG THERMAX WATER SYSTEMS", withdrawal: 32000.00, deposit: 0 },
      { id: "BK-515", date: "2026-03-31", refNo: "CHQ-6618", description: "CTS CLEARING WEIGHBRIDGE CERT", withdrawal: 15000.00, deposit: 0 },
      { id: "BK-516", date: "2026-03-31", refNo: "RTGS-9960", description: "BULK FACTORY SALARY MAR 2026 WAGES", withdrawal: 620000.00, deposit: 0 },
      { id: "BK-517", date: "2026-03-30", refNo: "BOB-LC-FEE", description: "COMMISSION DEBIT FOR FOREIGN LETTER OF CREDIT (LC)", withdrawal: 18500.00, deposit: 0 }, // Bank Only
      { id: "BK-518", date: "2026-03-31", refNo: "CHQ-RET-MEMO", description: "CHEQUE RETURN INWARD UNPAID MEMO PENALTY", withdrawal: 590.00, deposit: 0 }, // Bank Only
      { id: "BK-519", date: "2026-03-31", refNo: "INT-TREASURY", description: "INTEREST CREDIT CASH CREDIT SURPLUS SWEEP", withdrawal: 0, deposit: 24800.00 } // Bank Only
    ]
  },

  // PRESET 4: Healthcare & Diagnostics (Cashless Insurance TPA, Medicine Vendors & Auto-EMIs)
  healthcare: {
    id: "healthcare",
    name: "MedLife Multi-Specialty Hospital & Research Institute",
    bankName: "Axis Bank Healthcare Prime A/c #918020038821094",
    reconciliationDate: "2026-03-31",
    openingCashBookBalance: 890000.00,
    openingBankBalance: 890000.00,
    highlights: "22 Transactions · Insurance TPA Inflows · Siemens MRI Auto-EMI · Biomedical Waste Charges",
    cashBookRows: [
      { id: "CB-501", date: "2026-03-02", refNo: "TPA-101", description: "Star Health Cashless Inpatient Claims Batch #441", debit: 340000.00, credit: 0 },
      { id: "CB-502", date: "2026-03-04", refNo: "NEFT-8812", description: "Abbott Healthcare - Critical Care Antibiotics Supply", debit: 0, credit: 115000.00 },
      { id: "CB-503", date: "2026-03-06", refNo: "CHQ-3301", description: "Liquid Medical Oxygen Tank Refilling (Praxair)", debit: 0, credit: 68000.00 },
      { id: "CB-504", date: "2026-03-09", refNo: "TPA-102", description: "ICICI Lombard General Insurance Claims Settlement", debit: 290000.00, credit: 0 },
      { id: "CB-505", date: "2026-03-11", refNo: "NEFT-8815", description: "Cipla Pharmaceuticals - Oncology & Cardiac Drugs", debit: 0, credit: 145000.00 },
      { id: "CB-506", date: "2026-03-14", refNo: "CHQ-3304", description: "BD India - Single-Use Syringes & IV Infusion Sets", debit: 0, credit: 38200.00 },
      { id: "CB-507", date: "2026-03-16", refNo: "TPA-103", description: "HDFC ERGO Health Inpatient Surgeries Claim Settlement", debit: 410000.00, credit: 0 },
      { id: "CB-508", date: "2026-03-18", refNo: "NEFT-8820", description: "Visiting Consultant Specialists Professional Surgeon Fees", debit: 0, credit: 195000.00 },
      { id: "CB-509", date: "2026-03-21", refNo: "CHQ-3308", description: "Hospital Linen & Sterilized Uniform Laundry Vendor", debit: 0, credit: 28400.00 },
      { id: "CB-510", date: "2026-03-23", refNo: "TPA-104", description: "Bajaj Allianz General Insurance Cashless Batch", debit: 220000.00, credit: 0 },
      { id: "CB-511", date: "2026-03-25", refNo: "NEFT-8825", description: "Roche Diagnostics - Biochemistry Reagents & Kits", debit: 0, credit: 74500.00 },
      { id: "CB-512", date: "2026-03-27", refNo: "CHQ-3312", description: "Medtronic India - Cardiac Stents & Orthopedic Implants", debit: 0, credit: 118000.00 }, // Uncleared Issued Cheque
      { id: "CB-513", date: "2026-03-28", refNo: "CHQ-3315", description: "Hospital Cafeteria & Patient Dietary Nutrition Supplies", debit: 0, credit: 46000.00 },
      { id: "CB-514", date: "2026-03-29", refNo: "DEP-7710", description: "Corporate Health Checkup Cheque - Tata Motors", debit: 185000.00, credit: 0 }, // Deposited Not Cleared
      { id: "CB-515", date: "2026-03-30", refNo: "TPA-105", description: "Care Health Insurance Third Party Cashless Settlement", debit: 310000.00, credit: 0 },
      { id: "CB-516", date: "2026-03-31", refNo: "NEFT-9940", description: "Nursing & ICU Resident Doctors Consolidated Monthly Salaries", debit: 0, credit: 540000.00 }
    ],
    bankStatementRows: [
      { id: "BK-601", date: "2026-03-02", refNo: "TPA-101", description: "NEFT CR STAR HEALTH INSURANCE CHENNAI", withdrawal: 0, deposit: 340000.00 },
      { id: "BK-602", date: "2026-03-04", refNo: "NEFT-8812", description: "NEFT OUTWARD ABBOTT HEALTHCARE MUMBAI", withdrawal: 115000.00, deposit: 0 },
      { id: "BK-603", date: "2026-03-07", refNo: "CHQ-3301", description: "CTS CLEARING PRAXAIR INDIA OXYGEN", withdrawal: 68000.00, deposit: 0 },
      { id: "BK-604", date: "2026-03-09", refNo: "TPA-102", description: "RTGS CR ICICI LOMBARD HEALTH BATCH", withdrawal: 0, deposit: 290000.00 },
      { id: "BK-605", date: "2026-03-11", refNo: "NEFT-8815", description: "NEFT CIPLA LIMITED PHARMA GOA", withdrawal: 145000.00, deposit: 0 },
      { id: "BK-606", date: "2026-03-15", refNo: "CHQ-3304", description: "CTS CLG BECTON DICKINSON INDIA", withdrawal: 38200.00, deposit: 0 },
      { id: "BK-607", date: "2026-03-16", refNo: "TPA-103", description: "RTGS CR HDFC ERGO GENERAL INSURANCE", withdrawal: 0, deposit: 410000.00 },
      { id: "BK-608", date: "2026-03-18", refNo: "NEFT-8820", description: "BULK SURGEON RETAINER NEFT DISBURSEMENT", withdrawal: 195000.00, deposit: 0 },
      { id: "BK-609", date: "2026-03-22", refNo: "CHQ-3308", description: "CTS CLEARING CLEANCARE LINEN SOLUTIONS", withdrawal: 28400.00, deposit: 0 },
      { id: "BK-610", date: "2026-03-23", refNo: "TPA-104", description: "NEFT INWARD BAJAJ ALLIANZ PUNE", withdrawal: 0, deposit: 220000.00 },
      { id: "BK-611", date: "2026-03-25", refNo: "NEFT-8825", description: "NEFT ROCHE DIAGNOSTICS INDIA", withdrawal: 74500.00, deposit: 0 },
      { id: "BK-612", date: "2026-03-29", refNo: "CHQ-3315", description: "CTS CLG SODEXO HEALTHCARE DIETARY", withdrawal: 46000.00, deposit: 0 },
      { id: "BK-613", date: "2026-03-30", refNo: "TPA-105", description: "RTGS CR CARE HEALTH INSURANCE GURGAON", withdrawal: 0, deposit: 310000.00 },
      { id: "BK-614", date: "2026-03-31", refNo: "NEFT-9940", description: "HOSPITAL STAFF MARCH 2026 PAYROLL NEFT", withdrawal: 540000.00, deposit: 0 },
      { id: "BK-615", date: "2026-03-28", refNo: "SI-SIEMENS-EMI", description: "STANDING INSTRUCTION AUTO-DEBIT SIEMENS 3T MRI LEASE", withdrawal: 145000.00, deposit: 0 }, // Bank Only
      { id: "BK-616", date: "2026-03-31", refNo: "BIOWASTE-CHG", description: "MUNICIPAL BIO-HAZARD MEDICAL WASTE HANDLING CHARGES", withdrawal: 8200.00, deposit: 0 }, // Bank Only
      { id: "BK-617", date: "2026-03-31", refNo: "INT-FLEXI-DEP", description: "INTEREST CR ON HEALTHCARE SWEEP FIXED DEPOSIT", withdrawal: 0, deposit: 16500.00 } // Bank Only
    ]
  },

  // PRESET 5: 100% Matched Perfect Reconciliation (Auditor Gold Standard — 0 Variance)
  perfectRecon: {
    id: "perfectRecon",
    name: "Kautilya Global Financial Advisory & CA Audit Firm",
    bankName: "ICICI Bank Prime Current A/c #004205001192",
    reconciliationDate: "2026-03-31",
    openingCashBookBalance: 450000.00,
    openingBankBalance: 450000.00,
    highlights: "20 Transactions · 100% Reconciled Rate · Zero Audit Variance · Statutory Gold Standard",
    cashBookRows: [
      { id: "CB-301", date: "2026-03-02", refNo: "NEFT-501", description: "Corporate Restructuring Retainer - Star Health", debit: 120000.00, credit: 0 },
      { id: "CB-302", date: "2026-03-05", refNo: "CHQ-7001", description: "Bloomberg Terminal Subscription Q1 Licence", debit: 0, credit: 45000.00 },
      { id: "CB-303", date: "2026-03-07", refNo: "RTGS-882", description: "Wealth Management Advisory Fee - Bajaj Finance", debit: 250000.00, credit: 0 },
      { id: "CB-304", date: "2026-03-10", refNo: "CHQ-7002", description: "Executive Office Rent - One BKC Complex Mumbai", debit: 0, credit: 95000.00 },
      { id: "CB-305", date: "2026-03-12", refNo: "NEFT-502", description: "Statutory Valuation Opinion Fee - Zomato Ltd", debit: 180000.00, credit: 0 },
      { id: "CB-306", date: "2026-03-14", refNo: "CHQ-7003", description: "High-Speed Fiber Lease Line - Tata Tele Business", debit: 0, credit: 12500.00 },
      { id: "CB-307", date: "2026-03-16", refNo: "RTGS-883", description: "M&A Due Diligence Retainer - PayU Payments", debit: 320000.00, credit: 0 },
      { id: "CB-308", date: "2026-03-18", refNo: "NEFT-503", description: "Professional Research Associates Incentive Payout", debit: 0, credit: 88000.00 },
      { id: "CB-309", date: "2026-03-20", refNo: "CMS-2210", description: "Tax Litigation Advisory Fee - Kotak Mahindra Bank", debit: 210000.00, credit: 0 },
      { id: "CB-310", date: "2026-03-22", refNo: "CHQ-7004", description: "Corporate Legal Library Books & Taxmann Subscriptions", debit: 0, credit: 18400.00 },
      { id: "CB-311", date: "2026-03-23", refNo: "RTGS-884", description: "Fintech Compliance Advisory - Razorpay Software", debit: 280000.00, credit: 0 },
      { id: "CB-312", date: "2026-03-24", refNo: "CHQ-7005", description: "Executive Boardroom Catering & Refreshment Vendor", debit: 0, credit: 14200.00 },
      { id: "CB-313", date: "2026-03-25", refNo: "NEFT-504", description: "Quarterly Professional Indemnity Insurance Policy", debit: 0, credit: 52000.00 },
      { id: "CB-314", date: "2026-03-26", refNo: "RTGS-885", description: "Private Equity Valuation - Peak XV Partners", debit: 350000.00, credit: 0 },
      { id: "CB-315", date: "2026-03-27", refNo: "CHQ-7006", description: "Chartered Accountants Journal & ICAI Seminar Fees", debit: 0, credit: 16000.00 },
      { id: "CB-316", date: "2026-03-28", refNo: "CMS-2215", description: "Transfer Pricing Study Fee - Swiggy Bundl Technologies", debit: 240000.00, credit: 0 },
      { id: "CB-317", date: "2026-03-29", refNo: "CHQ-7007", description: "IT Systems Security Audit & Penetration Testing", debit: 0, credit: 42000.00 },
      { id: "CB-318", date: "2026-03-30", refNo: "NEFT-505", description: "International Tax Counsel Retainer - Baker & McKenzie", debit: 0, credit: 110000.00 },
      { id: "CB-319", date: "2026-03-31", refNo: "RTGS-886", description: "IPO Capital Markets Advisory - Delhivery Ltd", debit: 420000.00, credit: 0 },
      { id: "CB-320", date: "2026-03-31", refNo: "NEFT-506", description: "Senior Chartered Accountants & Partners Month-End Share", debit: 0, credit: 580000.00 }
    ],
    bankStatementRows: [
      { id: "BK-401", date: "2026-03-02", refNo: "NEFT-501", description: "NEFT CR STAR HEALTH INSURANCE RETAINER", withdrawal: 0, deposit: 120000.00 },
      { id: "BK-402", date: "2026-03-06", refNo: "CHQ-7001", description: "CTS CLG CHQ 7001 BLOOMBERG INDIA", withdrawal: 45000.00, deposit: 0 },
      { id: "BK-403", date: "2026-03-07", refNo: "RTGS-882", description: "RTGS CR BAJAJ FINANCE LTD PUNE", withdrawal: 0, deposit: 250000.00 },
      { id: "BK-404", date: "2026-03-11", refNo: "CHQ-7002", description: "CTS CLG CHQ 7002 BKC REAL ESTATE", withdrawal: 95000.00, deposit: 0 },
      { id: "BK-405", date: "2026-03-12", refNo: "NEFT-502", description: "NEFT CR ZOMATO LIMITED GURGAON", withdrawal: 0, deposit: 180000.00 },
      { id: "BK-406", date: "2026-03-15", refNo: "CHQ-7003", description: "CTS CLEARING TATA TELESERVICES", withdrawal: 12500.00, deposit: 0 },
      { id: "BK-407", date: "2026-03-16", refNo: "RTGS-883", description: "RTGS INWARD PAYU PAYMENTS PVT LTD", withdrawal: 0, deposit: 320000.00 },
      { id: "BK-408", date: "2026-03-18", refNo: "NEFT-503", description: "SALARY INCENTIVES RESEARCH ASSOCIATES", withdrawal: 88000.00, deposit: 0 },
      { id: "BK-409", date: "2026-03-20", refNo: "CMS-2210", description: "CMS INWARD KOTAK MAHINDRA BANK", withdrawal: 0, deposit: 210000.00 },
      { id: "BK-410", date: "2026-03-23", refNo: "CHQ-7004", description: "CTS CLG TAXMANN PUBLICATIONS", withdrawal: 18400.00, deposit: 0 },
      { id: "BK-411", date: "2026-03-23", refNo: "RTGS-884", description: "RTGS CR RAZORPAY SOFTWARE BENGALURU", withdrawal: 0, deposit: 280000.00 },
      { id: "BK-412", date: "2026-03-25", refNo: "CHQ-7005", description: "CTS CLEARING EXECUTIVE HOSPITALITY", withdrawal: 14200.00, deposit: 0 },
      { id: "BK-413", date: "2026-03-25", refNo: "NEFT-504", description: "NEFT HDFC ERGO GENERAL INSURANCE", withdrawal: 52000.00, deposit: 0 },
      { id: "BK-414", date: "2026-03-26", refNo: "RTGS-885", description: "RTGS INWARD PEAK XV PARTNERS INDIA", withdrawal: 0, deposit: 350000.00 },
      { id: "BK-415", date: "2026-03-28", refNo: "CHQ-7006", description: "CTS CLG ICAI SEMINAR ACCOUNTS", withdrawal: 16000.00, deposit: 0 },
      { id: "BK-416", date: "2026-03-28", refNo: "CMS-2215", description: "CMS COLL SWIGGY BUNDL TECH", withdrawal: 0, deposit: 240000.00 },
      { id: "BK-417", date: "2026-03-30", refNo: "CHQ-7007", description: "CTS CLG INFRA SECURITY AUDIT", withdrawal: 42000.00, deposit: 0 },
      { id: "BK-418", date: "2026-03-30", refNo: "NEFT-505", description: "OUTWARD REMITTANCE BAKER MCKENZIE", withdrawal: 110000.00, deposit: 0 },
      { id: "BK-419", date: "2026-03-31", refNo: "RTGS-886", description: "RTGS INWARD DELHIVERY GURGAON IPO", withdrawal: 0, deposit: 420000.00 },
      { id: "BK-420", date: "2026-03-31", refNo: "NEFT-506", description: "PARTNERS SHARE DISBURSEMENT MARCH", withdrawal: 580000.00, deposit: 0 }
    ]
  }
};

// Client-Side 1-Click CSV Downloader for Sample Datasets
window.downloadPresetCSV = function(presetKey, type) {
  const preset = window.RECON_PRESETS[presetKey] || window.RECON_PRESETS.techCorp;
  let csvContent = "";
  let filename = "";

  if (type === "CB") {
    csvContent = "Date,Reference,Description,Debit,Credit\n";
    (preset.cashBookRows || []).forEach(r => {
      const desc = String(r.description || "").replace(/"/g, '""');
      csvContent += `"${r.date}","${r.refNo}","${desc}",${r.debit || 0},${r.credit || 0}\n`;
    });
    filename = `${presetKey}_CashBook_Sample.csv`;
  } else {
    csvContent = "Date,Reference,Narration,Withdrawal,Deposit\n";
    (preset.bankStatementRows || []).forEach(r => {
      const desc = String(r.description || "").replace(/"/g, '""');
      csvContent += `"${r.date}","${r.refNo}","${desc}",${r.withdrawal || 0},${r.deposit || 0}\n`;
    });
    filename = `${presetKey}_BankStatement_Sample.csv`;
  }

  if (typeof window.reconSaveCSV === "function") {
    window.reconSaveCSV(csvContent, filename);
  } else {
    // Fallback if export.js is not yet evaluated
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.setAttribute("download", filename);
    a.download = filename;
    a.rel = "noopener";
    document.body.appendChild(a);
    try {
      a.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
    } catch(e) {
      a.click();
    }
    setTimeout(() => {
      try { if (a.parentNode) a.parentNode.removeChild(a); } catch(e) {}
      URL.revokeObjectURL(url);
    }, 60000);
  }
};

// Default backward compatibility
window.RECON_SAMPLE_DATA = {
  metadata: {
    companyName: window.RECON_PRESETS.techCorp.name,
    bankName: window.RECON_PRESETS.techCorp.bankName,
    reconciliationDate: window.RECON_PRESETS.techCorp.reconciliationDate,
    openingCashBookBalance: window.RECON_PRESETS.techCorp.openingCashBookBalance,
    openingBankBalance: window.RECON_PRESETS.techCorp.openingBankBalance
  },
  cashBookRows: window.RECON_PRESETS.techCorp.cashBookRows,
  bankStatementRows: window.RECON_PRESETS.techCorp.bankStatementRows
};
