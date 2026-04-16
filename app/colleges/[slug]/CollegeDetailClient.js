'use client'
import { useState } from 'react'
import Link from 'next/link'
import Nav from '../../../components/Nav'
import LeadModal from '../../../components/LeadModal'

// ── Helpers ──────────────────────────────────────────────────────────────────
const SECTIONS = [
  { id: 'overview',    label: 'Overview',          href: '' },
  { id: 'placements', label: 'Placements',         href: '/placements' },
  { id: 'fees',       label: 'Fees & Aid',         href: '/fees' },
  { id: 'admissions', label: 'Admissions',         href: '/admissions' },
  { id: 'programs',   label: 'Programs',           href: '/programs' },
  { id: 'campus',     label: 'Campus',             href: '/campus' },
  { id: 'alumni',     label: 'Alumni',             href: '/alumni' },
  { id: 'verdict',    label: "Claude's Verdict",   href: '/reviews' },
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

function FaqItem({ q, a, color }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:10, overflow:'hidden' }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ width:'100%', textAlign:'left', padding:'16px 20px', background:'none', border:'none', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', gap:16 }}>
        <span style={{ fontSize:14, fontWeight:600, color:'var(--ink)', lineHeight:1.5 }}>{q}</span>
        <span style={{ fontSize:18, color:color || 'var(--orange)', flexShrink:0, transition:'transform .2s', transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
      </button>
      {open && (
        <div style={{ padding:'0 20px 18px', fontSize:13.5, color:'var(--ink2)', lineHeight:1.75, borderTop:'1px solid var(--border2)' }}>
          <div style={{ paddingTop:14 }}>{a}</div>
        </div>
      )}
    </div>
  )
}

function SectionHead({ children }) {
  return (
    <h2 style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.12em', marginBottom:20, display:'flex', alignItems:'center', gap:12, fontWeight:500, margin:'0 0 20px 0' }}>
      {children}<span style={{ flex:1, height:1, background:'var(--border)' }} />
    </h2>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function CollegeDetailClient({ college }) {
  const [leadOpen, setLeadOpen] = useState(false)

  const data = college || null

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
              <h1 style={{ fontFamily:'var(--serif-display)', fontSize:'clamp(1.8rem,3.5vw,2.6rem)', fontWeight:700, color:'#fff', marginBottom:6, lineHeight:1.1 }}>{d.name}</h1>
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
              <Link key={s.id} href={`/colleges/${college?.slug || 'iim-ahmedabad'}${s.href}`}
                style={{ padding:'12px 18px', fontSize:12.5, fontFamily:'var(--mono)', cursor:'pointer', border:'none', background:'transparent', color:'rgba(255,255,255,.35)', borderBottom:'2px solid transparent', whiteSpace:'nowrap', transition:'all .15s', textDecoration:'none', display:'block' }}>
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1100, margin:'0 auto', padding:'40px 24px 80px' }}>


        {/* ── SUB-PAGE DEEP DIVE LINKS ── */}
        <div style={{ background:'var(--white)', borderRadius:14, border:'1px solid var(--border)', padding:'20px 24px', marginBottom:32 }}>
          <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:14 }}>Deep dive — full guides for each section</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(155px,1fr))', gap:10 }}>
            {[
              { label:'💰 Fees & ROI', sub:'Breakdown, loans, ROI', href:'fees' },
              { label:'📊 Placements', sub:'Report, sectors, recruiters', href:'placements' },
              { label:'🎯 Admissions', sub:'Cutoff, process, profile', href:'admissions' },
              { label:'🏛️ Campus', sub:'Hostels, clubs, life', href:'campus' },
              { label:'🎓 Alumni', sub:'Notable graduates', href:'alumni' },
              { label:'📚 Programs', sub:'PGP, PGPX, FABM, FPM', href:'programs' },
              { label:'⭐ Reviews', sub:'Honest student feedback', href:'reviews' },
            ].map(item => (
              <Link key={item.href} href={`/colleges/${d.slug}/${item.href}`}
                style={{ textDecoration:'none', background:'var(--cream)', borderRadius:10, padding:'14px', border:'1px solid var(--border2)', display:'block', transition:'all .2s' }}
                onMouseOver={e => { e.currentTarget.style.borderColor='var(--orange)'; e.currentTarget.style.transform='translateY(-2px)' }}
                onMouseOut={e => { e.currentTarget.style.borderColor='var(--border2)'; e.currentTarget.style.transform='none' }}>
                <div style={{ fontSize:13.5, fontWeight:600, color:'var(--ink)', marginBottom:3 }}>{item.label}</div>
                <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--mono)' }}>{item.sub}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── OVERVIEW ── */}
        <div id="overview" style={{ marginBottom:56 }}>
          <SectionHead>{d.name} Overview — Rankings, Accreditations &amp; Quick Facts</SectionHead>
          <div style={{ background:'var(--white)', borderRadius:14, border:'1px solid var(--border)', padding:'24px 28px', marginBottom:16 }}>
            <p style={{ fontSize:15, lineHeight:1.85, color:'var(--ink2)', margin:0 }}>{d.tagline}</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }} className="overview-grid">
            {/* Rankings */}
            <div style={{ background:'var(--white)', borderRadius:14, border:'1px solid var(--border)', padding:'22px 24px' }}>
              <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:16 }}>Rankings 2025</div>
              {d.rankings?.map((r, i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'9px 0', borderBottom: i < (d.rankings?.length || 0)-1 ? '1px solid var(--border2)' : 'none' }}>
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
                ['Programs', d.programs?.map(p=>p.name).join(' · ')],
                ['Website', d.slug === 'iim-bangalore' ? 'iimb.ac.in' : 'iima.ac.in'],
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
          <SectionHead>{d.name} Placements 2025 — Average Package, Sectors &amp; Top Recruiters</SectionHead>

          {/* Numbers grid */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))', gap:10, marginBottom:20 }}>
            {[
              { label:'Avg Package', value:`₹${d.placements.avg || d.placements.avg_pgpm || '—'} LPA`, color:d.color },
              { label:'Median Package', value:`₹${d.placements.median || d.placements.median_nirf || '—'} LPA`, color:d.color },
              { label:'Highest (Domestic)', value:`₹${d.placements.highest || d.placements.highest_pgpm || '—'} LPA`, color:'#d95f02' },
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
              {d.placements.sectors?.map((s, i) => (
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
                  {d.placements.recruiters?.map((r, i) => (
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

          {/* Long-form placements content */}
          {d.placements?.content && (
            <div className="prose-content" dangerouslySetInnerHTML={{ __html: d.placements.content }} />
          )}
        </div>

        {/* ── FEES ── */}
        <div id="fees" style={{ marginBottom:56 }}>
          <SectionHead>{d.name} Fees 2025 — Total Cost, Scholarships &amp; Education Loans</SectionHead>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }} className="fees-grid">
            {/* Fee breakdown */}
            <div style={{ background:'var(--white)', borderRadius:14, border:'1px solid var(--border)', padding:'22px 24px' }}>
              <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:18 }}>PGP 2025-27 fee breakdown</div>
              {[
                { label:'Tuition fee', amount:`₹${d.fees?.tuition || d.fees?.tuition_pgdm || '—'} L` },
                { label:'Library, computing, materials', amount:`₹${d.fees?.other || '—'} L` },
                { label:'Total programme fee', amount:`₹${d.fees?.total || d.fees?.total_pgdm || '—'} L`, bold:true },
                { label:'Monthly living (on-campus)', amount:d.fees?.living_monthly || '—' },
                { label:'Education loan available', amount:d.fees?.loan_max || 'Available' },
                { label:'Loan interest rate', amount:d.fees?.loan_rate || '9.5–12%' },
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
              {d.fees.scholarships?.map((s, i) => (
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

          {/* Long-form fees content */}
          {d.fees?.content && (
            <div className="prose-content" dangerouslySetInnerHTML={{ __html: d.fees.content }} />
          )}
        </div>

        {/* ── ADMISSIONS ── */}
        <div id="admissions" style={{ marginBottom:56 }}>
          <SectionHead>{d.name} Admission 2026 — CAT Cutoff, Selection Process &amp; Batch Profile</SectionHead>
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
              {d.admissions.shortlist_weights?.map((w, i) => (
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
              {d.admissions.final_weights?.map((w, i) => (
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
                { label:'Batch size', value:`${d.admissions?.batch?.size} students` },
                { label:'Female students', value:`${d.admissions?.batch?.female}%` },
                { label:'Engineers', value:`${d.admissions?.batch?.engineering}%` },
                { label:'With work exp', value:`${d.admissions?.batch?.work_exp_pct}%` },
                { label:'Avg work exp', value:`${d.admissions?.batch?.avg_work_months} months` },
              ].map((s, i) => (
                <div key={i} style={{ textAlign:'center', padding:'16px', background:'var(--cream)', borderRadius:10 }}>
                  <div style={{ fontFamily:'var(--serif)', fontSize:'1.4rem', fontWeight:700, color:'var(--ink)', marginBottom:4 }}>{s.value}</div>
                  <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--mono)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Long-form admissions content */}
          {d.admissions?.content && (
            <div className="prose-content" dangerouslySetInnerHTML={{ __html: d.admissions.content }} />
          )}
        </div>

        {/* ── PROGRAMS ── */}
        <div id="programs" style={{ marginBottom:56 }}>
          <SectionHead>{d.name} Programs — All Programmes, Fees &amp; Eligibility</SectionHead>
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
                {d.programs?.map((p, i) => (
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
          <SectionHead>{d.name} Campus — Architecture, Hostels &amp; Student Life</SectionHead>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }} className="campus-grid">
            <div style={{ background:'var(--white)', borderRadius:14, border:'1px solid var(--border)', padding:'22px 24px' }}>
              <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:18 }}>Campus facts</div>
              {[
                ['Area', d.campus?.area],
                ['Dormitories', `${d.campus?.dorms} dorms · ${d.campus?.dorm_capacity} students`],
                ['Architecture', d.campus?.architect],
                ['Heritage', d.campus?.heritage],
                ['Student clubs', `${d.campus?.clubs}+ active clubs`],
              ].map(([k,v]) => (
                <div key={k} style={{ display:'grid', gridTemplateColumns:'120px 1fr', gap:10, padding:'9px 0', borderBottom:'1px solid var(--border2)', alignItems:'start' }}>
                  <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase' }}>{k}</div>
                  <div style={{ fontSize:13, color:'var(--ink2)' }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ background:'var(--white)', borderRadius:14, border:'1px solid var(--border)', padding:'22px 24px' }}>
              <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:18 }}>Life highlights</div>
              {d.campus.highlights?.map((h, i) => (
                <div key={i} style={{ display:'flex', gap:10, marginBottom:12, alignItems:'flex-start' }}>
                  <div style={{ width:6, height:6, borderRadius:'50%', background:d.color, flexShrink:0, marginTop:6 }} />
                  <div style={{ fontSize:13, color:'var(--ink2)', lineHeight:1.6 }}>{h}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Long-form campus content */}
          {d.campus?.content && (
            <div className="prose-content" dangerouslySetInnerHTML={{ __html: d.campus.content }} />
          )}
        </div>

        {/* ── ALUMNI ── */}
        <div id="alumni" style={{ marginBottom:56 }}>
          <SectionHead>{d.name} Notable Alumni — Leaders, Founders &amp; Global Icons</SectionHead>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:10 }}>
            {d.alumni?.map((a, i) => (
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
          <SectionHead>Is {d.name} Worth It? — Honest Pros, Cons &amp; Who Should Apply</SectionHead>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }} className="verdict-grid">
            <div style={{ background:'var(--teal-lt)', borderRadius:14, border:'1px solid rgba(15,110,86,.2)', padding:'22px 24px' }}>
              <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--teal)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:16 }}>IIM A is genuinely best for</div>
              {d.verdict.best_for?.map((b, i) => (
                <div key={i} style={{ display:'flex', gap:10, marginBottom:10, alignItems:'flex-start' }}>
                  <span style={{ color:'var(--teal)', flexShrink:0, fontWeight:700 }}>✓</span>
                  <div style={{ fontSize:13, color:'var(--ink2)', lineHeight:1.6 }}>{b}</div>
                </div>
              ))}
            </div>
            <div style={{ background:'#fdecea', borderRadius:14, border:'1px solid rgba(163,45,45,.15)', padding:'22px 24px' }}>
              <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'#a32d2d', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:16 }}>Watch out for</div>
              {d.verdict.watch_out?.map((w, i) => (
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
              <p style={{ fontSize:14, color:'var(--ink2)', lineHeight:1.7, margin:0 }}>{d.verdict?.apply_if}</p>
            </div>
            <div style={{ background:'var(--white)', borderRadius:14, border:'2px solid rgba(163,45,45,.3)', padding:'20px 24px' }}>
              <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'#a32d2d', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:10 }}>Consider alternatives if</div>
              <p style={{ fontSize:14, color:'var(--ink2)', lineHeight:1.7, margin:0 }}>{d.verdict?.skip_if}</p>
            </div>
          </div>

          {/* Long-form verdict content */}
          {d.verdict?.content && (
            <div className="prose-content" dangerouslySetInnerHTML={{ __html: d.verdict.content }} />
          )}
        </div>

        {/* ── REVIEWS ── */}
        <div style={{ marginBottom:56 }}>
          <SectionHead>{d.name} Student Reviews — Academics, Placements &amp; Campus Life</SectionHead>
          <div style={{ display:'grid', gridTemplateColumns:'200px 1fr', gap:20, marginBottom:20 }} className="reviews-grid">
            <div style={{ background:'var(--white)', borderRadius:14, border:'1px solid var(--border)', padding:'24px', textAlign:'center' }}>
              <div style={{ fontFamily:'var(--serif)', fontSize:'3rem', fontWeight:700, color:'var(--ink)', marginBottom:4 }}>{(d.reviews?.overall ?? 0).toFixed(1)}</div>
              <div style={{ marginBottom:12, display:'flex', justifyContent:'center' }}><StarRating value={d.reviews?.overall} /></div>
              <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--mono)' }}>Overall rating</div>
              <div style={{ marginTop:20, display:'flex', flexDirection:'column', gap:10 }}>
                {[
                  ['Placements', d.reviews?.placements ?? d.reviews?.breakdown?.placements],
                  ['Academics', d.reviews?.academics ?? d.reviews?.breakdown?.faculty],
                  ['Campus', d.reviews?.campus ?? d.reviews?.breakdown?.campus_life],
                  ['ROI', d.reviews?.roi ?? d.reviews?.breakdown?.roi],
                ].map(([label, val]) => (
                  <div key={label}>
                    <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--muted)', marginBottom:4 }}>
                      <span>{label}</span><span style={{ fontFamily:'var(--mono)' }}>{val?.toFixed(1) ?? "—"}</span>
                    </div>
                    <div style={{ height:4, background:'var(--cream2)', borderRadius:2, overflow:'hidden' }}>
                      <div style={{ height:'100%', width:`${(val/5)*100}%`, background:'var(--orange)', borderRadius:2 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {d.reviews.quotes?.map((q, i) => (
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

          {/* Long-form reviews content */}
          {d.reviews?.content && (
            <div className="prose-content" dangerouslySetInnerHTML={{ __html: d.reviews.content }} />
          )}
        </div>

        {/* ── FAQs ── */}
        {d.faqs?.length > 0 && (
          <div style={{ marginBottom:56 }}>
            <SectionHead>Frequently Asked Questions — {d.short || d.name}</SectionHead>
            <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
              {d.faqs?.map((faq, i) => (
                <FaqItem key={i} q={faq.q} a={faq.a} color={d.color} />
              ))}
            </div>
          </div>
        )}

        {/* Internal links for SEO */}
        <div style={{ marginBottom:32, padding:'20px 24px', background:'var(--white)', borderRadius:14, border:'1px solid var(--border)' }}>
          <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.12em', marginBottom:16 }}>Explore more</div>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            {[
              { label:'IIM A vs IIM B — AI comparison', href:'/compare?a=iim-ahmedabad&b=iim-bangalore' },
              { label:'Colleges for 99 percentile CAT', href:'/blog/colleges-for-99-percentile-cat-2025' },
              { label:'Check your IIM A eligibility', href:'/eligibility' },
              { label:'MBA ROI rankings', href:'/rankings' },
              { label:'CAT 2026 preparation guide', href:'/blog/cat-2026-preparation-guide-april-november' },
              { label:'IIM Ahmedabad vs FMS Delhi', href:'/compare?a=iim-ahmedabad&b=fms-delhi' },
            ].map((l, i) => (
              <Link key={i} href={l.href} style={{ fontSize:12.5, color:'var(--orange)', textDecoration:'none', background:'var(--orange-lt)', padding:'6px 14px', borderRadius:20, border:'1px solid rgba(217,95,2,.15)', fontWeight:500 }}
                onMouseOver={e => e.currentTarget.style.background='rgba(217,95,2,.15)'}
                onMouseOut={e => e.currentTarget.style.background='var(--orange-lt)'}>
                {l.label} →
              </Link>
            ))}
          </div>
        </div>

        {/* ── BOTTOM CTA ── */}
        <div style={{ background:'var(--ink)', borderRadius:16, padding:'32px', textAlign:'center' }}>
          <div style={{ fontFamily:'var(--serif)', fontSize:'1.3rem', fontWeight:700, color:'#fff', marginBottom:8 }}>
            Check if {d.name} is right for your profile
          </div>
          <p style={{ fontSize:13.5, color:'rgba(255,255,255,.5)', marginBottom:22, maxWidth:480, margin:'0 auto 22px', lineHeight:1.7 }}>
            Enter your percentile and background. Claude shows your real conversion chance at {d.name} and what stands between you and a call.
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

      <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)} context={`${d.name} college page`} />

      <style>{`
        @media(max-width:768px){
          .overview-grid, .placements-grid, .fees-grid, .admissions-grid,
          .campus-grid, .verdict-grid, .reviews-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .prose-content {
          margin-top: 28px;
          padding: 28px 32px;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 14px;
          font-size: 14.5px;
          line-height: 1.85;
          color: var(--ink2);
        }
        .prose-content h2 {
          font-family: var(--serif-display);
          font-size: 1.45rem;
          font-weight: 700;
          color: var(--ink);
          margin: 0 0 18px 0;
          line-height: 1.3;
        }
        .prose-content h3 {
          font-family: var(--serif);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--ink);
          margin: 28px 0 12px 0;
          padding-top: 8px;
          border-top: 1px solid var(--border2);
        }
        .prose-content p {
          margin: 0 0 16px 0;
        }
        .prose-content strong {
          color: var(--ink);
          font-weight: 600;
        }
        @media(max-width:768px){
          .prose-content {
            padding: 20px 18px;
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  )
}
