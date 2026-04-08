const college = {
  slug: 'soil',
  name: 'SOIL Institute of Management',
  short: 'SOIL',
  location: 'Gurugram, Haryana',
  founded: 2009,
  director: 'Anil Sachdev (Founder & Chairman)',
  accreditations: ['AICTE Approved'],
  campusLabel: 'Gurugram (Sec 44) + Manesar · Industry co-created by 30+ companies · NCR',
  color: '#1b6b3a',
  emoji: '🌱',
  tagline: "India's only 1-year PGPM-HR and an MBA co-created by 30+ industry leaders. SOIL produces leaders with character, competence, and a consistent 2x+ ROI.",
  nirf: null,
  qs: null,
  ft: null,
  bt: null,

  stats: [
    { label: 'PGPM Avg CTC',      value: '₹12.3 LPA',  sub: '2024–25 batch' },
    { label: 'PGDM Avg CTC',      value: '₹11.5 LPA',  sub: '2024–26 interim' },
    { label: 'ROI',               value: '2.22x',       sub: 'post vs pre-MBA salary' },
    { label: 'Industry Partners', value: '30+',         sub: 'consortium co-creators' },
    { label: 'Placement Rate',    value: '100%',        sub: 'of those who opted in' },
    { label: 'HR Alumni',         value: '500+',        sub: 'PGPM-HR in 200+ orgs' },
  ],

  placements: {
    year: 2025,
    avg: 12.3,
    median: null,
    highest: 21.8,
    companies: 60,
    ppo: null,
    international: null,
    rate: 100,

    // PGPM 4-year trend — official placement reports
    pgpm_trend: [
      { batch: '2021–22', avg: 11.0,  top50: 13.2, highest: 19.0, firms: 43, roi: '2.52x' },
      { batch: '2022–23', avg: 11.5,  top50: 12.6, highest: 18.5, firms: 49, roi: '2.37x' },
      { batch: '2023–24', avg: 11.75, top50: 13.7, highest: 22.0, firms: 64, roi: '2.31x' },
      { batch: '2024–25', avg: 12.3,  top50: 15.4, highest: 21.8, firms: 60, roi: '2.22x' },
    ],

    // PGDM 5-year trend — official placement reports
    pgdm_trend: [
      { batch: '2020–22',          avg: 9.7,   median: 9.8,  highest: 20.0, firms: 61 },
      { batch: '2021–23',          avg: 10.3,  median: 10.0, highest: 19.3, firms: 49 },
      { batch: '2022–24',          avg: 10.75, median: 10.5, highest: 27.0, firms: 84 },
      { batch: '2023–25',          avg: 11.17, median: 10.9, highest: 20.7, firms: 130 },
      { batch: '2024–26 (interim)',avg: 11.5,  median: null,  highest: 24.0, firms: null },
    ],

    // PGPM specialization 2024–25
    pgpm_specs: [
      { spec: 'Marketing', avg: 13.54, highest: 21.42 },
      { spec: 'Analytics', avg: 13.27, highest: 21.81 },
      { spec: 'Finance',   avg: 11.18, highest: null },
    ],

    // PGPM-HR 2024–25
    pgpm_hr: {
      highest: 20,
      avg: 11.2,
      top50: 13.7,
      opted_pct: 98,
      placed_pct: 100,
    },

    sectors: [
      { name: 'IT & ITES',  pct: 22, color: '#1b6b3a' },
      { name: 'BFSI',       pct: 14, color: '#185fa5' },
      { name: 'Automotive', pct: 14, color: '#d95f02' },
      { name: 'Consulting', pct: 10, color: '#7b1fa2' },
      { name: 'Insurance',  pct: 8,  color: '#c0392b' },
      { name: 'Others',     pct: 32, color: '#8A8070' },
    ],

    functions: [
      { name: 'Consulting',           pct: 31, color: '#1b6b3a' },
      { name: 'Analytics',            pct: 21, color: '#185fa5' },
      { name: 'Business Development', pct: 17, color: '#d95f02' },
      { name: 'Marketing',            pct: 16, color: '#7b1fa2' },
      { name: 'Finance',              pct: 10, color: '#c0392b' },
      { name: 'HR',                   pct: 5,  color: '#8A8070' },
    ],

    recruiters: [
      { name: 'Gartner',             offers: null, type: 'Research & Consulting' },
      { name: 'S&P Global',          offers: null, type: 'BFSI' },
      { name: 'BCG',                 offers: null, type: 'Consulting' },
      { name: 'Deloitte',            offers: null, type: 'Consulting' },
      { name: 'Microsoft',           offers: null, type: 'Technology' },
      { name: 'Mahindra & Mahindra', offers: null, type: 'Automotive' },
      { name: 'Hero MotoCorp',       offers: null, type: 'Automotive' },
      { name: 'Tata Communications', offers: null, type: 'Telecom' },
      { name: 'ANZ',                 offers: null, type: 'BFSI' },
      { name: 'HDFC Bank',           offers: null, type: 'BFSI' },
      { name: 'KPMG Global',         offers: null, type: 'Consulting' },
      { name: 'PWC',                 offers: null, type: 'Consulting' },
    ],
  },

  fees: {
    // Approximate — official fees not publicly listed; contact admissions@soilindia.net
    pgpm_total: 15.00,
    pgpm_hr_total: 15.00,
    pgdm_total: 17.00,
    tuition: 15.00,   // PGPM flagship shown in overview
    other: null,
    total: 15.00,
    living_monthly: '₹8,000 – 15,000',
    loan_max: 'Up to ₹20 L',
    loan_rate: '8–12% p.a.',
    scholarships: [
      { name: 'Need-Based Aid',    criteria: 'Financial need assessment', amount: 'Varies' },
      { name: 'Merit Scholarship', criteria: 'Academic performance',      amount: 'Varies' },
    ],
    note: 'Fees are approximate. Contact admissions@soilindia.net for current fee structure.',
  },

  admissions: {
    cutoff_general: null,
    cutoff_obc: null,
    cutoff_sc: null,
    cutoff_st: null,
    sectional_min: null,

    process: [
      'Application form submission',
      'Application screening',
      'Shortlisting based on overall profile',
      'Personal Interview',
      'Group Discussion / Activity',
      'Psychometric Assessment',
      'Offer of Admission',
      'Acceptance and fee payment',
      'Orientation and program commencement',
    ],

    tests: ['CAT', 'GMAT', 'XAT', 'GRE', 'SOIL Aptitude Test'],

    eligibility: [
      { prog: 'PGPM',    req: "Bachelor's degree + minimum 2 years work experience" },
      { prog: 'PGPM-HR', req: "Bachelor's degree · Work experience preferred · Freshers considered" },
      { prog: 'PGDM',    req: "Bachelor's degree · Freshers welcome (76% freshers in 2023–25 batch)" },
    ],

    shortlist_weights: [
      { label: 'Academic Record',           pct: null },
      { label: 'Test Score (CAT/GMAT/XAT)', pct: null },
      { label: 'Work Experience',           pct: null },
      { label: 'Personal Interview',        pct: null },
    ],
    final_weights: [
      { label: 'Personal Interview',      pct: null },
      { label: 'Group Discussion',        pct: null },
      { label: 'Psychometric Assessment', pct: null },
      { label: 'Academic + Work Profile', pct: null },
    ],

    batch: {
      size: 60,
      female: 29,
      engineering: 62,
      work_exp_pct: 76,
      avg_work_months: 44,
    },

    pgdm_batch: {
      avg_age: 22.5,
      female: 46,
      freshers_pct: 76,
      states: 25,
      avg_work_months: 4,
    },

    pgpm_hr_batch: {
      avg_age: 24.7,
      female: 64,
      freshers_pct: 24,
      states: 13,
      avg_work_months: 23,
    },
  },

  programs: [
    {
      name: 'PGPM',
      duration: '1 year',
      fees: '₹15 L (approx)',
      intake: '~60',
      exam: 'CAT / GMAT / XAT',
      note: 'Min 2 yrs work exp. Specializations: Finance, Marketing, Analytics. Avg ROI 2.22x.',
    },
    {
      name: 'PGPM-HR',
      duration: '1 year',
      fees: '₹15 L (approx)',
      intake: null,
      exam: 'CAT / GMAT / XAT',
      note: "India's only 1-year PGPM-HR. 500+ alumni in 200+ orgs. Avg CTC ₹11.2 LPA (2025).",
    },
    {
      name: 'PGDM (SSOBD)',
      duration: '2 years',
      fees: '₹17 L (approx)',
      intake: null,
      exam: 'CAT / GMAT / XAT',
      note: 'AICTE approved. Business + Design Thinking + Liberal Arts. Manesar campus. 130 recruiters.',
    },
  ],

  rankings: [
    { source: 'NIRF',                rank: 'Not Ranked',    note: 'Not in NIRF management list' },
    { source: 'Industry Consortium', rank: '30+ Partners',  note: 'ABB, Aditya Birla, Mahindra, Tata, Hero' },
    { source: 'Global Partners',     rank: '7 Universities', note: 'Polimi · IESE · Shizenkan · Royal Roads · FGV' },
  ],

  campus: {
    area: 'Gurugram + Manesar (2 campuses)',
    dorms: null,
    dorm_capacity: null,
    architect: 'Modern residential campus — fully live-in format',
    heritage: 'Founded 2009 by Anil Sachdev; co-created with 30+ industry consortium companies',
    clubs: null,
    highlights: [
      "Gurugram NCR — India's corporate capital at your doorstep for placements & networking",
      'Two campuses: Sector 44 Gurugram (PGPM / PGPM-HR) and Manesar (PGDM / SSOBD)',
      'Industry consortium of 30+ companies co-designed the curriculum',
      'International exchange: IESE Business School (Spain), Shizenkan (Japan), FGV (Brazil)',
      'Global academic partners: Polimi (Italy), Royal Roads (Canada), Johannesburg B-School (SA)',
      'Fully residential — all programs run on immersive live-in format',
      'Leadership & character development built into every program, not just coursework',
    ],
    exchange: [
      { name: 'IESE Business School', country: 'Spain',   note: 'Top-10 global MBA' },
      { name: 'Shizenkan University', country: 'Japan',   note: 'Humanistic leadership' },
      { name: 'FGV (EAESP)',          country: 'Brazil',  note: "Latin America's top B-school" },
    ],
    academic_partners: [
      { name: 'Politecnico di Milano',        country: 'Italy' },
      { name: 'Royal Roads University',       country: 'Canada' },
      { name: 'CEDEP',                        country: 'Spain / France' },
      { name: 'Shizenkan University',         country: 'Japan' },
      { name: 'Johannesburg Business School', country: 'South Africa' },
    ],
    consortium: [
      'ABB', 'Anand Group', 'Aditya Birla Group', 'Hero MotoCorp',
      'Mahindra & Mahindra', 'Schneider Electric', 'S&P Global',
      'Tata Communications', 'Exide Industries', 'Gartner',
    ],
  },

  alumni: [
    { name: "Karen D'Souza",      batch: null, role: 'VP HR, Goldman Sachs' },
    { name: 'Sreya Raghavan',     batch: null, role: 'VP HR, Morgan Stanley' },
    { name: 'Sundaram Vasudevan', batch: null, role: 'VP HR, JP Morgan Chase' },
    { name: 'Arpit Bhatia',       batch: null, role: 'Associate Director, KPMG' },
  ],

  verdict: {
    best_for: [
      'Working professionals (2+ yrs) targeting a fast 1-year MBA in NCR with strong ROI',
      "HR specialists — PGPM-HR is India's only dedicated 1-year HR program",
      'Students who want industry-immersive learning built with 30+ real company inputs',
      'Finance and consulting profiles — BCG, Deloitte, S&P, Gartner recruit regularly',
    ],
    watch_out: [
      'No NIRF ranking — harder to benchmark against IIMs on standard ranking tables',
      'Fees approximate — exact figures require direct contact with admissions office',
      'Smaller brand and batch vs top-10 B-schools; avg salary significantly lower than IIMs',
    ],
    apply_if: 'You have 2+ years of experience, want an industry-connected leadership education in NCR, and are targeting consulting, BFSI, or HR roles with a 2x+ salary jump.',
    skip_if: 'You are targeting IIM-equivalent brand prestige or need AACSB/EQUIS accreditation for a global corporate career.',
  },

  reviews: {
    academics: 4.2,
    placements: 4.0,
    campus: 4.0,
    roi: 4.3,
    overall: 4.1,
    quotes: [
      {
        text: 'SOIL is genuinely different — the focus on values and leadership is not just talk, it is built into everything you do here.',
        source: 'PGPM Alumnus, 2024',
      },
      {
        text: 'The industry connections are real. Every project has an actual company behind it and people who care about the outcome.',
        source: 'PGPM-HR Alumnus, 2023',
      },
      {
        text: 'Gurugram location is a massive advantage — companies are literally next door and that shows in internship and placement quality.',
        source: 'PGDM Student, 2025',
      },
    ],
  },
}

export default college
