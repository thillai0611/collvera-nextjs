// COLLVERA CHAT ENGINE
// Handles intent detection and response generation
// No Claude API needed for Layer 1 and 2

export const COLLEGE_DATA = {
  'iim-ahmedabad': { name:'IIM Ahmedabad', short:'IIM A', fees:2750000, avgPkg:3522000, cutoff:'99%+', cutoffExam:'CAT', nirf:1, city:'Ahmedabad', slug:'iim-ahmedabad', emoji:'🏛️', tags:['Consulting','FMCG','Finance'], highest:11000000 },
  'iim-bangalore': { name:'IIM Bangalore', short:'IIM B', fees:2620000, avgPkg:3488000, cutoff:'99%+', cutoffExam:'CAT', nirf:2, city:'Bangalore', slug:'iim-bangalore', emoji:'🎓', tags:['Tech','Consulting','Startups'], highest:11500000 },
  'iim-calcutta': { name:'IIM Calcutta', short:'IIM C', fees:2700000, avgPkg:3100000, cutoff:'99%+', cutoffExam:'CAT', nirf:5, city:'Kolkata', slug:'iim-calcutta', emoji:'🏛️', tags:['Finance','Consulting','Analytics'], highest:14500000 },
  'iim-lucknow': { name:'IIM Lucknow', short:'IIM L', fees:2200000, avgPkg:3230000, cutoff:'97%+', cutoffExam:'CAT', nirf:6, city:'Lucknow', slug:'iim-lucknow', emoji:'🏛️', tags:['FMCG','Consulting','Agribusiness'], highest:10000000 },
  'iim-kozhikode': { name:'IIM Kozhikode', short:'IIM K', fees:2400000, avgPkg:2800000, cutoff:'96%+', cutoffExam:'CAT', nirf:3, city:'Kozhikode', slug:'iim-kozhikode', emoji:'🏛️', tags:['Analytics','Marketing','Digital'], highest:7200000 },
  'iim-indore': { name:'IIM Indore', short:'IIM I', fees:1650000, avgPkg:2500000, cutoff:'97%+', cutoffExam:'CAT', nirf:7, city:'Indore', slug:'iim-indore', emoji:'🏛️', tags:['General Management','Finance'], highest:8000000 },
  'fms-delhi': { name:'FMS Delhi', short:'FMS', fees:243000, avgPkg:3400000, cutoff:'98%+', cutoffExam:'CAT', nirf:12, city:'New Delhi', slug:'fms-delhi', emoji:'🎓', tags:['Consulting','FMCG','Finance'], highest:null },
  'xlri-jamshedpur': { name:'XLRI Jamshedpur', short:'XLRI', fees:2850000, avgPkg:2800000, cutoff:'97%+', cutoffExam:'XAT', nirf:9, city:'Jamshedpur', slug:'xlri-jamshedpur', emoji:'✝️', tags:['HR','Consulting','FMCG'], highest:null },
  'spjimr-mumbai': { name:'SPJIMR Mumbai', short:'SPJIMR', fees:2650000, avgPkg:2700000, cutoff:'95%+', cutoffExam:'CAT', nirf:20, city:'Mumbai', slug:'spjimr-mumbai', emoji:'🎓', tags:['Marketing','FMCG','Operations'], highest:null },
  'mdi-gurgaon': { name:'MDI Gurgaon', short:'MDI', fees:2816000, avgPkg:2200000, cutoff:'95%+', cutoffExam:'CAT', nirf:11, city:'Gurgaon', slug:'mdi-gurgaon', emoji:'🏢', tags:['HR','Consulting','General Management'], highest:null },
  'isb-hyderabad': { name:'ISB Hyderabad', short:'ISB', fees:4300000, avgPkg:3400000, cutoff:'GMAT 710+', cutoffExam:'GMAT', nirf:null, city:'Hyderabad', slug:'isb-hyderabad', emoji:'🌏', tags:['Consulting','Finance','Leadership'], highest:null },
  'jbims-mumbai': { name:'JBIMS Mumbai', short:'JBIMS', fees:450000, avgPkg:2800000, cutoff:'MH-CET 99%+', cutoffExam:'MH-CET', nirf:null, city:'Mumbai', slug:'jbims-mumbai', emoji:'🏛️', tags:['Finance','Consulting'], highest:null },
  'nmims-mumbai': { name:'NMIMS Mumbai', short:'NMIMS', fees:2700000, avgPkg:1800000, cutoff:'NMAT 215+', cutoffExam:'NMAT', nirf:24, city:'Mumbai', slug:'nmims-mumbai', emoji:'🏛️', tags:['Finance','Marketing','Pharma'], highest:null },
  'imt-ghaziabad': { name:'IMT Ghaziabad', short:'IMT', fees:2095000, avgPkg:1200000, cutoff:'88%+', cutoffExam:'CAT', nirf:42, city:'Ghaziabad', slug:'imt-ghaziabad', emoji:'🏢', tags:['General Management','Finance'], highest:null },
  'tapmi-manipal': { name:'TAPMI Manipal', short:'TAPMI', fees:1730000, avgPkg:1100000, cutoff:'85%+', cutoffExam:'CAT', nirf:58, city:'Manipal', slug:'tapmi-manipal', emoji:'🎓', tags:['Banking','Finance','Marketing'], highest:null },
  'fore-delhi': { name:'FORE Delhi', short:'FORE', fees:1670000, avgPkg:1000000, cutoff:'88%+', cutoffExam:'CAT', nirf:null, city:'New Delhi', slug:'fore-delhi', emoji:'🎓', tags:['General Management'], highest:null },
  'great-lakes-chennai': { name:'Great Lakes Chennai', short:'Great Lakes', fees:1700000, avgPkg:1200000, cutoff:'80%+ or GMAT 550', cutoffExam:'CAT/GMAT', nirf:null, city:'Chennai', slug:'great-lakes-chennai', emoji:'🎓', tags:['Finance','Marketing'], highest:null },
  'gim-goa': { name:'GIM Goa', short:'GIM', fees:1900000, avgPkg:1000000, cutoff:'85%+', cutoffExam:'CAT', nirf:null, city:'Goa', slug:'gim-goa', emoji:'🌴', tags:['General Management'], highest:null },
  'soil-gurgaon': { name:'SOIL Gurgaon', short:'SOIL', fees:1400000, avgPkg:900000, cutoff:'70%+', cutoffExam:'CAT', nirf:null, city:'Gurgaon', slug:'soil-gurgaon', emoji:'🌱', tags:['Leadership','HR'], highest:null },
  'sda-bocconi': { name:'SDA Bocconi Asia', short:'SDA Bocconi', fees:2800000, avgPkg:1800000, cutoff:'GMAT 600+', cutoffExam:'GMAT', nirf:null, city:'Mumbai', slug:'sda-bocconi-mumbai', emoji:'🇮🇹', tags:['Finance','Consulting'], highest:null },
  'masters-union': { name:'Masters Union', short:'Masters Union', fees:2200000, avgPkg:1500000, cutoff:'No exam', cutoffExam:'None', nirf:null, city:'Gurgaon', slug:'masters-union', emoji:'🚀', tags:['Tech','Entrepreneurship'], highest:null },
  'ibs-hyderabad': { name:'IBS Hyderabad', short:'IBS', fees:1200000, avgPkg:700000, cutoff:'IBSAT', cutoffExam:'IBSAT', nirf:null, city:'Hyderabad', slug:'ibs-hyderabad', emoji:'🎓', tags:['Finance','Marketing'], highest:null },
}

