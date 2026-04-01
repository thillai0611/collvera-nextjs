'use client'
import { useState, useEffect, useRef } from 'react'
import Nav from '../../../components/Nav'
import Link from 'next/link'

// ── PASTE COWORK CONTENT HERE ─────────────────────────────────
// Replace ARTICLE_CONTENT and FAQS with Cowork output

const ARTICLE_CONTENT = `## Quick Summary
Conducting Body: IIMs (rotational basis)
Official Website: iimcat.ac.in
Exam Mode: Computer-Based Test (CBT)
Duration: 120 minutes (40 min per section)
Total Questions: ~66 questions
Sections: VARC · DILR · QA
Marking: +3 correct · -1 wrong MCQ · 0 TITA wrong
Colleges Accepting CAT: 1200+ including all 21 IIMs
Application Fee: Rs 2400 (General) · Rs 1200 (SC/ST/PwD)
Exam Month: November 2025

## What is CAT?

CAT — Common Admission Test — is India's most prestigious MBA entrance exam. Conducted annually by the IIMs on a rotational basis, CAT is the primary gateway to all 21 IIMs and 1200+ MBA programs across the country.

Approximately 3.2 to 3.5 lakh students appear for CAT every year. Of these, roughly 40,000 to 50,000 receive IIM calls — about 1 in 7 test takers. Getting a call from an old IIM (Ahmedabad, Bangalore, Calcutta) requires 99 percentile plus, which means approximately 3,500 to 4,000 students nationally.

CAT is different from other MBA entrance exams in one critical way: it is conducted by the IIMs themselves. This means the exam directly determines admission to institutes that collectively produce the highest-paid MBA graduates in India.

## CAT 2025 Important Dates

The CAT 2025 schedule follows the pattern of previous years. Dates are announced when the official notification releases on iimcat.ac.in.

| Event | Expected Date |
|-------|--------------|
| CAT 2025 Notification | July-August 2025 |
| Registration Opens | August 2025 |
| Registration Closes | September 2025 |
| Admit Card Release | October 2025 |
| CAT 2025 Exam Date | Last Sunday of November 2025 |
| Result Declaration | January 2026 |
| IIM Shortlist Releases | January-February 2026 |
| WAT-PI Process | February-April 2026 |
| Final Admission Offers | April-May 2026 |

> 📌 Always check iimcat.ac.in for official dates. Dates above are estimated based on previous year patterns.

## CAT Eligibility Criteria 2025

| Criteria | General/OBC/EWS | SC/ST/PwD |
|----------|----------------|-----------|
| Minimum graduation % | 50% | 45% |
| Age limit | None | None |
| Attempts allowed | Unlimited | Unlimited |
| Final year students | Eligible to apply | Eligible to apply |
| Work experience required | No | No |

Any graduate from a recognised university can appear for CAT. Engineering, commerce, arts, science — all backgrounds are eligible. Final year students who expect to complete graduation can also apply provisionally.

There is no age limit for CAT. Unlike civil services examinations, CAT imposes no upper age limit and no restriction on the number of attempts. A student who appeared in 2020 can appear again in 2025.

> ✅ Non-engineering graduates have a significant advantage in IIM shortlisting because they are scarce in the MBA applicant pool. If you are from commerce, arts, or science — your background is actually a diversity asset.

## CAT Exam Pattern 2025

### Section-Wise Breakdown

| Section | Full Form | Questions | Duration | Negative Marking |
|---------|-----------|-----------|----------|-----------------|
| VARC | Verbal Ability & Reading Comprehension | 24 | 40 min | -1 for MCQ wrong |
| DILR | Data Interpretation & Logical Reasoning | 20 | 40 min | -1 for MCQ wrong |
| QA | Quantitative Ability | 22 | 40 min | -1 for MCQ wrong |
| **Total** | | **~66** | **120 min** | |

### Question Types

| Type | Full Form | Negative Marking |
|------|-----------|-----------------|
| MCQ | Multiple Choice Questions | Yes — -1 per wrong answer |
| TITA | Type In The Answer | No negative marking |

TITA questions typically make up 25-30% of the paper. These are questions where you type the answer rather than selecting from options. Wrong TITA answers carry zero penalty — always attempt them.

> ⚠️ Sectional time limits are strict. Once 40 minutes for VARC ends, you cannot return to it. Plan accordingly.

## CAT Syllabus 2025

### VARC Syllabus

| Topic | Type | Questions | Weight |
|-------|------|-----------|--------|
| Reading Comprehension | MCQ + TITA | 16-18 | ~70% |
| Para Jumbles | TITA | 3-4 | ~15% |
| Para Summary | MCQ | 2-3 | ~10% |
| Odd Sentence Out | TITA | 2-3 | ~5% |

RC passages in CAT are academic and intellectual — philosophy, economics, science, history, social theory. They are NOT news articles or business reports. Students who only read business newspapers are poorly prepared.

### DILR Syllabus

| Topic | Examples |
|-------|---------|
| Data Interpretation | Tables, Bar charts, Line graphs, Pie charts, Caselets |
| Logical Reasoning | Linear/Circular arrangements, Games & Tournaments, Blood relations, Puzzles |

DILR comes in sets of 4-6 questions each. In 40 minutes you must attempt 4-5 sets. Set selection — choosing which sets to attempt — is the single most important DILR skill.

### QA Syllabus

| Topic | Sub-topics | Approx Weight |
|-------|-----------|---------------|
| Arithmetic | Ratio, Percentage, Profit-Loss, Time-Speed-Distance, Time-Work, Averages, Mixtures | 35-40% |
| Algebra | Linear & Quadratic equations, Functions, Progressions, Inequalities | 20-25% |
| Geometry | Triangles, Circles, Mensuration, Coordinate geometry | 15-20% |
| Number System | Divisibility, Remainders, HCF-LCM, Factors, Surds | 10-15% |
| Modern Math | P&C, Probability, Sets, Logarithms | 10-15% |

> 💡 Engineers and non-engineers both struggle with different parts of QA. Engineers often skip Arithmetic basics assuming they know it — and lose marks on percentage and ratio problems. Non-engineers fear Number Theory but Arithmetic is actually accessible with practice.

## CAT Preparation Strategy 2025

### Month-by-Month Plan (Starting April — 8 months)

| Month | Focus | Daily Hours | Key Milestone |
|-------|-------|-------------|---------------|
| April | Concepts — Arithmetic + RC basics | 2-3 hrs | Complete Arithmetic |
| May | Concepts — Algebra + VA practice | 2-3 hrs | Complete Algebra |
| June | Concepts — Geometry + DILR basics | 2-3 hrs | First sectional mock |
| July | Mixed practice + first full mocks | 3-4 hrs | 5 full mocks taken |
| August | Mock + analysis cycle begins | 3-4 hrs | 10 full mocks taken |
| September | Weak area focus + mocks | 4 hrs | 20 full mocks taken |
| October | Mock + strategy refinement | 4 hrs | Freeze strategy Oct 15 |
| November | Light practice + exam prep | 2 hrs | Exam day ready |

### For Working Professionals

| Schedule | Weekday | Weekend |
|----------|---------|---------|
| Phase 1 (Concepts) | 1.5 hrs/day | 4 hrs/day |
| Phase 2 (Mocks) | 1 hr analysis | Full mock + 3 hrs analysis |
| Total weekly | ~12 hrs | ~20 hrs |

> ⚠️ Working professionals make one common mistake: taking mocks on weekdays at 10 PM after work. CAT is a morning exam. Practice under morning conditions on weekends.

## CAT Score vs Percentile

Percentile in CAT is NOT your percentage of correct answers. It is the percentage of students who scored below you.

| Raw Score (approx) | Percentile |
|-------------------|-----------|
| 110-120 / 198 | 99%+ |
| 95-110 / 198 | 95-99% |
| 80-95 / 198 | 90-95% |
| 65-80 / 198 | 80-90% |
| 50-65 / 198 | 70-80% |

> ⚠️ These are approximations. Actual score-to-percentile conversion varies by slot and year due to normalisation. CAT is conducted in multiple slots — scores are normalised across slots so no slot is advantaged.

### What Percentile Gets You Where

| Percentile | Realistic College Targets |
|-----------|--------------------------|
| 99%+ | IIM A, IIM B, IIM C, FMS Delhi |
| 97-99% | IIM L, IIM I, IIM K, FMS Delhi |
| 95-97% | IIM K, SPJIMR, MDI Gurgaon |
| 90-95% | NMIMS, IIFT, IIM newer campuses |
| 85-90% | IMT, TAPMI, Great Lakes, FORE |
| 80-85% | GIM Goa, SOIL, BIMTECH |

> ✅ These cutoffs are for General category male engineers — the most competitive profile. Female candidates and non-engineers effectively get 3-5 percentile relaxation at most IIMs.

## Best Books for CAT 2025

### QA Books

| Book | Author | Best For |
|------|--------|---------|
| Quantitative Aptitude for CAT | Arun Sharma | Comprehensive — all topics |
| Quantum CAT | Sarvesh Verma | Deep practice, harder problems |
| How to Prepare for QA for CAT | Arun Sharma | Beginners |

### VARC Books

| Book | Author | Best For |
|------|--------|---------|
| How to Prepare for Verbal Ability | Arun Sharma | Complete VARC |
| Word Power Made Easy | Norman Lewis | Vocabulary building |
| Reading — The Economist, Aeon, Project Syndicate | — | RC habit building |

### DILR Books

| Book | Author | Best For |
|------|--------|---------|
| How to Prepare for Data Interpretation | Arun Sharma | DI sets |
| Logical Reasoning and Data Interpretation | Nishit Sinha | Comprehensive |

### Mock Test Series — Ranked

| Series | Rating | Notes |
|--------|--------|-------|
| IMS | ⭐⭐⭐⭐⭐ | Closest to actual CAT difficulty |
| TIME | ⭐⭐⭐⭐ | Good but inflates by ~4 percentile |
| Career Launcher | ⭐⭐⭐⭐ | Good DILR sets |
| MBA Prep (Free) | ⭐⭐⭐ | Good for beginners |
| Previous year papers | ⭐⭐⭐⭐⭐ | Best resource — free on iimcat.ac.in |

## Colleges Accepting CAT 2025

### IIMs — All 21

| IIM | Location | CAT Cutoff | Avg Package |
|-----|----------|-----------|-------------|
| IIM Ahmedabad | Ahmedabad | 99%+ | ₹35.22 LPA |
| IIM Bangalore | Bangalore | 99%+ | ₹34.88 LPA |
| IIM Calcutta | Kolkata | 99%+ | ₹34.23 LPA |
| IIM Lucknow | Lucknow | 97%+ | ₹32.3 LPA |
| IIM Kozhikode | Kozhikode | 96%+ | ₹28 LPA |
| IIM Indore | Indore | 97%+ | ₹25 LPA |
| IIM Shillong | Shillong | 95%+ | ₹22 LPA |
| IIM Rohtak | Rohtak | 93%+ | ₹18 LPA |
| IIM Raipur | Raipur | 92%+ | ₹17 LPA |
| IIM Ranchi | Ranchi | 92%+ | ₹17 LPA |
| IIM Trichy | Trichy | 93%+ | ₹19 LPA |
| IIM Udaipur | Udaipur | 90%+ | ₹17 LPA |
| IIM Kashipur | Kashipur | 88%+ | ₹15 LPA |
| Newer IIMs | Various | 85-90%+ | ₹12-15 LPA |

### Top Non-IIM Colleges Accepting CAT

| College | CAT Cutoff | Fees | Avg Package |
|---------|-----------|------|-------------|
| FMS Delhi | 98%+ | ₹2.43L | ₹34 LPA |
| MDI Gurgaon | 95%+ | ₹28.2L | ₹22 LPA |
| SPJIMR Mumbai | 95%+ | ₹26.5L | ₹27 LPA |
| IIFT Delhi | 93%+ | ₹21.9L | ₹20 LPA |
| IMT Ghaziabad | 88%+ | ₹21L | ₹12 LPA |
| TAPMI Manipal | 85%+ | ₹17.3L | ₹11 LPA |
| Great Lakes Chennai | 80%+ | ₹17L | ₹12 LPA |
| FORE Delhi | 88%+ | ₹22L | ₹10 LPA |
| GIM Goa | 85%+ | ₹19L | ₹10 LPA |

## Common Mistakes CAT Aspirants Make

| Mistake | Why It Hurts | What To Do Instead |
|---------|-------------|-------------------|
| Starting mocks too late | No time to fix weaknesses | Start mocks from Month 3 |
| Not analysing mocks | Learning nothing from each test | Spend 2x time analysing vs taking |
| Attempting all questions | Negative marking kills score | Skip uncertain MCQs |
| Ignoring TITA questions | Free marks left on table | Always attempt TITA |
| Changing strategy in November | Inconsistency under pressure | Freeze strategy by Oct 15 |
| Only reading business news for RC | Wrong passage type | Read The Economist, Aeon, philosophy |
| Rushing QA without shortcuts | Time wastage | Learn standard shortcuts for common types |
| Skipping DILR set selection practice | Wasting time on unsolvable sets | Practice 8-minute set scanning |

## After CAT — WAT PI Preparation

### IIM Selection Process After CAT

| Stage | What Happens | Weight (approx) |
|-------|-------------|----------------|
| CAT Score | Shortlisting threshold | 40-50% |
| Academic Record | 10th, 12th, Graduation % | 20-25% |
| Work Experience | Quality and relevance | 10-15% |
| Diversity | Gender, background, category | 5-10% |
| WAT | Written Ability Test (30 min essay) | 5-10% |
| PI | Personal Interview (20-30 min) | 20-30% |

> 💡 Getting a CAT call is only the beginning. At IIM Ahmedabad, conversion rate from call to admission is approximately 1 in 3. WAT-PI preparation is as important as CAT preparation.`

