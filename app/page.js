'use client'
import { useState } from 'react'
import Link from 'next/link'
import Nav from '../components/Nav'
import LeadModal from '../components/LeadModal'

const exampleQueries = [
  'Best MBA for 95 percentile CAT',
  'IIM A vs IIM B comparison',
  'MBA under ₹10 lakhs fees',
  'Top colleges for Finance MBA',
]

const aiKnowledge = {
  'iim ahmedabad': 'IIM Ahmedabad is India\'s #1 B-School. CAT cutoff 99%+, fees ₹23L, avg package ₹35 LPA. Known for case-study method and legendary alumni network.',
  'iim bangalore': 'IIM Bangalore ranks #2. Best for tech + consulting. CAT 99%+, fees ₹23L, avg package ₹33 LPA. Bangalore ecosystem means great startup and tech exposure.',
  'fms': 'FMS Delhi — best value MBA in India. Only ₹2.3L fees, ₹34 LPA placements. ROI is mathematically unbeatable. CAT cutoff 98%+.',
  'xlri': 'XLRI Jamshedpur — India\'s top HR school, founded 1949. XAT 97%+ cutoff. Fees ₹24L, avg ₹28 LPA. BM program rivals IIMs.',
  'finance': 'Top for Finance: 1) IIM Calcutta, 2) IIM Ahmedabad, 3) FMS Delhi, 4) NMIMS Mumbai, 5) ISB Hyderabad.',
  'marketing': 'Top for Marketing: 1) IIM Ahmedabad, 2) SPJIMR Mumbai, 3) NMIMS Mumbai, 4) MICA Ahmedabad, 5) IMT Ghaziabad.',
  '99': 'With 99%+ CAT — target IIM A/B/C, FMS Delhi. Score gets you the call, GD-PI gets you the seat.',
  '95': 'With 95 percentile — target IIM Lucknow, IIM Kozhikode, MDI Gurgaon, SPJIMR Mumbai, IIFT Delhi.',
  '90': 'With 90 percentile — target IMT Ghaziabad, TAPMI, FORE Delhi, LIBA Chennai, XIM Bhubaneswar.',
  'fees': 'By fees: Under ₹5L: FMS (₹2.3L). ₹5–15L: IIFT (₹16L). ₹15–25L: IIMs (₹19–23L), XLRI (₹24L). Above ₹25L: ISB (₹42L).',
}

function getAIReply(msg) {
  const m = msg.toLowerCase()
  for (const [k, v] of Object.entries(aiKnowledge)) {
    if (m.includes(k)) return v
  }
  return "Great question! For the most accurate answer based on your CAT score, academics and goals — use our Eligibility Checker or get a free counselling session. Our counsellors typically respond within 24 hours. 🎯"
}

