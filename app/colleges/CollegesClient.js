'use client'
import { useState, useMemo } from 'react'
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
  { label:'₹15L – ₹25L',color:'#d97706', min:1500000, max:2500000 },
  { label:'Above ₹25L', color:'#dc2626', min:2500000 },
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
  { stat:'2.52x',  desc:"SOIL's 2022 ROI — post-MBA salary more than doubled." },
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
    'analytics':'Analytics','data':'Analytics','tech':'Tech','product':'Tech',
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
  for (const [kw,cities] of Object.entries(cityMap))
    if (lo.includes(kw)) return { label:`MBA in ${kw.charAt(0).toUpperCase()+kw.slice(1)}`, results:colleges.filter(c=>cities.some(ci=>c.city?.includes(ci))) }
  for (const [kw,tag] of Object.entries(tagMap))
    if (lo.includes(kw)) return { label:`Top Colleges for ${tag}`, results:colleges.filter(c=>c.tags?.includes(tag)) }
  const hits = colleges.filter(c=>c.name.toLowerCase().includes(lo)||c.slug.includes(lo.replace(/\s+/g,'-')))
  return { label:`Results for "${q}"`, results:hits }
}

function Divider({ label }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:20, margin:'56px 0 0' }}>
      <div style={{ flex:1, height:1, background:'var(--border)' }} />
      <span style={{ fontSize:10, fontFamily:'var(--mono)', color:'#bbb', textTransform:'uppercase', letterSpacing:'.16em', whiteSpace:'nowrap' }}>{label}</span>
      <div style={{ flex:1, height:1, background:'var(--border)' }} />
    </div>
  )
}

function RankBadge({ rank, color }) {
  if (rank && rank <= 60)
    return <span style={{ fontFamily:'var(--mono)', fontSize:10.5, fontWeight:600, color, background:`${color}12`, padding:'3px 9px', borderRadius:20, border:`1px solid ${color}25` }}>#{rank} NIRF</span>
  return <span style={{ fontFamily:'var(--mono)', fontSize:10.5, fontWeight:600, color:'#7c3aed', background:'#f5f3ff', padding:'3px 9px', borderRadius:20, border:'1px solid #ede9fe' }}>✦ Collvera Pick</span>
}

