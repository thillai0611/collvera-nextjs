'use client'
import Link from 'next/link'
import Nav from '../../components/Nav'

const EXAMS = [
  {
    id: 'cat',
    name: 'CAT',
    full: 'Common Admission Test',
    emoji: '🏆',
    conductor: 'IIMs (on rotation)',
    when: 'November annually',
    colleges: '1200+ colleges',
    highlight: 'India\'s most prestigious MBA entrance exam',
    cutoff: '99%+ for IIM A/B/C',
    fee: '₹2,300 (General)',
    students: '3.3 lakh+ appear annually',
    ready: true,
    color: '#d95f02',
    bg: '#fff8f5',
  },
  {
    id: 'xat',
    name: 'XAT',
    full: 'Xavier Aptitude Test',
    emoji: '✝️',
    conductor: 'XLRI Jamshedpur',
    when: 'January annually',
    colleges: '150+ colleges',
    highlight: 'Gateway to XLRI — India\'s #1 HR MBA',
    cutoff: '97%+ for XLRI BM/HRM',
    fee: '₹2,200',
    students: '1 lakh+ appear annually',
    ready: false,
    color: '#1565c0',
    bg: '#f0f7ff',
  },
  {
    id: 'nmat',
    name: 'NMAT',
    full: 'NMAT by GMAC',
    emoji: '📊',
    conductor: 'GMAC',
    when: 'October-December annually',
    colleges: 'NMIMS and 50+ partner colleges',
    highlight: 'Retake up to 3 times in one season',
    cutoff: '215+ for NMIMS Mumbai',
    fee: '₹2,800 (first attempt)',
    students: '80,000+ appear annually',
    ready: false,
    color: '#1b5e20',
    bg: '#f1f8f2',
  },
  {
    id: 'gmat',
    name: 'GMAT',
    full: 'Graduate Management Admission Test',
    emoji: '🌏',
    conductor: 'GMAC',
    when: 'Year-round (computer adaptive)',
    colleges: '2,300+ globally including ISB',
    highlight: 'Global MBA — ISB, global top-50 programs',
    cutoff: '710+ for ISB Hyderabad',
    fee: '$275 (~₹23,000)',
    students: '2 lakh+ globally',
    ready: false,
    color: '#4a148c',
    bg: '#f8f3ff',
  },
]

