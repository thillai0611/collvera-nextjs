'use client'
import { useState } from 'react'
import Nav from '../components/Nav'
import LeadModal from '../components/LeadModal'
import Ticker from '../components/home/Ticker'
import ChatWidget from '../components/ChatBox'
import Link from 'next/link'

// ── Brutal Reality engine ────────────────────────────────────────────────────
const COLLEGES = [
  { name:'IIM Ahmedabad',   short:'IIM A',  cutoff:99,  cutoffF:97,  fees:27.5, avg:35,  slug:'iim-ahmedabad',       tier:1 },
  { name:'IIM Bangalore',   short:'IIM B',  cutoff:99,  cutoffF:97,  fees:24.5, avg:33,  slug:'iim-bangalore',       tier:1 },
  { name:'IIM Calcutta',    short:'IIM C',  cutoff:99,  cutoffF:97,  fees:27,   avg:32,  slug:'iim-calcutta',        tier:1 },
  { name:'FMS Delhi',       short:'FMS',    cutoff:98,  cutoffF:96,  fees:2.4,  avg:34,  slug:'fms-delhi',           tier:1 },
  { name:'XLRI Jamshedpur', short:'XLRI',   cutoff:97,  cutoffF:95,  fees:27,   avg:28,  slug:'xlri-jamshedpur',     tier:1 },
  { name:'SPJIMR Mumbai',   short:'SPJ',    cutoff:97,  cutoffF:95,  fees:23,   avg:27,  slug:'spjimr-mumbai',       tier:1 },
  { name:'JBIMS Mumbai',    short:'JBIMS',  cutoff:99,  cutoffF:97,  fees:3,    avg:28,  slug:'jbims-mumbai',        tier:1 },
  { name:'IIM Lucknow',     short:'IIM L',  cutoff:97,  cutoffF:95,  fees:19,   avg:27,  slug:'iim-lucknow',         tier:2 },
  { name:'IIM Kozhikode',   short:'IIM K',  cutoff:96,  cutoffF:94,  fees:21,   avg:24,  slug:'iim-kozhikode',       tier:2 },
  { name:'MDI Gurgaon',     short:'MDI',    cutoff:96,  cutoffF:94,  fees:21,   avg:22,  slug:'mdi-gurgaon',         tier:2 },
  { name:'IIFT Delhi',      short:'IIFT',   cutoff:96,  cutoffF:94,  fees:16,   avg:22,  slug:'iift-delhi',          tier:2 },
  { name:'IMT Ghaziabad',   short:'IMT',    cutoff:90,  cutoffF:88,  fees:17,   avg:14,  slug:'imt-ghaziabad',       tier:3 },
  { name:'TAPMI Manipal',   short:'TAPMI',  cutoff:85,  cutoffF:83,  fees:16,   avg:11,  slug:'tapmi-manipal',       tier:3 },
  { name:'FORE Delhi',      short:'FORE',   cutoff:85,  cutoffF:83,  fees:14,   avg:11,  slug:'fore-school-delhi',   tier:3 },
  { name:'Great Lakes',     short:'GLIM',   cutoff:83,  cutoffF:81,  fees:15,   avg:11,  slug:'great-lakes-chennai', tier:3 },
]

const CAT_BOOST = { general:0, obc:3, sc:8, st:10 }
const BG_BOOST  = { engineer:0, noneng:3, commerce:2 }
const GEN_BOOST = { male:0, female:3 }

function chance(eff, cutoff) {
  const g = eff - cutoff
  if (g >= 3)  return { pct: Math.min(95, 82 + g * 2), label:'Strong match',    bar:'#1D9E75' }
  if (g >= 1)  return { pct: 60 + g * 10,              label:'Good match',      bar:'#2a9d8f' }
  if (g >= 0)  return { pct: 42,                        label:'Borderline',      bar:'#EF9F27' }
  if (g >= -2) return { pct: Math.max(12, 42 + g * 12),label:'Low chance',      bar:'#e06c00' }
  return               { pct: Math.max(3,  12 + g * 3), label:'Not recommended', bar:'#b5341b' }
}

