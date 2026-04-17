const placements = {
  // === PGPM 2025 ===
  pgpm: {
    label: 'PGPM',
    duration: '1 Year',
    year: 2025,
    avg: 17.80,
    top10_avg: 28.60,
    highest: 30.80,
    functions: [
      { name: 'Consulting',                       pct: 61, color: '#0057A8' },
      { name: 'Product Management',               pct: 12, color: '#185fa5' },
      { name: 'Sales / Marketing / BD',           pct: 10, color: '#d95f02' },
      { name: 'Operations / SCM / Logistics',     pct: 7,  color: '#7b1fa2' },
      { name: 'Business Analytics & Data Science',pct: 7,  color: '#2e7d32' },
      { name: 'General Management',               pct: 2,  color: '#8A8070' },
      { name: 'Finance / Fintech / Finops',       pct: 1,  color: '#c62828' },
    ],
    profiles: ['Product Manager', 'Marketing Manager', 'Retail Logistician', 'Decision Analytics Consultant', 'Business Research Consultant', 'Business Value Architect', 'Recruitment Consultant', 'Pricing Analyst', 'Pursuit Manager'],
    recruiters: [
      { name: 'Accenture Strategy & Consulting', type: 'Consulting' },
      { name: 'Accenture ATCI',     type: 'Consulting' },
      { name: 'Accenture AIOC',     type: 'Consulting' },
      { name: 'Accenture OPS',      type: 'Consulting' },
      { name: 'Accenture TFO',      type: 'Consulting' },
      { name: 'Deloitte India',     type: 'Consulting' },
      { name: 'Deloitte USI',       type: 'Consulting' },
      { name: 'KPMG',               type: 'Consulting' },
      { name: 'ZS Associates',      type: 'Consulting' },
      { name: 'Infosys Consulting', type: 'Consulting' },
      { name: 'Infosys EQS',        type: 'Consulting' },
      { name: 'IBM',                type: 'Technology' },
      { name: 'HCL',                type: 'Technology' },
      { name: 'LTIMindtree',        type: 'Technology' },
      { name: 'Cognizant',          type: 'Technology' },
      { name: 'Tiger Analytics',    type: 'Analytics' },
      { name: 'Incedo',             type: 'Analytics' },
      { name: 'Kantar',             type: 'Analytics' },
      { name: 'Swiggy',             type: 'Technology' },
      { name: 'Target',             type: 'Retail' },
      { name: 'FedEx',              type: 'Logistics' },
      { name: 'ADP',                type: 'HR Tech' },
      { name: 'WNS',                type: 'BPO / Analytics' },
      { name: 'PreferredSquare',    type: 'HR Tech' },
    ],
  },

  // === PGDM 2025 ===
  pgdm: {
    year: 2025,
    avg: 15.00,
    top10_avg: 23.30,
    highest: 39.30,
    functions: [
      { name: 'Finance',          pct: 33, color: '#0057A8' },
      { name: 'Sales & Marketing',pct: 32, color: '#d95f02' },
      { name: 'Tech Consulting',  pct: 12, color: '#185fa5' },
      { name: 'Operations',       pct: 11, color: '#7b1fa2' },
      { name: 'Analytics',        pct: 7,  color: '#2e7d32' },
      { name: 'Others',           pct: 5,  color: '#8A8070' },
    ],
    profiles: ['Product Manager', 'Project Manager', 'Business Analyst', 'Knowledge Analyst', 'Financial Analyst', 'Process Control Analyst', 'Consultant', 'Marketing MT', 'Customer Success Manager', 'Supply Chain Consultant'],
    recruiters: [
      { name: 'JP Morgan Chase',          type: 'BFSI' },
      { name: 'BNY Mellon',               type: 'BFSI' },
      { name: 'MasterCard',               type: 'BFSI' },
      { name: 'Wells Fargo',              type: 'BFSI' },
      { name: 'Standard Chartered',       type: 'BFSI' },
      { name: 'ICICI Bank',               type: 'BFSI' },
      { name: 'Axis Bank',                type: 'BFSI' },
      { name: 'Federal Bank',             type: 'BFSI' },
      { name: 'IDBI Bank',                type: 'BFSI' },
      { name: 'HDFC Life',                type: 'BFSI' },
      { name: 'PayPal',                   type: 'BFSI' },
      { name: 'Deloitte India & USI',     type: 'Consulting' },
      { name: 'EY India',                 type: 'Consulting' },
      { name: 'PWC',                      type: 'Consulting' },
      { name: 'CRISIL Ltd.',              type: 'Analytics' },
      { name: 'Gartner',                  type: 'Analytics' },
      { name: 'Accenture ATCI',           type: 'Consulting' },
      { name: 'HCL Technologies',         type: 'Technology' },
      { name: 'Infosys',                  type: 'Technology' },
      { name: 'LTI Mindtree',             type: 'Technology' },
      { name: 'IBM',                      type: 'Technology' },
      { name: 'Cisco',                    type: 'Technology' },
      { name: 'Amazon',                   type: 'Technology' },
      { name: 'Tata Advanced System',     type: 'Technology' },
      { name: 'ITC',                      type: 'FMCG' },
      { name: 'Nestlé',                   type: 'FMCG' },
      { name: 'Himalaya Wellness',        type: 'FMCG' },
      { name: 'Godrej',                   type: 'FMCG' },
      { name: 'Adani Wilmar',             type: 'FMCG' },
      { name: 'Decathlon',                type: 'Retail' },
      { name: 'Airtel',                   type: 'Telecom' },
      { name: 'Mahindra & Mahindra',      type: 'Auto / Mfg' },
      { name: 'Birla Precision Technology',type: 'Manufacturing' },
    ],
  },

  // For backward compat with CollegeDetailClient structured UI
  year: 2025,
  avg_pgpm: 17.80,
  avg_pgdm: 15.00,
  highest_pgpm: 30.80,
  highest_pgdm: 39.30,
  top10_pgpm: 28.60,
  top10_pgdm: 23.30,
  ppo: 63,
  rate: 95,
  companies: 80,

  sectors: [
    { name: 'Consulting & Analytics (PGPM)', pct: 61, color: '#0057A8' },
    { name: 'Finance (PGDM)',                pct: 33, color: '#185fa5' },
    { name: 'Sales & Marketing (PGDM)',      pct: 32, color: '#d95f02' },
    { name: 'Product Management (PGPM)',     pct: 12, color: '#7b1fa2' },
  ],

  recruiters: [
    { name: 'JP Morgan Chase',    type: 'BFSI' },
    { name: 'BNY Mellon',         type: 'BFSI' },
    { name: 'MasterCard',         type: 'BFSI' },
    { name: 'Wells Fargo',        type: 'BFSI' },
    { name: 'Deloitte',           type: 'Consulting' },
    { name: 'ZS Associates',      type: 'Consulting' },
    { name: 'EY India',           type: 'Consulting' },
    { name: 'Tiger Analytics',    type: 'Analytics' },
    { name: 'Gartner',            type: 'Analytics' },
    { name: 'Incedo',             type: 'Analytics' },
    { name: 'Amazon',             type: 'Technology' },
    { name: 'IBM',                type: 'Technology' },
    { name: 'LTIMindtree',        type: 'Technology' },
    { name: 'ITC',                type: 'FMCG' },
    { name: 'Nestlé',             type: 'FMCG' },
    { name: 'Swiggy',             type: 'Technology' },
  ],

  content: `<h2>Great Lakes Chennai Placements 2025 — PGPM and PGDM Full Report</h2>

<p>Great Lakes Institute of Management, Chennai published its 2025 placement reports for both the PGPM and PGDM batches. The headline numbers: PGPM average of <strong>₹17.80 LPA</strong> (highest domestic ₹30.80 LPA, top-10% average ₹28.60 LPA) and PGDM average of <strong>₹15 LPA</strong> (highest domestic ₹39.30 LPA, top-10% average ₹23.30 LPA). Over 95% of students were placed, with 63 PPOs converted from summer internships and 80+ companies participating.</p>

<h3>PGPM Placements 2025 — Full Breakdown</h3>

<p>The PGPM batch recorded an average CTC of <strong>₹17.80 LPA</strong>, with the top 10% of students averaging <strong>₹28.60 LPA</strong> and a highest domestic offer of <strong>₹30.80 LPA</strong>. The function-wise split is striking: Consulting dominates at 61% of all PGPM roles — a reflection of GLIM Chennai's PGPM being heavily optimised for the management consulting and analytics consulting ecosystem. Product Management comes in second at 12%, followed by Sales and Marketing at 10%. Operations and SCM together account for 7%, Business Analytics and Data Science at 7%, and Finance and Fintech at just 1%.</p>

<p>The PGPM recruiter list is primarily consulting and analytics-heavy: the Accenture group (Strategy, ATCI, AIOC, OPS, TFO) collectively makes the largest number of PGPM offers. Deloitte India and Deloitte USI are consistent PGPM recruiters. ZS Associates, KPMG, Infosys Consulting, IBM, LTIMindtree, Tiger Analytics, Incedo, Kantar, WNS, FedEx, Swiggy, Target, ADP, and PreferredSquare are among the confirmed 2025 PGPM recruiters. The PGPM batch also sees meaningful product management recruitment from technology firms.</p>

<h3>PGDM Placements 2025 — Full Breakdown</h3>

<p>The PGDM batch of 368 students recorded an average CTC of <strong>₹15 LPA</strong>, with the top 10% averaging <strong>₹23.30 LPA</strong> and a highest domestic offer of <strong>₹39.30 LPA</strong>. The function-wise split for PGDM is quite different from PGPM: Finance leads at 33%, Sales and Marketing at 32%, Tech Consulting at 12%, Operations at 11%, and Analytics at 7%. This reflects the broader, more diverse career paths of the 2-year PGDM cohort — which includes 66% freshers and students from ITES, BFSI, and manufacturing backgrounds.</p>

<p>The PGDM recruiter list is more diverse than PGPM. BFSI heavyweights include JP Morgan Chase, BNY Mellon, MasterCard, Wells Fargo, Standard Chartered, ICICI Bank, Axis Bank, Federal Bank, IDBI Bank, HDFC Life, and PayPal. Consulting firms include Deloitte India and USI, EY India, and PWC. Analytics firms include CRISIL and Gartner. Technology companies include HCL, Infosys, LTI Mindtree, Cisco, Amazon, IBM, and Tata Advanced System. FMCG and consumer brands include ITC, Nestlé, Himalaya Wellness, Godrej, and Adani Wilmar. The PGDM's Finance and Sales roles from BFSI and FMCG companies are the defining characteristic of this batch's placement profile.</p>

<h3>PGPM vs PGDM — Which Programme Has Better Placements?</h3>

<p>A direct comparison reveals important differences. The PGPM delivers a higher average (₹17.80 vs ₹15 LPA) and a significantly higher top-10% average (₹28.60 vs ₹23.30 LPA). However, the PGDM produces the highest domestic offer at ₹39.30 LPA vs PGPM's ₹30.80 LPA — suggesting some PGDM students in BFSI and technology roles reach exceptional outcome levels. The PGPM is dominated by consulting (61%) while the PGDM is more balanced across Finance, Sales, and Operations. For a student targeting management consulting or analytics consulting, the PGPM is the stronger pathway. For a student open to finance, FMCG, or sales roles and coming as a fresher, the PGDM provides better diversity of outcomes.</p>

<h3>Pre-Placement Offers</h3>

<p>63 PPOs were converted in 2025, representing approximately 20–25% of the eligible batch receiving offers directly from their summer internship companies. PPO-issuing companies are concentrated in consulting (Accenture, Deloitte) and analytics (Tiger Analytics, Incedo) for the PGPM batch, and in BFSI and FMCG for the PGDM batch. Students who perform well in their summer internship can bypass the formal placement season entirely — a significant advantage given the competitive nature of campus placements.</p>`,
}

export default placements
