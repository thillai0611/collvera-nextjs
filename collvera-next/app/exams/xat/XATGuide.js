'use client'
import { useState, useEffect, useRef } from 'react'
import Nav from '../../../components/Nav'
import Link from 'next/link'

import { ARTICLE_CONTENT, FAQS } from './content'

// Content loaded from content.js




const TOC = [
  { id:'1-what-is-xat-history-and-importance', label:'What is XAT?' },
  { id:'2-xat-2027-important-dates', label:'Important Dates 2027' },
  { id:'3-xat-exam-pattern-2027-complete-breakdown', label:'Exam Pattern' },
  { id:'4-xat-eligibility-criteria-2027', label:'Eligibility' },
  { id:'5-xat-registration-process-2027', label:'Registration' },
  { id:'6-xat-syllabus-2027-section-wise', label:'Syllabus' },
  { id:'7-xat-preparation-strategy-2027', label:'Preparation Strategy' },
  { id:'8-decision-making-complete-preparation-guide', label:'Decision Making Guide' },
  { id:'9-best-resources-for-xat-2027', label:'Best Resources' },
  { id:'10-colleges-accepting-xat-2027', label:'Colleges' },
  { id:'11-xat-score-vs-percentile', label:'Score vs Percentile' },
  { id:'12-common-mistakes-in-xat', label:'Common Mistakes' },
  { id:'14-after-xat-gdpi-and-selection-process', label:'After XAT — GD/PI' },
  { id:'faqs', label:'40 FAQs' },
]

// ── RENDERERS ─────────────────────────────────────────────────

function StatCard({ label, value, color }) {
  return (
    <div style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:10, padding:'12px 14px', textAlign:'center' }}>
      <div style={{ fontSize:9.5, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:4 }}>{label}</div>
      <div style={{ fontSize:15, fontWeight:600, color: color || 'var(--ink)' }}>{value}</div>
    </div>
  )
}

