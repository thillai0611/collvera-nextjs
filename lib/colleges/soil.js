const college = {
  slug: 'soil',
  name: 'SOIL Institute of Management',
  short: 'SOIL',
  location: 'Gurugram, Haryana',
  founded: 2009,
  director: 'Anil Sachdev (Founder & Chairman)',
  accreditations: ['AICTE Approved (PGDM)'],
  campusLabel: 'Gurugram (Sec 44) + Manesar · Industry co-created by 30+ companies · NCR',
  color: '#1b6b3a',
  emoji: '🌱',
  tagline: "India's only 1-year PGPM-HR and an MBA co-created by 30+ industry leaders. SOIL produces leaders with character, competence, and a consistent 2x+ ROI.",
  nirf: null,
  qs: null,
  ft: null,
  bt: null,

  stats: [
    { label: 'Avg Package', value: '₹12.3 LPA', sub: 'PGPM 2024–25' },
    { label: 'Highest Package', value: '₹21.8 LPA', sub: 'PGPM 2024–25' },
    { label: 'ROI', value: '2.22x', sub: 'post vs pre-MBA salary' },
    { label: 'Industry Partners', value: '30+', sub: 'consortium co-creators' },
    { label: 'Placement Rate', value: '100%', sub: 'of those who opted in' },
    { label: 'HR Alumni', value: '500+', sub: 'PGPM-HR in 200+ orgs' },
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
    sectors: [
      { name: 'IT & ITES', pct: 22, color: '#1b6b3a' },
      { name: 'BFSI', pct: 14, color: '#185fa5' },
      { name: 'Automotive', pct: 14, color: '#d95f02' },
      { name: 'Consulting', pct: 10, color: '#7b1fa2' },
      { name: 'Insurance', pct: 8, color: '#c0392b' },
      { name: 'Others', pct: 32, color: '#8A8070' },
    ],
    recruiters: [
      { name: 'Gartner', offers: null, type: 'Research & Consulting' },
      { name: 'S&P Global', offers: null, type: 'BFSI' },
      { name: 'BCG', offers: null, type: 'Consulting' },
      { name: 'Deloitte', offers: null, type: 'Consulting' },
      { name: 'Microsoft', offers: null, type: 'Technology' },
      { name: 'Mahindra & Mahindra', offers: null, type: 'Automotive' },
      { name: 'Hero MotoCorp', offers: null, type: 'Automotive' },
      { name: 'Tata Communications', offers: null, type: 'Telecom' },
      { name: 'ANZ', offers: null, type: 'BFSI' },
      { name: 'HDFC Bank', offers: null, type: 'BFSI' },
    ],
  },

  fees: {
    tuition: null,
    other: null,
    total: null,
    living_monthly: '₹15,000 – 25,000',
    loan_max: 'Available via major banks',
    loan_rate: '8–12% p.a.',
    scholarships: [
      { name: 'Need-Based Aid', criteria: 'Financial need assessment', amount: 'Varies' },
      { name: 'Merit Scholarship', criteria: 'Academic performance', amount: 'Varies' },
    ],
  },

  admissions: {
    cutoff_general: null,
    cutoff_obc: null,
    cutoff_sc: null,
    cutoff_st: null,
    sectional_min: null,
    shortlist_weights: [
      { label: 'Academic Record', pct: null },
      { label: 'Test Score (CAT / GMAT / XAT)', pct: null },
      { label: 'Work Experience', pct: null },
      { label: 'Personal Interview', pct: null },
    ],
    final_weights: [
      { label: 'Personal Interview', pct: null },
      { label: 'Group Discussion / Activity', pct: null },
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
  },

  programs: [
    {
      name: 'PGPM',
      duration: '1 year',
      fees: 'Contact Admissions',
      intake: null,
      exam: 'CAT / GMAT / XAT',
      note: '2+ years work experience required. Specializations: Finance, Marketing, Analytics.',
    },
    {
      name: 'PGPM-HR',
      duration: '1 year',
      fees: 'Contact Admissions',
      intake: null,
      exam: 'CAT / GMAT / XAT',
      note: "India's only 1-year PGPM-HR. 500+ alumni in 200+ organizations globally.",
    },
    {
      name: 'PGDM (SSOBD)',
      duration: '2 years',
      fees: 'Contact Admissions',
      intake: null,
      exam: 'CAT / GMAT / XAT',
      note: 'AICTE approved. Business + Design Thinking + Liberal Arts. Fresher-friendly at Manesar.',
    },
  ],

  rankings: [
    { source: 'NIRF', rank: 'Not Listed', note: 'Not in NIRF management rankings' },
    { source: 'Industry Consortium', rank: '30+ Partners', note: 'ABB, Aditya Birla, Mahindra, Tata, Hero' },
    { source: 'Global Partners', rank: '7 Universities', note: 'Polimi, IESE, Shizenkan, Royal Roads, FGV' },
  ],

  campus: {
    area: 'TBD',
    dorms: null,
    dorm_capacity: null,
    architect: 'Modern residential campus in Gurugram NCR',
    heritage: 'Founded 2009; co-created by 30+ industry leaders under Anil Sachdev',
    clubs: null,
    highlights: [
      "Gurugram NCR — India's corporate capital at your doorstep",
      'Industry consortium of 30+ companies co-designed the curriculum',
      'Two campuses: Gurugram (PGPM / PGPM-HR) and Manesar (PGDM / SSOBD)',
      'International exchange: IESE Business School (Spain), Shizenkan (Japan), FGV (Brazil)',
      'Global academic partners: Polimi (Italy), Royal Roads (Canada), Johannesburg B-School (SA)',
      'Leadership + character development baked into every program',
      'Fully residential — all programs run on immersive live-in format',
    ],
  },

  alumni: [
    { name: "Karen D'Souza", batch: null, role: 'VP HR, Goldman Sachs' },
    { name: 'Sreya Raghavan', batch: null, role: 'VP HR, Morgan Stanley' },
    { name: 'Sundaram Vasudevan', batch: null, role: 'VP HR, JP Morgan Chase' },
    { name: 'Arpit Bhatia', batch: null, role: 'Associate Director, KPMG' },
  ],

  verdict: {
    best_for: [
      'Working professionals (2+ yrs) targeting a fast, high-ROI 1-year MBA in NCR',
      'HR aspirants — PGPM-HR is India\'s only dedicated 1-year HR management program',
      'Students who want industry-immersive learning built with real company inputs',
      'Finance and consulting roles — BCG, Deloitte, S&P, Gartner all recruit regularly',
    ],
    watch_out: [
      'No NIRF ranking — harder to compare against IIMs on a standard benchmark',
      'Fees not publicly listed — requires direct admissions office contact',
      'Smaller batch and brand recognition compared to top-10 B-schools',
    ],
    apply_if: 'You have 2+ years of work experience, want a values-driven leadership education in NCR, and are targeting consulting, BFSI, or HR roles with a strong ROI.',
    skip_if: "You are a fresher targeting IIM-equivalent brand prestige, or need AACSB / EQUIS accreditation for a global corporate career.",
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
        text: 'Gurugram location is a massive advantage — companies are literally next door and that shows in the quality of internships and placements.',
        source: 'PGDM Student, 2025',
      },
    ],
  },
}

export default college
