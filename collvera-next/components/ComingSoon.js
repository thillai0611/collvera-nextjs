'use client'
import { useState } from 'react'
import Nav from './Nav'
import LeadModal from './LeadModal'
import Link from 'next/link'

const pageNames = {
  compare: 'College Compare',
  eligibility: 'Eligibility Checker',
  predictor: 'Rank Predictor',
  rankings: 'NIRF Rankings',
  blog: 'MBA Blog',
}

export default function ComingSoon({ page }) {
  const [leadOpen, setLeadOpen] = useState(false)
  return (
    <div style={{ minHeight:'100vh' }}>
      <Nav onLeadOpen={() => setLeadOpen(true)} />
      <div style={{ maxWidth:600, margin:'0 auto', padding:'80px 24px', textAlign:'center' }}>
        <div style={{ fontSize:48, marginBottom:20 }}>🚧</div>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:'2rem', fontWeight:700, marginBottom:12 }}>{pageNames[page] || page}</h1>
        <p style={{ color:'var(--muted)', fontSize:15, lineHeight:1.7, marginBottom:32 }}>
          This feature is launching very soon. Meanwhile, our AI can answer all your questions about MBA colleges — just ask!
        </p>
        <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
          <button className="btn btn-primary" onClick={() => setLeadOpen(true)}>Get Free Counselling →</button>
          <Link href="/" className="btn btn-outline" style={{ textDecoration:'none' }}>← Back to Home</Link>
        </div>
      </div>
      <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)} context={pageNames[page]} />
    </div>
  )
}
