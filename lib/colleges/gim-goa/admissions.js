const admissions = {
  education: "Bachelor's degree from a recognised university with minimum 50% aggregate marks (45% for SC/ST/PwD)",
  work_exp: 'Not mandatory for full-time PGDM. Work experience preferred and carries 10% weight in composite selection score.',
  scores_accepted: ['CAT', 'XAT', 'CMAT', 'GMAT', 'MAT', 'GAAT (for BDA/IDA)'],
  application_fee: 1750, // First Mover, single programme — varies up to ₹5,500

  cutoff_general: 88,
  cutoff_competitive: 90,
  cutoff_xat: 85,
  cutoff_cmat: 95, // general PGDM; HCM/BDA need 98.5

  cat_cutoffs: [
    { category: 'General',  min: '85%ile', realistic: '88-90%ile' },
    { category: 'OBC',      min: '80%ile', realistic: '83%ile' },
    { category: 'SC',       min: '70%ile', realistic: '73%ile' },
    { category: 'ST',       min: '65%ile', realistic: '68%ile' },
  ],

  shortlist_weights: [
    { label: 'Objective Assessment (CAT/XAT/GMAT/CMAT)',  pct: 40 },
    { label: 'Face-to-Face Evaluation (PI)',              pct: 30 },
    { label: 'Past Academic Record (X, XII, Graduation)', pct: 15 },
    { label: 'Work Experience',                           pct: 10 },
    { label: 'Profile Assessment Index / Diversity',      pct: 5 },
  ],

  final_weights: [],

  process: [
    'Apply online at gim.ac.in (CAT/XAT/CMAT/GMAT score required)',
    'PGDM BDA and IDA candidates appear for GAAT (GIM Analytics Aptitude Test)',
    'Shortlisting based on entrance score + academic profile',
    'Face-to-Face Evaluation (Personal Interview) and Profile Assessment',
    'Merit list released · admission letter issued',
    'Fee payment and document verification',
    'Course commencement (June)',
  ],

  batch: {
    size: 780, // total across all PGDM programmes
    female: 31, // % from NIRF 2024-25 report
    freshers_pct: null,
    work_exp_pct: null,
    engineering: null,
    avg_work_months: null,
    outside_state_pct: 91,
  },

  // Official GIM cutoff data — programme-wise, by year
  cutoffs_by_programme: [
    {
      programme: 'PGDM (General)',
      cuts: [
        { exam: 'CMAT', y2022: 95, y2023: 95, y2024: 95, y2025: null },
        { exam: 'CAT',  y2022: null, y2023: 88, y2024: 88, y2025: 88 },
        { exam: 'XAT',  y2022: null, y2023: null, y2024: null, y2025: 85 },
      ],
    },
    {
      programme: 'PGDM — Healthcare Management (HCM)',
      cuts: [
        { exam: 'CMAT', y2023: 98.5, y2024: 98.5, y2025: null },
        { exam: 'CAT',  y2023: 88,   y2024: 88,   y2025: 88 },
        { exam: 'XAT',  y2023: null, y2024: 85,   y2025: 85 },
      ],
    },
    {
      programme: 'PGDM — Big Data Analytics (BDA)',
      cuts: [
        { exam: 'CMAT', y2023: 98.5, y2024: 98.5, y2025: null },
        { exam: 'XAT',  y2023: null, y2024: 85,   y2025: 85 },
      ],
    },
  ],

  // Application fee ladder by deadline
  application_fees: [
    { deadline: 'First Mover',        one: 1750, two: 2000, three: 2250, all: 3000 },
    { deadline: 'Early Bird',         one: 2000, two: 2250, three: 2500, all: 3500 },
    { deadline: 'Achiever Round',     one: 2750, two: 3000, three: 3500, all: 4250 },
    { deadline: 'Final Deadline',     one: 3500, two: 4000, three: 4500, all: 5500 },
  ],

  content: `<h2>GIM Goa Admissions 2026 — CAT Cutoff, Eligibility and Selection Process</h2>

<p>GIM Goa accepts CAT, XAT, CMAT, GMAT, and MAT scores for PGDM admissions. For PGDM BDA and IDA (Big Data Analytics + Nova Portugal dual-degree), candidates additionally appear for <strong>GAAT — the GIM Analytics Aptitude Test</strong>. The minimum eligibility is a bachelor's degree with 50% aggregate (45% for SC/ST/PwD). Unlike many peers, GIM does not mandate work experience — freshers are admitted to all 4 full-time PGDM tracks. However, the Hybrid PGDM (a separate ₹5.1L online-mode programme) requires minimum 3 years of work experience.</p>

<h3>CAT Cutoff — Realistically 88 Percentile</h3>

<p>GIM Goa's CAT cutoff for General category has been consistently <strong>88 percentile</strong> across 2023, 2024, and 2025 — confirmed via programme-wise cutoff data for PGDM General and PGDM HCM. Realistic shortlist threshold is 88-90 percentile. XAT cutoff is 85 percentile, and CMAT cutoff is 95 percentile for General PGDM (higher at 98.5 for HCM/BDA). GMAT 600+ is accepted. This makes GIM accessible at a lower score range than IMT (90-93%ile) or MDI Gurgaon (95%ile+) — one of the reasons it attracts high volume at 85-90%ile CAT candidates.</p>

<h3>Selection Formula — Heavy Weight on Personal Interview</h3>

<p>GIM's composite selection score assigns <strong>30% weight to the Face-to-Face Evaluation (Personal Interview)</strong>, substantially higher than peers like IMT (20%) or TAPMI (15-20%). Combined with the 40% objective score weight, this means a candidate with an 88-90 percentile CAT can convert a call through strong interview performance — but a strong CAT score alone (without a compelling interview) is insufficient. Academic record carries 15%, work experience 10%, and profile diversity 5%. If you're an interview-strong candidate, GIM's formula favours you.</p>

<h3>Application Fees — Pay Early, Save Money</h3>

<p>GIM operates a tiered application fee schedule: First Mover deadline is ₹1,750 for one programme, rising to ₹3,500 by the Final Deadline — effectively double. If applying to all 4 PGDM programmes, First Mover costs ₹3,000 total versus ₹5,500 at Final Deadline. Apply early: the cost differential saves you up to ₹2,500, and the earlier deadlines have larger seat availability before the Achiever Round pool competes for remaining slots.</p>

<h3>Seat Distribution Across 4 PGDM Tracks</h3>

<p>GIM Goa offers 780 PGDM seats across 4 specialisations: PGDM General (300), PGDM HCM (120), PGDM BDA (180), PGDM BIFS (120), plus 30 IDA seats (BDA + Nova Portugal). This is actually larger than IMT's 480 seats — making GIM one of the larger batches among ranked private B-schools, though distributed across specialised streams rather than one generalist cohort.</p>

<h3>Student Diversity — 31% Female, 91% Outside Goa</h3>

<p>The NIRF 2024-25 report confirms GIM has 1,003 total students (across all programmes) with 31% female participation and 91% from outside Goa. The geographic diversity is high — students come from across India, and the programme features an explicit 5% diversity weight in selection. This creates a genuinely national peer network, unusual for a campus located in a non-metro state.</p>`,
}

export default admissions
