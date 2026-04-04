'use client'
import Nav from '../../components/Nav'
import Link from 'next/link'
import { useState } from 'react'
import LeadModal from '../../components/LeadModal'

export default function RankingsClient() {
  const [leadOpen, setLeadOpen] = useState(false)

  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)' }}>
      <Nav onLeadOpen={() => setLeadOpen(true)} />

      <div style={{ maxWidth:720, margin:'0 auto', padding:'80px 24px 100px', textAlign:'center' }}>

        {/* Badge */}
        <div style={{ display:'inline-flex', alignItems:'center', gap:7, fontSize:10.5, fontFamily:'var(--mono)', color:'var(--orange)', textTransform:'uppercase', letterSpacing:'.12em', marginBottom:28, background:'var(--orange-lt)', border:'1px solid rgba(217,95,2,.2)', padding:'5px 14px', borderRadius:20 }}>
          <span>🔧</span> Under construction
        </div>

        {/* Heading */}
        <h1 style={{ fontFamily:'var(--serif)', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:700, color:'var(--ink)', lineHeight:1.1, marginBottom:16 }}>
          MBA Rankings —<br />
          <em style={{ fontStyle:'italic', color:'var(--orange)' }}>coming soon.</em>
        </h1>

        <p style={{ fontSize:15, color:'var(--muted)', lineHeight:1.85, maxWidth:480, margin:'0 auto 40px' }}>
          We're rebuilding rankings from scratch — verified data only, no paid placements, no self-reported numbers.
          Collvera AI will rank every college on placement quality, real ROI, and alumni network strength.
        </p>

        {/* What's coming */}
        <div style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:16, padding:'28px 32px', marginBottom:40, textAlign:'left' }}>
          <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:20 }}>What's being built</div>
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {[
              ['📊', 'Placement ROI ranking',       'Avg package ÷ total fees. FMS will be #1 by a mile.'],
              ['🤖', 'Collvera AI composite score', 'Weighted score across placements, fees, location, alumni.'],
              ['🎓', 'Exam-specific rankings',       'Best colleges for CAT, XAT, NMAT — separately ranked.'],
              ['🏙️', 'City-based rankings',          'Best MBA in Delhi, Mumbai, Bangalore, Hyderabad.'],
              ['💰', 'Budget-based rankings',        'Best MBA under ₹5L, ₹10L, ₹20L total fees.'],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ display:'flex', gap:14, alignItems:'flex-start' }}>
                <div style={{ fontSize:20, flexShrink:0, marginTop:2 }}>{icon}</div>
                <div>
                  <div style={{ fontSize:13.5, fontWeight:600, color:'var(--ink)', marginBottom:3 }}>{title}</div>
                  <div style={{ fontSize:12.5, color:'var(--muted)', lineHeight:1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
          <Link href="/eligibility" style={{ background:'var(--orange)', color:'#fff', padding:'12px 24px', borderRadius:10, fontSize:13.5, fontWeight:600, textDecoration:'none' }}>
            Check my college chances →
          </Link>
          <Link href="/compare" style={{ background:'var(--white)', color:'var(--ink)', padding:'12px 24px', borderRadius:10, fontSize:13.5, fontWeight:500, textDecoration:'none', border:'1px solid var(--border)' }}>
            Compare two colleges
          </Link>
        </div>

        {/* Reassurance */}
        <div style={{ marginTop:48, fontSize:11.5, fontFamily:'var(--mono)', color:'var(--muted)', lineHeight:1.8 }}>
          In the meantime — use the <Link href="/" style={{ color:'var(--orange)', textDecoration:'none', fontWeight:500 }}>percentile checker on the homepage</Link> to see<br />
          your real conversion chance at every top B-school.
        </div>

      </div>

      <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)} />
    </div>
  )
}
