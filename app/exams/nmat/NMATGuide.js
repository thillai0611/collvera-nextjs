'use client'
import { useState, useEffect, useRef } from 'react'
import Nav from '../../../components/Nav'
import Link from 'next/link'
import { ARTICLE_CONTENT, FAQS } from './content'

const TOC = [
  { id:'nmat-score-college-guide', label:'Score → College Guide' },
  { id:'1-what-is-nmat-history-and-importance', label:'What is NMAT?' },
  { id:'2-nmat-2026-important-dates', label:'Important Dates' },
  { id:'3-nmat-exam-pattern-2026', label:'Exam Pattern' },
  { id:'4-nmat-eligibility-criteria-2026', label:'Eligibility' },
  { id:'5-nmat-registration-process-2026', label:'Registration' },
  { id:'6-nmat-syllabus-2026-section-wise', label:'Syllabus' },
  { id:'7-nmat-score-vs-colleges-the-complete-guide', label:'Score vs Colleges' },
  { id:'8-nmat-preparation-strategy-2026', label:'Preparation Strategy' },
  { id:'9-section-wise-preparation-tips', label:'Section-Wise Tips' },
  { id:'10-best-resources-for-nmat-2026', label:'Best Resources' },
  { id:'11-common-mistakes-in-nmat', label:'Common Mistakes' },
  { id:'13-after-nmat-selection-process', label:'After NMAT — GD/PI' },
  { id:'faqs', label:'40 FAQs' },
]