// Percentile to colleges mapping
export const PERCENTILE_COLLEGES = {
  99: ['iim-ahmedabad','iim-bangalore','iim-calcutta','fms-delhi'],
  98: ['iim-ahmedabad','iim-bangalore','iim-calcutta','iim-lucknow','fms-delhi'],
  97: ['iim-lucknow','iim-kozhikode','iim-indore','fms-delhi'],
  96: ['iim-kozhikode','iim-indore','spjimr-mumbai','mdi-gurgaon'],
  95: ['spjimr-mumbai','mdi-gurgaon','iim-kozhikode'],
  93: ['spjimr-mumbai','mdi-gurgaon','nmims-mumbai'],
  90: ['imt-ghaziabad','tapmi-manipal','fore-delhi','great-lakes-chennai','gim-goa'],
  85: ['tapmi-manipal','fore-delhi','great-lakes-chennai','gim-goa','soil-gurgaon'],
  80: ['great-lakes-chennai','gim-goa','soil-gurgaon','ibs-hyderabad'],
}

// ── INTENT DETECTION ──────────────────────────────────────────
export function detectIntent(query) {
  const q = query.toLowerCase().trim()

  // Eligibility / which college for me
  if (/eligible|eligibility|which college|can i get|my profile|my score|i got|i have \d|should i apply|chances|profile check/.test(q)) {
    return { type: 'eligibility', data: null }
  }

  // Percentile lookup
  const pctMatch = q.match(/(\d{2})\s*percentile|(\d{2})%/)
  if (pctMatch) {
    const pct = parseInt(pctMatch[1] || pctMatch[2])
    return { type: 'percentile', data: { percentile: pct } }
  }

  // Comparison
  const vsMatch = q.match(/(\w[\w\s]+?)\s+vs\.?\s+(\w[\w\s]+)/) || q.match(/compare\s+(.+?)\s+(?:and|with|to)\s+(.+)/)
  if (vsMatch || /vs|compare|better|difference between|which is better/.test(q)) {
    return { type: 'comparison', data: { query: q } }
  }

  // College specific
  const college = findCollege(q)
  if (college) {
    // What aspect?
    if (/fee|cost|expensive|cheap|price|lakh/.test(q)) return { type: 'college_fees', data: college }
    if (/place|salary|package|lpa|salary|job|recruit/.test(q)) return { type: 'college_placement', data: college }
    if (/cut.?off|percentile|score|eligib|admission|get in/.test(q)) return { type: 'college_cutoff', data: college }
    if (/rank|nirf|rating/.test(q)) return { type: 'college_rank', data: college }
    return { type: 'college_info', data: college }
  }

  // Fees / budget
  if (/under|budget|cheap|afford|lakh|loan|roi|return/.test(q)) {
    return { type: 'budget', data: { query: q } }
  }

  // Ranking
  if (/rank|top \d|best mba|list of|nirf/.test(q)) {
    return { type: 'ranking', data: { query: q } }
  }

  // CAT prep
  if (/cat prep|prepare|how to study|score \d{2}|improve|mock|varc|dilr|quant/.test(q)) {
    return { type: 'cat_prep', data: { query: q } }
  }

  // Career
  if (/salary|career|job|consulting|mckinsey|bcg|bain|finance|marketing|hr|after mba/.test(q)) {
    return { type: 'career', data: { query: q } }
  }

  return { type: 'general', data: { query: q } }
}

