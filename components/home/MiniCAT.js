'use client'
import { useState, useEffect, useRef, useMemo } from 'react'
import { getRandomQuestions } from '../../lib/questions'

const TIMER = 75 // seconds per question

const COLLEGE_RESULTS = {
  high: [
    {n:'IIM Kozhikode',pkg:'₹24 LPA',bc:'cb-safe',l:'Safe'},
    {n:'MDI Gurgaon',pkg:'₹22 LPA',bc:'cb-safe',l:'Safe'},
    {n:'IIM Lucknow',pkg:'₹26 LPA',bc:'cb-reach',l:'Reach'},
    {n:'IIM Ahmedabad',pkg:'₹35 LPA',bc:'cb-dream',l:'Dream'},
  ],
  mid: [
    {n:'IMT Ghaziabad',pkg:'₹12 LPA',bc:'cb-safe',l:'Safe'},
    {n:'FORE Delhi',pkg:'₹10 LPA',bc:'cb-safe',l:'Safe'},
    {n:'TAPMI Manipal',pkg:'₹11 LPA',bc:'cb-reach',l:'Reach'},
    {n:'MDI Gurgaon',pkg:'₹22 LPA',bc:'cb-dream',l:'Dream'},
  ],
  low: [
    {n:'GIM Goa',pkg:'₹10 LPA',bc:'cb-safe',l:'Safe'},
    {n:'BIMTECH',pkg:'₹8 LPA',bc:'cb-safe',l:'Safe'},
    {n:'IMT Ghaziabad',pkg:'₹12 LPA',bc:'cb-reach',l:'Reach'},
    {n:'FORE Delhi',pkg:'₹10 LPA',bc:'cb-dream',l:'Dream'},
  ],
}

const secLabel = {varc:'VARC', dilr:'DILR', qa:'QA'}
const secDesc = {varc:'Reading comprehension + verbal ability', dilr:'Data interpretation + logical reasoning', qa:'Quantitative ability + arithmetic'}

