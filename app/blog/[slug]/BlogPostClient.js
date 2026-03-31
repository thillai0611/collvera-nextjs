'use client'
import { useState } from 'react'
import Link from 'next/link'
import Nav from '../../../components/Nav'
import LeadModal from '../../../components/LeadModal'

// Parse content — handles both plain text string and JSON object
function parseContent(raw) {
  if (!raw) return { type: 'empty' }

  // Already a JSON object with sections
  if (typeof raw === 'object' && raw.sections) {
    return { type: 'structured', data: raw }
  }

  // Plain text string — render directly
  if (typeof raw === 'string') {
    return { type: 'text', data: raw }
  }

  // JSON string that needs parsing
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw)
      if (parsed.sections) return { type: 'structured', data: parsed }
    } catch {}
  }

  return { type: 'empty' }
}

// Render plain text content — handles ## headings and paragraphs
function RenderText({ text }) {
  const lines = text.split('\n')
  const elements = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i].trim()

    if (!line) { i++; continue }

    // H2 heading
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} style={{ fontFamily:'var(--serif)', fontSize:'1.3rem', fontWeight:700, marginTop:36, marginBottom:14, color:'var(--ink)', lineHeight:1.25 }}>
          {line.replace('## ', '')}
        </h2>
      )
      i++; continue
    }

    // H3 heading
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} style={{ fontFamily:'var(--serif)', fontSize:'1.1rem', fontWeight:700, marginTop:24, marginBottom:10, color:'var(--ink)' }}>
          {line.replace('### ', '')}
        </h3>
      )
      i++; continue
    }

    // Skip update notice line
    if (line.startsWith('Last verified:')) {
      i++; continue
    }

    // Regular paragraph — collect consecutive non-empty, non-heading lines
    const paraLines = []
    while (i < lines.length && lines[i].trim() && !lines[i].trim().startsWith('#')) {
      paraLines.push(lines[i].trim())
      i++
    }
    if (paraLines.length) {
      elements.push(
        <p key={`p-${i}`} style={{ marginBottom: 20, color:'var(--ink2)', lineHeight:1.85, fontSize:15 }}>
          {paraLines.join(' ')}
        </p>
      )
    }
  }

  return <>{elements}</>
}