function compute(percentile, cat, bg, gen) {
  const boost = (CAT_BOOST[cat]||0) + (BG_BOOST[bg]||0) + (GEN_BOOST[gen]||0)
  const eff = Math.min(99.9, percentile + boost)
  return COLLEGES
    .map(c => ({ ...c, ch: chance(eff, c.cutoff), eff }))
    .sort((a,b) => b.ch.pct - a.ch.pct)
}

// ── Static data ──────────────────────────────────────────────────────────────
const STEPS = [
  { n:'01', icon:'⌨️',  title:'Enter your score',        body:'Type your percentile. Add category, academic background, and gender — AI adjusts your effective score instantly.' },
  { n:'02', icon:'📊',  title:'See your brutal reality', body:'Every college shows a real conversion %. Strong match, borderline, low chance. No sugar-coating, no false hope.' },
  { n:'03', icon:'⚖️',  title:'Compare and shortlist',   body:'Drill into any college. Compare two side by side. AI gives a verdict for your goals — consulting, finance, or startup.' },
  { n:'04', icon:'🎯',  title:'Apply with a plan',       body:'Track deadlines, fees, and PI dates. Use the eligibility checker for a deep-profile match before you apply anywhere.' },
]

const TOOLS = [
  { icon:'⚖️', label:'College compare',     sub:'Side-by-side · AI verdict',   href:'/compare',     c:'#d95f02' },
  { icon:'🎯', label:'Eligibility checker', sub:'Full profile → shortlist',     href:'/eligibility', c:'#1D9E75' },
  { icon:'📊', label:'Rankings',            sub:'5 views · Claude ranked',      href:'/rankings',    c:'#378ADD' },
  { icon:'🎲', label:'MBA Game',            sub:'Score → college tiers',        href:'/mba-game',    c:'#a78bfa' },
  { icon:'📖', label:'Exam guides',         sub:'CAT · XAT · NMAT deep dives',  href:'/exams',       c:'#EF9F27' },
  { icon:'✍️', label:'MBA blog',            sub:'150+ guides · publishing daily',href:'/blog',       c:'#d95f02' },
]

const SAMPLE_SLOTS = [
  { pct:'99',  label:'IIM A / B / C territory' },
  { pct:'97',  label:'XLRI · SPJIMR · FMS' },
  { pct:'95',  label:'MDI · IIM Lucknow · IIFT' },
  { pct:'90',  label:'IMT · TAPMI · FORE' },
]

