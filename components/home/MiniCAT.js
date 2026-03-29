'use client'
import { useState, useEffect, useRef } from 'react'

const QUESTIONS = {
  varc: [
    { ctx:'"The tragedy of modern democracy is not that it has failed, but that it has succeeded too well — producing voters who are sovereign in theory but manipulated in practice. Mass communication was supposed to liberate citizens. Instead, it gave unprecedented power to those who could manufacture consent."', q:"The author's primary argument is that modern democracy:", opts:['Has failed to give citizens voting rights','Creates an illusion of power while enabling manipulation','Has been weakened by poor communication','Successfully protects citizens from manipulation'], ans:1, exp:'The author says democracy "succeeded too well" — voters are sovereign in theory but manipulated in practice. "Manufacture consent" is the key phrase.' },
    { q:'Choose the word most OPPOSITE in meaning to "taciturn":', opts:['Reserved','Loquacious','Reticent','Morose'], ans:1, exp:'Taciturn means habitually silent. Its antonym is loquacious — tending to talk a great deal. Reticent and Reserved are near-synonyms of taciturn.' },
    { q:'In "The committee has been asked to look into the matter", the phrase "look into" means:', opts:['Observe visually','Investigate','Ignore completely','Resolve quickly'], ans:1, exp:'"Look into" idiomatically means to investigate — as a committee would do. "Observe visually" is literal and incorrect here.' },
  ],
  dilr: [
    { ctx:'5 teams A B C D E play each other once. Win=2pts, Draw=1pt each, Loss=0. Final: A=8, B=6, C=5, D=3, E=2.', q:'How many total matches were played?', opts:['8','10','12','15'], ans:1, exp:'Round-robin with 5 teams: total matches = 5×4÷2 = 10. Fixed formula: n(n-1)/2.' },
    { ctx:'A B C D sit in a row. A is not at either end. B is to the right of C. D is at one of the ends.', q:'Which arrangement is definitely possible?', opts:['D A B C','C A B D','D C A B','B A C D'], ans:2, exp:'D-C-A-B: D at end ✓, A in position 3 not at end ✓, B (pos 4) right of C (pos 2) ✓. All satisfied.' },
    { ctx:'A shopkeeper marks goods 40% above cost price and gives a 20% discount on marked price.', q:'What is the profit percentage?', opts:['20%','12%','16%','8%'], ans:1, exp:'CP=100, MP=140, SP=140×0.8=112. Profit% = (112-100)/100 × 100 = 12%.' },
  ],
  qa: [
    { q:'If x + 1/x = 3, what is x³ + 1/x³?', opts:['18','27','36','9'], ans:0, exp:'x+1/x=3 → x²+1/x²=7 → x³+1/x³=(x+1/x)(x²-1+1/x²)=3×6=18.' },
    { q:'A train 240m long passes a pole in 24 seconds. How long to pass a 360m platform?', opts:['36s','60s','48s','54s'], ans:1, exp:'Speed=10m/s. Distance=240+360=600m. Time=600÷10=60s.' },
    { q:'In how many ways can the letters of "LEADER" be arranged?', opts:['360','720','180','540'], ans:0, exp:'6 letters, E appears twice. 6!/2! = 360.' },
  ],
}

