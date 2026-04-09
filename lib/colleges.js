// COLLVERA — MASTER COLLEGE DATA
// ⚠️  THIS IS THE SINGLE SOURCE OF TRUTH
// Update fees/packages/cutoffs HERE only
// Everything else (chat, cards, eligibility, sitemap) reads from this file
// Last verified: March 2026

export const COLLEGES = {

  'iim-ahmedabad': {
    name: 'IIM Ahmedabad', short: 'IIM A', slug: 'iim-ahmedabad',
    city: 'Ahmedabad', state: 'Gujarat', emoji: '🏛️',
    nirf: 1, tier: 1, founded: 1961,
    fees: 2750000,           // ₹27.5L — verified from iima.ac.in March 2026
    avgPkg: 3522000,         // ₹35.22 LPA — 2025 placement report
    medianPkg: 3453000,      // ₹34.53 LPA
    highestDomestic: 11000000, // ₹1.10 Cr
    highestIntl: null,
    intake: 385,
    exams: { CAT: 99, GMAT: 730 },
    sectionalMin: 85,        // min percentile per section
    workExpPreferred: false,
    tags: ['Consulting', 'FMCG', 'Finance', 'General Management'],
    topRecruiters: ['BCG', 'McKinsey', 'Bain', 'Accenture Strategy', 'Goldman Sachs', 'HUL', 'Adani Group'],
    verdict: "India's #1 MBA for consulting and FMCG. Fees recover in under 10 months at average salary. The IIM A brand opens doors no other Indian B-school can match globally.",
    pros: ['Best consulting placements — BCG 35 offers in 2025', 'FMCG leadership — HUL, P&G, ITC', 'Strongest global alumni network'],
    cons: ['99%+ and strong academics required — extremely competitive', 'Ahmedabad — not a major metro city', 'High-pressure, intense campus environment'],
    asked: ['Is 99 percentile enough for IIM A?', 'IIM A vs IIM B for consulting', 'What is the IIM A interview like?'],
  },

  'iim-bangalore': {
    name: 'IIM Bangalore', short: 'IIM B', slug: 'iim-bangalore',
    city: 'Bangalore', state: 'Karnataka', emoji: '🎓',
    nirf: 2, tier: 1, founded: 1973,
    fees: 2620000,           // ₹26.2L
    avgPkg: 3488000,         // ₹34.88 LPA — 2025
    medianPkg: null,
    highestDomestic: 11500000,
    intake: 512,
    exams: { CAT: 99, GMAT: 720 },
    sectionalMin: 85,
    workExpPreferred: false,
    tags: ['Tech', 'Consulting', 'Startups', 'Product Management'],
    topRecruiters: ['Amazon', 'Google', 'BCG', 'McKinsey', 'Flipkart', 'Goldman Sachs'],
    verdict: 'Best IIM for tech, startups, and product management. Bangalore location gives direct access to India\'s Silicon Valley throughout the program.',
    pros: ['Best IIM for tech and startup careers', 'Bangalore ecosystem — Amazon Google Flipkart recruit heavily', 'Strong in analytics and product management'],
    cons: ['99%+ required — as competitive as IIM A', 'Less strong than IIM A for pure consulting', 'Higher cost than IIM C despite similar placements'],
    asked: ['IIM A vs IIM B which is better?', 'Is IIM B good for tech jobs?', 'IIM B placement for engineers'],
  },

  'iim-calcutta': {
    name: 'IIM Calcutta', short: 'IIM C', slug: 'iim-calcutta',
    city: 'Kolkata', state: 'West Bengal', emoji: '🏛️',
    nirf: 5, tier: 1, founded: 1961,
    fees: 2700000,           // ₹27L
    avgPkg: 3100000,         // ₹31 LPA
    medianPkg: null,
    highestIntl: 14500000,   // ₹1.45 Cr — highest international among all IIMs
    intake: 480,
    exams: { CAT: 99, GMAT: 700 },
    sectionalMin: 80,
    workExpPreferred: false,
    tags: ['Finance', 'Consulting', 'Analytics', 'Investment Banking'],
    topRecruiters: ['Goldman Sachs', 'JP Morgan', 'McKinsey', 'BCG', 'Morgan Stanley', 'Barclays'],
    verdict: "India's best MBA for investment banking and finance. Wall Street connections are stronger here than any other Indian B-school. The oldest IIM with 60+ years of legacy.",
    pros: ['Best for investment banking and private equity', 'Highest international package among all IIMs', '60-year alumni network in global finance'],
    cons: ['Kolkata location — far from Mumbai and Delhi corporate hubs', 'Lower avg package than IIM A and B', 'Finance-heavy — less diverse sector placement'],
    asked: ['IIM C vs IIM A for finance?', 'IIM Calcutta placement in investment banking', 'Is Kolkata location a disadvantage?'],
  },

  'iim-lucknow': {
    name: 'IIM Lucknow', short: 'IIM L', slug: 'iim-lucknow',
    city: 'Lucknow', state: 'Uttar Pradesh', emoji: '🏛️',
    nirf: 6, tier: 1, founded: 1984,
    fees: 2200000,           // ₹22L — most affordable old IIM
    avgPkg: 3230000,         // ₹32.3 LPA
    highestDomestic: 10000000,
    intake: 420,
    exams: { CAT: 97, GMAT: 660 },
    sectionalMin: 80,
    workExpPreferred: false,
    tags: ['FMCG', 'Consulting', 'Agribusiness', 'General Management'],
    topRecruiters: ['HUL', 'Bain', 'Accenture', 'Tata Administrative Services', 'Bank of America', 'Amazon'],
    verdict: 'Most undervalued IIM. ₹22L fees, ₹32.3 LPA avg, 100% placement in 3 days. Serious candidates compare this carefully before choosing IIM K or IIM I.',
    pros: ['₹22L fees — most affordable old IIM', 'Strong FMCG and consulting placements', '100% placement within 3 days — fastest among IIMs'],
    cons: ['97%+ CAT required — still very competitive', 'Lucknow — Tier 2 city, less corporate access', 'Less global brand recognition than top 3 IIMs'],
    asked: ['FMS Delhi vs IIM Lucknow — which is better?', 'Is IIM L worth it vs IIM K?', 'IIM Lucknow placement for freshers'],
  },

  'iim-kozhikode': {
    name: 'IIM Kozhikode', short: 'IIM K', slug: 'iim-kozhikode',
    city: 'Kozhikode', state: 'Kerala', emoji: '🏛️',
    nirf: 3, tier: 1, founded: 1996,
    fees: 2400000,
    avgPkg: 2800000,
    highestDomestic: 7200000,
    intake: 480,
    exams: { CAT: 96, GMAT: 650 },
    sectionalMin: 78,
    workExpPreferred: false,
    tags: ['Analytics', 'Marketing', 'Digital', 'General Management'],
    topRecruiters: ['Amazon', 'Flipkart', 'Deloitte', 'EY', 'Asian Paints', 'Marico'],
    verdict: 'NIRF #3 but often misunderstood — it ranks high on research and diversity, not purely on placements. Strong in analytics and marketing. Remote location is a real consideration.',
    pros: ['NIRF #3 — strong research and faculty quality', 'Excellent analytics and marketing placements', 'Highest gender diversity among IIMs'],
    cons: ['Kozhikode — remote, far from corporate hubs', 'Lower avg package (₹28L) vs IIM L (₹32.3L)', 'NIRF rank driven by research not placements'],
    asked: ['Why does IIM K rank above IIM C in NIRF?', 'IIM K vs IIM L — which is better?', 'IIM Kozhikode placement for analytics'],
  },

  'iim-indore': {
    name: 'IIM Indore', short: 'IIM I', slug: 'iim-indore',
    city: 'Indore', state: 'Madhya Pradesh', emoji: '🏛️',
    nirf: 7, tier: 1, founded: 1996,
    fees: 1650000,           // ₹16.5L — most affordable old IIM by far
    avgPkg: 2500000,
    intake: 550,
    exams: { CAT: 97, GMAT: 640 },
    sectionalMin: 75,
    workExpPreferred: false,
    tags: ['General Management', 'Finance', 'Consulting'],
    topRecruiters: ['Deloitte', 'EY', 'Amazon', 'Flipkart', 'KPMG', 'Asian Paints'],
    verdict: 'Most affordable old IIM at ₹16.5L. Strong overall but avg package (₹25L) is lower than IIM L (₹32.3L) at similar cutoffs — the ROI question is real.',
    pros: ['₹16.5L fees — significantly cheaper than other old IIMs', 'Large batch creates diverse peer network', 'IPM 5-year integrated program for Class 12 students'],
    cons: ['₹25L avg vs ₹32.3L at IIM L — placement gap is significant', 'Indore — Tier 2 city', 'Very large batch (550) dilutes peer exclusivity'],
    asked: ['IIM Indore vs IIM Lucknow — which is better?', 'Is IIM Indore worth it?', 'IIM Indore placement 2025'],
  },

  'fms-delhi': {
    name: 'FMS Delhi', short: 'FMS', slug: 'fms-delhi',
    city: 'New Delhi', state: 'Delhi', emoji: '🎓',
    nirf: 12, tier: 1, founded: 1954,
    fees: 243000,            // ₹2.43L — verified from du.ac.in March 2026
    avgPkg: 3400000,         // ₹34 LPA
    intake: 220,
    exams: { CAT: 98 },
    sectionalMin: 80,
    workExpPreferred: false,
    tags: ['Consulting', 'FMCG', 'Finance', 'General Management'],
    topRecruiters: ['BCG', 'McKinsey', 'HUL', 'Goldman Sachs', 'Amazon', 'Deloitte'],
    verdict: 'Unmatched ROI in Indian MBA. ₹2.43L fees for ₹34 LPA avg — fee recovery under 1 month. Serious 98%+ scorers should evaluate this before IIM A. The only honest reason not to choose FMS is if campus infrastructure matters to you.',
    pros: ['₹2.43L fees — best ROI in India, not even close', '₹34 LPA avg — matches IIM A at 1/11th the cost', 'Delhi location — best corporate access in India'],
    cons: ['98%+ CAT required — extremely selective', 'Government institution — modest campus, fewer amenities', 'Less global brand recognition outside India'],
    asked: ['FMS Delhi vs IIM Lucknow fees comparison', 'FMS placement vs IIM A', 'Is FMS Delhi government or private?'],
  },

  'xlri-jamshedpur': {
    name: 'XLRI Jamshedpur', short: 'XLRI', slug: 'xlri-jamshedpur',
    city: 'Jamshedpur', state: 'Jharkhand', emoji: '✝️',
    nirf: 9, tier: 1, founded: 1949,
    fees: 2850000,
    avgPkg: 2800000,
    intake: 180,
    exams: { XAT: 97, GMAT: 680 },
    sectionalMin: 70,
    workExpPreferred: false,
    tags: ['HR', 'Consulting', 'FMCG', 'General Management'],
    topRecruiters: ['McKinsey', 'BCG', 'HUL', 'P&G', 'Amazon', 'Mahindra'],
    verdict: "India's undisputed #1 for HR careers. For BM students, strong consulting outcomes. The XAT route means less competition from CAT-focused students.",
    pros: ['#1 HR MBA in India — no competition', 'XAT route — separate from CAT pressure', 'Beautiful campus, strong Jesuit values culture'],
    cons: ['Highest fees among non-ISB options at ₹28.5L', 'Jamshedpur — remote location', 'BM placements trail IIM L despite similar fees'],
    asked: ['XLRI BM vs XLRI HRM — which to choose?', 'XLRI vs IIM Lucknow', 'XAT cutoff for XLRI 2025'],
  },

  'spjimr-mumbai': {
    name: 'SPJIMR Mumbai', short: 'SPJIMR', slug: 'spjimr-mumbai',
    city: 'Mumbai', state: 'Maharashtra', emoji: '🎓',
    nirf: 20, tier: 1, founded: 1981,
    fees: 2650000,
    avgPkg: 2700000,
    intake: 240,
    exams: { CAT: 95, XAT: 93, GMAT: 650 },
    sectionalMin: 75,
    workExpPreferred: true,
    workExpRequired: false,
    tags: ['Marketing', 'FMCG', 'Operations', 'Social Impact'],
    topRecruiters: ['HUL', 'P&G', 'Amazon', 'BCG', 'Nestle', 'Asian Paints'],
    verdict: 'Best non-IIM MBA in Mumbai. Work experience strongly preferred — if you have 1-2 years, SPJIMR gives IIM-calibre outcomes with a Mumbai location advantage.',
    pros: ['Mumbai location — best industry access', 'Strong FMCG and marketing placements', 'Diverse, values-focused program culture'],
    cons: ['Work experience strongly preferred — freshers at disadvantage', '₹26.5L fees for ₹27 LPA avg — moderate ROI', 'Smaller batch limits peer diversity'],
    asked: ['SPJIMR vs MDI Gurgaon', 'SPJIMR without work experience', 'JBIMS vs SPJIMR Mumbai'],
  },

  'mdi-gurgaon': {
    name: 'MDI Gurgaon', short: 'MDI', slug: 'mdi-gurgaon',
    city: 'Gurgaon', state: 'Haryana', emoji: '🏢',
    nirf: 11, tier: 1, founded: 1973,
    fees: 2816000,
    avgPkg: 2200000,
    intake: 300,
    exams: { CAT: 95, XAT: 93, GMAT: 650 },
    sectionalMin: 75,
    workExpPreferred: true,
    tags: ['HR', 'Consulting', 'General Management'],
    topRecruiters: ['Deloitte', 'EY', 'Amazon', 'Accenture', 'KPMG', 'Mahindra'],
    verdict: 'Best MBA for Delhi NCR corporate access. Gurgaon is India\'s corporate hub — MDI students intern and network with Fortune 500 throughout the program. ROI is weakest among Tier 1 non-IIMs.',
    pros: ['Gurgaon location — unmatched Fortune 500 proximity', 'Strong HR and consulting placements', 'Work experience weighted in selection'],
    cons: ['₹28.2L fees for ₹22 LPA avg — lowest ROI among Tier 1', '95%+ required', 'HR-heavy reputation limits some career paths'],
    asked: ['MDI Gurgaon vs SPJIMR', 'MDI placement for consulting', 'MDI Gurgaon CAT cutoff 2025'],
  },

  'isb-hyderabad': {
    name: 'ISB Hyderabad', short: 'ISB', slug: 'isb-hyderabad',
    city: 'Hyderabad', state: 'Telangana', emoji: '🌏',
    nirf: null, tier: 1, founded: 2001,
    fees: 4300000,           // ₹43L
    avgPkg: 3400000,
    intake: 900,
    exams: { GMAT: 710, GRE: 320 },
    sectionalMin: null,
    workExpPreferred: true,
    workExpRequired: true,
    workExpMin: 2,
    tags: ['Consulting', 'Finance', 'Leadership', 'Entrepreneurship'],
    topRecruiters: ['McKinsey', 'BCG', 'Goldman Sachs', 'Amazon', 'Microsoft', 'Accenture'],
    verdict: 'For working professionals with 4+ years experience, ISB is transformational. For freshers or candidates who can get into old IIMs — the ₹43L fee is very hard to justify.',
    pros: ['Financial Times Top 30 globally', '1-year program — less opportunity cost', 'Best for senior-level career transitions'],
    cons: ['₹43L fees — highest in India by far', 'Requires GMAT 710+ and 2+ years experience', 'Not suitable for freshers or recent graduates'],
    asked: ['ISB vs IIM A — which is better?', 'Is ISB worth ₹43 lakhs?', 'ISB GMAT cutoff 2025'],
  },

  'jbims-mumbai': {
    name: 'JBIMS Mumbai', short: 'JBIMS', slug: 'jbims-mumbai',
    city: 'Mumbai', state: 'Maharashtra', emoji: '🏛️',
    nirf: null, tier: 1, founded: 1965,
    fees: 450000,            // ₹4.5L — government subsidised
    avgPkg: 2800000,
    intake: 120,
    exams: { MHCET: 99 },
    sectionalMin: null,
    workExpPreferred: false,
    tags: ['Finance', 'Consulting', 'Banking'],
    topRecruiters: ['Goldman Sachs', 'JP Morgan', 'BCG', 'HUL', 'ICICI Bank', 'Avendus'],
    verdict: 'Extraordinary value for Maharashtra residents. ₹4.5L fees and ₹28 LPA avg — comparable to XLRI and MDI for ROI. The MH-CET requirement keeps competition lower than CAT.',
    pros: ['₹4.5L fees — second cheapest top MBA after FMS', 'Mumbai finance network directly accessible', 'Strong alumni in banking and financial services'],
    cons: ['MH-CET 99%+ required — separate exam needs separate prep', 'Primarily useful for Mumbai-based careers', 'Less national brand recognition than IIMs'],
    asked: ['JBIMS vs SPJIMR Mumbai', 'MH-CET cutoff for JBIMS', 'Is JBIMS better than NMIMS?'],
  },

  'nmims-mumbai': {
    name: 'NMIMS Mumbai', short: 'NMIMS', slug: 'nmims-mumbai',
    city: 'Mumbai', state: 'Maharashtra', emoji: '🏛️',
    nirf: 24, tier: 2, founded: 1981,
    fees: 2700000,
    avgPkg: 1800000,
    intake: 240,
    exams: { NMAT: 215, CAT: 90, XAT: 88, GMAT: 600 },
    sectionalMin: null,
    workExpPreferred: false,
    tags: ['Finance', 'Marketing', 'Pharma', 'Banking'],
    topRecruiters: ['HDFC Bank', 'Axis Bank', 'Deloitte', 'EY', 'Amazon', 'Cipla'],
    verdict: 'Strong choice for finance and pharma management in Mumbai. The NMAT route is less competitive than CAT. ROI is moderate — ₹27L fees for ₹18 LPA avg needs careful evaluation.',
    pros: ['Mumbai location — finance and pharma access', 'NMAT route — different and less competitive than CAT', 'Strong banking, NBFC and pharma placements'],
    cons: ['₹27L fees for ₹18 LPA avg — mediocre ROI', 'Less brand recognition than IIMs nationally', 'NMAT requires completely separate preparation'],
    asked: ['NMIMS vs IMT Ghaziabad', 'NMAT score for NMIMS 2025', 'Is NMIMS worth ₹27 lakhs?'],
  },

  'imt-ghaziabad': {
    name: 'IMT Ghaziabad', short: 'IMT', slug: 'imt-ghaziabad',
    city: 'Ghaziabad', state: 'Uttar Pradesh', emoji: '🏢',
    nirf: 42, tier: 2, founded: 1980,
    fees: 2095000,
    avgPkg: 1200000,
    intake: 480,
    exams: { CAT: 88, XAT: 86, GMAT: 580, NMAT: 200 },
    sectionalMin: null,
    workExpPreferred: false,
    tags: ['General Management', 'Finance', 'Marketing'],
    topRecruiters: ['Deloitte', 'EY', 'KPMG', 'Amazon', 'HCL', 'Wipro'],
    verdict: 'Best Tier 2 MBA for NCR careers. IMT\'s Ghaziabad location gives solid Delhi NCR access at CAT 88%+ — realistic for students who missed top IIMs.',
    pros: ['NCR location — corporate Delhi access', 'CAT 88%+ — more accessible cutoff', 'Strong general management and finance placements'],
    cons: ['₹12 LPA avg package — modest outcome', 'Ghaziabad — not central Delhi', 'Tier 2 brand limits top recruiter access'],
    asked: ['IMT vs FORE Delhi — which is better?', 'IMT Ghaziabad placement 2025', 'IMT CAT cutoff for OBC'],
  },

  'tapmi-manipal': {
    name: 'TAPMI Manipal', short: 'TAPMI', slug: 'tapmi-manipal',
    city: 'Manipal', state: 'Karnataka', emoji: '🎓',
    nirf: 58, tier: 2, founded: 1980,
    fees: 1730000,
    avgPkg: 1100000,
    intake: 240,
    exams: { CAT: 85, XAT: 83, GMAT: 550, NMAT: 195 },
    sectionalMin: null,
    workExpPreferred: false,
    tags: ['Banking', 'Finance', 'Marketing', 'Operations'],
    topRecruiters: ['HDFC Bank', 'Axis Bank', 'Kotak', 'Deloitte', 'EY', 'Asian Paints'],
    verdict: 'Hidden gem for banking and finance careers. Residential Manipal campus offers quality experience at accessible fees — underrated relative to actual placement outcomes.',
    pros: ['Strong banking and finance specialisation', 'Residential campus — immersive experience', 'CAT 85%+ — accessible for many profiles'],
    cons: ['Manipal — remote coastal location', '₹11 LPA avg — modest outcomes', 'Less known outside South India'],
    asked: ['TAPMI vs FORE Delhi', 'TAPMI placement for banking careers', 'Is TAPMI worth it?'],
  },

  'fore-delhi': {
    name: 'FORE School of Management', short: 'FORE', slug: 'fore-delhi',
    city: 'New Delhi', state: 'Delhi', emoji: '🎓',
    nirf: null, tier: 2, founded: 1981,
    fees: 2200000,           // ₹22L — verified from fsm.ac.in March 2026
    avgPkg: 1000000,         // ₹10 LPA
    intake: 240,
    exams: { CAT: 88, XAT: 85, GMAT: 550 },
    sectionalMin: null,
    workExpPreferred: false,
    tags: ['General Management', 'Finance', 'Marketing'],
    topRecruiters: ['Deloitte', 'EY', 'KPMG', 'Amazon', 'HCL', 'Asian Paints'],
    verdict: 'Best deal for a Delhi-based MBA at ₹22L — only valuable if you actively leverage the Delhi NCR location. College placement is modest but the city opens doors independently.',
    pros: ['South Delhi campus — excellent NCR access', 'CAT 88%+ — accessible cutoff', 'Delhi location compensates for modest college brand'],
    cons: ['₹22L fees for ₹10 LPA avg — poor ROI on paper', 'Depends heavily on student hustle for top placements', 'Day-scholar heavy — less residential community'],
    asked: ['FORE vs IMT Ghaziabad — which is better?', 'FORE Delhi fees 2025', 'Is FORE Delhi worth it?'],
  },

  'great-lakes-chennai': {
    name: 'Great Lakes Institute of Management', short: 'Great Lakes', slug: 'great-lakes-chennai',
    city: 'Chennai', state: 'Tamil Nadu', emoji: '🌊',
    nirf: 37, tier: 2, founded: 2004,
    fees: 2350000,            // Rs 23.5L — PGPM Chennai 2026-27 all-inclusive (verified)
    avgPkg: 1780000,          // Rs 17.8 LPA — PGPM Chennai 2025
    medianPkg: null,
    highestDomestic: 3930000, // Rs 39.3 LPA — PGDM Chennai 2025 (highest across all programs)
    intake: 368,              // PGDM Chennai batch; PGPM ~200-250
    exams: { CAT: 80, GMAT: 550, XAT: 78, NMAT: null, CMAT: null },
    sectionalMin: null,
    workExpPreferred: true,
    workExpRequired: false,   // PGPM requires 2 yrs; PGDM accepts freshers
    tags: ['Consulting', 'Product Management', 'Finance', 'Analytics', 'FMCG', 'BFSI', 'Operations'],
    topRecruiters: ['Accenture Strategy', 'Deloitte', 'KPMG', 'ZS Associates', 'JP Morgan Chase', 'Amazon', 'Cognizant', 'LTIMindtree', 'Nestle', 'ITC', 'PayPal', 'Tiger Analytics'],
    verdict: "India's pioneer 1-year MBA and a strong 2-year PGDM — both AACSB + AMBA accredited. PGPM Chennai avg Rs 17.8 LPA with 61% in consulting. PGDM Chennai avg Rs 15 LPA (Rs 39.3 LPA highest). 4 programs across 2 campuses — choose based on experience and career goal.",
    pros: [
      'AACSB + AMBA dual accreditation — same as ISB at roughly half the PGPM cost',
      'PGPM: 61% consulting placements (Chennai) — strongest non-IIM consulting track in India',
      'PGDM: Rs 39.3 LPA highest CTC (Chennai 2025) — strong outlier for a fresher program',
      'PGDM open to freshers — no work experience needed; 60-90 day summer internship included',
      'Two campuses — Chennai (flagship, higher placements) and Gurgaon (NCR access)',
      'Karma-Yoga — mandatory rural leadership program; alumni consistently call it transformative',
    ],
    cons: [
      'PGPM avg Rs 17.8 LPA (Chennai) vs Rs 34+ LPA at ISB — significant salary gap despite same accreditation',
      'PGDM Gurgaon avg Rs 11.8 LPA — evaluate MDI Gurgaon and IMT before committing',
      'Chennai campus is 40km from city on ECR Road — remote location',
      'PGCM (PGPM award) is not technically an MBA degree — widely accepted but a real distinction',
      'PGDM fees are approximate — confirm exact figure with admissions office',
    ],
    asked: ['Great Lakes PGPM vs PGDM which to choose', 'Great Lakes Chennai vs Gurgaon campus comparison', 'Great Lakes vs ISB 1-year MBA', 'Great Lakes PGDM Chennai placement 2025', 'Great Lakes AACSB AMBA accreditation review'],
  },

  'gim-goa': {
    name: 'GIM Goa', short: 'GIM', slug: 'gim-goa',
    city: 'Panaji', state: 'Goa', emoji: '🌴',
    nirf: null, tier: 2, founded: 1993,
    fees: 1900000,
    avgPkg: 1000000,
    intake: 180,
    exams: { CAT: 85, XAT: 83, GMAT: 550 },
    sectionalMin: null,
    workExpPreferred: false,
    tags: ['General Management', 'Hospitality', 'Marketing'],
    topRecruiters: ['Deloitte', 'EY', 'Amazon', 'Asian Paints', 'Marico', 'ITC'],
    verdict: 'Best campus experience in Indian MBA — but don\'t choose it purely for that reason. Placements are modest. Worth it if the residential experience and Goa campus matter alongside career.',
    pros: ['Beautiful residential campus — strongest campus culture', 'CAT 85%+ — accessible', 'Unique hospitality and tourism management strength'],
    cons: ['₹10 LPA avg — weakest among comparable Tier 2 options', 'Goa — remote, not a corporate hub', 'IMT and TAPMI deliver better placement numbers'],
    asked: ['GIM Goa vs TAPMI Manipal', 'GIM Goa campus life review', 'Is GIM Goa worth it?'],
  },

  'soil-gurgaon': {
    name: 'SOIL Institute Gurgaon', short: 'SOIL', slug: 'soil-gurgaon',
    city: 'Gurgaon', state: 'Haryana', emoji: '🌱',
    nirf: null, tier: 2, founded: 2008,
    fees: 1400000,
    avgPkg: 900000,
    intake: 120,
    exams: { CAT: 70, XAT: 68 },
    sectionalMin: null,
    workExpPreferred: false,
    tags: ['Leadership', 'HR', 'Sustainability', 'General Management'],
    topRecruiters: ['Deloitte', 'EY', 'Wipro', 'HCL', 'Infosys'],
    verdict: 'Niche institute focused on leadership and sustainability. Low fees at ₹14L and accessible CAT cutoff (70%+). Best for students who specifically value the leadership-focused curriculum.',
    pros: ['₹14L fees — very affordable', 'CAT 70%+ — most accessible among quality institutes', 'Gurgaon location — corporate access'],
    cons: ['₹9 LPA avg — limited placement outcomes', 'Less known brand — harder placements', 'Very small batch limits peer network'],
    asked: ['SOIL vs Great Lakes', 'Is SOIL Gurgaon worth it?', 'SOIL MBA review 2025'],
  },

  'sda-bocconi-mumbai': {
    name: 'SDA Bocconi Asia Center', short: 'SDA Bocconi', slug: 'sda-bocconi-mumbai',
    city: 'Mumbai', state: 'Maharashtra', emoji: '🇮🇹',
    nirf: null, tier: 2, founded: 2012,
    fees: 2800000,
    avgPkg: 1800000,
    intake: 60,
    exams: { GMAT: 600, CAT: 80 },
    sectionalMin: null,
    workExpPreferred: false,
    tags: ['Finance', 'Consulting', 'International Business', 'Luxury Management'],
    topRecruiters: ['Deloitte', 'EY', 'KPMG', 'Amazon', 'Tata Group', 'L\'Oreal'],
    verdict: 'European MBA education in India. Part of Milan\'s SDA Bocconi — top 10 in Europe. Best for students targeting global careers or European network. Small batch (60) means personal attention.',
    pros: ['Part of globally ranked SDA Bocconi Milan', 'Access to European alumni network', 'Small batch — very personalised experience'],
    cons: ['₹28L fees for ₹18 LPA avg Indian outcome — poor local ROI', 'Very small brand recognition in Indian corporate market', 'Value is global network — not domestic placements'],
    asked: ['SDA Bocconi vs ISB', 'Is SDA Bocconi worth it in India?', 'SDA Bocconi GMAT cutoff'],
  },

  'masters-union': {
    name: 'Masters\' Union', short: 'Masters Union', slug: 'masters-union',
    city: 'Gurgaon', state: 'Haryana', emoji: '🚀',
    nirf: null, tier: 2, founded: 2019,
    fees: 2200000,
    avgPkg: 1500000,
    intake: 200,
    exams: {},              // No entrance exam required
    sectionalMin: null,
    workExpPreferred: false,
    tags: ['Tech', 'Entrepreneurship', 'Product Management', 'Finance'],
    topRecruiters: ['Amazon', 'Flipkart', 'Razorpay', 'CRED', 'McKinsey', 'Goldman Sachs'],
    verdict: 'India\'s most controversial new B-school. No entrance exam, strong tech focus, Gurgaon location. Claimed top placements but limited verified data. High potential but high uncertainty for a 2019 institute.',
    pros: ['No entrance exam — accessible to non-CAT students', 'Tech and startup focused curriculum', 'Gurgaon location — strong corporate access'],
    cons: ['Very new institute — limited placement track record', '₹22L fees for an unproven brand is risky', 'No NIRF ranking, no AICTE approval clarity'],
    asked: ['Masters Union vs traditional MBA', 'Is Masters Union worth it?', 'Masters Union placement review'],
  },

  'ibs-hyderabad': {
    name: 'IBS Hyderabad', short: 'IBS', slug: 'ibs-hyderabad',
    city: 'Hyderabad', state: 'Telangana', emoji: '🎓',
    nirf: null, tier: 2, founded: 1995,
    fees: 1200000,
    avgPkg: 700000,
    intake: 1200,
    exams: { IBSAT: null, CAT: 60, GMAT: 500 },
    sectionalMin: null,
    workExpPreferred: false,
    tags: ['Finance', 'Marketing', 'Banking', 'General Management'],
    topRecruiters: ['HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Deloitte', 'Wipro', 'Infosys'],
    verdict: 'Affordable MBA with strong banking and finance focus. Very large batch (1200+) means placement is highly self-driven. Good option for students targeting banking roles at accessible fees.',
    pros: ['₹12L fees — affordable', 'Strong banking and NBFC placement network', 'Hyderabad — growing corporate hub'],
    cons: ['₹7 LPA avg — limited placement outcomes', 'Very large batch (1200+) — placement quality varies widely', 'ICFAI brand has mixed reputation'],
    asked: ['IBS Hyderabad vs Great Lakes', 'IBS Hyderabad placement 2025', 'Is IBS Hyderabad worth it?'],
  },

}

