const fees = {
  // PGDM 2026-28 (Official brochure figures)
  pgdm: {
    tuition: 10_25_000,
    program_fee: 5_78_000,
    programme_total: 16_03_000,
    accommodation: 6_32_000,  // Twin Sharing AC
    caution_deposit: 10_000,  // Refundable
    alumni_subscription: 5_000,
    total: 22_50_000,
    accommodation_type: 'Twin Sharing AC',
    international_total_usd: 40_400,
  },

  // PGPM 2026-27 (Official brochure figures)
  pgpm: {
    tuition: 12_43_000,
    program_fee: 6_96_000,
    programme_total: 19_39_000,
    accommodation: 3_96_000,  // Single AC
    caution_deposit: 10_000,  // Refundable
    alumni_subscription: 5_000,
    total: 23_50_000,
    accommodation_type: 'Single AC',
    international_total_usd: 41_450,
  },

  // Fields used by CollegeDetailClient structured UI
  tuition: '16.03',        // PGDM programme total (L)
  tuition_pgpm: '19.39',   // PGPM programme total (L)
  other: '6.47',           // PGDM hostel + deposits (L)
  total: '22.50',          // PGDM all-in (L)
  total_pgpm: '23.50',     // PGPM all-in (L)
  living_monthly: 'Included in fees (veg meals)',
  loan_max: 'Up to ₹50 L',
  loan_rate: '9.5–12%',

  scholarships: [
    {
      name: 'Diversity & Merit Scholarship',
      criteria: '40 awards/year · min 30% to women · assessed at admission · no separate application',
      amount: '₹5 L off tuition',
    },
    {
      name: 'Balachandran Merit Scholarship',
      criteria: '2–4 awards/year · exceptional academics, leadership and profile · full assessment',
      amount: 'Full tuition waiver (PGPM) + CXO mentorship',
    },
  ],

  content: `<h2>Great Lakes Chennai Fees 2025 — Complete Fee Structure for PGDM and PGPM</h2>

<p>Great Lakes Institute of Management, Chennai has released the official fee structure for the 2026-28 PGDM batch and the 2026-27 PGPM batch. One important fact that surprises most applicants: the <strong>PGPM is more expensive than the PGDM</strong> in total cost — ₹23.50 L all-in for PGPM versus ₹22.50 L for PGDM. This is because the PGPM programme fee is higher (₹19.39 L programme cost vs ₹16.03 L for PGDM), even though the PGPM hostel cost is lower (single AC room at ₹3.96 L vs twin sharing at ₹6.32 L for two years). All fees below are official figures from the 2026-28 and 2026-27 admissions brochures.</p>

<h3>PGDM Fee Structure 2026-28 (Official)</h3>

<p>The PGDM programme's fee for the 2026-28 batch is structured as follows. The <strong>Tuition and Academic Fee</strong> is ₹10,25,000 — this covers academic instruction, faculty, case study materials (including HBS case collection), textbooks, and online resources. The <strong>Program Fee</strong> is ₹5,78,000, covering programme administration, lab access, student activities, and institutional resources. The combined <strong>Programme Total is ₹16,03,000</strong>. On top of this, the <strong>Accommodation Charge (Twin Sharing AC)</strong> is ₹6,32,000 for the full two-year residential stay. A refundable Caution Deposit of ₹10,000 and an Alumni Subscription of ₹5,000 bring the <strong>Grand Total to ₹22,50,000</strong>. All vegetarian meals are included in the fees. Non-vegetarian food is optional and charged extra. International students pay $40,400 in total.</p>

<p>Important notes from the official brochure: hostel accommodation is mandatory given the residential nature of the programme. Students are required to have their own laptops. The institution reserves the right to outsource housing and catering services. Refund policy follows AICTE norms. All disputes are subject to jurisdiction of courts in Chennai only.</p>

<h3>PGPM Fee Structure 2026-27 (Official)</h3>

<p>The PGPM programme's fee for the 2026-27 batch: <strong>Tuition Fee ₹12,43,000</strong> plus <strong>Program Fee ₹6,96,000</strong> = <strong>Programme Total ₹19,39,000</strong>. The accommodation is single AC room at <strong>₹3,96,000</strong> for the one-year programme (PGPM students get single-occupancy rooms; PGDM students are in twin-sharing). With caution deposit (₹10,000) and alumni subscription (₹5,000), the <strong>Grand Total is ₹23,50,000</strong>. International students pay $41,450. The PGPM hostel accommodation priority goes by order of acceptance — late acceptors may get twin-sharing with a partial refund.</p>

<h3>Why PGPM Costs More Than PGDM</h3>

<p>The higher PGPM programme fee reflects the more intensive curriculum design (7 terms in 1 year vs 6 terms in 2 years), the higher industry engagement in the programme (1,000+ years of collective work experience in class), the specialisation-specific labs and clinics, and the smaller, more exclusive cohort. The lower accommodation cost (single room, 1 year) partially offsets the higher programme fee, resulting in a ₹1 L higher total for PGPM. For ROI purposes: at ₹17.80 LPA average post-PGPM salary, the payback on total investment of ₹23.5 L is approximately 16 months — still strong for a 1-year programme.</p>

<h3>Fee Comparison With Peer Schools</h3>

<p>GLIM Chennai is priced at the upper end of its peer group. IMT Ghaziabad: approximately ₹20–22 L all-in. TAPMI Manipal: ₹18–20 L all-in. FORE School of Management: ₹17–19 L all-in. Great Lakes Gurgaon: similar to Chennai for PGDM. At ₹22.5 L (PGDM) and ₹23.5 L (PGPM), GLIM Chennai commands a premium over most tier-2 B-schools — justified by the Double Crown accreditation (AACSB + AMBA), LEED Platinum campus quality, and the strength of the BFSI and consulting recruiter network.</p>

<h3>Diversity and Merit Scholarship</h3>

<p>40 scholarships per year, each worth ₹5 L off tuition — bringing effective PGDM tuition down from ₹16.03 L to ₹11.03 L for recipients. A minimum of 30% of awardees must be women. No separate application — assessed through the standard admissions process alongside all other applicants. Candidates with CAT 95%+ or GMAT 700+ should specifically ask about scholarship eligibility during the interview stage and mention it in their application essays.</p>

<h3>Balachandran Merit Scholarship</h3>

<p>Named after the late founder Dr. Bala V. Balachandran, this scholarship covers full PGPM tuition plus CXO-level mentorship throughout the programme. Awarded to 2–4 exceptional students per year based on the complete admissions file. If you are in the top 2–3% of applicants by any metric — academic record, entrance score, professional achievement, or leadership — target this scholarship explicitly in your application narrative.</p>

<h3>Education Loans</h3>

<p>GLIM Chennai has active relationships with SBI, HDFC Credila, and Axis Bank for MBA education loans. For PGDM: loans of ₹15–20 L with a moratorium period covering the 2-year programme plus 6 months. Interest rates: 9.5–12% depending on lender and borrower profile. HDFC Credila typically processes GLIM Chennai applications within 2–3 weeks. Students with family property as collateral can negotiate 0.5–1% lower rates. For PGPM: smaller loan quantum (₹15–20 L), shorter moratorium, but more manageable given the 1-year duration. Section 80E of the Income Tax Act provides full interest deduction for 8 years — meaningful tax saving for borrowers in the 30% bracket.`,
}

export default fees
