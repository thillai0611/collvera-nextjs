'use client'
import { useState } from 'react'
import Link from 'next/link'
import Nav from '../../../../components/Nav'
import LeadModal from '../../../../components/LeadModal'

const COLLEGES = [
  // Tier 1 — NMIMS family
  {
    name: 'NMIMS Mumbai',
    location: 'Mumbai',
    cutoff: 210,
    cutoff_range: '210-230',
    fees: 23.5,
    avg_package: 22.5,
    seats: 720,
    accreditation: 'AACSB, NAAC A+',
    programs: 'MBA, MBA-HR, MBA-Pharma',
    tier: 1,
    note: 'Flagship campus; highest NMAT cutoff; top FMCG and finance recruiter',
  },
  {
    name: 'NMIMS Bangalore',
    location: 'Bengaluru',
    cutoff: 200,
    cutoff_range: '200-215',
    fees: 20.0,
    avg_package: 16.0,
    seats: 240,
    accreditation: 'NAAC A',
    programs: 'MBA',
    tier: 1,
    note: 'Bengaluru tech ecosystem; strong IT and consulting placements',
  },
  {
    name: 'NMIMS Hyderabad',
    location: 'Hyderabad',
    cutoff: 198,
    cutoff_range: '198-212',
    fees: 18.5,
    avg_package: 14.5,
    seats: 180,
    accreditation: 'NAAC A',
    programs: 'MBA',
    tier: 1,
    note: 'Growing pharma and tech placement base; Hyderabad ecosystem',
  },
  {
    name: 'NMIMS Navi Mumbai',
    location: 'Navi Mumbai',
    cutoff: 195,
    cutoff_range: '195-210',
    fees: 18.0,
    avg_package: 13.5,
    seats: 180,
    accreditation: 'NAAC A',
    programs: 'MBA',
    tier: 1,
    note: 'Part of NMIMS group; Mumbai metro advantage',
  },
  {
    name: 'NMIMS Indore',
    location: 'Indore',
    cutoff: 188,
    cutoff_range: '188-205',
    fees: 16.5,
    avg_package: 11.5,
    seats: 120,
    accreditation: 'NAAC',
    programs: 'MBA',
    tier: 2,
    note: 'Newer NMIMS campus; lower cutoff, growing placement record',
  },
  // Tier 1 — Premium non-NMIMS
  {
    name: 'SPJIMR Mumbai',
    location: 'Mumbai',
    cutoff: 200,
    cutoff_range: '200+',
    fees: 22.0,
    avg_package: 28.0,
    seats: 240,
    accreditation: 'AACSB, EQUIS',
    programs: 'PGDM',
    tier: 1,
    note: 'Accepts NMAT + XAT + CAT; elite placements; no-lateral policy',
  },
  {
    name: 'ISB Hyderabad',
    location: 'Hyderabad',
    cutoff: 210,
    cutoff_range: '210+ (or GMAT 700+)',
    fees: 43.0,
    avg_package: 34.0,
    seats: 900,
    accreditation: 'AACSB, EQUIS, AMBA',
    programs: 'PGP (1 year)',
    tier: 1,
    note: 'NMAT accepted; primarily GMAT; 1-year MBA for experienced professionals',
  },
  {
    name: 'SDA Bocconi Asia Pacific',
    location: 'Mumbai',
    cutoff: 200,
    cutoff_range: '200+',
    fees: 28.0,
    avg_package: 18.0,
    seats: 120,
    accreditation: 'EQUIS, AACSB (Bocconi Italy)',
    programs: 'MBA',
    tier: 1,
    note: 'Italian B-school; global curriculum; dual degree option with Bocconi Milan',
  },
  {
    name: 'TISS Mumbai',
    location: 'Mumbai',
    cutoff: 190,
    cutoff_range: '190-210',
    fees: 2.5,
    avg_package: 12.5,
    seats: 120,
    accreditation: 'NAAC A++',
    programs: 'MA HRM & LR',
    tier: 1,
    note: 'Accepts NMAT for HR programme; exceptional ROI at Rs 2.5L fees',
  },
  // Tier 2
  {
    name: 'XIM University Bhubaneswar',
    location: 'Bhubaneswar',
    cutoff: 185,
    cutoff_range: '185-205',
    fees: 17.5,
    avg_package: 14.0,
    seats: 180,
    accreditation: 'NAAC A',
    programs: 'MBA',
    tier: 2,
    note: 'Jesuit institution; strong values-based management tradition',
  },
  {
    name: 'Shiv Nadar University',
    location: 'Greater Noida',
    cutoff: 185,
    cutoff_range: '185-200',
    fees: 14.0,
    avg_package: 11.0,
    seats: 120,
    accreditation: 'NAAC A+',
    programs: 'MBA',
    tier: 2,
    note: 'STEM-integrated MBA; growing tech and analytics placements',
  },
  {
    name: 'BML Munjal University',
    location: 'Gurugram',
    cutoff: 175,
    cutoff_range: '175-195',
    fees: 12.5,
    avg_package: 9.5,
    seats: 120,
    accreditation: 'NAAC A',
    programs: 'MBA',
    tier: 2,
    note: 'Hero Group affiliated; good NCR industry connections',
  },
  {
    name: 'Woxsen University',
    location: 'Hyderabad',
    cutoff: 170,
    cutoff_range: '170-190',
    fees: 15.0,
    avg_package: 9.0,
    seats: 180,
    accreditation: 'NAAC A',
    programs: 'MBA',
    tier: 2,
    note: 'International curriculum; global exchange programmes',
  },
  {
    name: 'Alliance University',
    location: 'Bengaluru',
    cutoff: 165,
    cutoff_range: '165-185',
    fees: 11.0,
    avg_package: 8.5,
    seats: 300,
    accreditation: 'NAAC A',
    programs: 'MBA, MBA (IB)',
    tier: 2,
    note: 'Large intake; Bengaluru tech proximity; multiple specialisations',
  },
  {
    name: 'ICFAI Business School (IBS)',
    location: 'Hyderabad (+ 8 campuses)',
    cutoff: 160,
    cutoff_range: '160-180',
    fees: 9.5,
    avg_package: 7.5,
    seats: 500,
    accreditation: 'NAAC',
    programs: 'MBA',
    tier: 2,
    note: 'Large network; case-study based learning; multiple city options',
  },
  {
    name: 'Christ University',
    location: 'Bengaluru',
    cutoff: 165,
    cutoff_range: '165-185',
    fees: 8.5,
    avg_package: 8.0,
    seats: 240,
    accreditation: 'NAAC A++',
    programs: 'MBA, MBA (IB)',
    tier: 2,
    note: 'Strong academics; Bengaluru location; affordable fees',
  },
  {
    name: 'Amity University',
    location: 'Noida',
    cutoff: 155,
    cutoff_range: '155-175',
    fees: 10.5,
    avg_package: 7.0,
    seats: 600,
    accreditation: 'NAAC A+',
    programs: 'MBA (20+ specialisations)',
    tier: 3,
    note: 'Largest private university; widest specialisation options',
  },
  {
    name: 'UPES Dehradun',
    location: 'Dehradun',
    cutoff: 150,
    cutoff_range: '150-170',
    fees: 9.0,
    avg_package: 7.5,
    seats: 240,
    accreditation: 'NAAC A',
    programs: 'MBA (Energy, Oil & Gas specialisations)',
    tier: 3,
    note: 'Strong in energy sector; niche but powerful for oil and gas careers',
  },
]

