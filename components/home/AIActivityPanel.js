'use client'
import { useEffect, useState } from 'react'

const INITIAL = [
  { type:'eligibility', color:'#1D9E75', msg:'Student — 97 percentile, female, engineering. Matched to IIM K, MDI, IIFT, SPJIMR. Shortlist generated in 0.4s.', time:'just now' },
  { type:'data sync', color:'#378ADD', msg:'Scraped placement reports from IIM B, XLRI, SPJIMR. 3 avg package values updated. Confidence scores recalculated.', time:'2m ago' },
  { type:'comparison', color:'#EF9F27', msg:'IIM Lucknow vs IIM Kozhikode — AI verdict: IIM L for consulting, IIM K for analytics. Served to 14 students.', time:'7m ago' },
  { type:'cutoff update', color:'#a78bfa', msg:'IIFT Delhi cutoff for 2025 admissions scraped and verified: 96.2 percentile (General). Source: official website.', time:'15m ago' },
  { type:'content', color:'#1D9E75', msg:'New article live — "MBA vs PGDM India 2025". Submitted to Google Search Console. Indexing requested.', time:'1h ago' },
]

const NEW_EVENTS = [
  { type:'shortlist query', color:'#1D9E75', msg:'OBC student, 91 percentile, commerce background. Effective percentile ~94 with category. 8 safe colleges identified.', time:'just now' },
  { type:'comparison', color:'#EF9F27', msg:'FMS Delhi vs JBIMS Mumbai — verdict: FMS for pure ROI (fees ₹2.4L), JBIMS for Mumbai finance network.', time:'just now' },
  { type:'cutoff alert', color:'#a78bfa', msg:'CAT 2025 — IIM Calcutta shortlist expected next week. 99+ percentile candidates advised to check eligibility now.', time:'just now' },
  { type:'data verified', color:'#378ADD', msg:'TAPMI Manipal placement data cross-verified against 3 sources. Avg ₹11.2 LPA confirmed for 2024 batch.', time:'just now' },
]

export default function AIActivityPanel() {
  const [feed, setFeed] = useState(INITIAL)
  const [queryCount, setQueryCount] = useState(1840)
  const [newIdx, setNewIdx] = useState(0)

  useEffect(() => {
    const feedInterval = setInterval(() => {
      setFeed(prev => {
        const next = [{ ...NEW_EVENTS[newIdx % NEW_EVENTS.length], time:'just now' }, ...prev]
        if (next[1]) next[1].time = '1m ago'
        if (next[2]) next[2].time = '3m ago'
        if (next[3]) next[3].time = '8m ago'
        return next.slice(0, 5)
      })
      setNewIdx(i => i + 1)
    }, 20000)

    const countInterval = setInterval(() => {
      setQueryCount(c => c + Math.floor(Math.random() * 3 + 1))
    }, 8000)

    return () => { clearInterval(feedInterval); clearInterval(countInterval) }
  }, [newIdx])

  return (
    <div style={{ background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.07)', borderRadius:14, overflow:'hidden' }}>
      {/* Header */}
      <div style={{ padding:'12px 16px', borderBottom:'1px solid rgba(255,255,255,.06)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'rgba(255,255,255,.5)', display:'flex', alignItems:'center', gap:7 }}>
          <span style={{ fontSize:14 }}>⚡</span> AI activity feed
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:9.5, fontFamily:'var(--mono)', color:'#1D9E75' }}>
          <span style={{ width:8, height:8, borderRadius:'50%', border:'1.5px solid #1D9E75', position:'relative', animation:'glow 2s ease-in-out infinite', display:'inline-block' }}>
            <span style={{ position:'absolute', inset:1.5, borderRadius:'50%', background:'#1D9E75', animation:'blink 2s ease-in-out infinite' }}></span>
          </span>
          live
        </div>
      </div>

      {/* Feed */}
      <div style={{ padding:12, display:'flex', flexDirection:'column', gap:6, maxHeight:340, overflow:'hidden' }}>
        {feed.map((entry, i) => (
          <div key={i} style={{ background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.05)', borderRadius:8, padding:'10px 12px', animation:'slideLeft .4s ease forwards', opacity:0, animationDelay:`${i * 0.08}s`, animationFillMode:'forwards' }}>
            <div style={{ fontSize:9, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:3, display:'flex', alignItems:'center', gap:5, color:entry.color }}>
              <span style={{ width:4, height:4, borderRadius:'50%', background:entry.color, flexShrink:0 }}></span>
              {entry.type}
            </div>
            <div style={{ fontSize:11.5, color:'rgba(255,255,255,.65)', lineHeight:1.5 }}>{entry.msg}</div>
            <div style={{ fontSize:9.5, fontFamily:'var(--mono)', color:'rgba(255,255,255,.25)', marginTop:4 }}>{entry.time}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ padding:'10px 14px', borderTop:'1px solid rgba(255,255,255,.05)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'rgba(255,255,255,.3)' }}>
          Today: <span style={{ color:'rgba(255,255,255,.7)', fontWeight:500 }}>{queryCount.toLocaleString()}</span> queries
        </div>
        <div style={{ fontSize:9.5, fontFamily:'var(--mono)', color:'rgba(255,255,255,.2)' }}>updates every 20s</div>
      </div>
    </div>
  )
}
