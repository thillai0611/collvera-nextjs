const fees = {
  // Official GIM fee structure (PGDM 2025-27)
  one_time: 25000,
  tuition: 2145000,       // ₹21.45 L
  tuition_low: null,
  hostel: 180000,         // ~₹1.8L for 2 years (from verified student review)

  // For CollegeDetailClient display
  tuition: '21.45',
  other: '0.25',
  other_label: 'One-time caution deposit (refundable, ₹5K retained for alumni membership)',
  total: '21.70',
  living_monthly: 'Hostel ~₹1.8 L for 2 years · mess (4 meals/day) included · AC upgrade extra',
  loan_max: 'Up to ₹40 L',
  loan_rate: '9.5–12%',
  loan_note: 'Education loans available from SBI, HDFC Credila, Axis Bank. GIM Goa offer letter accepted by all nationalised banks. AMBA (UK) accreditation strengthens loan processing for international banks and NBFCs.',

  scholarships: [
    {
      name: 'ACCESS — PGDM (Academic Competence and Excellence Scholarship)',
      criteria: 'Merit-based · top-scoring PGDM General candidates at admissions stage',
      amount: '45 scholarships × ₹5,00,000 each',
    },
    {
      name: 'GMS — PGDM HCM (GIM MBBS Scholarship)',
      criteria: 'For MBBS graduates joining PGDM Healthcare Management',
      amount: '7 scholarships × ₹5,00,000 each',
    },
    {
      name: 'ACCESS — PGDM BDA',
      criteria: 'Merit-based for Big Data Analytics candidates',
      amount: '21 scholarships × ₹5,00,000 each',
    },
    {
      name: 'ACCESS — PGDM BIFS',
      criteria: 'Merit-based for Banking, Insurance & Financial Services',
      amount: '7 scholarships × ₹5,00,000 each',
    },
    {
      name: 'International Student Scholarship (Africa/SAARC)',
      criteria: 'Top 3 students from Africa and SAARC countries (excluding India)',
      amount: '75% tuition waiver',
    },
  ],

  content: `<h2>GIM Goa Fees 2025 — Complete Fee Structure for PGDM</h2>

<p>Goa Institute of Management charges a tuition fee of <strong>₹21,45,000</strong> for all 4 full-time PGDM programmes (General, HCM, BDA, BIFS) over 2 years, plus a one-time caution deposit of ₹25,000 (refundable, with ₹5,000 retained upon graduation as GIM Alumni Association membership fee). The total all-in PGDM cost stands at approximately <strong>₹21.70 Lakhs</strong>. Hostel accommodation is approximately ₹1.8 Lakhs for the 2-year programme (non-AC double-sharing in Year 1, single non-AC in Year 2, AC upgrade available at extra cost), and 4 meals per day at the mess are included.</p>

<h3>Fee Comparison with Peers</h3>

<p>At ₹21.45 Lakhs tuition, GIM Goa is priced almost identically to <strong>IMT Ghaziabad (₹21.5L)</strong> and slightly above <strong>TAPMI Manipal (~₹18L)</strong>. This creates a direct trade-off with IMT: same fee level, but IMT has stronger average placement (₹18.15 vs ₹15.13 LPA) and Delhi NCR location advantage, while GIM offers 4 specialised PGDM tracks (HCM, BDA, BIFS) and AMBA (UK) accreditation that IMT lacks. If you need a specialisation that IMT doesn't offer — Healthcare Management, Big Data Analytics with Portugal dual-degree, or dedicated BIFS — the GIM fee is justified. If you're optimising for generalist PGDM placements at this fee level, IMT's outcome profile is stronger.</p>

<h3>Hybrid PGDM — A Separate Programme at ₹5.1 L</h3>

<p>GIM's Hybrid PGDM is a distinct programme for working professionals (3+ years experience mandatory) priced at ₹5,10,000 — one of the lowest AICTE-approved PGDM fees from a ranked institute. This is not the same as the flagship full-time PGDM. Do not confuse the two when comparing costs. The Hybrid programme uses online/blended delivery with limited campus immersion.</p>

<h3>Merit Scholarships — 80 Slots Totalling ₹4 Crore</h3>

<p>GIM Goa awards 80 merit scholarships annually across the 4 PGDM tracks — 45 for PGDM General (ACCESS), 21 for BDA, 7 for HCM (GMS), and 7 for BIFS. Each scholarship is valued at <strong>₹5 Lakhs</strong>, reducing effective tuition to ₹16.45L for recipients. Selection is based on entrance score, academic record, and profile at admissions stage. With ~780 seats and 80 scholarships, approximately <strong>10% of the batch</strong> receives a meaningful scholarship — a higher proportion than most peer institutes. If you score 95+ percentile in CAT/XAT or demonstrate strong academic merit, factor this into your GIM cost calculation: your effective fee could be ₹16.45L, which is competitive against IMT's scholarship-adjusted ₹15-16L.</p>

<h3>Education Loans</h3>

<p>SBI Scholar Loan covers up to ₹40 Lakhs at 8.5-9.5% with a moratorium covering the programme plus 12 months after. HDFC Credila processes GIM applications in 2-3 weeks. GIM Goa's AMBA (UK) accreditation and AIU recognition of PGDM as MBA-equivalent mean that international banks and NBFCs accept GIM offer letters without friction. Section 80E of the Income Tax Act allows full interest deduction for 8 years on education loans — meaningful for borrowers in the 30% tax bracket.</p>`,
}

export default fees
