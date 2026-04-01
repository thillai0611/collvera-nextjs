'use client'
import { useState } from 'react'
import Nav from '../../components/Nav'
import Link from 'next/link'

// ── COLLEGE DATA ───────────────────────────────────────────────
const COLLEGES = [
  { name:'IIM Ahmedabad', short:'IIM A', slug:'iim-ahmedabad', emoji:'🏛️', cat:99, xat:null, nmat:null, fees:2750000, pkg:3522000, tier:1 },
  { name:'IIM Bangalore', short:'IIM B', slug:'iim-bangalore', emoji:'🎓', cat:99, xat:null, nmat:null, fees:2620000, pkg:3488000, tier:1 },
  { name:'IIM Calcutta', short:'IIM C', slug:'iim-calcutta', emoji:'🏛️', cat:99, xat:null, nmat:null, fees:2700000, pkg:3100000, tier:1 },
  { name:'FMS Delhi', short:'FMS', slug:'fms-delhi', emoji:'🎓', cat:98, xat:null, nmat:null, fees:243000, pkg:3400000, tier:1 },
  { name:'IIM Lucknow', short:'IIM L', slug:'iim-lucknow', emoji:'🏛️', cat:97, xat:null, nmat:null, fees:2200000, pkg:3230000, tier:1 },
  { name:'IIM Kozhikode', short:'IIM K', slug:'iim-kozhikode', emoji:'🏛️', cat:96, xat:null, nmat:null, fees:2400000, pkg:2800000, tier:1 },
  { name:'IIM Indore', short:'IIM I', slug:'iim-indore', emoji:'🏛️', cat:97, xat:null, nmat:null, fees:1650000, pkg:2500000, tier:1 },
  { name:'XLRI Jamshedpur', short:'XLRI', slug:'xlri-jamshedpur', emoji:'✝️', cat:null, xat:97, nmat:null, fees:2850000, pkg:2800000, tier:1 },
  { name:'SPJIMR Mumbai', short:'SPJIMR', slug:'spjimr-mumbai', emoji:'🎓', cat:95, xat:93, nmat:null, fees:2650000, pkg:2700000, tier:1 },
  { name:'MDI Gurgaon', short:'MDI', slug:'mdi-gurgaon', emoji:'🏢', cat:95, xat:93, nmat:null, fees:2816000, pkg:2200000, tier:1 },
  { name:'NMIMS Mumbai', short:'NMIMS', slug:'nmims-mumbai', emoji:'🏛️', cat:90, xat:null, nmat:215, fees:2700000, pkg:1800000, tier:2 },
  { name:'JBIMS Mumbai', short:'JBIMS', slug:'jbims-mumbai', emoji:'🏛️', cat:99, xat:null, nmat:null, fees:450000, pkg:2800000, tier:1 },
  { name:'IMT Ghaziabad', short:'IMT', slug:'imt-ghaziabad', emoji:'🏢', cat:88, xat:86, nmat:null, fees:2095000, pkg:1200000, tier:2 },
  { name:'TAPMI Manipal', short:'TAPMI', slug:'tapmi-manipal', emoji:'🎓', cat:85, xat:83, nmat:null, fees:1730000, pkg:1100000, tier:2 },
  { name:'Great Lakes Chennai', short:'Great Lakes', slug:'great-lakes-chennai', emoji:'🎓', cat:80, xat:78, nmat:210, fees:1700000, pkg:1200000, tier:2 },
  { name:'GIM Goa', short:'GIM', slug:'gim-goa', emoji:'🌴', cat:85, xat:83, nmat:null, fees:1900000, pkg:1000000, tier:2 },
  { name:'FORE Delhi', short:'FORE', slug:'fore-delhi', emoji:'🎓', cat:88, xat:85, nmat:null, fees:2200000, pkg:1000000, tier:2 },
  { name:'SOIL Gurgaon', short:'SOIL', slug:'soil-gurgaon', emoji:'🌱', cat:70, xat:68, nmat:190, fees:1400000, pkg:900000, tier:2 },
]

// Mock score calibration — each series inflates differently
const MOCK_CALIBRATION = {
  cat: { TIME: -4, IMS: -2, CL: 0, Self: -3, Other: -3 },
  xat: { TIME: -3, IMS: -2, CL: -1, Self: -3, Other: -2 },
  nmat: { TIME: -5, IMS: -3, CL: -2, Self: -4, Other: -3 },
}

