'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import Nav from '../../components/Nav'

// ── MASTER DATA ────────────────────────────────────────────────
const COLLEGES = [
  { id:1, name:'IIM Ahmedabad', short:'IIM A', slug:'iim-ahmedabad', emoji:'🏛️', city:'Ahmedabad', state:'Gujarat', tier:1, fees:2750000, avgPkg:3522000, nirf:1, exam:'CAT', cutoff:99, workExp:false, speciality:'Consulting · FMCG', founded:1961, roi:128, collveraRank:1, verdict:'Best consulting+FMCG MBA. Fees recover in under 10 months.' },
  { id:2, name:'IIM Bangalore', short:'IIM B', slug:'iim-bangalore', emoji:'🎓', city:'Bangalore', state:'Karnataka', tier:1, fees:2620000, avgPkg:3488000, nirf:2, exam:'CAT', cutoff:99, workExp:false, speciality:'Tech · Startups', founded:1973, roi:133, collveraRank:2, verdict:'Best IIM for tech and startup careers. Bangalore ecosystem advantage.' },
  { id:3, name:'FMS Delhi', short:'FMS', slug:'fms-delhi', emoji:'🎓', city:'New Delhi', state:'Delhi', tier:1, fees:243000, avgPkg:3400000, nirf:12, exam:'CAT', cutoff:98, workExp:false, speciality:'Consulting · FMCG', founded:1954, roi:1399, collveraRank:3, verdict:'Unmatched ROI in India. ₹2.43L fees for ₹34 LPA avg. Best value MBA.' },
  { id:4, name:'IIM Calcutta', short:'IIM C', slug:'iim-calcutta', emoji:'🏛️', city:'Kolkata', state:'West Bengal', tier:1, fees:2700000, avgPkg:3100000, nirf:5, exam:'CAT', cutoff:99, workExp:false, speciality:'Finance · IB', founded:1961, roi:115, collveraRank:4, verdict:'Best for investment banking. Highest intl package (₹1.45Cr) among all IIMs.' },
  { id:5, name:'IIM Lucknow', short:'IIM L', slug:'iim-lucknow', emoji:'🏛️', city:'Lucknow', state:'UP', tier:1, fees:2200000, avgPkg:3230000, nirf:6, exam:'CAT', cutoff:97, workExp:false, speciality:'FMCG · Consulting', founded:1984, roi:147, collveraRank:5, verdict:'Most undervalued IIM. Best ROI among old IIMs. 100% placement in 3 days.' },
  { id:6, name:'JBIMS Mumbai', short:'JBIMS', slug:'jbims-mumbai', emoji:'🏛️', city:'Mumbai', state:'Maharashtra', tier:1, fees:450000, avgPkg:2800000, nirf:null, exam:'MH-CET', cutoff:99, workExp:false, speciality:'Finance · Banking', founded:1965, roi:622, collveraRank:6, verdict:'₹4.5L fees, ₹28 LPA avg. Second best ROI after FMS. Mumbai finance access.' },
  { id:7, name:'IIM Kozhikode', short:'IIM K', slug:'iim-kozhikode', emoji:'🏛️', city:'Kozhikode', state:'Kerala', tier:1, fees:2400000, avgPkg:2800000, nirf:3, exam:'CAT', cutoff:96, workExp:false, speciality:'Analytics · Marketing', founded:1996, roi:117, collveraRank:7, verdict:'NIRF #3. Strong analytics and research. Remote location is a real consideration.' },
  { id:8, name:'XLRI Jamshedpur', short:'XLRI', slug:'xlri-jamshedpur', emoji:'✝️', city:'Jamshedpur', state:'Jharkhand', tier:1, fees:2850000, avgPkg:2800000, nirf:9, exam:'XAT', cutoff:97, workExp:false, speciality:'HR · Consulting', founded:1949, roi:98, collveraRank:8, verdict:'#1 HR MBA in India. XAT route means less competition from CAT-focused students.' },
  { id:9, name:'IIM Indore', short:'IIM I', slug:'iim-indore', emoji:'🏛️', city:'Indore', state:'MP', tier:1, fees:1650000, avgPkg:2500000, nirf:7, exam:'CAT', cutoff:97, workExp:false, speciality:'General Management', founded:1996, roi:152, collveraRank:9, verdict:'Most affordable old IIM at ₹16.5L. Large batch of 550 creates diverse network.' },
  { id:10, name:'SPJIMR Mumbai', short:'SPJIMR', slug:'spjimr-mumbai', emoji:'🎓', city:'Mumbai', state:'Maharashtra', tier:1, fees:2650000, avgPkg:2700000, nirf:20, exam:'CAT', cutoff:95, workExp:true, speciality:'FMCG · Marketing', founded:1981, roi:102, collveraRank:10, verdict:'Best non-IIM MBA in Mumbai. Work experience strongly preferred.' },
  { id:11, name:'ISB Hyderabad', short:'ISB', slug:'isb-hyderabad', emoji:'🌏', city:'Hyderabad', state:'Telangana', tier:1, fees:4300000, avgPkg:3400000, nirf:null, exam:'GMAT', cutoff:710, workExp:true, speciality:'Consulting · Finance', founded:2001, roi:79, collveraRank:11, verdict:'FT Top 30. Best for experienced professionals (4+ yrs). 1-year program.' },
  { id:12, name:'MDI Gurgaon', short:'MDI', slug:'mdi-gurgaon', emoji:'🏢', city:'Gurgaon', state:'Haryana', tier:1, fees:2816000, avgPkg:2200000, nirf:11, exam:'CAT', cutoff:95, workExp:true, speciality:'HR · Consulting', founded:1973, roi:78, collveraRank:12, verdict:'Best Delhi NCR corporate access. Gurgaon Fortune 500 proximity is real edge.' },
  { id:13, name:'IIFT Delhi', short:'IIFT', slug:'iift-delhi', emoji:'🌐', city:'New Delhi', state:'Delhi', tier:1, fees:2190000, avgPkg:2000000, nirf:null, exam:'IIFT', cutoff:93, workExp:false, speciality:'International Business', founded:1963, roi:91, collveraRank:13, verdict:'Only specialist international business MBA in India. Unique career niche.' },
  { id:14, name:'NMIMS Mumbai', short:'NMIMS', slug:'nmims-mumbai', emoji:'🏛️', city:'Mumbai', state:'Maharashtra', tier:2, fees:2700000, avgPkg:1800000, nirf:24, exam:'NMAT', cutoff:215, workExp:false, speciality:'Finance · Pharma', founded:1981, roi:67, collveraRank:14, verdict:'Strong banking and pharma placements. NMAT route is less competitive than CAT.' },
  { id:15, name:'IMT Ghaziabad', short:'IMT', slug:'imt-ghaziabad', emoji:'🏢', city:'Ghaziabad', state:'UP', tier:2, fees:2095000, avgPkg:1200000, nirf:42, exam:'CAT', cutoff:88, workExp:false, speciality:'General Management', founded:1980, roi:57, collveraRank:15, verdict:'Best Tier 2 MBA for NCR careers. CAT 88%+ makes it accessible.' },
  { id:16, name:'Great Lakes Chennai', short:'Great Lakes', slug:'great-lakes-chennai', emoji:'🎓', city:'Chennai', state:'Tamil Nadu', tier:2, fees:1700000, avgPkg:1200000, nirf:null, exam:'CAT', cutoff:80, workExp:false, speciality:'Finance · Analytics', founded:2004, roi:71, collveraRank:16, verdict:'1-year PGPM available. CAT 80%+ cutoff makes it very accessible.' },
  { id:17, name:'TAPMI Manipal', short:'TAPMI', slug:'tapmi-manipal', emoji:'🎓', city:'Manipal', state:'Karnataka', tier:2, fees:1730000, avgPkg:1100000, nirf:58, exam:'CAT', cutoff:85, workExp:false, speciality:'Banking · Finance', founded:1980, roi:64, collveraRank:17, verdict:'Hidden gem for banking careers. Residential Manipal campus is genuinely good.' },
  { id:18, name:'FORE Delhi', short:'FORE', slug:'fore-delhi', emoji:'🎓', city:'New Delhi', state:'Delhi', tier:2, fees:2200000, avgPkg:1000000, nirf:null, exam:'CAT', cutoff:88, workExp:false, speciality:'General Management', founded:1981, roi:45, collveraRank:18, verdict:'Delhi location is the main advantage. College placement is modest — you hustle.' },
  { id:19, name:'GIM Goa', short:'GIM', slug:'gim-goa', emoji:'🌴', city:'Panaji', state:'Goa', tier:2, fees:1900000, avgPkg:1000000, nirf:null, exam:'CAT', cutoff:85, workExp:false, speciality:'General Management', founded:1993, roi:53, collveraRank:19, verdict:'Best campus experience in Indian MBA. Placements modest but culture is strong.' },
  { id:20, name:'SOIL Gurgaon', short:'SOIL', slug:'soil-gurgaon', emoji:'🌱', city:'Gurgaon', state:'Haryana', tier:2, fees:1400000, avgPkg:900000, nirf:null, exam:'CAT', cutoff:70, workExp:false, speciality:'Leadership · HR', founded:2008, roi:64, collveraRank:20, verdict:'Niche leadership-focused program. Low fees at ₹14L, CAT 70%+ accessible.' },
]

