'use client'
import { useState, useMemo, useRef } from 'react'
import Link from 'next/link'
import Nav from '../../components/Nav'
import LeadModal from '../../components/LeadModal'

const fmt = {
  fees: n => n ? `₹${n >= 10e5 ? Math.round(n/1e5) : (n/1e5).toFixed(1)}L` : null,
  pkg:  n => n ? `₹${(n/1e5).toFixed(1)} LPA` : null,
  cut:  n => n ? `${n}%ile` : null,
}

const NCR = ['New Delhi','Gurugram','Ghaziabad']

const CITIES = [
  { label:'Delhi NCR',  cities:NCR,              emoji:'🏛️' },
  { label:'Mumbai',     cities:['Mumbai'],        emoji:'🌊' },
  { label:'Bengaluru',  cities:['Bengaluru'],     emoji:'💻' },
  { label:'Chennai',    cities:['Chennai'],       emoji:'🌴' },
  { label:'Kolkata',    cities:['Kolkata'],       emoji:'🏙️' },
  { label:'Ahmedabad',  cities:['Ahmedabad'],     emoji:'🔶' },
  { label:'Hyderabad',  cities:['Hyderabad'],     emoji:'💎' },
  { label:'Pune',       cities:['Pune'],          emoji:'🎓' },
  { label:'Jamshedpur', cities:['Jamshedpur'],    emoji:'⚙️' },
  { label:'Lucknow',    cities:['Lucknow'],       emoji:'🕌' },
]

const FEE_BRACKETS = [
  { label:'Under ₹5L',   color:'#16a34a', max:500000 },
  { label:'₹5L – ₹15L', color:'#0ea5e9', min:500000,  max:1500000 },
  { label:'₹15L – ₹25L',color:'#f59e0b', min:1500000, max:2500000 },
  { label:'Above ₹25L', color:'#ef4444', min:2500000 },
]

const CATEGORY_PILLS = [
  { label:'Finance',    tag:'Finance' },
  { label:'Consulting', tag:'Consulting' },
  { label:'Marketing',  tag:'Marketing' },
  { label:'HR',         tag:'HR' },
  { label:'Analytics',  tag:'Analytics' },
  { label:'Tech & PM',  tag:'Tech' },
  { label:'FMCG',       tag:'FMCG' },
]

const TRIVIA = [
  { stat:'₹2.43L', desc:'FMS Delhi fees — gives ₹34 LPA avg. Best ROI in Indian MBA.' },
  { stat:'22',     desc:'Overseas offers at IIM B in 2025 — highest among all IIMs.' },
  { stat:'2.52x',  desc:"SOIL's ROI in 2022 — post-MBA salary more than doubled." },
]

