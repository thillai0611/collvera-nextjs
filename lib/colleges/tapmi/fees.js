const fees = {
  // Official figures from TAPMI Prospectus 2026-28
  tuition_per_year: 9_75_000,
  tuition_2_years: 19_50_000,
  alumni_membership: 20_000,
  caution_deposit: 40_000,       // Refundable
  bkfs_training: 70_000,         // Only for MBA-BKFS (SBI & BSE)
  hostel_mess: null,             // "Will be updated soon" per official brochure
  application_fee: 2_250,        // For two programmes

  // NRI fees
  nri_tuition_per_year_usd: 18_300,
  nri_caution_usd: 600,
  nri_bkfs_training_usd: 900,

  // For CollegeDetailClient structured UI
  tuition: '19.50',           // 2-year tuition total (L)
  other: '0.60',              // Alumni + caution (L) — hostel TBD
  other_label: 'Alumni fee + caution deposit',
  total: '20.10',             // Tuition + known charges (hostel TBD)
  living_monthly: 'Hostel fee not published — check tapmi.edu.in',
  loan_max: 'Up to ₹40 L',
  loan_rate: '9.5–12%',
  loan_note: 'Education loans via SBI, HDFC Credila, Axis Bank. BKFS students have direct SBI connections via the programme.',

  scholarships: [
    {
      name: 'Ramdas Pai Merit Scholarship',
      criteria: '75 students per batch · merit-based · assessed at admission · no separate application',
      amount: 'Part of ₹2.4 Crore annual pool',
    },
    {
      name: 'Overall Scholarship Pool',
      criteria: 'Merit + financial need · multiple categories · CFA/FRM/CMT scholarships also available',
      amount: 'Up to ₹6 Crores total · individual amounts vary',
    },
    {
      name: "Dean's Roll of Honour",
      criteria: 'Academic excellence during the programme · minimum CGPA threshold',
      amount: 'Cash award + certificate',
    },
    {
      name: 'CFA / FRM / CMT Scholarship',
      criteria: 'Students pursuing CFA, FRM, or CMT certifications · primarily BKFS programme',
      amount: 'Partial fee support — details on website',
    },
  ],

  content: `<h2>TAPMI Fees 2026-28 — Complete Fee Structure for All MBA Programmes</h2>

<p>T. A. Pai Management Institute (TAPMI), Manipal charges a uniform tuition fee of <strong>₹9,75,000 per year</strong> for all MBA programmes — MBA General, BKFS, HRM, IB, Marketing, Tech, and AI & DS. The total tuition for the 2-year programme is <strong>₹19,50,000</strong>. On top of this, a one-time Alumni Lifetime Membership fee of ₹20,000 and a refundable Caution Deposit of ₹40,000 are charged. MBA-BKFS students pay an additional ₹70,000 for intensive training at SBI and BSE — a genuine differentiator that provides hands-on banking and capital markets training not available at most B-schools. Hostel and mess fees are listed as "Will be updated soon" in the official 2026-28 prospectus — check tapmi.edu.in before finalising your budget.</p>

<h3>What ₹19.5L Buys You at TAPMI</h3>

<p>At ₹19.5L tuition (excluding hostel), TAPMI is priced mid-market for its peer group. GLIM Chennai charges ₹22.5L all-in. IMT Ghaziabad charges approximately ₹20-21L all-in. FORE School of Management charges approximately ₹18-19L. SIBM Pune is approximately ₹18-20L. TAPMI sits competitively on fees while offering something most peers cannot — the AACSB + AMBA Double Crown accreditation, Bloomberg Lab infrastructure, and the MBA-BKFS programme with SBI/BSE training embedded in the curriculum. For finance-focused candidates, this is a meaningful value proposition relative to the fees charged.</p>

<h3>MBA-BKFS Additional Training Fee</h3>

<p>The ₹70,000 BKFS training fee covers intensive market training at SBI (State Bank of India) and BSE (Bombay Stock Exchange). This is a structured programme — not just a campus visit — that gives BKFS students real exposure to commercial banking credit analysis and capital markets operations. Few MBA programmes in India offer this kind of embedded industry training as a formal curriculum component. For students targeting BFSI roles, this ₹70,000 is among the highest-ROI expenditures in any MBA programme.</p>

<h3>Scholarships — Up to ₹6 Crores Available</h3>

<p>TAPMI offers scholarships worth up to ₹6 Crores annually across multiple schemes. The Ramdas Pai Merit Scholarship provides ₹2.4 Crores to 75 students per batch — approximately 1 in 6 students receives this scholarship. Additionally, CFA/FRM/CMT certification scholarships are available, primarily for BKFS students pursuing professional finance qualifications alongside the MBA. The Dean's Roll of Honour recognises academic excellence within the programme. Scholarships are awarded without a separate application — the admissions committee evaluates merit alongside the standard application process. Candidates with strong academic records (>8.5 CGPA or equivalent) and professional certifications should specifically highlight these in their application.</p>

<h3>ROI Analysis</h3>

<p>At ₹13.99 LPA average package (MBA General 2025) against approximately ₹20-22L all-in cost, the payback period for an average TAPMI graduate is roughly 18-20 months. For the top quartile earning ₹17+ LPA, payback drops to 14-16 months. For MBA-BKFS graduates averaging ₹14.73 LPA, payback is approximately 17 months. The most favourable ROI is for the top 50 students earning ₹19.16 LPA — payback under 14 months. For the bottom quartile (₹11-12 LPA), the ROI is tight given the fee level — this cohort would benefit most from scholarship support or loan interest deductions under Section 80E.</p>

<h3>NRI Fees</h3>

<p>NRI students pay USD 18,300 per year in tuition for all programmes. The caution deposit for NRI students is USD 600 (refundable), and MBA-BKFS NRI students pay USD 900 for the SBI & BSE training component. The application fee is USD 75 for NRI/PIO candidates. NRI admissions require a GMAT score (compulsory) plus IELTS 5.0 if English proficiency needs to be demonstrated.</p>`,
}

export default fees
