const fees = {
  // Official Shiksha fee structure
  one_time: 73000,
  tuition: 2080000,      // ₹20,80,000 (upper end)
  tuition_low: 2030000,  // ₹20,30,000 (lower end)
  hostel: null,          // Not published separately — residential mandatory

  // For CollegeDetailClient
  tuition: '20.80',
  other: '0.73',
  other_label: 'One-time fee (registration, library, etc.)',
  total: '21.53',
  living_monthly: 'Included (residential programme · 4 meals/day)',
  loan_max: 'Up to ₹40 L',
  loan_rate: '9.5–12%',
  loan_note: 'Education loans from SBI, HDFC Credila, Axis Bank. IMT Ghaziabad offer letter accepted by all nationalised banks.',

  scholarships: [
    {
      name: 'Merit Scholarship — Top Percentile',
      criteria: '98%ile in CAT/XAT or 750+ GMAT (10th ed) → 30% fee waiver (female) · 25% (male)',
      amount: '25–30% of tuition',
    },
    {
      name: 'Tuition Fee Waiver Scheme',
      criteria: 'Financial need-based · online application + supporting documents · AICTE guidelines',
      amount: 'Up to 5% of seats per programme',
    },
    {
      name: 'Academic Excellence Awards',
      criteria: 'Top performers within IMT during the programme · trimester-wise',
      amount: 'Cash awards + certificate',
    },
  ],

  content: `<h2>IMT Ghaziabad Fees 2025 — Complete Fee Structure for PGDM</h2>

<p>IMT Ghaziabad charges a tuition fee of ₹20,30,000 to ₹20,80,000 for the 2-year PGDM programme, plus a one-time fee of ₹73,000 (registration, library, and institutional charges). The total programme cost is approximately ₹21.5 Lakhs. Hostel accommodation is mandatory as IMT Ghaziabad operates a fully residential programme — all meals (4 per day) are included. The residential requirement means the quoted fee is effectively an all-in cost without additional living expenses, making IMT's total cost of attendance more transparent than many B-schools that list accommodation separately.</p>

<h3>Fee Comparison with Peers</h3>

<p>IMT Ghaziabad at ₹21.5L is competitively priced among Delhi NCR B-schools. MDI Gurgaon charges approximately ₹23-24L. IMI Delhi charges approximately ₹20-21L. FORE School of Management charges approximately ₹18-19L. For the Delhi NCR location, AACSB accreditation, and 160+ company recruiter network, IMT's fees represent solid value — particularly given the ₹18.15 LPA average placement which yields a payback period of approximately 14 months.</p>

<h3>Merit Scholarships</h3>

<p>IMT Ghaziabad's merit scholarship is one of the most straightforward in Indian B-school admissions: candidates scoring 98 percentile or above in CAT/XAT, or 750+ in GMAT (10th edition or Focus edition), receive a <strong>30% fee waiver if female</strong> and <strong>25% fee waiver if male</strong>. This brings the effective tuition down to approximately ₹14.6L (female) or ₹15.6L (male) for top scorers — a significant reduction that makes IMT extremely attractive for high-percentile candidates who are choosing between IMT and a newer/lower-ranked IIM at similar fees.</p>

<h3>Education Loans</h3>

<p>SBI Scholar Loan covers up to ₹40 Lakhs at 8.5-9.5% with a moratorium covering the 2-year programme plus 6-12 months after. IMT Ghaziabad's AACSB accreditation and NIRF #35 ranking mean that an IMT offer letter is accepted without friction by all nationalised banks. HDFC Credila processes IMT applications in 2-3 weeks. Section 80E of the Income Tax Act allows full interest deduction for 8 years — meaningful for borrowers in the 30% tax bracket who can save ₹60,000-1,20,000/year in tax on the loan interest.</p>`,
}

export default fees
