'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Nav from '../../../components/Nav'
import LeadModal from '../../../components/LeadModal'

// Parse content — handles both plain text string and JSON object
function parseContent(raw) {
  if (!raw) return { type: 'empty' }

  // Already a JSON object with sections
  if (typeof raw === 'object' && raw.sections) {
    return { type: 'structured', data: raw }
  }

  // Plain text string — render directly
  if (typeof raw === 'string') {
    return { type: 'text', data: raw }
  }

  // JSON string that needs parsing
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw)
      if (parsed.sections) return { type: 'structured', data: parsed }
    } catch {}
  }

  return { type: 'empty' }
}

// Parse TLDR from content
function parseTLDR(text) {
  const tldrMatch = text.match(/---TLDR---\n([\s\S]*?)\n---END TLDR---/)
  if (!tldrMatch) return { tldr: null, body: text }
  return {
    tldr: tldrMatch[1].trim(),
    body: text.replace(/---TLDR---[\s\S]*?---END TLDR---\n*/, '').trim()
  }
}

// TLDR expandable summary box
function TLDRBox({ tldr }) {
  const [expanded, setExpanded] = React.useState(false)
  const lines = tldr.split('\n').filter(l => l.trim())
  const bullets = lines.filter(l => l.startsWith('-') || l.startsWith('•'))
  const prose = lines.filter(l => !l.startsWith('-') && !l.startsWith('•'))
  return (
    <div style={{background:'var(--orange-lt)',border:'1.5px solid rgba(217,95,2,.2)',borderRadius:12,padding:'20px 22px',marginBottom:32}}>
      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}>
        <span style={{fontSize:10,fontFamily:'var(--mono)',color:'var(--orange2)',textTransform:'uppercase',letterSpacing:'.1em',fontWeight:600}}>TL;DR — Quick Summary</span>
        <span style={{flex:1,height:1,background:'rgba(217,95,2,.2)'}}></span>
        <span style={{fontSize:10,fontFamily:'var(--mono)',color:'var(--muted)'}}>2 min read</span>
      </div>
      {prose.map((p,i) => <p key={i} style={{fontSize:14,lineHeight:1.7,color:'var(--ink2)',marginBottom:8}}>{p}</p>)}
      {bullets.length > 0 && (
        <ul style={{margin:'10px 0',paddingLeft:0,listStyle:'none'}}>
          {bullets.map((b,i) => (
            <li key={i} style={{display:'flex',gap:8,marginBottom:6,fontSize:13.5,color:'var(--ink2)',lineHeight:1.6}}>
              <span style={{color:'var(--orange)',flexShrink:0,marginTop:2}}>→</span>
              <span>{b.replace(/^[-•]\s*/,'')}</span>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => setExpanded(!expanded)}
        style={{marginTop:8,background:'none',border:'none',color:'var(--orange2)',fontSize:13,fontWeight:500,cursor:'pointer',display:'flex',alignItems:'center',gap:6,padding:0,fontFamily:'var(--sans)'}}>
        {expanded ? '↑ Hide full article' : '↓ Read full article (18 min)'} 
      </button>
    </div>
  )
}

// Render plain text content — handles ## headings and paragraphs
function RenderText({ text, inlineFAQs }) {
  const lines = text.split('\n')
  const elements = []
  let i = 0
  let h2Count = 0
  const faqSlots = inlineFAQs || []

  while (i < lines.length) {
    const line = lines[i].trim()

    if (!line) { i++; continue }

    // H2 heading
    if (line.startsWith('## ')) {
      h2Count++
      elements.push(
        <h2 key={`h2-${i}`} style={{ fontFamily:'var(--serif)', fontSize:'1.3rem', fontWeight:700, marginTop:36, marginBottom:14, color:'var(--ink)', lineHeight:1.25 }}>
          {line.replace('## ', '')}
        </h2>
      )
      // Inject inline FAQ after every 3rd H2
      if (h2Count % 3 === 0 && faqSlots.length > 0) {
        const slotIndex = Math.floor(h2Count/3) - 1
        if (faqSlots[slotIndex]) {
          elements.push(<InlineFAQ key={`ifaq-${h2Count}`} faqs={faqSlots[slotIndex]} />)
        }
      }
      i++; continue
    }

    // H3 heading
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={`h3-${i}`} style={{ fontFamily:'var(--serif)', fontSize:'1.1rem', fontWeight:700, marginTop:24, marginBottom:10, color:'var(--ink)' }}>
          {line.replace('### ', '')}
        </h3>
      )
      i++; continue
    }

    // Skip update notice line
    if (line.startsWith('Last verified:')) {
      i++; continue
    }

    // Regular paragraph
    const paraLines = []
    while (i < lines.length && lines[i].trim() && !lines[i].trim().startsWith('#')) {
      paraLines.push(lines[i].trim())
      i++
    }
    if (paraLines.length) {
      elements.push(
        <p key={`p-${i}`} style={{ marginBottom: 20, color:'var(--ink2)', lineHeight:1.85, fontSize:15 }}>
          {paraLines.join(' ')}
        </p>
      )
    }
  }

  return <>{elements}</>
}



// ── INLINE FAQ (3 questions shown mid-article) ────────────────
function InlineFAQ({ faqs }) {
  const [open, setOpen] = useState(null)
  if (!faqs || faqs.length === 0) return null
  return (
    <div style={{ margin:'36px 0', background:'var(--cream2)', borderRadius:12, padding:'20px', border:'1px solid var(--border)' }}>
      <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:12, display:'flex', alignItems:'center', gap:8 }}>
        <span>💬</span> People also ask
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{ background:'var(--white)', borderRadius:9, overflow:'hidden', border:'1px solid var(--border)' }}>
            <button onClick={() => setOpen(open===i ? null : i)}
              style={{ width:'100%', padding:'12px 14px', display:'flex', justifyContent:'space-between', alignItems:'center', background:'none', border:'none', cursor:'pointer', textAlign:'left', gap:10 }}>
              <span style={{ fontSize:13, fontWeight:500, color:'var(--ink)', lineHeight:1.4 }}>{faq.q}</span>
              <span style={{ fontSize:16, color:'var(--muted)', flexShrink:0, transition:'transform .2s', transform:open===i?'rotate(45deg)':'none' }}>+</span>
            </button>
            {open===i && (
              <div style={{ padding:'0 14px 12px', fontSize:13, color:'var(--ink2)', lineHeight:1.7, borderTop:'1px solid var(--border2)' }}>
                <div style={{ height:10 }}/>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Split FAQs into chunks for inline placement
function splitFAQsForInline(faqs) {
  // Returns {inline1: first 3, inline2: next 3, inline3: next 3, rest: remaining}
  return {
    inline1: faqs.slice(0, 3),
    inline2: faqs.slice(3, 6),
    inline3: faqs.slice(6, 9),
    rest: faqs.slice(9),
  }
}

// ── AUTO FAQ GENERATOR ────────────────────────────────────────
// Generates 4-5 FAQs from article content for SEO
function generateFAQs(post) {
  const title = post.title || ''
  const category = post.category || ''
  const desc = post.description || ''

  // Category-specific FAQ templates
  const faqMap = {
    'College Guide': [
      { q: `What is the fee structure of ${title.split('—')[0].trim()}?`, a: `The fees and other details are covered in this guide above. We recommend checking the official college website for the most current fee structure as these can change annually.` },
      { q: `What is the CAT cutoff for ${title.split('—')[0].trim()}?`, a: `The CAT cutoff and eligibility criteria are explained in detail in this guide. Cutoffs vary by category — General, OBC, SC/ST — and also depend on your academic profile and diversity factors.` },
      { q: `Is ${title.split('—')[0].trim()} worth it?`, a: `The ROI analysis — fees versus average placement — is covered in this guide. The short answer depends on your career goals, the fees you are paying, and whether the college's strong sectors align with your target role.` },
      { q: `How do I apply to ${title.split('—')[0].trim()}?`, a: `Applications are typically through the official website using CAT/XAT/GMAT scores. The selection process includes shortlisting based on scores and profile, followed by Written Ability Test (WAT) and Personal Interview (PI).` },
    ],
    'College Comparison': [
      { q: `Which is better — ${title.includes('vs') ? title.split('vs')[0].trim().replace(/—.*$/,'').trim() : 'College A'} or ${title.includes('vs') ? title.split('vs')[1].trim().replace(/—.*$/,'').trim() : 'College B'}?`, a: `The honest answer depends on your career goal. The detailed comparison above covers placements, fees, location, and which profiles each college suits best. There is no universally "better" college — the right choice depends on your target sector and profile.` },
      { q: `What is the salary difference between the two colleges?`, a: `The placement and average package data for both colleges is covered in the comparison above. Salary differences between comparable colleges are often smaller than they appear — the more important factor is which sectors recruit from each campus.` },
      { q: `If I get calls from both, which should I choose?`, a: `The decision framework is in the article above. Key factors: your target career sector, location preference, fees versus ROI, and which college has stronger alumni in your target industry.` },
      { q: `What is the CAT cutoff difference between the two?`, a: `Cutoffs for both colleges are listed in the comparison. Most top colleges have similar overall cutoffs but differ in sectional minimums and the weight given to academics and work experience.` },
    ],
    'Score Guide': [
      { q: `Which colleges can I get with this percentile?`, a: `The full list of colleges you can target at this percentile is covered above. Remember that your academic profile, gender, category, and work experience also affect your actual chances — use the eligibility checker at collvera.com/eligibility for a personalised assessment.` },
      { q: `Is this percentile enough for IIM?`, a: `It depends on which IIM and your overall profile. Old IIMs (A, B, C) require 99%+ for General category. Newer IIMs and IIM Kozhikode have lower cutoffs. Female candidates and non-engineers receive effective relaxation of 3-5 percentile at most IIMs.` },
      { q: `What should I do if I miss the cutoff by a few percentile?`, a: `A few options: apply to colleges just below your current score as a backup, attempt the exam again next year, or consider XAT/NMAT/GMAT as alternative routes to strong colleges that don't rely on CAT.` },
      { q: `How does diversity bonus work in IIM admissions?`, a: `IIMs apply diversity bonuses during shortlisting to increase representation of female candidates and non-engineering backgrounds. The effective bonus is typically 3-5 percentile for female candidates and 3-4 percentile for non-engineers. OBC and SC/ST categories receive relaxed cutoffs as per government policy.` },
    ],
    'CAT Prep': [
      { q: `How many months does it take to prepare for CAT?`, a: `Most serious aspirants prepare for 6-12 months. Starting in April-May for a November exam gives sufficient time. 3-month intensive preparation is possible for students who are strong in at least two sections.` },
      { q: `What is the CAT exam pattern in 2025-26?`, a: `CAT has 3 sections: VARC (Verbal Ability and Reading Comprehension), DILR (Data Interpretation and Logical Reasoning), and QA (Quantitative Ability). Total questions: approximately 66. Total duration: 120 minutes, with 40 minutes per section. Negative marking: -1 for wrong MCQ answers.` },
      { q: `How many mock tests should I take before CAT?`, a: `Most toppers take 20-30 full mocks in the final 3 months. More important than the number is the quality of analysis after each mock — spending 2-3 hours analysing errors is more valuable than taking the next mock.` },
      { q: `What is a good CAT score to target?`, a: `95 percentile opens MDI, SPJIMR and IIM Kozhikode. 97%+ opens IIM Lucknow and Indore. 99%+ is needed for IIM A, B, C and FMS Delhi. Your target should be determined by which colleges you want to attend.` },
    ],
    'Placement Data': [
      { q: `Are the placement figures published by colleges accurate?`, a: `Top colleges that follow IPRS (Indian Placement Reporting Standards) — including all IIMs — publish audited figures. Private colleges vary in transparency. Always check whether figures include only fixed salary or variable components, and whether they cover 100% of placed students.` },
      { q: `What is the difference between average and median package?`, a: `The average (mean) is pulled up by very high packages from a small number of students. The median — where half earn above and half below — is a more realistic indicator of what a typical student earns. Always compare medians, not averages.` },
      { q: `What sectors hire the most MBA graduates?`, a: `Consulting, BFSI (banking and financial services), FMCG, and technology are the top four sectors across all top Indian B-schools. Consulting typically pays the highest, FMCG offers the best work-life balance at entry level, and technology offers the fastest growth at IIM Bangalore.` },
      { q: `How does CTC differ from actual in-hand salary?`, a: `CTC (Cost to Company) includes components like employer PF contribution, gratuity, and sometimes joining bonuses that you do not receive monthly. At Rs 30-35 LPA CTC, your actual monthly in-hand salary is approximately Rs 1.75-2.0 lakhs — about 60-65% of the annual CTC figure.` },
    ],
    'Career Guide': [
      { q: `What is the average MBA salary in India in 2025?`, a: `Average MBA salary varies widely by college. IIM Ahmedabad graduates average Rs 35.22 LPA, FMS Delhi averages Rs 34 LPA at Rs 2.43L fees, XLRI averages Rs 28.68 LPA, and Tier 2 colleges range from Rs 10-18 LPA. The right benchmark is the college you attend, not a national average.` },
      { q: `Which sector pays the highest salary after MBA in India?`, a: `Consulting (McKinsey, BCG, Bain) pays Rs 28-50 LPA at top IIMs. Investment banking pays Rs 25-60 LPA with significant bonus potential. FMCG pays Rs 18-28 LPA with better work-life balance. Technology pays Rs 20-35 LPA depending on role.` },
      { q: `How long does it take to recover MBA fees?`, a: `At FMS Delhi (Rs 2.43L fees, Rs 34 LPA avg), fee recovery takes under 1 month. At IIM Ahmedabad (Rs 27.5L fees, Rs 35 LPA avg), approximately 9-10 months. At Tier 2 colleges (Rs 15-20L fees, Rs 10-12 LPA avg), 18-36 months. ROI varies dramatically by college.` },
      { q: `Is MBA worth it in India in 2025?`, a: `For top colleges — IIMs, FMS, XLRI, SPJIMR — the ROI is genuinely strong. For Tier 2 colleges, it depends on whether your specific career goal requires the MBA credential or if work experience would serve you better. The worst investment is a mediocre MBA at high fees.` },
    ],
    'Education Guide': [
      { q: `What is the difference between MBA and PGDM in India?`, a: `MBA is a degree awarded by UGC-recognised universities. PGDM is a diploma awarded by autonomous AICTE-approved institutes — including all IIMs, XLRI, and most top private B-schools. For private sector careers, the distinction is irrelevant. For government jobs and PSU recruitment, MBA may have a slight advantage.` },
      { q: `Which is better — MBA or PGDM?`, a: `Neither is inherently better. The institute quality matters far more than the degree type. IIM Ahmedabad's PGDM is more valuable than an MBA from a mediocre university. Choose based on the institute's placement outcomes, fees, and your career goals.` },
      { q: `Can I do a PhD after PGDM in India?`, a: `Yes. Most Indian and international doctoral programs accept PGDM from recognised institutes. IIMs regularly admit their own PGDM graduates into FPM (Fellow Programme in Management). Some universities with strict eligibility criteria may require additional documentation.` },
      { q: `Is PGDM equivalent to MBA for government jobs?`, a: `AICTE has issued equivalence notifications declaring PGDM equivalent to MBA for government and PSU recruitment. This has been upheld in multiple court cases. However, individual PSUs may occasionally apply eligibility criteria narrowly — check specific job notifications carefully.` },
    ],
    'Fees Guide': [
      { q: `Which MBA college has the lowest fees in India?`, a: `FMS Delhi charges Rs 2.43 lakhs total for a 2-year program with Rs 34 LPA average placement — the best ROI in India. JBIMS Mumbai charges Rs 4.5 lakhs with Rs 28 LPA average. Among private institutes, IIM Indore at Rs 16.5 lakhs is the most affordable old IIM.` },
      { q: `Can I get an education loan for MBA in India?`, a: `Yes. SBI, HDFC Credila, Avanse, and most major banks offer education loans for MBA at top institutes. IIM students typically get unsecured loans up to Rs 30-40 lakhs at 10-12% interest. Repayment period is 7-15 years. Always compare interest rates and prepayment terms before choosing a lender.` },
      { q: `What is the total cost of an MBA at IIM Ahmedabad?`, a: `IIM Ahmedabad tuition fees are Rs 27.5 lakhs for 2025-26. Add living expenses of Rs 4-5 lakhs over 2 years, books and materials Rs 1 lakh. Total cost of attendance: approximately Rs 32-33 lakhs. At Rs 35 LPA average salary, fee recovery takes approximately 11 months.` },
      { q: `Are there scholarships available at IIMs?`, a: `Yes. All IIMs offer need-based scholarships for students from lower-income families. Merit scholarships are available for top performers. Some IIMs also have scholarships for diversity categories. Apply proactively through the institute's financial aid office after admission.` },
    ],
  }

  // Get FAQs for this category, fallback to generic
  const faqs = faqMap[category] || [
    { q: `What is ${title.split('—')[0].trim()} about?`, a: desc },
    { q: 'How do I check my eligibility for MBA colleges in India?', a: 'Use the Collvera eligibility checker at collvera.com/eligibility. Enter your CAT/XAT/GMAT score, academic percentages, work experience, gender and category. The AI calculates your match percentage for 20+ MBA colleges in 2 minutes.' },
    { q: 'Which MBA college has the best ROI in India?', a: 'FMS Delhi has the best ROI — Rs 2.43 lakh fees with Rs 34 LPA average placement. JBIMS Mumbai is second with Rs 4.5 lakh fees and Rs 28 LPA average. Among private institutes, IIM Lucknow at Rs 22 lakh fees and Rs 32.3 LPA average offers the best ROI.' },
    { q: 'How is the Collvera ranking different from NIRF?', a: 'NIRF weights research output and faculty heavily. Collvera AI ranking weights placement quality, ROI (package vs fees), location advantage, and alumni network. This is why FMS Delhi ranks #3 on Collvera despite being NIRF #12 — its placement outcomes at minimal fees are exceptional.' },
  ]

  return faqs
}

function FAQSection({ post }) {
  const faqs = generateFAQs(post)
  const [open, setOpen] = useState(null)
  const [visible, setVisible] = useState(5)
  const sectionRef = useRef(null)

  // Progressive reveal — show 5 more when user scrolls near bottom of visible FAQs
  useEffect(() => {
    if (visible >= faqs.length) return
    const observer = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) setVisible(v => Math.min(v + 5, faqs.length)) },
      { threshold: 0.8 }
    )
    const sentinel = document.getElementById('faq-sentinel')
    if (sentinel) observer.observe(sentinel)
    return () => observer.disconnect()
  }, [visible, faqs.length])

  return (
    <div ref={sectionRef} style={{ marginTop:48, marginBottom:8 }}>
      <h2 style={{ fontFamily:'var(--serif)', fontSize:'1.4rem', fontWeight:700, marginBottom:6, color:'var(--ink)' }}>
        Frequently Asked Questions
      </h2>
      <p style={{ fontSize:13, color:'var(--muted)', marginBottom:20 }}>{faqs.length} questions answered</p>
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {faqs.slice(0, visible).map((faq, i) => (
          <div key={i} style={{ border:'1px solid var(--border)', borderRadius:10, overflow:'hidden', background:'var(--white)', transition:'all .2s' }}>
            <button
              onClick={() => setOpen(open===i ? null : i)}
              style={{ width:'100%', padding:'14px 18px', display:'flex', justifyContent:'space-between', alignItems:'center', background:'none', border:'none', cursor:'pointer', textAlign:'left', gap:12 }}>
              <span style={{ fontSize:14, fontWeight:500, color:'var(--ink)', lineHeight:1.45 }}>{faq.q}</span>
              <span style={{ fontSize:18, color:'var(--muted)', flexShrink:0, transition:'transform .2s', transform:open===i?'rotate(45deg)':'none' }}>+</span>
            </button>
            {open===i && (
              <div style={{ padding:'0 18px 16px', fontSize:13.5, color:'var(--ink2)', lineHeight:1.75, borderTop:'1px solid var(--border2)' }}>
                <div style={{ height:12 }}/>
                {faq.a}
              </div>
            )}
          </div>
        ))}
        {/* Sentinel for progressive reveal */}
        {visible < faqs.length && (
          <div id="faq-sentinel" style={{ height:20 }}/>
        )}
        {visible < faqs.length && (
          <button onClick={() => setVisible(v => Math.min(v+5, faqs.length))}
            style={{ padding:'10px', background:'var(--cream)', border:'1px solid var(--border)', borderRadius:9, fontSize:13, cursor:'pointer', color:'var(--muted)', fontFamily:'var(--sans)' }}>
            Show more questions ({faqs.length - visible} remaining) ↓
          </button>
        )}
      </div>
    </div>
  )
}