const fmt = n => n ? `₹${(n/100000).toFixed(1)}L` : '—'
const fmtPkg = n => n ? `₹${(n/100000).toFixed(1)} LPA` : '—'

// Diversity bonus in effective percentile points
function diversityBonus(profile) {
  let bonus = 0
  if (profile.gender === 'female') bonus += 4
  if (profile.background === 'non-engineer') bonus += 3
  if (profile.category === 'OBC') bonus += 3
  if (profile.category === 'SC/ST') bonus += 8
  return bonus
}

// Match score 0-100 for a college given effective score
function matchScore(college, exam, effectiveScore) {
  const cutoff = college[exam]
  if (!cutoff) return null // college doesn't take this exam
  if (effectiveScore >= cutoff + 2) return Math.min(95, 70 + (effectiveScore - cutoff) * 3)
  if (effectiveScore >= cutoff) return 60 + (effectiveScore - cutoff) * 10
  if (effectiveScore >= cutoff - 3) return 30 + (effectiveScore - cutoff + 3) * 10
  if (effectiveScore >= cutoff - 6) return Math.max(10, 30 - (cutoff - effectiveScore) * 5)
  return 0
}

export default function MBAGame() {
  const [step, setStep] = useState(1) // 1=exam, 2=scores, 3=profile, 4=results
  const [exam, setExam] = useState(null) // cat | xat | nmat
  const [mockSeries, setMockSeries] = useState('TIME')
  const [scores, setScores] = useState({ varc:75, dilr:70, qa:75, overall:null, nmat:null })
  const [profile, setProfile] = useState({ gender:'male', background:'engineer', category:'General', workExp:false })
  const [email, setEmail] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [leadSent, setLeadSent] = useState(false)

  // ── CALCULATIONS ───────────────────────────────────────────
  function calcOverall() {
    if (exam === 'cat' || exam === 'xat') {
      // Weighted: VARC 33%, DILR 33%, QA 34%
      return Math.round((scores.varc * 0.33) + (scores.dilr * 0.33) + (scores.qa * 0.34))
    }
    if (exam === 'nmat') return scores.nmat || 0
    return 0
  }

  function calcActual() {
    const raw = calcOverall()
    const adj = MOCK_CALIBRATION[exam]?.[mockSeries] || -3
    return Math.max(0, raw + adj)
  }

  function calcEffective() {
    return Math.min(99, calcActual() + diversityBonus(profile))
  }

  function getResults() {
    const eff = calcEffective()
    return COLLEGES
      .map(c => ({ ...c, match: matchScore(c, exam, eff) }))
      .filter(c => c.match !== null)
      .sort((a, b) => b.match - a.match)
  }

  function getTiers(results) {
    return {
      safe: results.filter(c => c.match >= 65),
      reach: results.filter(c => c.match >= 35 && c.match < 65),
      dream: results.filter(c => c.match >= 10 && c.match < 35),
    }
  }

  function getWeakSection() {
    if (exam !== 'cat' && exam !== 'xat') return null
    const sections = [
      { name: 'VARC', score: scores.varc },
      { name: 'DILR', score: scores.dilr },
      { name: 'QA', score: scores.qa },
    ]
    return sections.sort((a, b) => a.score - b.score)[0]
  }

  function getGapToNextTier(results) {
    const eff = calcEffective()
    const reachColleges = results.filter(c => c.match >= 35 && c.match < 65)
    if (!reachColleges.length) return null
    const hardest = reachColleges[reachColleges.length - 1]
    const cutoff = hardest[exam]
    if (!cutoff) return null
    return Math.max(0, cutoff - eff)
  }

  async function handleUnlock() {
    if (!email) return
    setUnlocked(true)
    setLeadSent(true)
    // Save lead to Supabase
    try {
      await fetch('https://atcsvmnnhcxnudfxyrke.supabase.co/rest/v1/leads', {
        method: 'POST',
        headers: {
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          email,
          source: 'mba-game',
          notes: `Exam: ${exam?.toUpperCase()}, Mock: ${calcOverall()}%ile, Actual: ${calcActual()}%ile, Series: ${mockSeries}`
        })
      })
    } catch {}
  }

  const S = { // shared styles
    card: { background:'#fff', border:'1px solid #e8e4dc', borderRadius:16, padding:'24px', marginBottom:12 },
    label: { fontSize:12, color:'#888', fontFamily:'var(--mono)', marginBottom:6, display:'block' },
    input: { width:'100%', padding:'10px 14px', border:'1.5px solid #e0dbd0', borderRadius:9, fontSize:14, outline:'none', fontFamily:'var(--sans)' },
    btn: { background:'var(--ink)', color:'#fff', border:'none', borderRadius:9, padding:'11px 24px', fontSize:14, fontWeight:500, cursor:'pointer', fontFamily:'var(--sans)' },
    btnOrange: { background:'var(--orange)', color:'#fff', border:'none', borderRadius:9, padding:'11px 24px', fontSize:14, fontWeight:500, cursor:'pointer', fontFamily:'var(--sans)' },
    tag: (active) => ({ padding:'8px 16px', borderRadius:9, border:'1.5px solid', fontSize:13, cursor:'pointer', fontFamily:'var(--sans)', background: active?'var(--ink)':'#fff', color:active?'#fff':'var(--ink)', borderColor:active?'var(--ink)':'#e0dbd0', transition:'all .15s' }),
  }

  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)', fontFamily:'var(--sans)' }}>
      <Nav />

      {/* Hero */}
      <div style={{ background:'var(--ink)', padding:'40px 32px 36px', textAlign:'center', borderBottom:'1px solid rgba(255,255,255,.07)' }}>
        <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'#1D9E75', textTransform:'uppercase', letterSpacing:'.12em', marginBottom:10 }}>free · 2 minutes · no signup needed</div>
        <h1 style={{ fontFamily:'var(--serif)', fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:700, color:'#fff', marginBottom:10, lineHeight:1.1 }}>The MBA Game</h1>
        <p style={{ fontSize:14, color:'rgba(255,255,255,.5)', maxWidth:420, margin:'0 auto' }}>Enter your mock score. See exactly which MBA colleges you can get into.</p>

        {/* Progress bar */}
        {step > 1 && (
          <div style={{ maxWidth:300, margin:'20px auto 0', display:'flex', gap:6 }}>
            {[1,2,3,4].map(s => (
              <div key={s} style={{ flex:1, height:4, borderRadius:2, background: step>=s?'var(--orange)':'rgba(255,255,255,.15)', transition:'background .3s' }}/>
            ))}
          </div>
        )}
      </div>

      <div style={{ maxWidth:600, margin:'0 auto', padding:'28px 24px 60px' }}>

        {/* ── STEP 1: Pick exam ── */}
        {step === 1 && (
          <div>
            <div style={{ ...S.card, textAlign:'center', paddingTop:32 }}>
              <div style={{ fontSize:32, marginBottom:12 }}>🎯</div>
              <h2 style={{ fontFamily:'var(--serif)', fontSize:'1.4rem', fontWeight:700, marginBottom:8 }}>Which exam are you preparing for?</h2>
              <p style={{ fontSize:13, color:'var(--muted)', marginBottom:24 }}>We'll calibrate your mock score to the actual exam and show your college matches.</p>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {[
                  { id:'cat', label:'CAT', desc:'Common Admission Test — IIMs and 1200+ colleges', emoji:'🏆' },
                  { id:'xat', label:'XAT', desc:'Xavier Aptitude Test — XLRI and 150+ colleges', emoji:'✝️' },
                  { id:'nmat', label:'NMAT', desc:'NMAT by GMAC — NMIMS and partner institutes', emoji:'📊' },
                ].map(e => (
                  <div key={e.id} onClick={() => { setExam(e.id); setStep(2) }}
                    style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 18px', border:'1.5px solid #e0dbd0', borderRadius:12, cursor:'pointer', textAlign:'left', background:'#fff', transition:'all .2s' }}
                    onMouseOver={el => el.currentTarget.style.borderColor='var(--orange)'}
                    onMouseOut={el => el.currentTarget.style.borderColor='#e0dbd0'}>
                    <span style={{ fontSize:24, flexShrink:0 }}>{e.emoji}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:500, fontSize:15, marginBottom:2 }}>{e.label}</div>
                      <div style={{ fontSize:12, color:'var(--muted)' }}>{e.desc}</div>
                    </div>
                    <span style={{ color:'var(--muted)', fontSize:18 }}>→</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 2: Mock scores ── */}
        {step === 2 && (
          <div>
            <div style={S.card}>
              <div style={{ marginBottom:20 }}>
                <h2 style={{ fontFamily:'var(--serif)', fontSize:'1.3rem', fontWeight:700, marginBottom:6 }}>Your latest mock score</h2>
                <p style={{ fontSize:13, color:'var(--muted)' }}>Enter your mock percentile for each section. We'll adjust for the actual {exam?.toUpperCase()} exam.</p>
              </div>

              {/* Mock series */}
              <div style={{ marginBottom:20 }}>
                <label style={S.label}>Which mock series?</label>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  {['TIME','IMS','CL','Self','Other'].map(s => (
                    <button key={s} onClick={() => setMockSeries(s)} style={S.tag(mockSeries===s)}>{s}</button>
                  ))}
                </div>
              </div>

              {(exam === 'cat' || exam === 'xat') && (
                <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  {[
                    { key:'varc', label:'VARC percentile', hint:'Verbal Ability + Reading Comprehension' },
                    { key:'dilr', label:'DILR percentile', hint:'Data Interpretation + Logical Reasoning' },
                    { key:'qa', label:'QA percentile', hint:'Quantitative Ability' },
                  ].map(s => (
                    <div key={s.key}>
                      <label style={S.label}>{s.label}</label>
                      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                        <input type="range" min="0" max="99" value={scores[s.key]}
                          onChange={e => setScores(prev => ({...prev, [s.key]: parseInt(e.target.value)}))}
                          style={{ flex:1 }}/>
                        <div style={{ width:48, height:36, background:'var(--cream)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:15, fontWeight:600, fontFamily:'var(--mono)', flexShrink:0 }}>{scores[s.key]}</div>
                      </div>
                      <div style={{ fontSize:11, color:'var(--muted)', marginTop:3 }}>{s.hint}</div>
                    </div>
                  ))}
                  <div style={{ background:'var(--cream)', borderRadius:10, padding:'12px 14px', marginTop:4 }}>
                    <div style={{ fontSize:11, color:'var(--muted)', marginBottom:2 }}>Your mock overall percentile</div>
                    <div style={{ fontSize:22, fontWeight:700, fontFamily:'var(--mono)' }}>{calcOverall()}</div>
                  </div>
                </div>
              )}

              {exam === 'nmat' && (
                <div>
                  <label style={S.label}>NMAT score (out of 360)</label>
                  <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                    <input type="range" min="100" max="360" value={scores.nmat || 200}
                      onChange={e => setScores(prev => ({...prev, nmat: parseInt(e.target.value)}))}
                      style={{ flex:1 }}/>
                    <div style={{ width:56, height:36, background:'var(--cream)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:15, fontWeight:600, fontFamily:'var(--mono)', flexShrink:0 }}>{scores.nmat || 200}</div>
                  </div>
                  <div style={{ fontSize:11, color:'var(--muted)', marginTop:4 }}>NMIMS cutoff: 215+ · Good score: 230+ · Excellent: 250+</div>
                </div>
              )}
            </div>

            <div style={{ display:'flex', gap:10 }}>
              <button onClick={() => setStep(1)} style={{ ...S.btn, background:'transparent', color:'var(--ink)', border:'1px solid #e0dbd0' }}>← Back</button>
              <button onClick={() => setStep(3)} style={{ ...S.btnOrange, flex:1 }}>Next → Profile</button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Profile ── */}
        {step === 3 && (
          <div>
            <div style={S.card}>
              <h2 style={{ fontFamily:'var(--serif)', fontSize:'1.3rem', fontWeight:700, marginBottom:6 }}>Your profile</h2>
              <p style={{ fontSize:13, color:'var(--muted)', marginBottom:20 }}>IIMs give diversity bonuses. This affects which colleges you realistically qualify for.</p>

              <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
                <div>
                  <label style={S.label}>Gender</label>
                  <div style={{ display:'flex', gap:8 }}>
                    {[['male','Male'],['female','Female']].map(([v,l]) => (
                      <button key={v} onClick={() => setProfile(p => ({...p, gender:v}))} style={{ ...S.tag(profile.gender===v), flex:1 }}>{l}</button>
                    ))}
                  </div>
                  {profile.gender==='female' && <div style={{ fontSize:11, color:'#1D9E75', marginTop:5 }}>+4 percentile effective boost at IIMs for diversity</div>}
                </div>

                <div>
                  <label style={S.label}>Academic background</label>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                    {[['engineer','Engineer'],['non-engineer','Non-engineer'],['commerce','Commerce'],['science','Science']].map(([v,l]) => (
                      <button key={v} onClick={() => setProfile(p => ({...p, background:v}))} style={S.tag(profile.background===v)}>{l}</button>
                    ))}
                  </div>
                  {profile.background!=='engineer' && <div style={{ fontSize:11, color:'#1D9E75', marginTop:5 }}>+3 percentile effective boost — non-engineers are rare in MBA pool</div>}
                </div>

                <div>
                  <label style={S.label}>Category</label>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                    {[['General','General'],['OBC','OBC'],['SC/ST','SC/ST'],['EWS','EWS']].map(([v,l]) => (
                      <button key={v} onClick={() => setProfile(p => ({...p, category:v}))} style={S.tag(profile.category===v)}>{l}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={S.label}>Work experience</label>
                  <div style={{ display:'flex', gap:8 }}>
                    {[[false,'Fresher'],[true,'Working professional']].map(([v,l]) => (
                      <button key={String(v)} onClick={() => setProfile(p => ({...p, workExp:v}))} style={{ ...S.tag(profile.workExp===v), flex:1 }}>{l}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display:'flex', gap:10 }}>
              <button onClick={() => setStep(2)} style={{ ...S.btn, background:'transparent', color:'var(--ink)', border:'1px solid #e0dbd0' }}>← Back</button>
              <button onClick={() => setStep(4)} style={{ ...S.btnOrange, flex:1 }}>See My Results →</button>
            </div>
          </div>
        )}

        {/* ── STEP 4: Results ── */}
        {step === 4 && (() => {
          const results = getResults()
          const tiers = getTiers(results)
          const actual = calcActual()
          const effective = calcEffective()
          const bonus = diversityBonus(profile)
          const weak = getWeakSection()
          const gap = getGapToNextTier(results)

          return (
            <div>
              {/* Score card */}
              <div style={{ ...S.card, textAlign:'center', background:'var(--ink)', borderColor:'transparent' }}>
                <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'rgba(255,255,255,.4)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:8 }}>
                  Your predicted {exam?.toUpperCase()} percentile
                </div>
                <div style={{ fontFamily:'var(--serif)', fontSize:'5rem', fontWeight:700, color:'#fff', lineHeight:1, marginBottom:4 }}>{actual}</div>
                {bonus > 0 && (
                  <div style={{ fontSize:12, color:'#1D9E75', marginBottom:8 }}>
                    +{bonus} effective boost from diversity profile → {effective} effective percentile for IIM shortlisting
                  </div>
                )}
                <div style={{ fontSize:12, color:'rgba(255,255,255,.4)' }}>
                  Mock score {calcOverall()} adjusted for {mockSeries} series → actual CAT estimate: {actual}
                </div>

                {/* Section breakdown */}
                {(exam==='cat'||exam==='xat') && (
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginTop:16 }}>
                    {[['VARC',scores.varc],['DILR',scores.dilr],['QA',scores.qa]].map(([s,v]) => (
                      <div key={s} style={{ background:'rgba(255,255,255,.07)', borderRadius:9, padding:'10px 8px' }}>
                        <div style={{ fontSize:10, color:'rgba(255,255,255,.4)', fontFamily:'var(--mono)', marginBottom:3 }}>{s}</div>
                        <div style={{ fontSize:20, fontWeight:600, color: v<80?'#ef9f27':'#1D9E75' }}>{v}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Weak section tip */}
              {weak && weak.score < 80 && (
                <div style={{ background:'#fff8e6', border:'1px solid #f0d080', borderRadius:12, padding:'12px 16px', marginBottom:12 }}>
                  <div style={{ fontSize:12.5, color:'#854f0b', lineHeight:1.65 }}>
                    <strong>Your weakest section is {weak.name} at {weak.score} percentile.</strong> Improving {weak.name} by 10 points will add approximately 8-12 percentile to your overall score.
                  </div>
                </div>
              )}

              {/* Tier results */}
              {[
                { key:'safe', label:'Safe', emoji:'✅', desc:'You qualify now', color:'#e8f5e9', border:'#81c784', textColor:'#1b5e20' },
                { key:'reach', label:'Reach', emoji:'🎯', desc:'Improve to unlock', color:'#fff8e1', border:'#ffca28', textColor:'#854f0b' },
                { key:'dream', label:'Dream', emoji:'🌟', desc:'Long term target', color:'#f3e5f5', border:'#ce93d8', textColor:'#4a148c' },
              ].map(tier => (
                <div key={tier.key} style={{ marginBottom:10 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                    <span style={{ fontSize:16 }}>{tier.emoji}</span>
                    <span style={{ fontSize:13, fontWeight:500 }}>{tier.label} colleges</span>
                    <span style={{ fontSize:12, color:'var(--muted)' }}>— {tier.desc}</span>
                  </div>

                  {tiers[tier.key].length === 0 ? (
                    <div style={{ fontSize:12.5, color:'var(--muted)', padding:'10px 14px', background:'#f5f3ef', borderRadius:9 }}>
                      None in this tier for your current score and exam choice.
                    </div>
                  ) : (
                    <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                      {(unlocked ? tiers[tier.key] : tiers[tier.key].slice(0,2)).map(c => (
                        <div key={c.slug} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', background:tier.color, border:`1px solid ${tier.border}`, borderRadius:10 }}>
                          <span style={{ fontSize:18, flexShrink:0 }}>{c.emoji}</span>
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ fontSize:13, fontWeight:500, color:'#111' }}>{c.name}</div>
                            <div style={{ fontSize:11, color:'#555', fontFamily:'var(--mono)' }}>{fmt(c.fees)} fees · {fmtPkg(c.pkg)} avg</div>
                          </div>
                          <div style={{ textAlign:'right', flexShrink:0 }}>
                            <div style={{ fontSize:16, fontWeight:700, color:tier.textColor }}>{c.match}%</div>
                            <div style={{ fontSize:10, color:'#888' }}>match</div>
                          </div>
                        </div>
                      ))}
                      {!unlocked && tiers[tier.key].length > 2 && (
                        <div style={{ fontSize:12, color:'var(--muted)', textAlign:'center', padding:'6px', fontStyle:'italic' }}>
                          +{tiers[tier.key].length - 2} more colleges — unlock below
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Gap to next tier */}
              {gap > 0 && (
                <div style={{ background:'#e8f4fd', border:'1px solid #90caf9', borderRadius:12, padding:'12px 16px', marginTop:4, marginBottom:12 }}>
                  <div style={{ fontSize:12.5, color:'#0d47a1', lineHeight:1.65 }}>
                    You are <strong>{gap} percentile away</strong> from unlocking your Reach colleges.
                    {weak ? ` Focus on ${weak.name} — it's your weakest section.` : ' Keep pushing across all sections.'}
                  </div>
                </div>
              )}

              {/* Unlock gate */}
              {!unlocked && (
                <div style={{ ...S.card, textAlign:'center', borderColor:'var(--orange)', borderWidth:2 }}>
                  <div style={{ fontSize:20, marginBottom:8 }}>🔓</div>
                  <div style={{ fontFamily:'var(--serif)', fontSize:'1.1rem', fontWeight:700, marginBottom:6 }}>Unlock your full college list</div>
                  <p style={{ fontSize:13, color:'var(--muted)', marginBottom:16 }}>See all 20 colleges with match %, fees, ROI and application deadlines. Free.</p>
                  <div style={{ display:'flex', gap:8, maxWidth:400, margin:'0 auto' }}>
                    <input value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com" type="email"
                      style={{ ...S.input, flex:1 }}
                      onKeyDown={e => e.key==='Enter' && handleUnlock()}/>
                    <button onClick={handleUnlock} style={S.btnOrange}>Unlock →</button>
                  </div>
                </div>
              )}

              {/* Unlocked CTAs */}
              {unlocked && (
                <div style={{ ...S.card, background:'var(--ink)', borderColor:'transparent', textAlign:'center' }}>
                  <div style={{ fontFamily:'var(--serif)', fontSize:'1.1rem', fontWeight:700, color:'#fff', marginBottom:6 }}>Want a personalised college shortlist?</div>
                  <p style={{ fontSize:13, color:'rgba(255,255,255,.5)', marginBottom:16 }}>Our AI checks your full profile — academics, work exp, category — against all 20 colleges.</p>
                  <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
                    <Link href="/eligibility" style={{ background:'var(--orange)', color:'#fff', padding:'10px 22px', borderRadius:9, fontSize:13, fontWeight:500, textDecoration:'none' }}>Full Eligibility Check →</Link>
                    <button onClick={() => { setStep(1); setExam(null); setUnlocked(false); setEmail('') }} style={{ ...S.btn, background:'rgba(255,255,255,.1)', border:'1px solid rgba(255,255,255,.15)' }}>Play Again</button>
                  </div>
                </div>
              )}

              <button onClick={() => setStep(3)} style={{ ...S.btn, background:'transparent', color:'var(--muted)', border:'none', fontSize:12, marginTop:4 }}>← Edit profile</button>
            </div>
          )
        })()}

      </div>
    </div>
  )
}