function Table({ rows }) {
  if (!rows || rows.length < 2) return null
  const headers = rows[0]
  const body = rows.slice(1)
  return (
    <div style={{ overflowX:'auto', marginBottom:24, borderRadius:10, border:'1px solid var(--border)' }}>
      <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13, fontFamily:'var(--sans)' }}>
        <thead>
          <tr style={{ background:'var(--ink)' }}>
            {headers.map((h,i) => (
              <th key={i} style={{ padding:'10px 14px', textAlign:'left', fontSize:11, fontFamily:'var(--mono)', color:'rgba(255,255,255,.7)', textTransform:'uppercase', letterSpacing:'.04em', fontWeight:500, whiteSpace:'nowrap' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row,i) => (
            <tr key={i} style={{ borderBottom:'1px solid var(--border)', background: i%2===0?'var(--white)':'var(--cream)' }}>
              {row.map((cell,j) => (
                <td key={j} style={{ padding:'10px 14px', color: j===0?'var(--ink)':'var(--ink2)', fontWeight: j===0?500:400, lineHeight:1.5 }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CalloutBox({ type, text }) {
  const styles = {
    '📌': { bg:'#fff8e1', border:'#f9d04a', icon:'📌', label:'Note' },
    '✅': { bg:'#e8f5e9', border:'#81c784', icon:'✅', label:'Tip' },
    '⚠️': { bg:'#fff3e0', border:'#ffb74d', icon:'⚠️', label:'Warning' },
    '💡': { bg:'#e8f4fd', border:'#64b5f6', icon:'💡', label:'Strategy' },
  }
  const s = styles[type] || styles['📌']
  return (
    <div style={{ background:s.bg, border:`1px solid ${s.border}`, borderRadius:10, padding:'12px 16px', marginBottom:20, display:'flex', gap:10, alignItems:'flex-start' }}>
      <span style={{ fontSize:16, flexShrink:0, marginTop:1 }}>{s.icon}</span>
      <div style={{ fontSize:13.5, lineHeight:1.7, color:'var(--ink2)' }}>{text}</div>
    </div>
  )
}

function QuickSummaryBox({ lines }) {
  const parsed = lines.map(l => {
    const idx = l.indexOf(':')
    if (idx === -1) return null
    return { label: l.slice(0,idx).trim(), value: l.slice(idx+1).trim() }
  }).filter(Boolean)

  return (
    <div style={{ background:'var(--ink)', borderRadius:14, padding:'24px 28px', marginBottom:32 }}>
      <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'#1D9E75', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:16 }}>Quick Summary — XAT 2027</div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:'10px 24px' }}>
        {parsed.map((item,i) => (
          <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start', paddingBottom:8, borderBottom:'1px solid rgba(255,255,255,.07)' }}>
            <span style={{ fontSize:12, color:'rgba(255,255,255,.4)', fontFamily:'var(--mono)', flexShrink:0, minWidth:130 }}>{item.label}</span>
            <span style={{ fontSize:12.5, color:'#fff', fontWeight:500, lineHeight:1.5 }}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function parseMarkdownTable(lines, startIdx) {
  const rows = []
  let i = startIdx
  while (i < lines.length && lines[i].trim().startsWith('|')) {
    const row = lines[i].trim().split('|').slice(1,-1).map(c => c.trim())
    if (!row.every(c => /^[-:]+$/.test(c))) rows.push(row)
    i++
  }
  return { rows, nextIdx: i }
}

function InlineFAQ({ faqs }) {
  const [open, setOpen] = useState(null)
  if (!faqs?.length) return null
  return (
    <div style={{ margin:'36px 0', background:'#f0f7ff', borderRadius:12, padding:'20px', border:'1px solid #b3d4f5' }}>
      <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'#1565c0', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:12, display:'flex', alignItems:'center', gap:8 }}>
        <span>💬</span> People also ask
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{ background:'var(--white)', borderRadius:9, overflow:'hidden', border:'1px solid #d0e8f8' }}>
            <button onClick={() => setOpen(open===i?null:i)}
              style={{ width:'100%', padding:'12px 14px', display:'flex', justifyContent:'space-between', alignItems:'center', background:'none', border:'none', cursor:'pointer', textAlign:'left', gap:10 }}>
              <span style={{ fontSize:13, fontWeight:500, color:'var(--ink)', lineHeight:1.4 }}>{faq.q}</span>
              <span style={{ fontSize:16, color:'var(--muted)', flexShrink:0, transition:'transform .2s', transform:open===i?'rotate(45deg)':'none' }}>+</span>
            </button>
            {open===i && (
              <div style={{ padding:'0 14px 12px', fontSize:13, color:'var(--ink2)', lineHeight:1.7, borderTop:'1px solid #e8f0f8' }}>
                <div style={{ height:10 }}/>{faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ProgressiveFAQ({ faqs }) {
  const [open, setOpen] = useState(null)
  const [visible, setVisible] = useState(5)
  const sentinelRef = useRef(null)

  useEffect(() => {
    if (visible >= faqs.length) return
    const observer = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) setVisible(v => Math.min(v+5, faqs.length)) },
      { threshold: 0.8 }
    )
    if (sentinelRef.current) observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [visible, faqs.length])

  return (
    <div id="faqs" style={{ marginTop:48 }}>
      <h2 style={{ fontFamily:'var(--serif)', fontSize:'1.6rem', fontWeight:700, marginBottom:6, color:'var(--ink)', scrollMarginTop:80 }}>
        Frequently Asked Questions
      </h2>
      <p style={{ fontSize:13, color:'var(--muted)', marginBottom:20 }}>{faqs.length} questions answered about XAT 2027</p>
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {faqs.slice(0,visible).map((faq,i) => (
          <div key={i} style={{ border:'1px solid var(--border)', borderRadius:10, overflow:'hidden', background:'var(--white)' }}>
            <button onClick={() => setOpen(open===i?null:i)}
              style={{ width:'100%', padding:'14px 18px', display:'flex', justifyContent:'space-between', alignItems:'center', background:'none', border:'none', cursor:'pointer', textAlign:'left', gap:12 }}>
              <span style={{ fontSize:14, fontWeight:500, color:'var(--ink)', lineHeight:1.45 }}>{faq.q}</span>
              <span style={{ fontSize:18, color:'var(--muted)', flexShrink:0, transition:'transform .2s', transform:open===i?'rotate(45deg)':'none' }}>+</span>
            </button>
            {open===i && (
              <div style={{ padding:'0 18px 16px', fontSize:13.5, color:'var(--ink2)', lineHeight:1.75, borderTop:'1px solid var(--border2)' }}>
                <div style={{ height:12 }}/>{faq.a}
              </div>
            )}
          </div>
        ))}
        {visible < faqs.length && <div ref={sentinelRef} style={{ height:20 }}/>}
        {visible < faqs.length && (
          <button onClick={() => setVisible(v => Math.min(v+5, faqs.length))}
            style={{ padding:'11px', background:'var(--cream)', border:'1px solid var(--border)', borderRadius:9, fontSize:13, cursor:'pointer', color:'var(--muted)', fontFamily:'var(--sans)' }}>
            Show more questions ({faqs.length-visible} remaining) ↓
          </button>
        )}
      </div>
    </div>
  )
}

function RenderContent({ text, faqs }) {
  const lines = text.split('\n')
  const elements = []
  let i = 0
  let h2Count = 0
  const inlineGroups = []
  for (let j=0; j<faqs.length; j+=3) inlineGroups.push(faqs.slice(j,j+3))

  while (i < lines.length) {
    const line = lines[i].trim()
    if (!line) { i++; continue }

    // Quick Summary box
    if (line === '## Quick Summary') {
      const summaryLines = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith('## ')) {
        if (lines[i].trim()) summaryLines.push(lines[i].trim())
        i++
      }
      elements.push(<QuickSummaryBox key="qsummary" lines={summaryLines}/>)
      continue
    }

    // H2
    if (line.startsWith('## ')) {
      h2Count++
      const title = line.replace('## ','')
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
      elements.push(
        <h2 key={`h2-${i}`} id={id} style={{ fontFamily:'var(--serif)', fontSize:'1.5rem', fontWeight:700, marginTop:44, marginBottom:16, color:'var(--ink)', lineHeight:1.2, scrollMarginTop:80, borderBottom:'2px solid var(--border)', paddingBottom:10 }}>
          {title}
        </h2>
      )
      if (h2Count % 3 === 0 && inlineGroups[Math.floor(h2Count/3)-1]) {
        elements.push(<InlineFAQ key={`ifaq-${h2Count}`} faqs={inlineGroups[Math.floor(h2Count/3)-1]}/>)
      }
      i++; continue
    }

    // H3
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={`h3-${i}`} style={{ fontFamily:'var(--serif)', fontSize:'1.15rem', fontWeight:700, marginTop:28, marginBottom:12, color:'var(--ink)' }}>
          {line.replace('### ','')}
        </h3>
      )
      i++; continue
    }

    // Callout boxes — > emoji text
    if (line.startsWith('> ')) {
      const text = line.slice(2).trim()
      const emoji = text.match(/^(📌|✅|⚠️|💡)/)?.[1] || '📌'
      const content = text.replace(/^(📌|✅|⚠️|💡)\s*/,'')
      elements.push(<CalloutBox key={`callout-${i}`} type={emoji} text={content}/>)
      i++; continue
    }

    // Markdown table
    if (line.startsWith('|')) {
      const { rows, nextIdx } = parseMarkdownTable(lines, i)
      elements.push(<Table key={`table-${i}`} rows={rows}/>)
      i = nextIdx; continue
    }

    // Skip verification line
    if (line.startsWith('Last verified:')) { i++; continue }

    // Bullet points
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const items = []
      while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))) {
        items.push(lines[i].trim().replace(/^[-*] /, ''))
        i++
      }
      elements.push(
        <ul key={`ul-${i}`} style={{ marginBottom:20, paddingLeft:22 }}>
          {items.map((item,j) => <li key={j} style={{ fontSize:15, color:'var(--ink2)', lineHeight:1.8, marginBottom:6 }}>{item}</li>)}
        </ul>
      )
      continue
    }

    // Paragraph
    const paraLines = []
    while (i < lines.length && lines[i].trim() && !lines[i].trim().startsWith('#') && !lines[i].trim().startsWith('|') && !lines[i].trim().startsWith('>') && !lines[i].trim().startsWith('- ') && !lines[i].trim().startsWith('* ')) {
      paraLines.push(lines[i].trim())
      i++
    }
    if (paraLines.length) {
      elements.push(
        <p key={`p-${i}`} style={{ marginBottom:22, color:'var(--ink2)', lineHeight:1.9, fontSize:15.5 }}>
          {paraLines.join(' ')}
        </p>
      )
    }
  }
  return <>{elements}</>
}

function TableOfContents({ activeSection }) {
  return (
    <nav style={{ position:'sticky', top:80, background:'var(--white)', border:'1px solid var(--border)', borderRadius:12, padding:'16px' }}>
      <div style={{ fontWeight:500, color:'var(--ink)', marginBottom:12, fontSize:13 }}>Contents</div>
      <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
        {TOC.map(item => (
          <a key={item.id} href={`#${item.id}`}
            style={{ padding:'5px 8px', borderRadius:6, color:activeSection===item.id?'var(--orange)':'var(--muted)', background:activeSection===item.id?'var(--orange-lt)':'transparent', textDecoration:'none', fontSize:12, lineHeight:1.4, transition:'all .15s', borderLeft:activeSection===item.id?'2px solid var(--orange)':'2px solid transparent', display:'block' }}>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

export default function XATGuide() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }) },
      { rootMargin:'-20% 0px -70% 0px' }
    )
    TOC.forEach(item => { const el = document.getElementById(item.id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)' }}>
      <Nav/>

      <div className='cat-hero' style={{ background:'var(--ink)', padding:'44px 32px 40px', borderBottom:'1px solid rgba(255,255,255,.07)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
            <Link href="/exams" style={{ fontSize:12, color:'rgba(255,255,255,.4)', textDecoration:'none', fontFamily:'var(--mono)' }}>Exams</Link>
            <span style={{ color:'rgba(255,255,255,.2)' }}>›</span>
            <span style={{ fontSize:12, color:'rgba(255,255,255,.4)', fontFamily:'var(--mono)' }}>XAT 2027</span>
          </div>
          <div style={{ display:'flex', alignItems:'flex-start', gap:20 }}>
            <span style={{ fontSize:40 }}>✝️</span>
            <div>
              <h1 style={{ fontFamily:'var(--serif)', fontSize:'clamp(1.8rem,3vw,2.6rem)', fontWeight:700, color:'#fff', marginBottom:8, lineHeight:1.1 }}>
                XAT Exam 2027 — The Complete Guide
              </h1>
              <p style={{ fontSize:14, color:'rgba(255,255,255,.5)', maxWidth:600, lineHeight:1.7 }}>
                Syllabus, pattern, eligibility, dates, preparation strategy and {FAQS.length} FAQs. Updated March 2026.
              </p>
              <div style={{ display:'flex', gap:16, marginTop:14, flexWrap:'wrap' }}>
                {[['35 min read','📖'],['10,000 words','📝'],[`${FAQS.length} FAQs`,'💬'],['Updated Mar 2026','✓']].map(([l,e]) => (
                  <span key={l} style={{ fontSize:11, fontFamily:'var(--mono)', color:'rgba(255,255,255,.4)' }}>{e} {l}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='cat-layout' style={{ maxWidth:1100, margin:'0 auto', padding:'36px 24px 60px', display:'grid', gridTemplateColumns:'200px 1fr', gap:40, alignItems:'start' }}>
        <div>
          <TableOfContents activeSection={activeSection}/>
        </div>
        <div style={{ maxWidth:760 }}>
          <div style={{ padding:'8px 14px', background:'var(--white)', borderRadius:8, fontSize:11.5, color:'var(--muted)', marginBottom:28, fontFamily:'var(--mono)', display:'flex', alignItems:'center', gap:6, border:'1px solid var(--border)' }}>
            <span>✓</span><span>Last verified: March 2026 · Spot outdated data? Email verify@collvera.com</span>
          </div>

          <RenderContent text={ARTICLE_CONTENT} faqs={FAQS}/>

          <div style={{ margin:'40px 0', padding:'20px 24px', background:'var(--orange-lt)', borderRadius:12, border:'1px solid rgba(217,95,2,.15)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
            <div>
              <div style={{ fontSize:14, fontWeight:600, color:'var(--ink)', marginBottom:2 }}>Know your mock score? See which colleges you can get into.</div>
              <div style={{ fontSize:12.5, color:'var(--muted)' }}>The MBA Game — enter CAT/XAT/NMAT score → college matches in 2 minutes.</div>
            </div>
            <Link href="/mba-game" style={{ background:'var(--orange)', color:'#fff', padding:'10px 20px', borderRadius:8, fontSize:13, fontWeight:500, textDecoration:'none', flexShrink:0 }}>Play The MBA Game →</Link>
          </div>

          <ProgressiveFAQ faqs={FAQS}/>

          <div style={{ marginTop:48, padding:'28px 32px', background:'var(--ink)', borderRadius:14, textAlign:'center' }}>
            <div style={{ fontFamily:'var(--serif)', fontSize:'1.2rem', fontWeight:700, color:'#fff', marginBottom:6 }}>Ready to check your college eligibility?</div>
            <p style={{ fontSize:13, color:'rgba(255,255,255,.5)', marginBottom:20, lineHeight:1.6 }}>Enter your CAT score, academics and profile. See which colleges you qualify for in 2 minutes.</p>
            <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
              <Link href="/eligibility" style={{ background:'var(--orange)', color:'#fff', padding:'11px 24px', borderRadius:8, fontSize:13, fontWeight:500, textDecoration:'none' }}>Check My Eligibility →</Link>
              <Link href="/mba-game" style={{ background:'rgba(255,255,255,.08)', color:'rgba(255,255,255,.7)', padding:'11px 24px', borderRadius:8, fontSize:13, textDecoration:'none', border:'1px solid rgba(255,255,255,.12)' }}>Play The MBA Game</Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
  @media(max-width:768px){
    .cat-layout{grid-template-columns:1fr!important}
    .cat-layout>div:first-child{display:none!important}
    .cat-layout>div:last-child{max-width:100%!important;padding:0!important}
    .cat-hero{padding:28px 16px 24px!important}
    .cat-content{padding:20px 16px 40px!important}
    table{font-size:12px!important;display:block;overflow-x:auto;white-space:nowrap}
    th,td{padding:7px 10px!important}
  }
  @media(max-width:480px){
    .cat-hero h1{font-size:1.5rem!important}
  }
`}</style>
    </div>
  )
}
