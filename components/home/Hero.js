'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import AIActivityPanel from './AIActivityPanel'

const STATES = [
  {
    eyebrow: 'AI-powered · zero human bias · live data',
    h1: ['Which IIM are', 'you ', 'targeting', ' this year?'],
    italic: 2,
    sub: 'Know exactly what score you need, what your profile is worth, and what stands between you and your dream college — before you sit the exam.',
    cta1: { label:'Test your readiness →', href:'#minicat' },
    cta2: { label:'Explore colleges', href:'/colleges' },
  },
  {
    eyebrow: 'CAT 2025 results declared · AI matching live',
    h1: ["Got your score?", "Find your colleges", "in 30 seconds."],
    italic: 2,
    sub: 'Enter your percentile. AI instantly matches you to every college you can realistically get into — with fees, placements, and your conversion chance.',
    cta1: { label:'Check my colleges →', href:'#minicat' },
    cta2: { label:'Talk to counsellor', href:null, modal:true },
  },
  {
    eyebrow: '100% AI · no ads · no commission',
    h1: ["No humans.", "No ads.", "No agenda."],
    italic: 2,
    sub: 'Every answer comes from verified data and AI reasoning. Not from colleges paying for placement. Not from counsellors earning commission. Pure intelligence.',
    cta1: { label:'See how it works →', href:'#minicat' },
    cta2: { label:'View data sources', href:'/blog' },
  },
  {
    eyebrow: 'GD-PI season · Feb–April 2026',
    h1: ["Shortlisted?", "Now crack", "the interview."],
    italic: 2,
    sub: 'AI-generated GD topics, college-specific PI questions, WAT prompts, and mock frameworks — updated weekly for every top B-school.',
    cta1: { label:'Prep for my interview →', href:null, modal:true },
    cta2: { label:'GD topics today', href:'/blog' },
  },
]

export default function Hero({ onLeadOpen }) {
  const [cur, setCur] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCur(c => (c + 1) % 4), 6000)
    return () => clearInterval(t)
  }, [])

  const s = STATES[cur]

  const handleCTA = (cta) => {
    if (cta.modal) { onLeadOpen?.(); return }
    if (cta.href === '#minicat') {
      document.getElementById('minicat-section')?.scrollIntoView({ behavior:'smooth' })
    }
  }

  return (
    <div style={{ background:'#060504', position:'relative', overflow:'hidden', minHeight:520 }}>
      {/* Scanline */}
      <div style={{ position:'absolute', left:0, right:0, height:2, background:'linear-gradient(90deg,transparent,rgba(217,95,2,.15),transparent)', animation:'scanline 8s linear infinite', pointerEvents:'none', zIndex:1 }}></div>
      {/* Grid overlay */}
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)', backgroundSize:'40px 40px', pointerEvents:'none' }}></div>

      <div style={{ maxWidth:1100, margin:'0 auto', padding:'64px 32px', display:'grid', gridTemplateColumns:'1fr 380px', gap:52, alignItems:'center', position:'relative', zIndex:2 }} className="hero-grid">

        {/* LEFT */}
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:18, fontSize:10, fontFamily:'var(--mono)', color:'rgba(255,255,255,.4)', textTransform:'uppercase', letterSpacing:'.1em' }}>
            <span style={{ width:24, height:1, background:'var(--orange)' }}></span>
            {s.eyebrow}
          </div>

          <h1 style={{ fontFamily:'var(--serif)', fontSize:'clamp(2.6rem,4vw,4rem)', fontWeight:700, lineHeight:1.06, letterSpacing:'-.025em', color:'#fff', marginBottom:16 }}>
            {s.h1.map((part, i) => (
              i === s.italic
                ? <em key={i} style={{ fontStyle:'italic', color:'var(--orange)' }}>{part}</em>
                : <span key={i}>{part}{i < s.h1.length - 1 ? <br/> : ''}</span>
            ))}
          </h1>

          <p style={{ fontSize:14, lineHeight:1.8, color:'rgba(255,255,255,.5)', maxWidth:440, marginBottom:28 }}>{s.sub}</p>

          <div style={{ display:'flex', gap:10, flexWrap:'wrap', alignItems:'center' }}>
            <button onClick={() => handleCTA(s.cta1)} style={{ padding:'12px 24px', borderRadius:8, fontSize:13, fontWeight:500, cursor:'pointer', border:'none', background:'var(--orange)', color:'#fff', display:'inline-flex', alignItems:'center', gap:7, transition:'all .2s' }}
              onMouseOver={e => e.currentTarget.style.background='#b84e00'}
              onMouseOut={e => e.currentTarget.style.background='var(--orange)'}>
              {s.cta1.label}
            </button>
            {s.cta2.href && !s.cta2.modal ? (
              <Link href={s.cta2.href} style={{ padding:'12px 20px', borderRadius:8, fontSize:13, cursor:'pointer', border:'1px solid rgba(255,255,255,.15)', background:'transparent', color:'rgba(255,255,255,.65)', transition:'all .2s', textDecoration:'none' }}>
                {s.cta2.label}
              </Link>
            ) : (
              <button onClick={() => handleCTA(s.cta2)} style={{ padding:'12px 20px', borderRadius:8, fontSize:13, cursor:'pointer', border:'1px solid rgba(255,255,255,.15)', background:'transparent', color:'rgba(255,255,255,.65)', transition:'all .2s' }}>
                {s.cta2.label}
              </button>
            )}
          </div>
        </div>

        {/* RIGHT — AI Panel */}
        <div className="desktop-only">
          <AIActivityPanel />
        </div>
      </div>

      {/* State dots */}
      <div style={{ position:'absolute', bottom:24, left:'50%', transform:'translateX(-50%)', display:'flex', gap:8, zIndex:10 }}>
        {[0,1,2,3].map(i => (
          <div key={i} onClick={() => setCur(i)} style={{ width:i===cur?20:6, height:6, borderRadius:i===cur?3:'50%', background:i===cur?'#fff':'rgba(255,255,255,.2)', cursor:'pointer', transition:'all .35s' }}></div>
        ))}
      </div>

      <style>{`
        @media(max-width:768px){ .hero-grid{ grid-template-columns:1fr !important; padding:44px 20px !important; } }
        @keyframes scanline{ 0%{top:-4px} 100%{top:100%} }
        @keyframes glow{ 0%,100%{box-shadow:0 0 6px rgba(29,158,117,.3)} 50%{box-shadow:0 0 14px rgba(29,158,117,.6)} }
      `}</style>
    </div>
  )
}