function CollegeCard({ c }) {
  const color = c.color || '#d95f02'
  return (
    <Link href={`/colleges/${c.slug}`}
      style={{ textDecoration:'none', display:'flex', flexDirection:'column', background:'#fff', border:'1px solid #e8e3db', borderRadius:16, overflow:'hidden', transition:'transform .15s, box-shadow .15s', height:'100%' }}
      onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 6px 20px rgba(0,0,0,.07)' }}
      onMouseLeave={e=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none' }}>
      <div style={{ height:3, background:color }} />
      <div style={{ padding:'20px 22px 22px', display:'flex', flexDirection:'column', flex:1, gap:0 }}>

        {/* rank + tier */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
          <RankBadge rank={c.nirf_rank} color={color} />
          <span style={{ fontFamily:'var(--mono)', fontSize:10, color:'#aaa', background:'#f7f5f2', padding:'3px 8px', borderRadius:20 }}>
            {c.tier===1 ? 'Premier' : c.tier===2 ? 'Top Private' : 'Regional'}
          </span>
        </div>

        {/* name */}
        <div style={{ fontSize:15.5, fontWeight:700, color:'#1a1a1a', lineHeight:1.3, marginBottom:4 }}>{c.name}</div>
        <div style={{ fontSize:12, color:'#aaa', fontFamily:'var(--mono)', marginBottom:18 }}>📍 {c.city}, {c.state}</div>

        {/* stats */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:7, marginBottom:16 }}>
          {[
            { l:'Avg Pkg', v:fmt.pkg(c.avg_package) },
            { l:'Fees',    v:fmt.fees(c.min_fees) },
            { l:'CAT',     v:fmt.cut(c.cat_cutoff) },
          ].map(s=>(
            <div key={s.l} style={{ background:'#f7f5f2', borderRadius:9, padding:'9px 8px', textAlign:'center' }}>
              <div style={{ fontSize:13, fontWeight:700, color:s.v?'#1a1a1a':'#ccc', marginBottom:3, whiteSpace:'nowrap' }}>{s.v||'—'}</div>
              <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'#bbb', textTransform:'uppercase', letterSpacing:'.07em' }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* verdict */}
        {c.verdict && (
          <p style={{ fontSize:12.5, color:'#666', lineHeight:1.65, margin:'0 0 16px', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{c.verdict}</p>
        )}

        {/* footer */}
        <div style={{ marginTop:'auto', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <span style={{ fontSize:13, fontWeight:600, color }}>View College →</span>
          <div style={{ display:'flex', gap:4 }}>
            {c.tags?.slice(0,2).map(t=>(
              <span key={t} style={{ fontSize:9.5, fontFamily:'var(--mono)', color:'#bbb', background:'#f7f5f2', padding:'2px 7px', borderRadius:20 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

function ScrollSection({ title, sub, colleges, seeAllQuery, onSearch }) {
  if (!colleges.length) return null
  return (
    <div style={{ marginTop:28 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:16 }}>
        <div>
          <h2 style={{ fontFamily:'var(--serif)', fontSize:'1.2rem', fontWeight:700, color:'#1a1a1a', margin:0, letterSpacing:'-.01em' }}>{title}</h2>
          {sub && <p style={{ fontSize:12, color:'#aaa', margin:'4px 0 0', fontFamily:'var(--mono)' }}>{sub}</p>}
        </div>
        {seeAllQuery && <button onClick={()=>onSearch(seeAllQuery)} style={{ fontSize:12, color:'var(--orange)', background:'none', border:'none', cursor:'pointer', fontFamily:'var(--mono)', whiteSpace:'nowrap' }}>See all →</button>}
      </div>
      <div style={{ display:'flex', gap:14, overflowX:'auto', paddingBottom:6, scrollbarWidth:'none' }}>
        {colleges.map(c=>(
          <div key={c.id} style={{ flexShrink:0, width:280 }}><CollegeCard c={c} /></div>
        ))}
      </div>
    </div>
  )
}

function CardGrid({ colleges }) {
  if (!colleges.length) return (
    <div style={{ textAlign:'center', padding:'48px', background:'#fff', borderRadius:12, border:'1px solid #e8e3db' }}>
      <p style={{ color:'#aaa', fontSize:14, margin:0 }}>No colleges found.</p>
    </div>
  )
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:16 }}>
      {colleges.map(c=><CollegeCard key={c.id} c={c} />)}
    </div>
  )
}

// Inline result box — light, airy, no heavy border
function ResultBox({ label, count, colleges, onClear }) {
  return (
    <div style={{ marginTop:24, padding:'24px 0 28px' }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
        <div style={{ width:3, height:16, background:'var(--orange)', borderRadius:2, flexShrink:0 }} />
        <h3 style={{ fontFamily:'var(--serif)', fontSize:'1.05rem', fontWeight:700, color:'#1a1a1a', margin:0 }}>{label}</h3>
        <span style={{ fontSize:11, fontFamily:'var(--mono)', color:'#aaa' }}>{count} result{count!==1?'s':''}</span>
        <button onClick={onClear}
          style={{ marginLeft:'auto', fontSize:11, color:'#aaa', background:'none', border:'1px solid #e0dbd3', borderRadius:20, padding:'3px 12px', cursor:'pointer', fontFamily:'var(--mono)', transition:'all .15s' }}
          onMouseEnter={e=>{ e.currentTarget.style.color='var(--orange)'; e.currentTarget.style.borderColor='rgba(217,95,2,.3)' }}
          onMouseLeave={e=>{ e.currentTarget.style.color='#aaa'; e.currentTarget.style.borderColor='#e0dbd3' }}>
          clear ✕
        </button>
      </div>
      <CardGrid colleges={colleges} />
    </div>
  )
}

export default function CollegesClient({ initialColleges }) {
  const [leadOpen,     setLeadOpen]     = useState(false)
  const [query,        setQuery]        = useState('')
  const [activeCity,   setActiveCity]   = useState(null)
  const [activeBudget, setActiveBudget] = useState(null)
  const [activeTag,    setActiveTag]    = useState(null)
  const [active1yr,    setActive1yr]    = useState(false)

  const sorted       = useMemo(()=>[...initialColleges].sort((a,b)=>(a.nirf_rank||999)-(b.nirf_rank||999)), [initialColleges])
  const searched     = useMemo(()=>query ? classifyQuery(query, initialColleges) : null, [query, initialColleges])
  const cityColleges = useMemo(()=>sorted.filter(c=>activeCity?.cities.some(ci=>c.city?.includes(ci))), [sorted, activeCity])
  const budgetColleges = useMemo(()=>sorted.filter(c=>{ const f=c.min_fees||0; return (!activeBudget?.min||f>=activeBudget.min)&&(!activeBudget?.max||f<activeBudget.max) }), [sorted, activeBudget])
  const tagColleges  = useMemo(()=>sorted.filter(c=>c.tags?.includes(activeTag)), [sorted, activeTag])
  const yr1Colleges  = useMemo(()=>sorted.filter(c=>c.work_exp_required||c.work_exp_preferred), [sorted])
  const valueColleges= useMemo(()=>[...initialColleges].filter(c=>c.min_fees).sort((a,b)=>a.min_fees-b.min_fees).slice(0,6), [initialColleges])

  function doSearch(q) { setQuery(q) }

  // pill style helper
  function pillStyle(active, accentColor='var(--orange)') {
    return {
      fontSize:12.5, padding:'7px 16px', borderRadius:20, cursor:'pointer', fontWeight:500, transition:'all .15s', whiteSpace:'nowrap', fontFamily:'inherit',
      border: active ? `1.5px solid ${accentColor}` : '1.5px solid #e0dbd3',
      background: active ? accentColor : '#fff',
      color: active ? '#fff' : '#555',
    }
  }

  return (
    <div style={{ minHeight:'100vh', background:'#f7f5f1' }}>
      <Nav onLeadOpen={()=>setLeadOpen(true)} />

      {/* HERO */}
      <div style={{ background:'var(--ink)', padding:'60px 24px 50px' }}>
        <div style={{ maxWidth:640, margin:'0 auto', textAlign:'center' }}>
          <p style={{ fontSize:10.5, fontFamily:'var(--mono)', color:'rgba(255,255,255,.25)', letterSpacing:'.2em', textTransform:'uppercase', marginBottom:14 }}>Collvera · India MBA · 2026</p>
          <h1 style={{ fontFamily:'var(--serif)', fontSize:'clamp(2.4rem,5vw,3.4rem)', fontWeight:700, color:'#fff', lineHeight:1.05, marginBottom:14, letterSpacing:'-.02em' }}>Find Your MBA</h1>
          <p style={{ fontSize:15, color:'rgba(255,255,255,.35)', lineHeight:1.8, marginBottom:32, maxWidth:400, margin:'0 auto 32px' }}>
            Search by college, city, career goal, or budget.
          </p>
          <div style={{ position:'relative', maxWidth:560, margin:'0 auto' }}>
            <span style={{ position:'absolute', left:18, top:'50%', transform:'translateY(-50%)', fontSize:16, pointerEvents:'none', opacity:.5 }}>🔍</span>
            <input value={query} onChange={e=>setQuery(e.target.value)}
              placeholder='Try "top MBA in Delhi", "best for HR", "under 15 lakhs"...'
              style={{ width:'100%', paddingLeft:48, paddingRight:query?48:18, height:54, borderRadius:14, border:'1.5px solid rgba(255,255,255,.12)', background:'rgba(255,255,255,.07)', color:'#fff', fontSize:14.5, boxSizing:'border-box', outline:'none', transition:'border-color .2s', letterSpacing:'-.01em' }}
              onFocus={e=>e.target.style.borderColor='var(--orange)'}
              onBlur={e=>e.target.style.borderColor='rgba(255,255,255,.12)'} />
            {query && <button onClick={()=>setQuery('')} style={{ position:'absolute', right:16, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'rgba(255,255,255,.35)', fontSize:18, cursor:'pointer', lineHeight:1 }}>✕</button>}
          </div>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', justifyContent:'center', marginTop:16 }}>
            {['Top IIMs','Delhi NCR','Under ₹15L','1-Year MBA','Best for Finance','Best ROI'].map(s=>(
              <button key={s} onClick={()=>doSearch(s)}
                style={{ fontSize:11.5, padding:'5px 13px', borderRadius:20, border:'1px solid rgba(255,255,255,.14)', background:'rgba(255,255,255,.06)', color:'rgba(255,255,255,.5)', cursor:'pointer', fontFamily:'var(--mono)', transition:'all .15s' }}
                onMouseEnter={e=>{ e.currentTarget.style.background='rgba(255,255,255,.12)'; e.currentTarget.style.color='#fff' }}
                onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,.06)'; e.currentTarget.style.color='rgba(255,255,255,.5)' }}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1100, margin:'0 auto', padding:'48px 24px 100px' }}>

        {/* SEARCH RESULTS */}
        {searched ? (
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:28 }}>
              <h2 style={{ fontFamily:'var(--serif)', fontSize:'1.35rem', fontWeight:700, color:'#1a1a1a', margin:0, letterSpacing:'-.01em' }}>{searched.label}</h2>
              <span style={{ fontSize:11.5, fontFamily:'var(--mono)', color:'#aaa' }}>{searched.results.length} colleges</span>
              <button onClick={()=>setQuery('')} style={{ marginLeft:'auto', fontSize:12, color:'var(--orange)', background:'none', border:'none', cursor:'pointer', fontFamily:'var(--mono)' }}>← Browse all</button>
            </div>
            <CardGrid colleges={searched.results} />
          </div>
        ) : (
          <>
            {/* SECTION 1 — CATEGORY PILLS */}
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {CATEGORY_PILLS.map(p=>(
                <button key={p.tag} style={pillStyle(activeTag===p.tag)}
                  onClick={()=>setActiveTag(activeTag===p.tag ? null : p.tag)}>
                  {p.label}
                </button>
              ))}
              <button style={pillStyle(active1yr)} onClick={()=>setActive1yr(v=>!v)}>1-Year MBA</button>
            </div>

            {/* Tag result */}
            {activeTag && <ResultBox label={`Top Colleges for ${activeTag}`} count={tagColleges.length} colleges={tagColleges} onClear={()=>setActiveTag(null)} />}
            {active1yr  && <ResultBox label="1-Year & Executive MBA" count={yr1Colleges.length} colleges={yr1Colleges} onClear={()=>setActive1yr(false)} />}

            {/* SECTION 2 — TOP RANKED */}
            <Divider label="Top ranked" />
            <ScrollSection title="Top Ranked Colleges" sub="Sorted by NIRF 2025 ranking"
              colleges={sorted.slice(0,8)} seeAllQuery="top ranked colleges" onSearch={doSearch} />

            {/* SECTION 3 — CITIES */}
            <Divider label="Browse by city" />
            <div style={{ marginTop:28 }}>
              <h2 style={{ fontFamily:'var(--serif)', fontSize:'1.2rem', fontWeight:700, color:'#1a1a1a', marginBottom:4, letterSpacing:'-.01em' }}>Browse by City</h2>
              <p style={{ fontSize:12, color:'#bbb', marginBottom:18, fontFamily:'var(--mono)' }}>Click a city — colleges appear below</p>
              <div style={{ display:'flex', gap:9, flexWrap:'wrap' }}>
                {CITIES.map(city=>{
                  const count = initialColleges.filter(c=>city.cities.some(ci=>c.city?.includes(ci))).length
                  if (!count) return null
                  const isAct = activeCity?.label===city.label
                  return (
                    <button key={city.label} onClick={()=>setActiveCity(isAct ? null : city)}
                      style={{ display:'flex', alignItems:'center', gap:9, padding:'10px 16px', borderRadius:12, border:`1.5px solid ${isAct ? 'var(--orange)' : '#e0dbd3'}`, background:isAct ? 'var(--orange)' : '#fff', cursor:'pointer', transition:'all .15s', whiteSpace:'nowrap' }}>
                      <span style={{ fontSize:17 }}>{city.emoji}</span>
                      <div style={{ textAlign:'left' }}>
                        <div style={{ fontSize:13, fontWeight:600, color:isAct ? '#fff' : '#1a1a1a', lineHeight:1.2 }}>{city.label}</div>
                        <div style={{ fontSize:10.5, fontFamily:'var(--mono)', color:isAct ? 'rgba(255,255,255,.65)' : '#bbb', marginTop:1 }}>{count} college{count>1?'s':''}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
            {activeCity && <ResultBox label={`MBA in ${activeCity.label}`} count={cityColleges.length} colleges={cityColleges} onClear={()=>setActiveCity(null)} />}

            {/* SECTION 4 — TRIVIA */}
            <Divider label="Did you know" />
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:1, marginTop:24, background:'var(--ink)', borderRadius:16, overflow:'hidden' }}>
              {TRIVIA.map((t,i)=>(
                <div key={i} style={{ padding:'28px 28px', borderRight: i<TRIVIA.length-1 ? '1px solid rgba(255,255,255,.06)' : 'none' }}>
                  <div style={{ fontFamily:'var(--serif)', fontSize:'2rem', fontWeight:700, color:'var(--orange)', lineHeight:1, marginBottom:10 }}>{t.stat}</div>
                  <p style={{ fontSize:13, color:'rgba(255,255,255,.42)', lineHeight:1.7, margin:0 }}>{t.desc}</p>
                </div>
              ))}
            </div>

            {/* SECTION 5 — BUDGET */}
            <Divider label="Browse by budget" />
            <div style={{ marginTop:28 }}>
              <h2 style={{ fontFamily:'var(--serif)', fontSize:'1.2rem', fontWeight:700, color:'#1a1a1a', marginBottom:4, letterSpacing:'-.01em' }}>Browse by Budget</h2>
              <p style={{ fontSize:12, color:'#bbb', marginBottom:18, fontFamily:'var(--mono)' }}>Click a bracket — colleges appear below</p>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(175px,1fr))', gap:10 }}>
                {FEE_BRACKETS.map(b=>{
                  const count = initialColleges.filter(c=>{ const f=c.min_fees||0; return (!b.min||f>=b.min)&&(!b.max||f<b.max) }).length
                  if (!count) return null
                  const isAct = activeBudget?.label===b.label
                  return (
                    <button key={b.label} onClick={()=>setActiveBudget(isAct ? null : b)}
                      style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'15px 18px', borderRadius:12, border:`1.5px solid ${isAct ? b.color : '#e0dbd3'}`, background:isAct ? `${b.color}10` : '#fff', cursor:'pointer', transition:'all .15s' }}>
                      <span style={{ fontSize:13.5, fontWeight:600, color:isAct ? b.color : '#1a1a1a' }}>{b.label}</span>
                      <span style={{ fontSize:11, fontFamily:'var(--mono)', color:isAct ? b.color : '#bbb' }}>{count}</span>
                    </button>
                  )
                })}
              </div>
            </div>
            {activeBudget && <ResultBox label={`MBA ${activeBudget.label}`} count={budgetColleges.length} colleges={budgetColleges} onClear={()=>setActiveBudget(null)} />}

            {/* SECTION 6 — 1-YEAR ROW */}
            <Divider label="For experienced professionals" />
            <ScrollSection title="1-Year & Executive MBA" sub="For professionals with 2+ years of experience"
              colleges={yr1Colleges} seeAllQuery="1 year executive MBA" onSearch={doSearch} />

            {/* SECTION 7 — BEST VALUE */}
            <Divider label="Best value" />
            <ScrollSection title="Best Value MBAs" sub="Lowest fees — highest ROI potential"
              colleges={valueColleges} seeAllQuery="best ROI MBA" onSearch={doSearch} />

            {/* CTA */}
            <div style={{ marginTop:60, background:'var(--ink)', borderRadius:16, padding:'44px 32px', textAlign:'center' }}>
              <div style={{ fontFamily:'var(--serif)', fontSize:'1.4rem', fontWeight:700, color:'#fff', marginBottom:10, letterSpacing:'-.01em' }}>Not sure which college fits your profile?</div>
              <p style={{ fontSize:14, color:'rgba(255,255,255,.38)', marginBottom:28, lineHeight:1.85, maxWidth:400, margin:'0 auto 28px' }}>
                Enter your CAT percentile. Claude finds your realistic options in seconds.
              </p>
              <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
                <Link href="/eligibility" style={{ background:'var(--orange)', color:'#fff', padding:'13px 28px', borderRadius:10, fontSize:14, fontWeight:600, textDecoration:'none' }}>Check my eligibility →</Link>
                <Link href="/compare"     style={{ background:'rgba(255,255,255,.07)', color:'rgba(255,255,255,.6)', padding:'13px 28px', borderRadius:10, fontSize:14, border:'1px solid rgba(255,255,255,.12)', textDecoration:'none' }}>Compare colleges</Link>
              </div>
            </div>
          </>
        )}
      </div>

      <LeadModal open={leadOpen} onClose={()=>setLeadOpen(false)} context="College Explorer" />
      <style>{`
        input::placeholder { color: rgba(255,255,255,.25) !important; }
        ::-webkit-scrollbar { display: none; }
        @media (max-width: 600px) {
          h1 { font-size: 2.2rem !important; }
        }
      `}</style>
    </div>
  )
}
