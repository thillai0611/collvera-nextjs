'use client'
import { useState } from 'react'
import Link from 'next/link'
import Nav from '../../../../components/Nav'
import LeadModal from '../../../../components/LeadModal'
import { COLLEGE_MAP } from '../../../../lib/colleges/index'

const SUB_PAGES = [
  { id:'overview',   label:'Overview',   href:'' },
  { id:'fees',       label:'Fees & ROI', href:'/fees' },
  { id:'placements', label:'Placements', href:'/placements' },
  { id:'admissions', label:'Admissions', href:'/admissions' },
  { id:'programs',   label:'Programs',   href:'/programs' },
  { id:'campus',     label:'Campus',     href:'/campus' },
  { id:'alumni',     label:'Alumni',     href:'/alumni' },
  { id:'reviews',    label:'Reviews',    href:'/reviews' },
]

function T({ headers, rows }) {
  return (
    <div style={{ overflowX:'auto', margin:'28px 0' }}>
      <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13.5 }}>
        <thead>
          <tr>{headers.map((h,i) => <th key={i} style={{ background:'var(--ink)', color:'#fff', padding:'12px 16px', textAlign:'left', fontFamily:'var(--mono)', fontSize:10.5, textTransform:'uppercase', letterSpacing:'.07em', fontWeight:500, whiteSpace:'nowrap' }}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row,ri) => (
            <tr key={ri} style={{ background:ri%2===0?'var(--white)':'var(--cream)' }}>
              {row.map((cell,ci) => <td key={ci} style={{ padding:'11px 16px', borderBottom:'1px solid var(--border2)', color:ci===0?'var(--ink)':'var(--ink2)', fontWeight:ci===0?500:400, lineHeight:1.6, verticalAlign:'top' }}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function P({ children }) { return <p style={{ fontSize:15.5, lineHeight:1.95, color:'var(--ink2)', marginBottom:22 }}>{children}</p> }
function H2({ children }) { return <h2 style={{ fontFamily:'var(--serif)', fontSize:'1.4rem', fontWeight:700, color:'var(--ink)', marginBottom:18, lineHeight:1.2, paddingBottom:14, borderBottom:'2px solid var(--border2)', marginTop:48 }}>{children}</h2> }

function FeesPage({ slug }) {
  const isB = slug === 'iim-bangalore'
  if (!isB) return (
    <>
      <H2>What the Rs 27.5 Lakh Fee Covers at IIM Ahmedabad</H2>
      <P>IIM Ahmedabad charges Rs 27.5 lakhs as total programme fees for the PGP 2025-27 batch. This covers tuition (Rs 20.1 lakhs) plus library, computing, sports, health, and alumni access fees (Rs 7.15 lakhs). It does not include mess charges of Rs 8,000-12,000 per month or personal expenses. Total cost of attendance over two years is realistically Rs 30-31 lakhs. Fees are disbursed across four semesters — structure your loan accordingly.</P>
      <T headers={['Fee Component','Amount (Rs)','Notes']} rows={[
        ['Tuition fee','20,10,000','Academic instruction, faculty, case materials'],
        ['Library, computing, sports, welfare','7,15,000','All non-tuition academic fees'],
        ['Total Programme Fee','27,50,000','Official quoted amount'],
        ['Mess charges (est. 2 years)','2,00,000','Rs 8,000-10,000/month'],
        ['Personal expenses (est. 2 years)','1,30,000','Rs 4,000-7,000/month'],
        ['Total Cost of Attendance','30,80,000','Use this for loan sizing'],
      ]} />
      <H2>IIM Ahmedabad Fee ROI</H2>
      <P>At Rs 35.22 LPA mean placement, take-home after tax is approximately Rs 1.88 lakhs/month. Fee recovery takes approximately 15 months. At BCG/Bain levels (Rs 45-55 LPA), recovery is under 11 months. Over 5 years, IIM A alumni in consulting reach Rs 60-90 LPA — making the investment highly efficient for this career track.</P>
      <T headers={['College','Fees','Avg Package','Fee Recovery']} rows={[
        ['FMS Delhi','Rs 2.43L','Rs 34 LPA','Under 2 months'],
        ['IIM Ahmedabad','Rs 27.5L','Rs 35.22 LPA','~15 months'],
        ['IIM Bangalore','Rs 26L','Rs 34.88 LPA','~14 months'],
        ['ISB Hyderabad','Rs 43L','Rs 34 LPA','~24 months'],
      ]} />
      <H2>Scholarships at IIM Ahmedabad</H2>
      <P>IIMA Need-Based Scholarship for income below Rs 15 LPA (Rs 1-5 lakhs). Government schemes for SC/ST and minorities. Alumni Endowment Fund up to Rs 3 lakhs. Apply September-October — not automatically awarded.</P>
      <T headers={['Scholarship','Eligibility','Amount']} rows={[
        ['IIMA Need-Based','Family income below Rs 15 LPA','Rs 1L-5L'],
        ['SC/ST Govt Scheme','SC/ST students','Rs 1,500/year'],
        ['PGP Alumni Endowment','Merit + need','Up to Rs 3,00,000'],
        ['GC Mital Entrepreneurship Aid','Startup interest','Varies'],
      ]} />
      <H2>Education Loans for IIM Ahmedabad</H2>
      <P>SBI Scholar Loan: up to Rs 40 lakhs at 8.5-9.5%, no collateral up to Rs 20 lakhs, moratorium covers 2 years + 12 months. Section 80E gives full interest deduction for 8 years — saves Rs 70,000-1,50,000/year at the 30% tax bracket.</P>
      <T headers={['Lender','Max','Rate','Collateral']} rows={[
        ['SBI Scholar Loan','Rs 40L','8.5-9.5%','No (up to Rs 20L)'],
        ['Bank of Baroda','Rs 30L','9-10%','No (up to Rs 20L)'],
        ['HDFC Credila','Rs 50L','10.5-12%','Flexible'],
        ['Avanse','Rs 50L','11-13%','Flexible'],
      ]} />
    </>
  )
  return (
    <>
      <H2>IIM Bangalore Fees 2025 — What Rs 26 Lakhs Covers</H2>
      <P>IIM Bangalore charges Rs 26,00,000 as total programme fees for the PGP 2025-27 batch. Unlike IIM Ahmedabad's separate hostel component, IIM B's fee explicitly includes hostel room rent and service charge alongside tuition, library, internet, case permission royalty, course material, medical insurance, personal accident insurance, and alumni activity. This makes the IIM B fee more all-inclusive than the stated IIM A fee.</P>
      <P>In addition to the programme fee, students pay a caution deposit of Rs 30,000 (one-time, refundable at programme end) and a mess advance of Rs 30,000 per term. Students in Year 2 have the option to live off-campus, reducing living costs if they find cheaper accommodation in Bengaluru. Total cost of attendance is Rs 30-32 lakhs over two years — Bengaluru's higher cost of living (Rs 15,000-25,000/month personal expenses) makes the gap with IIM A's lower Ahmedabad living costs narrower than the Rs 1.5 lakh fee difference suggests.</P>
      <T headers={['Fee Component','Amount (Rs)','Included']} rows={[
        ['Programme fees (2 years)','26,00,000','Tuition, library, internet, cases, hostel, insurance, alumni'],
        ['Caution deposit (one-time)','30,000','Refundable at programme end'],
        ['Mess advance (per term, 6 terms)','1,80,000','Approximately Rs 30,000 per trimester'],
        ['Total Fees + Deposits','28,10,000','Excluding personal expenses'],
        ['Personal expenses (est. 2 years)','2,00,000','Higher in Bengaluru; Rs 15,000-25,000/month'],
        ['Total Cost of Attendance','30,10,000','Realistic planning figure'],
      ]} />
      <H2>IIM Bangalore vs IIM Ahmedabad — Fee ROI Comparison</H2>
      <P>At Rs 34.88 LPA mean salary, IIM B's fee of Rs 26 lakhs is recovered in approximately 14 months. The median of Rs 32.61 LPA means median graduates recover fees in approximately 16 months. The Rs 2.27 lakh gap between mean and median at IIM B is wider than at IIM A (Rs 0.69 lakh gap), indicating more salary variance — the top placements are very high but the typical outcome is lower than the mean suggests.</P>
      <P>IIM B's 22 overseas placements versus IIM A's 2 changes the ROI calculation significantly for internationally-oriented candidates. International roles in Singapore, Dubai, and Western markets typically start at USD 80,000-120,000 (Rs 67-100 LPA at current rates) — dramatically higher than domestic Indian starting salaries. For candidates targeting international careers, IIM B's lower fee combined with better overseas placement access makes it the stronger ROI choice.</P>
      <T headers={['Metric','IIM Ahmedabad','IIM Bangalore']} rows={[
        ['Total fees','Rs 27.5L','Rs 26L'],
        ['Mean salary 2025','Rs 35.22 LPA','Rs 34.88 LPA'],
        ['Median salary 2025','Rs 34.53 LPA','Rs 32.61 LPA'],
        ['Fee recovery (mean)','~15 months','~14 months'],
        ['Overseas placements','2','22'],
        ['Bengaluru living premium','N/A','Rs 5,000-10,000/month higher'],
      ]} />
      <H2>Financial Aid and Scholarships at IIM Bangalore</H2>
      <P>IIM Bangalore's financial aid programme is more structured than IIM A's. Students with household income below Rs 8 LPA are eligible. The Financial Aid Committee uses a two-step evaluation — financial status scoring followed by faculty panel interaction — and awards graduated aid at 20%, 40%, 60%, 80%, or 100% of fees. This graduated structure means more students receive some aid at different levels, compared to IIM A's more binary scholarship approach.</P>
      <T headers={['Scholarship / Aid','Eligibility','Amount','Type']} rows={[
        ['Financial Aid Programme','Income below Rs 8 LPA','20%-100% of fees','Need-based (graduated)'],
        ['Aditya Birla Scholarship','Top performers Year 1 and 2','Rs 1,75,000/student','Merit-based'],
        ['OPJEMS Scholarship','Top 10 academic performers Year 2','Rs 1,50,000','Merit-based'],
        ['NTPC Scholarship','SC/ST/PwD Year 2','Rs 48,000/year','Category-based'],
        ['Ministry of Tribal Affairs (ST)','ST students Year 1','Full tuition','Govt scheme'],
        ['Ministry of Social Justice (SC)','Meritorious SC Year 1','Full tuition','Govt scheme'],
        ['Social Sector Scholarship','Graduates joining social sector','One-third fees/year for 3 years','Outcome-based'],
      ]} />
      <H2>Education Loans for IIM Bangalore Students</H2>
      <P>An IIM Bangalore offer letter has the same loan approval weight as IIM A. Nationalised banks offer up to Rs 20 lakhs unsecured. SBI Scholar Loan goes up to Rs 40 lakhs at 8.5-9.5% with a moratorium covering the full programme plus 12 months after. Private lenders process faster if you are near the admission deadline. Section 80E gives full interest deduction for 8 years.</P>
      <T headers={['Lender','Max','Rate','Collateral']} rows={[
        ['SBI Scholar Loan','Rs 40L','8.5-9.5%','No (up to Rs 20L)'],
        ['Bank of Baroda','Rs 30L','9-10%','No (up to Rs 20L)'],
        ['HDFC Credila','Rs 50L','10.5-12%','Flexible'],
        ['Avanse','Rs 50L','11-13%','Flexible'],
      ]} />
    </>
  )
}

function PlacementsPage({ slug }) {
  const isB = slug === 'iim-bangalore'
  if (!isB) return (
    <>
      <H2>IIM Ahmedabad Placements 2025 — Key Numbers</H2>
      <P>395 out of 406 eligible students placed (11 opted out). Mean Rs 35.22 LPA, median Rs 34.53 LPA — tight gap signals even distribution. Highest domestic Rs 1.10 crore. 178 companies, 122 PPOs accepted. 2 international offers. Consulting at 40% is the dominant sector with BCG making 35 offers — highest by any single firm at any Indian B-school.</P>
      <T headers={['Metric','2025','2024']} rows={[
        ['Mean salary','Rs 35.22 LPA','Rs 34.5 LPA'],
        ['Median salary','Rs 34.53 LPA','Rs 33.8 LPA'],
        ['Highest package','Rs 1.10 Crore','Rs 1.05 Crore'],
        ['Companies','178','188'],
        ['PPOs accepted','122','110'],
        ['International offers','2','3'],
      ]} />
      <H2>IIM Ahmedabad Sector Breakdown and Top Recruiters 2025</H2>
      <T headers={['Sector','Share','Key Recruiters']} rows={[
        ['Consulting','40%','BCG (35), Accenture Strategy (31), Bain (17), McKinsey'],
        ['BFSI / PE / VC','25%','Goldman Sachs (9), Blackstone, General Atlantic, AmEx'],
        ['FMCG','15%','HUL, P&G, ITC, Marico, Dabur'],
        ['Technology','12%','Google, Amazon, Microsoft, Flipkart'],
        ['Others','8%','Manufacturing, healthcare, social sector'],
      ]} />
    </>
  )
  return (
    <>
      <H2>IIM Bangalore Final Placements 2025 — Complete Report</H2>
      <P>IIM Bangalore placed the PGP + PGPBA 2023-25 batch of 602 students with 660 offers from 177 companies. 208 Pre-Placement Offers were accepted — 34.5% of placed students had jobs before formal placements began. 89 lateral placement offers were accepted for experienced-hire roles. 22 overseas offers were made — the highest international placement count among IIMs and significantly more than IIM Ahmedabad's 2 overseas offers. 7 students opted out voluntarily.</P>
      <T headers={['Metric','2025 Data']} rows={[
        ['Total students','602 (PGP + PGPBA 2023-25)'],
        ['Total offers made','660'],
        ['Companies participated','177'],
        ['PPOs accepted','208 (34.5% of placed batch)'],
        ['Lateral offers accepted','89'],
        ['Overseas offers','22'],
        ['Mean salary','Rs 34.88 LPA'],
        ['Median salary','Rs 32.61 LPA'],
        ['Students opted out','7'],
      ]} />
      <H2>IIM Bangalore Placement 2025 — Sector Breakdown</H2>
      <P>Consulting leads at 41%. Technology is the major differentiator — IT/Analytics/PM at 13% plus Ecommerce/Payments/Telecom/Logistics at 12% gives 25% combined technology sector placements, significantly higher than IIM A's 12%. This technology strength directly reflects the Bengaluru location. FMCG at 6% is lower than IIM A's 15% — candidates targeting HUL, P&G, or ITC brand management will find a stronger track record at IIM A.</P>
      <T headers={['Sector','Share','Key Recruiters']} rows={[
        ['Consulting','41%','Accenture Strategy (75), BCG (25), TCS MC (24), Bain (17), McKinsey (14)'],
        ['IT / Analytics / Product Mgmt','13%','Amazon (8), Google, Microsoft, tech startups'],
        ['Finance / Banking','13%','American Express (20), Goldman Sachs, JP Morgan, Kotak (6)'],
        ['Ecommerce / Payments / Logistics','12%','Zomato (8), Pine Labs (5), Delhivery, BrowserStack'],
        ['Manufacturing / Energy','6%','Tata Steel, Vedanta, JSW (6), Aditya Birla'],
        ['FMCG / Retail','6%','HUL (10), P&G (7), ITC (4), Asian Paints (4), Kraft Heinz (5)'],
        ['Conglomerates','4%','RPG (3), Tata Group'],
        ['Healthcare / Education','4%','EXL Services (5), Manipal, healthcare startups'],
      ]} />
      <H2>IIM Bangalore Top Recruiters 2025 — Final Placements</H2>
      <P>Accenture Strategy made 75 final placement offers — largest single recruiter at any Indian B-school. Note: this concentration means approximately 12.5% of placed students go to one firm. BCG made 25 offers, TCS Management Consulting 24, American Express 20, Bain 17, PwC 16, EY Parthenon 15, McKinsey 14. Zomato with 8 offers and Pine Labs with 5 represent the technology-adjacent placements unique to IIM B. 22 overseas offers span Singapore, Dubai, Europe, and Southeast Asia.</P>
      <T headers={['Company','Offers','Type']} rows={[
        ['Accenture Strategy','75','Management Consulting'],
        ['Boston Consulting Group','25','Strategy Consulting'],
        ['TCS Management Consulting','24','Consulting'],
        ['American Express','20','Financial Services'],
        ['Bain & Company','17','Strategy Consulting'],
        ['PwC India','16','Consulting'],
        ['EY Parthenon India','15','Consulting'],
        ['McKinsey & Company','14','Strategy Consulting'],
        ['Zomato','8','E-commerce / Strategy'],
        ['Amazon','8','Technology / Business'],
        ['Kotak Mahindra Bank','6','Banking'],
        ['Goldman Sachs','Top 10','Investment Banking'],
      ]} />
    </>
  )
}

function AdmissionsPage({ slug }) {
  const isB = slug === 'iim-bangalore'
  if (!isB) return (
    <>
      <H2>IIM Ahmedabad CAT Cutoff 2025</H2>
      <P>Minimum qualifying cutoff: 80%ile overall, 70%ile sectional (General). Realistic shortlisting: 98.5-99.5%ile for General male engineers. Sectional minimum of 85%ile is a hard filter — 99.8 overall with 82 in DILR = rejected. Female non-engineers with 96%ile may outrank male engineers at 98%ile due to diversity bonus.</P>
      <T headers={['Category','Min Overall','Sectional Min','Realistic PI Call']} rows={[
        ['General (Male, Engineering)','80%ile','70%ile','98.5-99.5%ile'],
        ['General (Female)','80%ile','70%ile','96-98%ile'],
        ['OBC-NCL','75%ile','75%ile','93-96%ile'],
        ['SC','75%ile','75%ile','85-92%ile'],
        ['ST','75%ile','75%ile','80-88%ile'],
      ]} />
      <H2>IIM Ahmedabad Selection Formula</H2>
      <P>Composite Score = CAT (65%) + Application Rating (35%). AR = academics (normalised by stream/category) + work exp (0.20 x months-11, capped at 36 months) + 3 fixed points for non-male. Final: PI 50%, CAT 25%, AR 15%, AWT 10%.</P>
      <T headers={['Stage','Component','Weight']} rows={[
        ['Shortlisting','CAT Score','65%'],
        ['Shortlisting','Application Rating (AR)','35%'],
        ['Final','Personal Interview','50%'],
        ['Final','CAT Score','25%'],
        ['Final','Application Rating','15%'],
        ['Final','AWT','10%'],
      ]} />
      <H2>IIM Ahmedabad Batch Profile 2025-27</H2>
      <T headers={['Attribute','2025-27']} rows={[
        ['Total','414 students'],
        ['Female','30.6%'],
        ['Engineering','50%'],
        ['With work experience','73%'],
        ['Average work experience','25 months'],
      ]} />
    </>
  )
  return (
    <>
      <H2>IIM Bangalore CAT Cutoff 2026 — Official Minimum Percentiles</H2>
      <P>IIM Bangalore publishes exact minimum cutoffs for each CAT section — more transparent than most IIMs. These are the thresholds for the first shortlist. Candidates actually called for interviews score significantly higher. Additionally, the raw score must be positive in all three sections — a zero or negative raw score in any section disqualifies regardless of aggregate percentile.</P>
      <T headers={['Category','VARC','DILR','QA','Aggregate']} rows={[
        ['General','80%ile','75%ile','75%ile','85%ile'],
        ['NC-OBC','70%ile','65%ile','65%ile','75%ile'],
        ['EWS','70%ile','65%ile','65%ile','75%ile'],
        ['SC','65%ile','60%ile','60%ile','70%ile'],
        ['ST','55%ile','55%ile','55%ile','65%ile'],
        ['PwD','50%ile','50%ile','50%ile','60%ile'],
      ]} />
      <H2>IIM Bangalore Pre-PI Shortlisting Formula</H2>
      <P>Pre-PI score out of 100: CAT 55 points (VARC 19, DILR 21, QA 15), Class 10 board 10 points, Class 12 board 10 points, Bachelor's degree 10 points, Work experience or professional course (CA/CS/ICWA) 10 points, Gender diversity 5 points. Work experience score = 10x/36 if months (x) between 0-36; capped at 10 if above 36 months. The 5-point gender diversity component is used only for shortlisting, not in final selection.</P>
      <T headers={['Pre-PI Component','Points','How Calculated']} rows={[
        ['CAT — VARC','19','Normalised verbal performance'],
        ['CAT — DILR','21','Normalised analytical performance'],
        ['CAT — QA','15','Normalised quantitative performance'],
        ['Class 10 marks','10','Normalised within board and category'],
        ['Class 12 marks','10','Normalised within stream and category'],
        ["Bachelor's degree","10",'Normalised within discipline'],
        ['Work experience (0-36 months)','Up to 10','10x/36; capped at 10 for 36+ months'],
        ['Gender diversity (non-male)','5','Fixed; shortlisting only, not in final'],
      ]} />
      <H2>IIM Bangalore Final Selection — Post-PI Weights</H2>
      <P>PI carries 40 points — the largest single component. WAT is 10 points. CAT drops to 25 points. Academics reduce to 5 points each. Work experience is 10 points multiplied by a quality score (0.25-2.0) from the interview panel — quality and relevance of experience matter beyond just duration.</P>
      <T headers={['Post-PI Component','Weight']} rows={[
        ['Personal Interview (PI)','40 points'],
        ['CAT Score','25 points'],
        ['Work Experience x Quality Score','10 points'],
        ['WAT (Written Ability Test)','10 points'],
        ['Class 10 + 12 + Bachelor\'s','15 points (5 each)'],
      ]} />
      <H2>IIM Bangalore Batch Profile 2025</H2>
      <T headers={['Attribute','2025 Data']} rows={[
        ['Total enrolled','544 students (PGP 480 + PGPBA 64)'],
        ['Female','204 (37.5%)'],
        ['Engineering background','383 (70.4%)'],
        ['Commerce background','94 (17.3%)'],
        ['No experience (freshers)','81 students'],
        ['13-24 months experience','135 students'],
        ['25-36 months experience','169 students (largest group)'],
        ['Professional qualification (CA/CS/ICWA)','22 students'],
      ]} />
    </>
  )
}

function CampusPage({ slug }) {
  const isB = slug === 'iim-bangalore'
  if (!isB) return (
    <>
      <H2>IIM Ahmedabad — Louis Kahn Campus</H2>
      <P>Designed by Louis I. Kahn in 1962, the 107-acre campus is a UNESCO-linked heritage site. Red-brick buildings with dramatic arched openings, thick load-bearing walls, and tearoom-centred dormitory floors (10 rooms per tearoom) designed to create informal learning communities. 27 dormitories house 740 students in single-occupancy rooms with TV, fridge, washing machine, Wi-Fi, and AC. Gujarat is a dry state — alcohol prohibited.</P>
      <T headers={['Feature','Detail']} rows={[
        ['Area','107 acres'],
        ['Architect','Louis I. Kahn, 1963-1974'],
        ['Heritage','AMC heritage site; Ahmedabad UNESCO World Heritage City'],
        ['Dormitories','27 blocks, 740 students, single occupancy'],
        ['Room amenities','TV, fridge, washing machine, Wi-Fi, AC'],
        ['Student clubs','50+ active clubs including FII (consulting, since 1978)'],
        ['Dry state','Gujarat prohibits alcohol; campus and city events are alcohol-free'],
      ]} />
    </>
  )
  return (
    <>
      <H2>IIM Bangalore Campus — Bengaluru Location Advantage</H2>
      <P>IIM Bangalore's campus is on Bannerghatta Road in southern Bengaluru — 12-15km from the city centre and 20km from Electronic City and Whitefield tech parks. This places it in India's startup and technology capital with spontaneous access to company visits, investor meetups, technology conferences, and founder talks that no other IIM location can provide. The green, lush 100-acre campus has a temperate Bengaluru climate year-round (15-30°C) — significantly more comfortable than Ahmedabad's extreme summers.</P>
      <H2>Off-Campus Living — IIM B's Unique Flexibility</H2>
      <P>Students in Year 2 can choose to live off-campus — a flexibility unique among IIMs. Off-campus apartments near Bannerghatta Road cost Rs 15,000-25,000/month. Students who take this option describe building urban professional habits — commuting, independent living, social life outside the campus bubble — that campus-only experiences do not provide. Most students stay on campus for community; the option is valued for those who want city exposure.</P>
      <H2>International Exposure at IIM Bangalore</H2>
      <P>IIM B collaborates with 95 international partner institutions across 30 countries. Over 200 MBA students go on exchange annually to 50 partner universities in 25 nations. 100+ international students come to IIM B from 32 partner schools. IIM B is the only Indian B-school in the Global Network for Advanced Management — a 32-school network convened by Yale. In 2024-25, 45 inbound and 203 outbound exchange students participated.</P>
      <T headers={['International Feature','Detail']} rows={[
        ['Partner universities','95 institutions in 30 countries'],
        ['Annual outbound exchange','200+ students to 50 universities in 25 nations'],
        ['Inbound exchange students','100+ from 32 schools'],
        ['Global Network (Yale GNAM)','Only Indian B-school member'],
        ['Dual degree partners','Bocconi Italy, ESCP, and others'],
        ['Overseas placements 2025','22 confirmed offers'],
        ['Alumni chapters abroad','Dubai, Singapore, Stockholm, Amsterdam, London, San Francisco'],
      ]} />
      <H2>NSRCEL — India's Top Campus Incubator</H2>
      <P>The N.S. Raghavan Centre for Entrepreneurial Learning (NSRCEL) is one of India's most prominent startup incubators and is physically located on the IIM B campus. NSRCEL has incubated 400+ startups and manages multiple cohorts annually across sectors. IIM B students have direct access to NSRCEL's mentor network, investor connections, and incubation programmes — making IIM B the strongest campus in India for entrepreneurship aspirants who want on-campus incubation support alongside an MBA.</P>
    </>
  )
}

function AlumniPage({ slug }) {
  const isB = slug === 'iim-bangalore'
  if (!isB) return (
    <>
      <H2>IIM Ahmedabad Notable Alumni</H2>
      <T headers={['Alumni','Batch','Known For']} rows={[
        ['Raghuram Rajan','PGP 1987','Former RBI Governor; Prof. University of Chicago Booth; Gold medalist'],
        ['Ajay Banga','Alumnus','President, World Bank; Former CEO Mastercard'],
        ['Sanjeev Bikhchandani','PGP 1989','Founder, Info Edge (Naukri.com, 99acres); first Indian internet IPO'],
        ['Deep Kalra','Alumnus','Founder, MakeMyTrip; NASDAQ listed'],
        ['Chetan Bhagat','PGP 1997','Bestselling author; Five Point Someone, 2 States'],
        ['C. K. Prahalad','PGP 1966','Bottom of Pyramid concept; Padma Shri; University of Michigan'],
        ['Mallika Sarabhai','PGP 1974','Padma Bhushan; classical dancer; Director Darpana Academy'],
        ['Prabhjeet Singh','PGP 2006','President, Uber India and South Asia'],
        ['Ashish Nanda','PGP 1983','Former Director IIMA; Former Prof. Harvard Law School'],
      ]} />
      <H2>The IIM A Network in Practice</H2>
      <P>IIM A's alumni network is densest in consulting, FMCG, and PE/VC leadership. The dormitory bond creates unusually durable relationships — alumni from the 1980s and 1990s maintain active professional relationships decades later. When reaching out to an IIM A alumnus, you are connecting through shared formative experience that creates warmth beyond typical professional networking.</P>
    </>
  )
  return (
    <>
      <H2>IIM Bangalore Notable Alumni — Technology and Entrepreneurship Leaders</H2>
      <P>IIM Bangalore's alumni have made their most distinctive mark in technology and entrepreneurship — directly reflecting the institution's Bengaluru location and its role in building India's technology industry. Where IIM A alumni dominate consulting and FMCG leadership, IIM B alumni are most prominent in technology founding, venture capital, and global corporate leadership in the technology sector.</P>
      <T headers={['Alumni','Known For','Impact']} rows={[
        ['Nandan Nilekani','Co-founder Infosys; Architect of Aadhaar','Built India\'s IT industry; Aadhaar serves 1.3B people; Padma Bhushan'],
        ['Kiran Mazumdar-Shaw','Founder, Biocon','India\'s largest biopharma; Padma Bhushan; pioneering woman founder from Rs 10,000 seed capital'],
        ['S. D. Shibulal','Co-founder and Former CEO, Infosys','Co-built India\'s second largest IT services company'],
        ['Aroon Purie','Founder, India Today Group','Built India\'s largest English magazine group'],
        ['T. V. Mohandas Pai','Former CFO Infosys; Chairman Manipal Group','Key figure in Infosys scaling; higher education transformation'],
        ['Anuradha Aggarwal','Director Marketing and Growth, Amazon India','Senior marketing leadership at global tech company'],
        ['Sanjeev Aggarwal','Co-founder, Helion Venture Partners','Pioneer of venture capital in India; early investor in multiple unicorns'],
        ['Anand Daniel','Partner, Accel Partners India','Early investor in Flipkart, Swiggy, and major Indian startups'],
        ['Sanjay Nayar','Founding Partner Sorin Investments; Former CEO KKR India','Built PE and alternative investment ecosystem in India'],
        ['Rashmi Bansal','Author, Stay Hungry Stay Foolish','Documented India\'s entrepreneurship ecosystem; influential startup writer'],
        ['Revathy Ashok','CEO B.PAC; Former MD Yahoo India','Technology leadership and civic impact in Bengaluru'],
      ]} />
      <H2>The IIM Bangalore Network — Technology and Startup Access</H2>
      <P>The IIM B alumni network is strongest in technology companies, venture capital, and the startup ecosystem — complementary to IIM A's consulting and FMCG strength. In Bengaluru specifically, the network is exceptionally accessible: thousands of IIM B alumni work at Google, Amazon, Flipkart, Zomato, and hundreds of startups within the city. Reaching an alumni for coffee, mentoring, or introductions is typically a week-long effort rather than a month-long one.</P>
      <P>For entrepreneurship, the IIM B alumni network provides specific advantages. Multiple prominent Indian VCs are IIM B alumni — Anand Daniel at Accel (early Flipkart, Swiggy), Sanjeev Aggarwal at Helion. NSRCEL alumni who have gone through the incubator form their own sub-network of IIM B founders who actively support each other. Alumni chapters in Dubai, Singapore, London, Amsterdam, Stockholm, and San Francisco create international professional access for graduates building global careers.</P>
    </>
  )
}

function ProgramsPage({ slug }) {
  const isB = slug === 'iim-bangalore'
  if (!isB) return (
    <>
      <H2>IIM Ahmedabad Programs 2025</H2>
      <T headers={['Program','Duration','Fees','Admission','Key Feature']} rows={[
        ['PGP (MBA)','2 years','Rs 27.5L','CAT (98-99%ile)','Flagship; Harvard case method; PGDM degree'],
        ['PGP-FABM','2 years','Rs 27.5L','CAT','Only tier-1 agri-business MBA in India'],
        ['PGPX (Executive)','1 year','Rs 35-37L','GMAT/GRE','FT ranked #31; min 4 years experience'],
        ['ePGP (Online)','2-3 years','Not disclosed','CAT','For working professionals'],
        ['FPM (PhD)','4-5 years','Fully funded','CAT/GMAT/GATE','Stipend Rs 42,000-50,000/month'],
      ]} />
    </>
  )
  return (
    <>
      <H2>IIM Bangalore PGP — Full MBA Degree</H2>
      <P>The PGP at IIM Bangalore leads to a full Master of Business Administration (MBA) degree — not a diploma. Under the IIM Act 2017, IIM B is authorised to grant MBA degrees with direct international recognition. This distinguishes IIM B from IIM Ahmedabad's PGDM (diploma equivalent to MBA) and IIM Calcutta's similar structure. For international career purposes, the MBA degree carries clearer credential recognition.</P>
      <P>The programme is two years, full-time, residential, with six trimesters. Year 1 is core courses; Year 2 is primarily electives with the option to go on exchange to 50+ partner universities worldwide. The 2025 enrolled batch of 544 students includes 480 PGP and 64 PGPBA students who share placement infrastructure. Faculty of 140+ members from global universities and industries provides a strong research-and-practice teaching combination.</P>
      <T headers={['PGP Detail','Information']} rows={[
        ['Degree awarded','Master of Business Administration (MBA) — full degree'],
        ['Duration','2 years, 6 trimesters, full-time residential'],
        ['Total fees (2025-27)','Rs 26,00,000 (all-inclusive including hostel)'],
        ['Enrolled 2025','544 students'],
        ['Faculty','140+ from global universities and industries'],
        ['Accreditation','EQUIS; Global Network for Advanced Management (Yale)'],
        ['Year 2 option','Exchange at 50+ partner universities in 25 countries'],
        ['Off-campus living','Permitted in Year 2; unique flexibility among IIMs'],
      ]} />
      <H2>IIM Bangalore PGPBA — Business Analytics MBA</H2>
      <P>The PGPBA is a 2-year MBA with an analytics focus — covering data science applications in management, machine learning for business decisions, and quantitative strategy. PGPBA participates jointly with PGP in placements, giving students access to all 177 companies and 660 offers from the combined batch. The programme creates a strong pathway to product management, analytics consulting, and data science leadership roles at technology companies.</P>
      <H2>IIM Bangalore EPGP — Executive MBA (FT Ranked #34 Globally)</H2>
      <P>The EPGP is IIM Bangalore's one-year full-time executive MBA, ranked #34 globally by Financial Times in 2026 — the highest global ranking of any Indian executive MBA. The 2024-25 batch of 82 students had 177 companies recruiting with mean salary Rs 35.5 LPA and median Rs 33.1 LPA. Consulting dominates EPGP placements at 44%, IT/Technology at 31%. Minimum 5 years work experience required; GMAT or CAT accepted for admission.</P>
      <T headers={['Program','Duration','Fees','Admission','Key Feature']} rows={[
        ['PGP (MBA)','2 years','Rs 26L','CAT (85%ile+ aggregate)','Full MBA degree; joint placement with PGPBA'],
        ['PGPBA (Analytics MBA)','2 years','Rs 26L','CAT','Analytics-focused MBA; product and data science placements'],
        ['EPGP (Executive MBA)','1 year','Rs 35L (est.)','GMAT/CAT + experience','FT ranked #34 globally; #1 India per FT'],
        ['PGPEM (Part-time Executive)','2 years','Rs 35L (est.)','GMAT','No residential requirement; working professionals'],
        ['FPM (PhD)','4-5 years','Fully funded + stipend','CAT/GMAT/GATE/NET','Academic career; faculty placements at IIMs and international schools'],
      ]} />
    </>
  )
}

function ReviewsPage({ slug }) {
  const isB = slug === 'iim-bangalore'
  if (!isB) return (
    <>
      <H2>IIM Ahmedabad — Honest Student Reviews</H2>
      <P>Year 1 is described as the hardest two years of most students' lives. The case method creates genuinely transformative discussions. Summer placement anxiety beginning in October Year 1 is universal. Louis Kahn campus and dormitory bonds are consistently cited as the most valued aspects. Gujarat dry state and Ahmedabad's corporate distance are the most cited limitations. Most alumni would choose IIM A again.</P>
      <T headers={['Aspect','Rating /5','Comment']} rows={[
        ['Placements (consulting, FMCG, PE)','4.9','Best in India for these sectors'],
        ['Academic quality','4.5','Transformative; uneven faculty'],
        ['Campus (Louis Kahn)','4.4','Heritage, genuinely special'],
        ['Community and dorm bonds','4.7','Exceptional; last decades'],
        ['Location (Ahmedabad)','3.2','Not corporate hub; dry state'],
        ['Work-life balance Year 1','2.5','Extreme; manageable Year 2'],
        ['International exposure','2.7','2 overseas offers in 2025'],
        ['Overall','4.5','Most alumni would choose IIM A again'],
      ]} />
    </>
  )
  return (
    <>
      <H2>IIM Bangalore — Bengaluru Location: The Real Differentiator</H2>
      <P>The most consistent positive in IIM B student reviews is the Bengaluru location. Students describe spontaneous access to startup events, technology company visits, investor meetups, and founder talks that simply do not exist at other IIM locations. Firms like Google, Amazon, Flipkart, and Zomato are not just recruiters — they are neighbours. Alumni who live and work in the city can visit campus with minimal logistics friction, creating a density of professional interaction that campus-only environments at Ahmedabad, Calcutta, or Lucknow cannot replicate.</P>
      <P>The off-campus Year 2 option is consistently mentioned as valuable. Students who live in Bengaluru apartments describe developing professional independence, urban navigation skills, and a social life that extends beyond the campus community — preparation for working life that residential-only campuses do not provide. Most students still choose to stay on campus for community; the option is valued by those who want city exposure.</P>
      <H2>IIM Bangalore — Academics and Placement Process</H2>
      <P>Academic pressure at IIM B is described as rigorous but less extreme than IIM A. The absence of IIM A's most aggressive forced-curve dynamics makes the collaborative learning environment somewhat more functional. Faculty with global research backgrounds are generally well-regarded; the analytics integration in courses reflects the Bengaluru technology ecosystem in ways that other IIMs have not matched.</P>
      <P>Summer placement anxiety exists at IIM B but is described as less overwhelming than at IIM A. The higher PPO rate (208 accepted in 2025 versus IIM A's 122), the longer placement window, and the Bengaluru networking context reduce the compressed anxiety of the IIM A experience. Students who do consulting or technology internships and receive PPOs describe Year 2 as genuinely enjoyable — a stark contrast to IIM A's sustained placement pressure.</P>
      <H2>IIM Bangalore — International Exposure Reviews</H2>
      <P>The 22 overseas placements and exchange programme are frequently described as genuine differentiators that students did not fully appreciate before joining. Students who go on exchange to European or American B-schools describe significant changes in global professional perspective — meeting MBA students from different educational systems, experiencing different business cultures, and building international professional networks. The GNAM membership gives access to courses at Yale, Bocconi, HEC Paris, and other elite schools during exchange terms.</P>
      <H2>IIM Bangalore — Is It Worth It? Honest Assessment</H2>
      <P>IIM B is clearly the right choice for technology and product management roles, international placements, entrepreneurship with access to India's best campus incubator, and consulting in a city with the strongest corporate networking density among all IIM locations.</P>
      <P>IIM B is worth reconsidering if you specifically want FMCG brand management (IIM A has stronger HUL and P&G relationships), PE/VC roles (IIM A's MBB pipeline feeds more naturally into private equity), or the intense dormitory community experience that defines IIM A. The wider mean-median salary gap at IIM B (Rs 2.27 lakhs vs Rs 0.69 lakhs at IIM A) suggests that median outcomes are lower — the floor is similar but the typical result depends more on which track you pursue.</P>
      <T headers={['Aspect','Rating /5','Honest Comment']} rows={[
        ['Placements (tech, consulting, international)','4.6','Strong; Accenture volume may overstate MBB depth'],
        ['International placements','4.7','Best among IIMs; 22 overseas vs IIM A\'s 2'],
        ['Bengaluru location advantage','4.8','Genuine differentiator; unmatched ecosystem access'],
        ['Academic quality','4.3','Rigorous; less extreme than IIM A'],
        ['Entrepreneurship ecosystem (NSRCEL)','4.8','Best campus incubator in India'],
        ['Work-life balance','3.2','Better than IIM A; still demanding'],
        ['FMCG placements specifically','3.4','Weaker than IIM A; HUL/P&G track is thinner'],
        ['Dormitory community culture','3.8','Good; less iconic than IIM A\'s Kahn buildings'],
        ['Fee value for money','4.4','Rs 26L for Rs 34.88 LPA mean; strong ROI'],
        ['Overall','4.4','Best choice for tech, international, startup careers'],
      ]} />
    </>
  )
}


// ── Generic structured pages for any college ─────────────────────────────────

function StatCard({ label, value, color }) {
  return (
    <div style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:12, padding:'16px 18px' }}>
      <div style={{ fontFamily:'var(--serif)', fontSize:'1.5rem', fontWeight:700, color: color || 'var(--ink)', marginBottom:4 }}>{value}</div>
      <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--mono)' }}>{label}</div>
    </div>
  )
}

function SectionCard({ title, children }) {
  return (
    <div style={{ background:'var(--white)', borderRadius:14, border:'1px solid var(--border)', padding:'22px 24px', marginBottom:20 }}>
      {title && <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:18 }}>{title}</div>}
      {children}
    </div>
  )
}

function GenericPlacements({ college }) {
  const p = college.placements
  const color = college.color || 'var(--orange)'
  return (
    <>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))', gap:10, marginBottom:20 }}>
        <StatCard label="Avg Package (PGPM)" value={`₹${p.avg_pgpm} LPA`} color={color} />
        <StatCard label="Avg Package (PGDM)" value={`₹${p.avg_pgdm} LPA`} color={color} />
        <StatCard label="Highest (PGPM)" value={`₹${p.highest_pgpm} LPA`} color="#d95f02" />
        <StatCard label="PPOs Accepted" value={p.ppo} color="var(--ink)" />
        <StatCard label="Placement Rate" value={`${p.rate}%`} color={color} />
        <StatCard label="Companies" value={p.companies} color="var(--ink)" />
      </div>
      {p.trend?.length > 0 && (
        <SectionCard title="3-Year Placement Trend">
          <T headers={['Year','Avg PGPM','Avg PGDM','Highest PGPM','PPOs']}
            rows={p.trend.map(t => [t.year, `₹${t.avg_pgpm} L`, `₹${t.avg_pgdm} L`, `₹${t.highest_pgpm} L`, t.ppo])} />
        </SectionCard>
      )}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:20 }} className="grid-2col">
        {p.percentile_pgpm?.length > 0 && (
          <SectionCard title="PGPM Salary Distribution 2025">
            {p.percentile_pgpm.map((r,i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'9px 0', borderBottom: i < p.percentile_pgpm.length-1 ? '1px solid var(--border2)':'none' }}>
                <span style={{ fontSize:13, color:'var(--ink2)' }}>{r.label}</span>
                <span style={{ fontFamily:'var(--mono)', fontWeight:700, color, fontSize:13 }}>₹{r.value} LPA</span>
              </div>
            ))}
          </SectionCard>
        )}
        {p.percentile_pgdm?.length > 0 && (
          <SectionCard title="PGDM Salary Distribution 2025">
            {p.percentile_pgdm.map((r,i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'9px 0', borderBottom: i < p.percentile_pgdm.length-1 ? '1px solid var(--border2)':'none' }}>
                <span style={{ fontSize:13, color:'var(--ink2)' }}>{r.label}</span>
                <span style={{ fontFamily:'var(--mono)', fontWeight:700, color, fontSize:13 }}>₹{r.value} LPA</span>
              </div>
            ))}
          </SectionCard>
        )}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:20 }} className="grid-2col">
        {p.sectors?.length > 0 && (
          <SectionCard title="Sector Breakdown">
            {p.sectors.map((s,i) => (
              <div key={i} style={{ marginBottom:14 }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginBottom:6 }}>
                  <span style={{ fontWeight:500 }}>{s.name}</span>
                  <span style={{ fontFamily:'var(--mono)', fontWeight:700, color:s.color }}>{s.pct}%</span>
                </div>
                <div style={{ height:7, background:'var(--cream2)', borderRadius:4, overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${s.pct}%`, background:s.color, borderRadius:4 }} />
                </div>
              </div>
            ))}
          </SectionCard>
        )}
        {p.recruiters?.length > 0 && (
          <SectionCard title="Top Recruiters">
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:8 }}>
              {p.recruiters.map((r,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 12px', background:'var(--cream)', borderRadius:8, border:'1px solid var(--border2)' }}>
                  <div style={{ width:8, height:8, borderRadius:'50%', flexShrink:0, background:
                    r.type==='BFSI' ? '#0057A8' :
                    r.type==='Consulting' ? '#d95f02' :
                    r.type==='Analytics' ? '#7b1fa2' : '#2e7d32' }} />
                  <div>
                    <div style={{ fontSize:12.5, fontWeight:600, color:'var(--ink)' }}>{r.name}</div>
                    <div style={{ fontSize:10.5, color:'var(--muted)', fontFamily:'var(--mono)' }}>{r.type}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:12, marginTop:14, flexWrap:'wrap' }}>
              {[...new Set(p.recruiters.map(r=>r.type))].map(type => (
                <div key={type} style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, color:'var(--muted)' }}>
                  <div style={{ width:8, height:8, borderRadius:'50%', background:
                    type==='BFSI' ? '#0057A8' :
                    type==='Consulting' ? '#d95f02' :
                    type==='Analytics' ? '#7b1fa2' : '#2e7d32' }} />
                  {type} ({p.recruiters.filter(r=>r.type===type).length})
                </div>
              ))}
            </div>
          </SectionCard>
        )}
      </div>

      {/* Eligibility CTA */}
      <div style={{ background:'linear-gradient(135deg,#0057A8,#185fa5)', borderRadius:14, padding:'24px 28px', marginBottom:20, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
        <div>
          <div style={{ fontSize:15, fontWeight:700, color:'#fff', marginBottom:4 }}>Will you get placed in BFSI or analytics?</div>
          <div style={{ fontSize:13, color:'rgba(255,255,255,.65)', lineHeight:1.5 }}>Check your real conversion chance at {college.short || college.name} based on your profile.</div>
        </div>
        <a href="/eligibility" style={{ background:'#fff', color:'#0057A8', padding:'11px 22px', borderRadius:10, fontSize:13.5, fontWeight:600, textDecoration:'none', flexShrink:0 }}>
          Check eligibility →
        </a>
      </div>
    </>
  )
}

function GenericFees({ college }) {
  const f = college.fees
  const color = college.color || 'var(--orange)'
  return (
    <>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:20 }} className="grid-2col">
        <SectionCard title="Fee Breakdown">
          {[
            { label:'PGDM Tuition', amount:`₹${f.tuition} L` },
            { label:'PGPM Tuition', amount:`₹${f.tuition_pgpm} L` },
            { label:'PGDM Total All-In', amount:`₹${f.total} L`, bold:true },
            { label:'PGPM Total All-In', amount:`₹${f.total_pgpm} L`, bold:true },
            { label:'Monthly Living', amount: f.living_monthly || '₹8,000\u201312,000' },
            { label:'Loan Available', amount: f.loan_max || 'Up to ₹50 L' },
            { label:'Loan Rate', amount: f.loan_rate || '9.5\u201312%' },
          ].map((r,i) => (
            <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderTop: i > 0 ? '1px solid var(--border2)':'none' }}>
              <div style={{ fontSize:13, color: r.bold ? 'var(--ink)':'var(--ink2)', fontWeight: r.bold ? 600:400 }}>{r.label}</div>
              <div style={{ fontFamily:'var(--mono)', fontSize:13, fontWeight: r.bold ? 700:500, color: r.bold ? color:'var(--ink)' }}>{r.amount}</div>
            </div>
          ))}
        </SectionCard>
        {f.scholarships?.length > 0 && (
          <SectionCard title="Scholarships Available">
            {f.scholarships.map((s,i) => (
              <div key={i} style={{ padding:'14px 0', borderTop: i > 0 ? '1px solid var(--border2)':'none' }}>
                <div style={{ fontSize:13, fontWeight:600, marginBottom:4 }}>{s.name}</div>
                <div style={{ fontSize:12, color:'var(--muted)', marginBottom:4 }}>{s.criteria}</div>
                <div style={{ fontSize:12, fontFamily:'var(--mono)', color }}>{s.amount}</div>
              </div>
            ))}
          </SectionCard>
        )}
      </div>
    </>
  )
}

function GenericAdmissions({ college }) {
  const a = college.admissions
  const color = college.color || 'var(--orange)'
  return (
    <>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:20 }} className="grid-2col">
        <SectionCard title="CAT Cutoffs (Realistic for Shortlisting)">
          <T headers={['Category','Min Qualifying','Realistic Shortlist']}
            rows={(a.cat_cutoffs || [
              { category:'General / EWS', min:`${a.cutoff_general}%ile`, realistic:`${a.cutoff_competitive}%ile` },
            ]).map(r => [r.category, r.min, <strong key={r.category} style={{color}}>{r.realistic}</strong>])} />
          <div style={{ marginTop:14, fontSize:11.5, color:'var(--muted)', lineHeight:1.65 }}>
            Sectional minimum: 50%ile in each CAT section. XAT 90%ile / GMAT {a.cutoff_gmat || 650}+ also accepted.
          </div>
        </SectionCard>
        <SectionCard title="How Selection Works">
          {a.shortlist_weights?.map((w,i) => (
            <div key={i} style={{ marginBottom:14 }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginBottom:6 }}>
                <span>{w.label}</span>
                <span style={{ fontFamily:'var(--mono)', fontWeight:700, color }}>{w.pct}%</span>
              </div>
              <div style={{ height:6, background:'var(--cream2)', borderRadius:3, overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${w.pct}%`, background:color, borderRadius:3 }} />
              </div>
            </div>
          ))}
        </SectionCard>
      </div>
      {a.batch && (
        <SectionCard title="Batch Profile — 2025">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:16 }}>
            {[
              { label:'Batch Size',      value:`${a.batch.size} students` },
              { label:'Female Students', value:`${a.batch.female}%` },
              { label:'Engineers',       value:`${a.batch.engineering}%` },
              { label:'With Work Exp',   value:`${a.batch.work_exp_pct}%` },
              { label:'Avg Work Exp',    value:`${a.batch.avg_work_months} months` },
            ].map((s,i) => (
              <div key={i} style={{ textAlign:'center', padding:'16px', background:'var(--cream)', borderRadius:10 }}>
                <div style={{ fontFamily:'var(--serif)', fontSize:'1.4rem', fontWeight:700, color:'var(--ink)', marginBottom:4 }}>{s.value}</div>
                <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--mono)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}
    </>
  )
}