const FAQS = [
  { q:'What is the full form of CAT?', a:'CAT stands for Common Admission Test. It is India\'s most widely taken MBA entrance exam, conducted annually by the IIMs on a rotational basis.' },
  { q:'Who conducts CAT 2025?', a:'CAT 2025 will be conducted by one of the IIMs on a rotational basis. The conducting IIM for 2025 will be announced with the official notification on iimcat.ac.in.' },
  { q:'What is the CAT 2025 exam date?', a:'CAT is typically held on the last Sunday of November. CAT 2025 is expected in November 2025. The exact date will be announced with the official notification, typically released in July-August 2025.' },
  { q:'What is the eligibility for CAT 2025?', a:'Any graduate with minimum 50% marks (45% for SC/ST/PwD) from a recognised university is eligible. Final year students can also apply. There is no age limit and no restriction on number of attempts.' },
  { q:'How many times can I appear for CAT?', a:'There is no limit on CAT attempts. You can appear every year until you get your desired score. Many successful IIM students appear 2-3 times before converting.' },
  { q:'What is the CAT application fee?', a:'CAT application fee is Rs 2400 for General/EWS/OBC candidates and Rs 1200 for SC/ST/PwD candidates.' },
  { q:'What is the CAT exam pattern?', a:'CAT has 3 sections: VARC (24 questions, 40 min), DILR (20 questions, 40 min), QA (22 questions, 40 min). Total: ~66 questions, 120 minutes. Marking: +3 correct, -1 wrong MCQ, 0 wrong TITA.' },
  { q:'What is a TITA question in CAT?', a:'TITA stands for Type In The Answer. These are non-MCQ questions where you type the numerical answer. TITA questions have NO negative marking — always attempt them even if unsure.' },
  { q:'What is a good CAT score for IIM Ahmedabad?', a:'IIM Ahmedabad requires 99 percentile plus overall with minimum 85 percentile in each section for General category. Even at 99 percentile, admission depends on academics, work experience, diversity, and WAT-PI performance.' },
  { q:'What percentile is needed for IIM Bangalore?', a:'IIM Bangalore requires 99 percentile plus for General category. Sectional minimums are approximately 85 percentile in each section. The shortlisting also considers academic record and diversity profile.' },
  { q:'Can I get into IIM Lucknow with 97 percentile?', a:'Yes — IIM Lucknow\'s cutoff is approximately 97 percentile for General category. At exactly 97, you are competitive but your academic profile and diversity factors (female, non-engineer) significantly affect your actual chances of a call.' },
  { q:'What is CAT percentile vs score?', a:'CAT percentile is not your percentage of correct answers. It indicates what percentage of students scored below you. 90 percentile means you outperformed 90% of test takers. Percentile is calculated after normalisation across multiple slots.' },
  { q:'How does CAT normalisation work?', a:'CAT is conducted in multiple slots (morning, afternoon). Different slots may have different difficulty levels. Normalisation adjusts scores across slots so no slot is advantaged or disadvantaged. Your actual marks are converted to a scaled score before percentile calculation.' },
  { q:'How many students appear for CAT each year?', a:'Approximately 3.2 to 3.5 lakh students appear for CAT annually. Of these, roughly 40,000 to 50,000 receive IIM calls. Getting a call from an old IIM requires approximately 99 percentile, which is earned by roughly 3,500 to 4,000 students.' },
  { q:'Is CAT harder than GMAT?', a:'CAT and GMAT test different things. CAT DILR is considered harder than GMAT\'s reasoning section. GMAT Verbal is harder than CAT VARC for most Indian students. CAT is generally considered the harder exam for quantitative reasoning under time pressure.' },
  { q:'Should I take CAT and XAT both?', a:'Yes — absolutely. XAT is conducted in January, 2 months after CAT. XLRI Jamshedpur accepts only XAT. If your CAT score disappoints, XAT gives you a second chance to target XLRI and 150+ other colleges. Preparing for one largely prepares you for the other.' },
  { q:'Can a working professional crack CAT?', a:'Yes — many IIM students are working professionals. The advantage: work experience improves IIM shortlisting scores and diversity. The challenge: time management. 12-15 hours per week consistently over 8-10 months is the minimum for a working professional targeting 95+ percentile.' },
  { q:'Which is the best coaching for CAT?', a:'IMS and TIME are the two most recommended full-service coaching institutes. Career Launcher is strong in specific cities. However, many CAT toppers prepare entirely self-study using books, previous year papers, and mock series. Coaching is not mandatory — discipline and strategy are.' },
  { q:'How many mocks should I take before CAT?', a:'Most toppers take 20-30 full mocks in the final 3 months. More important than the number is mock quality analysis. Spend at least 2 hours analysing each mock — reviewing wrong answers, identifying patterns, and understanding selection errors. Analysis matters more than mock quantity.' },
  { q:'When should I start taking CAT mocks?', a:'Start sectional mocks from Month 3 of preparation. Start full mocks from Month 5-6. By October, take 2 full mocks per week. Freeze your exam strategy — section order, question selection approach — by October 15th and practice the same strategy consistently.' },
  { q:'What is the VARC syllabus for CAT?', a:'VARC has Reading Comprehension (4 passages, ~16-18 questions) and Verbal Ability (Para Jumbles, Para Summary, Odd Sentence Out — 6-8 questions). RC accounts for approximately 70% of VARC marks. Passages are academic — philosophy, economics, science, social theory.' },
  { q:'What is the DILR syllabus for CAT?', a:'DILR covers Data Interpretation (tables, bar charts, line graphs, pie charts, caselets) and Logical Reasoning (linear/circular arrangements, games and tournaments, blood relations, puzzles). Questions come in sets of 4-6. Set selection — choosing which sets to attempt — is the most important skill.' },
  { q:'What is the QA syllabus for CAT?', a:'QA covers Arithmetic (35-40%) — ratio, percentage, profit-loss, time-speed-distance; Algebra (20-25%) — equations, functions, progressions; Geometry (15-20%); Number System (10-15%); Modern Math (10-15%) — P&C, probability, sets. No calculus, matrices, or advanced mathematics.' },
  { q:'Is there a calculator allowed in CAT?', a:'No physical calculator is allowed. An on-screen basic calculator is provided in the exam but most toppers avoid using it due to time constraints. Mental calculation speed is important. Practice calculations without a calculator throughout your preparation.' },
  { q:'What books should I use for CAT QA?', a:'Quantitative Aptitude for CAT by Arun Sharma is the most comprehensive. Quantum CAT by Sarvesh Verma for harder practice. Start with Arun Sharma — it covers all topics systematically with increasing difficulty levels.' },
  { q:'What should I read to improve RC for CAT?', a:'Read The Economist, Aeon, Project Syndicate, and Hindu editorial daily. CAT passages are academic and intellectual — not business news. Reading philosophy, science, history, and social science builds the comprehension muscles needed for CAT RC. 30 minutes of quality reading daily is the minimum.' },
  { q:'How important is work experience for CAT and IIM admission?', a:'Work experience is not required for CAT eligibility. However, for IIM shortlisting it is a significant advantage. Most IIMs give bonus points for 12-36 months of work experience. The quality and relevance of experience matters — a year at McKinsey carries more weight than a year at an unknown firm.' },
  { q:'Do female candidates get relaxation in CAT cutoffs?', a:'CAT itself has no gender-based cutoffs. However, during IIM shortlisting, female candidates receive diversity bonus points that effectively lower the functional cutoff by 3-5 percentile. A female candidate at 95 percentile is shortlisted where a male candidate might need 98-99 percentile.' },
  { q:'Do non-engineers have an advantage in CAT?', a:'Non-engineers (commerce, arts, science backgrounds) receive diversity bonus during IIM shortlisting because they are significantly underrepresented in the MBA applicant pool. This effectively gives non-engineers a 3-4 percentile advantage in shortlisting — not in the CAT exam itself.' },
  { q:'Can SC/ST candidates get IIM admission with lower percentile?', a:'Yes. IIMs have reservation-based relaxed cutoffs for SC/ST candidates as per government policy. SC candidates typically need approximately 55-65 percentile and ST candidates approximately 50-60 percentile for old IIM calls. Exact cutoffs vary by IIM and change annually.' },
  { q:'What is WAT in IIM admission?', a:'WAT — Written Ability Test — is a 30-minute essay writing exercise conducted as part of the IIM selection process after CAT shortlisting. Candidates write 250-400 words on a current affairs or abstract topic. WAT assesses written communication, structure, and critical thinking.' },
  { q:'How should I prepare for IIM Personal Interview?', a:'Prepare your "tell me about yourself" narrative connecting past, present, and future. Research each IIM\'s specific culture and strengths. Be ready for deep questions on your graduation subject if you are an engineer. Practice mock interviews at least 10 times. Know your CV completely — every project, every role.' },
  { q:'What is the conversion rate from CAT call to IIM admission?', a:'At IIM Ahmedabad, approximately 1 in 3 shortlisted candidates receives a final admission offer. The conversion depends on WAT performance, PI performance, and how your profile compares to others in the same shortlist. WAT-PI preparation is critical.' },
  { q:'How long is my CAT scorecard valid?', a:'CAT scorecard is valid for one year. You must use your CAT 2025 score for applications in the 2025-26 admission cycle. Colleges do not accept previous year scores — you must appear fresh each year you want to apply.' },
  { q:'What happens if I miss the CAT exam day?', a:'There is no provision for a make-up exam. If you miss your scheduled slot for any reason — illness, technical issues — you lose that attempt. Ensure your admit card, required documents, and travel arrangements are confirmed well in advance.' },
  { q:'Can I change my CAT exam city after registration?', a:'IIM CAT typically allows exam city change during a specific window after registration. Check the official notification for the exact city change window. Your city is subject to availability — popular cities fill up faster.' },
  { q:'Which IIM should I target first?', a:'Target based on your profile, not just cutoff. If consulting is your goal, IIM Ahmedabad is the top choice. For finance, IIM Calcutta. For tech and startups, IIM Bangalore. For best ROI at lower fees, IIM Lucknow. For best value overall, FMS Delhi.' },
  { q:'Is it possible to crack CAT in 3 months?', a:'Yes — for students with a strong quantitative foundation who need to improve by 10-15 percentile. Reaching 99 percentile from scratch in 3 months is very difficult. A focused 3-month sprint works if you are already at 80-85 percentile and need to reach 90-95 percentile.' },
  { q:'What is the difference between CAT and GMAT for ISB?', a:'ISB Hyderabad accepts both CAT and GMAT. GMAT is the standard route for ISB — average GMAT of admitted students is approximately 720-730. CAT route is less common at ISB. For other IIMs, only CAT is accepted for the 2-year PGP. For ISB\'s 1-year program, GMAT is the primary route.' },
  { q:'How do I start CAT preparation from scratch?', a:'Start with QA concepts — Arithmetic first, then Algebra, then Geometry. Simultaneously build an RC reading habit — 30 minutes of quality reading daily. Begin DILR practice with simple arrangements and tables. Take your first full mock in Month 3-4 to identify weaknesses. Then build a targeted practice plan around your weak areas.' },
]

