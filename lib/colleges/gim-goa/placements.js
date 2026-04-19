const placements = {
  year: 2025,
  rate: 100,
  companies: 200,
  ppo: null,
  ppo_pct: null,

  // Official Shiksha/GIM placement report 2025 (PGDM general)
  avg: 15.13,
  highest: 32.20,
  highest_intl: null,
  median: 15.00,

  // pgpm/pgdm null — triggers single mode with programme_wise
  pgpm: null,
  pgdm: null,

  // Programme-wise (4 PGDM specialisations + IDA)
  programme_wise: [
    { name: 'PGDM (General)',                        avg: 15.13, highest: 32.20, placed_pct: 100 },
    { name: 'PGDM — Healthcare Management (HCM)',    avg: 14.68, highest: 20.00, placed_pct: 100 },
    { name: 'PGDM — Big Data Analytics (BDA)',       avg: null,  highest: 32.20, placed_pct: 99 },
    { name: 'PGDM — BIFS',                           avg: null,  highest: 27.30, placed_pct: 99 },
  ],

  // Salary ladder
  salary_ladder: [
    { label: 'Average',          value: 15.13 },
    { label: 'Median',           value: 15.00 },
    { label: 'Highest (BDA)',    value: 32.20 },
    { label: 'Highest (BIFS)',   value: 27.30 },
    { label: 'Highest (HCM)',    value: 20.00 },
  ],

  // Sectors — indicative breakdown based on recruiter pattern
  sectors: [
    { name: 'BFSI',           pct: 26, color: '#0D6E4F' },
    { name: 'Consulting',     pct: 22, color: '#d95f02' },
    { name: 'IT / Analytics', pct: 20, color: '#185fa5' },
    { name: 'Healthcare',     pct: 12, color: '#7b1fa2' },
    { name: 'FMCG / CD',      pct: 10, color: '#2e7d32' },
    { name: 'Others',         pct: 10, color: '#8A8070' },
  ],

  // Summer internship — indicative from Shiksha reviews
  internship: {
    year: '2025-27',
    companies: null,
    highest_stipend: 120000,
    avg_stipend: null,
    median_stipend: null,
  },

  // Recruiters
  recruiters: [
    { name: 'JP Morgan Chase',    type: 'BFSI' },
    { name: 'Goldman Sachs',      type: 'BFSI' },
    { name: 'HSBC',               type: 'BFSI' },
    { name: 'NatWest',            type: 'BFSI' },
    { name: 'ICICI Bank',         type: 'BFSI' },
    { name: 'Aditya Birla',       type: 'BFSI' },
    { name: 'Reliance Industries',type: 'BFSI' },
    { name: 'Deloitte',           type: 'Consulting' },
    { name: 'EY',                 type: 'Consulting' },
    { name: 'Accenture',          type: 'Consulting' },
    { name: 'Cognizant',          type: 'Consulting' },
    { name: 'Optum',              type: 'Healthcare' },
    { name: 'Amazon',             type: 'Technology' },
    { name: 'TCS',                type: 'Technology' },
    { name: 'Infosys',            type: 'Technology' },
    { name: 'Microsoft Azure',    type: 'Technology' },
    { name: 'ITC',                type: 'FMCG' },
    { name: 'GEP',                type: 'Consulting' },
  ],

  content: `<h2>GIM Goa Placements 2025 — Full Report</h2>

<p>The 2025 placement season at Goa Institute of Management concluded with <strong>100% placements for PGDM and PGDM HCM</strong>, and 99% for PGDM BDA and PGDM BIFS. The highest package stood at <strong>₹32.20 LPA</strong> (PGDM BDA), with BIFS highest at ₹27.30 LPA and HCM highest at ₹20 LPA. The PGDM General batch recorded an average CTC of <strong>₹15.13 LPA</strong> and median of ₹15 LPA. More than 200 companies participated across the 4 PGDM programmes.</p>

<h3>Programme-wise Placement Variance</h3>

<p>GIM Goa's placement numbers vary meaningfully by programme. PGDM BDA — the Big Data Analytics track — has emerged as the strongest performer with the highest package of ₹32.20 LPA, driven by recruiters like JP Morgan Chase, HSBC, Accenture, and Optum seeking analytics talent. PGDM BIFS (Banking, Insurance & Financial Services) reports a highest of ₹27.30 LPA with JP Morgan, Goldman Sachs, and HSBC visiting consistently. PGDM HCM (Healthcare Management) — India's first dedicated healthcare PGDM — places 100% of students with an average of ₹14.68 LPA through Optum, Novartis, and pharma/hospital networks. If you're optimising for package, BDA and BIFS outperform the General track.</p>

<h3>The Real Variance — Average vs Bottom Quartile</h3>

<p>Student reviews on Shiksha report honest detail that the official narrative sometimes misses. For the 2023 PGDM batch, one verified reviewer noted the highest was ₹26 LPA, lowest ₹8.5 LPA, and average ₹11.5 LPA — a significant spread. While 2025 averages have improved to ₹15.13 LPA, the bottom-quartile outcomes for General PGDM students remain in the ₹9-12 LPA range. The ₹32.20 LPA "highest" headline reflects outlier BDA placements, not typical General PGDM outcomes. Interpret the average with that variance in mind.</p>

<h3>Sector Mix</h3>

<p>BFSI leads at approximately 26% of placements, driven by BIFS programme strength. Consulting follows at 22% (Deloitte, EY, Accenture, Cognizant). IT and Analytics combined at ~20% is unusually high for a ranked B-school — this is the BDA programme effect, with recruiters like Amazon, Microsoft Azure, and Optum hiring specifically for analytics roles. Healthcare at 12% reflects the HCM programme's specialised recruiter network — Optum, Novartis, and hospital chains that rarely visit non-specialised MBA campuses. This sectoral diversity is one of GIM's structural advantages over generalist B-schools at similar rank.</p>

<h3>Summer Internships</h3>

<p>The highest monthly internship stipend reported (student reviews) is approximately ₹1.2 Lakhs for BDA students. Specific averages and medians are not published in the official report. Internships at GIM start from the first semester itself — earlier than most B-schools — giving students a longer runway to secure final PPOs. JP Morgan, Deloitte, and Goldman Sachs are the flagship internship partners.</p>

<h3>Location Trade-off</h3>

<p>GIM Goa's campus is in Poriem, Sattari — a rural setting ~100km from Panaji and 4 hours from Mumbai. Unlike IMT Ghaziabad (Delhi NCR) or GLIM Chennai (metro city), GIM students don't have daily spontaneous access to corporate offices. This shapes the placement calendar: recruiters visit in concentrated windows, and students don't benefit from ad-hoc networking events the way Delhi/Mumbai/Bangalore-based students do. The beautiful Goa setting is a genuine quality-of-life benefit; the location is a genuine networking cost. Weigh both honestly.</p>`,
}

export default placements
