'use client'
import { useState } from 'react'
import Nav from '../../components/Nav'
import LeadModal from '../../components/LeadModal'
import { scoreProfile } from '../../lib/eligibility'

const STEPS = ['Exam Scores', 'Academics', 'Your Profile', 'Results']

const examInfo = {
  CAT: { label:'CAT Percentile', placeholder:'e.g. 95.6', max:100, unit:'%ile', hint:'Enter overall percentile (0-100)' },
  XAT: { label:'XAT Percentile', placeholder:'e.g. 92.4', max:100, unit:'%ile', hint:'Enter overall percentile (0-100)' },
  GMAT: { label:'GMAT Score', placeholder:'e.g. 680', max:805, unit:'pts', hint:'Score range: 200-805' },
  NMAT: { label:'NMAT Score', placeholder:'e.g. 218', max:360, unit:'pts', hint:'Score range: 0-360' },
  GRE: { label:'GRE Score', placeholder:'e.g. 318', max:340, unit:'pts', hint:'Total score range: 260-340' },
}

const initialProfile = {
  catScore:'', xatScore:'', gmatScore:'', nmatScore:'', greScore:'',
  tenth:'', twelfth:'', ug:'', ugDegree:'',
  gender:'', category:'', background:'', workExp:'',
  name:'', phone:'', email:'',
}