// ── HELPER FUNCTIONS ──────────────────────────────────────────

// Get college by various name formats
export function findCollege(query) {
  const q = query.toLowerCase()
  const aliases = {
    'iim a': 'iim-ahmedabad', 'iim-a': 'iim-ahmedabad', 'iima': 'iim-ahmedabad', 'iim ahmedabad': 'iim-ahmedabad',
    'iim b': 'iim-bangalore', 'iim-b': 'iim-bangalore', 'iimb': 'iim-bangalore', 'iim bangalore': 'iim-bangalore',
    'iim c': 'iim-calcutta', 'iim-c': 'iim-calcutta', 'iimc': 'iim-calcutta', 'iim calcutta': 'iim-calcutta',
    'iim l': 'iim-lucknow', 'iim-l': 'iim-lucknow', 'iiml': 'iim-lucknow', 'iim lucknow': 'iim-lucknow',
    'iim k': 'iim-kozhikode', 'iim-k': 'iim-kozhikode', 'iimk': 'iim-kozhikode', 'iim kozhikode': 'iim-kozhikode',
    'iim i': 'iim-indore', 'iim-i': 'iim-indore', 'iimi': 'iim-indore', 'iim indore': 'iim-indore',
    'fms': 'fms-delhi', 'fms delhi': 'fms-delhi',
    'xlri': 'xlri-jamshedpur', 'xlri jamshedpur': 'xlri-jamshedpur',
    'spjimr': 'spjimr-mumbai', 'sp jain': 'spjimr-mumbai',
    'mdi': 'mdi-gurgaon', 'mdi gurgaon': 'mdi-gurgaon',
    'isb': 'isb-hyderabad', 'isb hyderabad': 'isb-hyderabad',
    'jbims': 'jbims-mumbai',
    'nmims': 'nmims-mumbai',
    'imt': 'imt-ghaziabad', 'imt ghaziabad': 'imt-ghaziabad',
    'tapmi': 'tapmi-manipal',
    'fore': 'fore-delhi', 'fore delhi': 'fore-delhi',
    'great lakes': 'great-lakes-chennai', 'glim': 'great-lakes-chennai', 'great lakes chennai': 'great-lakes-chennai', 'great lakes gurgaon': 'great-lakes-chennai', 'great lakes pgpm': 'great-lakes-chennai', 'great lakes pgdm': 'great-lakes-chennai',
    'gim': 'gim-goa', 'gim goa': 'gim-goa',
    'soil': 'soil-gurgaon',
    'sda bocconi': 'sda-bocconi-mumbai', 'bocconi': 'sda-bocconi-mumbai',
    'masters union': 'masters-union',
    'ibs': 'ibs-hyderabad', 'icfai': 'ibs-hyderabad',
  }
  for (const [alias, slug] of Object.entries(aliases)) {
    if (q.includes(alias)) return { slug, college: COLLEGES[slug] }
  }
  return null
}