const fmt = n => n ? `₹${(n/100000).toFixed(n>=10000000?0:1)}L` : '—'
const fmtPkg = n => n ? `₹${(n/100000).toFixed(1)} LPA` : '—'

const RANK_TYPES = [
  { id:'collvera', label:'Collvera AI', desc:'Composite: placement quality + ROI + location + brand', key:'collveraRank' },
  { id:'nirf', label:'NIRF 2024', desc:'Official Ministry of Education ranking', key:'nirf' },
  { id:'roi', label:'Best ROI', desc:'Average package ÷ fees × 100', key:'roi' },
  { id:'placement', label:'Placements', desc:'Average package — highest to lowest', key:'avgPkg' },
  { id:'fees', label:'Lowest Fees', desc:'Total program fees — cheapest first', key:'fees' },
]

const FILTERS = {
  exam: ['All Exams','CAT','XAT','GMAT','NMAT','MH-CET','IIFT'],
  tier: ['All Tiers','Tier 1','Tier 2'],
  city: ['All Cities','Mumbai','Delhi NCR','Bangalore','Hyderabad','Kolkata','Others'],
}

const TIER_COLORS = { 1:{ bg:'rgba(217,95,2,.1)', color:'#d95f02' }, 2:{ bg:'rgba(255,255,255,.06)', color:'rgba(255,255,255,.5)' } }

