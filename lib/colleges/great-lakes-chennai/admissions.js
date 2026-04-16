const admissions = {
  // PGDM Eligibility (Official 2026-28 brochure)
  pgdm: {
    education: "Bachelor's degree (any discipline) with 60% throughout — 10th, 12th, and graduation",
    work_exp: 'Freshers and candidates with strictly less than 36 months of work experience as on 30 May 2026',
    scores_accepted: ['CAT 2024/25', 'XAT 2025/26', 'GMAT 2023 or later'],
    application_fee: 2200,
    cutoff_min: 85,
    cutoff_competitive: 90,
  },

  // PGPM Eligibility (Official 2026-27 brochure)
  pgpm: {
    education: "Bachelor's degree in any discipline from a recognized institution",
    work_exp: '2+ years of work experience by 30 April 2026',
    scores_accepted: ['CAT 2024/25', 'XAT 2025/26', 'GMAT 2023 or later', 'NMAT 2023 onwards'],
    recommendation: '1 recommendation required (provide email of recommender)',
    application_fee: 2200,
    avg_exp_years: 3.2,
    avg_age: 25,
  },

  // Admissions process (both programmes — 11 steps)
  process: [
    'Online application at greatlakes.edu.in (fee: ₹2,200)',
    'Initial screening and AI Interview invite by email',
    'AI Interview conducted',
    'Personal Interview (PI) invite by email',
    'Personal Interview',
    'Final shortlisting and offer letters by email',
    'Offer acceptance and initial fee payment',
    'Document verification',
    'Course registration and orientation',
    'Course commencement',
  ],

  // Fields used by CollegeDetailClient structured UI
  cutoff_general: 85,
  cutoff_competitive: 90,
  cutoff_xat: 90,
  cutoff_gmat: 650,

  cat_cutoffs: [
    { category: 'General / EWS', min: '85%ile', realistic: '90–92%ile' },
    { category: 'OBC',           min: '80%ile', realistic: '87–89%ile' },
    { category: 'SC',            min: '70%ile', realistic: '75–80%ile' },
    { category: 'ST',            min: '65%ile', realistic: '70–75%ile' },
  ],

  shortlist_weights: [
    { label: 'CAT / Entrance Score',  pct: 50 },
    { label: 'Academic Performance',   pct: 25 },
    { label: 'Work Experience',         pct: 15 },
    { label: 'Personal Interview',      pct: 10 },
  ],

  // PGDM batch profile 2025-27 (official brochure)
  batch: {
    size: 368,
    female: 35,
    freshers_pct: 66,
    work_exp_1_12m: 13,
    work_exp_13_23m: 15,
    work_exp_24_35m: 6,
    pre_mba_industry: [
      { sector: 'ITES / Telecomm', pct: 26 },
      { sector: 'BFSI',           pct: 18 },
      { sector: 'Manufacturing',  pct: 13 },
      { sector: 'Education',      pct: 12 },
      { sector: 'Consulting',     pct: 10 },
      { sector: 'Healthcare',     pct: 6  },
      { sector: 'Construction',   pct: 4  },
      { sector: 'Marketing',      pct: 4  },
      { sector: 'Others',         pct: 7  },
    ],
    // For UI component
    engineering: 60,
    work_exp_pct: 34,
    avg_work_months: 8,
  },

  // PGPM batch profile 2025-26 (official brochure)
  pgpm_batch: {
    avg_exp_years: 3.2,
    avg_age: 25,
    female: 24,
    work_exp_distribution: [
      { range: '24–30 months', pct: 25 },
      { range: '30–36 months', pct: 32 },
      { range: '36–48 months', pct: 27 },
      { range: '48+ months',   pct: 16 },
    ],
    pre_mba_industry: [
      { sector: 'IT / ITES',                    pct: 38 },
      { sector: 'BFSI',                          pct: 8  },
      { sector: 'Consulting',                    pct: 7  },
      { sector: 'Automobile',                    pct: 5  },
      { sector: 'E-commerce & FMCG',            pct: 4  },
      { sector: 'Construction & Manufacturing', pct: 4  },
      { sector: 'Advertising / Media / Comms',  pct: 2  },
      { sector: 'Supply Chain & Logistics',     pct: 2  },
      { sector: 'Others',                        pct: 32 },
    ],
  },

  content: `<h2>Great Lakes Chennai Admissions 2026 — PGDM and PGPM Eligibility, Process and Application Strategy</h2>

<p>GLIM Chennai receives applications for two primary programmes: the 2-year PGDM (for freshers and those with less than 36 months of work experience) and the 1-year PGPM (requiring 2+ years of experience). Both programmes share the same 11-step admissions process, starting with an online application at greatlakes.edu.in with a fee of ₹2,200. A key recent addition to GLIM's process: Step 4 involves an <strong>AI Interview</strong> before the Personal Interview — a screening round conducted digitally that assesses communication skills and basic reasoning before shortlisting for the PI.</p>

<h3>PGDM Eligibility — Who Can Apply</h3>

<p>The PGDM is designed for freshers and early-career candidates. Eligibility: a Bachelor's degree in any discipline from a recognised institution with a minimum of <strong>60% throughout</strong> — across 10th, 12th, and graduation. Work experience limit: candidates must have <strong>strictly less than 36 months</strong> of full-time work experience as of 30 May 2026. Accepted scores: CAT 2024 or 2025, XAT 2025 or 2026, or GMAT from 2023 onwards. Note that NMAT is NOT accepted for PGDM (only for PGPM). The 60% throughout requirement is a hard filter — borderline academic profiles (below 60% in any stage) are typically not shortlisted regardless of entrance score.</p>

<h3>PGPM Eligibility — Who Can Apply</h3>

<p>The PGPM requires a Bachelor's degree in any discipline (no minimum percentage specified in the brochure) and <strong>2+ years of full-time work experience by 30 April 2026</strong>. Additionally, one recommendation is mandatory — applicants must provide the email address of their recommender in the application, and the recommender is contacted directly by GLIM at a later stage. Accepted scores for PGPM: CAT 2024/25, XAT 2025/26, GMAT 2023+, and crucially, <strong>NMAT 2023 onwards</strong> — making PGPM accessible to candidates who have taken NMAT but not CAT. The PGPM 2025-26 batch averaged 3.2 years of work experience and an average age of 25 years, with 24% female representation and 38% from IT/ITES backgrounds.</p>

<h3>CAT Cutoffs — What Actually Gets You Shortlisted</h3>

<p>The published minimum CAT cutoff for PGDM is 85 percentile overall. In practice, the competitive range for a general category candidate is 90–92 percentile. Scores between 85 and 89 percentile can result in a shortlist call if your academic record is strong and your work experience profile is differentiated, but competition is intense in this range. Below 85 percentile overall, or below the sectional minimum of 50 percentile in any section, shortlisting is unlikely. For PGPM, the effective cutoff is lower — candidates with 3–5 years of strong professional experience in BFSI, consulting, or technology have received calls at 80–85 percentile due to the higher weight placed on work experience. XAT 90 percentile and GMAT 650+ are considered broadly equivalent to meeting the CAT minimum threshold.</p>

<h3>Selection Weightage</h3>

<p>GLIM Chennai's published selection weightage: <strong>CAT/entrance score 50%</strong>, academic performance 25%, work experience 15%, personal interview 10%. This is a heavily quantitative formula — the entrance score alone determines half the selection outcome. Academic performance (10th, 12th, graduation marks) carries meaningful weight and can differentiate candidates with similar CAT scores. Work experience is more significant for PGPM shortlisting than PGDM. The PI, at 10% of the formula, is the smallest component on paper but can functionally screen out candidates who lack sector clarity or cannot articulate a clear reason for choosing GLIM specifically.</p>

<h3>PGDM Batch Profile 2025-27</h3>

<p>The PGDM 2025-27 batch has <strong>368 students</strong> with <strong>35% female representation</strong>. Work experience composition: 66% freshers (no full-time work experience), 13% with 1–12 months, 15% with 13–23 months, and 6% with 24–35 months. Pre-MBA industry background of students with experience: ITES/Telecomm 26%, BFSI 18%, Manufacturing 13%, Education 12%, Consulting 10%, Healthcare 6%. The majority fresher composition is normal for a 2-year PGDM programme and reflects the eligibility cap of less than 36 months of experience.</p>

<h3>The 11-Step Admissions Process</h3>

<p>Apply online at greatlakes.edu.in and pay ₹2,200. Fill the common application form — you can apply to Chennai only, Gurgaon only, or both campuses through the same form. After initial screening, shortlisted candidates receive an AI Interview invite by email (Step 4) — this is a technology-mediated screening round. Candidates who clear the AI Interview receive a Personal Interview invite (Step 5), followed by the PI itself (Step 6). Offer letters go out after final shortlisting (Step 7). After accepting the offer and paying the initial fee (Step 8), document verification (Step 9), orientation (Step 10), and course commencement (Step 11) follow.</p>

<h3>Personal Interview Preparation</h3>

<p>GLIM Chennai's PI panel typically includes one faculty and one industry professional. The interview runs 15–20 minutes and covers three areas: your professional background and reason for the MBA, your target sector knowledge, and specifically why GLIM Chennai rather than a generic MBA programme. If you say consulting, expect probing on current industry dynamics in management consulting India. If you say BFSI, be prepared for questions on RBI monetary policy or global banking trends. The AI Interview that precedes the PI tests fluency and communication — prepare to speak clearly and concisely on your background and goals, as this is likely assessed for articulation rather than domain knowledge.`,
}

export default admissions