// Format fees as ₹22L or ₹2.43L
export function formatFees(amount) {
  if (!amount) return '—'
  const l = amount / 100000
  return `₹${l >= 10 ? l.toFixed(1) : l.toFixed(2).replace(/\.?0+$/, '')}L`
}

// Format package as ₹35.2 LPA
export function formatPkg(amount) {
  if (!amount) return '—'
  return `₹${(amount / 100000).toFixed(1)} LPA`
}

// Build the system prompt data string — used in Claude API
export function buildCollegeDataForPrompt() {
  return Object.values(COLLEGES).map(c => {
    const examStr = Object.entries(c.exams || {})
      .map(([e, v]) => v ? `${e} ${v}${['CAT','XAT','MHCET'].includes(e) ? '%+' : '+'}` : e)
      .join(' or ')
    return `${c.short}: fees ${formatFees(c.fees)}, avg ${formatPkg(c.avgPkg)}, cutoff ${examStr || 'varies'}, ${c.city}${c.workExpRequired ? ', work exp required' : c.workExpPreferred ? ', work exp preferred' : ''}`
  }).join('\n')
}

// Percentile to eligible colleges
export function getCollegesForPercentile(percentile) {
  return Object.values(COLLEGES).filter(c => {
    const catCutoff = c.exams?.CAT
    if (!catCutoff) return false
    return percentile >= catCutoff - 2 // within 2 percentile of cutoff
  }).sort((a, b) => (b.exams?.CAT || 0) - (a.exams?.CAT || 0))
}
