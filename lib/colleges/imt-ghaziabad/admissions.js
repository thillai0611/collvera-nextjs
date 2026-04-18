const admissions = {
  education: "Bachelor's degree from a recognised university with minimum 50% aggregate marks (45% for SC/ST/PwD)",
  work_exp: 'Not mandatory for PGDM. Work experience preferred but not required.',
  scores_accepted: ['CAT', 'XAT', 'GMAT (650+)'],
  application_fee: null,

  cutoff_general: 90,
  cutoff_competitive: 93,
  cutoff_xat: 90,
  cutoff_gmat: 650,

  cat_cutoffs: [
    { category: 'General',  min: '90%ile', realistic: '93%ile' },
    { category: 'OBC',      min: '85%ile', realistic: '88%ile' },
    { category: 'SC',       min: '75%ile', realistic: '78%ile' },
    { category: 'ST',       min: '70%ile', realistic: '73%ile' },
  ],

  shortlist_weights: [
    { label: 'Entrance Test Score (CAT/XAT/GMAT)', pct: 45 },
    { label: 'Academic Performance (X, XII, Graduation)', pct: 25 },
    { label: 'Personal Interview', pct: 20 },
    { label: 'Work Experience & Extra-curriculars', pct: 10 },
  ],

  final_weights: [],

  process: [
    'Apply online at imt.edu (CAT/XAT/GMAT score required)',
    'Shortlisting based on entrance score + academic profile',
    'Written Ability Test (WAT) and Personal Interview',
    'Merit list and offer letters',
    'Fee payment and document verification',
    'Course commencement (June)',
  ],

  batch: {
    size: 480,
    female: null,
    freshers_pct: null,
    work_exp_pct: null,
    engineering: null,
    avg_work_months: null,
  },

  content: `<h2>IMT Ghaziabad Admissions 2026 — CAT Cutoff, Eligibility and Selection Process</h2>

<p>IMT Ghaziabad accepts CAT, XAT, and GMAT scores for PGDM admissions. The minimum eligibility is a bachelor's degree with 50% aggregate (45% for SC/ST/PwD). There is no mandatory work experience requirement — IMT admits both freshers and candidates with work experience. The CAT cutoff for the PGDM programme has been consistently around <strong>90 percentile</strong> minimum, with the realistic shortlist threshold for General category candidates at <strong>93 percentile</strong>. GMAT 650+ is accepted and treated broadly equivalent to CAT 90%ile.</p>

<h3>Selection Formula</h3>

<p>IMT Ghaziabad's composite selection score is built primarily on the entrance test (45%) and academic performance (25%), with the Personal Interview carrying 20% weight and work experience plus extra-curriculars at 10%. This means a candidate with a strong CAT score and consistent academics can secure a call and convert it even without work experience — the formula does not penalise freshers as heavily as some peers. However, work experience does add weight through the 10% extra-curriculars/experience component, and candidates with relevant industry experience in BFSI or consulting tend to interview better given IMT's sector strengths.</p>

<h3>Merit Scholarship at Admissions Stage</h3>

<p>IMT Ghaziabad's merit scholarship (25-30% fee waiver for 98%ile+ CAT/XAT or 750+ GMAT) is awarded at the admissions stage — not after joining. This is important: if you score 98+ percentile and are comparing IMT with a newer IIM at similar fees, the effective IMT cost after scholarship (₹15-16L) makes it competitive against IIM Bodh Gaya, IIM Sirmaur, or IIM Nagpur at ₹18-20L. Calculate this comparison explicitly before making your decision.</p>

<h3>PGDM DCP — Special Eligibility</h3>

<p>The PGDM Dual Country Programme (DCP) allows students to spend a semester abroad — typically at one of IMT's international partner institutions. Eligibility is the same as PGDM General, but seats are limited and the selection has an additional component evaluating global readiness and communication skills at the PI stage. DCP students get an additional international credential alongside the PGDM.</p>`,
}

export default admissions
