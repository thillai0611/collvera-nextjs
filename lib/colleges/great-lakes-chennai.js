const college = {
  slug: 'great-lakes-chennai',
  name: 'Great Lakes Institute of Management',
  short: 'Great Lakes',
  location: 'Chennai, Tamil Nadu (+ Gurgaon campus)',
  founded: 2004,
  director: 'Founded by Late Dr. Bala V. Balachandran (J.L. Kellogg Distinguished Professor)',
  accreditations: ['AACSB', 'AMBA', 'SAQS', 'NBA', 'AICTE'],
  campusLabel: '32 acres · ECR Road Chennai · LEED Platinum · 2 campuses · 4 programs',
  color: '#1a3a6b',
  emoji: '🌊',
  tagline: "India's pioneer 1-year MBA and a leading 2-year PGDM — both with AACSB + AMBA dual accreditation. PGPM Chennai avg ₹17.8 LPA. PGDM Chennai avg ₹15 LPA with ₹39.3 LPA highest. 15,000+ alumni in 30+ countries.",
  nirf: 37,
  qs: null,
  ft: null,
  bt: null,

  stats: [
    { label: 'PGPM Chennai Avg',  value: '₹17.8 LPA',   sub: '2025 placements' },
    { label: 'PGDM Chennai Avg',  value: '₹15 LPA',     sub: '2025 placements' },
    { label: 'PGDM Highest',      value: '₹39.3 LPA',   sub: 'Chennai 2025' },
    { label: 'Programs',          value: '4',            sub: 'PGPM + PGDM × Chennai + Gurgaon' },
    { label: 'Alumni',            value: '15,000+',      sub: 'across 30+ countries' },
    { label: 'Accreditations',    value: 'AACSB + AMBA', sub: 'Double Crown — rare in India' },
  ],

  placements: {
    year: 2025,
    avg: 17.8,
    median: null,
    highest: 30.8,
    companies: null,
    ppo: null,
    international: null,
    rate: 100,

    // All 4 program placement numbers
    all_programs: [
      { program: 'PGPM Chennai',  avg: 17.8, top10_avg: 28.6, highest: 30.8 },
      { program: 'PGPM Gurgaon', avg: 15.1, top10_avg: 21.7, highest: 21.8 },
      { program: 'PGDM Chennai',  avg: 15.0, top10_avg: 23.3, highest: 39.3 },
      { program: 'PGDM Gurgaon', avg: 11.8, top10_avg: 17.6, highest: 22.7 },
    ],

    // PGPM Chennai functions
    sectors: [
      { name: 'Consulting',              pct: 61, color: '#1a3a6b' },
      { name: 'Product Management',      pct: 12, color: '#185fa5' },
      { name: 'Sales / Marketing / BD',  pct: 10, color: '#d95f02' },
      { name: 'Operations / SCM',        pct: 7,  color: '#7b1fa2' },
      { name: 'Analytics & Data Science',pct: 7,  color: '#c0392b' },
      { name: 'Others',                  pct: 3,  color: '#8A8070' },
    ],

    // PGPM Gurgaon functions
    pgpm_gurgaon_sectors: [
      { name: 'Digital Consulting',     pct: 29, color: '#1a3a6b' },
      { name: 'Analytics',              pct: 21, color: '#185fa5' },
      { name: 'Digital Ops',            pct: 14, color: '#d95f02' },
      { name: 'Functional Consulting',  pct: 13, color: '#7b1fa2' },
      { name: 'Enterprise Sales',       pct: 8,  color: '#c0392b' },
      { name: 'Others',                 pct: 15, color: '#8A8070' },
    ],

    // PGDM Chennai functions
    pgdm_chennai_sectors: [
      { name: 'Finance',            pct: 33, color: '#1a3a6b' },
      { name: 'Sales & Marketing',  pct: 32, color: '#185fa5' },
      { name: 'Tech Consulting',    pct: 12, color: '#d95f02' },
      { name: 'Operations',         pct: 11, color: '#7b1fa2' },
      { name: 'Analytics',          pct: 7,  color: '#c0392b' },
      { name: 'Others',             pct: 5,  color: '#8A8070' },
    ],

    // PGDM Gurgaon functions
    pgdm_gurgaon_sectors: [
      { name: 'Finance',            pct: 28, color: '#1a3a6b' },
      { name: 'Sales & Marketing',  pct: 24, color: '#185fa5' },
      { name: 'Tech Consulting',    pct: 18, color: '#d95f02' },
      { name: 'Analytics',          pct: 14, color: '#7b1fa2' },
      { name: 'Operations',         pct: 10, color: '#c0392b' },
      { name: 'Others',             pct: 6,  color: '#8A8070' },
    ],

    recruiters: [
      { name: 'Accenture Strategy & Consulting', offers: null, type: 'Consulting' },
      { name: 'Deloitte India / USI',            offers: null, type: 'Consulting' },
      { name: 'KPMG',                            offers: null, type: 'Consulting' },
      { name: 'ZS Associates',                   offers: null, type: 'Consulting' },
      { name: 'JP Morgan Chase',                 offers: null, type: 'BFSI' },
      { name: 'Amazon',                          offers: null, type: 'E-commerce' },
      { name: 'Cognizant',                       offers: null, type: 'IT / Consulting' },
      { name: 'LTIMindtree',                     offers: null, type: 'IT / Consulting' },
      { name: 'Tiger Analytics',                 offers: null, type: 'Analytics' },
      { name: 'Nestle',                          offers: null, type: 'FMCG' },
      { name: 'ITC',                             offers: null, type: 'FMCG' },
      { name: 'Gartner',                         offers: null, type: 'Research' },
    ],
  },

  fees: {
    tuition: 12.43,
    other: 11.07,
    total: 23.50,              // PGPM Chennai all-inclusive
    pgpm_gurgaon_low: 21.66,
    pgpm_gurgaon_high: 24.10,
    pgdm_chennai: '₹16–18 L (approx)',
    pgdm_gurgaon: '₹14–16 L (approx)',
    living_monthly: 'Included (hostel + all vegetarian meals mandatory)',
    loan_max: 'Up to full tuition via SBI and major banks',
    loan_rate: '8.5–11% p.a.',
    scholarships: [
      { name: 'Merit Scholarship',  criteria: 'Top scorers and diverse profiles', amount: 'Up to 20% off fees' },
      { name: 'Education Loan',     criteria: 'All admitted students',            amount: 'Up to full tuition' },
    ],
  },

  admissions: {
    cutoff_general: 80,
    cutoff_obc: null,
    cutoff_sc: null,
    cutoff_st: null,
    sectional_min: null,

    process: [
      'Online application at greatlakes.edu.in (fee: ₹2,200)',
      'Select Chennai, Gurgaon, or both — common application for all programs',
      'Initial screening by admissions committee',
      'AI Interview invitation by email',
      'AI Interview completed online',
      'Personal Interview (PI) invitation by email',
      'Personal Interview conducted',
      'Final shortlisting and offer letters by email',
      'Offer acceptance and initial fee payment',
      'Document verification',
      'Course registration, orientation, commencement',
    ],

    pgpm_eligibility: {
      education: "Bachelor's degree from recognised institution",
      work_exp: '2+ years by 30 April 2026 (mandatory)',
      tests: ['GMAT (2023+)', 'CAT 2024/25', 'XAT 2025/26', 'NMAT 2024+'],
    },
    pgdm_eligibility: {
      education: "Bachelor's degree from recognised institution",
      work_exp: 'Not required — freshers welcome',
      tests: ['CAT 2025', 'XAT 2026', 'GMAT', 'NMAT', 'CMAT'],
    },

    shortlist_weights: [
      { label: 'GMAT / CAT / XAT / NMAT score', pct: null },
      { label: 'Academic record',               pct: null },
      { label: 'Work experience',               pct: null },
      { label: 'AI Interview + PI',             pct: null },
    ],
    final_weights: [
      { label: 'Personal Interview',  pct: null },
      { label: 'Work Experience',     pct: null },
      { label: 'Test Score',          pct: null },
      { label: 'Academic Background', pct: null },
    ],

    batch: {
      size: null,
      female: 24,
      engineering: null,
      work_exp_pct: 100,
      avg_work_months: 38,
    },

    pgpm_chennai_batch: {
      avg_exp_years: 3.2, avg_age: 25, female_pct: 24,
      exp_dist: '24-30m: 25% | 30-36m: 32% | 36-48m: 27% | 48+m: 16%',
      bg: 'IT/ITES 38%, BFSI 8%, Consulting 7%, Automobile 5%',
    },
    pgpm_gurgaon_batch: {
      avg_exp_years: 3.1, avg_age: 25, female_pct: 36,
      exp_dist: '24-35m: 49% | 36-48m: 38% | 49-60m: 10% | 60+m: 3%',
      bg: 'IT/ITES 46%, BFSI 12%, Consulting 11%, E-commerce 4%',
    },
    pgdm_chennai_batch: {
      batch_size: 368, female_pct: 35, freshers_pct: 66,
      exp_dist: 'Freshers 66% | 1-12m: 13% | 13-23m: 15% | 24-35m: 6%',
      bg: 'ITES/Telecomm 26%, BFSI 18%, Manufacturing 13%, Education 12%, Consulting 10%',
    },
    pgdm_gurgaon_batch: {
      avg_age: 22, female_pct: 44, freshers_pct: 75,
      exp_dist: 'Freshers 75% | 1-12m: 10% | 13-23m: 10% | 24-35m: 5%',
      bg: 'Engineering/IT 35%, Commerce/BBA 25%, Science 15%, Arts 10%, Others 15%',
    },
  },

  programs: [
    {
      name: 'PGPM — Chennai',
      duration: '1 year (7 terms)',
      fees: '₹23.5 L',
      intake: null,
      exam: 'GMAT 550+ / CAT 80%+',
      note: 'Flagship. 7 specialisations. PGPM 2.0 curriculum. Avg ₹17.8 LPA (2025). Min 2 yrs exp.',
    },
    {
      name: 'PGPM — Gurgaon',
      duration: '1 year (7 terms)',
      fees: '₹21.7–24.1 L',
      intake: null,
      exam: 'GMAT 550+ / CAT 80%+',
      note: 'Delhi-NCR campus. 5 specialisations. 36% female. Avg ₹15.1 LPA (2025). Min 2 yrs exp.',
    },
    {
      name: 'PGDM — Chennai',
      duration: '2 years (6 terms + internship)',
      fees: '₹16–18 L (approx)',
      intake: 368,
      exam: 'CAT / XAT / GMAT / NMAT / CMAT',
      note: 'AICTE + NBA accredited. Freshers welcome. 5 specialisations. Highest ₹39.3 LPA (2025).',
    },
    {
      name: 'PGDM — Gurgaon',
      duration: '2 years (6 terms + internship)',
      fees: '₹14–16 L (approx)',
      intake: null,
      exam: 'CAT / XAT / GMAT / NMAT / CMAT',
      note: 'AICTE + NBA accredited. 6 specialisations incl. HR. 75% freshers. Avg ₹11.8 LPA (2025).',
    },
  ],

  rankings: [
    { source: 'NIRF 2025 (Chennai)',  rank: '#37',          note: 'Management category' },
    { source: 'NIRF 2025 (Gurgaon)', rank: '#50',          note: 'Management category' },
    { source: 'Outlook India',        rank: '#3',           note: 'Top Standalone Institutions' },
    { source: 'Business World',       rank: '#9',           note: 'Top Private B-Schools North (Gurgaon)' },
    { source: 'Analytics India Mag',  rank: '#5',           note: 'Analytics B-Schools' },
    { source: 'Accreditations',       rank: 'AACSB + AMBA', note: 'Double Crown — only ~7 Indian B-schools' },
  ],

  campus: {
    area: '32 acres (Chennai) · 7.5 acres (Gurgaon)',
    dorms: null,
    dorm_capacity: null,
    architect: 'LEED Platinum Rated Green Campus — first in South Asia (Chennai)',
    heritage: 'Founded 2004 by Late Dr. Bala V. Balachandran, J.L. Kellogg Distinguished Professor',
    clubs: null,
    highlights: [
      'LEED Platinum Rated Green Campus — first of its kind in South Asia (Chennai)',
      'Two campuses — Chennai (flagship, 32 acres) and Gurgaon (7.5 acres, NH-8 Delhi-NCR)',
      'Four programs — PGPM and PGDM at both campuses; freshers welcome in PGDM',
      'Mandatory residential — hostel + vegetarian meals included in all program fees',
      'Karma-Yoga in all programs — 27+ villages, 10,000+ people impacted (Chennai)',
      '25+ visiting faculty from Kellogg, Stanford, Yale, Harvard teach on campus every year',
      'International immersion: IESEG, SKEMA, Frankfurt School, Bordeaux, HHL Leipzig',
      'Dual degree at University of Bordeaux — second triple-accredited MBA in 4–6 weeks',
      'Student exchange: 13–14 global partners across France, Germany, USA, Italy, Japan, Russia',
      '90+ national-level prizes won by students in 2024-25; 100+ industry leaders visited',
    ],
    international_partners: [
      { name: 'IESEG School of Management',   country: 'France',  type: 'Immersion + Exchange' },
      { name: 'University of Bordeaux',       country: 'France',  type: 'Dual Degree' },
      { name: 'SKEMA Business School',        country: 'France',  type: 'Immersion' },
      { name: 'Frankfurt School of Finance',  country: 'Germany', type: 'Immersion' },
      { name: 'HHL Leipzig',                  country: 'Germany', type: 'Immersion' },
      { name: 'EDHEC Business School',        country: 'France',  type: 'Partner' },
      { name: 'Bologna Business School',      country: 'Italy',   type: 'Partner' },
      { name: 'PACE University',              country: 'USA',     type: 'Partner' },
      { name: 'Rutgers-Camden',               country: 'USA',     type: 'Gurgaon only' },
      { name: 'Ural Federal University',      country: 'Russia',  type: 'Gurgaon only' },
      { name: 'NUCB Business School',         country: 'Japan',   type: 'Chennai only' },
      { name: 'University of Huddersfield',   country: 'UK',      type: 'Partner' },
      { name: 'Manchester Metropolitan Univ', country: 'UK',      type: 'Chennai only' },
    ],
  },

  alumni: [
    { name: 'Ramya Balakrishnan',  batch: '2007', role: 'Global Director — Strategy & Ops, Meta (Facebook), USA' },
    { name: 'Shobha Subramanian', batch: '2007', role: 'Lead Product Manager, Uber, USA' },
    { name: 'Neha Kumar Saraf',   batch: '2007', role: 'Sr. Director, Visa, Singapore' },
    { name: 'Harsh Ratan Mehta',  batch: '2010', role: 'Global Director, PepsiCo' },
    { name: 'Aparna S',           batch: '2010', role: 'Director & Business Lead, Bain Capability Network' },
    { name: 'Ritesh Pal',         batch: '2014', role: 'Director, Morgan Stanley, UK' },
    { name: 'Divyansh Nasa',      batch: null,   role: 'Partner — Transaction Strategy & Execution, EY-Parthenon' },
    { name: 'Guneet Gyani',       batch: null,   role: 'Senior Manager — Search and Commerce, Google' },
    { name: 'Amisha Arora',       batch: null,   role: 'Head — Ecommerce, East Asia, H&M' },
    { name: 'Hemant Grover',      batch: '2013', role: 'Director of Technology, Xceedance' },
  ],

  verdict: {
    best_for: [
      'IT professionals (2-4 yrs exp) switching to consulting or product management — PGPM Chennai',
      'Freshers from engineering/commerce wanting structured 2-year MBA with summer internship — PGDM',
      'Candidates with GMAT 550+ / CAT 80%+ who cannot afford ISB but want same AACSB+AMBA credential',
      'Finance and BFSI aspirants — PGDM Chennai has 33% finance placements including JP Morgan, PayPal, Wells Fargo',
      'Analytics and digital roles — Gurgaon campus specialises in AI/ML and Digital Consulting',
    ],
    watch_out: [
      'PGPM avg ₹17.8 LPA (Chennai) is strong but significantly below IIMs — not a direct substitute',
      'PGDM Gurgaon avg ₹11.8 LPA is modest — evaluate against MDI, IMT, and other Gurgaon options',
      'Chennai campus is 40km from city on ECR Road — remote location for weekend networking',
      'PGCM (PGPM degree) is not technically an MBA — clarify with employers; widely recognised but a real difference',
      'PGDM fees are approximate — confirm exact figure with admissions office before committing',
    ],
    apply_if: 'You have 2-5 years experience targeting consulting/product (PGPM), or you are a fresher targeting Finance/FMCG/Analytics with a 2-year structured MBA at affordable fees (PGDM).',
    skip_if: 'You need IIM-level brand prestige, MBB placements, or ISB-level average salaries. Also skip PGDM Gurgaon if MDI or IMT are reachable — the salary outcomes are significantly better there.',
  },

  reviews: {
    academics: 4.1,
    placements: 4.0,
    campus: 4.2,
    roi: 4.3,
    overall: 4.1,
    quotes: [
      {
        text: 'The 1-year format was intense but exactly what I needed. I went from IT services to a consulting role at Deloitte — that career switch happened because of Great Lakes.',
        source: 'PGPM Alumni, Chennai, 2024',
      },
      {
        text: 'Karma-Yoga sounds gimmicky from the outside but it genuinely changes how you think about leadership. It was the most memorable part of the entire program.',
        source: 'PGDM Alumni, Gurgaon, 2023',
      },
      {
        text: 'The PGDM summer internship led directly to my PPO at ICICI Bank. That bridge from academics to corporate is what makes the 2-year format valuable.',
        source: 'PGDM Alumni, Chennai, 2024',
      },
    ],
  },
}

export default college
