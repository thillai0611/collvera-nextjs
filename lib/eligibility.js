// COLLVERA ELIGIBILITY ENGINE
// Scores a student profile against each college and returns match %

// College eligibility data — cutoffs and weights
export const COLLEGE_CRITERIA = [
  {
    id: 1, name: 'IIM Ahmedabad', slug: 'iim-ahmedabad', short: 'IIMA',
    nirf: 1, tier: 1, city: 'Ahmedabad', fees: 2750000, avgPkg: 3500000,
    emoji: '🏛️', color: '#e85d04',
    exams: { CAT: 99, XAT: null, GMAT: 730, NMAT: null, GRE: null },
    sectional: { CAT: 85 }, // min sectional percentile
    academics: { tenth: 60, twelfth: 60, ug: 55 },
    workExp: { preferred: true, required: false, minYears: 0 },
    diversity: { female: 3, nonEngineer: 4, workEx: 3 }, // bonus points
    weights: { exam: 40, academics: 30, workExp: 15, diversity: 15 },
    tags: ['Consulting', 'FMCG', 'Finance'],
    intake: 385,
  },
  {
    id: 2, name: 'IIM Bangalore', slug: 'iim-bangalore', short: 'IIMB',
    nirf: 2, tier: 1, city: 'Bangalore', fees: 2620000, avgPkg: 3300000,
    emoji: '🎓', color: '#1a1a1a',
    exams: { CAT: 99, XAT: null, GMAT: 720, NMAT: null, GRE: null },
    sectional: { CAT: 85 },
    academics: { tenth: 60, twelfth: 60, ug: 55 },
    workExp: { preferred: true, required: false, minYears: 0 },
    diversity: { female: 3, nonEngineer: 4, workEx: 3 },
    weights: { exam: 40, academics: 30, workExp: 15, diversity: 15 },
    tags: ['Tech', 'Consulting', 'Startups'],
    intake: 512,
  },
  {
    id: 3, name: 'IIM Calcutta', slug: 'iim-calcutta', short: 'IIMC',
    nirf: 5, tier: 1, city: 'Kolkata', fees: 2700000, avgPkg: 3100000,
    emoji: '🏛️', color: '#0d47a1',
    exams: { CAT: 99, XAT: null, GMAT: 700, NMAT: null, GRE: null },
    sectional: { CAT: 80 },
    academics: { tenth: 60, twelfth: 60, ug: 55 },
    workExp: { preferred: true, required: false, minYears: 0 },
    diversity: { female: 3, nonEngineer: 4, workEx: 3 },
    weights: { exam: 40, academics: 30, workExp: 15, diversity: 15 },
    tags: ['Finance', 'Consulting', 'Analytics'],
    intake: 480,
  },
  {
    id: 4, name: 'FMS Delhi', slug: 'fms-delhi', short: 'FMS',
    nirf: 12, tier: 1, city: 'New Delhi', fees: 243000, avgPkg: 3400000,
    emoji: '🎓', color: '#1b5e20',
    exams: { CAT: 98, XAT: null, GMAT: null, NMAT: null, GRE: null },
    sectional: { CAT: 80 },
    academics: { tenth: 60, twelfth: 60, ug: 55 },
    workExp: { preferred: false, required: false, minYears: 0 },
    diversity: { female: 3, nonEngineer: 5, workEx: 2 },
    weights: { exam: 45, academics: 35, workExp: 10, diversity: 10 },
    tags: ['Consulting', 'FMCG', 'Finance'],
    intake: 220,
  },
  {
    id: 5, name: 'XLRI Jamshedpur', slug: 'xlri-jamshedpur', short: 'XLRI',
    nirf: 9, tier: 1, city: 'Jamshedpur', fees: 2850000, avgPkg: 2800000,
    emoji: '✝️', color: '#880e4f',
    exams: { CAT: null, XAT: 97, GMAT: 680, NMAT: null, GRE: null },
    sectional: { XAT: 70 },
    academics: { tenth: 55, twelfth: 55, ug: 50 },
    workExp: { preferred: false, required: false, minYears: 0 },
    diversity: { female: 3, nonEngineer: 4, workEx: 3 },
    weights: { exam: 40, academics: 28, workExp: 17, diversity: 15 },
    tags: ['HR', 'Consulting', 'FMCG'],
    intake: 180,
  },
  {
    id: 6, name: 'IIM Lucknow', slug: 'iim-lucknow', short: 'IIML',
    nirf: 6, tier: 1, city: 'Lucknow', fees: 2200000, avgPkg: 2600000,
    emoji: '🏛️', color: '#e65100',
    exams: { CAT: 97, XAT: null, GMAT: 660, NMAT: null, GRE: null },
    sectional: { CAT: 80 },
    academics: { tenth: 60, twelfth: 60, ug: 55 },
    workExp: { preferred: true, required: false, minYears: 0 },
    diversity: { female: 3, nonEngineer: 4, workEx: 3 },
    weights: { exam: 40, academics: 30, workExp: 15, diversity: 15 },
    tags: ['FMCG', 'Consulting', 'Agribusiness'],
    intake: 420,
  },
  {
    id: 7, name: 'IIM Kozhikode', slug: 'iim-kozhikode', short: 'IIMK',
    nirf: 3, tier: 1, city: 'Kozhikode', fees: 2400000, avgPkg: 2400000,
    emoji: '🏛️', color: '#4a148c',
    exams: { CAT: 96, XAT: null, GMAT: 650, NMAT: null, GRE: null },
    sectional: { CAT: 78 },
    academics: { tenth: 55, twelfth: 55, ug: 50 },
    workExp: { preferred: true, required: false, minYears: 0 },
    diversity: { female: 4, nonEngineer: 5, workEx: 3 },
    weights: { exam: 40, academics: 28, workExp: 17, diversity: 15 },
    tags: ['Marketing', 'Analytics', 'Digital'],
    intake: 480,
  },
  {
    id: 8, name: 'SPJIMR Mumbai', slug: 'spjimr-mumbai', short: 'SPJIMR',
    nirf: 20, tier: 1, city: 'Mumbai', fees: 2650000, avgPkg: 2700000,
    emoji: '🎓', color: '#006064',
    exams: { CAT: 95, XAT: 93, GMAT: 650, NMAT: null, GRE: null },
    sectional: { CAT: 75 },
    academics: { tenth: 55, twelfth: 55, ug: 50 },
    workExp: { preferred: true, required: true, minYears: 1 },
    diversity: { female: 5, nonEngineer: 5, workEx: 5 },
    weights: { exam: 35, academics: 25, workExp: 25, diversity: 15 },
    tags: ['Marketing', 'FMCG', 'Operations'],
    intake: 240,
  },
  {
    id: 9, name: 'MDI Gurgaon', slug: 'mdi-gurgaon', short: 'MDI',
    nirf: 11, tier: 1, city: 'Gurgaon', fees: 2816000, avgPkg: 2200000,
    emoji: '🏢', color: '#37474f',
    exams: { CAT: 95, XAT: 93, GMAT: 650, NMAT: null, GRE: null },
    sectional: { CAT: 75 },
    academics: { tenth: 55, twelfth: 55, ug: 50 },
    workExp: { preferred: true, required: false, minYears: 0 },
    diversity: { female: 3, nonEngineer: 4, workEx: 4 },
    weights: { exam: 38, academics: 28, workExp: 20, diversity: 14 },
    tags: ['HR', 'Consulting', 'General Management'],
    intake: 300,
  },
  {
    id: 10, name: 'IIFT Delhi', slug: 'iift-delhi', short: 'IIFT',
    nirf: 15, tier: 1, city: 'New Delhi', fees: 2192000, avgPkg: 2000000,
    emoji: '🌐', color: '#01579b',
    exams: { CAT: null, XAT: null, GMAT: 600, NMAT: null, IIFT: 93 },
    sectional: {},
    academics: { tenth: 55, twelfth: 55, ug: 50 },
    workExp: { preferred: false, required: false, minYears: 0 },
    diversity: { female: 3, nonEngineer: 3, workEx: 2 },
    weights: { exam: 42, academics: 30, workExp: 14, diversity: 14 },
    tags: ['International Business', 'Finance', 'Trade'],
    intake: 220,
  },
  {
    id: 11, name: 'ISB Hyderabad', slug: 'isb-hyderabad', short: 'ISB',
    nirf: null, tier: 1, city: 'Hyderabad', fees: 4300000, avgPkg: 3400000,
    emoji: '🌏', color: '#1565c0',
    exams: { CAT: null, XAT: null, GMAT: 710, NMAT: null, GRE: 320 },
    sectional: {},
    academics: { tenth: 60, twelfth: 60, ug: 55 },
    workExp: { preferred: true, required: true, minYears: 2 },
    diversity: { female: 3, nonEngineer: 3, workEx: 8 },
    weights: { exam: 30, academics: 20, workExp: 35, diversity: 15 },
    tags: ['Consulting', 'Finance', 'Leadership'],
    intake: 900,
  },
  {
    id: 12, name: 'NMIMS Mumbai', slug: 'nmims-mumbai', short: 'NMIMS',
    nirf: 24, tier: 2, city: 'Mumbai', fees: 2700000, avgPkg: 1800000,
    emoji: '🏛️', color: '#b71c1c',
    exams: { CAT: 90, XAT: 88, GMAT: 600, NMAT: 215, GRE: null },
    sectional: {},
    academics: { tenth: 50, twelfth: 50, ug: 45 },
    workExp: { preferred: false, required: false, minYears: 0 },
    diversity: { female: 2, nonEngineer: 3, workEx: 2 },
    weights: { exam: 40, academics: 28, workExp: 17, diversity: 15 },
    tags: ['Finance', 'Marketing', 'Pharma'],
    intake: 240,
  },
  {
    id: 13, name: 'IMT Ghaziabad', slug: 'imt-ghaziabad', short: 'IMT',
    nirf: 42, tier: 2, city: 'Ghaziabad', fees: 2095000, avgPkg: 1200000,
    emoji: '🏢', color: '#2e7d32',
    exams: { CAT: 88, XAT: 86, GMAT: 580, NMAT: 200, GRE: null },
    sectional: {},
    academics: { tenth: 50, twelfth: 50, ug: 45 },
    workExp: { preferred: false, required: false, minYears: 0 },
    diversity: { female: 2, nonEngineer: 3, workEx: 2 },
    weights: { exam: 40, academics: 28, workExp: 17, diversity: 15 },
    tags: ['General Management', 'Finance', 'Marketing'],
    intake: 480,
  },
  {
    id: 14, name: 'TAPMI Manipal', slug: 'tapmi-manipal', short: 'TAPMI',
    nirf: 58, tier: 2, city: 'Manipal', fees: 1730000, avgPkg: 1100000,
    emoji: '🎓', color: '#006064',
    exams: { CAT: 85, XAT: 83, GMAT: 550, NMAT: 195, GRE: null },
    sectional: {},
    academics: { tenth: 50, twelfth: 50, ug: 45 },
    workExp: { preferred: false, required: false, minYears: 0 },
    diversity: { female: 2, nonEngineer: 3, workEx: 2 },
    weights: { exam: 40, academics: 28, workExp: 17, diversity: 15 },
    tags: ['Banking', 'Finance', 'Marketing'],
    intake: 240,
  },
  {
    id: 15, name: 'SIBM Pune', slug: 'sibm-pune', short: 'SIBM',
    nirf: 13, tier: 2, city: 'Pune', fees: 2777000, avgPkg: 1600000,
    emoji: '🎓', color: '#4a148c',
    exams: { CAT: 88, XAT: null, GMAT: null, NMAT: null, SNAP: 96 },
    sectional: {},
    academics: { tenth: 50, twelfth: 50, ug: 45 },
    workExp: { preferred: false, required: false, minYears: 0 },
    diversity: { female: 2, nonEngineer: 3, workEx: 2 },
    weights: { exam: 42, academics: 28, workExp: 15, diversity: 15 },
    tags: ['General Management', 'Finance'],
    intake: 240,
  },
]