export default function EligibilityClient() {
  const [step, setStep] = useState(0)
  const [profile, setProfile] = useState(initialProfile)
  const [results, setResults] = useState(null)
  const [leadOpen, setLeadOpen] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [expanded, setExpanded] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const set = (k, v) => setProfile(p => ({ ...p, [k]: v }))

  function runEligibility() {
    const scored = scoreProfile(profile)
    setResults(scored)
    setStep(3)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function submitAndUnlock() {
    if (!profile.name || !profile.phone || !profile.email) {
      alert('Please fill name, phone and email to unlock full results.')
      return
    }
    // Submit to Supabase
    try {
      const { submitLead } = await import('../../lib/supabase')
      await submitLead({
        name: profile.name,
        phone: profile.phone,
        email: profile.email,
        cat_score: profile.catScore,
        work_exp: profile.workExp,
        source_page: 'eligibility-checker',
        notes: `10th:${profile.tenth} 12th:${profile.twelfth} UG:${profile.ug} Cat:${profile.gender} Bg:${profile.background}`,
      })
    } catch(e) { console.log(e) }
    setSubmitted(true)
    setShowAll(true)
  }

  const visible = results ? (showAll ? results : results.slice(0, 4)) : []

  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)' }}>
      <Nav onLeadOpen={() => setLeadOpen(true)} />

      <div style={{ maxWidth:860, margin:'0 auto', padding:'40px 24px 60px' }}>

        {/* Header */}
        <div style={{ marginBottom:32 }}>
          <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--orange)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:10 }}>AI eligibility engine</div>
          <h1 style={{ fontFamily:'var(--serif)', fontSize:'2.2rem', fontWeight:700, marginBottom:10 }}>Check your MBA eligibility</h1>
          <p style={{ fontSize:14, color:'var(--muted)', lineHeight:1.7, maxWidth:540 }}>Enter your scores and profile. Claude calculates your match percentage for 15+ top colleges — weighted across exam, academics, work experience and diversity factors.</p>
        </div>

        {/* Progress */}
        {step < 3 && (
          <div style={{ display:'flex', gap:0, marginBottom:32, background:'var(--white)', borderRadius:10, overflow:'hidden', border:'1px solid var(--border)' }}>
            {STEPS.slice(0,3).map((s,i) => (
              <div key={i} onClick={() => i < step && setStep(i)} style={{ flex:1, padding:'12px 16px', textAlign:'center', fontSize:12, fontWeight:500, background:step===i?'var(--ink)':i<step?'var(--cream2)':'var(--white)', color:step===i?'#fff':i<step?'var(--ink)':'var(--muted)', cursor:i<step?'pointer':'default', borderRight:i<2?'1px solid var(--border2)':'none', transition:'all .2s' }}>
                <span style={{ fontFamily:'var(--mono)', fontSize:9, display:'block', marginBottom:2, opacity:.6 }}>Step {i+1}</span>
                {s}
                {i < step && <span style={{ marginLeft:6, color:'var(--teal)' }}>✓</span>}
              </div>
            ))}
          </div>
        )}

        {/* ── STEP 0: EXAM SCORES ── */}
        {step === 0 && (
          <div className="card" style={{ padding:28 }}>
            <h2 style={{ fontFamily:'var(--serif)', fontSize:'1.2rem', fontWeight:700, marginBottom:6 }}>Your exam scores</h2>
            <p style={{ fontSize:13, color:'var(--muted)', marginBottom:24 }}>Enter whichever exams you have taken or plan to take. You can enter expected scores too.</p>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }} className="form-grid">
              {Object.entries(examInfo).map(([exam, info]) => (
                <div key={exam}>
                  <label style={{ fontSize:11, color:'var(--muted)', display:'block', marginBottom:5, fontFamily:'var(--mono)' }}>{info.label}</label>
                  <div style={{ position:'relative' }}>
                    <input
                      type="number"
                      placeholder={info.placeholder}
                      value={profile[`${exam.toLowerCase()}Score`]}
                      onChange={e => set(`${exam.toLowerCase()}Score`, e.target.value)}
                      style={{ paddingRight:40 }}
                    />
                    <span style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', fontSize:10.5, color:'var(--muted)', fontFamily:'var(--mono)', pointerEvents:'none' }}>{info.unit}</span>
                  </div>
                  <div style={{ fontSize:10, color:'var(--muted)', marginTop:4, fontFamily:'var(--mono)' }}>{info.hint}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop:16, padding:'12px 14px', background:'var(--cream)', borderRadius:8, fontSize:12, color:'var(--muted)', lineHeight:1.6 }}>
              💡 You can enter expected/predicted scores. Leave blank if you haven't taken that exam.
            </div>

            <button onClick={() => setStep(1)} style={{ marginTop:24, background:'var(--ink)', color:'#fff', padding:'12px 28px', border:'none', borderRadius:8, fontSize:13, fontWeight:500, cursor:'pointer', transition:'background .2s' }}
              onMouseOver={e=>e.currentTarget.style.background='var(--orange)'}
              onMouseOut={e=>e.currentTarget.style.background='var(--ink)'}>
              Next: Academic scores →
            </button>
          </div>
        )}

        {/* ── STEP 1: ACADEMICS ── */}
        {step === 1 && (
          <div className="card" style={{ padding:28 }}>
            <h2 style={{ fontFamily:'var(--serif)', fontSize:'1.2rem', fontWeight:700, marginBottom:6 }}>Your academic scores</h2>
            <p style={{ fontSize:13, color:'var(--muted)', marginBottom:24 }}>IIMs weight academics heavily — especially 10th and 12th. Enter your actual percentage.</p>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20, marginBottom:20 }} className="form-grid-3">
              {[
                { key:'tenth', label:'10th Standard %', placeholder:'e.g. 88.4', hint:'Percentage or CGPA×10' },
                { key:'twelfth', label:'12th Standard %', placeholder:'e.g. 84.2', hint:'Percentage or CGPA×10' },
                { key:'ug', label:'Graduation %', placeholder:'e.g. 72.6', hint:'Percentage or CGPA×10' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize:11, color:'var(--muted)', display:'block', marginBottom:5, fontFamily:'var(--mono)' }}>{f.label}</label>
                  <div style={{ position:'relative' }}>
                    <input
                      type="number"
                      placeholder={f.placeholder}
                      value={profile[f.key]}
                      onChange={e => set(f.key, e.target.value)}
                      style={{ paddingRight:28 }}
                    />
                    <span style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', fontSize:10.5, color:'var(--muted)', fontFamily:'var(--mono)', pointerEvents:'none' }}>%</span>
                  </div>
                  <div style={{ fontSize:10, color:'var(--muted)', marginTop:4, fontFamily:'var(--mono)' }}>{f.hint}</div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom:20 }}>
              <label style={{ fontSize:11, color:'var(--muted)', display:'block', marginBottom:5, fontFamily:'var(--mono)' }}>Graduation Degree</label>
              <select value={profile.ugDegree} onChange={e => set('ugDegree', e.target.value)} style={{ maxWidth:300 }}>
                <option value="">Select your degree</option>
                <option value="btech">B.Tech / B.E. (Engineering)</option>
                <option value="bsc">B.Sc (Science)</option>
                <option value="bcom">B.Com (Commerce)</option>
                <option value="ba">B.A. (Arts / Humanities)</option>
                <option value="bba">BBA / BMS (Management)</option>
                <option value="mbbs">MBBS / Medical</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Academic signal */}
            {profile.tenth && profile.twelfth && profile.ug && (
              <div style={{ padding:'12px 14px', background:'var(--teal-lt)', borderRadius:8, fontSize:12.5, color:'var(--ink2)', lineHeight:1.6, marginBottom:16, borderLeft:'3px solid var(--teal)' }}>
                {(() => {
                  const avg = (parseFloat(profile.tenth)+parseFloat(profile.twelfth)+parseFloat(profile.ug))/3
                  if (avg >= 75) return '✅ Strong academics — this profile competes well at Tier 1 colleges'
                  if (avg >= 65) return '🟡 Good academics — compensate with a strong exam score and work experience'
                  return '⚠️ Academics below average for top colleges — a very high exam score can offset this'
                })()}
              </div>
            )}

            <div style={{ display:'flex', gap:12 }}>
              <button onClick={() => setStep(0)} style={{ background:'var(--cream)', color:'var(--ink)', padding:'12px 20px', border:'1px solid var(--border)', borderRadius:8, fontSize:13, cursor:'pointer' }}>← Back</button>
              <button onClick={() => setStep(2)} style={{ background:'var(--ink)', color:'#fff', padding:'12px 28px', border:'none', borderRadius:8, fontSize:13, fontWeight:500, cursor:'pointer', transition:'background .2s' }}
                onMouseOver={e=>e.currentTarget.style.background='var(--orange)'}
                onMouseOut={e=>e.currentTarget.style.background='var(--ink)'}>
                Next: Your profile →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: PROFILE ── */}
        {step === 2 && (
          <div className="card" style={{ padding:28 }}>
            <h2 style={{ fontFamily:'var(--serif)', fontSize:'1.2rem', fontWeight:700, marginBottom:6 }}>Your profile</h2>
            <p style={{ fontSize:13, color:'var(--muted)', marginBottom:24 }}>IIMs give bonus points for diversity factors. These significantly affect your eligibility at top colleges.</p>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20 }} className="form-grid">
              <div>
                <label style={{ fontSize:11, color:'var(--muted)', display:'block', marginBottom:5, fontFamily:'var(--mono)' }}>Gender</label>
                <select value={profile.gender} onChange={e => set('gender', e.target.value)}>
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other / Prefer not to say</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize:11, color:'var(--muted)', display:'block', marginBottom:5, fontFamily:'var(--mono)' }}>Category</label>
                <select value={profile.category} onChange={e => set('category', e.target.value)}>
                  <option value="">Select category</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC (Non-Creamy Layer)</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="EWS">EWS</option>
                  <option value="PWD">PwD</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize:11, color:'var(--muted)', display:'block', marginBottom:5, fontFamily:'var(--mono)' }}>Academic background</label>
                <select value={profile.background} onChange={e => set('background', e.target.value)}>
                  <option value="">Select background</option>
                  <option value="engineer">Engineering</option>
                  <option value="non-engineer">Non-Engineering (Commerce / Arts / Science / Medical)</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize:11, color:'var(--muted)', display:'block', marginBottom:5, fontFamily:'var(--mono)' }}>Work experience (years)</label>
                <select value={profile.workExp} onChange={e => set('workExp', e.target.value)}>
                  <option value="">Select experience</option>
                  <option value="0">Fresher (0 years)</option>
                  <option value="1">Less than 1 year</option>
                  <option value="2">1–2 years</option>
                  <option value="3">2–3 years</option>
                  <option value="4">3–5 years</option>
                  <option value="6">5+ years</option>
                </select>
              </div>
            </div>

            {/* Diversity preview */}
            {(profile.gender === 'female' || profile.background === 'non-engineer' || profile.category !== 'General') && (
              <div style={{ padding:'12px 14px', background:'var(--orange-lt)', borderRadius:8, fontSize:12.5, color:'var(--ink2)', lineHeight:1.6, marginBottom:16, borderLeft:'3px solid var(--orange)' }}>
                🎯 <strong>Diversity advantage detected:</strong>
                {profile.gender === 'female' && <span style={{ display:'block', marginTop:4 }}>✓ Female candidate — IIMs actively seeking gender balance. 3-5 percentile points effective relaxation.</span>}
                {profile.background === 'non-engineer' && <span style={{ display:'block', marginTop:4 }}>✓ Non-engineering background — significantly less competition. Rare and valued.</span>}
                {profile.category === 'OBC' && <span style={{ display:'block', marginTop:4 }}>✓ OBC category — 3-5 percentile relaxation typically applied at most IIMs.</span>}
                {(profile.category === 'SC' || profile.category === 'ST') && <span style={{ display:'block', marginTop:4 }}>✓ SC/ST category — significant cutoff relaxation applies at all government institutions.</span>}
              </div>
            )}

            <div style={{ display:'flex', gap:12 }}>
              <button onClick={() => setStep(1)} style={{ background:'var(--cream)', color:'var(--ink)', padding:'12px 20px', border:'1px solid var(--border)', borderRadius:8, fontSize:13, cursor:'pointer' }}>← Back</button>
              <button onClick={runEligibility} style={{ background:'var(--orange)', color:'#fff', padding:'12px 28px', border:'none', borderRadius:8, fontSize:13, fontWeight:500, cursor:'pointer', transition:'all .2s', display:'flex', alignItems:'center', gap:8 }}>
                <span>Check My Eligibility</span>
                <span style={{ fontSize:16 }}>→</span>
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: RESULTS ── */}
        {step === 3 && results && (
          <div>
            {/* Summary bar */}
            <div style={{ background:'var(--ink)', borderRadius:14, padding:'20px 24px', marginBottom:24, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
              <div>
                <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'rgba(255,255,255,.4)', marginBottom:4 }}>Eligibility results</div>
                <div style={{ fontFamily:'var(--serif)', fontSize:'1.3rem', fontWeight:700, color:'#fff' }}>
                  {results.filter(r => r.matchScore >= 55 && !r.flags.includes('no_exam')).length} colleges with good match
                </div>
              </div>
              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                {[['Strong Match','≥75%','#0f6e56','var(--teal-lt)'],['Good Chance','55-74%','#854f0b','#fff8e1'],['Possible','35-54%','#185fa5','var(--blue-lt)'],['Reach','<35%','#880e4f','#fce4ec']].map(([l,r,c,bg])=>(
                  <div key={l} style={{ fontSize:10.5, fontFamily:'var(--mono)', padding:'4px 10px', borderRadius:6, background:bg, color:c }}>
                    {l}: {r}
                  </div>
                ))}
              </div>
            </div>

            {/* Top 4 — always visible */}
            <div style={{ marginBottom:16 }}>
              <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:16, display:'flex', alignItems:'center', gap:10 }}>
                Top matches for your profile
                <span style={{ flex:1, height:1, background:'var(--border)' }}></span>
              </div>

              {visible.map((c, i) => (
                <div key={c.id} style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:12, marginBottom:12, overflow:'hidden', transition:'all .2s' }}>
                  <div style={{ height:3, background:c.color || 'var(--orange)' }}></div>
                  <div style={{ padding:'16px 20px', cursor:'pointer' }} onClick={() => setExpanded(expanded===c.id?null:c.id)}>
                    <div style={{ display:'flex', alignItems:'center', gap:14, flexWrap:'wrap' }}>
                      <div style={{ fontSize:24, flexShrink:0 }}>{c.emoji}</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4, flexWrap:'wrap' }}>
                          <span style={{ fontFamily:'var(--serif)', fontSize:'1rem', fontWeight:700 }}>{c.name}</span>
                          {c.nirf && <span style={{ fontSize:9.5, fontFamily:'var(--mono)', color:'var(--muted)' }}>#{c.nirf} NIRF</span>}
                          <span style={{ fontSize:9.5, fontFamily:'var(--mono)', padding:'2px 7px', borderRadius:6, background:'var(--cream2)', color:'var(--ink2)' }}>{c.city}</span>
                        </div>
                        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                          {c.tags.map(t => <span key={t} style={{ fontSize:9.5, fontFamily:'var(--mono)', padding:'2px 7px', borderRadius:8, background:'var(--cream)', color:'var(--muted)' }}>{t}</span>)}
                        </div>
                      </div>
                      <div style={{ textAlign:'right', flexShrink:0 }}>
                        <div style={{ fontFamily:'var(--serif)', fontSize:'1.8rem', fontWeight:700, color:c.verdictColor, lineHeight:1 }}>{c.matchScore}%</div>
                        <div style={{ fontSize:10.5, fontFamily:'var(--mono)', color:c.verdictColor, fontWeight:500, marginTop:2 }}>{c.verdict}</div>
                      </div>
                    </div>

                    {/* Match bar */}
                    <div style={{ marginTop:12, height:5, background:'var(--cream2)', borderRadius:3, overflow:'hidden' }}>
                      <div style={{ height:'100%', width:`${c.matchScore}%`, background:c.verdictColor, borderRadius:3, transition:'width 1s ease' }}></div>
                    </div>

                    {/* Quick stats */}
                    <div style={{ display:'flex', gap:16, marginTop:12, flexWrap:'wrap' }}>
                      <span style={{ fontSize:11.5, color:'var(--muted)' }}>Fees: <strong style={{ color:'var(--ink)' }}>₹{(c.fees/100000).toFixed(0)}L</strong></span>
                      <span style={{ fontSize:11.5, color:'var(--muted)' }}>Avg pkg: <strong style={{ color:'var(--teal)' }}>₹{(c.avgPkg/100000).toFixed(0)} LPA</strong></span>
                      {c.breakdown?.exam?.exam && <span style={{ fontSize:11.5, color:'var(--muted)' }}>Cutoff: <strong style={{ color:'var(--ink)' }}>{c.breakdown.exam.exam} {c.breakdown.exam.cutoff}{['CAT','XAT'].includes(c.breakdown.exam.exam)?'%+':'+' }</strong></span>}
                      <span style={{ fontSize:11.5, color:'var(--muted)', marginLeft:'auto', color:'var(--blue)' }}>{expanded===c.id?'▲ Hide breakdown':'▼ See breakdown'}</span>
                    </div>
                  </div>

                  {/* Expanded breakdown */}
                  {expanded === c.id && (
                    <div style={{ padding:'16px 20px', borderTop:'1px solid var(--border2)', background:'var(--cream)', animation:'fadeUp .25s ease' }}>
                      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:12, marginBottom:16 }}>
                        {[
                          ['Exam Score', c.breakdown?.exam?.score, c.weights?.exam, c.breakdown?.exam?.weighted],
                          ['Academics', c.breakdown?.academics?.score, c.weights?.academics, c.breakdown?.academics?.weighted],
                          ['Work Experience', c.breakdown?.workExp?.score, c.weights?.workExp, c.breakdown?.workExp?.weighted],
                          ['Diversity Profile', c.breakdown?.diversity?.score, c.weights?.diversity, c.breakdown?.diversity?.weighted],
                        ].map(([label, score, weight, weighted]) => (
                          <div key={label} style={{ background:'var(--white)', borderRadius:8, padding:'10px 12px' }}>
                            <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', marginBottom:4 }}>{label} ({weight}% weight)</div>
                            <div style={{ fontFamily:'var(--serif)', fontSize:'1.1rem', fontWeight:700, marginBottom:4 }}>{score}/100</div>
                            <div style={{ height:3, background:'var(--cream2)', borderRadius:2, overflow:'hidden' }}>
                              <div style={{ height:'100%', width:`${score}%`, background:'var(--orange)', borderRadius:2 }}></div>
                            </div>
                            <div style={{ fontSize:10, color:'var(--muted)', marginTop:3, fontFamily:'var(--mono)' }}>Contributes {weighted} pts</div>
                          </div>
                        ))}
                      </div>

                      {/* Positives and negatives */}
                      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                        {c.positives?.length > 0 && (
                          <div>
                            <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--teal)', marginBottom:6, textTransform:'uppercase', letterSpacing:'.06em' }}>Working for you</div>
                            {c.positives.map((p,i) => <div key={i} style={{ fontSize:11.5, color:'var(--ink2)', marginBottom:4, display:'flex', gap:6 }}><span style={{ color:'var(--teal)', flexShrink:0 }}>✓</span>{p}</div>)}
                          </div>
                        )}
                        {c.negatives?.length > 0 && (
                          <div>
                            <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'#c62828', marginBottom:6, textTransform:'uppercase', letterSpacing:'.06em' }}>Working against you</div>
                            {c.negatives.map((n,i) => <div key={i} style={{ fontSize:11.5, color:'var(--ink2)', marginBottom:4, display:'flex', gap:6 }}><span style={{ color:'#c62828', flexShrink:0 }}>×</span>{n}</div>)}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* UNLOCK gate */}
            {!showAll && (
              <div style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:12, overflow:'hidden', marginBottom:24 }}>
                {/* Blurred preview of remaining colleges */}
                {results.slice(4, 7).map(c => (
                  <div key={c.id} style={{ padding:'16px 20px', borderBottom:'1px solid var(--border2)', filter:'blur(5px)', userSelect:'none', pointerEvents:'none' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                      <div style={{ fontSize:24 }}>{c.emoji}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontFamily:'var(--serif)', fontSize:'1rem', fontWeight:700, marginBottom:4 }}>{c.name}</div>
                        <div style={{ height:4, background:'var(--cream2)', borderRadius:2 }}></div>
                      </div>
                      <div style={{ fontFamily:'var(--serif)', fontSize:'1.8rem', fontWeight:700, color:c.verdictColor }}>{c.matchScore}%</div>
                    </div>
                  </div>
                ))}

                {/* Unlock form */}
                <div style={{ padding:'24px 24px', background:'linear-gradient(to bottom, var(--white), var(--orange-lt))' }}>
                  <div style={{ textAlign:'center', marginBottom:20 }}>
                    <div style={{ fontFamily:'var(--serif)', fontSize:'1.2rem', fontWeight:700, marginBottom:6 }}>
                      🔓 Unlock {results.length - 4} more colleges + full improvement plan
                    </div>
                    <p style={{ fontSize:13, color:'var(--muted)' }}>See your complete eligibility report with all {results.length} colleges, detailed breakdown, and exactly what to improve to unlock better colleges.</p>
                  </div>

                  {!submitted ? (
                    <div style={{ maxWidth:400, margin:'0 auto' }}>
                      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:10 }}>
                        <div>
                          <label style={{ fontSize:10.5, color:'var(--muted)', display:'block', marginBottom:4, fontFamily:'var(--mono)' }}>Full Name *</label>
                          <input placeholder="Your name" value={profile.name} onChange={e => set('name', e.target.value)} />
                        </div>
                        <div>
                          <label style={{ fontSize:10.5, color:'var(--muted)', display:'block', marginBottom:4, fontFamily:'var(--mono)' }}>Phone *</label>
                          <input placeholder="+91 98765 43210" value={profile.phone} onChange={e => set('phone', e.target.value)} />
                        </div>
                      </div>
                      <div style={{ marginBottom:14 }}>
                        <label style={{ fontSize:10.5, color:'var(--muted)', display:'block', marginBottom:4, fontFamily:'var(--mono)' }}>Email *</label>
                        <input type="email" placeholder="you@email.com" value={profile.email} onChange={e => set('email', e.target.value)} />
                      </div>
                      <button onClick={submitAndUnlock} style={{ width:'100%', background:'var(--ink)', color:'#fff', padding:13, border:'none', borderRadius:8, fontSize:13.5, fontWeight:500, cursor:'pointer', transition:'background .2s' }}
                        onMouseOver={e=>e.currentTarget.style.background='var(--orange)'}
                        onMouseOut={e=>e.currentTarget.style.background='var(--ink)'}>
                        Unlock All Results + Improvement Plan →
                      </button>
                      <p style={{ textAlign:'center', fontSize:10.5, color:'var(--muted)', marginTop:8 }}>🔒 No spam. Our counsellor will also call within 24 hrs with personalised advice.</p>
                    </div>
                  ) : (
                    <div style={{ textAlign:'center', padding:'12px 0' }}>
                      <div style={{ fontSize:32, marginBottom:8 }}>🎉</div>
                      <div style={{ fontFamily:'var(--serif)', fontSize:'1.1rem', fontWeight:600, marginBottom:4 }}>All results unlocked!</div>
                      <p style={{ fontSize:12.5, color:'var(--muted)' }}>Counsellor will call within 24 hours with your personalised plan.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Improvement tips */}
            {showAll && (
              <div style={{ background:'var(--cream)', borderRadius:12, padding:20, marginBottom:24, border:'1px solid var(--border)' }}>
                <div style={{ fontFamily:'var(--serif)', fontSize:'1rem', fontWeight:600, marginBottom:14 }}>💡 AI improvement recommendations</div>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  {profile.catScore && parseFloat(profile.catScore) < 99 && (
                    <div style={{ fontSize:12.5, color:'var(--ink2)', padding:'10px 12px', background:'var(--white)', borderRadius:8, borderLeft:'3px solid var(--orange)', lineHeight:1.6 }}>
                      <strong>Improve your CAT score by 3-5 percentile points</strong> — this single change opens {results.filter(r=>r.verdict==='Reach'&&r.breakdown?.exam?.score>70).length} more colleges from your current "Reach" list.
                    </div>
                  )}
                  {profile.gender === 'female' && (
                    <div style={{ fontSize:12.5, color:'var(--ink2)', padding:'10px 12px', background:'var(--white)', borderRadius:8, borderLeft:'3px solid var(--teal)', lineHeight:1.6 }}>
                      <strong>As a female candidate</strong> — your effective cutoff at most IIMs is 3-5 percentile lower than the published cutoff. Apply even if you are 2-3 percentile below the cutoff.
                    </div>
                  )}
                  {(!profile.workExp || profile.workExp === '0') && (
                    <div style={{ fontSize:12.5, color:'var(--ink2)', padding:'10px 12px', background:'var(--white)', borderRadius:8, borderLeft:'3px solid var(--blue)', lineHeight:1.6 }}>
                      <strong>Adding 1-2 years of work experience</strong> before applying significantly improves your profile score at SPJIMR, MDI, and XLRI — which actively prefer candidates with some work experience.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Retake */}
            <button onClick={() => { setStep(0); setResults(null); setShowAll(false); setExpanded(null) }}
              style={{ background:'var(--cream)', border:'1px solid var(--border)', borderRadius:8, padding:'10px 20px', fontSize:13, color:'var(--muted)', cursor:'pointer' }}>
              ← Start over / edit profile
            </button>
          </div>
        )}
      </div>

      <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)} />

      <style>{`
        .card { background:var(--white); border:1px solid var(--border2); border-radius:16px; box-shadow:var(--shadow); }
        @media(max-width:768px){ .form-grid{grid-template-columns:1fr !important} .form-grid-3{grid-template-columns:1fr !important} }
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
    </div>
  )
}