// Score → College interactive widget
function ScoreCollegeWidget() {
  const [score, setScore] = useState(220)

  const colleges = [
    { name:'SPJIMR Mumbai', cutoff:230, fees:'₹26.5L', pkg:'₹32 LPA', tag:'Best ROI at 230+', color:'#1D9E75' },
    { name:'NMIMS Mumbai SBM', cutoff:248, fees:'₹27L', pkg:'₹24 LPA', tag:'Premium program', color:'#d95f02' },
    { name:'NMIMS Mumbai (Main)', cutoff:209, fees:'₹25L', pkg:'₹18 LPA', tag:'Most sought-after', color:'#d95f02' },
    { name:'KJ Somaiya Mumbai', cutoff:223, fees:'₹18L', pkg:'₹13 LPA', tag:'Strong Mumbai network', color:'#1565c0' },
    { name:'SDA Bocconi India', cutoff:220, fees:'₹22L', pkg:'₹15 LPA', tag:'International brand', color:'#534AB7' },
    { name:'TAPMI Manipal', cutoff:220, fees:'₹17.3L', pkg:'₹11 LPA', tag:'Banking specialisation', color:'#1565c0' },
    { name:'Great Lakes Chennai (PGPM)', cutoff:210, fees:'₹21L', pkg:'₹12 LPA', tag:'1-yr PGPM for experience', color:'#1565c0' },
    { name:'NMIMS Bangalore', cutoff:205, fees:'₹18L', pkg:'₹12 LPA', tag:'Tech hub location', color:'#666' },
    { name:'NMIMS Hyderabad', cutoff:200, fees:'₹17L', pkg:'₹11 LPA', tag:'Newer campus', color:'#666' },
    { name:'IFMR Chennai', cutoff:200, fees:'₹14L', pkg:'₹10 LPA', tag:'Finance focus', color:'#666' },
    { name:'Shiv Nadar University', cutoff:200, fees:'₹15L', pkg:'₹10 LPA', tag:'NCR location', color:'#666' },
    { name:'SOIL Gurgaon', cutoff:205, fees:'₹17L', pkg:'₹11 LPA', tag:'Gurgaon — NCR access', color:'#1565c0' },
    { name:'Woxsen University', cutoff:190, fees:'₹12L', pkg:'₹8 LPA', tag:'Hyderabad campus', color:'#888' },
  ]

  const qualified = colleges.filter(c => score >= c.cutoff)
  const close = colleges.filter(c => score >= c.cutoff - 15 && score < c.cutoff)

  return (
    <div id="nmat-score-college-guide" style={{ background:'var(--ink)', borderRadius:14, padding:'24px', marginBottom:32, scrollMarginTop:80 }}>
      <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'#1D9E75', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:14 }}>
        Interactive — NMAT Score → College Matcher
      </div>

      {/* Slider */}
      <div style={{ marginBottom:20 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
          <span style={{ fontSize:13, color:'rgba(255,255,255,.5)' }}>Your NMAT score</span>
          <div style={{ display:'flex', alignItems:'baseline', gap:4 }}>
            <span style={{ fontFamily:'var(--serif)', fontSize:'2.8rem', fontWeight:700, color:'#fff', lineHeight:1 }}>{score}</span>
            <span style={{ fontSize:11, color:'rgba(255,255,255,.4)' }}>/ 360</span>
          </div>
        </div>
        <input type="range" min="150" max="360" step="1" value={score}
          onChange={e => setScore(parseInt(e.target.value))}
          style={{ width:'100%', accentColor:'var(--orange)' }}/>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:10, fontFamily:'var(--mono)', color:'rgba(255,255,255,.3)', marginTop:4 }}>
          <span>150</span><span>200</span><span>230</span><span>248</span><span>280</span><span>360</span>
        </div>
      </div>

      {/* Results */}
      <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
        {qualified.length > 0 && (
          <>
            <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'#1D9E75', marginBottom:4 }}>
              ✅ You qualify for {qualified.length} college{qualified.length>1?'s':''}
            </div>
            {qualified.map(c => (
              <div key={c.name} style={{ background:'rgba(255,255,255,.06)', borderRadius:9, padding:'10px 14px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:10, border:`1px solid ${c.color}30` }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:500, color:'#fff', marginBottom:2 }}>{c.name}</div>
                  <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'rgba(255,255,255,.35)' }}>{c.fees} fees · {c.pkg} avg</div>
                </div>
                <div style={{ textAlign:'right', flexShrink:0 }}>
                  <div style={{ fontSize:10, color:c.color, fontFamily:'var(--mono)', marginBottom:2 }}>{c.tag}</div>
                  <div style={{ fontSize:10, color:'rgba(255,255,255,.3)' }}>Cutoff {c.cutoff}+</div>
                </div>
              </div>
            ))}
          </>
        )}

        {close.length > 0 && (
          <>
            <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'#ef9f27', marginTop:8, marginBottom:4 }}>
              🎯 {close.length} more college{close.length>1?'s':''} within reach — improve by {close[0].cutoff - score} points
            </div>
            {close.map(c => (
              <div key={c.name} style={{ background:'rgba(239,159,39,.06)', borderRadius:9, padding:'10px 14px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:10, border:'1px solid rgba(239,159,39,.2)', opacity:0.8 }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:500, color:'rgba(255,255,255,.7)' }}>{c.name}</div>
                  <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'rgba(255,255,255,.3)' }}>{c.fees} fees · {c.pkg} avg</div>
                </div>
                <div style={{ fontSize:11, color:'#ef9f27', fontFamily:'var(--mono)', flexShrink:0 }}>+{c.cutoff - score} pts needed</div>
              </div>
            ))}
          </>
        )}

        {qualified.length === 0 && close.length === 0 && (
          <div style={{ fontSize:13, color:'rgba(255,255,255,.4)', textAlign:'center', padding:'20px 0' }}>
            Score below 190 — target 190+ to qualify for Woxsen and tier-3 colleges
          </div>
        )}
      </div>

      <div style={{ marginTop:14, paddingTop:12, borderTop:'1px solid rgba(255,255,255,.08)', display:'flex', gap:8, flexWrap:'wrap' }}>
        <Link href="/eligibility" style={{ fontSize:12, color:'var(--orange)', textDecoration:'none', fontFamily:'var(--mono)' }}>
          Full eligibility check with profile →
        </Link>
        <span style={{ fontSize:12, color:'rgba(255,255,255,.2)', fontFamily:'var(--mono)' }}>·</span>
        <Link href="/mba-game" style={{ fontSize:12, color:'rgba(255,255,255,.4)', textDecoration:'none', fontFamily:'var(--mono)' }}>
          Play The MBA Game →
        </Link>
      </div>
    </div>
  )
}