export default function Home() {
  const [leadOpen, setLeadOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role:'ai', text:"Hi! I'm Collvera AI 👋 Ask me anything about MBA colleges in India — cutoffs, fees, placements, comparisons. What's on your mind?" }
  ])
  const [input, setInput] = useState('')
  const [msgCount, setMsgCount] = useState(0)

  const send = (text) => {
    const t = text || input
    if (!t.trim()) return
    setInput('')
    const newMsgs = [...messages, { role:'user', text:t }]
    setMessages(newMsgs)
    const count = msgCount + 1
    setMsgCount(count)
    setTimeout(() => {
      setMessages(m => [...m, {
        role:'ai',
        text: getAIReply(t),
        showLead: count >= 3
      }])
    }, 700)
  }

  return (
    <div style={{ minHeight:'100vh' }}>
      <Nav onLeadOpen={() => setLeadOpen(true)} />

      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px' }}>

        {/* HERO */}
        <div style={{ padding:'64px 0 48px', maxWidth:760 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'var(--orange-light)', border:'1px solid rgba(232,93,4,0.2)', padding:'6px 16px', borderRadius:20, fontSize:12, color:'var(--orange2)', fontWeight:500, marginBottom:24 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--orange)', display:'inline-block' }}></span>
            Powered by Claude AI · 100+ colleges · Free forever
          </div>
          <h1 style={{ fontSize:'clamp(2.2rem,4vw,3.4rem)', fontWeight:700, lineHeight:1.1, marginBottom:20, letterSpacing:'-0.02em' }}>
            Find Your Perfect College<br />
            <em style={{ color:'var(--orange)', fontStyle:'italic' }}>with AI Intelligence</em>
          </h1>
          <p style={{ fontSize:'1.05rem', color:'var(--muted)', lineHeight:1.7, maxWidth:560, marginBottom:36 }}>
            Ask anything about MBA & UG colleges in India. CAT cutoffs, fees, placements, rankings — instant answers, personalised to you.
          </p>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <Link href="/colleges" className="btn btn-primary">Explore Colleges →</Link>
            <Link href="/eligibility" className="btn btn-outline">Check Eligibility</Link>
            <Link href="/predictor" className="btn btn-outline">Rank Predictor</Link>
          </div>
        </div>

        {/* STATS */}
        <div className="stats-bar" style={{ display:'flex', gap:32, paddingBottom:40, borderBottom:'1px solid var(--border2)', flexWrap:'wrap' }}>
          {[['100+','Colleges'],['50K+','Students guided'],['₹2L → ₹42L','Fee range'],['Free','Always']].map(([n,l]) => (
            <div key={l}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'1.6rem', fontWeight:700, color:'var(--ink)' }}>{n}</div>
              <div style={{ fontSize:12, color:'var(--muted)', marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="main-grid" style={{ display:'grid', gridTemplateColumns:'1fr 340px', gap:32, padding:'40px 0 60px', alignItems:'start' }}>

          {/* AI CHAT */}
          <div className="card" style={{ overflow:'hidden' }}>
            <div style={{ padding:'16px 20px', borderBottom:'1px solid var(--border2)', display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:'var(--ink)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>🧠</div>
              <div>
                <div style={{ fontWeight:600, fontSize:14 }}>Collvera AI Assistant</div>
                <div style={{ fontSize:12, color:'#2e7d32' }}>● Online — responds instantly</div>
              </div>
            </div>

            <div style={{ height:380, overflowY:'auto', padding:20, display:'flex', flexDirection:'column', gap:14 }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display:'flex', gap:10, flexDirection: m.role==='user' ? 'row-reverse' : 'row' }}>
                  <div style={{ width:28, height:28, borderRadius:8, background: m.role==='ai' ? 'var(--ink)' : 'var(--cream2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, flexShrink:0 }}>
                    {m.role==='ai' ? '🧠' : '👤'}
                  </div>
                  <div style={{ maxWidth:'78%' }}>
                    <div style={{ padding:'10px 14px', borderRadius:12, fontSize:13, lineHeight:1.6, background: m.role==='ai' ? 'var(--cream)' : 'var(--orange)', color: m.role==='ai' ? 'var(--ink)' : '#fff', borderTopLeftRadius: m.role==='ai' ? 2 : 12, borderTopRightRadius: m.role==='user' ? 2 : 12 }}>
                      {m.text}
                    </div>
                    {m.showLead && (
                      <button className="btn btn-primary btn-sm" onClick={() => setLeadOpen(true)} style={{ marginTop:8 }}>
                        Get personalised shortlist →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding:'8px 12px', borderBottom:'1px solid var(--border2)', display:'flex', gap:6, flexWrap:'wrap' }}>
              {exampleQueries.slice(0,3).map(q => (
                <button key={q} onClick={() => send(q)} style={{ background:'var(--cream2)', border:'none', borderRadius:20, padding:'5px 12px', fontSize:11, color:'var(--muted)', cursor:'pointer' }}>{q}</button>
              ))}
            </div>

            <div style={{ padding:16, display:'flex', gap:10 }}>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==='Enter' && send()} placeholder="Ask about any college or exam..." style={{ flex:1, borderRadius:8 }} />
              <button className="btn btn-primary btn-sm" onClick={() => send()}>Send</button>
            </div>
          </div>

          {/* SIDEBAR */}
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            <div className="card" style={{ padding:20 }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'1rem', fontWeight:600, marginBottom:16 }}>Quick Tools</div>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {[
                  { icon:'⚖️', label:'Compare Colleges', href:'/compare' },
                  { icon:'✅', label:'Eligibility Checker', href:'/eligibility' },
                  { icon:'📊', label:'Rank Predictor', href:'/predictor' },
                  { icon:'🏆', label:'NIRF Rankings', href:'/rankings' },
                  { icon:'📖', label:'MBA Blog', href:'/blog' },
                ].map(t => (
                  <Link key={t.href} href={t.href} style={{ display:'flex', alignItems:'center', gap:10, background:'var(--cream)', border:'1px solid var(--border2)', borderRadius:10, padding:'11px 14px', textDecoration:'none', fontSize:13, fontWeight:500, color:'var(--ink)' }}>
                    <span style={{ fontSize:16 }}>{t.icon}</span> {t.label}
                    <span style={{ marginLeft:'auto', color:'var(--muted)' }}>→</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding:20, background:'linear-gradient(135deg, var(--orange-light), #fff)', border:'1px solid rgba(232,93,4,0.15)' }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'1rem', fontWeight:600, marginBottom:6 }}>🎯 Get Your Free Shortlist</div>
              <p style={{ fontSize:12, color:'var(--muted)', marginBottom:14, lineHeight:1.6 }}>Tell us your CAT score and goals. Get a personalised list of colleges you can get into — free.</p>
              <button className="btn btn-primary" onClick={() => setLeadOpen(true)} style={{ width:'100%', justifyContent:'center' }}>
                Get Free Shortlist →
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer style={{ borderTop:'1px solid var(--border2)', padding:'32px 24px', textAlign:'center', background:'var(--cream2)' }}>
        <div style={{ fontFamily:'var(--font-display)', fontSize:'1rem', fontWeight:600, marginBottom:6 }}>
          Collvera<span style={{ color:'var(--orange)' }}>.com</span>
          <span style={{ fontSize:11, color:'var(--orange)', background:'var(--orange-light)', padding:'2px 6px', borderRadius:4, marginLeft:8 }}>AI</span>
        </div>
        <div style={{ fontSize:12, color:'var(--muted)', marginBottom:16 }}>India's smartest college guide · Powered by Claude AI</div>
        <div style={{ display:'flex', justifyContent:'center', gap:20, fontSize:12, flexWrap:'wrap' }}>
          {[['Explore','/colleges'],['Compare','/compare'],['Eligibility','/eligibility'],['Rank Predictor','/predictor'],['Rankings','/rankings'],['Blog','/blog']].map(([l,h]) => (
            <Link key={h} href={h} style={{ color:'var(--muted)', textDecoration:'none' }}>{l}</Link>
          ))}
        </div>
        <div style={{ fontSize:11, color:'var(--muted)', marginTop:16 }}>© 2026 Collvera.com · Data sourced from NIRF, official college websites</div>
      </footer>

      <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)} />
    </div>
  )
}