function GenericCampus({ college }) {
  const c = college.campus
  const color = college.color || 'var(--orange)'
  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:20 }} className="grid-2col">
      <SectionCard title="Campus Facts">
        {[
          ['Area', c.area],
          ['Certification', c.green],
          ['Location', c.location],
          ['Distance from City', c.distance_from_city],
          ['Hostel Capacity', `${c.hostel_capacity} beds · ${c.hostel_blocks} blocks`],
          ['Room Type', c.hostel_type],
          ['Food', c.food],
          ['Student Clubs', c.clubs ? `${c.clubs}+ active clubs` : null],
        ].filter(([,v]) => v).map(([k,v]) => (
          <div key={k} style={{ display:'grid', gridTemplateColumns:'140px 1fr', gap:10, padding:'9px 0', borderBottom:'1px solid var(--border2)', alignItems:'start' }}>
            <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase' }}>{k}</div>
            <div style={{ fontSize:13, color:'var(--ink2)', lineHeight:1.5 }}>{v}</div>
          </div>
        ))}
      </SectionCard>
      {c.highlights?.length > 0 && (
        <SectionCard title="Life Highlights">
          {c.highlights.map((h,i) => (
            <div key={i} style={{ display:'flex', gap:10, marginBottom:12, alignItems:'flex-start' }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:color, flexShrink:0, marginTop:6 }} />
              <div style={{ fontSize:13, color:'var(--ink2)', lineHeight:1.6 }}>{h}</div>
            </div>
          ))}
        </SectionCard>
      )}
    </div>
  )
}