function classifyQuery(q, colleges) {
  const lo = q.toLowerCase().trim()
  if (!lo) return null
  const cityMap = {
    'delhi ncr':NCR,'ncr':NCR,'delhi':NCR,
    'mumbai':['Mumbai'],'bombay':['Mumbai'],
    'bangalore':['Bengaluru'],'bengaluru':['Bengaluru'],
    'chennai':['Chennai'],'kolkata':['Kolkata'],
    'ahmedabad':['Ahmedabad'],'hyderabad':['Hyderabad'],
    'pune':['Pune'],'gurgaon':['Gurugram'],'gurugram':['Gurugram'],
    'jamshedpur':['Jamshedpur'],'lucknow':['Lucknow'],
  }
  const tagMap = {
    'hr':'HR','human resource':'HR','finance':'Finance','banking':'Finance',
    'marketing':'Marketing','fmcg':'FMCG','consulting':'Consulting',
    'strategy':'Consulting','analytics':'Analytics','data':'Analytics',
    'tech':'Tech','product':'Tech','startup':'Startups',
  }
  if (/1.?year|one.?year|executive|pgpm/.test(lo))
    return { label:'1-Year & Executive MBA', results:colleges.filter(c=>c.work_exp_required||c.work_exp_preferred) }
  if (/roi|cheapest|affordable|best value|low fee|value for money/.test(lo))
    return { label:'Best Value MBAs', results:[...colleges].filter(c=>c.min_fees).sort((a,b)=>a.min_fees-b.min_fees) }
  if (/^(top|best|rank|premier|iim)/.test(lo))
    return { label:'Top Ranked Colleges', results:[...colleges].sort((a,b)=>(a.nirf_rank||999)-(b.nirf_rank||999)).slice(0,12) }
  const feeM = lo.match(/under\s*[₹rs]*\s*(\d+)/)
  if (feeM) {
    const cap = parseInt(feeM[1])*1e5
    return { label:`MBA Under ₹${feeM[1]}L`, results:colleges.filter(c=>c.min_fees&&c.min_fees<=cap).sort((a,b)=>a.min_fees-b.min_fees) }
  }
  for (const [kw,cities] of Object.entries(cityMap)) {
    if (lo.includes(kw)) return { label:`MBA in ${kw.charAt(0).toUpperCase()+kw.slice(1)}`, results:colleges.filter(c=>cities.some(ci=>c.city?.includes(ci))) }
  }
  for (const [kw,tag] of Object.entries(tagMap)) {
    if (lo.includes(kw)) return { label:`Top Colleges for ${tag}`, results:colleges.filter(c=>c.tags?.includes(tag)) }
  }
  const hits = colleges.filter(c=>c.name.toLowerCase().includes(lo)||c.slug.includes(lo.replace(/\s+/g,'-')))
  return { label:`Results for "${q}"`, results:hits }
}

// ── Section divider ───────────────────────────────────────────────────────────
function Divider({ label }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:16, margin:'52px 0 0' }}>
      <div style={{ flex:1, height:1, background:'var(--border)' }} />
      <span style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.14em', whiteSpace:'nowrap' }}>{label}</span>
      <div style={{ flex:1, height:1, background:'var(--border)' }} />
    </div>
  )
}

// ── Rank badge ────────────────────────────────────────────────────────────────
function RankBadge({ rank, color }) {
  if (rank && rank <= 60)
    return <span style={{ fontFamily:'var(--mono)', fontSize:11, fontWeight:700, color, background:`${color}15`, padding:'3px 8px', borderRadius:20, border:`1px solid ${color}30` }}>#{rank} NIRF</span>
  return <span style={{ fontFamily:'var(--mono)', fontSize:11, fontWeight:700, color:'#6d28d9', background:'#f5f3ff', padding:'3px 8px', borderRadius:20, border:'1px solid rgba(109,40,217,.2)' }}>✦ Collvera Pick</span>
}

