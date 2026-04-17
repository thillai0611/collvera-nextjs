const placements = {
  year: 2025,
  rate: 100,
  companies: 89,
  ppo: 83,
  ppo_pct: 16.70,

  // MBA General 2024-25 (official prospectus)
  avg: 13.99,
  highest: 32.77,
  top50: 19.16,
  top100: 17.65,
  top150: 16.72,
  top200: 16.02,

  // Backward-compat fields
  avg_pgpm: 13.99,
  avg_pgdm: null,
  highest_pgpm: 32.77,
  highest_pgdm: null,
  top10_pgpm: null,
  top10_pgdm: null,
  top25_pgpm: null,
  top25_pgdm: null,
  top50_pgpm: 19.16,
  top50_pgdm: null,

  // Programme-wise 2025 (official)
  programme_wise: [
    { name: 'MBA (General)',  highest: 32.77, avg: 13.99, rate: 100 },
    { name: 'MBA-BKFS',      highest: 26.25, avg: 14.73, rate: 100 },
    { name: 'MBA-Marketing', highest: 19.59, avg: 13.72, rate: 100 },
    { name: 'MBA-HRM',       highest: 19.59, avg: 12.86, rate: 100 },
    { name: 'MBA-IB',        highest: 16.00, avg: 11.74, rate: 100 },
  ],

  // Salary ladder (official prospectus table)
  salary_ladder: [
    { label: 'Top 50',  value_2024: 20.64, value_2025: 19.16 },
    { label: 'Top 100', value_2024: 18.45, value_2025: 17.65 },
    { label: 'Top 150', value_2024: 17.25, value_2025: 16.72 },
    { label: 'Top 200', value_2024: 16.37, value_2025: 16.02 },
  ],

  // Sectors (official prospectus + Shiksha)
  sectors: [
    { name: 'BFSI',           pct: 38, color: '#8B1A1A' },
    { name: 'Consulting',     pct: 22, color: '#d95f02' },
    { name: 'IT & Analytics', pct: 17, color: '#185fa5' },
    { name: 'FMCG & Retail',  pct: 8,  color: '#2e7d32' },
    { name: 'Others',         pct: 15, color: '#8A8070' },
  ],

  // PPO trend (official prospectus)
  ppo_trend: [
    { year: '2022-23', ppos: 136, pct: 28,    highest_stipend: 1.25 },
    { year: '2023-24', ppos: 112, pct: 22,    highest_stipend: 1.50 },
    { year: '2024-25', ppos: 83,  pct: 16.70, highest_stipend: 2.00 },
  ],

  // Highest CTC trend
  highest_trend: [
    { year: '2023-24', value: 32.02 },
    { year: '2024-25', value: 32.77 },
  ],

  // Recruiters (official prospectus + Shiksha)
  recruiters: [
    { name: 'Deloitte',          type: 'Consulting' },
    { name: 'KPMG',              type: 'Consulting' },
    { name: 'EY',                type: 'Consulting' },
    { name: 'PwC',               type: 'Consulting' },
    { name: 'Accenture',         type: 'Consulting' },
    { name: 'TresVista',         type: 'Consulting' },
    { name: 'ValueLabs',         type: 'Consulting' },
    { name: 'Bain Capability Network', type: 'Consulting' },
    { name: 'JP Morgan Chase',   type: 'BFSI' },
    { name: 'HSBC',              type: 'BFSI' },
    { name: 'Citi Corp',         type: 'BFSI' },
    { name: 'HDFC Bank',         type: 'BFSI' },
    { name: 'ICICI Bank',        type: 'BFSI' },
    { name: 'JAMI',              type: 'BFSI' },
    { name: 'ITC',               type: 'FMCG' },
    { name: 'Britannia',         type: 'FMCG' },
    { name: 'Diageo',            type: 'FMCG' },
    { name: 'AB InBev',          type: 'FMCG' },
    { name: 'WCCLG',             type: 'FMCG' },
    { name: 'Godrej',            type: 'FMCG' },
    { name: 'Titan',             type: 'FMCG' },
    { name: 'Amul',              type: 'FMCG' },
    { name: 'IBM',               type: 'Technology' },
    { name: 'Infosys',           type: 'Technology' },
    { name: 'Wipro',             type: 'Technology' },
    { name: 'Adani',             type: 'Conglomerate' },
    { name: 'Berger Paints',     type: 'Manufacturing' },
    { name: 'Qualcomm',          type: 'Technology' },
    { name: 'Magicbricks',       type: 'Real Estate' },
    { name: 'Jockey India',      type: 'Retail' },
  ],

  // Key profiles
  profiles: [
    'Financial Operations Analyst', 'Credit Manager', 'Area Business Manager',
    'Area Sales Manager', 'CFO Associate', 'Pre-sales Consultant',
    'Finance & Accounts Manager', 'Manufacturing Analyst', 'Marketing Specialist',
    'Commercial Banking Credit Risk', 'Investment Banking Analyst',
    'Business Consultant', 'HR Manager', 'Risk Advisory',
  ],

  content: `<h2>TAPMI Manipal Placements 2025 — Full Report: MBA, BKFS, Marketing, HRM, IB</h2>

<p>T. A. Pai Management Institute (TAPMI), Manipal achieved 100% placements for all MBA programmes in 2024-25. The MBA General programme recorded a highest package of <strong>₹32.77 LPA</strong> (up from ₹32.02 LPA in 2023-24) with an average of <strong>₹13.99 LPA</strong>. 89 companies participated in the final placement season and 340 students were placed. 83 Pre-Placement Offers (PPOs) were converted — representing 16.70% of the batch — with the highest PPO stipend reaching ₹2 Lakhs per month.</p>

<h3>Programme-wise Placement Highlights 2025</h3>

<p>TAPMI's MBA-BKFS programme delivered the strongest average at <strong>₹14.73 LPA</strong> with a highest of ₹26.25 LPA — making it one of the best finance-specialised MBA programmes in India outside the IIMs, particularly for BFSI roles in investment banking, commercial banking, and financial analytics. MBA-Marketing and MBA-HRM both achieved a highest of ₹19.59 LPA with averages of ₹13.72 LPA and ₹12.86 LPA respectively. MBA-IB had the weakest placement profile at ₹11.74 LPA average and ₹16 LPA highest — a data point worth factoring in if international business is your primary motivation. The MBA General programme continues to attract the widest recruiter network and delivered the highest absolute package at ₹32.77 LPA.</p>

<h3>Salary Ladder 2024-25 (Official)</h3>

<p>The official salary distribution from the TAPMI Prospectus 2026-28 shows the Top 50 students averaging ₹19.16 LPA, Top 100 averaging ₹17.65 LPA, Top 150 averaging ₹16.72 LPA, and Top 200 averaging ₹16.02 LPA. Compared to 2023-24 (Top 50: ₹20.64 LPA, Top 100: ₹18.45 LPA), the 2024-25 numbers show a slight decline across all bands — a reflection of broader market conditions in the consulting and BFSI sectors rather than a structural issue with TAPMI's placement network.</p>

<h3>Sectors and Recruiter Profile</h3>

<p><strong>BFSI dominates at 38-39%</strong> of all placements with an average package of ₹14.24 LPA from the sector — the highest average across all sectors. Consulting accounts for 22%, IT & Analytics for 17-18%, FMCG & Retail for 8%, and Others for the remaining 15%. This makes TAPMI one of the most BFSI-concentrated MBA programmes outside the IIMs, a direct result of the Bloomberg Lab infrastructure, the MBA-BKFS programme's industry integration, and the SBI/BSE training embedded in the curriculum.</p>

<p>Top recruiters include Deloitte, KPMG, EY, PwC, Accenture, JP Morgan Chase, HSBC, Citi Corp, HDFC Bank, ICICI Bank, ITC, Britannia, Diageo, AB InBev, WCCLG (Woodlands Multispeciality Hospital), Godrej, Titan, IBM, Infosys, TresVista, ValueLabs, Bain Capability Network, Adani, Qualcomm, Berger Paints, Magicbricks, and Jockey India. The presence of Bain Capability Network in the TAPMI recruiter ecosystem is significant — it is a rare occurrence for a Tier-2 B-school and represents a meaningful upgrade in the consulting pipeline.</p>

<h3>PPO Trend — A Declining Story Worth Watching</h3>

<p>The PPO numbers have shown a consistent decline: 136 PPOs in 2022-23 (28% of batch), 112 in 2023-24 (22%), and 83 in 2024-25 (16.70%). However, the highest PPO stipend has been rising — from ₹1.25L/month in 2022-23 to ₹2L/month in 2024-25 — indicating that fewer but higher-quality PPOs are being converted. The gender split of PPOs in 2024-25 is notable: female students received 46 PPOs vs 37 for male students — a strong signal of the quality of female candidates at TAPMI and the emphasis on gender diversity in the BFSI and consulting sectors that recruit from here.</p>

<h3>TAPMI vs Peers: Where It Stands</h3>

<p>Against direct peers like FORE School of Management (avg ₹12-13 LPA), IMT Ghaziabad (avg ₹14-15 LPA), and XIMB (avg ₹13-14 LPA), TAPMI's numbers are broadly comparable — but TAPMI's BKFS programme stands out with its highest of ₹26.25 LPA in 2025 as a clear differentiator for finance-focused candidates. The ₹32.77 LPA highest in the General programme is among the top 10 highest packages for any MBA programme outside the top IIMs in India. Where TAPMI loses is average package vs total cost — at ₹19.5L tuition + hostel for ₹13.99 LPA average, the ROI is tight for the bottom half of the batch. The top quartile, however, earns ₹17+ LPA — making the investment worthwhile for high performers.</p>`,
}

export default placements
