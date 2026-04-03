'use client'
import { useEffect, useState } from 'react'

const BASE_EVENTS = [
  { t:'g', txt:'IIM Ahmedabad avg placement updated — ₹35.2 LPA · source: official 2024 placement report' },
  { t:'a', txt:'XLRI XAT 2025 cutoff scraped — BM: 97.2%ile · HRM: 94.8%ile · verified' },
  { t:'g', txt:'312 students checked eligibility in the last 24 hours' },
  { t:'b', txt:'AI served IIM L vs IIM K comparison to 18 students · verdict: IIM L for consulting' },
  { t:'a', txt:'ISB PGP 2025-26 application deadline extended to April 15, 2026' },
  { t:'g', txt:'FMS Delhi fees verified ₹2.43L from official Delhi University source' },
  { t:'b', txt:'94 shortlist queries processed by AI in the last hour · avg response: 0.3s' },
  { t:'a', txt:'MDI Gurgaon PGPM 2026-28 fees updated → ₹28.16L · source: mdi.ac.in' },
  { t:'g', txt:'New article indexed on Google — "Top MBA colleges under ₹10 lakhs India 2025"' },
  { t:'b', txt:'SPJIMR PI shortlist released — 680 candidates called for Mumbai campus rounds' },
  { t:'g', txt:'Confidence score recalculated for 20 colleges · avg data freshness: 94%' },
  { t:'a', txt:'3 students compared XLRI vs MDI in last 10 minutes · AI verdict served instantly' },
]

const dotColor = { g:'#1D9E75', a:'#EF9F27', b:'#378ADD' }

export default function Ticker() {
  const [events, setEvents] = useState(BASE_EVENTS)

  useEffect(() => {
    const interval = setInterval(() => {
      setEvents(prev => { const next = [...prev]; next.push(next.shift()); return next })
    }, 15 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const all = [...events, ...events]

  return (
    <div style={{ background:'#060504', overflow:'hidden', height:32, display:'flex', alignItems:'center', borderBottom:'1px solid rgba(255,255,255,.04)' }}>
      <div style={{ background:'var(--orange)', color:'#fff', fontSize:9, fontWeight:500, letterSpacing:'.12em', textTransform:'uppercase', padding:'0 14px', height:32, display:'flex', alignItems:'center', whiteSpace:'nowrap', flexShrink:0, fontFamily:'var(--mono)', gap:6 }}>
        <span style={{ width:6, height:6, borderRadius:'50%', background:'#fff', animation:'blink 1.5s ease-in-out infinite' }}></span>
        AI Live
      </div>
      <div style={{ flex:1, overflow:'hidden' }}>
        <div style={{ display:'flex', whiteSpace:'nowrap', animation:'tickscroll 55s linear infinite' }}>
          {all.map((e, i) => (
            <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'0 40px', fontSize:10, color:'rgba(255,255,255,.45)', fontFamily:'var(--mono)' }}>
              <span style={{ width:5, height:5, borderRadius:'50%', background:dotColor[e.t], flexShrink:0, ...(e.t==='g'?{animation:'blink 2s ease-in-out infinite'}:{}) }}></span>
              {e.txt}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