// ── College card ──────────────────────────────────────────────────────────────
function CollegeCard({ c }) {
  const color = c.color || '#d95f02'
  const fees  = fmt.fees(c.min_fees)
  const pkg   = fmt.pkg(c.avg_package)
  const cut   = fmt.cut(c.cat_cutoff)
  return (
    <Link href={`/colleges/${c.slug}`}
      style={{ textDecoration:'none', display:'flex', flexDirection:'column', background:'var(--white)', border:'1px solid var(--border)', borderRadius:14, overflow:'hidden', transition:'transform .15s, box-shadow .15s', height:'100%' }}
      onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,.09)' }}
      onMouseLeave={e=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none' }}>
      <div style={{ height:4, background:color, flexShrink:0 }} />
      <div style={{ padding:'18px 20px 20px', display:'flex', flexDirection:'column', flex:1 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
          <RankBadge rank={c.nirf_rank} color={color} />
          <span style={{ fontFamily:'var(--mono)', fontSize:10, color:'var(--muted)', background:'var(--cream)', padding:'3px 8px', borderRadius:20, border:'1px solid var(--border)' }}>
            {c.tier===1 ? 'Premier' : c.tier===2 ? 'Top Private' : 'Regional'}
          </span>
        </div>
        <div style={{ fontSize:15, fontWeight:700, color:'var(--ink)', lineHeight:1.3, marginBottom:3 }}>{c.name}</div>
        <div style={{ fontSize:11.5, color:'var(--muted)', fontFamily:'var(--mono)', marginBottom:16 }}>📍 {c.city}, {c.state}</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6, marginBottom:14 }}>
          {[{l:'Avg Pkg',v:pkg},{l:'Fees',v:fees},{l:'CAT',v:cut}].map(s=>(
            <div key={s.l} style={{ background:'var(--cream)', borderRadius:8, padding:'8px 6px', textAlign:'center' }}>
              <div style={{ fontSize:12.5, fontWeight:700, color:s.v?'var(--ink)':'var(--muted)', marginBottom:2, whiteSpace:'nowrap' }}>{s.v||'—'}</div>
              <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.06em' }}>{s.l}</div>
            </div>
          ))}
        </div>
        {c.verdict && (
          <p style={{ fontSize:12.5, color:'var(--ink2)', lineHeight:1.6, margin:'0 0 14px', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{c.verdict}</p>
        )}
        <div style={{ marginTop:'auto', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <span style={{ fontSize:13, fontWeight:600, color }}>View College →</span>
          <div style={{ display:'flex', gap:4 }}>
            {c.tags?.slice(0,2).map(t=>(
              <span key={t} style={{ fontSize:9.5, fontFamily:'var(--mono)', color:'var(--muted)', background:'var(--cream)', padding:'2px 6px', borderRadius:20, border:'1px solid var(--border)' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

// ── Horizontal scroll section ─────────────────────────────────────────────────
function ScrollSection({ title, sub, colleges, seeAllQuery, onSearch }) {
  if (!colleges.length) return null
  return (
    <div style={{ marginTop:28 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:14 }}>
        <div>
          <h2 style={{ fontFamily:'var(--serif)', fontSize:'1.2rem', fontWeight:700, color:'var(--ink)', margin:0 }}>{title}</h2>
          {sub && <p style={{ fontSize:12, color:'var(--muted)', margin:'3px 0 0', fontFamily:'var(--mono)' }}>{sub}</p>}
        </div>
        {seeAllQuery && (
          <button onClick={()=>onSearch(seeAllQuery)} style={{ fontSize:12, color:'var(--orange)', background:'none', border:'none', cursor:'pointer', fontFamily:'var(--mono)', whiteSpace:'nowrap' }}>See all →</button>
        )}
      </div>
      <div style={{ display:'flex', gap:14, overflowX:'auto', paddingBottom:6, scrollbarWidth:'none' }}>
        {colleges.map(c=>(
          <div key={c.id} style={{ flexShrink:0, width:272 }}><CollegeCard c={c} /></div>
        ))}
      </div>
    </div>
  )
}

// ── Card grid ─────────────────────────────────────────────────────────────────
function CardGrid({ colleges }) {
  if (!colleges.length) return (
    <div style={{ textAlign:'center', padding:'40px', background:'var(--white)', borderRadius:12, border:'1px solid var(--border)' }}>
      <p style={{ color:'var(--muted)', fontSize:14, margin:0 }}>No colleges found for this selection.</p>
    </div>
  )
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(272px,1fr))', gap:16 }}>
      {colleges.map(c=><CollegeCard key={c.id} c={c} />)}
    </div>
  )
}

// ── Filter result box (inline, page stays intact) ─────────────────────────────
function FilterResultBox({ label, count, colleges, onClear }) {
  return (
    <div style={{ marginTop:20, padding:'20px 22px 24px', background:'var(--white)', border:'2px solid var(--orange)', borderRadius:14 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18 }}>
        <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--orange)', flexShrink:0 }} />
        <h3 style={{ fontFamily:'var(--serif)', fontSize:'1.1rem', fontWeight:700, color:'var(--ink)', margin:0 }}>{label}</h3>
        <span style={{ fontSize:11.5, fontFamily:'var(--mono)', color:'var(--muted)' }}>{count} colleges</span>
        <button onClick={onClear} style={{ marginLeft:'auto', fontSize:11.5, color:'var(--orange)', background:'none', border:'1px solid rgba(217,95,2,.3)', borderRadius:20, padding:'3px 10px', cursor:'pointer', fontFamily:'var(--mono)' }}>Clear ✕</button>
      </div>
      <CardGrid colleges={colleges} />
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function CollegesClient({ initialColleges }) {
  const [leadOpen,     setLeadOpen]     = useState(false)
  const [query,        setQuery]        = useState('')
  const [activeCity,   setActiveCity]   = useState(null)
  const [activeBudget, setActiveBudget] = useState(null)
  const [activeTag,    setActiveTag]    = useState(null)
  const [active1yr,    setActive1yr]    = useState(false)

  const cityRef   = useRef(null)
  const budgetRef = useRef(null)
  const tagRef    = useRef(null)
  const yr1Ref    = useRef(null)

  const sorted  = useMemo(()=>[...initialColleges].sort((a,b)=>(a.nirf_rank||999)-(b.nirf_rank||999)), [initialColleges])
  const searched = useMemo(()=>query ? classifyQuery(query, initialColleges) : null, [query, initialColleges])

  function pickCity(city) {
    setActiveCity(prev => prev?.label===city.label ? null : city)
    setTimeout(()=>cityRef.current?.scrollIntoView({ behavior:'smooth', block:'start' }), 60)
  }
  function pickBudget(b) {
    setActiveBudget(prev => prev?.label===b.label ? null : b)
    setTimeout(()=>budgetRef.current?.scrollIntoView({ behavior:'smooth', block:'start' }), 60)
  }
  function pickTag(tag) {
    setActiveTag(prev => prev===tag ? null : tag)
    setTimeout(()=>tagRef.current?.scrollIntoView({ behavior:'smooth', block:'start' }), 60)
  }
  function toggle1yr() {
    setActive1yr(prev => !prev)
    setTimeout(()=>yr1Ref.current?.scrollIntoView({ behavior:'smooth', block:'start' }), 60)
  }
  function doSearch(q) { setQuery(q) }

  const cityColleges   = useMemo(()=>sorted.filter(c=>activeCity?.cities.some(ci=>c.city?.includes(ci))), [sorted, activeCity])
  const budgetColleges = useMemo(()=>sorted.filter(c=>{ const f=c.min_fees||0; return (!activeBudget?.min||f>=activeBudget.min)&&(!activeBudget?.max||f<activeBudget.max) }), [sorted, activeBudget])
  const tagColleges    = useMemo(()=>sorted.filter(c=>c.tags?.includes(activeTag)), [sorted, activeTag])
  const yr1Colleges    = useMemo(()=>sorted.filter(c=>c.work_exp_required||c.work_exp_preferred), [sorted])
  const valueColleges  = useMemo(()=>[...initialColleges].filter(c=>c.min_fees).sort((a,b)=>a.min_fees-b.min_fees).slice(0,6), [initialColleges])

  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)' }}>
      <Nav onLeadOpen={()=>setLeadOpen(true)} />

      {/* HERO */}
      <div style={{ background:'var(--ink)', padding:'52px 24px 44px' }}>
        <div style={{ maxWidth:680, margin:'0 auto', textAlign:'center' }}>
          <p style={{ fontSize:11, fontFamily:'var(--mono)', color:'rgba(255,255,255,.28)', letterSpacing:'.18em', textTransform:'uppercase', marginBottom:12 }}>Collvera · India MBA · 2026</p>
          <h1 style={{ fontFamily:'var(--serif)', fontSize:'clamp(2.2rem,5vw,3.2rem)', fontWeight:700, color:'#fff', lineHeight:1.05, marginBottom:10 }}>Find Your MBA</h1>
          <p style={{ fontSize:14.5, color:'rgba(255,255,255,.38)', lineHeight:1.75, marginBottom:28, maxWidth:440, margin:'0 auto 28px' }}>
            Search by college name, city, career goal, or budget.
          </p>
          <div style={{ position:'relative', maxWidth:580, margin:'0 auto' }}>
            <span style={{ position:'absolute', left:16, top:'50%', transform:'translateY(-50%)', fontSize:16, pointerEvents:'none' }}>🔍</span>
            <input value={query} onChange={e=>setQuery(e.target.value)}
              placeholder='Try "top MBA in Delhi", "best for HR", "under 15 lakhs"...'
              style={{ width:'100%', paddingLeft:46, paddingRight:query?46:16, height:52, borderRadius:14, border:'2px solid rgba(255,255,255,.14)', background:'rgba(255,255,255,.08)', color:'#fff', fontSize:14, boxSizing:'border-box', outline:'none', transition:'border-color .2s' }}
              onFocus={e=>e.target.style.borderColor='var(--orange)'}
              onBlur={e=>e.target.style.borderColor='rgba(255,255,255,.14)'} />
            {query && <button onClick={()=>setQuery('')} style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'rgba(255,255,255,.4)', fontSize:18, cursor:'pointer', lineHeight:1 }}>✕</button>}
          </div>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', justifyContent:'center', marginTop:14 }}>
            {['Top IIMs','Delhi NCR','Under ₹15L','1-Year MBA','Best for Finance','Best ROI'].map(s=>(
              <button key={s} onClick={()=>doSearch(s)}
                style={{ fontSize:12, padding:'5px 13px', borderRadius:20, border:'1px solid rgba(255,255,255,.16)', background:'rgba(255,255,255,.07)', color:'rgba(255,255,255,.55)', cursor:'pointer', fontFamily:'var(--mono)', transition:'all .15s' }}
                onMouseEnter={e=>{ e.currentTarget.style.background='rgba(255,255,255,.13)'; e.currentTarget.style.color='#fff' }}
                onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,.07)'; e.currentTarget.style.color='rgba(255,255,255,.55)' }}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1100, margin:'0 auto', padding:'40px 24px 80px' }}>

        {/* SEARCH RESULTS */}
        {searched ? (
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:24 }}>
              <h2 style={{ fontFamily:'var(--serif)', fontSize:'1.35rem', fontWeight:700, color:'var(--ink)', margin:0 }}>{searched.label}</h2>
              <span style={{ fontSize:12, fontFamily:'var(--mono)', color:'var(--muted)' }}>{searched.results.length} colleges</span>
              <button onClick={()=>setQuery('')} style={{ marginLeft:'auto', fontSize:12, color:'var(--orange)', background:'none', border:'none', cursor:'pointer' }}>← Browse all</button>
            </div>
            <CardGrid colleges={searched.results} />
          </div>
        ) : (
          <>
            {/* ── SECTION 1: CATEGORY FILTER + TOP RANKED ── */}
            <div style={{ marginBottom:0 }}>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:24 }}>
                {CATEGORY_PILLS.map(p=>(
                  <button key={p.tag} onClick={()=>pickTag(p.tag)}
                    style={{ fontSize:12.5, padding:'7px 16px', borderRadius:20, border:`1.5px solid ${activeTag===p.tag ? 'var(--orange)' : 'var(--border)'}`, background:activeTag===p.tag ? 'var(--orange)' : 'var(--white)', color:activeTag===p.tag ? '#fff' : 'var(--ink2)', cursor:'pointer', fontWeight:500, transition:'all .15s', whiteSpace:'nowrap' }}>
                    {p.label}
                  </button>
                ))}
                <button onClick={toggle1yr}
                  style={{ fontSize:12.5, padding:'7px 16px', borderRadius:20, border:`1.5px solid ${active1yr ? 'var(--orange)' : 'var(--border)'}`, background:active1yr ? 'var(--orange)' : 'var(--white)', color:active1yr ? '#fff' : 'var(--ink2)', cursor:'pointer', fontWeight:500, transition:'all .15s', whiteSpace:'nowrap' }}>
                  1-Year MBA
                </button>
              </div>

              {/* Category results box — inline, rest of page stays */}
              <div ref={tagRef}>
                {activeTag && (
                  <FilterResultBox
                    label={`Top Colleges for ${activeTag}`}
                    count={tagColleges.length}
                    colleges={tagColleges}
                    onClear={()=>setActiveTag(null)}
                  />
                )}
              </div>
              <div ref={yr1Ref}>
                {active1yr && (
                  <FilterResultBox
                    label="1-Year & Executive MBA Programs"
                    count={yr1Colleges.length}
                    colleges={yr1Colleges}
                    onClear={()=>setActive1yr(false)}
                  />
                )}
              </div>
            </div>

            <Divider label="Top ranked" />
            <ScrollSection title="Top Ranked Colleges" sub="Sorted by NIRF 2025 ranking"
              colleges={sorted.slice(0,8)} seeAllQuery="top ranked colleges" onSearch={doSearch} />

            {/* ── SECTION 2: CITIES ── */}
            <Divider label="Browse by city" />
            <div style={{ marginTop:24 }}>
              <h2 style={{ fontFamily:'var(--serif)', fontSize:'1.2rem', fontWeight:700, color:'var(--ink)', marginBottom:4 }}>Browse by City</h2>
              <p style={{ fontSize:12, color:'var(--muted)', marginBottom:16, fontFamily:'var(--mono)' }}>Click a city — colleges appear below. Click again to deselect.</p>
              <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                {CITIES.map(city=>{
                  const count = initialColleges.filter(c=>city.cities.some(ci=>c.city?.includes(ci))).length
                  if (!count) return null
                  const isAct = activeCity?.label===city.label
                  return (
                    <button key={city.label} onClick={()=>pickCity(city)}
                      style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 16px', borderRadius:12, border:`1.5px solid ${isAct ? 'var(--orange)' : 'var(--border)'}`, background:isAct ? 'var(--orange)' : 'var(--white)', cursor:'pointer', transition:'all .15s', whiteSpace:'nowrap' }}>
                      <span style={{ fontSize:18 }}>{city.emoji}</span>
                      <div style={{ textAlign:'left' }}>
                        <div style={{ fontSize:13, fontWeight:600, color:isAct ? '#fff' : 'var(--ink)', lineHeight:1.2 }}>{city.label}</div>
                        <div style={{ fontSize:10.5, fontFamily:'var(--mono)', color:isAct ? 'rgba(255,255,255,.7)' : 'var(--muted)' }}>{count} college{count>1?'s':''}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* City results — inline */}
            <div ref={cityRef}>
              {activeCity && (
                <FilterResultBox
                  label={`MBA in ${activeCity.label}`}
                  count={cityColleges.length}
                  colleges={cityColleges}
                  onClear={()=>setActiveCity(null)}
                />
              )}
            </div>

            {/* ── SECTION 3: TRIVIA ── */}
            <Divider label="Did you know" />
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:12, marginTop:24, padding:'24px 28px', background:'var(--ink)', borderRadius:16 }}>
              {TRIVIA.map((t,i)=>(
                <div key={i} style={{ display:'flex', gap:14, alignItems:'flex-start' }}>
                  <div style={{ fontFamily:'var(--serif)', fontSize:'1.7rem', fontWeight:700, color:'var(--orange)', flexShrink:0, lineHeight:1 }}>{t.stat}</div>
                  <p style={{ fontSize:12.5, color:'rgba(255,255,255,.48)', lineHeight:1.65, margin:0 }}>{t.desc}</p>
                </div>
              ))}
            </div>

            {/* ── SECTION 4: BUDGET ── */}
            <Divider label="Browse by budget" />
            <div style={{ marginTop:24 }}>
              <h2 style={{ fontFamily:'var(--serif)', fontSize:'1.2rem', fontWeight:700, color:'var(--ink)', marginBottom:4 }}>Browse by Budget</h2>
              <p style={{ fontSize:12, color:'var(--muted)', marginBottom:16, fontFamily:'var(--mono)' }}>Click a bracket — colleges appear below. Click again to deselect.</p>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:10 }}>
                {FEE_BRACKETS.map(b=>{
                  const count = initialColleges.filter(c=>{ const f=c.min_fees||0; return (!b.min||f>=b.min)&&(!b.max||f<b.max) }).length
                  if (!count) return null
                  const isAct = activeBudget?.label===b.label
                  return (
                    <button key={b.label} onClick={()=>pickBudget(b)}
                      style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 18px', borderRadius:12, border:`1.5px solid ${isAct ? b.color : 'var(--border)'}`, background:isAct ? `${b.color}12` : 'var(--white)', cursor:'pointer', transition:'all .15s' }}>
                      <span style={{ fontSize:13.5, fontWeight:600, color:isAct ? b.color : 'var(--ink)' }}>{b.label}</span>
                      <span style={{ fontSize:11, fontFamily:'var(--mono)', color:isAct ? b.color : 'var(--muted)' }}>{count} college{count>1?'s':''}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Budget results — inline */}
            <div ref={budgetRef}>
              {activeBudget && (
                <FilterResultBox
                  label={`MBA ${activeBudget.label}`}
                  count={budgetColleges.length}
                  colleges={budgetColleges}
                  onClear={()=>setActiveBudget(null)}
                />
              )}
            </div>

            {/* ── SECTION 5: 1-YEAR MBA ROW ── */}
            <Divider label="For experienced professionals" />
            <ScrollSection title="1-Year & Executive MBA" sub="For professionals with 2+ years of work experience"
              colleges={yr1Colleges} seeAllQuery="1 year executive MBA" onSearch={doSearch} />

            {/* ── SECTION 6: BEST VALUE ROW ── */}
            <Divider label="Best value" />
            <ScrollSection title="Best Value MBAs" sub="Lowest fees — highest ROI potential"
              colleges={valueColleges} seeAllQuery="best ROI MBA" onSearch={doSearch} />

            {/* BOTTOM CTA */}
            <div style={{ marginTop:52, background:'var(--ink)', borderRadius:16, padding:'36px 28px', textAlign:'center' }}>
              <div style={{ fontFamily:'var(--serif)', fontSize:'1.3rem', fontWeight:700, color:'#fff', marginBottom:8 }}>Not sure which college fits your profile?</div>
              <p style={{ fontSize:14, color:'rgba(255,255,255,.4)', marginBottom:24, lineHeight:1.8, maxWidth:420, margin:'0 auto 24px' }}>
                Enter your CAT percentile. Claude finds your realistic options in seconds.
              </p>
              <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
                <Link href="/eligibility" style={{ background:'var(--orange)', color:'#fff', padding:'12px 26px', borderRadius:10, fontSize:14, fontWeight:600, textDecoration:'none' }}>Check my eligibility →</Link>
                <Link href="/compare"     style={{ background:'rgba(255,255,255,.07)', color:'rgba(255,255,255,.65)', padding:'12px 26px', borderRadius:10, fontSize:14, border:'1px solid rgba(255,255,255,.13)', textDecoration:'none' }}>Compare colleges</Link>
              </div>
            </div>
          </>
        )}
      </div>

      <LeadModal open={leadOpen} onClose={()=>setLeadOpen(false)} context="College Explorer" />
      <style>{`
        input::placeholder { color: rgba(255,255,255,.28) !important; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
}