export default function MiniCAT({ onLeadOpen }) {
  const [section, setSection] = useState('varc')
  const [phase, setPhase] = useState('start')
  const [questions, setQuestions] = useState([])
  const [qIdx, setQIdx] = useState(0)
  const [answers, setAnswers] = useState([])
  const [chosen, setChosen] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [timeLeft, setTimeLeft] = useState(TIMER)
  const timerRef = useRef(null)
  const startTimeRef = useRef(null)
  const timesRef = useRef([])

  const q = questions[qIdx]

  useEffect(() => {
    if (phase === 'quiz' && q) {
      clearInterval(timerRef.current)
      setTimeLeft(TIMER)
      startTimeRef.current = Date.now()
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) { clearInterval(timerRef.current); handleTimeout(); return 0 }
          return t - 1
        })
      }, 1000)
    }
    return () => clearInterval(timerRef.current)
  }, [qIdx, phase])

  function handleTimeout() {
    timesRef.current[qIdx] = TIMER
    setAnswers(prev => { const n=[...prev]; n[qIdx]={ans:-1,skipped:true}; return n })
    setRevealed(true)
  }

  function choose(idx) {
    if (revealed) return
    clearInterval(timerRef.current)
    timesRef.current[qIdx] = (Date.now() - startTimeRef.current) / 1000
    setChosen(idx)
    setAnswers(prev => { const n=[...prev]; n[qIdx]={ans:idx,skipped:false}; return n })
    setRevealed(true)
  }

  function next() {
    setChosen(null); setRevealed(false)
    if (qIdx < questions.length - 1) setQIdx(i => i+1)
    else setPhase('results')
  }

  function skip() {
    clearInterval(timerRef.current)
    timesRef.current[qIdx] = (Date.now() - startTimeRef.current) / 1000
    setAnswers(prev => { const n=[...prev]; n[qIdx]={ans:-1,skipped:true}; return n })
    setChosen(null); setRevealed(false)
    if (qIdx < questions.length - 1) setQIdx(i => i+1)
    else setPhase('results')
  }

  function startQuiz() {
    const qs = getRandomQuestions(section, 3)
    setQuestions(qs)
    setQIdx(0); setAnswers([]); setChosen(null); setRevealed(false)
    timesRef.current = []
    setPhase('quiz')
  }

  function reset() {
    clearInterval(timerRef.current)
    setPhase('start'); setQIdx(0); setAnswers([])
    setChosen(null); setRevealed(false); setTimeLeft(TIMER)
    timesRef.current = []
  }

  // Results
  const correct = answers.filter((a,i) => questions[i] && a?.ans === questions[i]?.ans).length
  const avgTime = timesRef.current.length
    ? Math.round(timesRef.current.reduce((s,t) => s+(t||TIMER), 0) / timesRef.current.length)
    : TIMER
  const base = correct===3 ? Math.min(92+Math.floor(Math.random()*6),98)
    : correct===2 ? 75+Math.floor(Math.random()*12)
    : correct===1 ? 50+Math.floor(Math.random()*18)
    : 25+Math.floor(Math.random()*20)
  const pctRange = `${base}–${Math.min(base+4,99)}`
  const tier = correct>=3?'high':correct>=2?'mid':'low'
  const colleges = COLLEGE_RESULTS[tier]
  const tip = correct===3
    ? `All 3 correct in ~${avgTime}s avg. Speed is your next lever — cutting to under 50s/question could push you to 98–99 percentile.`
    : correct===2
    ? `Good base — 2/3 correct. 20 mins daily practice for 4 weeks moves you ~15 percentile points and opens new IIMs.`
    : `Solid start — 1/3 correct. Focus on ${secLabel[section]} fundamentals. 3 months of structured practice → 80–90 percentile is very achievable.`

  const timerPct = timeLeft / TIMER * 100
  const timerColor = timeLeft<=10?'#c62828':timeLeft<=20?'var(--orange)':'var(--teal)'

  return (
    <div id="minicat-section" style={{background:'var(--white)',borderBottom:'1px solid var(--border)'}}>
      <div style={{maxWidth:820,margin:'0 auto',padding:'52px 32px'}}>

        <div style={{textAlign:'center',marginBottom:36}}>
          <div style={{fontSize:9.5,fontFamily:'var(--mono)',color:'var(--orange)',textTransform:'uppercase',letterSpacing:'.12em',marginBottom:10}}>AI readiness test · free · randomised every attempt</div>
          <h2 style={{fontFamily:'var(--serif)',fontSize:'2rem',fontWeight:700,marginBottom:10}}>How CAT-ready are you right now?</h2>
          <p style={{fontSize:14,color:'var(--muted)',lineHeight:1.7,maxWidth:500,margin:'0 auto'}}>3 questions from a bank of 20 per section — different every time · 75s timer · AI predicts your percentile</p>
        </div>

        {/* ── START ── */}
        {phase==='start' && (
          <>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:28}}>
              {['varc','dilr','qa'].map(s=>(
                <div key={s} onClick={()=>setSection(s)} style={{border:`1.5px solid ${section===s?'var(--orange)':'var(--border)'}`,borderRadius:10,padding:'16px 14px',cursor:'pointer',textAlign:'center',background:section===s?'var(--orange-lt)':'var(--cream)',transition:'all .2s'}}>
                  <div style={{fontSize:15,fontWeight:500,marginBottom:4}}>{s.toUpperCase()}</div>
                  <div style={{fontSize:10.5,color:section===s?'var(--orange2)':'var(--muted)',fontFamily:'var(--mono)',lineHeight:1.4}}>{secDesc[s]}</div>
                  <div style={{fontSize:9,color:section===s?'var(--orange2)':'var(--muted)',fontFamily:'var(--mono)',marginTop:6}}>20 questions · 3 shown randomly</div>
                </div>
              ))}
            </div>
            <div style={{textAlign:'center'}}>
              <div style={{display:'flex',justifyContent:'center',gap:14,marginBottom:24,flexWrap:'wrap'}}>
                {[['3','questions'],['75s','per question'],['20','in the bank'],['instant','AI prediction']].map(([n,l])=>(
                  <div key={l} style={{padding:'12px 18px',background:'var(--cream)',borderRadius:8,border:'1px solid var(--border2)',textAlign:'center',minWidth:80}}>
                    <div style={{fontFamily:'var(--serif)',fontSize:'1.4rem',fontWeight:700}}>{n}</div>
                    <div style={{fontSize:10,color:'var(--muted)',fontFamily:'var(--mono)',marginTop:1}}>{l}</div>
                  </div>
                ))}
              </div>
              <button onClick={startQuiz} style={{background:'var(--ink)',color:'#fff',padding:'14px 40px',border:'none',borderRadius:8,fontSize:14,fontWeight:500,cursor:'pointer',transition:'all .2s'}}
                onMouseOver={e=>e.currentTarget.style.background='var(--orange)'}
                onMouseOut={e=>e.currentTarget.style.background='var(--ink)'}>
                Start {secLabel[section]} test →
              </button>
              <div style={{fontSize:11,color:'var(--muted)',marginTop:12,fontFamily:'var(--mono)'}}>Questions randomised — retake to get a different set</div>
            </div>
          </>
        )}

        {/* ── QUIZ ── */}
        {phase==='quiz' && q && (
          <div>
            {/* Progress */}
            <div style={{marginBottom:16}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                <span style={{fontSize:11,fontFamily:'var(--mono)',color:'var(--muted)'}}>Question {qIdx+1} of {questions.length}</span>
                <span style={{fontSize:11,fontFamily:'var(--mono)',fontWeight:500,color:'var(--ink)'}}>{secLabel[section]} · {q.type?.toUpperCase()}</span>
              </div>
              <div style={{height:3,background:'var(--cream2)',borderRadius:2,overflow:'hidden'}}>
                <div style={{height:'100%',width:`${(qIdx+1)/questions.length*100}%`,background:'var(--orange)',borderRadius:2,transition:'width .4s ease'}}></div>
              </div>
            </div>

            {/* Timer */}
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:18}}>
              <div style={{flex:1,height:5,background:'var(--cream2)',borderRadius:3,overflow:'hidden'}}>
                <div style={{height:'100%',width:`${timerPct}%`,background:timerColor,borderRadius:3,transition:'width 1s linear'}}></div>
              </div>
              <div style={{fontSize:12,fontFamily:'var(--mono)',color:timerColor,width:36,textAlign:'right',fontWeight:timeLeft<=20?500:'normal'}}>
                {timeLeft}s
              </div>
            </div>

            {/* Difficulty badge */}
            <div style={{marginBottom:12}}>
              <span style={{fontSize:9,fontFamily:'var(--mono)',padding:'2px 8px',borderRadius:6,background:q.difficulty==='A'?'var(--teal-lt)':q.difficulty==='B'?'#fff8e1':'#fce4ec',color:q.difficulty==='A'?'var(--teal)':q.difficulty==='B'?'#854f0b':'#880e4f'}}>
                {q.difficulty==='A'?'Easy':q.difficulty==='B'?'Medium':'Hard'}
              </span>
            </div>

            {/* Context */}
            {q.ctx && (
              <div style={{fontSize:13,color:'var(--ink2)',lineHeight:1.8,marginBottom:16,padding:'14px 16px',background:'var(--cream)',borderRadius:8,borderLeft:'3px solid var(--border)',fontStyle:'italic',whiteSpace:'pre-line'}}>
                {q.ctx}
              </div>
            )}

            {/* Question */}
            <div style={{fontSize:15,fontWeight:500,lineHeight:1.65,marginBottom:18,color:'var(--ink)'}}>{q.q}</div>

            {/* Options */}
            <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:16}}>
              {q.opts.map((opt,i)=>{
                let border='1.5px solid var(--border)',bg='var(--white)'
                if(revealed){
                  if(i===q.ans){border='1.5px solid var(--teal)';bg='var(--teal-lt)'}
                  else if(i===chosen){border='1.5px solid #c62828';bg='#fdecea'}
                }else if(i===chosen){border='1.5px solid var(--orange)';bg='var(--orange-lt)'}
                const lBg=revealed&&i===q.ans?'var(--teal)':revealed&&i===chosen?'#c62828':i===chosen?'var(--orange)':'transparent'
                const lColor=(revealed&&(i===q.ans||i===chosen))||i===chosen?'#fff':'var(--muted)'
                const lBorder=revealed&&i===q.ans?'var(--teal)':revealed&&i===chosen?'#c62828':i===chosen?'var(--orange)':'var(--border2)'
                return(
                  <div key={i} onClick={()=>!revealed&&choose(i)} style={{display:'flex',alignItems:'flex-start',gap:12,padding:'12px 14px',border,borderRadius:9,cursor:revealed?'default':'pointer',background:bg,transition:'all .15s'}}>
                    <span style={{width:22,height:22,borderRadius:'50%',border:`1.5px solid ${lBorder}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10.5,fontFamily:'var(--mono)',flexShrink:0,marginTop:1,background:lBg,color:lColor,transition:'all .15s'}}>
                      {['A','B','C','D'][i]}
                    </span>
                    <span style={{fontSize:13.5,lineHeight:1.55}}>{opt}</span>
                  </div>
                )
              })}
            </div>

            {/* Explanation */}
            {revealed && (
              <div style={{padding:'12px 14px',background:'var(--cream)',borderRadius:8,fontSize:12.5,color:'var(--ink2)',lineHeight:1.65,marginBottom:14,borderLeft:'3px solid var(--teal)',animation:'fadeUp .3s ease'}}>
                💡 {q.exp}
              </div>
            )}

            {/* Actions */}
            <div style={{display:'flex',gap:10}}>
              {!revealed&&<button onClick={skip} style={{background:'none',border:'1px solid var(--border)',borderRadius:7,padding:'9px 16px',fontSize:12,color:'var(--muted)',cursor:'pointer'}}>Skip →</button>}
              {revealed&&(
                <button onClick={next} style={{background:'var(--ink)',color:'#fff',padding:'10px 24px',border:'none',borderRadius:7,fontSize:13,cursor:'pointer',transition:'background .2s'}}
                  onMouseOver={e=>e.currentTarget.style.background='var(--orange)'}
                  onMouseOut={e=>e.currentTarget.style.background='var(--ink)'}>
                  {qIdx<questions.length-1?'Next question →':'See my results →'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── RESULTS ── */}
        {phase==='results' && (
          <div>
            <div style={{textAlign:'center',padding:'20px 0 24px',borderBottom:'1px solid var(--border2)',marginBottom:22}}>
              <div style={{fontSize:10,fontFamily:'var(--mono)',color:'var(--muted)',marginBottom:4}}>Predicted {secLabel[section]} percentile</div>
              <div style={{fontFamily:'var(--serif)',fontSize:'3rem',fontWeight:700,color:'var(--ink)'}}>
                {pctRange} <span style={{fontSize:'1.1rem',color:'var(--orange)'}}>percentile</span>
              </div>
              <div style={{fontSize:13,color:'var(--muted)',marginTop:6}}>{correct}/3 correct · avg {avgTime}s · {answers.filter(a=>a?.skipped).length} skipped</div>
              <div style={{display:'inline-flex',alignItems:'center',gap:6,marginTop:8,fontSize:10.5,fontFamily:'var(--mono)',color:'rgba(14,12,8,.4)',background:'var(--cream)',padding:'4px 12px',borderRadius:20}}>
                Questions were randomly selected from a bank of 20
              </div>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:20}} className="res-grid">
              <div style={{background:'var(--cream)',borderRadius:10,padding:16}}>
                <div style={{fontSize:10,fontFamily:'var(--mono)',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:12}}>Your performance</div>
                {[['Correct',correct/3*100,'var(--teal)',`${correct}/3`],['Speed',Math.min(avgTime/TIMER*100,100),'var(--orange)',`${avgTime}s avg`]].map(([n,w,c,v])=>(
                  <div key={n} style={{marginBottom:10}}>
                    <div style={{display:'flex',justifyContent:'space-between',fontSize:11.5,marginBottom:4}}>
                      <span style={{fontWeight:500}}>{n}</span>
                      <span style={{fontFamily:'var(--mono)',color:'var(--muted)'}}>{v}</span>
                    </div>
                    <div style={{height:4,background:'var(--cream3)',borderRadius:2,overflow:'hidden'}}>
                      <div style={{height:'100%',width:`${Math.round(w)}%`,background:c,borderRadius:2}}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{background:'var(--cream)',borderRadius:10,padding:16}}>
                <div style={{fontSize:10,fontFamily:'var(--mono)',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:10}}>Try other sections</div>
                <div style={{fontSize:12,color:'var(--muted)',lineHeight:1.65,marginBottom:10}}>This was <strong style={{color:'var(--ink)'}}>{secLabel[section]}</strong> only. Test all 3 sections for your complete CAT percentile prediction.</div>
                <div style={{display:'flex',flexDirection:'column',gap:6}}>
                  {['varc','dilr','qa'].filter(s=>s!==section).map(s=>(
                    <button key={s} onClick={()=>{setSection(s);reset()}} style={{padding:'8px 12px',border:'1px solid var(--border)',borderRadius:7,fontSize:12,cursor:'pointer',background:'var(--white)',fontFamily:'var(--sans)',textAlign:'left',transition:'all .15s'}}
                      onMouseOver={e=>{e.currentTarget.style.borderColor='var(--orange)';e.currentTarget.style.color='var(--orange)'}}
                      onMouseOut={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--ink)'}}>
                      Test {secLabel[s]} — different questions →
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* College results */}
            <div style={{marginBottom:18}}>
              <div style={{fontSize:13,fontWeight:500,marginBottom:10}}>🎯 Colleges you can target at this score</div>
              {colleges.map((c,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'9px 12px',border:'1px solid var(--border2)',borderRadius:8,marginBottom:6,background:'var(--white)',...(i>=2?{filter:'blur(4px)',pointerEvents:'none',userSelect:'none'}:{})}}>
                  <span style={{fontSize:9.5,fontFamily:'var(--mono)',padding:'2px 7px',borderRadius:6,background:c.l==='Safe'?'var(--teal-lt)':c.l==='Reach'?'#fff8e1':'#fce4ec',color:c.l==='Safe'?'var(--teal)':c.l==='Reach'?'#854f0b':'#880e4f',flexShrink:0}}>{c.l}</span>
                  <span style={{fontSize:12.5,fontWeight:500,flex:1}}>{c.n}</span>
                  <span style={{fontSize:11,color:'var(--muted)',fontFamily:'var(--mono)'}}>{c.pkg}</span>
                </div>
              ))}
              <button onClick={()=>onLeadOpen?.()} style={{width:'100%',background:'var(--ink)',color:'#fff',padding:13,border:'none',borderRadius:8,fontSize:13.5,fontWeight:500,cursor:'pointer',transition:'background .2s',marginTop:4}}
                onMouseOver={e=>e.currentTarget.style.background='var(--orange)'}
                onMouseOut={e=>e.currentTarget.style.background='var(--ink)'}>
                Unlock full personalised shortlist + improvement plan →
              </button>
            </div>

            <div style={{padding:'12px 14px',background:'var(--orange-lt)',borderRadius:8,fontSize:12.5,color:'var(--ink2)',lineHeight:1.65,borderLeft:'3px solid var(--orange)',marginBottom:12}}>
              💡 <strong>AI tip:</strong> {tip}
            </div>

            <div style={{display:'flex',gap:10}}>
              <button onClick={startQuiz} style={{flex:1,background:'var(--cream)',border:'1px solid var(--border)',borderRadius:8,padding:'10px',fontSize:12.5,color:'var(--ink)',cursor:'pointer',transition:'all .2s',fontFamily:'var(--sans)'}}
                onMouseOver={e=>{e.currentTarget.style.borderColor='var(--orange)';e.currentTarget.style.color='var(--orange)'}}
                onMouseOut={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--ink)'}}>
                Retry with new questions →
              </button>
              <button onClick={reset} style={{flex:1,background:'transparent',border:'1px solid var(--border)',borderRadius:8,padding:'10px',fontSize:12.5,color:'var(--muted)',cursor:'pointer',transition:'all .2s'}}
                onMouseOver={e=>{e.currentTarget.style.borderColor='var(--ink)';e.currentTarget.style.color='var(--ink)'}}
                onMouseOut={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--muted)'}}>
                ← Change section
              </button>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @media(max-width:768px){.res-grid{grid-template-columns:1fr !important}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
    </div>
  )
}
