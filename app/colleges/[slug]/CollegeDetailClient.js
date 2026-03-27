'use client'
import { useState } from 'react'
import Link from 'next/link'
import Nav from '../../../components/Nav'
import LeadModal from '../../../components/LeadModal'

export default function CollegeDetailClient({ college, programs, loans }) {
  const [leadOpen, setLeadOpen] = useState(false)
  const [activeProgram, setActiveProgram] = useState(programs[0] || null)

  const latestPlacement = activeProgram?.placements?.sort((a,b) => b.year - a.year)[0]
  const cutoffs = activeProgram?.exam_cutoffs || []
  const scholarships = activeProgram?.scholarships || []

  return (
    <div style={{ minHeight:'100vh' }}>
      <Nav onLeadOpen={() => setLeadOpen(true)} />
      <div style={{ maxWidth:1000, margin:'0 auto', padding:'24px 24px 60px' }}>

        <Link href="/colleges" style={{ color:'var(--orange)', fontSize:13, fontWeight:500, textDecoration:'none', display:'flex', alignItems:'center', gap:6, marginBottom:24 }}>
          ← Back to Colleges
        </Link>

        {/* Header */}
        <div className="card" style={{ padding:28, marginBottom:24, position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background:college.color || 'var(--orange)' }}></div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:16 }}>
            <div>
              <div style={{ fontSize:12, color:'var(--muted)', marginBottom:4 }}>#{college.nirf_rank} NIRF · Est. {college.founded}</div>
              <h1 style={{ fontFamily:'var(--font-display)', fontSize:'1.8rem', fontWeight:700, marginBottom:8 }}>{college.name}</h1>
              <div style={{ fontSize:14, color:'var(--muted)', marginBottom:12 }}>📍 {college.city}, {college.state}</div>
              {college.accreditation && (
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  {college.accreditation.split(',').map(a => <span key={a} className="tag">{a.trim()}</span>)}
                </div>
              )}
            </div>
            <div style={{ fontSize:32 }}>{college.logo_emoji || '🏛️'}</div>
          </div>
          {college.description && (
            <p style={{ marginTop:16, fontSize:14, color:'var(--ink2)', lineHeight:1.7, borderTop:'1px solid var(--border2)', paddingTop:16 }}>
              {college.description}
            </p>
          )}
        </div>

        {/* Programs selector */}
        {programs.length > 0 ? (
          <>
            {programs.length > 1 && (
              <div style={{ marginBottom:24 }}>
                <div style={{ fontSize:13, fontWeight:600, color:'var(--muted)', marginBottom:10, textTransform:'uppercase', letterSpacing:'0.06em' }}>Select Program</div>
                <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                  {programs.map(p => (
                    <button key={p.id} onClick={() => setActiveProgram(p)} style={{
                      padding:'10px 18px', borderRadius:8, border:'1px solid', cursor:'pointer', fontSize:13, fontWeight:500,
                      borderColor: activeProgram?.id === p.id ? 'var(--orange)' : 'var(--border)',
                      background: activeProgram?.id === p.id ? 'var(--orange-light)' : 'var(--white)',
                      color: activeProgram?.id === p.id ? 'var(--orange2)' : 'var(--ink2)',
                    }}>
                      {p.name}
                      {p.total_fees && <span style={{ fontSize:11, color:'var(--muted)', marginLeft:8 }}>₹{(p.total_fees/100000).toFixed(0)}L</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeProgram && (
              <>
                {/* Key stats */}
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))', gap:12, marginBottom:24 }}>
                  {[
                    { label:'Duration', value: activeProgram.duration_months ? `${activeProgram.duration_months} months` : 'N/A' },
                    { label:'Total Fees', value: activeProgram.total_fees ? `₹${(activeProgram.total_fees/100000).toFixed(0)}L` : 'N/A' },
                    { label:'Avg Package', value: latestPlacement?.avg_package ? `₹${(latestPlacement.avg_package/100000).toFixed(0)} LPA` : 'N/A' },
                    { label:'Max Package', value: latestPlacement?.max_package ? `₹${(latestPlacement.max_package/100000).toFixed(0)} LPA` : 'N/A' },
                    { label:'Intake', value: activeProgram.intake || 'N/A' },
                    { label:'Work Exp', value: activeProgram.work_exp_required ? `${activeProgram.min_work_exp_years}+ years` : 'Not required' },
                  ].map(s => (
                    <div key={s.label} style={{ background:'var(--cream)', borderRadius:'var(--radius)', padding:'14px 16px', textAlign:'center' }}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:4 }}>{s.label.toUpperCase()}</div>
                      <div style={{ fontFamily:'var(--font-display)', fontSize:'1.1rem', fontWeight:700, color:'var(--ink)' }}>{s.value}</div>
                    </div>
                  ))}
                </div>

                {/* Exam Cutoffs */}
                {cutoffs.length > 0 && (
                  <div className="card" style={{ padding:24, marginBottom:24 }}>
                    <div style={{ fontFamily:'var(--font-display)', fontSize:'1rem', fontWeight:600, marginBottom:16 }}>Exam Cutoffs</div>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:12 }}>
                      {cutoffs.map((c, i) => (
                        <div key={i} style={{ background:'var(--cream)', borderRadius:10, padding:'12px 16px' }}>
                          <div style={{ fontSize:13, fontWeight:700, color:'var(--orange2)' }}>{c.exams?.name}</div>
                          <div style={{ fontSize:20, fontWeight:700, fontFamily:'var(--font-display)', margin:'4px 0' }}>
                            {c.cutoff}{c.exams?.score_type === 'percentile' ? '%+' : '+'}
                          </div>
                          <div style={{ fontSize:11, color:'var(--muted)' }}>{c.category} · {c.year}</div>
                          {c.notes && <div style={{ fontSize:11, color:'var(--muted)', marginTop:4 }}>{c.notes}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Placement sectors */}
                {latestPlacement && (
                  <div className="card" style={{ padding:24, marginBottom:24 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
                      <div style={{ fontFamily:'var(--font-display)', fontSize:'1rem', fontWeight:600 }}>Placements {latestPlacement.year}</div>
                      {latestPlacement.placement_pct && <span className="tag tag-green">{latestPlacement.placement_pct}% placed</span>}
                    </div>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:12, marginBottom:16 }}>
                      {[
                        ['Avg Package', latestPlacement.avg_package],
                        ['Median', latestPlacement.median_package],
                        ['Highest', latestPlacement.max_package],
                        ['Companies', latestPlacement.companies_visited],
                      ].filter(([,v]) => v).map(([l,v]) => (
                        <div key={l} style={{ background:'var(--cream)', borderRadius:8, padding:'10px 14px' }}>
                          <div style={{ fontSize:10, color:'var(--muted)' }}>{l.toUpperCase()}</div>
                          <div style={{ fontSize:14, fontWeight:700, marginTop:2 }}>
                            {typeof v === 'number' && v > 1000 ? `₹${(v/100000).toFixed(0)} LPA` : v}
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Sectors */}
                    {[1,2,3,4,5].map(i => {
                      const name = latestPlacement[`sector${i}_name`]
                      const pct = latestPlacement[`sector${i}_pct`]
                      if (!name || !pct) return null
                      return (
                        <div key={i} style={{ marginBottom:8 }}>
                          <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:3 }}>
                            <span>{name}</span><span style={{ fontWeight:600 }}>{pct}%</span>
                          </div>
                          <div style={{ height:5, background:'var(--cream2)', borderRadius:3 }}>
                            <div style={{ height:'100%', width:`${pct}%`, background:college.color || 'var(--orange)', borderRadius:3 }}></div>
                          </div>
                        </div>
                      )
                    })}
                    {latestPlacement.top_recruiters && (
                      <div style={{ marginTop:12, fontSize:12, color:'var(--muted)' }}>
                        <strong style={{ color:'var(--ink)' }}>Top recruiters: </strong>{latestPlacement.top_recruiters}
                      </div>
                    )}
                  </div>
                )}

                {/* Scholarships */}
                {scholarships.length > 0 && (
                  <div className="card" style={{ padding:24, marginBottom:24 }}>
                    <div style={{ fontFamily:'var(--font-display)', fontSize:'1rem', fontWeight:600, marginBottom:16 }}>🎓 Scholarships</div>
                    {scholarships.map((s,i) => (
                      <div key={i} style={{ padding:'12px 0', borderBottom: i < scholarships.length-1 ? '1px solid var(--border2)' : 'none' }}>
                        <div style={{ fontSize:13, fontWeight:600, marginBottom:2 }}>{s.name}</div>
                        {s.amount && <div style={{ fontSize:12, color:'#2e7d32', fontWeight:500 }}>₹{s.amount.toLocaleString('en-IN')} {s.amount_type === 'percentage' ? '%' : ''}</div>}
                        {s.criteria && <div style={{ fontSize:12, color:'var(--muted)' }}>Criteria: {s.criteria}</div>}
                        {s.description && <div style={{ fontSize:12, color:'var(--muted)', marginTop:3 }}>{s.description}</div>}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <div style={{ textAlign:'center', padding:'40px', background:'var(--cream)', borderRadius:'var(--radius-lg)', marginBottom:24 }}>
            <div style={{ fontSize:14, color:'var(--muted)' }}>Program details coming soon. Contact us for complete information.</div>
          </div>
        )}

        {/* Loans */}
        {loans.length > 0 && (
          <div className="card" style={{ padding:24, marginBottom:24 }}>
            <div style={{ fontFamily:'var(--font-display)', fontSize:'1rem', fontWeight:600, marginBottom:16 }}>🏦 Education Loans</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:12 }}>
              {loans.map((l, i) => (
                <div key={i} style={{ background:'var(--cream)', borderRadius:10, padding:'14px 16px' }}>
                  <div style={{ fontSize:13, fontWeight:700, marginBottom:4 }}>{l.bank_name}</div>
                  {l.max_amount && <div style={{ fontSize:12, color:'var(--muted)' }}>Up to ₹{(l.max_amount/100000).toFixed(0)}L</div>}
                  {l.interest_rate_min && <div style={{ fontSize:12, color:'var(--muted)' }}>{l.interest_rate_min}–{l.interest_rate_max}% p.a.</div>}
                  {l.collateral_required === false && <div style={{ fontSize:11, color:'#2e7d32', marginTop:4 }}>No collateral required</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonial */}
        {college.testimonial_text && (
          <div style={{ background:'var(--cream)', borderRadius:'var(--radius-lg)', padding:24, marginBottom:24, borderLeft:'4px solid var(--orange)' }}>
            <p style={{ fontSize:15, fontStyle:'italic', color:'var(--ink2)', lineHeight:1.7, marginBottom:10 }}>"{college.testimonial_text}"</p>
            <div style={{ fontSize:13, fontWeight:600 }}>— {college.testimonial_name}, Class of {college.testimonial_year}</div>
          </div>
        )}

        {/* CTA */}
        <div style={{ background:'var(--ink)', borderRadius:'var(--radius-lg)', padding:'28px', textAlign:'center' }}>
          <div style={{ fontFamily:'var(--font-display)', fontSize:'1.1rem', fontWeight:600, color:'#fff', marginBottom:8 }}>Interested in {college.name}?</div>
          <p style={{ fontSize:13, color:'rgba(255,255,255,0.6)', marginBottom:16 }}>Check your eligibility and get a free counselling session.</p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <button className="btn btn-primary btn-sm" onClick={() => setLeadOpen(true)}>Get Free Counselling →</button>
            <Link href="/eligibility" className="btn btn-outline btn-sm" style={{ color:'#fff', borderColor:'rgba(255,255,255,0.3)', textDecoration:'none' }}>Check Eligibility</Link>
          </div>
        </div>
      </div>

      <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)} context={`${college.name} detail page`} />
    </div>
  )
}
