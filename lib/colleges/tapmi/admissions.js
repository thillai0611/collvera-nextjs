const admissions = {
  // Eligibility
  education: "Bachelor's degree from recognised university with minimum 60% marks. Final year students may apply — admission cancelled if <60% in graduation.",
  work_exp: 'No minimum. Cutoff varies by experience band.',
  scores_accepted: ['CAT 2025', 'XAT 2026', 'GMAT (Jan 2021 – Jan 2026)', 'NMAT 2025'],
  application_fee: 2250,   // for 2 programmes

  // Cutoffs by experience band (MBA General & most programmes)
  cutoffs_by_exp: [
    { band: 'Less than 11 months work exp', cutoff: '>90 percentile (CAT/XAT)' },
    { band: '12–23 months work exp',        cutoff: '>80 percentile (CAT/XAT)' },
    { band: '24+ months work exp',          cutoff: 'Profile-based shortlisting' },
  ],

  // MBA-Tech specific cutoff
  tech_cutoff: '>85 percentile for candidates with <12 months experience',

  // For CollegeDetailClient structured UI
  cutoff_general: 90,
  cutoff_competitive: 93,
  cutoff_xat: 88,
  cutoff_gmat: 680,

  cat_cutoffs: [
    { category: 'General (freshers)',          min: '90%ile',    realistic: '92-94%ile' },
    { category: 'General (12-23 months exp)',  min: '80%ile',    realistic: '85-88%ile' },
    { category: 'General (24+ months exp)',    min: 'Profile',   realistic: 'Strong profile + 80%ile' },
    { category: 'MBA-Tech',                    min: '85%ile',    realistic: '87-90%ile' },
  ],

  // Selection weights (official brochure — exact)
  shortlist_weights: [
    { label: 'GD / WAT / Personal Interview', pct: 45 },
    { label: 'Entrance Test Score (CAT/XAT/GMAT/NMAT)', pct: 35 },
    { label: 'Academic Performance (X, XII, Graduation)', pct: 15 },
    { label: 'Gender Diversity & Extra-curriculars', pct: 5 },
  ],

  final_weights: [],  // No separate Stage 2 — same weights apply

  process: [
    'Apply online at tapmi.edu.in · application fee ₹2,250 for 2 programmes',
    'Shortlisting based on entrance score + academic profile',
    'GD / WAT and Personal Interview (Feb–Mar 2026)',
    'Fast-Track Admits: offer letter within 48-72 hours of interview for exceptional candidates',
    'Merit list and offer letters by email',
    'Fee payment and document verification',
    'Course commencement (June 2026)',
  ],

  gd_pi_centres: ['Bengaluru', 'Chennai', 'Hyderabad', 'Mumbai', 'Kolkata', 'New Delhi', 'Manipal'],

  fast_track: 'Outstanding candidates receive offer letters within 48-72 hours of their PI — no waiting for general merit list.',

  // Batch profile (from prospectus + Shiksha data)
  batch: {
    size: null,         // Not published officially
    female: null,       // Not in prospectus (PPO data shows near-equal male/female)
    freshers_pct: null,
    work_exp_pct: null,
    engineering: null,
    avg_work_months: null,
    // What we know from PPO data (2024-25):
    // Freshers (PPO): 26, With work exp (PPO): 57
    // PPO gender: Male 37, Female 46
  },

  nri_requirements: 'GMAT compulsory + IELTS 5.0 (if English proficiency required). Profile-based shortlisting.',

  content: `<h2>TAPMI Admissions 2026 — CAT Cutoff, Selection Process and Eligibility</h2>

<p>T. A. Pai Management Institute (TAPMI) accepts applications for the 2026-28 MBA batch through a single online portal at tapmi.edu.in. The application fee is ₹2,250 for applying to two programmes — one of the lower application fees among comparable B-schools. TAPMI accepts CAT 2025, XAT 2026, GMAT (January 2021 to January 2026), and NMAT 2025. Unlike most B-schools, TAPMI allows applicants to submit multiple test scores and considers the highest valid score.</p>

<h3>CAT Cutoffs — The Experience-Band System</h3>

<p>TAPMI's cutoff structure is experience-dependent, which makes it significantly more accessible for working professionals than for freshers. For candidates with <strong>less than 11 months of work experience</strong>, the CAT/XAT cutoff is <strong>over 90 percentile</strong>. For candidates with <strong>12-23 months of work experience</strong>, the cutoff drops to <strong>over 80 percentile</strong>. For candidates with <strong>24 or more months of work experience</strong>, TAPMI uses profile-based shortlisting — meaning strong professional achievements, leadership experience, and a compelling application can substitute for a high entrance score. MBA-Tech (Bengaluru campus) has a slightly lower cutoff of >85 percentile for candidates with less than 12 months of experience.</p>

<p>In practice, competition for General category freshers is intense — expect 92-94 percentile as the realistic shortlist threshold. The Outlook-ICARE #4 ranking among private B-schools and NIRF #39 overall mean that TAPMI attracts strong CAT scorers. Working professionals in the 2+ year band with distinguished profiles in BFSI, consulting, or technology have been shortlisted at lower percentiles — TAPMI specifically values domain depth and career trajectory for this cohort.</p>

<h3>Selection Weights — GD/PI Dominates at 45%</h3>

<p>TAPMI's selection formula is unusual in placing <strong>GD/WAT/PI at 45% weight</strong> — higher than the entrance test score (35%) and academic performance (15%). This means the interview is the most important single component of the selection process. A candidate who scores 92 percentile but interviews poorly will be outcompeted by a 88 percentile candidate who interviews brilliantly. Gender diversity and extra-curriculars carry 5% weight — meaningful for female candidates and those with significant achievements in sports, arts, or social leadership.</p>

<p>The PI panel at TAPMI typically includes one faculty member and one industry practitioner. Questions cover your professional background, sector knowledge, reason for choosing TAPMI specifically (not a generic MBA), and current affairs in your target sector. For BKFS aspirants, expect questions on RBI policy, banking regulation, and capital markets. For Marketing aspirants, expect questions on brand campaigns, consumer trends, and go-to-market strategy. Preparation should cover TAPMI's specific differentiators — the Bloomberg Lab, BKFS programme, MAHE ecosystem, and beach-town campus lifestyle.</p>

<h3>Fast-Track Admits</h3>

<p>TAPMI's Fast-Track Admit programme recognises exceptional candidates by issuing offer letters within 48-72 hours of the PI — bypassing the standard merit list timeline. This is available to candidates demonstrating outstanding academic achievement, leadership potential, and clarity of purpose at the interview stage. If you receive a Fast-Track offer, it signals TAPMI's strong interest in your profile and is typically accompanied by scholarship consideration.</p>

<h3>Eligibility</h3>

<p>A Bachelor's degree in any discipline from a recognised university with a minimum of 60% marks is required. Final year students may apply with a conditional admission — this is cancelled if graduation results come below 60%. There is no minimum work experience requirement for most programmes, though the cutoff system strongly incentivises having some work experience. NRI and PIO candidates require a valid GMAT score (compulsory) and IELTS 5.0 if English proficiency needs to be demonstrated.</p>

<h3>GD/WAT/PI Centres</h3>

<p>TAPMI conducts its selection rounds in February-March 2026 across seven cities: Bengaluru, Chennai, Hyderabad, Mumbai, Kolkata, New Delhi, and Manipal. Candidates can choose their preferred centre during the application process. Shortlisted candidates are informed via email to their registered address.</p>`,
}

export default admissions
