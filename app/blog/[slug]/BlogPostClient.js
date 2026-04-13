'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Nav from '../../../components/Nav'
import LeadModal from '../../../components/LeadModal'

// ── Content parsers ──────────────────────────────────────────────────────────
function parseContent(raw) {
  if (!raw) return { type: 'empty' }
  if (typeof raw === 'object' && raw.sections) return { type: 'structured', data: raw }
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw)
      if (parsed && parsed.sections) return { type: 'structured', data: parsed }
    } catch {}
    return { type: 'text', data: raw }
  }
  return { type: 'empty' }
}

function parseTLDR(text) {
  const m = text.match(/---TLDR---\n([\s\S]*?)\n---END TLDR---/)
  if (!m) return { tldr: null, body: text }
  return { tldr: m[1].trim(), body: text.replace(/---TLDR---[\s\S]*?---END TLDR---\n*/, '').trim() }
}

// ── Inline bold: **text** → <strong>
function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  if (parts.length === 1) return text
  return parts.map((p, i) =>
    p.startsWith('**') && p.endsWith('**')
      ? <strong key={i} style={{ fontWeight:600, color:'var(--ink)' }}>{p.slice(2,-2)}</strong>
      : p
  )
}

// ── Category colour map ──────────────────────────────────────────────────────
const CAT_COLORS = {
  'Placement Data':    { bg:'#fff0e6', color:'#b84e00', dot:'#d95f02' },
  'College Comparison':{ bg:'#e6f1fb', color:'#1565c0', dot:'#185fa5' },
  'College Guide':     { bg:'#e6f1fb', color:'#1565c0', dot:'#185fa5' },
  'Score Guide':       { bg:'#fdecea', color:'#a32d2d', dot:'#c62828' },
  'CAT Prep':          { bg:'#f3e5f5', color:'#4a148c', dot:'#7b1fa2' },
  'GD-PI Prep':        { bg:'#fce4ec', color:'#880e4f', dot:'#c2185b' },
  'City Guide':        { bg:'#e8f5e9', color:'#1b5e20', dot:'#2e7d32' },
  'Fees Guide':        { bg:'#fff8e1', color:'#854f0b', dot:'#f9a825' },
  'Career Guide':      { bg:'#e8eaf6', color:'#1a237e', dot:'#3949ab' },
  'Education Guide':   { bg:'#e0f7fa', color:'#006064', dot:'#00838f' },
  'Ranking':           { bg:'#e8eaf6', color:'#1a237e', dot:'#3949ab' },
}
function catStyle(cat) {
  return CAT_COLORS[cat] || { bg:'var(--cream2)', color:'var(--muted)', dot:'var(--orange)' }
}

