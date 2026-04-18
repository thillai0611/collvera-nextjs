const placements = {
  year: 2025,
  rate: 100,
  companies: 160,
  ppo: null,
  ppo_pct: 25,

  // Official stats as of March 2026
  avg: 18.15,
  highest: 35.00,
  highest_intl: 46.17,
  median: 17.00,

  // Interim 2026 report (till Dec 31, 2025)
  interim_2026: {
    avg: 18.89,
    highest: 35.00,
    median: 17.56,
  },

  // pgpm/pgdm null — triggers single mode
  pgpm: null,
  pgdm: null,

  // Programme-wise (official — single PGDM with specialisations)
  programme_wise: [
    { name: 'PGDM (General)',              avg: 18.15, highest: 35.00 },
    { name: 'PGDM — Financial Management', avg: 15.30, highest: 28.00 },
    { name: 'PGDM — Marketing',            avg: 17.00, highest: 35.00 },
    { name: 'PGDM — BFS',                  avg: 15.00, highest: 25.00 },
  ],

  // Salary ladder
  salary_ladder: [
    { label: 'Average',  value: 18.15 },
    { label: 'Median',   value: 17.00 },
    { label: 'Highest (Domestic)', value: 35.00 },
    { label: 'Highest (Intl)',     value: 46.17 },
  ],

  // Sectors — BFSI is top at 17% (3-year average, official)
  sectors: [
    { name: 'BFSI',           pct: 28, color: '#1B4F8A' },
    { name: 'Consulting',     pct: 22, color: '#d95f02' },
    { name: 'IT / ITeS',      pct: 18, color: '#185fa5' },
    { name: 'FMCG / CD',      pct: 15, color: '#2e7d32' },
    { name: 'Manufacturing',  pct: 10, color: '#7b1fa2' },
    { name: 'Others',         pct: 7,  color: '#8A8070' },
  ],

  // Summer internship 2025-27
  internship: {
    year: '2025-27',
    companies: 110,
    highest_stipend: 225000,
    avg_stipend: 60000,
    median_stipend: 58000,
  },

  // Recruiters
  recruiters: [
    { name: 'Goldman Sachs',      type: 'BFSI' },
    { name: 'D.E. Shaw',          type: 'BFSI' },
    { name: 'BlackRock',          type: 'BFSI' },
    { name: 'JP Morgan Chase',    type: 'BFSI' },
    { name: 'HSBC',               type: 'BFSI' },
    { name: 'Arcesium',           type: 'BFSI' },
    { name: 'BNY Mellon',         type: 'BFSI' },
    { name: 'HDFC Bank',          type: 'BFSI' },
    { name: 'ICICI Bank',         type: 'BFSI' },
    { name: 'American Express',   type: 'BFSI' },
    { name: 'Deloitte',           type: 'Consulting' },
    { name: 'EXL',                type: 'Consulting' },
    { name: 'Accenture',          type: 'Consulting' },
    { name: 'Renoir Consulting',  type: 'Consulting' },
    { name: 'Amazon',             type: 'Technology' },
    { name: 'Microsoft',          type: 'Technology' },
    { name: 'Google',             type: 'Technology' },
    { name: 'Flipkart',           type: 'Technology' },
    { name: 'Adobe',              type: 'Technology' },
    { name: 'Infosys',            type: 'Technology' },
    { name: 'Wipro',              type: 'Technology' },
    { name: 'Cisco',              type: 'Technology' },
    { name: 'Dell Technologies',  type: 'Technology' },
    { name: 'HUL',                type: 'FMCG' },
    { name: 'ITC',                type: 'FMCG' },
    { name: 'Marico',             type: 'FMCG' },
    { name: 'Godrej',             type: 'FMCG' },
    { name: 'Dabur',              type: 'FMCG' },
    { name: 'L&T',                type: 'Manufacturing' },
    { name: 'Mahindra & Mahindra',type: 'Manufacturing' },
    { name: 'Havells',            type: 'Manufacturing' },
    { name: 'Gartner',            type: 'Analytics' },
    { name: 'ByteDance',          type: 'Technology' },
    { name: 'Myntra',             type: 'Technology' },
  ],

  content: `<h2>IMT Ghaziabad Placements 2025 — Full Report</h2>

<p>IMT Ghaziabad's official placement report (as of March 2026) for the PGDM batch of 2023-25 shows an average CTC of <strong>₹18.15 LPA</strong>, median of <strong>₹17 LPA</strong>, and a highest domestic CTC of <strong>₹35 LPA</strong>. The highest international offer stood at ₹46.17 LPA. Over 160 companies participated in the placement season, with 25% of eligible students receiving Pre-Placement Offers from their summer internship companies.</p>

<p>The interim placement report for the 2024-26 batch (updated till December 31, 2025) shows further improvement: average of ₹18.89 LPA and median of ₹17.56 LPA with the highest package at ₹35 LPA. More than 110 companies visited campus in the interim season, of which 25 were new recruiters.</p>

<h3>Sector Breakdown</h3>

<p>BFSI has emerged as the top recruiting sector at IMT Ghaziabad over the past 3 years, accounting for approximately 28% of placements. This is driven by the PGDM Financial Management and PGDM BFS programmes which attract Goldman Sachs, D.E. Shaw, BlackRock, Arcesium, BNY Mellon, and JP Morgan Chase. Consulting accounts for approximately 22% of placements (Deloitte, Accenture, EXL). IT/ITeS at 18% includes Amazon, Microsoft, Google, Flipkart, Adobe, Infosys, Wipro, Cisco, and Dell Technologies. FMCG at 15% is driven by HUL, ITC, Marico, Godrej, and Dabur — IMT's Delhi NCR location and Marketing programme make it a strong FMCG campus.</p>

<h3>Summer Internships</h3>

<p>The PGDM batch of 2025-27 secured internships with 110+ companies. The highest monthly stipend was ₹2.25 Lakhs, average ₹60,000, and median ₹58,000. Notable internship companies include Goldman Sachs, GSK, Mahindra & Mahindra, Abbott, Bajaj, Wipro, Godrej, HCL, Cisco, and Tata Consumer Products.</p>

<h3>Large Batch — The Key Risk</h3>

<p>IMT Ghaziabad's batch size of 480-600 students is among the largest of any ranked Indian B-school. Multiple student reviews consistently cite this as the primary concern: competition for top company slots is intense, and students who are not in the top 20% of the batch may miss out on the most sought-after recruiters. The average of ₹18.15 LPA is strong, but students in the bottom quartile report outcomes of ₹9-12 LPA. If you are confident of being in the top half of the batch — strong academics, clear sector focus, 93%+ percentile — IMT Ghaziabad's Delhi NCR location and recruiter network are hard to beat at this fee level.</p>`,
}

export default placements