const SCORE_BANDS = [
  { label: '215+', min: 215, desc: 'NMIMS Mumbai top calls, ISB, SPJIMR' },
  { label: '205-214', min: 205, max: 214, desc: 'NMIMS Mumbai, Bangalore, SPJIMR, SDA Bocconi' },
  { label: '195-204', min: 195, max: 204, desc: 'All NMIMS campuses, SDA Bocconi, TISS, XIM' },
  { label: '185-194', min: 185, max: 194, desc: 'XIM, TISS, Shiv Nadar, NMIMS Indore' },
  { label: '170-184', min: 170, max: 184, desc: 'BML Munjal, Woxsen, Alliance, Christ' },
  { label: 'Below 170', min: 0, max: 169, desc: 'ICFAI, Amity, UPES and other private colleges' },
]

const TIER_COLORS = {
  1: { bg: '#f0faf5', border: '#1D9E75', text: '#0f6846', label: 'Tier 1' },
  2: { bg: '#fff8f0', border: '#d95f02', text: '#a34600', label: 'Tier 2' },
  3: { bg: '#f5f5f5', border: '#8A8070', text: '#555', label: 'Tier 3' },
}

export default function NMATCollegesClient() {
  const [leadOpen, setLeadOpen] = useState(false)
  const [scoreFilter, setScoreFilter] = useState(null)
  const [tierFilter, setTierFilter] = useState(null)

  const filtered = COLLEGES.filter(c => {
    if (tierFilter && c.tier !== tierFilter) return false
    if (scoreFilter !== null && c.cutoff > scoreFilter) return false
    return true
  })

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <Nav onLeadOpen={() => setLeadOpen(true)} />

      {/* Header */}
      <div style={{ background: 'var(--ink)', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 24px 32px' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            <Link href="/exams" style={{ color: 'rgba(255,255,255,.3)', fontSize: 11.5, fontFamily: 'var(--mono)', textDecoration: 'none' }}>Exams</Link>
            <span style={{ color: 'rgba(255,255,255,.2)' }}>›</span>
            <Link href="/exams/nmat" style={{ color: 'rgba(255,255,255,.4)', fontSize: 11.5, fontFamily: 'var(--mono)', textDecoration: 'none' }}>NMAT</Link>
            <span style={{ color: 'rgba(255,255,255,.2)' }}>›</span>
            <span style={{ color: '#fff', fontSize: 11.5, fontFamily: 'var(--mono)' }}>Colleges</span>
          </div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 700, color: '#fff', marginBottom: 12, lineHeight: 1.1 }}>
            Colleges Accepting NMAT 2026
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,.5)', maxWidth: 680, lineHeight: 1.8 }}>
            Complete list of {COLLEGES.length} MBA colleges that accept NMAT score — with cutoffs, fees, average placements and honest assessment. Filter by your score to see realistic options.
          </p>
          <div style={{ display: 'flex', gap: 24, marginTop: 24, flexWrap: 'wrap' }}>
            {[
              { label: 'Colleges listed', value: COLLEGES.length },
              { label: 'Top cutoff', value: '215+' },
              { label: 'Lowest fees', value: '₹2.5L (TISS)' },
              { label: 'Highest avg pkg', value: '₹34 LPA (ISB)' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', fontWeight: 700, color: '#fff' }}>{s.value}</div>
                <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'rgba(255,255,255,.4)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* Score band filter */}
        <div style={{ background: 'var(--white)', borderRadius: 14, border: '1px solid var(--border)', padding: '24px', marginBottom: 28 }}>
          <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 16 }}>
            Filter by your NMAT score
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
            <button onClick={() => setScoreFilter(null)}
              style={{ padding: '8px 18px', borderRadius: 20, border: '1px solid var(--border)', background: scoreFilter === null ? 'var(--ink)' : 'var(--cream)', color: scoreFilter === null ? '#fff' : 'var(--ink)', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>
              All scores
            </button>
            {SCORE_BANDS.map(b => (
              <button key={b.label} onClick={() => setScoreFilter(b.min)}
                style={{ padding: '8px 18px', borderRadius: 20, border: '1px solid var(--border)', background: scoreFilter === b.min ? 'var(--ink)' : 'var(--cream)', color: scoreFilter === b.min ? '#fff' : 'var(--ink)', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>
                {b.label}
              </button>
            ))}
          </div>
          {scoreFilter !== null && (
            <div style={{ fontSize: 13, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
              Showing colleges with cutoff ≤ {scoreFilter} — {filtered.length} colleges in range
            </div>
          )}
        </div>

        {/* Tier filter */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
          {[null, 1, 2, 3].map(t => (
            <button key={t} onClick={() => setTierFilter(t)}
              style={{ padding: '7px 16px', borderRadius: 20, border: `1px solid ${t ? TIER_COLORS[t].border : 'var(--border)'}`, background: tierFilter === t ? (t ? TIER_COLORS[t].bg : 'var(--ink)') : 'transparent', color: tierFilter === t ? (t ? TIER_COLORS[t].text : '#fff') : 'var(--ink2)', fontSize: 12.5, cursor: 'pointer', fontWeight: 500 }}>
              {t ? `Tier ${t} only` : 'All tiers'}
            </button>
          ))}
          <span style={{ fontSize: 12, color: 'var(--muted)', alignSelf: 'center', fontFamily: 'var(--mono)' }}>
            {filtered.length} colleges shown
          </span>
        </div>

        {/* College cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
          {filtered.map((c, i) => {
            const tc = TIER_COLORS[c.tier]
            return (
              <div key={i} style={{ background: 'var(--white)', borderRadius: 14, border: '1px solid var(--border)', overflow: 'hidden' }}>
                {/* Top bar */}
                <div style={{ background: tc.bg, borderBottom: `2px solid ${tc.border}`, padding: '14px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', marginBottom: 3 }}>{c.name}</div>
                    <div style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--muted)' }}>📍 {c.location} · {c.programs}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ background: tc.border, color: '#fff', padding: '5px 14px', borderRadius: 20, fontSize: 11.5, fontFamily: 'var(--mono)', fontWeight: 600 }}>
                      {tc.label}
                    </div>
                    <div style={{ background: 'var(--ink)', color: '#fff', padding: '5px 14px', borderRadius: 20, fontSize: 12, fontFamily: 'var(--mono)', fontWeight: 600 }}>
                      NMAT {c.cutoff_range}
                    </div>
                  </div>
                </div>

                {/* Stats row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 0, borderBottom: '1px solid var(--border2)' }}>
                  {[
                    { label: 'NMAT Cutoff', value: c.cutoff_range, highlight: true },
                    { label: 'Total Fees', value: `₹${c.fees}L` },
                    { label: 'Avg Package', value: `₹${c.avg_package} LPA` },
                    { label: 'Intake', value: `${c.seats} seats` },
                    { label: 'Accreditation', value: c.accreditation },
                  ].map((s, si) => (
                    <div key={si} style={{ padding: '14px 18px', borderRight: '1px solid var(--border2)' }}>
                      <div style={{ fontSize: 13.5, fontWeight: 700, color: s.highlight ? tc.text : 'var(--ink)', marginBottom: 3, fontFamily: s.highlight ? 'var(--mono)' : 'inherit' }}>{s.value}</div>
                      <div style={{ fontSize: 10.5, fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase' }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Note */}
                <div style={{ padding: '14px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <div style={{ fontSize: 13.5, color: 'var(--ink2)', lineHeight: 1.6 }}>
                    <span style={{ color: tc.text, fontWeight: 600 }}>Collvera take: </span>{c.note}
                  </div>
                  <Link href={`/colleges/${c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`}
                    style={{ fontSize: 12.5, color: 'var(--orange)', textDecoration: 'none', background: 'var(--orange-lt)', padding: '7px 16px', borderRadius: 20, border: '1px solid rgba(217,95,2,.15)', fontWeight: 500, whiteSpace: 'nowrap' }}>
                    Full profile →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Score vs college guide */}
        <div style={{ background: 'var(--white)', borderRadius: 14, border: '1px solid var(--border)', padding: '28px', marginBottom: 32 }}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 20, paddingBottom: 14, borderBottom: '2px solid var(--border2)' }}>
            NMAT Score vs Colleges — What Score Gets You Where
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, overflow: 'hidden', borderRadius: 10, border: '1px solid var(--border2)' }}>
            {SCORE_BANDS.map((b, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '130px 1fr', borderBottom: i < SCORE_BANDS.length - 1 ? '1px solid var(--border2)' : 'none', background: i % 2 === 0 ? 'var(--white)' : 'var(--cream)' }}>
                <div style={{ padding: '14px 18px', borderRight: '1px solid var(--border2)', fontFamily: 'var(--mono)', fontSize: 13.5, fontWeight: 700, color: 'var(--ink)', display: 'flex', alignItems: 'center' }}>
                  {b.label}
                </div>
                <div style={{ padding: '14px 18px', fontSize: 13.5, color: 'var(--ink2)', display: 'flex', alignItems: 'center' }}>
                  {b.desc}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 18, padding: '14px 18px', background: 'var(--orange-lt)', borderRadius: 10, fontSize: 13, color: 'var(--ink2)', lineHeight: 1.7, border: '1px solid rgba(217,95,2,.1)' }}>
            <strong>Important:</strong> NMAT cutoffs are not fixed — they vary by year based on test-taker performance and seat availability. Scores above are based on 2024-25 patterns and are indicative. Always apply to colleges at and below your score, and attempt all 3 NMAT attempts to maximise your best score.
          </div>
        </div>

        {/* NMAT vs CAT for these colleges */}
        <div style={{ background: 'var(--white)', borderRadius: 14, border: '1px solid var(--border)', padding: '28px', marginBottom: 32 }}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 16, paddingBottom: 14, borderBottom: '2px solid var(--border2)' }}>
            Should You Take NMAT, CAT, or Both?
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: 'var(--ink2)', marginBottom: 16 }}>
            NMAT is a computer-adaptive test with a gentler difficulty curve than CAT — and crucially, you get 3 attempts per season with your best score counted. This makes it significantly more forgiving than CAT's single-attempt high-stakes format.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: 'var(--ink2)', marginBottom: 16 }}>
            The honest answer: most serious MBA aspirants should take both. CAT opens doors to IIMs, FMS, XLRI, and 1000+ colleges. NMAT opens NMIMS specifically, plus some premium private colleges that don't accept CAT. If NMIMS Mumbai is in your target list, NMAT is non-negotiable — they do not accept CAT scores.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: 'var(--ink2)', marginBottom: 0 }}>
            SPJIMR, ISB, and SDA Bocconi accept multiple exams — check their specific requirements as they change. TISS accepts NMAT for its HR programme but uses TISSMAT for other programmes. Always verify directly with the college before applying.
          </p>
        </div>

        {/* Navigation links */}
        <div style={{ background: 'var(--white)', borderRadius: 14, border: '1px solid var(--border)', padding: '22px', marginBottom: 28 }}>
          <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 14 }}>More NMAT resources</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {[
              { label: 'NMAT Complete Guide', href: '/exams/nmat' },
              { label: 'NMAT Preparation Tips', href: '/exams/nmat/preparation' },
              { label: 'NMIMS Mumbai Full Profile', href: '/colleges/nmims-mumbai' },
              { label: 'MBA Colleges by Fees', href: '/rankings' },
              { label: 'Check NMIMS Eligibility', href: '/eligibility' },
            ].map((l, i) => (
              <Link key={i} href={l.href}
                style={{ fontSize: 13, color: 'var(--orange)', textDecoration: 'none', background: 'var(--orange-lt)', padding: '8px 18px', borderRadius: 20, border: '1px solid rgba(217,95,2,.15)', fontWeight: 500 }}>
                {l.label} →
              </Link>
            ))}
          </div>
        </div>


        {/* FAQ Section */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 24, paddingBottom: 14, borderBottom: '2px solid var(--border2)' }}>
            Frequently Asked Questions — NMAT Colleges 2026
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              {
                q: 'Which top MBA colleges accept NMAT scores in 2026?',
                a: 'Top NMAT participating institutes include NMIMS Mumbai (cutoff 210+), NMIMS Bangalore (200+), SPJIMR Mumbai (200+), ISB Hyderabad (210+ or GMAT 700+), SDA Bocconi Asia Pacific (200+), TISS Mumbai (190+), and XIM Bhubaneswar (185+). NMIMS exclusively accepts NMAT — they do not accept CAT scores.',
              },
              {
                q: 'Is NMAT accepted in IIMs?',
                a: 'No. IIMs only accept CAT scores for their flagship PGP MBA programmes. NMAT is not accepted by any IIM. If you are targeting IIMs, you must take CAT. NMAT is primarily relevant for NMIMS campuses and select premium private colleges.',
              },
              {
                q: 'What is a good NMAT score for NMIMS Mumbai?',
                a: '210 or above is typically required for a shortlist from NMIMS Mumbai. Scores of 215-230 give a strong chance. NMIMS Bangalore has a slightly lower cutoff of around 200-215. These cutoffs shift year to year based on test-taker pool performance.',
              },
              {
                q: 'Should I take both NMAT and CAT?',
                a: 'Yes, if NMIMS is a target. CAT opens IIMs, FMS, XLRI and 1000+ colleges. NMAT opens NMIMS exclusively — they do not accept CAT. SPJIMR and ISB accept multiple exams. Taking both maximises your college options significantly.',
              },
              {
                q: 'What colleges can I get with NMAT 190?',
                a: 'With 190, you are competitive for NMIMS Hyderabad, NMIMS Navi Mumbai, TISS Mumbai (HR programme), XIM Bhubaneswar, and Shiv Nadar University. Apply to NMIMS Bangalore and Mumbai as stretch options.',
              },
              {
                q: 'Does SPJIMR accept NMAT?',
                a: 'Yes. SPJIMR Mumbai accepts NMAT along with CAT and XAT. A score of 200+ is typically needed for shortlisting. SPJIMR is one of the highest-ranked colleges accepting NMAT with average placements of Rs 28 LPA — making it a strong target if you score well.',
              },
            ].map((faq, i) => (
              <details key={i} style={{ background: 'var(--white)', borderRadius: 12, border: '1px solid var(--border)', padding: '18px 22px', cursor: 'pointer' }}>
                <summary style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.5, listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  {faq.q}
                  <span style={{ color: 'var(--orange)', fontSize: 18, flexShrink: 0 }}>+</span>
                </summary>
                <p style={{ fontSize: 14.5, color: 'var(--ink2)', lineHeight: 1.85, marginTop: 14, marginBottom: 0, paddingTop: 14, borderTop: '1px solid var(--border2)' }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>

                {/* CTA */}
        <div style={{ background: 'var(--ink)', borderRadius: 16, padding: '32px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: 10 }}>
            Which NMAT college is right for your profile?
          </div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', marginBottom: 22, maxWidth: 480, margin: '0 auto 22px', lineHeight: 1.8 }}>
            Enter your NMAT score and background. Claude shows your realistic college options and where you stand.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/eligibility" style={{ background: 'var(--orange)', color: '#fff', padding: '12px 24px', borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              Check my eligibility →
            </Link>
            <Link href="/exams/nmat" style={{ background: 'rgba(255,255,255,.07)', color: 'rgba(255,255,255,.7)', padding: '12px 24px', borderRadius: 10, fontSize: 14, border: '1px solid rgba(255,255,255,.14)', textDecoration: 'none' }}>
              NMAT complete guide →
            </Link>
          </div>
        </div>
      </div>

      <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)} context="NMAT colleges page" />
      <style>{`@media(max-width:768px){ h1{font-size:1.6rem!important} }`}</style>
    </div>
  )
}