// ── COLLEGE FINDER ─────────────────────────────────────────────
export function findCollege(q) {
  const aliases = {
    'iim a': 'iim-ahmedabad', 'iima': 'iim-ahmedabad', 'iim ahmedabad': 'iim-ahmedabad', 'ahmedabad': 'iim-ahmedabad',
    'iim b': 'iim-bangalore', 'iimb': 'iim-bangalore', 'iim bangalore': 'iim-bangalore', 'bangalore iim': 'iim-bangalore',
    'iim c': 'iim-calcutta', 'iimc': 'iim-calcutta', 'iim calcutta': 'iim-calcutta', 'calcutta': 'iim-calcutta',
    'iim l': 'iim-lucknow', 'iiml': 'iim-lucknow', 'iim lucknow': 'iim-lucknow', 'lucknow': 'iim-lucknow',
    'iim k': 'iim-kozhikode', 'iimk': 'iim-kozhikode', 'iim kozhikode': 'iim-kozhikode', 'kozhikode': 'iim-kozhikode',
    'iim i': 'iim-indore', 'iimi': 'iim-indore', 'iim indore': 'iim-indore', 'indore': 'iim-indore',
    'fms': 'fms-delhi', 'fms delhi': 'fms-delhi',
    'xlri': 'xlri-jamshedpur', 'xlri jamshedpur': 'xlri-jamshedpur',
    'spjimr': 'spjimr-mumbai', 'sp jain': 'spjimr-mumbai', 'sjmsom': 'spjimr-mumbai',
    'mdi': 'mdi-gurgaon', 'mdi gurgaon': 'mdi-gurgaon',
    'isb': 'isb-hyderabad', 'isb hyderabad': 'isb-hyderabad',
    'jbims': 'jbims-mumbai', 'bajaj': 'jbims-mumbai',
    'nmims': 'nmims-mumbai',
    'imt': 'imt-ghaziabad', 'imt ghaziabad': 'imt-ghaziabad',
    'tapmi': 'tapmi-manipal', 'manipal': 'tapmi-manipal',
    'fore': 'fore-delhi', 'fore delhi': 'fore-delhi',
    'great lakes': 'great-lakes-chennai', 'glim': 'great-lakes-chennai',
    'gim': 'gim-goa', 'goa institute': 'gim-goa',
    'soil': 'soil-gurgaon',
    'sda bocconi': 'sda-bocconi', 'bocconi': 'sda-bocconi',
    'masters union': 'masters-union',
    'ibs': 'ibs-hyderabad', 'icfai': 'ibs-hyderabad',
  }
  for (const [alias, key] of Object.entries(aliases)) {
    if (q.includes(alias)) return COLLEGE_DATA[key]
  }
  return null
}