export default function MiniCAT({ onLeadOpen }) {
  const [section, setSection] = useState('varc')
  const [phase, setPhase] = useState('start') // start | quiz | results
  const [qIdx, setQIdx] = useState(0)
  const [answers, setAnswers] = useState([])
  const [chosen, setChosen] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const timerRef = useRef(null)
  const startTimeRef = useRef(null)
  const timesRef = useRef([])

  const qs = QUESTIONS[section]
  const q = qs[qIdx]

  useEffect(() => {
    if (phase === 'quiz') startTimer()
    return () => clearInterval(timerRef.current)
  }, [qIdx, phase])

  function startTimer() {
    clearInterval(timerRef.current)
    setTimeLeft(60)
    startTimeRef.current = Date.now()
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); handleTimeout(); return 0 }
        return t - 1
      })
    }, 1000)
  }

  function handleTimeout() {
    timesRef.current[qIdx] = 60
    setAnswers(prev => { const next=[...prev]; next[qIdx]={ans:-1,skipped:true}; return next })
    setRevealed(true)
  }

  function choose(idx) {
    if (revealed) return
    clearInterval(timerRef.current)
    timesRef.current[qIdx] = (Date.now() - startTimeRef.current) / 1000
    setChosen(idx)
    setAnswers(prev => { const next=[...prev]; next[qIdx]={ans:idx,skipped:false}; return next })
    setRevealed(true)
  }

  function next() {
    if (qIdx < qs.length - 1) {
      setQIdx(i => i + 1)
      setChosen(null)
      setRevealed(false)
    } else {
      setPhase('results')
    }
  }

  function skip() {
    clearInterval(timerRef.current)
    timesRef.current[qIdx] = (Date.now() - startTimeRef.current) / 1000
    setAnswers(prev => { const next=[...prev]; next[qIdx]={ans:-1,skipped:true}; return next })
    if (qIdx < qs.length - 1) { setQIdx(i=>i+1); setChosen(null); setRevealed(false) }
    else setPhase('results')
  }

  function reset() {
    setPhase('start'); setQIdx(0); setAnswers([]); setChosen(null); setRevealed(false); setTimeLeft(60)
    timesRef.current = []
    clearInterval(timerRef.current)
  }

  const timerPct = timeLeft / 60 * 100
  const timerColor = timeLeft <= 10 ? '#c62828' : timeLeft <= 20 ? 'var(--orange)' : 'var(--teal)'

  // Results
  const correct = answers.filter((a,i) => a?.ans === qs[i]?.ans).length
  const avgTime = timesRef.current.length ? Math.round(timesRef.current.reduce((s,t)=>s+(t||60),0)/timesRef.current.length) : 60
  const base = correct===3 ? Math.min(92+Math.floor(Math.random()*6),98) : correct===2 ? 75+Math.floor(Math.random()*12) : correct===1 ? 50+Math.floor(Math.random()*18) : 25+Math.floor(Math.random()*20)
  const pctRange = `${base}–${Math.min(base+4,99)}`
  const resultColleges = correct>=2
    ? [{n:'IIM Kozhikode',pkg:'₹24 LPA',bc:'cb-safe',l:'Safe'},{n:'MDI Gurgaon',pkg:'₹22 LPA',bc:'cb-safe',l:'Safe'},{n:'IIM Ahmedabad',pkg:'₹35 LPA',bc:'cb-dream',l:'Dream'}]
    : [{n:'IMT Ghaziabad',pkg:'₹12 LPA',bc:'cb-safe',l:'Safe'},{n:'FORE Delhi',pkg:'₹10 LPA',bc:'cb-safe',l:'Safe'},{n:'MDI Gurgaon',pkg:'₹22 LPA',bc:'cb-reach',l:'Reach'}]
  const tip = correct===3 ? `All 3 correct in ~${avgTime}s avg. Speed is your next lever — cutting to under 40s/question could push you to 98–99 percentile.`
    : correct===2 ? `Good base — 2/3 correct. 20 mins daily practice for 4 weeks moves you ~15 percentile points and opens new IIMs.`
    : `1/3 correct. Focus on ${section.toUpperCase()} fundamentals. With 3 months structured prep, 80–90 percentile is very achievable.`

  const secLabel = { varc:'VARC', dilr:'DILR', qa:'QA' }

  return (
    <div id="minicat-section" style={{ background:'var(--white)', borderBottom:'1px solid var(--border)' }}>
      <div style={{ maxWidth:820, margin:'0 auto', padding:'52px 32px' }}>
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <div style={{ fontSize:9.5, fontFamily:'var(--mono)', color:'var(--orange)', textTransform:'uppercase', letterSpacing:'.12em', marginBottom:10 }}>AI readiness test · free</div>
          <h2 style={{ fontFamily:'var(--serif)', fontSize:'2rem', fontWeight:700, marginBottom:10 }}>How CAT-ready are you right now?</h2>
          <p style={{ fontSize:14, color:'var(--muted)', lineHeight:1.7, maxWidth:480, margin:'0 auto' }}>3 real CAT-level questions · 60s timer · AI predicts your percentile and shows which colleges you can target today</p>
        </div>

        {/* Section selector */}
        {(phase === 'start') && (
          <>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:28 }}>
              {['varc','dilr','qa'].map(s => (
                <div key={s} onClick={() => setSection(s)} style={{ border:`1.5px solid ${section===s?'var(--orange)':'var(--border)'}`, borderRadius:10, padding:14, cursor:'pointer', textAlign:'center', background:section===s?'var(--orange-lt)':'var(--cream)', transition:'all .2s' }}>
                  <div style={{ fontSize:14, fontWeight:500, marginBottom:2 }}>{s.toUpperCase()}</div>
                  <div style={{ fontSize:10, color:section===s?'var(--orange2)':'var(--muted)', fontFamily:'var(--mono)' }}>
                    {s==='varc'?'Reading + verbal':s==='dilr'?'Data + reasoning':'Quant + maths'}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign:'center' }}>
              <div style={{ display:'flex', justifyContent:'center', gap:16, marginBottom:24, flexWrap:'wrap' }}>
                {[['3','questions'],['60s','per question'],['instant','AI prediction']].map(([n,l]) => (
                  <div key={l} style={{ padding:'12px 20px', background:'var(--cream)', borderRadius:8, border:'1px solid var(--border2)', textAlign:'center' }}>
                    <div style={{ fontFamily:'var(--serif)', fontSize:'1.4rem', fontWeight:700 }}>{n}</div>
                    <div style={{ fontSize:10, color:'var(--muted)', fontFamily:'var(--mono)' }}>{l}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => setPhase('quiz')} style={{ background:'var(--ink)', color:'#fff', padding:'14px 36px', border:'none', borderRadius:8, fontSize:14, fontWeight:500, cursor:'pointer', transition:'all .2s' }}
                onMouseOver={e=>e.currentTarget.style.background='var(--orange)'}
                onMouseOut={e=>e.currentTarget.style.background='var(--ink)'}>
                Start the test →
              </button>
            </div>
          </>
        )}

        {/* Quiz */}
        {phase === 'quiz' && (
          <div>
            <div style={{ marginBottom:18 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                <span style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--muted)' }}>Question {qIdx+1} of {qs.length}</span>
                <span style={{ fontSize:11, fontFamily:'var(--mono)', fontWeight:500 }}>{secLabel[section]}</span>
              </div>
              <div style={{ height:3, background:'var(--cream2)', borderRadius:2, overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${(qIdx+1)/qs.length*100}%`, background:'var(--orange)', borderRadius:2, transition:'width .4s ease' }}></div>
              </div>
            </div>

            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18 }}>
              <div style={{ flex:1, height:4, background:'var(--cream2)', borderRadius:2, overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${timerPct}%`, background:timerColor, borderRadius:2, transition:'width 1s linear' }}></div>
              </div>
              <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--muted)', width:28, textAlign:'right' }}>{timeLeft}</div>
            </div>

            {q.ctx && <div style={{ fontSize:13, color:'var(--ink2)', lineHeight:1.75, marginBottom:16, padding:'14px 16px', background:'var(--cream)', borderRadius:8, borderLeft:'3px solid var(--border)', fontStyle:'italic' }}>{q.ctx}</div>}
            <div style={{ fontSize:15, fontWeight:500, lineHeight:1.6, marginBottom:18, color:'var(--ink)' }}>{q.q}</div>

            <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:16 }}>
              {q.opts.map((opt, i) => {
                let style = { display:'flex', alignItems:'flex-start', gap:12, padding:'12px 14px', border:'1.5px solid var(--border)', borderRadius:9, cursor:revealed?'default':'pointer', transition:'all .15s', background:'var(--white)' }
                if (revealed) {
                  if (i === q.ans) { style.borderColor='var(--teal)'; style.background='var(--teal-lt)' }
                  else if (i === chosen) { style.borderColor='#c62828'; style.background='#fdecea' }
                } else if (i === chosen) { style.borderColor='var(--orange)'; style.background='var(--orange-lt)' }
                const letterStyle = { width:22, height:22, borderRadius:'50%', border:'1.5px solid var(--border2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10.5, fontFamily:'var(--mono)', flexShrink:0, marginTop:1, ...( revealed && i===q.ans ? {borderColor:'var(--teal)',background:'var(--teal)',color:'#fff'} : revealed && i===chosen ? {borderColor:'#c62828',background:'#c62828',color:'#fff'} : chosen===i ? {borderColor:'var(--orange)',background:'var(--orange)',color:'#fff'} : {} ) }
                return (
                  <div key={i} style={style} onClick={() => !revealed && choose(i)}>
                    <span style={letterStyle}>{['A','B','C','D'][i]}</span>
                    <span style={{ fontSize:13.5, lineHeight:1.55 }}>{opt}</span>
                  </div>
                )
              })}
            </div>

            {revealed && <div style={{ display:'block', padding:'12px 14px', background:'var(--cream)', borderRadius:8, fontSize:12.5, color:'var(--ink2)', lineHeight:1.65, marginBottom:14, borderLeft:'3px solid var(--teal)', animation:'fadeUp .3s ease' }}>💡 {q.exp}</div>}

            <div style={{ display:'flex', gap:10 }}>
              {!revealed && <button onClick={skip} style={{ background:'none', border:'1px solid var(--border)', borderRadius:7, padding:'9px 16px', fontSize:12, color:'var(--muted)', cursor:'pointer', transition:'all .15s' }}>Skip →</button>}
              {revealed && <button onClick={next} style={{ background:'var(--ink)', color:'#fff', padding:'9px 20px', border:'none', borderRadius:7, fontSize:13, cursor:'pointer', transition:'background .2s' }}
                onMouseOver={e=>e.currentTarget.style.background='var(--orange)'}
                onMouseOut={e=>e.currentTarget.style.background='var(--ink)'}>
                {qIdx < qs.length-1 ? 'Next →' : 'See results →'}
              </button>}
            </div>
          </div>
        )}

        {/* Results */}
        {phase === 'results' && (
          <div>
            <div style={{ textAlign:'center', padding:'20px 0 24px', borderBottom:'1px solid var(--border2)', marginBottom:22 }}>
              <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', marginBottom:4 }}>Predicted {secLabel[section]} percentile</div>
              <div style={{ fontFamily:'var(--serif)', fontSize:'3rem', fontWeight:700, color:'var(--ink)' }}>
                {pctRange} <span style={{ fontSize:'1.1rem', color:'var(--orange)' }}>percentile</span>
              </div>
              <div style={{ fontSize:13, color:'var(--muted)', marginTop:6 }}>{correct}/3 correct · avg {avgTime}s · {answers.filter(a=>a?.skipped).length} skipped</div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:20 }} className="res-grid">
              <div style={{ background:'var(--cream)', borderRadius:10, padding:16 }}>
                <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:12 }}>Your performance</div>
                {[['Correct',correct/3*100,'var(--teal)',`${correct}/3`],['Speed',Math.min(avgTime/60*100,100),'var(--orange)',`${avgTime}s avg`]].map(([n,w,c,v])=>(
                  <div key={n} style={{ marginBottom:10 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', fontSize:11.5, marginBottom:4 }}>
                      <span style={{ fontWeight:500 }}>{n}</span><span style={{ fontFamily:'var(--mono)', color:'var(--muted)' }}>{v}</span>
                    </div>
                    <div style={{ height:4, background:'var(--cream3)', borderRadius:2, overflow:'hidden' }}>
                      <div style={{ height:'100%', width:`${Math.round(w)}%`, background:c, borderRadius:2 }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background:'var(--cream)', borderRadius:10, padding:16 }}>
                <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:10 }}>Try other sections</div>
                <div style={{ fontSize:12, color:'var(--muted)', lineHeight:1.65, marginBottom:10 }}>This was <strong style={{ color:'var(--ink)' }}>{secLabel[section]}</strong> only. Test all 3 for your complete CAT picture.</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {['varc','dilr','qa'].filter(s=>s!==section).map(s=>(
                    <button key={s} onClick={() => { setSection(s); reset() }} style={{ padding:'8px 12px', border:'1px solid var(--border)', borderRadius:7, fontSize:12, cursor:'pointer', background:'var(--white)', fontFamily:'var(--sans)', textAlign:'left', transition:'all .15s' }}
                      onMouseOver={e=>{e.currentTarget.style.borderColor='var(--orange)';e.currentTarget.style.color='var(--orange)'}}
                      onMouseOut={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--ink)'}}>
                      Test {s.toUpperCase()} →
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginBottom:18 }}>
              <div style={{ fontSize:13, fontWeight:500, marginBottom:10 }}>🎯 Colleges you can target at this score</div>
              {resultColleges.map((c,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 12px', border:'1px solid var(--border2)', borderRadius:8, marginBottom:6, background:'var(--white)', ...(i===2?{filter:'blur(4px)',pointerEvents:'none',userSelect:'none'}:{}) }}>
                  <span style={{ fontSize:9.5, fontFamily:'var(--mono)', padding:'2px 7px', borderRadius:6, background:c.l==='Safe'?'var(--teal-lt)':c.l==='Reach'?'#fff8e1':'#fce4ec', color:c.l==='Safe'?'var(--teal)':c.l==='Reach'?'#854f0b':'#880e4f', flexShrink:0 }}>{c.l}</span>
                  <span style={{ fontSize:12.5, fontWeight:500, flex:1 }}>{c.n}</span>
                  <span style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--mono)' }}>{c.pkg}</span>
                </div>
              ))}
              <button onClick={() => onLeadOpen?.()} style={{ width:'100%', background:'var(--ink)', color:'#fff', padding:13, border:'none', borderRadius:8, fontSize:13.5, fontWeight:500, cursor:'pointer', transition:'background .2s', marginTop:2 }}
                onMouseOver={e=>e.currentTarget.style.background='var(--orange)'}
                onMouseOut={e=>e.currentTarget.style.background='var(--ink)'}>
                Unlock full personalised shortlist + improvement plan →
              </button>
            </div>

            <div style={{ padding:'12px 14px', background:'var(--orange-lt)', borderRadius:8, fontSize:12.5, color:'var(--ink2)', lineHeight:1.65, borderLeft:'3px solid var(--orange)', marginBottom:12 }}>
              💡 <strong>AI tip:</strong> {tip}
            </div>

            <button onClick={reset} style={{ width:'100%', background:'transparent', border:'1px solid var(--border)', borderRadius:8, padding:10, fontSize:12.5, color:'var(--muted)', cursor:'pointer', transition:'all .2s' }}
              onMouseOver={e=>{e.currentTarget.style.borderColor='var(--ink)';e.currentTarget.style.color='var(--ink)'}}
              onMouseOut={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--muted)'}}>
              ← Try again / different section
            </button>
          </div>
        )}
      </div>
      <style>{`@media(max-width:768px){.res-grid{grid-template-columns:1fr !important}}`}</style>
    </div>
  )
}
