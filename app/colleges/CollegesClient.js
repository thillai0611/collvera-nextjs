'use client'
import { useState, useMemo, useRef, useEffect } from 'react'
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
  { label:'Delhi NCR',  cities:NCR,            emoji:'🏛️' },
  { label:'Mumbai',     cities:['Mumbai'],      emoji:'🌊' },
  { label:'Bengaluru',  cities:['Bengaluru'],   emoji:'💻' },
  { label:'Chennai',    cities:['Chennai'],     emoji:'🌴' },
  { label:'Kolkata',    cities:['Kolkata'],     emoji:'🏙️' },
  { label:'Ahmedabad',  cities:['Ahmedabad'],   emoji:'🔶' },
  { label:'Hyderabad',  cities:['Hyderabad'],   emoji:'💎' },
  { label:'Pune',       cities:['Pune'],        emoji:'🎓' },
  { label:'Jamshedpur', cities:['Jamshedpur'],  emoji:'⚙️' },
  { label:'Lucknow',    cities:['Lucknow'],     emoji:'🕌' },
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
  { stat:'2.52x',  desc:"SOIL's ROI in 2022 — post-MBA salary was 2.5x the pre-MBA salary." },
]

function classifyQuery(q, colleges) {
  const lo = q.toLowerCase().trim()
  if (!lo) return null

  const cityMap = {
    'delhi ncr':NCR,'ncr':NCR,'delhi':NCR,
    'mumbai':['Mumbai'],'bombay':['Mumbai'],
    'bangalore':['Bengaluru'],'bengaluru':['Bengaluru'],
    'chennai':['Chennai'],'madras':['Chennai'],
    'kolkata':['Kolkata'],'calcutta':['Kolkata'],
    'ahmedabad':['Ahmedabad'],
    'hyderabad':['Hyderabad'],
    'pune':['Pune'],
    'gurgaon':['Gurugram'],'gurugram':['Gurugram'],
    'jamshedpur':['Jamshedpur'],
    'lucknow':['Lucknow'],
  }
  const tagMap = {
    'hr':'HR','human resource':'HR',
    'finance':'Finance','banking':'Finance','investment banking':'Finance',
    'marketing':'Marketing','fmcg':'FMCG','brand':'Marketing',
    'consulting':'Consulting','strategy':'Consulting',
    'analytics':'Analytics','data':'Analytics',
    'tech':'Tech','product':'Tech','startup':'Startups',
  }

  if (/1.?year|one.?year|executive|pgpm/.test(lo))
    return { label:'1-Year & Executive MBA', results:colleges.filter(c=>c.work_exp_required||c.work_exp_preferred) }
  if (/roi|cheapest|affordable|best value|low fee|value for money/.test(lo))
    return { label:'Best Value MBAs — Lowest Fees', results:[...colleges].filter(c=>c.min_fees).sort((a,b)=>a.min_fees-b.min_fees) }
  if (/^(top|best|rank|premier|iim)/.test(lo))
    return { label:'Top Ranked Colleges', results:[...colleges].sort((a,b)=>(a.nirf_rank||999)-(b.nirf_rank||999)).slice(0,12) }

  const feeM = lo.match(/under\s*[₹rs]*\s*(\d+)/)
  if (feeM) {
    const cap = parseInt(feeM[1])*1e5
    return { label:`MBA Colleges Under ₹${feeM[1]}L`, results:colleges.filter(c=>c.min_fees&&c.min_fees<=cap).sort((a,b)=>a.min_fees-b.min_fees) }
  }
  for (const [kw,cities] of Object.entries(cityMap)) {
    if (lo.includes(kw))
      return { label:`MBA in ${kw.charAt(0).toUpperCase()+kw.slice(1)}`, results:colleges.filter(c=>cities.some(ci=>c.city?.includes(ci))) }
  }
  for (const [kw,tag] of Object.entries(tagMap)) {
    if (lo.includes(kw))
      return { label:`Top Colleges for ${tag}`, results:colleges.filter(c=>c.tags?.includes(tag)) }
  }
  const hits = colleges.filter(c=>c.name.toLowerCase().includes(lo)||c.slug.includes(lo.replace(/\s+/g,'-')))
  return { label:`Results for "${q}"`, results:hits }
}

