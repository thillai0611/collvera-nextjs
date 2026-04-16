const placements = {
  // ─── PGPM 2025 ────────────────────────────────────────────────
  pgpm: {
    year: 2025,
    avg: 17.80,
    top10_avg: 28.60,
    top25_avg: 24.00,
    top50_avg: 21.00,
    top75_avg: 19.20,
    highest: 30.80,
    salary_multiplier: 2.7,  // avg outgoing CTC = 2.7× avg incoming CTC

    functions: [
      { name: 'Consulting',                        pct: 61, color: '#0057A8' },
      { name: 'Product Management',                pct: 12, color: '#185fa5' },
      { name: 'Sales / Marketing / BD',            pct: 10, color: '#d95f02' },
      { name: 'Operations / SCM / Logistics',      pct: 7,  color: '#7b1fa2' },
      { name: 'Business Analytics & Data Science',  pct: 7,  color: '#2e7d32' },
      { name: 'General Management',                pct: 2,  color: '#8A8070' },
      { name: 'Finance / Fintech / Finops',        pct: 1,  color: '#c62828' },
    ],

    industries: [
      { name: 'Technology Consulting', pct: 36, color: '#0057A8' },
      { name: 'Business Consulting',   pct: 25, color: '#185fa5' },
      { name: 'IT / ITeS',             pct: 22, color: '#2e7d32' },
      { name: 'Financial Services',    pct: 3,  color: '#d95f02' },
      { name: 'Logistics',             pct: 3,  color: '#7b1fa2' },
      { name: 'Analytics',             pct: 2,  color: '#00838f' },
      { name: 'FinTech',               pct: 2,  color: '#c62828' },
      { name: 'FMCG & Retail',         pct: 2,  color: '#ef6c00' },
      { name: 'Others',                pct: 5,  color: '#8A8070', note: 'Manufacturing, Media, E-Commerce, Healthcare & Pharma, Market Research' },
    ],

    salary_bands: [
      { range: '10–13 LPA', pct: 8 },
      { range: '13–16 LPA', pct: 38 },
      { range: '16–19 LPA', pct: 23 },
      { range: '19–22 LPA', pct: 20 },
      { range: '22–25 LPA', pct: 4 },
      { range: '25+ LPA',   pct: 7 },
    ],

    profiles: [
      'Consultant', 'Assistant Manager - Marketing', 'Decision Science Practitioner',
      'Business Strategist', 'Innovation Consultant', 'Management Accountant',
      'Associate Product Owner', 'Presales & Marketing Specialist',
      'Business Architecture Team Lead', 'Data Consultant',
      'Assistant Manager – Customer Success', 'Advisory Services Analyst',
      'Senior Business Consultant', 'Product Manager', 'Retail Logistician',
      'Decision Analytics Consultant', 'Business Value Architect',
      'Recruitment Consultant', 'Pricing Analyst', 'Pursuit Manager',
    ],

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
      { name: 'Infosys EQS',        type: 'Technology' },
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

    top_recruiters: ['Accenture', 'Deloitte', 'Infosys Consulting'],
    new_recruiters: ['KPMG', 'IBM', 'Swiggy', 'Target', 'WNS Vuram'],
  },

  // ─── PGDM 2025 ────────────────────────────────────────────────
  pgdm: {
    year: 2025,
    batch_size: 368,
    avg: 15.00,
    top10_avg: 23.30,
    top25_avg: 19.90,
    top50_avg: 17.60,
    top75_avg: 16.10,
    highest: 39.30,

    functions: [
      { name: 'Finance',           pct: 33, color: '#0057A8' },
      { name: 'Sales & Marketing', pct: 32, color: '#d95f02' },
      { name: 'Tech Consulting',   pct: 12, color: '#185fa5' },
      { name: 'Operations',        pct: 11, color: '#7b1fa2' },
      { name: 'Analytics',         pct: 7,  color: '#2e7d32' },
      { name: 'Others',            pct: 5,  color: '#8A8070', note: 'Business & Strategy Consulting, Market Research, Product' },
    ],

    industries: [
      { name: 'BFSI / NBFC',         pct: 27, color: '#0057A8' },
      { name: 'IT / ITeS',           pct: 22, color: '#185fa5' },
      { name: 'Consulting',          pct: 16, color: '#2e7d32' },
      { name: 'Financial Services',  pct: 9,  color: '#d95f02' },
      { name: 'Investment Banking',  pct: 4,  color: '#7b1fa2' },
      { name: 'FMCG / Retail',       pct: 3,  color: '#ef6c00' },
      { name: 'Manufacturing',       pct: 3,  color: '#00838f' },
      { name: 'Others',              pct: 16, color: '#8A8070', note: 'Healthcare, E-Com, Telecom, FinTech, Analytics, Aerospace, HealthTech, Logistics, Automotive, Real Estate, Retail' },
    ],

    salary_bands: [
      { range: '9–12 LPA',  pct: 20 },
      { range: '12–15 LPA', pct: 38 },
      { range: '15–18 LPA', pct: 28 },
      { range: '18–21 LPA', pct: 8 },
      { range: '21+ LPA',   pct: 6 },
    ],

    profiles: [
      'Consultant', 'Key Account Manager', 'Credit Analyst',
      'Retail Logistician', 'Advisory Consultant', 'Customer Success Manager',
      'Finance Consultant', 'Product Development Manager', 'Product Manager',
      'Project Manager', 'Business Analyst', 'Knowledge Analyst',
      'Financial Analyst', 'Process Control Analyst', 'Marketing MT',
      'Supply Chain Consultant',
    ],

    recruiters: [
      { name: 'JP Morgan Chase',           type: 'BFSI' },
      { name: 'BNY Mellon',                type: 'BFSI' },
      { name: 'MasterCard',                type: 'BFSI' },
      { name: 'Wells Fargo',               type: 'BFSI' },
      { name: 'Standard Chartered',        type: 'BFSI' },
      { name: 'ICICI Bank',                type: 'BFSI' },
      { name: 'Axis Bank',                 type: 'BFSI' },
      { name: 'Federal Bank',              type: 'BFSI' },
      { name: 'IDBI Bank',                 type: 'BFSI' },
      { name: 'HDFC Life',                 type: 'BFSI' },
      { name: 'PayPal',                    type: 'BFSI' },
      { name: 'Deloitte India & USI',      type: 'Consulting' },
      { name: 'EY India',                  type: 'Consulting' },
      { name: 'PWC',                       type: 'Consulting' },
      { name: 'Accenture ATCI',            type: 'Consulting' },
      { name: 'CRISIL Ltd.',               type: 'Analytics' },
      { name: 'Gartner',                   type: 'Analytics' },
      { name: 'HCL Technologies',          type: 'Technology' },
      { name: 'Infosys',                   type: 'Technology' },
      { name: 'LTI Mindtree',              type: 'Technology' },
      { name: 'IBM',                       type: 'Technology' },
      { name: 'Cisco',                     type: 'Technology' },
      { name: 'Amazon',                    type: 'Technology' },
      { name: 'Tata Advanced System',      type: 'Technology' },
      { name: 'ITC',                       type: 'FMCG' },
      { name: 'Nestlé',                    type: 'FMCG' },
      { name: 'Himalaya Wellness',         type: 'FMCG' },
      { name: 'Godrej',                    type: 'FMCG' },
      { name: 'Adani Wilmar',              type: 'FMCG' },
      { name: 'Decathlon',                 type: 'Retail' },
      { name: 'Airtel',                    type: 'Telecom' },
      { name: 'Mahindra & Mahindra',       type: 'Auto / Mfg' },
      { name: 'Birla Precision Technology', type: 'Manufacturing' },
    ],

    top_recruiters: ['Deloitte', 'JP Morgan Chase', 'ICICI Bank', 'Infosys Consulting'],
    new_recruiters: ['Godrej', 'MasterCard', 'Federal Bank', 'L&T Finance', 'Adani Wilmar'],
  },

  // ─── PGDM SUMMER INTERNSHIP 2024-26 ──────────────────────────
  internship: {
    year: '2024-26',
    companies: 153,
    highest_stipend: 600000,
    avg_stipend: 99700,

    functions: [
      { name: 'Finance',                       pct: 41, color: '#0057A8' },
      { name: 'Sales & Marketing',              pct: 34, color: '#d95f02' },
      { name: 'Operations',                     pct: 11, color: '#7b1fa2' },
      { name: 'Analytics',                      pct: 5,  color: '#2e7d32' },
      { name: 'Business & Strategy Consulting', pct: 4,  color: '#185fa5' },
      { name: 'Market Research',                pct: 2,  color: '#00838f' },
      { name: 'Product',                        pct: 2,  color: '#ef6c00' },
      { name: 'HR',                             pct: 1,  color: '#8A8070' },
    ],

    industries: [
      { name: 'BFSI & NBFC',        pct: 14, color: '#0057A8' },
      { name: 'Investment Banking',  pct: 11, color: '#185fa5' },
      { name: 'Publishing & Media',  pct: 9,  color: '#d95f02' },
      { name: 'Technology',          pct: 8,  color: '#2e7d32' },
      { name: 'Consulting',          pct: 7,  color: '#7b1fa2' },
      { name: 'EdTech',              pct: 7,  color: '#00838f' },
      { name: 'FMCG & Retail',       pct: 7,  color: '#ef6c00' },
      { name: 'Healthcare & Pharma', pct: 7,  color: '#c62828' },
      { name: 'Manufacturing',       pct: 7,  color: '#4527a0' },
      { name: 'Financial Services',  pct: 6,  color: '#1565c0' },
      { name: 'Others',              pct: 17, color: '#8A8070', note: 'Power & Energy, Real Estate, Retail, Wealth Management, Construction, Aerospace, Insurance, Logistics, Market Research, Mining' },
    ],

    recruiters: [
      'Accenture Tech Strategy & Advisory', 'Adani Digital Labs', 'Amul',
      'Bain Capability Network', 'Bajaj Auto', 'Big Basket',
      'BNY Mellon', 'Dabur', 'Deloitte USI',
      'Ernst & Young', 'Federal Bank', 'Gartner',
      'Godrej Group', 'Havells India Ltd', 'HDFC',
      'Himalaya Wellness', 'Hindustan Coca Cola Beverages', 'HSBC Bank',
      'ICICI Bank', 'Indian Oil Corporation Ltd.', 'Infosys',
      'ITC', 'Jindal Steel and Power', 'JPMorgan Chase & Co',
      'KPMG', 'Lotte India', 'Nestlé',
      'Reliance Industries Limited', 'Shoppers Stop', 'Tata',
      'VE Commercial Vehicles', 'Wells Fargo', 'Zomato India',
    ],
  },

  // ─── BACKWARD-COMPAT (CollegeDetailClient structured UI) ──────
  year: 2025,
  avg_pgpm: 17.80,
  avg_pgdm: 15.00,
  highest_pgpm: 30.80,
  highest_pgdm: 39.30,
  top10_pgpm: 28.60,
  top10_pgdm: 23.30,
  top25_pgpm: 24.00,
  top25_pgdm: 19.90,
  top50_pgpm: 21.00,
  top50_pgdm: 17.60,
  top75_pgpm: 19.20,
  top75_pgdm: 16.10,
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
    { name: 'KPMG',               type: 'Consulting' },
    { name: 'Tiger Analytics',    type: 'Analytics' },
    { name: 'Gartner',            type: 'Analytics' },
    { name: 'Incedo',             type: 'Analytics' },
    { name: 'Amazon',             type: 'Technology' },
    { name: 'IBM',                type: 'Technology' },
    { name: 'LTIMindtree',        type: 'Technology' },
    { name: 'Cisco',              type: 'Technology' },
    { name: 'ITC',                type: 'FMCG' },
    { name: 'Nestlé',             type: 'FMCG' },
    { name: 'Godrej',             type: 'FMCG' },
    { name: 'Swiggy',             type: 'Technology' },
  ],

  // ─── FULL PLACEMENT CONTENT (HTML for section page) ───────────
  content: `<h2>Great Lakes Chennai Placements 2025 — PGPM and PGDM Full Report</h2>

<p>Great Lakes Institute of Management, Chennai published its 2025 placement reports for both the PGPM and PGDM batches. The headline numbers: PGPM average of <strong>₹17.80 LPA</strong> (highest domestic ₹30.80 LPA, top-10% average ₹28.60 LPA) and PGDM average of <strong>₹15 LPA</strong> (highest domestic ₹39.30 LPA, top-10% average ₹23.30 LPA). Over 95% of students were placed, with 63 PPOs converted from summer internships and 80+ companies participating across both batches.</p>

<h3>PGPM Placements 2025 — Full Breakdown</h3>

<p>The PGPM batch recorded an average CTC of <strong>₹17.80 LPA</strong>, with the top 10% averaging <strong>₹28.60 LPA</strong>, top 25% at <strong>₹24 LPA</strong>, top 50% at <strong>₹21 LPA</strong>, top 75% at <strong>₹19.20 LPA</strong>, and a highest domestic offer of <strong>₹30.80 LPA</strong> from a multinational consulting firm. The average outgoing CTC is <strong>2.7× the average incoming CTC</strong> — one of the strongest salary multipliers among 1-year MBA programmes in India.</p>

<p>The function-wise split is striking: <strong>Consulting dominates at 61%</strong> of all PGPM roles — a reflection of GLIM Chennai's PGPM being heavily optimised for the management consulting and analytics consulting ecosystem. Product Management comes in second at 12%, followed by Sales, Marketing and Business Development at 10%. Operations, SCM and Logistics together account for 7%, Business Analytics and Data Science at 7%, General Management at 2%, and Finance/Fintech/Finops at just 1%.</p>

<p>By industry, Technology Consulting accounts for <strong>36%</strong> of offers, Business Consulting for <strong>25%</strong>, and IT/ITeS for <strong>22%</strong>. Financial Services, Logistics, Analytics, FinTech, and FMCG & Retail make up the remaining 17%. This means <strong>83% of PGPM placements come from consulting and technology</strong> — making GLIM Chennai's PGPM one of the most consulting-concentrated 1-year MBA programmes in India.</p>

<h4>PGPM Salary Distribution</h4>

<p>The salary band distribution reveals a well-distributed cohort: 38% of PGPM students land in the ₹13–16 LPA range, 23% in ₹16–19 LPA, 20% in ₹19–22 LPA, 7% above ₹25 LPA, 4% in the ₹22–25 LPA band, and 8% in the ₹10–13 LPA range. This means <strong>54% of the PGPM batch earns ₹16 LPA or more</strong>, and over 31% earns ₹19 LPA or above — strong numbers for a 1-year programme costing ₹23.50 L all-in.</p>

<h4>PGPM Recruiters</h4>

<p>The PGPM recruiter list is primarily consulting and analytics-heavy: <strong>Accenture, Deloitte, and Infosys Consulting</strong> made the highest number of offers. The Accenture group (Strategy & Consulting, ATCI, AIOC, OPS, TFO) collectively makes the largest number of PGPM offers. Deloitte India and Deloitte USI are consistent PGPM recruiters. ZS Associates, KPMG, Infosys Consulting, IBM, LTIMindtree, Tiger Analytics, Incedo, Kantar, WNS, FedEx, Swiggy, Target, ADP, Cognizant, and PreferredSquare are among the confirmed 2025 PGPM recruiters. Over 25 new recruiters joined this year including <strong>KPMG, IBM, Swiggy, Target, and WNS Vuram</strong>.</p>

<h3>PGDM Placements 2025 — Full Breakdown</h3>

<p>The PGDM batch of 368 students recorded an average CTC of <strong>₹15 LPA</strong>, with the top 10% averaging <strong>₹23.30 LPA</strong>, top 25% at <strong>₹19.90 LPA</strong>, top 50% at <strong>₹17.60 LPA</strong>, top 75% at <strong>₹16.10 LPA</strong>, and a highest domestic offer of <strong>₹39.30 LPA</strong> by a leading multinational FinTech firm.</p>

<p>The function-wise split for PGDM is quite different from PGPM: <strong>Finance leads at 33%</strong>, Sales and Marketing at 32%, Tech Consulting at 12%, Operations at 11%, and Analytics at 7%. The remaining 5% includes Business & Strategy Consulting, Market Research, and Product roles. This reflects the broader, more diverse career paths of the 2-year PGDM cohort — which includes 66% freshers and students from ITES, BFSI, and manufacturing backgrounds.</p>

<p>By industry, <strong>BFSI/NBFC leads at 27%</strong>, followed by IT/ITeS at 22%, Consulting at 16%, Financial Services at 9%, Investment Banking at 4%, FMCG/Retail at 3%, Manufacturing at 3%, and Others at 16% (Healthcare, E-Commerce, Telecom, FinTech, Analytics, Aerospace, HealthTech, Logistics, Automotive, Real Estate).</p>

<h4>PGDM Salary Distribution</h4>

<p>The salary distribution shows: 38% of PGDM students earn in the ₹12–15 LPA range, 28% in ₹15–18 LPA, 20% in ₹9–12 LPA, 8% in ₹18–21 LPA, and 6% above ₹21 LPA. This means <strong>42% of the PGDM batch earns ₹15 LPA or more</strong>, and the top quartile (top 25%) earns ₹19.90 LPA+ — solid numbers for a programme that admits 66% freshers.</p>

<h4>PGDM Recruiters</h4>

<p>The PGDM recruiter list is more diverse than PGPM. <strong>Deloitte, JP Morgan Chase, ICICI Bank, and Infosys Consulting</strong> made the highest number of offers. BFSI heavyweights include JP Morgan Chase, BNY Mellon, MasterCard, Wells Fargo, Standard Chartered, ICICI Bank, Axis Bank, Federal Bank, IDBI Bank, HDFC Life, and PayPal. Consulting firms include Deloitte India & USI, EY India, PWC, and Accenture ATCI. Analytics firms include CRISIL and Gartner. Technology companies include HCL, Infosys, LTI Mindtree, Cisco, Amazon, IBM, and Tata Advanced System. FMCG and consumer brands include ITC, Nestlé, Himalaya Wellness, Godrej, and Adani Wilmar. Over 25 new recruiters participated including <strong>Godrej, MasterCard, Federal Bank, and L&T Finance</strong>.</p>

<h3>PGPM vs PGDM — Which Programme Has Better Placements?</h3>

<p>A direct comparison reveals important differences. The PGPM delivers a higher average (₹17.80 vs ₹15 LPA), a significantly higher top-10% average (₹28.60 vs ₹23.30 LPA), and a stronger median outcome (top 50% at ₹21 vs ₹17.60 LPA). However, the PGDM produces the highest domestic offer at ₹39.30 LPA vs PGPM's ₹30.80 LPA — suggesting some PGDM students in BFSI and technology roles reach exceptional outcome levels.</p>

<p>The PGPM is dominated by consulting (61%) while the PGDM is more balanced across Finance (33%), Sales & Marketing (32%), and Operations (11%). For a student targeting management consulting or analytics consulting with 2+ years of work experience, the PGPM is the stronger pathway — and the 2.7× salary multiplier makes the ROI case very compelling for working professionals. For a fresher or someone open to finance, FMCG, or sales roles, the PGDM provides better diversity of outcomes and access to BFSI heavyweights like JP Morgan and Wells Fargo.</p>

<h3>Pre-Placement Offers</h3>

<p><strong>63 PPOs</strong> were converted in 2025, representing approximately 20–25% of the eligible batch receiving offers directly from their summer internship companies. PPO-issuing companies are concentrated in consulting (Accenture, Deloitte) and analytics (Tiger Analytics, Incedo) for the PGPM batch, and in BFSI and FMCG for the PGDM batch. Students who perform well in their summer internship can bypass the formal placement season entirely — a significant advantage given the competitive nature of campus placements.</p>

<h3>PGDM Summer Internships 2024-26</h3>

<p>The PGDM class of 2024-26 received internship offers from <strong>153 corporates</strong> with an average stipend of <strong>₹99,700</strong> and a highest stipend of <strong>₹6 lakhs</strong> (from a multinational consulting firm). Finance roles dominated at 41% of internship offers, followed by Sales & Marketing at 34%, Operations at 11%, Analytics at 5%, Business & Strategy Consulting at 4%, Market Research at 2%, Product at 2%, and HR at 1%.</p>

<p>By industry, BFSI & NBFC led with 14%, Investment Banking at 11%, Publishing & Media at 9%, Technology at 8%, Consulting at 7%, EdTech at 7%, FMCG & Retail at 7%, Healthcare & Pharma at 7%, Manufacturing at 7%, Financial Services at 6%, and Others at 17%. Notable internship recruiters include <strong>Bain Capability Network, Deloitte USI, JP Morgan Chase, ICICI Bank, ITC, Nestlé, Coca-Cola, Reliance Industries, Zomato, Big Basket, Bajaj Auto, Jindal Steel & Power, Indian Oil, HSBC Bank, Havells, Godrej, Adani, and Wells Fargo</strong>. The presence of Bain Capability Network in the internship season is a notable addition to GLIM Chennai's consulting recruiter pipeline.</p>`,
}

export default placements