function Table({ rows }) {
  if (!rows || rows.length < 2) return null
  const headers = rows[0]
  const body = rows.slice(1)
  return (
    <div style={{ overflowX:'auto', marginBottom:24, borderRadius:10, border:'1px solid var(--border)' }}>
      <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
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
    '📌': { bg:'#fff8e1', border:'#f9d04a' },
    '✅': { bg:'#e8f5e9', border:'#81c784' },
    '⚠️': { bg:'#fff3e0', border:'#ffb74d' },
    '💡': { bg:'#e8f4fd', border:'#64b5f6' },
  }
  const s = styles[type] || styles['📌']
  return (
    <div style={{ background:s.bg, border:`1px solid ${s.border}`, borderRadius:10, padding:'12px 16px', marginBottom:20, display:'flex', gap:10 }}>
      <span style={{ fontSize:16, flexShrink:0, marginTop:1 }}>{type}</span>
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
      <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'#1D9E75', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:16 }}>Quick Summary — NMAT 2026</div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:'10px 24px' }}>
        {parsed.map((item,i) => (
          <div key={i} style={{ display:'flex', gap:10, paddingBottom:8, borderBottom:'1px solid rgba(255,255,255,.07)' }}>
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
      <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'#1565c0', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:12 }}>💬 People also ask</div>
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
      <h2 style={{ fontFamily:'var(--serif)', fontSize:'1.6rem', fontWeight:700, marginBottom:6, color:'var(--ink)', scrollMarginTop:80 }}>Frequently Asked Questions</h2>
      <p style={{ fontSize:13, color:'var(--muted)', marginBottom:20 }}>{faqs.length} questions answered about NMAT 2026</p>
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
            style={{ padding:'11px', background:'var(--cream)', border:'1px solid var(--border)', borderRadius:9, fontSize:13, cursor:'pointer', color:'var(--muted)' }}>
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
  let showedScoreWidget = false
  const inlineGroups = []
  for (let j=0; j<faqs.length; j+=3) inlineGroups.push(faqs.slice(j,j+3))

  while (i < lines.length) {
    const line = lines[i].trim()
    if (!line) { i++; continue }

    // Quick summary
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

    // Special: Score→College widget placeholder
    if (line === '## NMAT Score → College Guide') {
      elements.push(<ScoreCollegeWidget key="score-widget"/>)
      i++
      showedScoreWidget = true
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

    // Callout
    if (line.startsWith('> ')) {
      const text = line.slice(2).trim()
      const emoji = text.match(/^(📌|✅|⚠️|💡)/)?.[1] || '📌'
      const content = text.replace(/^(📌|✅|⚠️|💡)\s*/,'')
      elements.push(<CalloutBox key={`callout-${i}`} type={emoji} text={content}/>)
      i++; continue
    }

    // Table
    if (line.startsWith('|')) {
      const { rows, nextIdx } = parseMarkdownTable(lines, i)
      elements.push(<Table key={`table-${i}`} rows={rows}/>)
      i = nextIdx; continue
    }

    if (line.startsWith('Last verified:')) { i++; continue }

    // Bullets
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const items = []
      while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))) {
        items.push(lines[i].trim().replace(/^[-*] /,''))
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

export default function NMATGuide() {
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
      <div style={{ background:'var(--ink)', padding:'44px 32px 40px', borderBottom:'1px solid rgba(255,255,255,.07)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
            <Link href="/exams" style={{ fontSize:12, color:'rgba(255,255,255,.4)', textDecoration:'none', fontFamily:'var(--mono)' }}>Exams</Link>
            <span style={{ color:'rgba(255,255,255,.2)' }}>›</span>
            <span style={{ fontSize:12, color:'rgba(255,255,255,.4)', fontFamily:'var(--mono)' }}>NMAT 2026</span>
          </div>
          <div style={{ display:'flex', alignItems:'flex-start', gap:20 }}>
            <span style={{ fontSize:40 }}>📊</span>
            <div>
              <h1 style={{ fontFamily:'var(--serif)', fontSize:'clamp(1.8rem,3vw,2.6rem)', fontWeight:700, color:'#fff', marginBottom:8, lineHeight:1.1 }}>
                NMAT Exam 2026 — The Complete Guide
              </h1>
              <p style={{ fontSize:14, color:'rgba(255,255,255,.5)', maxWidth:620, lineHeight:1.7 }}>
                3-attempt system, no negative marking, score-to-college matcher, and {FAQS.length} FAQs. Updated March 2026.
              </p>
              <div style={{ display:'flex', gap:16, marginTop:14, flexWrap:'wrap' }}>
                {[['40 min read','📖'],['3 attempts','🔄'],['No negative marking','✅'],[`${FAQS.length} FAQs`,'💬'],['Updated Mar 2026','✓']].map(([l,e]) => (
                  <span key={l} style={{ fontSize:11, fontFamily:'var(--mono)', color:'rgba(255,255,255,.4)' }}>{e} {l}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1100, margin:'0 auto', padding:'36px 24px 60px', display:'grid', gridTemplateColumns:'200px 1fr', gap:40, alignItems:'start' }} className="nmat-layout">
        <div><TableOfContents activeSection={activeSection}/></div>
        <div style={{ maxWidth:760 }}>
          <div style={{ padding:'8px 14px', background:'var(--white)', borderRadius:8, fontSize:11.5, color:'var(--muted)', marginBottom:28, fontFamily:'var(--mono)', display:'flex', alignItems:'center', gap:6, border:'1px solid var(--border)' }}>
            <span>✓</span><span>Last verified: March 2026 · verify@collvera.com</span>
          </div>
          <RenderContent text={ARTICLE_CONTENT} faqs={FAQS}/>
          <div style={{ margin:'40px 0', padding:'20px 24px', background:'var(--orange-lt)', borderRadius:12, border:'1px solid rgba(217,95,2,.15)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
            <div>
              <div style={{ fontSize:14, fontWeight:600, color:'var(--ink)', marginBottom:2 }}>Know your NMAT mock score? See all colleges you can get into.</div>
              <div style={{ fontSize:12.5, color:'var(--muted)' }}>The MBA Game — enter score → see college matches in 2 minutes.</div>
            </div>
            <Link href="/mba-game" style={{ background:'var(--orange)', color:'#fff', padding:'10px 20px', borderRadius:8, fontSize:13, fontWeight:500, textDecoration:'none', flexShrink:0 }}>Play The MBA Game →</Link>
          </div>
          <ProgressiveFAQ faqs={FAQS}/>
          <div style={{ marginTop:48, padding:'28px 32px', background:'var(--ink)', borderRadius:14, textAlign:'center' }}>
            <div style={{ fontFamily:'var(--serif)', fontSize:'1.2rem', fontWeight:700, color:'#fff', marginBottom:6 }}>Check your full eligibility across 20+ colleges</div>
            <p style={{ fontSize:13, color:'rgba(255,255,255,.5)', marginBottom:20, lineHeight:1.6 }}>Enter your NMAT score, academics and profile for personalised college matches.</p>
            <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
              <Link href="/eligibility" style={{ background:'var(--orange)', color:'#fff', padding:'11px 24px', borderRadius:8, fontSize:13, fontWeight:500, textDecoration:'none' }}>Check My Eligibility →</Link>
              <Link href="/mba-game" style={{ background:'rgba(255,255,255,.08)', color:'rgba(255,255,255,.7)', padding:'11px 24px', borderRadius:8, fontSize:13, textDecoration:'none', border:'1px solid rgba(255,255,255,.12)' }}>Play The MBA Game</Link>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.nmat-layout{grid-template-columns:1fr!important}.nmat-layout>div:first-child{display:none!important}}`}</style>
    </div>
  )
}
