'use client'
import { useState } from 'react'
import Link from 'next/link'
import Nav from '../../../components/Nav'
import LeadModal from '../../../components/LeadModal'

// ── Per-college rich data ────────────────────────────────────────────────────
const COLLEGE_DATA = {
  'iim-ahmedabad': {
    name: 'IIM Ahmedabad',
    short: 'IIM A',
    location: 'Vastrapur, Ahmedabad, Gujarat',
    founded: 1961,
    director: 'Prof. Bharat Bhasker',
    accreditations: ['EQUIS', 'Institute of National Importance'],
    campusLabel: '107 acres · Louis Kahn architecture · Heritage site',
    color: '#1D9E75',
    emoji: '🏛️',
    tagline: "India's #1 MBA for consulting and FMCG. The IIM A brand opens doors no other Indian B-school can match.",
    nirf: 1,
    qs: 42,
    ft: 31,
    bt: 2,

    stats: [
      { label: 'Avg Package', value: '₹35.22 LPA', sub: '2025 placement report' },
      { label: 'Median Package', value: '₹34.53 LPA', sub: 'domestic offers' },
      { label: 'Total Fees', value: '₹27.5 L', sub: 'PGP 2025-27 batch' },
      { label: 'ROI', value: '1.28x', sub: 'package ÷ fees' },
      { label: 'CAT Cutoff', value: '99%ile', sub: 'general category' },
      { label: 'Batch Size', value: '414', sub: 'PGP + 46 FABM' },
    ],

    placements: {
      year: 2025,
      avg: 35.22,
      median: 34.53,
      highest: 110,
      companies: 178,
      ppo: 122,
      international: 2,
      rate: 100,
      sectors: [
        { name: 'Consulting', pct: 40, color: '#1D9E75' },
        { name: 'BFSI', pct: 25, color: '#185fa5' },
        { name: 'FMCG', pct: 15, color: '#d95f02' },
        { name: 'Technology', pct: 12, color: '#7b1fa2' },
        { name: 'Others', pct: 8,  color: '#8A8070' },
      ],
      recruiters: [
        { name: 'BCG', offers: 35, type: 'Consulting' },
        { name: 'Accenture Strategy', offers: 31, type: 'Consulting' },
        { name: 'Bain & Company', offers: 17, type: 'Consulting' },
        { name: 'McKinsey & Company', offers: null, type: 'Consulting' },
        { name: 'Goldman Sachs', offers: 9, type: 'Finance' },
        { name: 'American Express', offers: null, type: 'Finance' },
        { name: 'Blackstone', offers: null, type: 'PE/VC' },
        { name: 'General Atlantic', offers: null, type: 'PE/VC' },
        { name: 'Temasek', offers: null, type: 'PE/VC' },
        { name: 'HUL / P&G / ITC', offers: null, type: 'FMCG' },
      ],
    },

    fees: {
      tuition: 20.10,
      other: 7.15,
      total: 27.50,
      living_monthly: '₹8,000 – 15,000',
      loan_max: '₹20-30 L',
      loan_rate: '8-10% p.a.',
      scholarships: [
        { name: 'Need-Based Scholarship', criteria: 'Family income < ₹15 LPA', amount: 'Varies' },
        { name: 'SC/ST Scholarship', criteria: 'SC/ST category', amount: '₹1,500/yr (govt-funded)' },
        { name: 'Minority Scholarship', criteria: 'Family income < ₹2.5 LPA', amount: 'Varies' },
        { name: 'Alumni Endowment Fund', criteria: 'Merit + need', amount: '₹15,000 – ₹3,00,000' },
      ],
    },

    admissions: {
      cutoff_general: 99,
      cutoff_obc: 75,
      cutoff_sc: 75,
      cutoff_st: 75,
      sectional_min: 85,
      shortlist_weights: [
        { label: 'CAT Score', pct: 65 },
        { label: 'Application Rating (academics + work exp + diversity)', pct: 35 },
      ],
      final_weights: [
        { label: 'Personal Interview', pct: 50 },
        { label: 'CAT Score', pct: 25 },
        { label: 'Application Rating', pct: 15 },
        { label: 'AWT (Written Test)', pct: 10 },
      ],
      batch: {
        size: 414,
        female: 30.6,
        engineering: 50,
        work_exp_pct: 73,
        avg_work_months: 25,
      },
    },

    programs: [
      { name: 'PGP (MBA)', duration: '2 years', fees: '₹27.5 L', intake: 414, exam: 'CAT', note: 'Flagship 2-year residential program' },
      { name: 'PGP-FABM', duration: '2 years', fees: '₹27.5 L', intake: 46, exam: 'CAT', note: 'Food and agri-business management' },
      { name: 'PGPX (Executive)', duration: '1 year', fees: '₹35-37 L', intake: null, exam: 'GMAT/GRE', note: 'Min 4 years work exp required' },
      { name: 'ePGP (Online)', duration: '2-3 years', fees: 'NOT FOUND', intake: null, exam: 'CAT', note: 'For working professionals' },
      { name: 'FPM (PhD)', duration: '4-5 years', fees: 'Fully funded', intake: null, exam: 'CAT/GMAT/GRE', note: 'Stipend ₹42,000-50,000/month' },
    ],

    rankings: [
      { source: 'NIRF 2025', rank: '#1', note: '6th consecutive year' },
      { source: 'QS Global MBA 2025', rank: '#42', note: 'Up 23 ranks from 2024' },
      { source: 'FT Global MBA 2025', rank: '#31', note: '' },
      { source: 'Business Today 2024', rank: '#2', note: '' },
      { source: 'Outlook 2025', rank: '#1', note: '' },
      { source: 'The Week 2025', rank: '#1', note: '' },
    ],

    campus: {
      area: '107 acres',
      dorms: 27,
      dorm_capacity: 740,
      architect: 'Louis I. Kahn (1960s-70s)',
      heritage: 'Ahmedabad UNESCO World Heritage City',
      clubs: 50,
      highlights: [
        'Single-occupancy rooms with TV, fridge, washing machine, Wi-Fi, AC',
        '120 apartments for married students',
        'Louis Kahn red-brick architecture — one of his greatest works',
        'Sports: cricket, football, basketball, tennis, gym',
        '50+ active student clubs and committees',
        'Forum for Industry Interaction (FII) — student consulting body since 1978',
      ],
    },

    alumni: [
      { name: 'Raghuram Rajan', batch: 1987, role: 'Former RBI Governor; Prof. at U. Chicago Booth' },
      { name: 'Ajay Banga', batch: null, role: 'President, World Bank' },
      { name: 'Sanjeev Bikhchandani', batch: 1989, role: 'Founder, Info Edge (Naukri.com)' },
      { name: 'Deep Kalra', batch: null, role: 'Founder, MakeMyTrip' },
      { name: 'Chetan Bhagat', batch: 1997, role: 'Best-selling author' },
      { name: 'C. K. Prahalad', batch: 1966, role: 'Management guru; "Fortune at Bottom of Pyramid"' },
      { name: 'Mallika Sarabhai', batch: 1974, role: 'Padma Bhushan; classical dancer & activist' },
      { name: 'Chandrika Tandon', batch: 1975, role: 'First Indian-American woman partner at McKinsey' },
      { name: 'Prabhjeet Singh', batch: 2006, role: 'President, Uber India & South Asia' },
      { name: 'Ashish Nanda', batch: 1983, role: 'Former Director, IIMA; Prof. at Harvard Law' },
      { name: 'Nachiket Mor', batch: 1987, role: 'Former India Director, Bill & Melinda Gates Foundation' },
      { name: 'Vijay Mahajan', batch: 1980, role: 'Founder & CEO, BASIX (microfinance)' },
    ],

    verdict: {
      best_for: [
        'MBB consulting — BCG, McKinsey, Bain are top recruiters every year',
        'FMCG and general management (HUL, P&G, ITC)',
        'PE/VC finance (Blackstone, General Atlantic, Temasek now recruit)',
        'Entrepreneurship — powerful alumni network, multiple unicorn founders',
        'Students who thrive in high-pressure, case-method environments',
      ],
      watch_out: [
        'Not a corporate hub — Ahmedabad limits networking vs IIM B (Bangalore) or JBIMS (Mumbai)',
        'Extreme first-year pressure — sleep deprivation and competition are real',
        'Only 2 international offers in 2025 — not ideal if you want a global career',
        'Gujarat dry state — restricted nightlife and social options',
        'High fees with limited scholarships — significant financial burden',
      ],
      apply_if: 'You have 98-99%ile, strong academics from Class 10, and you want consulting or FMCG leadership roles.',
      skip_if: 'You want a relaxed 2 years, prioritise location, or are targeting international placements.',
    },

    reviews: {
      academics: 4.4,
      placements: 4.8,
      campus: 4.2,
      roi: 4.3,
      overall: 4.5,
      quotes: [
        { text: 'Transformative experience. Changes how you think about business and life. The peer group is the real education.', source: 'PGP Alumnus, 2024' },
        { text: 'First year is genuinely brutal. You will question your life choices at 3 AM. But you come out sharper.', source: 'Current Student, 2025' },
        { text: 'The brand opens doors. Three years out and the IIM A name still gets calls returned.', source: 'PGP Alumnus, 2022' },
        { text: 'Placement anxiety is real and starts very early. If that will affect your mental health, factor that in.', source: 'PGP Alumnus, 2023' },
      ],
    },
  },
}