const TOC = [
  { id:'what-is-cat', label:'What is CAT?' },
  { id:'cat-2025-important-dates', label:'Important Dates 2025' },
  { id:'cat-eligibility-criteria-2025', label:'Eligibility Criteria' },
  { id:'cat-exam-pattern-2025', label:'Exam Pattern' },
  { id:'cat-syllabus-2025', label:'Syllabus' },
  { id:'cat-preparation-strategy-2025', label:'Preparation Strategy' },
  { id:'best-books-for-cat-2025', label:'Best Books' },
  { id:'colleges-accepting-cat-2025', label:'Colleges' },
  { id:'common-mistakes-cat-aspirants-make', label:'Common Mistakes' },
  { id:'after-cat-wat-pi-preparation', label:'After CAT — WAT PI' },
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
      <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'#1D9E75', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:16 }}>Quick Summary — CAT 2025</div>
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
      <p style={{ fontSize:13, color:'var(--muted)', marginBottom:20 }}>{faqs.length} questions answered about CAT 2025</p>
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

export default function CATGuide() {
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
            <span style={{ fontSize:12, color:'rgba(255,255,255,.4)', fontFamily:'var(--mono)' }}>CAT 2025</span>
          </div>
          <div style={{ display:'flex', alignItems:'flex-start', gap:20 }}>
            <span style={{ fontSize:40 }}>🏆</span>
            <div>
              <h1 style={{ fontFamily:'var(--serif)', fontSize:'clamp(1.8rem,3vw,2.6rem)', fontWeight:700, color:'#fff', marginBottom:8, lineHeight:1.1 }}>
                CAT Exam 2025 — The Complete Guide
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

      <div style={{ maxWidth:1100, margin:'0 auto', padding:'36px 32px 60px', display:'grid', gridTemplateColumns:'200px 1fr', gap:40, alignItems:'start' }}>
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

      <style>{`@media(max-width:768px){[style*="grid-template-columns: 200px"]{grid-template-columns:1fr!important}}`}</style>
    </div>
  )
}