function GenericVerdict({ college }) {
  const v = college.verdict
  return (
    <>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }} className="grid-2col">
        <div style={{ background:'var(--teal-lt)', borderRadius:14, border:'1px solid rgba(15,110,86,.2)', padding:'22px 24px' }}>
          <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--teal)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:16 }}>Best For</div>
          {v.best_for?.map((b,i) => (
            <div key={i} style={{ display:'flex', gap:10, marginBottom:10, alignItems:'flex-start' }}>
              <span style={{ color:'var(--teal)', fontWeight:700, flexShrink:0 }}>✓</span>
              <div style={{ fontSize:13, color:'var(--ink2)', lineHeight:1.6 }}>{b}</div>
            </div>
          ))}
        </div>
        <div style={{ background:'#fdecea', borderRadius:14, border:'1px solid rgba(163,45,45,.15)', padding:'22px 24px' }}>
          <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'#a32d2d', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:16 }}>Watch Out For</div>
          {v.watch_out?.map((w,i) => (
            <div key={i} style={{ display:'flex', gap:10, marginBottom:10, alignItems:'flex-start' }}>
              <span style={{ color:'#a32d2d', fontWeight:700, flexShrink:0 }}>!</span>
              <div style={{ fontSize:13, color:'var(--ink2)', lineHeight:1.6 }}>{w}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:20 }} className="grid-2col">
        <div style={{ background:'var(--white)', borderRadius:14, border:'2px solid var(--teal)', padding:'20px 24px' }}>
          <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--teal)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:10 }}>Apply If</div>
          <p style={{ fontSize:14, color:'var(--ink2)', lineHeight:1.7, margin:0 }}>{v.apply_if}</p>
        </div>
        <div style={{ background:'var(--white)', borderRadius:14, border:'2px solid rgba(163,45,45,.3)', padding:'20px 24px' }}>
          <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'#a32d2d', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:10 }}>Skip If</div>
          <p style={{ fontSize:14, color:'var(--ink2)', lineHeight:1.7, margin:0 }}>{v.skip_if}</p>
        </div>
      </div>
    </>
  )
}