// ── SCORING ENGINE ──
export function scoreProfile(profile) {
  const results = []

  for (const college of COLLEGE_CRITERIA) {
    const score = calculateMatchScore(profile, college)
    results.push({ ...college, ...score })
  }

  // Sort by match score descending
  results.sort((a, b) => b.matchScore - a.matchScore)
  return results
}

function calculateMatchScore(profile, college) {
  const breakdown = {}
  let totalScore = 0
  const flags = []
  const positives = []
  const negatives = []

  // ── 1. EXAM SCORE (40% weight) ──
  let examScore = 0
  let examUsed = null
  let examCutoff = null

  const examMap = {
    CAT: profile.catScore,
    XAT: profile.xatScore,
    GMAT: profile.gmatScore,
    NMAT: profile.nmatScore,
    GRE: profile.greScore,
  }

  for (const [exam, cutoff] of Object.entries(college.exams)) {
    if (!cutoff || !examMap[exam]) continue
    const studentScore = parseFloat(examMap[exam])
    if (!studentScore) continue

    let examPct
    if (exam === 'GMAT') {
      // GMAT: score 200-805
      examPct = studentScore >= cutoff ? 100 : Math.max(0, (studentScore / cutoff) * 100)
    } else if (exam === 'GRE') {
      examPct = studentScore >= cutoff ? 100 : Math.max(0, (studentScore / cutoff) * 100)
    } else {
      // Percentile-based
      examPct = studentScore >= cutoff ? 100 : Math.max(0, (studentScore / cutoff) * 100)
    }

    if (examPct > examScore) {
      examScore = examPct
      examUsed = exam
      examCutoff = cutoff
    }
  }

  // If no valid exam score provided for this college
  if (examScore === 0 && examUsed === null) {
    breakdown.exam = { score: 0, weight: college.weights.exam, weighted: 0, note: 'Exam not accepted or score not provided' }
    flags.push('no_exam')
  } else {
    const examWeighted = (examScore / 100) * college.weights.exam
    totalScore += examWeighted
    breakdown.exam = {
      score: Math.round(examScore),
      weight: college.weights.exam,
      weighted: Math.round(examWeighted * 10) / 10,
      exam: examUsed,
      cutoff: examCutoff,
      studentScore: examMap[examUsed],
    }
    if (examScore >= 100) positives.push(`${examUsed} score meets/exceeds cutoff`)
    else if (examScore >= 90) positives.push(`${examUsed} score is close to cutoff`)
    else negatives.push(`${examUsed} score is ${Math.round(examCutoff - examMap[examUsed])} points below cutoff`)
  }

  // ── 2. ACADEMICS (30% weight) ──
  const tenth = parseFloat(profile.tenth) || 0
  const twelfth = parseFloat(profile.twelfth) || 0
  const ug = parseFloat(profile.ug) || 0

  const tenthScore = tenth >= college.academics.tenth ? 100 : (tenth / college.academics.tenth) * 100
  const twelfthScore = twelfth >= college.academics.twelfth ? 100 : (twelfth / college.academics.twelfth) * 100
  const ugScore = ug >= college.academics.ug ? 100 : (ug / college.academics.ug) * 100

  // Weighted average of academics (10th: 25%, 12th: 35%, UG: 40%)
  const academicAvg = (tenthScore * 0.25) + (twelfthScore * 0.35) + (ugScore * 0.40)
  const academicWeighted = (academicAvg / 100) * college.weights.academics
  totalScore += academicWeighted

  breakdown.academics = {
    score: Math.round(academicAvg),
    weight: college.weights.academics,
    weighted: Math.round(academicWeighted * 10) / 10,
    tenth, twelfth, ug,
  }

  if (tenth < college.academics.tenth) negatives.push(`10th score (${tenth}%) below minimum ${college.academics.tenth}%`)
  if (twelfth < college.academics.twelfth) negatives.push(`12th score (${twelfth}%) below minimum ${college.academics.twelfth}%`)
  if (ug >= 75) positives.push(`Strong UG score (${ug}%) — academic bonus likely`)
  else if (ug < college.academics.ug) negatives.push(`UG score (${ug}%) below minimum ${college.academics.ug}%`)

  // ── 3. WORK EXPERIENCE (15-25% weight) ──
  const workYears = parseFloat(profile.workExp) || 0
  let workScore = 0

  if (college.workExp.required && workYears < college.workExp.minYears) {
    workScore = 0
    flags.push('work_exp_required')
    negatives.push(`Work experience required: ${college.workExp.minYears}+ years. You have ${workYears} years.`)
  } else if (workYears === 0) {
    workScore = college.workExp.preferred ? 40 : 70
    if (college.workExp.preferred) negatives.push('Work experience preferred — freshers compete at disadvantage')
  } else if (workYears <= 1) {
    workScore = 70
  } else if (workYears <= 3) {
    workScore = 90
    positives.push(`${workYears} years work experience — sweet spot for most programs`)
  } else if (workYears <= 5) {
    workScore = 100
    positives.push(`${workYears} years experience — strong profile for this program`)
  } else {
    workScore = 85 // Too experienced for 2yr programs
    if (workYears > 5 && college.id !== 11) negatives.push('Consider Executive MBA instead of 2-year program')
  }

  const workWeighted = (workScore / 100) * college.weights.workExp
  totalScore += workWeighted
  breakdown.workExp = {
    score: Math.round(workScore),
    weight: college.weights.workExp,
    weighted: Math.round(workWeighted * 10) / 10,
    years: workYears,
  }

  // ── 4. DIVERSITY BONUS (15% weight) ──
  let diversityScore = 50 // baseline
  const diversityFactors = []

  if (profile.gender === 'female') {
    diversityScore += college.diversity.female * 6
    diversityFactors.push(`+${college.diversity.female * 6}pts: Female diversity bonus`)
    positives.push('Female candidate — most IIMs actively seeking gender balance')
  }

  if (profile.background === 'non-engineer') {
    diversityScore += college.diversity.nonEngineer * 5
    diversityFactors.push(`+${college.diversity.nonEngineer * 5}pts: Non-engineer diversity`)
    positives.push('Non-engineering background — rare and valued at most IIMs')
  } else if (profile.background === 'engineer') {
    diversityScore -= 5 // slight disadvantage due to overrepresentation
    if (college.tier === 1) negatives.push('Engineering background is overrepresented — stronger academics/score needed')
  }

  if (profile.category === 'SC' || profile.category === 'ST') {
    diversityScore += 15
    positives.push('Reserved category — lower effective cutoffs apply')
  } else if (profile.category === 'OBC') {
    diversityScore += 8
    positives.push('OBC category — 3-5 percentile points relaxation typically applied')
  } else if (profile.category === 'EWS') {
    diversityScore += 5
  }

  diversityScore = Math.min(100, Math.max(0, diversityScore))
  const diversityWeighted = (diversityScore / 100) * college.weights.diversity
  totalScore += diversityWeighted
  breakdown.diversity = {
    score: Math.round(diversityScore),
    weight: college.weights.diversity,
    weighted: Math.round(diversityWeighted * 10) / 10,
    factors: diversityFactors,
  }

  // ── FINAL SCORE ──
  const matchScore = Math.min(100, Math.max(0, Math.round(totalScore)))

  // Verdict
  let verdict, verdictColor
  if (flags.includes('no_exam') || flags.includes('work_exp_required')) {
    verdict = 'Not Eligible'
    verdictColor = '#c62828'
  } else if (matchScore >= 75) {
    verdict = 'Strong Match'
    verdictColor = '#0f6e56'
  } else if (matchScore >= 55) {
    verdict = 'Good Chance'
    verdictColor = '#854f0b'
  } else if (matchScore >= 35) {
    verdict = 'Possible'
    verdictColor = '#1565c0'
  } else {
    verdict = 'Reach'
    verdictColor = '#880e4f'
  }

  return {
    matchScore,
    verdict,
    verdictColor,
    breakdown,
    positives: positives.slice(0, 3),
    negatives: negatives.slice(0, 3),
    flags,
  }
}