// ── TLDR box ─────────────────────────────────────────────────────────────────
function TLDRBox({ tldr }) {
  const lines   = tldr.split('\n').filter(l => l.trim())
  const bullets = lines.filter(l => l.startsWith('-') || l.startsWith('•'))
  const prose   = lines.filter(l => !l.startsWith('-') && !l.startsWith('•'))
  return (
    <div style={{ background:'var(--orange-lt)', border:'1.5px solid rgba(217,95,2,.2)', borderRadius:12, padding:'20px 22px', marginBottom:32 }}>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
        <span style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--orange2)', textTransform:'uppercase', letterSpacing:'.1em', fontWeight:600 }}>TL;DR — Quick Summary</span>
        <span style={{ flex:1, height:1, background:'rgba(217,95,2,.2)' }} />
        <span style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)' }}>2 min read</span>
      </div>
      {prose.map((p, i) => <p key={i} style={{ fontSize:14, lineHeight:1.7, color:'var(--ink2)', marginBottom:8 }}>{p}</p>)}
      {bullets.length > 0 && (
        <ul style={{ margin:'10px 0', paddingLeft:0, listStyle:'none' }}>
          {bullets.map((b, i) => (
            <li key={i} style={{ display:'flex', gap:8, marginBottom:6, fontSize:13.5, color:'var(--ink2)', lineHeight:1.6 }}>
              <span style={{ color:'var(--orange)', flexShrink:0 }}>→</span>
              <span>{b.replace(/^[-•]\s*/, '')}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ── Inline FAQ accordion ─────────────────────────────────────────────────────
function InlineFAQ({ faqs }) {
  const [open, setOpen] = useState(null)
  if (!faqs || faqs.length === 0) return null
  return (
    <div style={{ margin:'32px 0', background:'var(--cream)', borderRadius:12, border:'1px solid var(--border)', padding:'18px 20px' }}>
      <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:14 }}>Quick answers</div>
      {faqs.map((faq, i) => (
        <div key={i} style={{ borderBottom: i < faqs.length-1 ? '1px solid var(--border2)' : 'none', paddingBottom: i < faqs.length-1 ? 10 : 0, marginBottom: i < faqs.length-1 ? 10 : 0 }}>
          <button onClick={() => setOpen(open === i ? null : i)}
            style={{ width:'100%', textAlign:'left', background:'none', border:'none', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', gap:12, padding:0 }}>
            <span style={{ fontSize:13.5, fontWeight:500, color:'var(--ink)', lineHeight:1.4 }}>{faq.q}</span>
            <span style={{ fontSize:16, color:'var(--muted)', flexShrink:0, transition:'transform .2s', transform: open===i ? 'rotate(45deg)' : 'none' }}>+</span>
          </button>
          {open === i && <p style={{ fontSize:13, color:'var(--ink2)', lineHeight:1.7, marginTop:8, marginBottom:0 }}>{faq.a}</p>}
        </div>
      ))}
    </div>
  )
}

// ── RenderText — handles #, ##, ###, bullets, numbered lists, tables, bold ───
function RenderText({ text, inlineFAQs }) {
  const lines     = text.split('\n')
  const elements  = []
  let h2Count     = 0
  let slotIndex   = 0
  let para        = []
  let bullets     = []
  let numbered    = []
  let tableLines  = []
  let inTable     = false

  function flushPara() {
    if (!para.length) return
    elements.push(
      <p key={`p-${elements.length}`} style={{ marginBottom:20, color:'var(--ink2)', lineHeight:1.85 }}>
        {renderInline(para.join(' '))}
      </p>
    )
    para = []
  }

  function flushBullets() {
    if (!bullets.length) return
    elements.push(
      <ul key={`ul-${elements.length}`} style={{ margin:'0 0 20px 0', paddingLeft:0, listStyle:'none' }}>
        {bullets.map((b, i) => (
          <li key={i} style={{ display:'flex', gap:10, marginBottom:8, fontSize:14.5, color:'var(--ink2)', lineHeight:1.7 }}>
            <span style={{ color:'var(--orange)', flexShrink:0, marginTop:2, fontSize:12 }}>▸</span>
            <span>{renderInline(b.replace(/^[-•*]\s*/, ''))}</span>
          </li>
        ))}
      </ul>
    )
    bullets = []
  }

  function flushNumbered() {
    if (!numbered.length) return
    elements.push(
      <ol key={`ol-${elements.length}`} style={{ margin:'0 0 20px 0', paddingLeft:0, listStyle:'none', counterReset:'ol-counter' }}>
        {numbered.map((item, i) => (
          <li key={i} style={{ display:'flex', gap:12, marginBottom:10, fontSize:14.5, color:'var(--ink2)', lineHeight:1.7 }}>
            <span style={{ minWidth:24, height:24, borderRadius:'50%', background:'var(--orange)', color:'#fff', fontSize:11, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:2, fontFamily:'var(--mono)' }}>{i+1}</span>
            <span>{renderInline(item.replace(/^\d+[.)]\s*/, ''))}</span>
          </li>
        ))}
      </ol>
    )
    numbered = []
  }

  function flushTable() {
    if (!tableLines.length) return
    // Parse markdown table: | col | col | col |
    const rows = tableLines.map(l =>
      l.split('|').map(c => c.trim()).filter((_, i, a) => i > 0 && i < a.length - 1)
    )
    const validRows = rows.filter(r => r.length > 0 && !r.every(c => /^[-:]+$/.test(c)))
    if (!validRows.length) { tableLines = []; return }
    const [head, ...body] = validRows
    elements.push(
      <div key={`tbl-${elements.length}`} style={{ overflowX:'auto', margin:'24px 0' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13.5, lineHeight:1.6 }}>
          <thead>
            <tr>
              {head.map((h, i) => (
                <th key={i} style={{ background:'var(--ink)', color:'#fff', padding:'10px 14px', textAlign:'left', fontFamily:'var(--mono)', fontSize:11, textTransform:'uppercase', letterSpacing:'.07em', fontWeight:500, whiteSpace:'nowrap' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row, ri) => (
              <tr key={ri} style={{ background: ri % 2 === 0 ? 'var(--white)' : 'var(--cream)' }}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding:'10px 14px', borderBottom:'1px solid var(--border2)', color:'var(--ink2)', verticalAlign:'top' }}>
                    {renderInline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
    tableLines = []
    inTable = false
  }

  function flushAll() {
    flushPara()
    flushBullets()
    flushNumbered()
    flushTable()
  }

  function pushH2(text, idx) {
    h2Count++
    elements.push(
      <h2 key={`h2-${idx}`} style={{ fontFamily:'var(--serif)', fontSize:'1.3rem', fontWeight:600, marginTop:44, marginBottom:16, color:'var(--ink)', lineHeight:1.25, borderBottom:'2px solid var(--border2)', paddingBottom:10 }}>
        {text}
      </h2>
    )
    if (h2Count % 3 === 0 && inlineFAQs?.[slotIndex]?.length > 0) {
      elements.push(<InlineFAQ key={`faq-${h2Count}`} faqs={inlineFAQs[slotIndex]} />)
      slotIndex++
    }
  }

  function pushH3(text, idx) {
    elements.push(
      <h3 key={`h3-${idx}`} style={{ fontFamily:'var(--serif)', fontSize:'1.05rem', fontWeight:600, marginTop:28, marginBottom:10, color:'var(--ink)', lineHeight:1.3 }}>
        {text}
      </h3>
    )
  }

  lines.forEach((line, idx) => {
    // Table rows
    if (line.trim().startsWith('|')) {
      flushPara(); flushBullets(); flushNumbered()
      inTable = true
      tableLines.push(line)
      return
    }
    if (inTable) { flushTable() }

    // Headings
    if (line.startsWith('### ')) {
      flushAll()
      pushH3(line.slice(4), idx)
    } else if (line.startsWith('## ')) {
      flushAll()
      pushH2(line.slice(3), idx)
    } else if (line.startsWith('# ')) {
      flushAll()
      // H1 — don't render (page already has h1 as the post title)
    }
    // Bullet lists
    else if (/^[-•*] /.test(line)) {
      flushPara(); flushNumbered()
      bullets.push(line)
    }
    // Numbered lists
    else if (/^\d+[.)]\s/.test(line)) {
      flushPara(); flushBullets()
      numbered.push(line)
    }
    // Horizontal rule
    else if (/^---+$/.test(line.trim())) {
      flushAll()
      elements.push(<hr key={`hr-${idx}`} style={{ border:'none', borderTop:'1px solid var(--border)', margin:'32px 0' }} />)
    }
    // Empty line
    else if (line.trim() === '') {
      flushPara(); flushBullets(); flushNumbered()
    }
    // YouTube embed
    else if (/https:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/.test(line.trim())) {
      flushPara(); flushBullets(); flushNumbered()
      const ytId = line.trim().match(/https:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/)[1]
      elements.push(
        <div key={`yt-${elements.length}`} style={{ margin:'32px 0', borderRadius:12, overflow:'hidden', position:'relative', paddingTop:'56.25%', background:'#000' }}>
          <iframe
            src={`https://www.youtube.com/embed/${ytId}`}
            style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', border:'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )
    }

    // Regular paragraph
    else {
      if (bullets.length) flushBullets()
      if (numbered.length) flushNumbered()
      para.push(line)
    }
  })

  flushAll()
  return <>{elements}</>
}

// ── Full FAQ accordion ───────────────────────────────────────────────────────
function FAQSection({ faqs }) {
  const [open, setOpen]       = useState(null)
  const [visible, setVisible] = useState(5)
  const sentinelRef           = useRef(null)

  useEffect(() => {
    if (visible >= faqs.length || !sentinelRef.current) return
    const observer = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) setVisible(v => Math.min(v + 5, faqs.length)) },
      { threshold: 0.8 }
    )
    observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [visible, faqs.length])

  if (!faqs || faqs.length === 0) return null

  return (
    <div style={{ marginTop:48 }}>
      <h2 style={{ fontFamily:'var(--serif)', fontSize:'1.4rem', fontWeight:700, marginBottom:6, color:'var(--ink)' }}>Frequently Asked Questions</h2>
      <p style={{ fontSize:13, color:'var(--muted)', marginBottom:20 }}>{faqs.length} questions answered</p>
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {faqs.slice(0, visible).map((faq, i) => (
          <div key={i} style={{ border:'1px solid var(--border)', borderRadius:10, overflow:'hidden', background:'var(--white)' }}>
            <button onClick={() => setOpen(open === i ? null : i)}
              style={{ width:'100%', padding:'14px 18px', display:'flex', justifyContent:'space-between', alignItems:'center', background:'none', border:'none', cursor:'pointer', textAlign:'left', gap:12 }}>
              <span style={{ fontSize:14, fontWeight:500, color:'var(--ink)', lineHeight:1.45 }}>{faq.q}</span>
              <span style={{ fontSize:18, color:'var(--muted)', flexShrink:0, transition:'transform .2s', transform: open===i ? 'rotate(45deg)' : 'none' }}>+</span>
            </button>
            {open === i && (
              <div style={{ padding:'0 18px 16px', fontSize:13.5, color:'var(--ink2)', lineHeight:1.75, borderTop:'1px solid var(--border2)' }}>
                <div style={{ height:12 }} />
                {faq.a}
              </div>
            )}
          </div>
        ))}
        {visible < faqs.length && <div ref={sentinelRef} style={{ height:20 }} />}
        {visible < faqs.length && (
          <button onClick={() => setVisible(v => Math.min(v+5, faqs.length))}
            style={{ padding:'10px', background:'var(--cream)', border:'1px solid var(--border)', borderRadius:9, fontSize:13, cursor:'pointer', color:'var(--muted)' }}>
            Show more ({faqs.length - visible} remaining) ↓
          </button>
        )}
      </div>
    </div>
  )
}

// ── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ recentPosts, currentCategory }) {
  const TOOLS = [
    { icon:'🎯', label:'Eligibility Checker', sub:'Profile → shortlist in 2 min', href:'/eligibility', c:'#1D9E75' },
    { icon:'⚖️', label:'Compare Colleges',    sub:'AI side-by-side verdict',       href:'/compare',     c:'#d95f02' },
    { icon:'🎲', label:'MBA Game',            sub:'Score → college tiers',          href:'/mba-game',    c:'#a78bfa' },
    { icon:'📊', label:'Rankings',            sub:'5 views · Claude ranked',        href:'/rankings',    c:'#378ADD' },
  ]
  const related = recentPosts.filter(p => p.category === currentCategory).slice(0, 3)
  const recent  = recentPosts.filter(p => p.category !== currentCategory).slice(0, 5)

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      {/* CTA */}
      <div style={{ background:'var(--ink)', borderRadius:14, padding:'20px 18px' }}>
        <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'#1D9E75', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:10, display:'flex', alignItems:'center', gap:6 }}>
          <span style={{ width:5, height:5, borderRadius:'50%', background:'#1D9E75', display:'inline-block', animation:'blink 2s ease-in-out infinite' }} />
          Free · AI · Instant
        </div>
        <div style={{ fontFamily:'var(--serif)', fontSize:'1.05rem', fontWeight:700, color:'#fff', marginBottom:8, lineHeight:1.3 }}>Know your real conversion chances</div>
        <p style={{ fontSize:12, color:'rgba(255,255,255,.45)', marginBottom:14, lineHeight:1.65 }}>Enter your percentile, category, and background. AI shows your % chance at every top B-school.</p>
        <Link href="/eligibility" style={{ display:'block', textAlign:'center', background:'var(--orange)', color:'#fff', padding:'10px 16px', borderRadius:9, fontSize:12.5, fontWeight:600, textDecoration:'none' }}>
          Check My Chances →
        </Link>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div style={{ background:'var(--white)', borderRadius:14, border:'1px solid var(--border)', padding:'18px' }}>
          <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:14 }}>Related articles</div>
          {related.map((p, i) => {
            const s = catStyle(p.category)
            return (
              <Link key={p.id} href={`/blog/${p.slug}`} style={{ textDecoration:'none', display:'block', padding:'12px 0', borderBottom: i < related.length-1 ? '1px solid var(--border2)' : 'none' }}>
                <div style={{ fontSize:9, fontFamily:'var(--mono)', color:s.dot, textTransform:'uppercase', letterSpacing:'.06em', marginBottom:4 }}>{p.category}</div>
                <div style={{ fontSize:13, fontWeight:500, color:'var(--ink)', lineHeight:1.4 }}
                  onMouseOver={e => e.currentTarget.style.color='var(--orange)'}
                  onMouseOut={e => e.currentTarget.style.color='var(--ink)'}>{p.title}</div>
                <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--muted)', marginTop:4 }}>{p.read_time}</div>
              </Link>
            )
          })}
        </div>
      )}

      {/* Tools */}
      <div style={{ background:'var(--white)', borderRadius:14, border:'1px solid var(--border)', padding:'18px' }}>
        <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:14 }}>Collvera tools</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
          {TOOLS.map(t => (
            <Link key={t.href} href={t.href} style={{ textDecoration:'none', background:'var(--cream)', borderRadius:10, padding:'12px 10px', border:'1px solid var(--border2)', transition:'all .2s', display:'block' }}
              onMouseOver={e => { e.currentTarget.style.borderColor=t.c; e.currentTarget.style.transform='translateY(-2px)' }}
              onMouseOut={e => { e.currentTarget.style.borderColor='var(--border2)'; e.currentTarget.style.transform='none' }}>
              <div style={{ fontSize:20, marginBottom:6 }}>{t.icon}</div>
              <div style={{ fontSize:11.5, fontWeight:600, color:'var(--ink)', marginBottom:2, lineHeight:1.3 }}>{t.label}</div>
              <div style={{ fontSize:10, color:'var(--muted)', fontFamily:'var(--mono)' }}>{t.sub}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent */}
      {recent.length > 0 && (
        <div style={{ background:'var(--white)', borderRadius:14, border:'1px solid var(--border)', padding:'18px' }}>
          <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:14 }}>Recent articles</div>
          {recent.map((p, i) => {
            const s = catStyle(p.category)
            return (
              <Link key={p.id} href={`/blog/${p.slug}`} style={{ textDecoration:'none', display:'flex', gap:10, alignItems:'flex-start', padding:'10px 0', borderBottom: i < recent.length-1 ? '1px solid var(--border2)' : 'none' }}>
                <div style={{ width:7, height:7, borderRadius:'50%', background:s.dot, flexShrink:0, marginTop:5 }} />
                <div>
                  <div style={{ fontSize:12.5, fontWeight:500, color:'var(--ink)', lineHeight:1.4, marginBottom:2 }}
                    onMouseOver={e => e.currentTarget.style.color='var(--orange)'}
                    onMouseOut={e => e.currentTarget.style.color='var(--ink)'}>{p.title}</div>
                  <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)' }}>{p.read_time}</div>
                </div>
              </Link>
            )
          })}
          <Link href="/blog" style={{ display:'block', textAlign:'center', marginTop:14, fontSize:12, color:'var(--orange)', fontWeight:500, textDecoration:'none' }}>
            Browse all articles →
          </Link>
        </div>
      )}

      {/* Percentile quick check */}
      <div style={{ background:'var(--cream)', borderRadius:14, border:'1px solid var(--border)', padding:'18px' }}>
        <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:10 }}>Quick check</div>
        <div style={{ fontSize:13, fontWeight:600, color:'var(--ink)', marginBottom:14, lineHeight:1.4 }}>Where does your percentile stand?</div>
        {[
          ['99%ile+', 'IIM A, B, C, FMS',      '#1D9E75'],
          ['97-98%',  'XLRI, SPJIMR, IIM L',   '#2a9d8f'],
          ['95-96%',  'MDI, IIFT, IIM K',       '#EF9F27'],
          ['90-94%',  'IMT, TAPMI, FORE',       '#e06c00'],
          ['<90%',    'Tier 3 & state colleges','#b5341b'],
        ].map(([pct, colleges, color]) => (
          <div key={pct} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
            <div style={{ fontSize:10.5, fontFamily:'var(--mono)', fontWeight:600, color, minWidth:54 }}>{pct}</div>
            <div style={{ flex:1, height:4, background:'var(--border)', borderRadius:2, overflow:'hidden' }}>
              <div style={{ height:'100%', background:color, borderRadius:2, width: pct==='99%ile+' ? '95%' : pct==='97-98%' ? '78%' : pct==='95-96%' ? '62%' : pct==='90-94%' ? '45%' : '28%' }} />
            </div>
            <div style={{ fontSize:10, color:'var(--muted)', minWidth:100, textAlign:'right' }}>{colleges}</div>
          </div>
        ))}
        <Link href="/" style={{ display:'block', textAlign:'center', marginTop:14, fontSize:12, color:'var(--orange)', fontWeight:500, textDecoration:'none' }}>
          Get full verdict →
        </Link>
      </div>
    </div>
  )
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function BlogPostClient({ post, faqs = [], recentPosts = [] }) {
  const [leadOpen, setLeadOpen] = useState(false)
  const parsed     = parseContent(post.content)
  const inlineFAQs = [faqs.slice(0, 3), faqs.slice(3, 6), faqs.slice(6, 9)]

  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)' }}>
      <Nav onLeadOpen={() => setLeadOpen(true)} />

      <div style={{ maxWidth:1160, margin:'0 auto', padding:'28px 20px 60px' }}>
        <Link href="/blog" style={{ color:'var(--orange)', fontSize:13, fontWeight:500, textDecoration:'none', display:'inline-flex', alignItems:'center', gap:6, marginBottom:24 }}>
          ← Back to Blog
        </Link>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:36, alignItems:'start' }} className="blog-layout">

          {/* Article */}
          <article>
            <div style={{ display:'flex', gap:10, alignItems:'center', flexWrap:'wrap', marginBottom:10 }}>
              {post.category && (() => { const s = catStyle(post.category); return (
                <span style={{ fontSize:11, padding:'3px 10px', borderRadius:20, background:s.bg, color:s.color, fontFamily:'var(--mono)', fontWeight:500 }}>{post.category}</span>
              )})()}
              <span style={{ fontSize:12, color:'var(--muted)' }}>{post.read_time}</span>
              {post.published_at && (
                <span style={{ fontSize:12, color:'var(--muted)', fontFamily:'var(--mono)' }}>
                  {new Date(post.published_at).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}
                </span>
              )}
            </div>

            <h1 style={{ fontFamily:'var(--serif)', fontSize:'clamp(1.5rem,2.5vw,2rem)', fontWeight:600, lineHeight:1.25, marginBottom:16, marginTop:8, color:'var(--ink)', letterSpacing:'-0.01em' }}>
              {post.title}
            </h1>

            <div style={{ borderTop:'3px solid var(--orange)', borderBottom:'1px solid var(--border2)', padding:'14px 0', marginBottom:28 }}>
              <p style={{ fontSize:15, color:'var(--muted)', lineHeight:1.7, margin:0, fontStyle:'italic' }}>{post.description}</p>
            </div>

            <div style={{ padding:'8px 14px', background:'var(--cream2)', borderRadius:8, fontSize:11.5, color:'var(--muted)', marginBottom:28, fontFamily:'var(--mono)', display:'flex', alignItems:'center', gap:6 }}>
              <span>✓</span>
              <span>Last verified: April 2026 · Spot outdated data? Email verify@collvera.com</span>
            </div>

            <div style={{ fontSize:15, lineHeight:1.85, color:'var(--ink)' }}>
              {parsed.type === 'text' && (() => {
                const { tldr, body } = parseTLDR(parsed.data)
                return (
                  <>
                    {tldr && <TLDRBox tldr={tldr} />}
                    <RenderText text={body} inlineFAQs={inlineFAQs} />
                  </>
                )
              })()}

              {parsed.type === 'structured' && (
                <>
                  {parsed.data.intro && (
                    <p style={{ fontSize:16, lineHeight:1.85, color:'var(--ink2)', marginBottom:28, fontStyle:'italic', borderLeft:'3px solid var(--orange)', paddingLeft:16 }}>
                      {parsed.data.intro}
                    </p>
                  )}
                  {(parsed.data.sections || []).map((s, i) => (
                    <div key={i}>
                      {s.heading && <h2 style={{ fontFamily:'var(--serif)', fontSize:'1.3rem', fontWeight:700, marginTop:36, marginBottom:14, color:'var(--ink)', lineHeight:1.25 }}>{s.heading}</h2>}
                      {s.text && <p style={{ marginBottom:20, color:'var(--ink2)', lineHeight:1.85 }}>{s.text}</p>}
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

            {/* Mid CTA */}
            <div style={{ margin:'40px 0', padding:'20px 24px', background:'var(--orange-lt)', borderRadius:12, border:'1px solid rgba(217,95,2,.15)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
              <div>
                <div style={{ fontSize:14, fontWeight:600, color:'var(--ink)', marginBottom:2 }}>Not sure which college to apply to?</div>
                <div style={{ fontSize:12.5, color:'var(--muted)' }}>Check your eligibility across 20+ colleges in 2 minutes.</div>
              </div>
              <Link href="/eligibility" style={{ background:'var(--orange)', color:'#fff', padding:'9px 18px', borderRadius:8, fontSize:13, fontWeight:500, textDecoration:'none', whiteSpace:'nowrap' }}>
                Check Eligibility →
              </Link>
            </div>

            <FAQSection faqs={faqs} />

            {/* Bottom CTA */}
            <div style={{ marginTop:48, padding:'28px 32px', background:'var(--ink)', borderRadius:14, textAlign:'center' }}>
              <div style={{ fontFamily:'var(--serif)', fontSize:'1.15rem', fontWeight:700, color:'#fff', marginBottom:6 }}>Still have questions?</div>
              <p style={{ fontSize:13, color:'rgba(255,255,255,.5)', marginBottom:18, lineHeight:1.6 }}>
                Claude will shortlist colleges based on your score, budget and goals — free.
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
          </article>

          {/* Sidebar */}
          <aside style={{ position:'sticky', top:80 }} className="blog-sidebar">
            <Sidebar recentPosts={recentPosts} currentCategory={post.category} />
          </aside>
        </div>
      </div>

      <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)} />

      <style>{`
        @media(max-width:900px){
          .blog-layout{ grid-template-columns: 1fr !important; }
          .blog-sidebar{ position: static !important; }
        }
        @keyframes blink{ 0%,100%{opacity:1} 50%{opacity:.25} }
        table td, table th { font-family: var(--sans); }
      `}</style>
    </div>
  )
}