// ── RESPONSE GENERATOR ─────────────────────────────────────────
export function generateResponse(intent, query) {
  const { type, data } = intent

  switch(type) {

    case 'eligibility':
      return {
        type: 'eligibility_push',
        text: "To give you an accurate answer, I need your CAT score, academics (10th, 12th, graduation %), work experience, and category. Our AI eligibility checker does this in 2 minutes.",
        cta: { label: 'Check My Eligibility →', href: '/eligibility' },
        followUp: "Or tell me your CAT percentile and I'll give you a quick shortlist."
      }

    case 'percentile': {
      const pct = data.percentile
      const keys = Object.keys(PERCENTILE_COLLEGES)
        .map(Number).sort((a,b) => b-a)
        .find(k => pct >= k)
      const colleges = keys ? PERCENTILE_COLLEGES[keys].map(k => COLLEGE_DATA[k]).filter(Boolean) : []
      return {
        type: 'college_list',
        text: `At ${pct} percentile, here are your realistic options:`,
        colleges: colleges.slice(0,4),
        cta: { label: 'Check Full Eligibility →', href: '/eligibility' },
        tip: pct >= 97 ? "Strong score — your academics and profile will determine which IIMs call you." : pct >= 90 ? "Good score — focus on SPJIMR, MDI and Tier 2 colleges. With diversity bonus you may stretch higher." : "Decent score — strong profile and diversity factors can significantly improve your options."
      }
    }

    case 'college_info':
    case 'college_fees':
    case 'college_placement':
    case 'college_cutoff':
    case 'college_rank':
      return {
        type: 'college_card',
        college: data,
        aspect: type.replace('college_',''),
        cta: { label: `Full ${data.short} Guide →`, href: `/colleges/${data.slug}` },
        eligibilityCta: { label: 'Check My Eligibility →', href: '/eligibility' }
      }

    case 'comparison':
      return {
        type: 'comparison',
        text: "Here's a quick comparison. For the full breakdown with fees, placements and AI verdict:",
        query: query,
        cta: { label: 'See Full Comparison →', href: `/compare` },
        eligibilityCta: { label: 'Check Which One You Can Get Into →', href: '/eligibility' }
      }

    case 'budget':
      return {
        type: 'text',
        text: "For budget-conscious students, the best MBA options in India are FMS Delhi (₹2.4L total fees, ₹34 LPA avg placement), JBIMS Mumbai (₹4.5L fees, ₹28 LPA avg), and IIM Indore (₹16.5L fees, ₹25 LPA avg). These three give exceptional ROI.",
        cta: { label: 'See MBA Under ₹10L Guide →', href: '/blog/best-mba-colleges-under-10-lakhs-2025' },
        eligibilityCta: { label: 'Check Your Eligibility →', href: '/eligibility' }
      }

    case 'cat_prep':
      return {
        type: 'text',
        text: "CAT 2026 is in November. Key strategy: build concepts (Apr-Jun), take mocks weekly (Jul-Oct), refine strategy (Nov). Most students fail not on knowledge but on question selection and time management.",
        cta: { label: 'Full CAT 2026 Prep Guide →', href: '/blog/cat-2026-preparation-guide' },
        followUp: "What section do you want to improve — VARC, DILR, or QA?"
      }

    case 'career':
      return {
        type: 'text',
        text: "Post-MBA careers at top IIMs: Consulting (McKinsey/BCG/Bain) pays ₹28-50 LPA, Finance (IB/PE) pays ₹25-60 LPA, FMCG pays ₹18-25 LPA, Tech pays ₹20-35 LPA. Your target sector should drive your college choice.",
        cta: { label: 'MBA Salary Guide 2025 →', href: '/blog/mba-salary-india-2025-complete' },
        eligibilityCta: { label: 'Check Which Colleges You Can Get Into →', href: '/eligibility' }
      }

    case 'ranking':
      return {
        type: 'text',
        text: "Top MBA colleges India 2025 by NIRF: 1. IIM Ahmedabad, 2. IIM Bangalore, 3. IIM Kozhikode, 4. IIT Bombay, 5. IIM Calcutta, 6. IIM Lucknow, 7. IIM Indore. For placement outcomes, FMS Delhi punches far above its NIRF rank.",
        cta: { label: 'Full NIRF Rankings Guide →', href: '/blog/nirf-mba-ranking-2025-india' },
        eligibilityCta: { label: 'Check Your Eligibility →', href: '/eligibility' }
      }

    default:
      return {
        type: 'general',
        text: null,
        needsAI: true,
        query: query
      }
  }
}

// ── QUERY LOGGER (saves to Supabase for content insights) ────
export async function logQuery(query, intent, supabaseUrl, supabaseKey) {
  try {
    await fetch(`${supabaseUrl}/rest/v1/chat_queries`, {
      method: 'POST',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify({
        query,
        intent_type: intent.type,
        created_at: new Date().toISOString()
      })
    })
  } catch(e) { /* silent fail */ }
}
