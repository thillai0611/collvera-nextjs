const admissions = {
  cutoff_general: 85,       // minimum overall percentile
  cutoff_competitive: 92,   // realistic median for shortlist
  cutoff_xat: 90,
  cutoff_gmat: 650,

  // Used by the CAT cutoffs table in CollegeDetailClient
  cat_cutoffs: [
    { category: 'General / EWS', min: '85%ile', realistic: '90–92%ile' },
    { category: 'OBC',           min: '80%ile', realistic: '87–90%ile' },
    { category: 'SC',            min: '70%ile', realistic: '75–80%ile' },
    { category: 'ST',            min: '65%ile', realistic: '70–75%ile' },
  ],

  // Used by the selection weights bar chart
  shortlist_weights: [
    { label: 'CAT / Entrance Score', pct: 50 },
    { label: 'Academic Performance',  pct: 25 },
    { label: 'Work Experience',        pct: 15 },
    { label: 'Personal Interview',     pct: 10 },
  ],

  // No separate final_weights for GLIM — PI is already included above
  final_weights: [],

  // Batch profile — NIRF 2025 data
  batch: {
    size: 581,
    female: 31,
    engineering: 62,
    work_exp_pct: 45,
    avg_work_months: 18,
  },

  content: `<h2>Great Lakes Chennai Admissions 2025 — CAT Cutoffs, Selection Process and Application Strategy</h2>

<p>GLIM Chennai receives applications for three programmes: the 2-year PGDM (fresh graduates and early-career professionals), the 1-year PGPM (2+ years work experience required), and the PGPM-FBE specialisation track. Admission is based on CAT, XAT, GMAT, or the Great Lakes Aptitude Test (GLAT).</p>

<h3>CAT Cutoff for GLIM Chennai 2025</h3>

<p>The published minimum CAT cutoff for PGDM is <strong>85 percentile overall</strong>, with a 50 percentile minimum in each section (Verbal, DILR, Quantitative). In practice, the median admitted score is closer to 90–92 percentile for PGDM. Scores between 85–89 percentile can result in a shortlist if work experience and academics are strong. Scores below 85 overall or below 50 in any section are unlikely to clear the filter. For PGPM, the effective cutoff is lower for candidates with 3–5 years of strong professional experience — profiles with 80–85 percentile and differentiated work experience do get calls. For scholarship consideration: 95+ percentile CAT or 700+ GMAT.</p>

<h3>XAT and GMAT</h3>

<p>XAT scores of 90 percentile or above are considered equivalent to 85–88 CAT percentile for shortlisting purposes. GMAT of 650 or above meets the minimum threshold. The Great Lakes Aptitude Test (GLAT) is an easier entry path but typically results in lower scholarship consideration.</p>

<h3>Selection Weightage Formula</h3>

<p>GLIM Chennai's published selection weightage: <strong>CAT/entrance score 50%</strong>, academic performance 25%, work experience 15%, personal interview 10%. The entrance score is the dominant factor. Academic performance (25%) examines 10th, 12th, and undergraduate marks — a consistent record above 7.5 GPA adds meaningful weight when scores are borderline. Work experience (15%) matters more for PGPM eligibility than PGDM differential. The interview (10%) is smallest in formula weight but can functionally disqualify a candidate if the panel finds the intent unclear or preparation poor.</p>

<h3>PGDM vs PGPM — Which Programme to Choose</h3>

<p>Choose <strong>PGDM</strong> if you have less than 2 years of full-time work experience, or if you want 2 years on campus to explore sectors before committing to a specialisation. Choose <strong>PGPM</strong> if you have 3–7 years of experience, you are clear about your target sector (BFSI, analytics, or consulting), and you want to minimise career disruption. PGPM placements at GLIM Chennai are historically stronger per-student than PGDM — smaller batch, more experienced profiles, easier company-to-role matching.</p>

<h3>PGPM-FBE: The Finance Track</h3>

<p>The PGPM-FBE (Finance and Business Economics) is a specialisation within the PGPM for candidates with quantitative backgrounds targeting risk analytics, quantitative finance, corporate treasury, or financial modelling. JP Morgan, BNY Mellon, and Mastercard are known PGPM-FBE recruiters. Target this track explicitly if finance is your intent and your undergraduate is in engineering, economics, or mathematics.</p>

<h3>GLIM Chennai vs GLIM Gurgaon</h3>

<p>Both campuses share the NIRF rank of 34 for 2025. Chennai has stronger BFSI and analytics placements (geographic advantage: global banks in Chennai). Gurgaon has stronger FMCG and north India consumer sector placements (Delhi NCR ecosystem). Finance or analytics — choose Chennai. FMCG or north India network — choose Gurgaon.</p>

<h3>Batch Profile (NIRF 2025)</h3>

<p>Total enrolled: 581 students. Female representation: 31% — above the 25–28% typical for Indian B-schools at this level, driven by the diversity scholarship incentive. Out-of-state students: 90% of the batch. Engineering undergraduates: approximately 62%. Students with work experience: approximately 45% of the total batch (nearly all PGPM students plus some PGDM students).</p>

<h3>Personal Interview Preparation</h3>

<p>GLIM Chennai's PI is structured around three areas: your professional background and why an MBA now, your knowledge of your target sector, and specifically why GLIM Chennai. Interviewers probe sector knowledge actively — if you say BFSI, expect questions on RBI monetary policy or global banking trends. The panel typically includes one faculty and one industry professional. Dress formally, prepare a 90-second self-introduction connecting your background to your MBA intent, and have a specific answer for why GLIM Chennai over SIBM, IMT, or TAPMI.</p>`,
}

export default admissions
