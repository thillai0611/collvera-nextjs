'use client'
import { useState } from 'react'
import Link from 'next/link'
import Nav from '../../../components/Nav'
import LeadModal from '../../../components/LeadModal'

export default function BlogPostClient({ post }) {
  const [leadOpen, setLeadOpen] = useState(false)
  const content = post.content || {}

  return (
    <div style={{ minHeight:'100vh' }}>
      <Nav onLeadOpen={() => setLeadOpen(true)} />
      <div style={{ maxWidth:760, margin:'0 auto', padding:'32px 24px 60px' }}>

        <Link href="/blog" style={{ color:'var(--orange)', fontSize:13, fontWeight:500, textDecoration:'none', display:'flex', alignItems:'center', gap:6, marginBottom:24 }}>
          ← Back to Blog
        </Link>

        {/* Header */}
        <div style={{ marginBottom:8 }}>
          <span className="tag tag-orange">{post.category}</span>
          <span style={{ fontSize:12, color:'var(--muted)', marginLeft:12 }}>{post.read_time}</span>
        </div>

        <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.6rem,3vw,2.2rem)', fontWeight:700, lineHeight:1.2, marginBottom:16, marginTop:12 }}>
          {post.title}
        </h1>

        <div style={{ borderTop:'2px solid var(--orange)', borderBottom:'1px solid var(--border2)', padding:'16px 0', marginBottom:32 }}>
          <p style={{ fontSize:14, color:'var(--muted)', lineHeight:1.7, margin:0 }}>{post.description}</p>
        </div>

        {/* Content */}
        <div style={{ fontSize:15, lineHeight:1.8, color:'var(--ink)' }}>

          {/* Intro */}
          {content.intro && (
            <p style={{ fontSize:16, lineHeight:1.8, color:'var(--ink2)', marginBottom:28, fontStyle:'italic', borderLeft:'3px solid var(--orange)', paddingLeft:16 }}>
              {content.intro}
            </p>
          )}

          {/* Sections */}
          {(content.sections || []).map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h2 style={{ fontFamily:'var(--font-display)', fontSize:'1.3rem', fontWeight:700, marginTop:32, marginBottom:12, color:'var(--ink)' }}>
                  {section.heading}
                </h2>
              )}
              {section.text && (
                <p style={{ marginBottom:20, color:'var(--ink2)', lineHeight:1.8 }}>{section.text}</p>
              )}
            </div>
          ))}
        </div>

        {/* Mid-article CTA */}
        <div style={{ margin:'32px 0', padding:'20px 24px', background:'var(--orange-light)', borderRadius:'var(--radius-lg)', border:'1px solid rgba(232,93,4,0.15)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
          <p style={{ margin:0, fontSize:14, color:'var(--ink)', fontWeight:500 }}>Not sure which college to choose? Get personalised advice.</p>
          <button className="btn btn-primary btn-sm" onClick={() => setLeadOpen(true)}>Free Counselling →</button>
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop:40, padding:'24px', background:'var(--cream2)', borderRadius:'var(--radius-lg)', textAlign:'center' }}>
          <div style={{ fontFamily:'var(--font-display)', fontSize:'1.1rem', fontWeight:600, marginBottom:8 }}>Still have questions?</div>
          <p style={{ fontSize:13, color:'var(--muted)', marginBottom:16 }}>Our counsellor will personally shortlist colleges based on your CAT score, budget and goals — free.</p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <button className="btn btn-primary" onClick={() => setLeadOpen(true)}>Talk to a Counsellor — Free →</button>
            <Link href="/blog" className="btn btn-outline" style={{ textDecoration:'none' }}>Read More Articles</Link>
          </div>
        </div>
      </div>

      <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)} context={`Blog: ${post.title}`} />
    </div>
  )
}