// ── Rank badge ────────────────────────────────────────────────────────────────
function RankBadge({ rank, color }) {
  if (rank && rank <= 60) {
    return (
      <span style={{ fontFamily:'var(--mono)', fontSize:11, fontWeight:700, color, background:`${color}15`, padding:'3px 8px', borderRadius:20, border:`1px solid ${color}30` }}>
        #{rank} NIRF
      </span>
    )
  }
  return (
    <span style={{ fontFamily:'var(--mono)', fontSize:11, fontWeight:700, color:'#6d28d9', background:'#f5f3ff', padding:'3px 8px', borderRadius:20, border:'1px solid rgba(109,40,217,.2)' }}>
      ✦ Collvera Pick
    </span>
  )
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
          <p style={{ fontSize:12.5, color:'var(--ink2)', lineHeight:1.6, margin:'0 0 14px', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
            {c.verdict}
          </p>
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

// ── Horizontal scroll row ─────────────────────────────────────────────────────
function ScrollRow({ title, sub, colleges, seeAllQuery, onSearch }) {
  if (!colleges.length) return null
  return (
    <div style={{ marginBottom:48 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:14 }}>
        <div>
          <h2 style={{ fontFamily:'var(--serif)', fontSize:'1.2rem', fontWeight:700, color:'var(--ink)', margin:0 }}>{title}</h2>
          {sub && <p style={{ fontSize:12, color:'var(--muted)', margin:'3px 0 0', fontFamily:'var(--mono)' }}>{sub}</p>}
        </div>
        {seeAllQuery && (
          <button onClick={()=>onSearch(seeAllQuery)}
            style={{ fontSize:12, color:'var(--orange)', background:'none', border:'none', cursor:'pointer', fontFamily:'var(--mono)', whiteSpace:'nowrap' }}>
            See all →
          </button>
        )}
      </div>
      <div style={{ display:'flex', gap:14, overflowX:'auto', paddingBottom:6, scrollbarWidth:'none' }}>
        {colleges.map(c=>(
          <div key={c.id} style={{ flexShrink:0, width:272 }}>
            <CollegeCard c={c} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Card grid ─────────────────────────────────────────────────────────────────
function CardGrid({ colleges }) {
  if (!colleges.length) return (
    <div style={{ textAlign:'center', padding:'48px 24px', background:'var(--white)', borderRadius:14, border:'1px solid var(--border)' }}>
      <p style={{ color:'var(--muted)', fontSize:14 }}>No colleges found for this filter.</p>
    </div>
  )
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(272px,1fr))', gap:16 }}>
      {colleges.map(c=><CollegeCard key={c.id} c={c} />)}
    </div>
  )
}

// ── Pill button ───────────────────────────────────────────────────────────────
function Pill({ label, active, onClick, accent='var(--orange)' }) {
  return (
    <button onClick={onClick}
      style={{ fontSize:12.5, padding:'7px 16px', borderRadius:20, border:`1.5px solid ${active ? accent : 'var(--border)'}`, background:active ? accent : 'transparent', color:active ? '#fff' : 'var(--ink2)', cursor:'pointer', fontWeight:500, transition:'all .15s', whiteSpace:'nowrap' }}>
      {label}
    </button>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function CollegesClient({ initialColleges }) {
  const [leadOpen,      setLeadOpen]      = useState(false)
  const [query,         setQuery]         = useState('')
  const [activeCity,    setActiveCity]    = useState(null)
  const [activeBudget,  setActiveBudget]  = useState(null)
  const [activeTag,     setActiveTag]     = useState(null)
  const [active1yr,     setActive1yr]     = useState(false)
  const resultsRef = useRef(null)

  const sorted   = useMemo(()=>[...initialColleges].sort((a,b)=>(a.nirf_rank||999)-(b.nirf_rank||999)), [initialColleges])
  const searched = useMemo(()=>query ? classifyQuery(query, initialColleges) : null, [query, initialColleges])

  // scroll to results when a filter is selected
  useEffect(() => {
    if ((activeCity||activeBudget||activeTag||active1yr) && resultsRef.current) {
      setTimeout(()=>resultsRef.current.scrollIntoView({ behavior:'smooth', block:'start' }), 50)
    }
  }, [activeCity, activeBudget, activeTag, active1yr])

  function doSearch(q) { setQuery(q); setActiveCity(null); setActiveBudget(null); setActiveTag(null); setActive1yr(false) }
  function clearAll()  { setActiveCity(null); setActiveBudget(null); setActiveTag(null); setActive1yr(false) }

  // derive filtered colleges for active filters
  const filteredColleges = useMemo(()=>{
    let list = sorted
    if (activeCity)   list = list.filter(c=>activeCity.cities.some(ci=>c.city?.includes(ci)))
    if (activeBudget) list = list.filter(c=>{ const f=c.min_fees||0; return (!activeBudget.min||f>=activeBudget.min)&&(!activeBudget.max||f<activeBudget.max) })
    if (activeTag)    list = list.filter(c=>c.tags?.includes(activeTag))
    if (active1yr)    list = list.filter(c=>c.work_exp_required||c.work_exp_preferred)
    return list
  }, [sorted, activeCity, activeBudget, activeTag, active1yr])

  const anyFilterActive = activeCity||activeBudget||activeTag||active1yr

  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)' }}>
      <Nav onLeadOpen={()=>setLeadOpen(true)} />

      {/* ── HERO ── */}
      <div style={{ background:'var(--ink)', padding:'52px 24px 44px' }}>
        <div style={{ maxWidth:680, margin:'0 auto', textAlign:'center' }}>
          <p style={{ fontSize:11, fontFamily:'var(--mono)', color:'rgba(255,255,255,.28)', letterSpacing:'.18em', textTransform:'uppercase', marginBottom:12 }}>Collvera · India MBA · 2026</p>
          <h1 style={{ fontFamily:'var(--serif)', fontSize:'clamp(2.2rem,5vw,3.2rem)', fontWeight:700, color:'#fff', lineHeight:1.05, marginBottom:10 }}>Find Your MBA</h1>
          <p style={{ fontSize:14.5, color:'rgba(255,255,255,.38)', lineHeight:1.75, marginBottom:28, maxWidth:440, margin:'0 auto 28px' }}>
            Search by college name, city, career goal, or budget.
          </p>
          {/* search */}
          <div style={{ position:'relative', maxWidth:580, margin:'0 auto' }}>
            <span style={{ position:'absolute', left:16, top:'50%', transform:'translateY(-50%)', fontSize:16, pointerEvents:'none' }}>🔍</span>
            <input value={query} onChange={e=>setQuery(e.target.value)}
              placeholder='Try "top MBA in Delhi", "best for HR", "under 15 lakhs"...'
              style={{ width:'100%', paddingLeft:46, paddingRight:query?46:16, height:52, borderRadius:14, border:'2px solid rgba(255,255,255,.14)', background:'rgba(255,255,255,.08)', color:'#fff', fontSize:14, boxSizing:'border-box', outline:'none', transition:'border-color .2s' }}
              onFocus={e=>e.target.style.borderColor='var(--orange)'}
              onBlur={e=>e.target.style.borderColor='rgba(255,255,255,.14)'} />
            {query && <button onClick={()=>setQuery('')}
              style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'rgba(255,255,255,.4)', fontSize:18, cursor:'pointer', lineHeight:1 }}>✕</button>}
          </div>
          {/* quick pills */}
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

        {/* ── SEARCH RESULTS ── */}
        {searched ? (
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
              <h2 style={{ fontFamily:'var(--serif)', fontSize:'1.35rem', fontWeight:700, color:'var(--ink)', margin:0 }}>{searched.label}</h2>
              <span style={{ fontSize:12, fontFamily:'var(--mono)', color:'var(--muted)' }}>{searched.results.length} colleges</span>
              <button onClick={()=>setQuery('')} style={{ marginLeft:'auto', fontSize:12, color:'var(--orange)', background:'none', border:'none', cursor:'pointer' }}>← Back</button>
            </div>
            <CardGrid colleges={searched.results} />
          </div>
        ) : (
          <>
            {/* ── CATEGORY PILLS ── */}
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:40 }}>
              <Pill label="All" active={!anyFilterActive} onClick={clearAll} />
              {CATEGORY_PILLS.map(p=>(
                <Pill key={p.tag} label={p.label} active={activeTag===p.tag}
                  onClick={()=>{ setActiveTag(activeTag===p.tag ? null : p.tag); setActiveCity(null); setActiveBudget(null); setActive1yr(false) }} />
              ))}
              <Pill label="1-Year MBA" active={active1yr}
                onClick={()=>{ setActive1yr(!active1yr); setActiveCity(null); setActiveBudget(null); setActiveTag(null) }} />
            </div>

            {/* ── TOP RANKED (only when no filter) ── */}
            {!anyFilterActive && (
              <ScrollRow title="Top Ranked Colleges" sub="Sorted by NIRF 2025 ranking"
                colleges={sorted.slice(0,8)} seeAllQuery="top ranked colleges" onSearch={doSearch} />
            )}

            {/* ── CITY SECTION ── */}
            {!activeTag && !activeBudget && !active1yr && (
              <div style={{ marginBottom:32 }}>
                <h2 style={{ fontFamily:'var(--serif)', fontSize:'1.2rem', fontWeight:700, color:'var(--ink)', marginBottom:4 }}>Browse by City</h2>
                <p style={{ fontSize:12, color:'var(--muted)', marginBottom:16, fontFamily:'var(--mono)' }}>Click a city to see colleges below</p>
                <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginBottom:activeCity ? 24 : 0 }}>
                  {CITIES.map(city=>{
                    const count = initialColleges.filter(c=>city.cities.some(ci=>c.city?.includes(ci))).length
                    if (!count) return null
                    const isAct = activeCity?.label===city.label
                    return (
                      <button key={city.label}
                        onClick={()=>setActiveCity(isAct ? null : city)}
                        style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 16px', borderRadius:12, border:`1.5px solid ${isAct ? 'var(--orange)' : 'var(--border)'}`, background:isAct ? 'var(--orange)' : 'var(--white)', cursor:'pointer', transition:'all .15s' }}>
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
            )}

            {/* ── FILTER RESULTS BOX ── */}
            {anyFilterActive && (
              <div ref={resultsRef} style={{ marginBottom:40 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
                  <h2 style={{ fontFamily:'var(--serif)', fontSize:'1.2rem', fontWeight:700, color:'var(--ink)', margin:0 }}>
                    {activeCity ? `MBA in ${activeCity.label}` :
                     activeBudget ? `MBA ${activeBudget.label}` :
                     activeTag ? `Top Colleges for ${activeTag}` :
                     '1-Year & Executive MBA'}
                  </h2>
                  <span style={{ fontSize:11.5, fontFamily:'var(--mono)', color:'var(--muted)' }}>{filteredColleges.length} colleges</span>
                  <button onClick={clearAll} style={{ marginLeft:'auto', fontSize:12, color:'var(--orange)', background:'none', border:'none', cursor:'pointer', fontFamily:'var(--mono)' }}>Clear ✕</button>
                </div>
                <CardGrid colleges={filteredColleges} />
              </div>
            )}

            {/* ── TRIVIA STRIP ── */}
            {!anyFilterActive && (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:12, marginBottom:48, padding:'24px 28px', background:'var(--ink)', borderRadius:16 }}>
                {TRIVIA.map((t,i)=>(
                  <div key={i} style={{ display:'flex', gap:14, alignItems:'flex-start' }}>
                    <div style={{ fontFamily:'var(--serif)', fontSize:'1.7rem', fontWeight:700, color:'var(--orange)', flexShrink:0, lineHeight:1 }}>{t.stat}</div>
                    <p style={{ fontSize:12.5, color:'rgba(255,255,255,.48)', lineHeight:1.65, margin:0 }}>{t.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* ── BUDGET SECTION ── */}
            {!activeTag && !activeCity && !active1yr && (
              <div style={{ marginBottom:48 }}>
                <h2 style={{ fontFamily:'var(--serif)', fontSize:'1.2rem', fontWeight:700, color:'var(--ink)', marginBottom:4 }}>Browse by Budget</h2>
                <p style={{ fontSize:12, color:'var(--muted)', marginBottom:16, fontFamily:'var(--mono)' }}>Find the right MBA at the right price point</p>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:10 }}>
                  {FEE_BRACKETS.map(b=>{
                    const count = initialColleges.filter(c=>{ const f=c.min_fees||0; return (!b.min||f>=b.min)&&(!b.max||f<b.max) }).length
                    if (!count) return null
                    const isAct = activeBudget?.label===b.label
                    return (
                      <button key={b.label}
                        onClick={()=>setActiveBudget(isAct ? null : b)}
                        style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 18px', borderRadius:12, border:`1.5px solid ${isAct ? b.color : 'var(--border)'}`, background:isAct ? `${b.color}12` : 'var(--white)', cursor:'pointer', transition:'all .15s' }}>
                        <span style={{ fontSize:13.5, fontWeight:600, color:isAct ? b.color : 'var(--ink)' }}>{b.label}</span>
                        <span style={{ fontSize:11, fontFamily:'var(--mono)', color:isAct ? b.color : 'var(--muted)' }}>{count} college{count>1?'s':''}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* ── 1-YEAR MBA ROW (when not filtered) ── */}
            {!anyFilterActive && (
              <ScrollRow title="1-Year & Executive MBA" sub="For professionals with 2+ years experience"
                colleges={sorted.filter(c=>c.work_exp_required||c.work_exp_preferred)}
                seeAllQuery="1 year executive MBA" onSearch={doSearch} />
            )}

            {/* ── BEST VALUE ROW ── */}
            {!anyFilterActive && (
              <ScrollRow title="Best Value MBAs" sub="Lowest fees — highest ROI"
                colleges={[...initialColleges].filter(c=>c.min_fees).sort((a,b)=>a.min_fees-b.min_fees).slice(0,6)}
                seeAllQuery="best ROI MBA" onSearch={doSearch} />
            )}

            {/* ── BOTTOM CTA ── */}
            <div style={{ marginTop:16, background:'var(--ink)', borderRadius:16, padding:'36px 28px', textAlign:'center' }}>
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