// ── Helpers ──────────────────────────────────────────────────────────────────
const SECTIONS = [
  { id: 'overview',    label: 'Overview' },
  { id: 'placements', label: 'Placements' },
  { id: 'fees',       label: 'Fees & Aid' },
  { id: 'admissions', label: 'Admissions' },
  { id: 'programs',   label: 'Programs' },
  { id: 'campus',     label: 'Campus' },
  { id: 'alumni',     label: 'Alumni' },
  { id: 'verdict',    label: "Claude's Verdict" },
]

function StarRating({ value, max=5 }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:4 }}>
      {[1,2,3,4,5].map(i => (
        <div key={i} style={{ width:12, height:12, borderRadius:2, background: i <= Math.round(value) ? '#d95f02' : 'var(--border)', position:'relative', overflow:'hidden' }}>
          {i - 1 < value && value < i && (
            <div style={{ position:'absolute', left:0, top:0, bottom:0, width:`${(value-(i-1))*100}%`, background:'#d95f02' }} />
          )}
        </div>
      ))}
      <span style={{ fontSize:12, fontFamily:'var(--mono)', color:'var(--muted)', marginLeft:4 }}>{value.toFixed(1)}</span>
    </div>
  )
}

function SectionHead({ children }) {
  return (
    <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.12em', marginBottom:20, display:'flex', alignItems:'center', gap:12 }}>
      {children}<span style={{ flex:1, height:1, background:'var(--border)' }} />
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function CollegeDetailClient({ college }) {
  const [leadOpen, setLeadOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const data = COLLEGE_DATA[college?.slug] || null

  if (!data) {
    return (
      <div style={{ minHeight:'100vh' }}>
        <Nav onLeadOpen={() => setLeadOpen(true)} />
        <div style={{ maxWidth:700, margin:'80px auto', textAlign:'center', padding:'0 24px' }}>
          <div style={{ fontSize:48, marginBottom:16 }}>🏛️</div>
          <h1 style={{ fontFamily:'var(--serif)', fontSize:'1.8rem', marginBottom:12 }}>{college?.name || 'College'}</h1>
          <p style={{ color:'var(--muted)', marginBottom:24 }}>Detailed college page coming soon. We are building this section with verified data.</p>
          <Link href="/colleges" style={{ background:'var(--orange)', color:'#fff', padding:'12px 24px', borderRadius:10, textDecoration:'none', fontSize:14, fontWeight:500 }}>
            ← Back to all colleges
          </Link>
        </div>
        <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)} />
      </div>
    )
  }

  const d = data

  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)' }}>
      <Nav onLeadOpen={() => setLeadOpen(true)} />

      {/* ── HERO ── */}
      <div style={{ background:'var(--ink)', borderBottom:'1px solid rgba(255,255,255,.07)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', padding:'36px 24px 0' }}>
          <Link href="/colleges" style={{ color:'rgba(255,255,255,.4)', fontSize:12, textDecoration:'none', fontFamily:'var(--mono)', display:'inline-flex', alignItems:'center', gap:6, marginBottom:20 }}>
            ← All colleges
          </Link>
          <div style={{ display:'flex', gap:20, alignItems:'flex-start', flexWrap:'wrap', marginBottom:28 }}>
            <div style={{ width:56, height:56, borderRadius:14, background:'rgba(255,255,255,.08)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, flexShrink:0 }}>{d.emoji}</div>
            <div style={{ flex:1, minWidth:200 }}>
              <div style={{ display:'flex', gap:8, alignItems:'center', flexWrap:'wrap', marginBottom:8 }}>
                <div style={{ fontSize:10, fontFamily:'var(--mono)', color:d.color, textTransform:'uppercase', letterSpacing:'.1em', background:'rgba(29,158,117,.1)', border:`1px solid ${d.color}40`, padding:'3px 10px', borderRadius:20 }}>
                  NIRF #{d.nirf}
                </div>
                {d.accreditations.map(a => (
                  <div key={a} style={{ fontSize:10, fontFamily:'var(--mono)', color:'rgba(255,255,255,.4)', background:'rgba(255,255,255,.06)', padding:'3px 10px', borderRadius:20, border:'1px solid rgba(255,255,255,.1)' }}>{a}</div>
                ))}
              </div>
              <h1 style={{ fontFamily:'var(--serif)', fontSize:'clamp(1.8rem,3.5vw,2.6rem)', fontWeight:700, color:'#fff', marginBottom:6, lineHeight:1.1 }}>{d.name}</h1>
              <div style={{ fontSize:13, color:'rgba(255,255,255,.4)', fontFamily:'var(--mono)' }}>📍 {d.location} · Est. {d.founded} · Director: {d.director}</div>
            </div>
            <button onClick={() => setLeadOpen(true)} style={{ background:'var(--orange)', color:'#fff', border:'none', padding:'12px 22px', borderRadius:10, fontSize:13, fontWeight:600, cursor:'pointer', flexShrink:0 }}>
              Get free counselling →
            </button>
          </div>

          {/* Key stats bar */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))', gap:1, background:'rgba(255,255,255,.06)', borderRadius:12, overflow:'hidden', marginBottom:0 }}>
            {d.stats.map((s, i) => (
              <div key={i} style={{ padding:'16px 18px', background:'rgba(255,255,255,.03)', borderRight:'1px solid rgba(255,255,255,.05)' }}>
                <div style={{ fontFamily:'var(--serif)', fontSize:'1.4rem', fontWeight:700, color:'#fff', marginBottom:2 }}>{s.value}</div>
                <div style={{ fontSize:11, fontWeight:600, color:d.color, marginBottom:2 }}>{s.label}</div>
                <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'rgba(255,255,255,.25)' }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Tab nav */}
          <div style={{ display:'flex', gap:0, overflowX:'auto', scrollbarWidth:'none', marginTop:24 }}>
            {SECTIONS.map(s => (
              <button key={s.id} onClick={() => { setActiveTab(s.id); document.getElementById(s.id)?.scrollIntoView({ behavior:'smooth', block:'start' }) }}
                style={{ padding:'12px 18px', fontSize:12.5, fontFamily:'var(--mono)', cursor:'pointer', border:'none', background:'transparent', color: activeTab===s.id ? '#fff' : 'rgba(255,255,255,.35)', borderBottom: activeTab===s.id ? `2px solid ${d.color}` : '2px solid transparent', whiteSpace:'nowrap', transition:'all .15s' }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1100, margin:'0 auto', padding:'40px 24px 80px' }}>

        {/* ── OVERVIEW ── */}
        <div id="overview" style={{ marginBottom:56 }}>
          <SectionHead>Overview</SectionHead>
          <div style={{ background:'var(--white)', borderRadius:14, border:'1px solid var(--border)', padding:'24px 28px', marginBottom:16 }}>
            <p style={{ fontSize:15, lineHeight:1.85, color:'var(--ink2)', margin:0 }}>{d.tagline}</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }} className="overview-grid">
            {/* Rankings */}
            <div style={{ background:'var(--white)', borderRadius:14, border:'1px solid var(--border)', padding:'22px 24px' }}>
              <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:16 }}>Rankings 2025</div>
              {d.rankings.map((r, i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'9px 0', borderBottom: i < d.rankings.length-1 ? '1px solid var(--border2)' : 'none' }}>
                  <div>
                    <div style={{ fontSize:13, fontWeight:500, color:'var(--ink)' }}>{r.source}</div>
                    {r.note && <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--mono)' }}>{r.note}</div>}
                  </div>
                  <div style={{ fontFamily:'var(--serif)', fontSize:'1.2rem', fontWeight:700, color:d.color }}>{r.rank}</div>
                </div>
              ))}
            </div>
            {/* Quick facts */}
            <div style={{ background:'var(--white)', borderRadius:14, border:'1px solid var(--border)', padding:'22px 24px' }}>
              <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:16 }}>Quick facts</div>
              {[
                ['Accreditations', d.accreditations.join(', ')],
                ['Campus', d.campusLabel],
                ['Programs', d.programs.map(p=>p.name).join(' · ')],
                ['Website', 'iima.ac.in'],
              ].map(([k,v]) => (
                <div key={k} style={{ display:'grid', gridTemplateColumns:'120px 1fr', gap:12, padding:'9px 0', borderBottom:'1px solid var(--border2)', alignItems:'start' }}>
                  <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase' }}>{k}</div>
                  <div style={{ fontSize:13, color:'var(--ink2)', lineHeight:1.5 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── PLACEMENTS ── */}
        <div id="placements" style={{ marginBottom:56 }}>
          <SectionHead>Placements {d.placements.year}</SectionHead>

          {/* Numbers grid */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))', gap:10, marginBottom:20 }}>
            {[
              { label:'Avg Package', value:`₹${d.placements.avg} LPA`, color:d.color },
              { label:'Median Package', value:`₹${d.placements.median} LPA`, color:d.color },
              { label:'Highest (Domestic)', value:`₹${d.placements.highest} LPA`, color:'#d95f02' },
              { label:'Companies', value:d.placements.companies, color:'var(--ink)' },
              { label:'PPOs Accepted', value:d.placements.ppo, color:'var(--ink)' },
              { label:'Placed', value:`${d.placements.rate}%`, color:d.color },
            ].map((s, i) => (
              <div key={i} style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:12, padding:'16px 18px' }}>
                <div style={{ fontFamily:'var(--serif)', fontSize:'1.5rem', fontWeight:700, color:s.color, marginBottom:4 }}>{s.value}</div>
                <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--mono)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }} className="placements-grid">
            {/* Sector breakdown */}
            <div style={{ background:'var(--white)', borderRadius:14, border:'1px solid var(--border)', padding:'22px 24px' }}>
              <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:18 }}>Sector breakdown</div>
              {d.placements.sectors.map((s, i) => (
                <div key={i} style={{ marginBottom:14 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginBottom:6 }}>
                    <span style={{ fontWeight:500 }}>{s.name}</span>
                    <span style={{ fontFamily:'var(--mono)', fontWeight:700, color:s.color }}>{s.pct}%</span>
                  </div>
                  <div style={{ height:7, background:'var(--cream2)', borderRadius:4, overflow:'hidden' }}>
                    <div style={{ height:'100%', width:`${s.pct}%`, background:s.color, borderRadius:4, transition:'width .6s ease' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Top recruiters table */}
            <div style={{ background:'var(--white)', borderRadius:14, border:'1px solid var(--border)', overflow:'hidden' }}>
              <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.1em', padding:'18px 20px 12px' }}>Top recruiters</div>
              <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
                <thead>
                  <tr style={{ background:'var(--cream)' }}>
                    <th style={{ textAlign:'left', padding:'9px 16px', fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', fontWeight:500 }}>Company</th>
                    <th style={{ textAlign:'left', padding:'9px 16px', fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', fontWeight:500 }}>Sector</th>
                    <th style={{ textAlign:'right', padding:'9px 16px', fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', fontWeight:500 }}>Offers</th>
                  </tr>
                </thead>
                <tbody>
                  {d.placements.recruiters.map((r, i) => (
                    <tr key={i} style={{ borderTop:'1px solid var(--border2)' }}>
                      <td style={{ padding:'9px 16px', fontWeight:500 }}>{r.name}</td>
                      <td style={{ padding:'9px 16px', color:'var(--muted)', fontSize:12 }}>{r.type}</td>
                      <td style={{ padding:'9px 16px', textAlign:'right', fontFamily:'var(--mono)', color:d.color, fontWeight:600 }}>{r.offers || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── FEES ── */}
        <div id="fees" style={{ marginBottom:56 }}>
          <SectionHead>Fees and financial aid</SectionHead>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }} className="fees-grid">
            {/* Fee breakdown */}
            <div style={{ background:'var(--white)', borderRadius:14, border:'1px solid var(--border)', padding:'22px 24px' }}>
              <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:18 }}>PGP 2025-27 fee breakdown</div>
              {[
                { label:'Tuition fee', amount:`₹${d.fees.tuition} L` },
                { label:'Library, computing, materials', amount:`₹${d.fees.other} L` },
                { label:'Total programme fee', amount:`₹${d.fees.total} L`, bold:true },
                { label:'Monthly living (on-campus)', amount:d.fees.living_monthly },
                { label:'Education loan available', amount:d.fees.loan_max },
                { label:'Loan interest rate', amount:d.fees.loan_rate },
              ].map((r, i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderTop: i > 0 ? '1px solid var(--border2)' : 'none', borderTopWidth: r.bold ? 2 : 1, borderTopColor: r.bold ? 'var(--border)' : 'var(--border2)' }}>
                  <div style={{ fontSize:13, color: r.bold ? 'var(--ink)' : 'var(--ink2)', fontWeight: r.bold ? 600 : 400 }}>{r.label}</div>
                  <div style={{ fontFamily:'var(--mono)', fontSize:13, fontWeight: r.bold ? 700 : 500, color: r.bold ? d.color : 'var(--ink)' }}>{r.amount}</div>
                </div>
              ))}
              <div style={{ marginTop:16, padding:'12px 16px', background:'var(--teal-lt)', borderRadius:10, fontSize:12.5, color:'var(--teal)', lineHeight:1.6 }}>
                ROI check: At ₹35 LPA average, you recover the full fee in under 10 months of salary.
              </div>
            </div>
            {/* Scholarships */}
            <div style={{ background:'var(--white)', borderRadius:14, border:'1px solid var(--border)', padding:'22px 24px' }}>
              <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:18 }}>Scholarships available</div>
              {d.fees.scholarships.map((s, i) => (
                <div key={i} style={{ padding:'14px 0', borderTop: i > 0 ? '1px solid var(--border2)' : 'none' }}>
                  <div style={{ fontSize:13, fontWeight:600, marginBottom:4 }}>{s.name}</div>
                  <div style={{ fontSize:12, color:'var(--muted)', marginBottom:4 }}>{s.criteria}</div>
                  <div style={{ fontSize:12, fontFamily:'var(--mono)', color:d.color }}>{s.amount}</div>
                </div>
              ))}
              <div style={{ marginTop:16, padding:'12px 16px', background:'var(--orange-lt)', borderRadius:10, fontSize:12, color:'var(--muted)', lineHeight:1.6 }}>
                Loans without collateral available from SBI, Bank of Baroda, PNB, Central Bank, Union Bank up to ₹20L.
              </div>
            </div>
          </div>
        </div>

        {/* ── ADMISSIONS ── */}
        <div id="admissions" style={{ marginBottom:56 }}>
          <SectionHead>Admissions</SectionHead>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }} className="admissions-grid">
            {/* Cutoffs */}
            <div style={{ background:'var(--white)', borderRadius:14, border:'1px solid var(--border)', padding:'22px 24px' }}>
              <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:18 }}>CAT cutoffs (realistic for shortlisting)</div>
              <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
                <thead>
                  <tr style={{ background:'var(--cream)' }}>
                    <th style={{ textAlign:'left', padding:'9px 14px', fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', fontWeight:500 }}>Category</th>
                    <th style={{ textAlign:'center', padding:'9px 14px', fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', fontWeight:500 }}>Min qualifying</th>
                    <th style={{ textAlign:'center', padding:'9px 14px', fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', fontWeight:500 }}>Realistic shortlist</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['General / EWS', '80%ile', '98-99%ile'],
                    ['OBC', '75%ile', '95-97%ile'],
                    ['SC', '75%ile', '88-92%ile'],
                    ['ST', '75%ile', '85-90%ile'],
                  ].map(([cat, min, real], i) => (
                    <tr key={i} style={{ borderTop:'1px solid var(--border2)' }}>
                      <td style={{ padding:'9px 14px', fontWeight:500 }}>{cat}</td>
                      <td style={{ padding:'9px 14px', textAlign:'center', color:'var(--muted)', fontFamily:'var(--mono)' }}>{min}</td>
                      <td style={{ padding:'9px 14px', textAlign:'center', fontFamily:'var(--mono)', fontWeight:700, color:d.color }}>{real}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginTop:14, fontSize:11.5, color:'var(--muted)', lineHeight:1.65, padding:'0 2px' }}>
                Sectional minimum: 85%ile in each of the 3 CAT sections. Meeting the minimum cutoff does NOT guarantee a PI call.
              </div>
            </div>

            {/* Selection weights */}
            <div style={{ background:'var(--white)', borderRadius:14, border:'1px solid var(--border)', padding:'22px 24px' }}>
              <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:18 }}>How selection works</div>
              <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--muted)', marginBottom:10, textTransform:'uppercase' }}>Stage 1 — Shortlisting for PI</div>
              {d.admissions.shortlist_weights.map((w, i) => (
                <div key={i} style={{ marginBottom:12 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginBottom:6 }}>
                    <span>{w.label}</span>
                    <span style={{ fontFamily:'var(--mono)', fontWeight:700, color:d.color }}>{w.pct}%</span>
                  </div>
                  <div style={{ height:6, background:'var(--cream2)', borderRadius:3, overflow:'hidden' }}>
                    <div style={{ height:'100%', width:`${w.pct}%`, background:d.color, borderRadius:3 }} />
                  </div>
                </div>
              ))}
              <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--muted)', marginBottom:10, marginTop:20, textTransform:'uppercase' }}>Stage 2 — Final selection (post-PI)</div>
              {d.admissions.final_weights.map((w, i) => (
                <div key={i} style={{ marginBottom:10 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginBottom:5 }}>
                    <span>{w.label}</span>
                    <span style={{ fontFamily:'var(--mono)', fontWeight:700, color:'#d95f02' }}>{w.pct}%</span>
                  </div>
                  <div style={{ height:5, background:'var(--cream2)', borderRadius:3, overflow:'hidden' }}>
                    <div style={{ height:'100%', width:`${w.pct}%`, background:'#d95f02', borderRadius:3 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Batch profile */}
          <div style={{ background:'var(--white)', borderRadius:14, border:'1px solid var(--border)', padding:'22px 28px' }}>
            <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:18 }}>Batch profile — PGP 2025-27</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:16 }}>
              {[
                { label:'Batch size', value:'414 students' },
                { label:'Female students', value:`${d.admissions.batch.female}%` },
                { label:'Engineers', value:`${d.admissions.batch.engineering}%` },
                { label:'With work exp', value:`${d.admissions.batch.work_exp_pct}%` },
                { label:'Avg work exp', value:`${d.admissions.batch.avg_work_months} months` },
              ].map((s, i) => (
                <div key={i} style={{ textAlign:'center', padding:'16px', background:'var(--cream)', borderRadius:10 }}>
                  <div style={{ fontFamily:'var(--serif)', fontSize:'1.4rem', fontWeight:700, color:'var(--ink)', marginBottom:4 }}>{s.value}</div>
                  <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--mono)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── PROGRAMS ── */}
        <div id="programs" style={{ marginBottom:56 }}>
          <SectionHead>Programs</SectionHead>
          <div style={{ background:'var(--white)', borderRadius:14, border:'1px solid var(--border)', overflow:'hidden' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
              <thead>
                <tr style={{ background:'var(--ink)' }}>
                  {['Program','Duration','Total Fees','Intake','Exam','Notes'].map(h => (
                    <th key={h} style={{ textAlign:'left', padding:'12px 16px', fontSize:10, fontFamily:'var(--mono)', color:'rgba(255,255,255,.6)', fontWeight:500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {d.programs.map((p, i) => (
                  <tr key={i} style={{ borderTop:'1px solid var(--border2)', background: i%2===0 ? 'var(--white)' : 'var(--cream)' }}>
                    <td style={{ padding:'12px 16px', fontWeight:600 }}>{p.name}</td>
                    <td style={{ padding:'12px 16px', color:'var(--ink2)' }}>{p.duration}</td>
                    <td style={{ padding:'12px 16px', fontFamily:'var(--mono)', fontWeight:600, color:d.color }}>{p.fees}</td>
                    <td style={{ padding:'12px 16px', color:'var(--ink2)' }}>{p.intake || '—'}</td>
                    <td style={{ padding:'12px 16px', color:'var(--muted)', fontFamily:'var(--mono)', fontSize:12 }}>{p.exam}</td>
                    <td style={{ padding:'12px 16px', color:'var(--muted)', fontSize:12 }}>{p.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── CAMPUS ── */}
        <div id="campus" style={{ marginBottom:56 }}>
          <SectionHead>Campus and life</SectionHead>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }} className="campus-grid">
            <div style={{ background:'var(--white)', borderRadius:14, border:'1px solid var(--border)', padding:'22px 24px' }}>
              <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:18 }}>Campus facts</div>
              {[
                ['Area', d.campus.area],
                ['Dormitories', `${d.campus.dorms} dorms · ${d.campus.dorm_capacity} students`],
                ['Architecture', d.campus.architect],
                ['Heritage', d.campus.heritage],
                ['Student clubs', `${d.campus.clubs}+ active clubs`],
              ].map(([k,v]) => (
                <div key={k} style={{ display:'grid', gridTemplateColumns:'120px 1fr', gap:10, padding:'9px 0', borderBottom:'1px solid var(--border2)', alignItems:'start' }}>
                  <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase' }}>{k}</div>
                  <div style={{ fontSize:13, color:'var(--ink2)' }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ background:'var(--white)', borderRadius:14, border:'1px solid var(--border)', padding:'22px 24px' }}>
              <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:18 }}>Life highlights</div>
              {d.campus.highlights.map((h, i) => (
                <div key={i} style={{ display:'flex', gap:10, marginBottom:12, alignItems:'flex-start' }}>
                  <div style={{ width:6, height:6, borderRadius:'50%', background:d.color, flexShrink:0, marginTop:6 }} />
                  <div style={{ fontSize:13, color:'var(--ink2)', lineHeight:1.6 }}>{h}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── ALUMNI ── */}
        <div id="alumni" style={{ marginBottom:56 }}>
          <SectionHead>Notable alumni</SectionHead>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:10 }}>
            {d.alumni.map((a, i) => (
              <div key={i} style={{ background:'var(--white)', borderRadius:12, border:'1px solid var(--border)', padding:'16px 18px' }}>
                <div style={{ fontSize:14, fontWeight:600, color:'var(--ink)', marginBottom:4 }}>{a.name}</div>
                {a.batch && <div style={{ fontSize:11, fontFamily:'var(--mono)', color:d.color, marginBottom:6 }}>PGP {a.batch}</div>}
                <div style={{ fontSize:12.5, color:'var(--muted)', lineHeight:1.55 }}>{a.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── VERDICT ── */}
        <div id="verdict" style={{ marginBottom:56 }}>
          <SectionHead>Claude's honest verdict</SectionHead>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }} className="verdict-grid">
            <div style={{ background:'var(--teal-lt)', borderRadius:14, border:'1px solid rgba(15,110,86,.2)', padding:'22px 24px' }}>
              <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--teal)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:16 }}>IIM A is genuinely best for</div>
              {d.verdict.best_for.map((b, i) => (
                <div key={i} style={{ display:'flex', gap:10, marginBottom:10, alignItems:'flex-start' }}>
                  <span style={{ color:'var(--teal)', flexShrink:0, fontWeight:700 }}>✓</span>
                  <div style={{ fontSize:13, color:'var(--ink2)', lineHeight:1.6 }}>{b}</div>
                </div>
              ))}
            </div>
            <div style={{ background:'#fdecea', borderRadius:14, border:'1px solid rgba(163,45,45,.15)', padding:'22px 24px' }}>
              <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'#a32d2d', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:16 }}>Watch out for</div>
              {d.verdict.watch_out.map((w, i) => (
                <div key={i} style={{ display:'flex', gap:10, marginBottom:10, alignItems:'flex-start' }}>
                  <span style={{ color:'#a32d2d', flexShrink:0, fontWeight:700 }}>!</span>
                  <div style={{ fontSize:13, color:'var(--ink2)', lineHeight:1.6 }}>{w}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }} className="verdict-grid">
            <div style={{ background:'var(--white)', borderRadius:14, border:'2px solid var(--teal)', padding:'20px 24px' }}>
              <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--teal)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:10 }}>Apply if</div>
              <p style={{ fontSize:14, color:'var(--ink2)', lineHeight:1.7, margin:0 }}>{d.verdict.apply_if}</p>
            </div>
            <div style={{ background:'var(--white)', borderRadius:14, border:'2px solid rgba(163,45,45,.3)', padding:'20px 24px' }}>
              <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'#a32d2d', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:10 }}>Consider alternatives if</div>
              <p style={{ fontSize:14, color:'var(--ink2)', lineHeight:1.7, margin:0 }}>{d.verdict.skip_if}</p>
            </div>
          </div>
        </div>

        {/* ── REVIEWS ── */}
        <div style={{ marginBottom:56 }}>
          <SectionHead>Student reviews</SectionHead>
          <div style={{ display:'grid', gridTemplateColumns:'200px 1fr', gap:20, marginBottom:20 }} className="reviews-grid">
            <div style={{ background:'var(--white)', borderRadius:14, border:'1px solid var(--border)', padding:'24px', textAlign:'center' }}>
              <div style={{ fontFamily:'var(--serif)', fontSize:'3rem', fontWeight:700, color:'var(--ink)', marginBottom:4 }}>{d.reviews.overall.toFixed(1)}</div>
              <div style={{ marginBottom:12, display:'flex', justifyContent:'center' }}><StarRating value={d.reviews.overall} /></div>
              <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--mono)' }}>Overall rating</div>
              <div style={{ marginTop:20, display:'flex', flexDirection:'column', gap:10 }}>
                {[
                  ['Placements', d.reviews.placements],
                  ['Academics', d.reviews.academics],
                  ['Campus', d.reviews.campus],
                  ['ROI', d.reviews.roi],
                ].map(([label, val]) => (
                  <div key={label}>
                    <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--muted)', marginBottom:4 }}>
                      <span>{label}</span><span style={{ fontFamily:'var(--mono)' }}>{val.toFixed(1)}</span>
                    </div>
                    <div style={{ height:4, background:'var(--cream2)', borderRadius:2, overflow:'hidden' }}>
                      <div style={{ height:'100%', width:`${(val/5)*100}%`, background:'var(--orange)', borderRadius:2 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {d.reviews.quotes.map((q, i) => (
                <div key={i} style={{ background:'var(--white)', borderRadius:12, border:'1px solid var(--border)', padding:'18px 20px', borderLeft:`3px solid ${i%2===0?'var(--orange)':'var(--teal)'}` }}>
                  <p style={{ fontSize:14, fontStyle:'italic', color:'var(--ink2)', lineHeight:1.7, margin:'0 0 10px 0' }}>"{q.text}"</p>
                  <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--muted)' }}>— {q.source}</div>
                </div>
              ))}
              <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--mono)', padding:'4px 8px' }}>
                Reviews compiled from Quora, PagalGuy, and MBA forums (2023-2025). Collvera has not verified individual claims.
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM CTA ── */}
        <div style={{ background:'var(--ink)', borderRadius:16, padding:'32px', textAlign:'center' }}>
          <div style={{ fontFamily:'var(--serif)', fontSize:'1.3rem', fontWeight:700, color:'#fff', marginBottom:8 }}>
            Check if IIM Ahmedabad is right for your profile
          </div>
          <p style={{ fontSize:13.5, color:'rgba(255,255,255,.5)', marginBottom:22, maxWidth:480, margin:'0 auto 22px', lineHeight:1.7 }}>
            Enter your percentile, category, and background. AI tells you your real conversion chance and what stands between you and a call.
          </p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/eligibility" style={{ background:'var(--orange)', color:'#fff', padding:'12px 24px', borderRadius:10, fontSize:13.5, fontWeight:600, textDecoration:'none' }}>
              Check my eligibility →
            </Link>
            <button onClick={() => setLeadOpen(true)} style={{ background:'rgba(255,255,255,.08)', color:'rgba(255,255,255,.7)', padding:'12px 24px', borderRadius:10, fontSize:13.5, border:'1px solid rgba(255,255,255,.15)', cursor:'pointer' }}>
              Talk to a counsellor
            </button>
            <Link href="/compare" style={{ background:'rgba(255,255,255,.08)', color:'rgba(255,255,255,.7)', padding:'12px 24px', borderRadius:10, fontSize:13.5, border:'1px solid rgba(255,255,255,.15)', textDecoration:'none' }}>
              Compare with another college
            </Link>
          </div>
        </div>
      </div>

      <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)} context="IIM Ahmedabad college page" />

      <style>{`
        @media(max-width:768px){
          .overview-grid, .placements-grid, .fees-grid, .admissions-grid,
          .campus-grid, .verdict-grid, .reviews-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