export default function BlogPostClient({ post }) {
  const [leadOpen, setLeadOpen] = useState(false)
  const parsed = parseContent(post.content)

  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)' }}>
      <Nav onLeadOpen={() => setLeadOpen(true)} />

      <div style={{ maxWidth:760, margin:'0 auto', padding:'32px 24px 60px' }}>

        <Link href="/blog" style={{ color:'var(--orange)', fontSize:13, fontWeight:500, textDecoration:'none', display:'flex', alignItems:'center', gap:6, marginBottom:24 }}>
          ← Back to Blog
        </Link>

        {/* Header */}
        <div style={{ marginBottom:8, display:'flex', gap:10, alignItems:'center', flexWrap:'wrap' }}>
          <span style={{ fontSize:11, padding:'3px 10px', borderRadius:20, background:'var(--orange-lt)', color:'var(--orange2)', fontFamily:'var(--mono)', fontWeight:500 }}>{post.category}</span>
          <span style={{ fontSize:12, color:'var(--muted)' }}>{post.read_time}</span>
          {post.published_at && (
            <span style={{ fontSize:12, color:'var(--muted)', fontFamily:'var(--mono)' }}>
              {new Date(post.published_at).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}
            </span>
          )}
        </div>

        <h1 style={{ fontFamily:'var(--serif)', fontSize:'clamp(1.6rem,3vw,2.3rem)', fontWeight:700, lineHeight:1.2, marginBottom:16, marginTop:12, color:'var(--ink)' }}>
          {post.title}
        </h1>

        <div style={{ borderTop:'3px solid var(--orange)', borderBottom:'1px solid var(--border2)', padding:'16px 0', marginBottom:32 }}>
          <p style={{ fontSize:15, color:'var(--muted)', lineHeight:1.7, margin:0, fontStyle:'italic' }}>{post.description}</p>
        </div>

        {/* Verification notice */}
        <div style={{ padding:'8px 14px', background:'var(--cream2)', borderRadius:8, fontSize:11.5, color:'var(--muted)', marginBottom:28, fontFamily:'var(--mono)', display:'flex', alignItems:'center', gap:6 }}>
          <span>✓</span>
          <span>Last verified: March 2026 · Spot outdated data? Email verify@collvera.com</span>
        </div>

        {/* Content */}
        <div style={{ fontSize:15, lineHeight:1.85, color:'var(--ink)' }}>

          {parsed.type === 'text' && (
            <RenderText text={parsed.data} />
          )}

          {parsed.type === 'structured' && (
            <>
              {parsed.data.intro && (
                <p style={{ fontSize:16, lineHeight:1.85, color:'var(--ink2)', marginBottom:28, fontStyle:'italic', borderLeft:'3px solid var(--orange)', paddingLeft:16 }}>
                  {parsed.data.intro}
                </p>
              )}
              {(parsed.data.sections || []).map((section, i) => (
                <div key={i}>
                  {section.heading && (
                    <h2 style={{ fontFamily:'var(--serif)', fontSize:'1.3rem', fontWeight:700, marginTop:36, marginBottom:14, color:'var(--ink)', lineHeight:1.25 }}>
                      {section.heading}
                    </h2>
                  )}
                  {section.text && (
                    <p style={{ marginBottom:20, color:'var(--ink2)', lineHeight:1.85 }}>{section.text}</p>
                  )}
                </div>
              ))}
            </>
          )}

          {parsed.type === 'empty' && (
            <div style={{ padding:'32px', background:'var(--cream2)', borderRadius:12, textAlign:'center', color:'var(--muted)' }}>
              <div style={{ fontSize:32, marginBottom:8 }}>📝</div>
              <p>Content coming soon. Check back shortly.</p>
            </div>
          )}
        </div>

        {/* Mid-article CTA */}
        <div style={{ margin:'40px 0', padding:'20px 24px', background:'var(--orange-lt)', borderRadius:12, border:'1px solid rgba(217,95,2,.15)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
          <div>
            <div style={{ fontSize:14, fontWeight:600, color:'var(--ink)', marginBottom:2 }}>Not sure which college to apply to?</div>
            <div style={{ fontSize:12.5, color:'var(--muted)' }}>Check your eligibility across 20+ colleges in 2 minutes.</div>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <Link href="/eligibility" style={{ background:'var(--orange)', color:'#fff', padding:'9px 18px', borderRadius:8, fontSize:13, fontWeight:500, textDecoration:'none' }}>Check Eligibility →</Link>
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop:40, padding:'28px 32px', background:'var(--ink)', borderRadius:14, textAlign:'center' }}>
          <div style={{ fontFamily:'var(--serif)', fontSize:'1.1rem', fontWeight:700, color:'#fff', marginBottom:6 }}>Still have questions?</div>
          <p style={{ fontSize:13, color:'rgba(255,255,255,.5)', marginBottom:18, lineHeight:1.6 }}>
            Our AI counsellor will shortlist colleges based on your CAT score, budget and goals — free.
          </p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <button onClick={() => setLeadOpen(true)} style={{ background:'var(--orange)', color:'#fff', padding:'10px 22px', borderRadius:8, fontSize:13, fontWeight:500, cursor:'pointer', border:'none' }}>
              Talk to a Counsellor — Free →
            </button>
            <Link href="/blog" style={{ background:'rgba(255,255,255,.08)', color:'rgba(255,255,255,.7)', padding:'10px 22px', borderRadius:8, fontSize:13, textDecoration:'none', border:'1px solid rgba(255,255,255,.12)' }}>
              Read More Articles
            </Link>
          </div>
        </div>

      </div>

      <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)} />
    </div>
  )
}