export default function ExamsHub() {
  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)' }}>
      <Nav />

      {/* Header */}
      <div style={{ background:'var(--ink)', padding:'44px 32px 40px', borderBottom:'1px solid rgba(255,255,255,.07)' }}>
        <div style={{ maxWidth:1000, margin:'0 auto' }}>
          <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'#1D9E75', textTransform:'uppercase', letterSpacing:'.12em', marginBottom:10 }}>
            complete guides · verified data · updated 2025-26
          </div>
          <h1 style={{ fontFamily:'var(--serif)', fontSize:'clamp(1.8rem,3vw,2.6rem)', fontWeight:700, color:'#fff', marginBottom:10, lineHeight:1.1 }}>
            MBA Entrance Exams India 2025-26
          </h1>
          <p style={{ fontSize:14, color:'rgba(255,255,255,.45)', maxWidth:560, lineHeight:1.7 }}>
            Complete guides for every MBA entrance exam in India — syllabus, pattern, dates, preparation strategy and which colleges accept each exam.
          </p>
        </div>
      </div>

      <div style={{ maxWidth:1000, margin:'0 auto', padding:'32px 32px 64px' }}>

        {/* Exam cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(440px,1fr))', gap:16, marginBottom:48 }}>
          {EXAMS.map(exam => (
            <div key={exam.id} style={{ background:'#fff', border:'1px solid var(--border)', borderRadius:16, overflow:'hidden', opacity: exam.ready ? 1 : 0.75 }}>
              <div style={{ height:4, background:exam.color }}/>
              <div style={{ padding:'22px 24px' }}>
                {/* Header */}
                <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:14 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                    <span style={{ fontSize:28 }}>{exam.emoji}</span>
                    <div>
                      <div style={{ fontFamily:'var(--serif)', fontSize:'1.3rem', fontWeight:700, color:'var(--ink)' }}>{exam.name}</div>
                      <div style={{ fontSize:12, color:'var(--muted)' }}>{exam.full}</div>
                    </div>
                  </div>
                  {exam.ready
                    ? <span style={{ fontSize:10, fontFamily:'var(--mono)', color:exam.color, background:exam.bg, padding:'3px 9px', borderRadius:10, border:`1px solid ${exam.color}30`, whiteSpace:'nowrap' }}>Guide ready</span>
                    : <span style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', background:'var(--cream2)', padding:'3px 9px', borderRadius:10, border:'1px solid var(--border)' }}>Coming soon</span>
                  }
                </div>

                {/* Highlight */}
                <div style={{ fontSize:13, color:'var(--ink2)', marginBottom:16, fontStyle:'italic', borderLeft:`3px solid ${exam.color}`, paddingLeft:10 }}>
                  {exam.highlight}
                </div>

                {/* Stats grid */}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:16 }}>
                  {[
                    ['Conducted by', exam.conductor],
                    ['When', exam.when],
                    ['Colleges', exam.colleges],
                    ['Top cutoff', exam.cutoff],
                    ['Exam fee', exam.fee],
                    ['Aspirants', exam.students],
                  ].map(([l,v]) => (
                    <div key={l} style={{ background:'var(--cream)', borderRadius:8, padding:'8px 10px' }}>
                      <div style={{ fontSize:9.5, fontFamily:'var(--mono)', color:'var(--muted)', marginBottom:2 }}>{l}</div>
                      <div style={{ fontSize:12.5, fontWeight:500, color:'var(--ink)' }}>{v}</div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                {exam.ready ? (
                  <Link href={`/exams/${exam.id}`}
                    style={{ display:'block', background:exam.color, color:'#fff', padding:'10px 18px', borderRadius:8, fontSize:13, fontWeight:500, textAlign:'center', textDecoration:'none' }}>
                    Read Complete {exam.name} Guide →
                  </Link>
                ) : (
                  <div style={{ background:'var(--cream2)', color:'var(--muted)', padding:'10px 18px', borderRadius:8, fontSize:13, textAlign:'center', border:'1px solid var(--border)' }}>
                    Guide coming soon
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick comparison table */}
        <div style={{ background:'#fff', border:'1px solid var(--border)', borderRadius:14, overflow:'hidden', marginBottom:40 }}>
          <div style={{ padding:'18px 24px', borderBottom:'1px solid var(--border)' }}>
            <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:4 }}>Quick comparison</div>
            <div style={{ fontFamily:'var(--serif)', fontSize:'1.1rem', fontWeight:700 }}>Which exam should you take?</div>
          </div>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
              <thead>
                <tr style={{ background:'var(--cream)' }}>
                  {['Exam','Best for','Key colleges','Difficulty','Fee'].map(h => (
                    <th key={h} style={{ padding:'10px 16px', textAlign:'left', fontSize:11, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.04em', fontWeight:500, whiteSpace:'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['CAT','General management, IIMs','IIM A/B/C, FMS, MDI','Very High (99%+ needed)','₹2,300'],
                  ['XAT','HR, consulting, XLRI','XLRI, SPJIMR, IMT','High (97%+ for XLRI)','₹2,200'],
                  ['NMAT','Finance, pharma, Mumbai','NMIMS, SDA Bocconi','Moderate (215+ score)','₹2,800'],
                  ['GMAT','Global MBA, ISB','ISB, Great Lakes, global','High (710+ for ISB)','~₹23,000'],
                ].map((row, i) => (
                  <tr key={i} style={{ borderTop:'1px solid var(--border2)' }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding:'12px 16px', color: j===0?'var(--ink)':'var(--ink2)', fontWeight: j===0?600:400, whiteSpace: j===0?'nowrap':'normal' }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ background:'var(--ink)', borderRadius:14, padding:'28px 32px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:20, flexWrap:'wrap' }}>
          <div>
            <div style={{ fontFamily:'var(--serif)', fontSize:'1.1rem', fontWeight:700, color:'#fff', marginBottom:4 }}>Know your mock score?</div>
            <p style={{ fontSize:13, color:'rgba(255,255,255,.5)', margin:0 }}>See which colleges you can get into based on your current prep level.</p>
          </div>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            <Link href="/mba-game" style={{ background:'var(--orange)', color:'#fff', padding:'10px 20px', borderRadius:8, fontSize:13, fontWeight:500, textDecoration:'none' }}>Play The MBA Game →</Link>
            <Link href="/eligibility" style={{ background:'rgba(255,255,255,.08)', color:'rgba(255,255,255,.7)', padding:'10px 20px', borderRadius:8, fontSize:13, textDecoration:'none', border:'1px solid rgba(255,255,255,.12)' }}>Check Eligibility</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