// ── Component ────────────────────────────────────────────────────────────────
export default function HomeClient() {
  const [leadOpen, setLeadOpen]   = useState(false)
  const [percentile, setPercentile] = useState('')
  const [category, setCategory]   = useState('general')
  const [background, setBg]       = useState('engineer')
  const [gender, setGender]       = useState('male')
  const [results, setResults]     = useState(null)
  const [showAll, setShowAll]     = useState(false)
  const [inputFocused, setFocus]  = useState(false)

  function handleSubmit(e) {
    e?.preventDefault()
    const p = parseFloat(percentile)
    if (!p || p < 1 || p > 100) return
    setResults(compute(p, category, background, gender))
    setShowAll(false)
    setTimeout(() => document.getElementById('verdict')?.scrollIntoView({ behavior:'smooth', block:'start' }), 80)
  }

  function quickFill(pct) {
    setPercentile(pct)
    setResults(compute(parseFloat(pct), category, background, gender))
    setShowAll(false)
    setTimeout(() => document.getElementById('verdict')?.scrollIntoView({ behavior:'smooth', block:'start' }), 80)
  }

  const displayed = results ? (showAll ? results : results.slice(0, 8)) : []
  const boost = (CAT_BOOST[category]||0) + (BG_BOOST[background]||0) + (GEN_BOOST[gender]||0)
  const effective = results ? Math.min(99.9, parseFloat(percentile) + boost).toFixed(1) : null

  return (
    <div style={{ minHeight:'100vh' }}>
      <Ticker />
      <Nav onLeadOpen={() => setLeadOpen(true)} />

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <div style={{ background:'#060504', position:'relative', overflow:'hidden' }}>
        {/* Grid */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)', backgroundSize:'48px 48px', pointerEvents:'none' }} />
        {/* Glow */}
        <div style={{ position:'absolute', top:-80, left:'50%', transform:'translateX(-50%)', width:700, height:420, background:'radial-gradient(ellipse,rgba(217,95,2,.11) 0%,transparent 68%)', pointerEvents:'none' }} />

        <div style={{ maxWidth:780, margin:'0 auto', padding:'68px 24px 56px', position:'relative', zIndex:2, textAlign:'center' }}>
          {/* Eyebrow */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:7, fontSize:10.5, fontFamily:'var(--mono)', color:'#1D9E75', textTransform:'uppercase', letterSpacing:'.12em', marginBottom:22, background:'rgba(29,158,117,.08)', border:'1px solid rgba(29,158,117,.22)', padding:'5px 14px', borderRadius:20 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'#1D9E75', animation:'blink 2s ease-in-out infinite', display:'inline-block' }} />
            India's only MBA platform run by Claude · free · zero bias
          </div>

          {/* H1 */}
          <h1 style={{ fontFamily:'var(--serif)', fontSize:'clamp(2.3rem,5.2vw,3.8rem)', fontWeight:700, color:'#fff', lineHeight:1.08, letterSpacing:'-.02em', marginBottom:14 }}>
            Know exactly which college<br />
            <em style={{ color:'var(--orange)', fontStyle:'italic' }}>you'll actually convert.</em>
          </h1>
          <p style={{ fontSize:15, color:'rgba(255,255,255,.42)', lineHeight:1.85, maxWidth:500, margin:'0 auto 36px' }}>
            Enter your percentile. AI calculates your real conversion chance at every top B-school — with brutal honesty, no commissions, no agenda.
          </p>

          {/* ── Entry card ── */}
          <form onSubmit={handleSubmit} style={{ background:'rgba(255,255,255,.04)', border:`1px solid ${inputFocused ? 'rgba(217,95,2,.5)' : 'rgba(255,255,255,.1)'}`, borderRadius:20, padding:'28px 28px 22px', maxWidth:600, margin:'0 auto', transition:'border-color .25s' }}>
            {/* Percentile input */}
            <div style={{ marginBottom:18 }}>
              <label style={{ display:'block', fontSize:10.5, fontFamily:'var(--mono)', color:'rgba(255,255,255,.35)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:8, textAlign:'left' }}>CAT / XAT / NMAT percentile</label>
              <div style={{ position:'relative' }}>
                <input
                  type="number"
                  min="1"
                  max="100"
                  step="0.01"
                  placeholder="e.g. 95.6"
                  value={percentile}
                  onChange={e => setPercentile(e.target.value)}
                  onFocus={() => setFocus(true)}
                  onBlur={() => setFocus(false)}
                  style={{ width:'100%', background:'rgba(255,255,255,.07)', border:'1px solid rgba(255,255,255,.12)', borderRadius:12, padding:'14px 18px', fontSize:22, fontFamily:'var(--serif)', fontWeight:700, color:'#fff', outline:'none', transition:'border-color .2s' }}
                />
                {percentile && boost > 0 && (
                  <div style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', fontSize:11, fontFamily:'var(--mono)', color:'#1D9E75', background:'rgba(29,158,117,.12)', padding:'3px 9px', borderRadius:8, border:'1px solid rgba(29,158,117,.2)' }}>
                    +{boost} effective → {Math.min(99.9, parseFloat(percentile||0)+boost).toFixed(1)}
                  </div>
                )}
              </div>
            </div>

            {/* Profile dropdowns */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginBottom:20 }} className="profile-grid">
              {[
                { label:'Category', val:category, set:setCategory, opts:[['general','General'],['obc','OBC'],['sc','SC'],['st','ST']] },
                { label:'Background', val:background, set:setBg, opts:[['engineer','Engineer'],['noneng','Non-Eng'],['commerce','Commerce']] },
                { label:'Gender', val:gender, set:setGender, opts:[['male','Male'],['female','Female']] },
              ].map(({ label, val, set, opts }) => (
                <div key={label}>
                  <label style={{ display:'block', fontSize:9.5, fontFamily:'var(--mono)', color:'rgba(255,255,255,.3)', textTransform:'uppercase', letterSpacing:'.09em', marginBottom:5, textAlign:'left' }}>{label}</label>
                  <select value={val} onChange={e => set(e.target.value)}
                    style={{ width:'100%', background:'rgba(255,255,255,.07)', border:'1px solid rgba(255,255,255,.12)', borderRadius:9, padding:'9px 12px', fontSize:12.5, color:'rgba(255,255,255,.85)', outline:'none', cursor:'pointer' }}>
                    {opts.map(([v,l]) => <option key={v} value={v} style={{ background:'#1a1814' }}>{l}</option>)}
                  </select>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button type="submit" style={{ width:'100%', background:'var(--orange)', color:'#fff', border:'none', borderRadius:12, padding:'14px 24px', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'var(--sans)', transition:'all .2s', letterSpacing:'.01em' }}
              onMouseOver={e => { e.currentTarget.style.background='#b84e00'; e.currentTarget.style.transform='translateY(-1px)' }}
              onMouseOut={e => { e.currentTarget.style.background='var(--orange)'; e.currentTarget.style.transform='none' }}>
              Show my college chances →
            </button>

            {/* Quick fills */}
            <div style={{ marginTop:14, display:'flex', gap:6, justifyContent:'center', flexWrap:'wrap' }}>
              {SAMPLE_SLOTS.map(s => (
                <button key={s.pct} type="button" onClick={() => quickFill(s.pct)}
                  style={{ fontSize:10.5, fontFamily:'var(--mono)', color:'rgba(255,255,255,.35)', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', padding:'4px 11px', borderRadius:20, cursor:'pointer', transition:'all .2s' }}
                  onMouseOver={e => { e.currentTarget.style.color='rgba(255,255,255,.75)'; e.currentTarget.style.borderColor='rgba(255,255,255,.2)' }}
                  onMouseOut={e => { e.currentTarget.style.color='rgba(255,255,255,.35)'; e.currentTarget.style.borderColor='rgba(255,255,255,.08)' }}>
                  {s.pct}%ile → {s.label}
                </button>
              ))}
            </div>
          </form>

          {/* Trust strip */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:28, flexWrap:'wrap', marginTop:24 }}>
            {[['0','paid listings'],['0','human editors'],['20+','verified colleges'],['Free','always']].map(([n,l]) => (
              <div key={l} style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, fontFamily:'var(--mono)', color:'rgba(255,255,255,.28)' }}>
                <strong style={{ color:'rgba(255,255,255,.55)' }}>{n}</strong> {l}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ BRUTAL REALITY VERDICT ════════════════════════════════════════ */}
      {results && (
        <div id="verdict" style={{ background:'var(--ink)', borderTop:'1px solid rgba(255,255,255,.06)', padding:'48px 24px 56px' }}>
          <div style={{ maxWidth:900, margin:'0 auto' }}>
            {/* Header */}
            <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:28, flexWrap:'wrap', gap:12 }}>
              <div>
                <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--orange)', textTransform:'uppercase', letterSpacing:'.12em', marginBottom:6 }}>
                  ⚡ brutal reality · {percentile}%ile
                  {boost > 0 && <span style={{ color:'#1D9E75', marginLeft:8 }}>→ {effective} effective ({boost > 0 ? '+' : ''}{boost} profile boost)</span>}
                </div>
                <div style={{ fontFamily:'var(--serif)', fontSize:'1.6rem', fontWeight:700, color:'#fff', lineHeight:1.1 }}>
                  Your college-by-college conversion chances
                </div>
              </div>
              <Link href="/eligibility" style={{ fontSize:12, fontFamily:'var(--mono)', color:'rgba(255,255,255,.4)', border:'1px solid rgba(255,255,255,.12)', padding:'8px 16px', borderRadius:8, textDecoration:'none', whiteSpace:'nowrap', flexShrink:0 }}>
                Full profile check →
              </Link>
            </div>

            {/* College grid */}
            <div style={{ display:'grid', gap:8 }}>
              {displayed.map((c, i) => (
                <div key={c.slug} style={{ background:'rgba(255,255,255,.03)', border:`1px solid ${i === 0 ? 'rgba(29,158,117,.25)' : 'rgba(255,255,255,.06)'}`, borderRadius:12, padding:'14px 18px', display:'flex', alignItems:'center', gap:16, flexWrap:'wrap', animation:'fadeUp .3s ease forwards', animationDelay:`${i*0.04}s`, opacity:0 }}>
                  {/* Rank */}
                  <div style={{ fontFamily:'var(--mono)', fontSize:11, color:'rgba(255,255,255,.2)', width:22, flexShrink:0 }}>#{i+1}</div>

                  {/* Name */}
                  <div style={{ flex:'1 1 160px', minWidth:140 }}>
                    <div style={{ fontSize:13.5, fontWeight:500, color:'#fff', marginBottom:2 }}>{c.name}</div>
                    <div style={{ fontSize:10.5, fontFamily:'var(--mono)', color:'rgba(255,255,255,.3)' }}>
                      ₹{c.fees}L fees · ₹{c.avg} LPA avg
                    </div>
                  </div>

                  {/* Bar + pct */}
                  <div style={{ flex:'1 1 200px', minWidth:160 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{ flex:1, height:6, background:'rgba(255,255,255,.07)', borderRadius:3, overflow:'hidden' }}>
                        <div style={{ height:'100%', width:`${c.ch.pct}%`, background:c.ch.bar, borderRadius:3, transition:'width .6s ease' }} />
                      </div>
                      <div style={{ fontSize:13, fontWeight:600, color:c.ch.bar, fontFamily:'var(--mono)', width:38, textAlign:'right', flexShrink:0 }}>{c.ch.pct}%</div>
                    </div>
                    <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'rgba(255,255,255,.3)', marginTop:3 }}>{c.ch.label}</div>
                  </div>

                  {/* CTA */}
                  <Link href={`/colleges/${c.slug}`} style={{ fontSize:11, fontFamily:'var(--mono)', color:'rgba(255,255,255,.35)', textDecoration:'none', flexShrink:0, padding:'5px 10px', borderRadius:6, border:'1px solid rgba(255,255,255,.08)', transition:'all .2s' }}
                    onMouseOver={e => { e.currentTarget.style.color='rgba(255,255,255,.8)'; e.currentTarget.style.borderColor='rgba(255,255,255,.2)' }}
                    onMouseOut={e => { e.currentTarget.style.color='rgba(255,255,255,.35)'; e.currentTarget.style.borderColor='rgba(255,255,255,.08)' }}>
                    Details →
                  </Link>
                </div>
              ))}
            </div>

            {/* Show more / disclaimer */}
            {!showAll && results.length > 8 && (
              <button onClick={() => setShowAll(true)} style={{ marginTop:16, width:'100%', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', borderRadius:10, padding:'12px', fontSize:12, fontFamily:'var(--mono)', color:'rgba(255,255,255,.4)', cursor:'pointer', transition:'all .2s' }}
                onMouseOver={e => e.currentTarget.style.background='rgba(255,255,255,.07)'}
                onMouseOut={e => e.currentTarget.style.background='rgba(255,255,255,.04)'}>
                Show all {results.length} colleges ↓
              </button>
            )}
            <div style={{ fontSize:10.5, fontFamily:'var(--mono)', color:'rgba(255,255,255,.2)', marginTop:20, textAlign:'center', lineHeight:1.7 }}>
              Chances are AI estimates based on historical cutoffs, profile diversity bonuses, and shortlisting patterns.<br />Not a guarantee. Always verify with official college notifications.
            </div>

            {/* Compare CTA */}
            <div style={{ marginTop:32, display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
              <Link href="/compare" style={{ background:'var(--orange)', color:'#fff', padding:'12px 24px', borderRadius:10, fontSize:13, fontWeight:500, textDecoration:'none' }}>Compare any two colleges →</Link>
              <Link href="/eligibility" style={{ background:'rgba(255,255,255,.06)', color:'rgba(255,255,255,.7)', padding:'12px 24px', borderRadius:10, fontSize:13, textDecoration:'none', border:'1px solid rgba(255,255,255,.1)' }}>Full eligibility check →</Link>
            </div>
          </div>
        </div>
      )}

      {/* ══ 4-STEP JOURNEY ════════════════════════════════════════════════ */}
      <div style={{ background:'var(--cream)', padding:'64px 24px' }}>
        <div style={{ maxWidth:960, margin:'0 auto' }}>
          <SectionHead light>how collvera works</SectionHead>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:2 }} className="steps-grid">
            {STEPS.map((s, i) => (
              <div key={i} style={{ position:'relative', padding:'28px 22px', background:i % 2 === 0 ? 'var(--white)' : 'var(--cream2)', borderRadius:14, border:'1px solid var(--border2)' }}>
                {/* connector line */}
                {i < STEPS.length - 1 && (
                  <div style={{ position:'absolute', right:-1, top:'50%', transform:'translateY(-50%)', width:2, height:32, background:'var(--border)', zIndex:1, display:'none' }} className="step-connector" />
                )}
                <div style={{ fontSize:9.5, fontFamily:'var(--mono)', color:'var(--orange)', letterSpacing:'.12em', marginBottom:12, fontWeight:500 }}>{s.n}</div>
                <div style={{ fontSize:22, marginBottom:12 }}>{s.icon}</div>
                <div style={{ fontSize:13.5, fontWeight:600, marginBottom:8, color:'var(--ink)' }}>{s.title}</div>
                <div style={{ fontSize:12, color:'var(--muted)', lineHeight:1.7 }}>{s.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ TOOLS GRID ════════════════════════════════════════════════════ */}
      <div style={{ background:'var(--white)', padding:'56px 24px', borderTop:'1px solid var(--border2)' }}>
        <div style={{ maxWidth:960, margin:'0 auto' }}>
          <SectionHead light>everything on collvera</SectionHead>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:12 }}>
            {TOOLS.map((t, i) => (
              <Link key={i} href={t.href} style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:16, background:'var(--cream)', border:'1px solid var(--border2)', borderRadius:14, padding:'18px 20px', transition:'all .2s' }}
                onMouseOver={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.borderColor=t.c; e.currentTarget.style.boxShadow=`0 8px 24px rgba(0,0,0,.07)` }}
                onMouseOut={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.borderColor='var(--border2)'; e.currentTarget.style.boxShadow='none' }}>
                <div style={{ width:44, height:44, borderRadius:12, background:'var(--white)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0, border:'1px solid var(--border2)' }}>{t.icon}</div>
                <div>
                  <div style={{ fontSize:13.5, fontWeight:600, color:'var(--ink)', marginBottom:3 }}>{t.label}</div>
                  <div style={{ fontSize:11.5, color:'var(--muted)', fontFamily:'var(--mono)' }}>{t.sub}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ══ CHAT — supporting feature ══════════════════════════════════════ */}
      <div style={{ background:'var(--ink)', padding:'56px 24px', borderTop:'1px solid rgba(255,255,255,.06)' }}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:36, alignItems:'start' }} className="chat-grid">
            {/* Left */}
            <div style={{ paddingTop:6 }}>
              <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'#1D9E75', textTransform:'uppercase', letterSpacing:'.12em', marginBottom:14, display:'flex', alignItems:'center', gap:7 }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'#1D9E75', animation:'blink 2s ease-in-out infinite', display:'inline-block' }} />
                Claude MBA Counsellor · live · free
              </div>
              <div style={{ fontFamily:'var(--serif)', fontSize:'1.7rem', fontWeight:700, color:'#fff', marginBottom:12, lineHeight:1.15 }}>
                Got a question that needs more than a number?
              </div>
              <p style={{ fontSize:13.5, color:'rgba(255,255,255,.45)', lineHeight:1.8, marginBottom:20 }}>
                The percentile tool gives you the quick read. Use the AI chat for anything nuanced — college culture, career goals, whether your profile can overcome a lower score.
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                {['"IIM A vs IIM B for consulting careers"','"Colleges for 95%ile OBC non-engineer"','"Is FMS worth it over IIM Lucknow?"','"Best MBA under ₹10 lakhs total fees"'].map(q => (
                  <div key={q} style={{ fontSize:12, fontFamily:'var(--mono)', color:'rgba(255,255,255,.3)', background:'rgba(255,255,255,.03)', padding:'7px 12px', borderRadius:8, border:'1px solid rgba(255,255,255,.06)' }}>{q}</div>
                ))}
              </div>
            </div>
            {/* Right — chat */}
            <div style={{ borderRadius:16, overflow:'hidden', boxShadow:'0 8px 40px rgba(0,0,0,.5)', border:'1px solid rgba(255,255,255,.08)' }}>
              <ChatWidget height={460} />
            </div>
          </div>
        </div>
      </div>

      {/* ══ FOOTER ════════════════════════════════════════════════════════ */}
      <footer style={{ background:'#060504', borderTop:'1px solid rgba(255,255,255,.06)', padding:'36px 24px', textAlign:'center' }}>
        <div style={{ fontFamily:'var(--serif)', fontSize:'1.1rem', fontWeight:600, color:'#fff', marginBottom:6, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
          Collvera
          <span style={{ fontSize:9, color:'#1D9E75', background:'rgba(29,158,117,.15)', padding:'2px 7px', borderRadius:20, fontFamily:'var(--mono)', border:'1px solid rgba(29,158,117,.25)' }}>AI</span>
        </div>
        <div style={{ fontSize:11, color:'rgba(255,255,255,.3)', marginBottom:18, fontFamily:'var(--mono)' }}>India's only MBA guide run entirely by Claude</div>
        <div style={{ display:'flex', justifyContent:'center', gap:24, fontSize:12, flexWrap:'wrap', marginBottom:20 }}>
          {[['Colleges','/colleges'],['Compare','/compare'],['Rankings','/rankings'],['Eligibility','/eligibility'],['Blog','/blog'],['Exams','/exams'],['MBA Game','/mba-game']].map(([l,h]) => (
            <Link key={h} href={h} style={{ color:'rgba(255,255,255,.3)', textDecoration:'none' }}
              onMouseOver={e => e.currentTarget.style.color='rgba(255,255,255,.7)'}
              onMouseOut={e => e.currentTarget.style.color='rgba(255,255,255,.3)'}>{l}</Link>
          ))}
        </div>
        <div style={{ fontSize:10, color:'rgba(255,255,255,.18)', fontFamily:'var(--mono)' }}>© 2026 Collvera.com · Data from NIRF, official college websites · Not affiliated with any institution</div>
      </footer>

      <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)} />

      <style>{`
        @media(max-width:768px){
          .profile-grid{ grid-template-columns:1fr 1fr !important; }
          .steps-grid{ grid-template-columns:1fr !important; }
          .chat-grid{ grid-template-columns:1fr !important; }
        }
        @keyframes fadeUp{ from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes blink{ 0%,100%{opacity:1} 50%{opacity:.25} }
      `}</style>
    </div>
  )
}

function SectionHead({ children, light }) {
  return (
    <div style={{ fontSize:10, fontFamily:'var(--mono)', color: light ? 'var(--muted)' : 'rgba(255,255,255,.35)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:24, display:'flex', alignItems:'center', gap:14 }}>
      {children}<span style={{ flex:1, height:1, background: light ? 'var(--border)' : 'rgba(255,255,255,.07)' }} />
    </div>
  )
}