function GenericReviews({ college }) {
  const r = college.reviews
  const color = college.color || 'var(--orange)'
  return (
    <div style={{ display:'grid', gridTemplateColumns:'200px 1fr', gap:20, marginBottom:20 }} className="grid-reviews">
      <SectionCard>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontFamily:'var(--serif)', fontSize:'3rem', fontWeight:700, color:'var(--ink)', marginBottom:4 }}>{(r.overall ?? 0).toFixed(1)}</div>
          <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--mono)', marginBottom:20 }}>Overall · {r.total || 0} reviews</div>
          {[
            ['Placements', r.placements ?? r.breakdown?.placements],
            ['Faculty',    r.academics  ?? r.breakdown?.faculty],
            ['Campus',     r.campus     ?? r.breakdown?.campus_life],
            ['ROI',        r.roi        ?? r.breakdown?.roi],
          ].map(([label, val]) => val != null && (
            <div key={label} style={{ marginBottom:10 }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--muted)', marginBottom:4 }}>
                <span>{label}</span><span style={{ fontFamily:'var(--mono)' }}>{val?.toFixed(1)}</span>
              </div>
              <div style={{ height:4, background:'var(--cream2)', borderRadius:2, overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${((val||0)/5)*100}%`, background:'var(--orange)', borderRadius:2 }} />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {r.quotes?.map((q,i) => (
          <div key={i} style={{ background:'var(--white)', borderRadius:12, border:'1px solid var(--border)', padding:'18px 20px', borderLeft:`3px solid ${i%2===0?color:'var(--teal)'}` }}>
            <p style={{ fontSize:14, fontStyle:'italic', color:'var(--ink2)', lineHeight:1.7, margin:'0 0 10px 0' }}>"{q.text}"</p>
            <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--muted)' }}>— {q.source}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function GenericPrograms({ college }) {
  const color = college.color || 'var(--orange)'
  return (
    <SectionCard title="All Programmes — Fees, Duration & Eligibility">
      <T headers={['Program','Duration','Seats','Fees','Intake','Exam','Notes']}
        rows={(college.programs || []).map(p => [
          p.name, p.duration, p.seats || '—',
          p.fees, p.intake || '—', p.exam || '—', p.note || '—',
        ])} />
    </SectionCard>
  )
}

function GenericPage({ slug, section }) {
  const college = COLLEGE_MAP[slug]
  if (!college) return <P>Content coming soon.</P>

  const [openFaq, setOpenFaq] = useState(null)
  const color = college.color || 'var(--orange)'

  const Structured = {
    placements: () => <GenericPlacements college={college} />,
    fees:       () => <GenericFees college={college} />,
    admissions: () => <GenericAdmissions college={college} />,
    campus:     () => <GenericCampus college={college} />,
    verdict:    () => <GenericVerdict college={college} />,
    reviews:    () => <GenericReviews college={college} />,
    programs:   () => <GenericPrograms college={college} />,
  }[section]

  const content = college[section]?.content

  return (
    <>
      {Structured && <Structured />}
      {content && (
        <div dangerouslySetInnerHTML={{ __html: content }}
          style={{ marginTop:28, padding:'28px 32px', background:'var(--white)', border:'1px solid var(--border)', borderRadius:14, fontSize:15, lineHeight:1.9, color:'var(--ink2)' }} />
      )}
      {college.faqs?.length > 0 && ['placements','fees','admissions'].includes(section) && (
        <div style={{ marginTop:40 }}>
          <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.12em', marginBottom:16 }}>Frequently Asked Questions</div>
          <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
            {college.faqs.map((faq, i) => (
              <div key={i} style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:10, overflow:'hidden' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width:'100%', textAlign:'left', padding:'16px 20px', background:'none', border:'none', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', gap:16 }}>
                  <span style={{ fontSize:14, fontWeight:600, color:'var(--ink)', lineHeight:1.5 }}>{faq.q}</span>
                  <span style={{ fontSize:18, color, flexShrink:0, transition:'transform .2s', transform: openFaq === i ? 'rotate(45deg)':'none' }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding:'0 20px 18px', fontSize:14, color:'var(--ink2)', lineHeight:1.75, borderTop:'1px solid var(--border2)' }}>
                    <div style={{ paddingTop:14 }}>{faq.a}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}


export default function CollegeSectionClient({ slug, section }) {
  const [leadOpen, setLeadOpen] = useState(false)
  const basePath = `/colleges/${slug}`
  const isB = slug === 'iim-bangalore'
  const isIIM = slug === 'iim-ahmedabad' || slug === 'iim-bangalore'

  const collegeData = COLLEGE_MAP[slug]
  const collegeName = isIIM ? (isB ? 'IIM Bangalore' : 'IIM Ahmedabad') : (collegeData?.short || collegeData?.name || slug)
  const accentColor = isIIM ? (isB ? '#C0392B' : 'var(--orange)') : (collegeData?.color || 'var(--orange)')
  const accentBg    = isIIM ? (isB ? '#fdecea' : 'var(--orange-lt)') : 'var(--orange-lt)'
  const accentBorder= isIIM ? (isB ? 'rgba(192,57,43,.15)' : 'rgba(217,95,2,.15)') : 'rgba(217,95,2,.15)'

  const METAS = {
    fees:       { title:`${collegeName} Fees 2025 — Complete Guide`, sub:`Total cost, ROI, scholarships and education loans` },
    placements: { title:`${collegeName} Placements 2025 — Full Report`, sub:`Average package, sector breakdown, top recruiters and process` },
    admissions: { title:`${collegeName} Admission 2026 — Complete Guide`, sub:`CAT cutoff, shortlisting formula, PI process and batch profile` },
    reviews:    { title:`${collegeName} Reviews 2025 — Honest Student Feedback`, sub:`What students and alumni say about academics, placements and campus life` },
    campus:     { title:`${collegeName} Campus — Complete Guide`, sub: isIIM ? (isB ? 'Bengaluru location, international exchange, NSRCEL and student life' : 'Louis Kahn architecture, hostels, clubs and Ahmedabad life') : 'Infrastructure, hostels, faculty and student experience' },
    alumni:     { title:`${collegeName} Notable Alumni`, sub:`Leaders, founders and public figures from ${collegeName}` },
    programs:   { title:`${collegeName} Programs 2025`, sub: isIIM ? (isB ? 'PGP MBA, PGPBA, EPGP, PGPEM and FPM' : 'PGP, PGPX, FABM, ePGP and FPM') : 'All programmes — fees, duration, intake and eligibility' },
  }

  const IIM_PAGES = { fees:FeesPage, placements:PlacementsPage, admissions:AdmissionsPage, reviews:ReviewsPage, campus:CampusPage, alumni:AlumniPage, programs:ProgramsPage }
  const Page = isIIM ? IIM_PAGES[section] : GenericPage
  const meta = METAS[section]

  if (!Page) return (
    <div style={{ minHeight:'100vh' }}>
      <Nav onLeadOpen={() => setLeadOpen(true)} />
      <div style={{ maxWidth:700, margin:'80px auto', textAlign:'center', padding:'0 24px' }}>
        <h1 style={{ fontFamily:'var(--serif)', fontSize:'1.8rem', marginBottom:12 }}>Content Coming Soon</h1>
        <Link href={basePath} style={{ background:accentColor, color:'#fff', padding:'12px 24px', borderRadius:10, textDecoration:'none', fontSize:14 }}>Back to overview</Link>
      </div>
      <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)} />
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)' }}>
      <Nav onLeadOpen={() => setLeadOpen(true)} />
      <div style={{ background:'var(--ink)', borderBottom:'1px solid rgba(255,255,255,.07)' }}>
        <div style={{ maxWidth:960, margin:'0 auto', padding:'18px 24px 0' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16, flexWrap:'wrap' }}>
            <Link href="/colleges" style={{ color:'rgba(255,255,255,.3)', fontSize:11.5, fontFamily:'var(--mono)', textDecoration:'none' }}>Colleges</Link>
            <span style={{ color:'rgba(255,255,255,.2)' }}>›</span>
            <Link href={basePath} style={{ color:'rgba(255,255,255,.45)', fontSize:11.5, fontFamily:'var(--mono)', textDecoration:'none' }}>{collegeName}</Link>
            <span style={{ color:'rgba(255,255,255,.2)' }}>›</span>
            <span style={{ color:'#fff', fontSize:11.5, fontFamily:'var(--mono)' }}>{meta?.title?.split('—')[0]?.trim()}</span>
          </div>
          <div style={{ display:'flex', overflowX:'auto', scrollbarWidth:'none' }}>
            {SUB_PAGES.map(p => (
              <Link key={p.id} href={`${basePath}${p.href}`}
                style={{ padding:'11px 16px', fontSize:12.5, fontFamily:'var(--mono)', textDecoration:'none', color:p.id===section?'#fff':'rgba(255,255,255,.38)', borderBottom:p.id===section?`2px solid ${accentColor}`:'2px solid transparent', whiteSpace:'nowrap' }}>
                {p.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div style={{ maxWidth:960, margin:'0 auto', padding:'44px 24px 80px' }}>
        <div style={{ marginBottom:40 }}>
          <h1 style={{ fontFamily:'var(--serif-display)', fontSize:'clamp(1.9rem,3.5vw,2.5rem)', fontWeight:700, color:'var(--ink)', lineHeight:1.12, marginBottom:12 }}>{meta?.title}</h1>
          <p style={{ fontSize:15.5, color:'var(--muted)', lineHeight:1.75 }}>{meta?.sub}</p>
          <div style={{ height:3, width:56, background:accentColor, borderRadius:2, marginTop:18 }} />
        </div>
        <Page slug={slug} section={section} />
        <div style={{ background:'var(--white)', borderRadius:14, border:'1px solid var(--border)', padding:'24px', marginTop:48, marginBottom:24 }}>
          <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.12em', marginBottom:16 }}>More on {collegeName}</div>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            {SUB_PAGES.filter(p => p.id !== section && p.id !== 'overview').map(p => (
              <Link key={p.id} href={`${basePath}${p.href}`}
                style={{ fontSize:13, color:accentColor, textDecoration:'none', background:accentBg, padding:'8px 18px', borderRadius:20, border:`1px solid ${accentBorder}`, fontWeight:500 }}>{p.label} →</Link>
            ))}
            <Link href={basePath} style={{ fontSize:13, color:'var(--muted)', textDecoration:'none', background:'var(--cream)', padding:'8px 18px', borderRadius:20, border:'1px solid var(--border)', fontWeight:500 }}>← Overview</Link>
          </div>
        </div>
        <div style={{ background:'var(--ink)', borderRadius:16, padding:'32px', textAlign:'center' }}>
          <div style={{ fontFamily:'var(--serif)', fontSize:'1.25rem', fontWeight:700, color:'#fff', marginBottom:10 }}>Check if {collegeName} is right for your profile</div>
          <p style={{ fontSize:14, color:'rgba(255,255,255,.48)', marginBottom:22, maxWidth:480, margin:'0 auto 22px', lineHeight:1.8 }}>Enter your percentile and background. Claude shows your real conversion chance at {collegeName} and 20+ other colleges.</p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/eligibility" style={{ background:accentColor, color:'#fff', padding:'12px 24px', borderRadius:10, fontSize:14, fontWeight:600, textDecoration:'none' }}>Check my eligibility →</Link>
            <Link href={`/compare?a=${slug}&b=${isB?'iim-ahmedabad':'iim-bangalore'}`} style={{ background:'rgba(255,255,255,.07)', color:'rgba(255,255,255,.7)', padding:'12px 24px', borderRadius:10, fontSize:14, border:'1px solid rgba(255,255,255,.14)', textDecoration:'none' }}>
              {isB ? 'IIM B vs IIM A →' : 'IIM A vs IIM B →'}
            </Link>
          </div>
        </div>
      </div>
      <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)} />
      <style>{`@media(max-width:768px){ table{font-size:12px!important} th,td{padding:8px 10px!important} .grid-2col,.grid-reviews{grid-template-columns:1fr!important} }`}</style>
    </div>
  )
}