export default function BlogPostClient({ post }) {
  const [leadOpen, setLeadOpen] = useState(false)
  const parsed = parseContent(post.content)

  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)' }}>
      <Nav onLeadOpen={() => setLeadOpen(true)} />

      <div style={{ maxWidth:760, margin:'0 auto', padding:'32px 24px 60px' }}>

        <Link href="/blog" style={{ color:'var(--orange)', fontSize:13, fontWeight:500, textDecoration:'none', display:'flex', alignItems:'center', gap:6, marginBottom:24 }}>
          ← Back to Blog
        </Link>

        {/* Header */}
        <div style={{ marginBottom:8, display:'flex', gap:10, alignItems:'center', flexWrap:'wrap' }}>
          <span style={{ fontSize:11, padding:'3px 10px', borderRadius:20, background:'var(--orange-lt)', color:'var(--orange2)', fontFamily:'var(--mono)', fontWeight:500 }}>{post.category}</span>
          <span style={{ fontSize:12, color:'var(--muted)' }}>{post.read_time}</span>
          {post.published_at && (
            <span style={{ fontSize:12, color:'var(--muted)', fontFamily:'var(--mono)' }}>
              {new Date(post.published_at).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}
            </span>
          )}
        </div>

        <h1 style={{ fontFamily:'var(--serif)', fontSize:'clamp(1.6rem,3vw,2.3rem)', fontWeight:700, lineHeight:1.2, marginBottom:16, marginTop:12, color:'var(--ink)' }}>
          {post.title}
        </h1>

        <div style={{ borderTop:'3px solid var(--orange)', borderBottom:'1px solid var(--border2)', padding:'16px 0', marginBottom:32 }}>
          <p style={{ fontSize:15, color:'var(--muted)', lineHeight:1.7, margin:0, fontStyle:'italic' }}>{post.description}</p>
        </div>

        {/* Verification notice */}
        <div style={{ padding:'8px 14px', background:'var(--cream2)', borderRadius:8, fontSize:11.5, color:'var(--muted)', marginBottom:28, fontFamily:'var(--mono)', display:'flex', alignItems:'center', gap:6 }}>
          <span>✓</span>
          <span>Last verified: March 2026 · Spot outdated data? Email verify@collvera.com</span>
        </div>

        {/* Content */}
        <div style={{ fontSize:15, lineHeight:1.85, color:'var(--ink)' }}>

          {parsed.type === 'text' && (() => {
            const { tldr, body } = parseTLDR(parsed.data)
            const allFAQs = generateFAQs(post)
            const { inline1, inline2, inline3 } = splitFAQsForInline(allFAQs)
            return (
              <>
                {tldr && <TLDRBox tldr={tldr} />}
                <RenderText text={body} inlineFAQs={[inline1, inline2, inline3]} />
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
              {(parsed.data.sections || []).map((section, i) => (
                <div key={i}>
                  {section.heading && (
                    <h2 style={{ fontFamily:'var(--serif)', fontSize:'1.3rem', fontWeight:700, marginTop:36, marginBottom:14, color:'var(--ink)', lineHeight:1.25 }}>
                      {section.heading}
                    </h2>
                  )}
                  {section.text && (
                    <p style={{ marginBottom:20, color:'var(--ink2)', lineHeight:1.85 }}>{section.text}</p>
                  )}
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

        {/* Mid-article CTA */}
        <div style={{ margin:'40px 0', padding:'20px 24px', background:'var(--orange-lt)', borderRadius:12, border:'1px solid rgba(217,95,2,.15)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
          <div>
            <div style={{ fontSize:14, fontWeight:600, color:'var(--ink)', marginBottom:2 }}>Not sure which college to apply to?</div>
            <div style={{ fontSize:12.5, color:'var(--muted)' }}>Check your eligibility across 20+ colleges in 2 minutes.</div>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <Link href="/eligibility" style={{ background:'var(--orange)', color:'#fff', padding:'9px 18px', borderRadius:8, fontSize:13, fontWeight:500, textDecoration:'none' }}>Check Eligibility →</Link>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQSection post={post} />

        {/* Bottom CTA */}
        <div style={{ marginTop:40, padding:'28px 32px', background:'var(--ink)', borderRadius:14, textAlign:'center' }}>
          <div style={{ fontFamily:'var(--serif)', fontSize:'1.1rem', fontWeight:700, color:'#fff', marginBottom:6 }}>Still have questions?</div>
          <p style={{ fontSize:13, color:'rgba(255,255,255,.5)', marginBottom:18, lineHeight:1.6 }}>
            Our AI counsellor will shortlist colleges based on your CAT score, budget and goals — free.
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

      </div>

      <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)} />
    </div>
  )
}