export default function RankingsClient() {
  const [rankType, setRankType] = useState('collvera')
  const [filterExam, setFilterExam] = useState('All Exams')
  const [filterTier, setFilterTier] = useState('All Tiers')
  const [filterCity, setFilterCity] = useState('All Cities')
  const [expanded, setExpanded] = useState(null)

  const sorted = useMemo(() => {
    let list = [...COLLEGES]

    // Filters
    if (filterExam !== 'All Exams') list = list.filter(c => c.exam === filterExam)
    if (filterTier !== 'All Tiers') list = list.filter(c => c.tier === parseInt(filterTier.split(' ')[1]))
    if (filterCity !== 'All Cities') {
      if (filterCity === 'Delhi NCR') list = list.filter(c => ['New Delhi','Gurgaon','Ghaziabad'].includes(c.city))
      else if (filterCity === 'Others') list = list.filter(c => !['Mumbai','New Delhi','Gurgaon','Ghaziabad','Bangalore','Hyderabad','Kolkata'].includes(c.city))
      else list = list.filter(c => c.city === filterCity)
    }

    // Sort
    const cfg = RANK_TYPES.find(r => r.id === rankType)
    if (!cfg) return list
    return list.sort((a,b) => {
      const av = a[cfg.key], bv = b[cfg.key]
      if (av === null) return 1
      if (bv === null) return -1
      if (rankType === 'fees') return av - bv // lower is better
      return bv - av // higher is better
    })
  }, [rankType, filterExam, filterTier, filterCity])

  const activeRank = RANK_TYPES.find(r => r.id === rankType)

  return (
    <div style={{ minHeight:'100vh', background:'var(--ink)', color:'#fff' }}>
      <Nav />

      {/* Header */}
      <div style={{ borderBottom:'1px solid rgba(255,255,255,.07)', padding:'44px 32px 0' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'#1D9E75', textTransform:'uppercase', letterSpacing:'.12em', marginBottom:10 }}>
            Updated March 2026 · 20 colleges · verified data
          </div>
          <h1 style={{ fontFamily:'var(--serif)', fontSize:'clamp(1.8rem,3vw,2.8rem)', fontWeight:700, color:'#fff', marginBottom:10, lineHeight:1.1 }}>
            MBA College Rankings India 2025
          </h1>
          <p style={{ fontSize:14, color:'rgba(255,255,255,.45)', maxWidth:560, lineHeight:1.7, marginBottom:28 }}>
            Five different ways to rank India's MBA colleges — NIRF, placements, ROI, fees and Collvera's own AI composite. No sponsored rankings.
          </p>

          {/* Rank type tabs */}
          <div style={{ display:'flex', gap:4, flexWrap:'wrap', marginBottom:0 }}>
            {RANK_TYPES.map(r => (
              <button key={r.id} onClick={() => setRankType(r.id)}
                style={{ padding:'10px 18px', borderRadius:'8px 8px 0 0', fontSize:12.5, fontWeight:500, cursor:'pointer', border:'none', transition:'all .2s', fontFamily:'var(--sans)', background: rankType===r.id ? 'var(--orange)' : 'rgba(255,255,255,.06)', color: rankType===r.id ? '#fff' : 'rgba(255,255,255,.5)' }}>
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active rank description + filters */}
      <div style={{ background:'rgba(255,255,255,.03)', borderBottom:'1px solid rgba(255,255,255,.07)', padding:'14px 32px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', gap:16, flexWrap:'wrap' }}>
          <div style={{ fontSize:12, color:'rgba(255,255,255,.4)', fontFamily:'var(--mono)' }}>
            <span style={{ color:'var(--orange)', marginRight:6 }}>↑</span>
            Sorted by: {activeRank?.desc}
          </div>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            {[
              { val:filterExam, set:setFilterExam, opts:FILTERS.exam },
              { val:filterTier, set:setFilterTier, opts:FILTERS.tier },
              { val:filterCity, set:setFilterCity, opts:FILTERS.city },
            ].map(({val, set, opts}, i) => (
              <select key={i} value={val} onChange={e => set(e.target.value)}
                style={{ background:'rgba(255,255,255,.08)', border:'1px solid rgba(255,255,255,.12)', color:'rgba(255,255,255,.8)', padding:'6px 12px', borderRadius:7, fontSize:12, fontFamily:'var(--mono)', cursor:'pointer', outline:'none' }}>
                {opts.map(o => <option key={o} value={o} style={{ background:'#1a1a1a' }}>{o}</option>)}
              </select>
            ))}
          </div>
        </div>
      </div>

      {/* Rankings table */}
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'24px 32px 60px' }}>

        {/* Column headers */}
        <div style={{ display:'grid', gridTemplateColumns:'48px 1fr 100px 110px 110px 80px', gap:12, padding:'8px 16px', marginBottom:4 }}>
          {['#','College','Fees','Avg Package','Cutoff',''].map((h,i) => (
            <div key={i} style={{ fontSize:9.5, fontFamily:'var(--mono)', color:'rgba(255,255,255,.3)', textTransform:'uppercase', letterSpacing:'.06em' }}>{h}</div>
          ))}
        </div>

        {sorted.length === 0 && (
          <div style={{ textAlign:'center', padding:'48px', color:'rgba(255,255,255,.3)' }}>
            <div style={{ fontSize:32, marginBottom:12 }}>🔍</div>
            No colleges match your filters.
          </div>
        )}

        {sorted.map((c, i) => {
          const rankVal = rankType === 'collvera' ? c.collveraRank
            : rankType === 'nirf' ? c.nirf
            : rankType === 'roi' ? c.roi
            : rankType === 'placement' ? i+1
            : i+1
          const isExp = expanded === c.id
          return (
            <div key={c.id} style={{ marginBottom:6 }}>
              <div onClick={() => setExpanded(isExp ? null : c.id)}
                style={{ display:'grid', gridTemplateColumns:'48px 1fr 100px 110px 110px 80px', gap:12, padding:'14px 16px', background: isExp ? 'rgba(217,95,2,.08)' : 'rgba(255,255,255,.03)', border:'1px solid', borderColor: isExp ? 'rgba(217,95,2,.3)' : 'rgba(255,255,255,.07)', borderRadius: isExp ? '10px 10px 0 0' : 10, cursor:'pointer', transition:'all .2s', alignItems:'center' }}
                onMouseOver={e => { if(!isExp) e.currentTarget.style.background='rgba(255,255,255,.05)' }}
                onMouseOut={e => { if(!isExp) e.currentTarget.style.background='rgba(255,255,255,.03)' }}>

                {/* Rank */}
                <div style={{ fontFamily:'var(--mono)', fontSize:15, fontWeight:700, color: i===0?'#ef9f27':i===1?'rgba(255,255,255,.6)':i===2?'#cd7f32':'rgba(255,255,255,.3)' }}>
                  {i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1}
                </div>

                {/* College name */}
                <div style={{ display:'flex', alignItems:'center', gap:10, minWidth:0 }}>
                  <span style={{ fontSize:20, flexShrink:0 }}>{c.emoji}</span>
                  <div style={{ minWidth:0 }}>
                    <div style={{ fontWeight:500, fontSize:14, color:'#fff', marginBottom:2 }}>{c.name}</div>
                    <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                      <span style={{ fontSize:9.5, fontFamily:'var(--mono)', padding:'1px 6px', borderRadius:6, ...TIER_COLORS[c.tier] }}>Tier {c.tier}</span>
                      <span style={{ fontSize:9.5, fontFamily:'var(--mono)', color:'rgba(255,255,255,.3)' }}>{c.city}</span>
                      {c.exam !== 'CAT' && <span style={{ fontSize:9.5, fontFamily:'var(--mono)', color:'rgba(255,255,255,.3)' }}>{c.exam}</span>}
                    </div>
                  </div>
                </div>

                {/* Fees */}
                <div style={{ fontFamily:'var(--mono)', fontSize:13, color:'rgba(255,255,255,.7)' }}>{fmt(c.fees)}</div>

                {/* Avg pkg */}
                <div style={{ fontFamily:'var(--mono)', fontSize:13, color:'#1D9E75', fontWeight:500 }}>{fmtPkg(c.avgPkg)}</div>

                {/* Cutoff */}
                <div style={{ fontFamily:'var(--mono)', fontSize:12, color:'var(--orange)' }}>
                  {c.exam === 'GMAT' ? `GMAT ${c.cutoff}+` : c.exam === 'NMAT' ? `NMAT ${c.cutoff}+` : `${c.cutoff}%+`}
                </div>

                {/* Expand */}
                <div style={{ fontSize:12, color:'rgba(255,255,255,.3)', textAlign:'right' }}>{isExp ? '▲' : '▼'}</div>
              </div>

              {/* Expanded row */}
              {isExp && (
                <div style={{ background:'rgba(217,95,2,.05)', border:'1px solid rgba(217,95,2,.2)', borderTop:'none', borderRadius:'0 0 10px 10px', padding:'16px 20px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
                  <div>
                    <div style={{ fontSize:9.5, fontFamily:'var(--mono)', color:'rgba(255,255,255,.3)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:8 }}>AI Verdict</div>
                    <div style={{ fontSize:13, color:'rgba(255,255,255,.75)', lineHeight:1.65 }}>{c.verdict}</div>
                    <div style={{ display:'flex', gap:6, marginTop:10, flexWrap:'wrap' }}>
                      {c.speciality.split(' · ').map(s => (
                        <span key={s} style={{ fontSize:10, fontFamily:'var(--mono)', padding:'2px 8px', borderRadius:8, background:'rgba(255,255,255,.07)', color:'rgba(255,255,255,.5)' }}>{s}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                    {[
                      ['NIRF Rank', c.nirf || 'Unranked'],
                      ['ROI Score', `${c.roi}%`],
                      ['Collvera Rank', `#${c.collveraRank}`],
                      ['Founded', c.founded],
                      ['Fees', fmt(c.fees)],
                      ['Avg Package', fmtPkg(c.avgPkg)],
                    ].map(([l,v]) => (
                      <div key={l} style={{ background:'rgba(255,255,255,.04)', borderRadius:8, padding:'8px 10px' }}>
                        <div style={{ fontSize:9.5, fontFamily:'var(--mono)', color:'rgba(255,255,255,.3)', marginBottom:3 }}>{l}</div>
                        <div style={{ fontSize:13, fontWeight:500, color:'#fff' }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ gridColumn:'1/-1', display:'flex', gap:8, marginTop:4 }}>
                    <Link href={`/colleges/${c.slug}`} style={{ background:'var(--orange)', color:'#fff', padding:'8px 18px', borderRadius:7, fontSize:12, fontWeight:500, textDecoration:'none' }}>Full College Guide →</Link>
                    <Link href="/eligibility" style={{ background:'rgba(255,255,255,.08)', color:'rgba(255,255,255,.65)', padding:'8px 18px', borderRadius:7, fontSize:12, textDecoration:'none', border:'1px solid rgba(255,255,255,.1)' }}>Check My Eligibility →</Link>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {/* Methodology note */}
        <div style={{ marginTop:40, padding:'20px 24px', background:'rgba(255,255,255,.03)', borderRadius:12, border:'1px solid rgba(255,255,255,.07)' }}>
          <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'rgba(255,255,255,.3)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:10 }}>Collvera Ranking Methodology</div>
          <div style={{ fontSize:12.5, color:'rgba(255,255,255,.45)', lineHeight:1.75 }}>
            Collvera AI ranking uses a composite score: placement quality (35%), ROI — package vs fees (25%), location and career access (15%), brand and alumni network (15%), academic environment (10%). Data verified from official college websites and NIRF reports. Last updated March 2026. We do not accept payment to change rankings.
          </div>
        </div>
      </div>
    </div>
  )
}
