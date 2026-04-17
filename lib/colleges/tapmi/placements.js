const placements = {
  year: 2025,
  rate: 100,
  companies: 89,
  ppo: 83,
  ppo_pct: 16.70,

  // ── Overall stats (used in Mode 2 hero pills) ──
  avg:     13.99,
  highest: 32.77,
  top50:   19.16,   // Top 50 avg (official prospectus)
  top100:  17.65,
  top150:  16.72,
  top200:  16.02,

  // ── pgpm/pgdm are null — triggers Mode 2 (single + programme table) ──
  pgpm: null,
  pgdm: null,

  // ── Programme-wise 2025 (official prospectus) ──
  programme_wise: [
    { name: 'MBA (General)',  avg: 13.99, highest: 32.77, rate: 100 },
    { name: 'MBA-BKFS',      avg: 14.73, highest: 26.25, rate: 100 },
    { name: 'MBA-Marketing', avg: 13.72, highest: 19.59, rate: 100 },
    { name: 'MBA-HRM',       avg: 12.86, highest: 19.59, rate: 100 },
    { name: 'MBA-IB',        avg: 11.74, highest: 16.00, rate: 100 },
  ],

  // ── Salary ladder (for fallback if no programme_wise) ──
  salary_ladder: [
    { label: 'Top 50',  value: 19.16 },
    { label: 'Top 100', value: 17.65 },
    { label: 'Top 150', value: 16.72 },
    { label: 'Top 200', value: 16.02 },
  ],

  // ── Sectors (official prospectus) ──
  sectors: [
    { name: 'BFSI',           pct: 38, color: '#8B1A1A' },
    { name: 'Consulting',     pct: 22, color: '#d95f02' },
    { name: 'IT & Analytics', pct: 17, color: '#185fa5' },
    { name: 'FMCG & Retail',  pct: 8,  color: '#2e7d32' },
    { name: 'Others',         pct: 15, color: '#8A8070' },
  ],

  // ── PPO trend ──
  ppo_trend: [
    { year: '2022-23', ppos: 136, pct: 28,    highest_stipend: 1.25 },
    { year: '2023-24', ppos: 112, pct: 22,    highest_stipend: 1.50 },
    { year: '2024-25', ppos: 83,  pct: 16.70, highest_stipend: 2.00 },
  ],

  // ── Recruiters ──
  recruiters: [
    { name: 'Deloitte',                type: 'Consulting' },
    { name: 'KPMG',                    type: 'Consulting' },
    { name: 'EY',                      type: 'Consulting' },
    { name: 'PwC',                     type: 'Consulting' },
    { name: 'Accenture',               type: 'Consulting' },
    { name: 'TresVista',               type: 'Consulting' },
    { name: 'Bain Capability Network', type: 'Consulting' },
    { name: 'JP Morgan Chase',         type: 'BFSI' },
    { name: 'HSBC',                    type: 'BFSI' },
    { name: 'Citi Corp',               type: 'BFSI' },
    { name: 'HDFC Bank',               type: 'BFSI' },
    { name: 'ICICI Bank',              type: 'BFSI' },
    { name: 'JAMI',                    type: 'BFSI' },
    { name: 'ITC',                     type: 'FMCG' },
    { name: 'Britannia',               type: 'FMCG' },
    { name: 'Diageo',                  type: 'FMCG' },
    { name: 'AB InBev',                type: 'FMCG' },
    { name: 'Godrej',                  type: 'FMCG' },
    { name: 'Titan',                   type: 'FMCG' },
    { name: 'IBM',                     type: 'Technology' },
    { name: 'Infosys',                 type: 'Technology' },
    { name: 'ValueLabs',               type: 'Technology' },
    { name: 'Qualcomm',                type: 'Technology' },
  ],

  content: `<h2>TAPMI Manipal Placements 2025 — Full Report</h2>

<p>T. A. Pai Management Institute (TAPMI) achieved 100% placements for all MBA programmes in 2024-25. The MBA General programme recorded a highest of <strong>₹32.77 LPA</strong> with an average of <strong>₹13.99 LPA</strong>. 89 companies participated, 340 students placed, and 83 PPOs converted (16.70% of batch) with the highest PPO stipend reaching ₹2 Lakhs per month.</p>

<h3>Programme-wise Highlights 2025</h3>
<p>MBA-BKFS led with <strong>₹14.73 LPA average</strong> and ₹26.25 LPA highest — the Bloomberg Lab and SBI/BSE training directly driving BFSI demand. MBA-Marketing averaged ₹13.72 LPA, MBA-HRM ₹12.86 LPA. MBA-IB was the weakest at ₹11.74 LPA average.</p>

<h3>Salary Distribution</h3>
<p>Top 50 students averaged ₹19.16 LPA, Top 100 at ₹17.65 LPA, Top 150 at ₹16.72 LPA, Top 200 at ₹16.02 LPA.</p>

<h3>Sectors</h3>
<p><strong>BFSI at 38%</strong> dominates — the highest BFSI concentration among Tier-2 B-schools. Consulting 22%, IT & Analytics 17%, FMCG & Retail 8%. Top recruiters: Deloitte, KPMG, EY, PwC, JP Morgan Chase, HSBC, Citi, ITC, Britannia, Diageo, AB InBev, and Bain Capability Network.</p>`,
}

export default placements
