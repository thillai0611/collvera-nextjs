'use client'
import { useState } from 'react'
import Link from 'next/link'
import Nav from '../../../../components/Nav'
import LeadModal from '../../../../components/LeadModal'

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
  const isSOIL = slug === 'soil'
  const isGL   = slug === 'great-lakes-chennai'
  if (isGL) return (
    <>
      <H2>Great Lakes — All Programs Fee Summary</H2>
      <P>Great Lakes runs four programs across two campuses. The 1-year PGPM is for experienced professionals; the 2-year PGDM is open to freshers. PGDM fees are approximate — confirm with the admissions office before committing.</P>
      <T headers={['Program','Campus','Duration','Total Fees','Avg CTC 2025']} rows={[
        ['PGPM','Chennai','1 year','Rs 23.50 L','Rs 17.8 LPA'],
        ['PGPM','Gurgaon','1 year','Rs 21.66–24.10 L','Rs 15.1 LPA'],
        ['PGDM','Chennai','2 years','Rs 16–18 L (approx)','Rs 15 LPA'],
        ['PGDM','Gurgaon','2 years','Rs 14–16 L (approx)','Rs 11.8 LPA'],
      ]} />
      <H2>PGPM Chennai — Full Fee Breakdown (2026-27)</H2>
      <T headers={['Component','Amount (INR)','Notes']} rows={[
        ['Tuition Fee','Rs 12,43,000','Includes case studies, textbooks, online resources'],
        ['Program Fee','Rs 6,96,000','Academic and program-related charges'],
        ['Academic Subtotal','Rs 19,39,000',''],
        ['Accommodation (Single AC)','Rs 3,96,000','Mandatory residential; all vegetarian meals included'],
        ['Caution Deposit','Rs 10,000','Fully refundable at program end'],
        ['Alumni Subscription','Rs 5,000','Lifetime access to 15,000+ alumni network'],
        ['Total Fees','Rs 23,50,000','All-inclusive'],
      ]} />
      <H2>PGPM Gurgaon — Fee Breakdown</H2>
      <T headers={['Component','Amount (INR)','Notes']} rows={[
        ['Academic / Tuition Fees','Rs 18,08,000',''],
        ['Accommodation and Meals','Rs 3,43,000 – 5,92,000','Varies by room type chosen'],
        ['Refundable Deposit','Rs 10,000',''],
        ['Alumni Subscription','Rs 5,000',''],
        ['Total Program Cost','Rs 21,66,000 – 24,10,000','Range based on accommodation'],
      ]} />
      <H2>ROI — All 4 Programs</H2>
      <T headers={['Program','Fees','Avg CTC','Salary Multiplier','Payback (est.)']} rows={[
        ['PGPM Chennai','Rs 23.5L','Rs 17.8 LPA','~2.7x','~1.5 years'],
        ['PGPM Gurgaon','Rs 21.7–24.1L','Rs 15.1 LPA','~2.5x','~1.6 years'],
        ['PGDM Chennai','Rs 16–18L','Rs 15 LPA','—','~1.5–2 years'],
        ['PGDM Gurgaon','Rs 14–16L','Rs 11.8 LPA','—','~1.5–2 years'],
      ]} />
      <H2>Great Lakes vs Peer 1-Year Programs</H2>
      <T headers={['Program','Fees','Avg CTC','Work Exp','Accreditation']} rows={[
        ['Great Lakes PGPM Chennai','Rs 23.5L','Rs 17.8 LPA','2+ yrs','AACSB + AMBA'],
        ['Great Lakes PGPM Gurgaon','Rs 21.7–24.1L','Rs 15.1 LPA','2+ yrs','AACSB + AMBA'],
        ['ISB Hyderabad','Rs 42–45L','Rs 34+ LPA','3-5 yrs','AACSB + AMBA + EQUIS'],
        ['IIM-A PGPX','Rs 35L+','Rs 35+ LPA','5+ yrs','AACSB + AMBA + EQUIS'],
        ['SOIL PGPM','Rs 15L','Rs 12.3 LPA','2+ yrs','AICTE only'],
      ]} />
      <H2>Scholarships and Financial Aid</H2>
      <T headers={['Aid Type','Eligibility','Amount']} rows={[
        ['Merit Scholarship','Top academic performers and diverse backgrounds','Up to 20% off fees'],
        ['SBI Education Loan','All admitted students','Up to full tuition; ~8.5–10% p.a.'],
        ['HDFC Credila / Avanse','All admitted students','Full fees; 11–13% p.a.'],
      ]} />
    </>
  )
  if (isSOIL) return (
    <>
      <H2>SOIL Program Fees — Overview</H2>
      <P>SOIL runs three programs with different fee structures. The 1-year PGPM and PGPM-HR are approximately Rs 15 lakhs each. The 2-year PGDM at Manesar (SSOBD) is approximately Rs 17 lakhs. These are approximate — SOIL does not publish fees publicly. Contact admissions@soilindia.net or call 9654467153 for confirmed figures.</P>
      <T headers={['Program','Duration','Fees (Approx)','Campus','Intake']} rows={[
        ['PGPM','1 year','Rs 15 L','Gurugram (Sec 44)','~60 students'],
        ['PGPM-HR','1 year','Rs 15 L','Gurugram (Sec 44)','TBD'],
        ['PGDM (SSOBD)','2 years','Rs 17 L','Manesar','TBD'],
      ]} />
      <H2>SOIL ROI — 4-Year Track Record</H2>
      <T headers={['Batch','Avg CTC','Top 50% CTC','Highest CTC','Firms','ROI']} rows={[
        ['PGPM 2021–22','Rs 11 LPA','Rs 13.2 LPA','Rs 19 LPA','43','2.52x'],
        ['PGPM 2022–23','Rs 11.5 LPA','Rs 12.6 LPA','Rs 18.5 LPA','49','2.37x'],
        ['PGPM 2023–24','Rs 11.75 LPA','Rs 13.7 LPA','Rs 22 LPA','64','2.31x'],
        ['PGPM 2024–25','Rs 12.3 LPA','Rs 15.4 LPA','Rs 21.8 LPA','60','2.22x'],
      ]} />
      <H2>Fee Comparison — SOIL vs Peers</H2>
      <T headers={['Program','Type','Fees','Avg CTC','ROI']} rows={[
        ['SOIL PGPM','1-yr, experienced','Rs 15 L','Rs 12.3 LPA','2.22x'],
        ['SOIL PGDM','2-yr, fresher','Rs 17 L','Rs 11.17 LPA','—'],
        ['ISB Hyderabad','1-yr, experienced','Rs 43 L','Rs 34 LPA','~1.5x'],
        ['MDI Gurgaon','2-yr, fresher','Rs 23 L','Rs 22 LPA','—'],
        ['IMT Ghaziabad','2-yr, fresher','Rs 18 L','Rs 14 LPA','—'],
      ]} />
      <H2>Education Loans for SOIL Programs</H2>
      <T headers={['Lender','Max Loan','Interest Rate','Notes']} rows={[
        ['SBI','Up to Rs 20L','8.5–10%','Collateral-free up to Rs 20L; moratorium during program'],
        ['HDFC Credila','Up to Rs 40L','10.5–12%','Faster processing'],
        ['Avanse','Up to Rs 40L','11–13%','No upper cap with collateral'],
        ['Axis Bank','Up to Rs 20L','9–11%','Collateral-free available'],
      ]} />
    </>
  )

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
  const isSOIL = slug === 'soil'
  const isGL   = slug === 'great-lakes-chennai'
  if (isGL) return (
    <>
      <H2>Great Lakes Placements 2025 — All 4 Programs</H2>
      <P>PGDM Chennai produced the highest single offer at Rs 39.3 LPA — above PGPM Chennai's Rs 30.8 LPA. PGPM Chennai leads on average at Rs 17.8 LPA. PGDM programs serve freshers so averages are lower, but the Rs 39.3 LPA outlier shows strong top-of-class potential.</P>
      <T headers={['Program','Avg CTC','Top 10% Avg','Highest CTC']} rows={[
        ['PGPM Chennai','Rs 17.8 LPA','Rs 28.6 LPA','Rs 30.8 LPA'],
        ['PGPM Gurgaon','Rs 15.1 LPA','Rs 21.7 LPA','Rs 21.8 LPA'],
        ['PGDM Chennai','Rs 15 LPA','Rs 23.3 LPA','Rs 39.3 LPA'],
        ['PGDM Gurgaon','Rs 11.8 LPA','Rs 17.6 LPA','Rs 22.7 LPA'],
      ]} />
      <H2>PGPM Chennai — Function Breakdown</H2>
      <T headers={['Function','Share','Sample Roles']} rows={[
        ['Consulting','61%','Business Research Consultant, Business Value Architect, Decision Analytics Consultant'],
        ['Product Management','12%','Product Manager, Product Sales Manager'],
        ['Sales / Marketing / BD','10%','Marketing Manager, Pursuit Manager'],
        ['Operations / SCM / Logistics','7%','Retail Logistician, Project Manager'],
        ['Analytics and Data Science','7%','Pricing Analyst, Data Consultant'],
        ['General Management','2%','Manager'],
        ['Finance / Fintech','1%','Manager — Financial Planning and Analysis'],
      ]} />
      <H2>PGPM Gurgaon — Function Breakdown</H2>
      <T headers={['Function','Share']} rows={[
        ['Digital Consulting','29%'],['Analytics','21%'],['Digital Ops','14%'],
        ['Functional Consulting','13%'],['Enterprise Sales','8%'],['Others','15%'],
      ]} />
      <H2>PGDM Chennai — Function Breakdown</H2>
      <P>PGDM Chennai has a very different profile — Finance and Sales dominate at 65% combined vs PGPM's consulting-heavy 61%, reflecting the fresher pool targeting Finance and FMCG entry roles.</P>
      <T headers={['Function','Share']} rows={[
        ['Finance','33%'],['Sales and Marketing','32%'],['Tech Consulting','12%'],
        ['Operations','11%'],['Analytics','7%'],['Others','5%'],
      ]} />
      <H2>PGDM Gurgaon — Function Breakdown</H2>
      <T headers={['Function','Share']} rows={[
        ['Finance','28%'],['Sales and Marketing','24%'],['Tech Consulting','18%'],
        ['Analytics','14%'],['Operations','10%'],['Others','6%'],
      ]} />
      <H2>Key Recruiters — PGPM Chennai</H2>
      <T headers={['Company','Sector']} rows={[
        ['Accenture Strategy and Consulting (AIOC, ATCI, OPS, TFO)','Consulting'],
        ['Deloitte India / Deloitte USI','Consulting'],['KPMG','Consulting'],
        ['ZS Associates','Consulting / Analytics'],['Cognizant','IT / Consulting'],
        ['LTIMindtree','IT / Consulting'],['Tiger Analytics','Analytics'],
        ['IBM','Technology / Consulting'],['WNS','Operations / Analytics'],
        ['FedEx','Logistics'],['Swiggy','E-commerce'],['Kantar','Research / Analytics'],
      ]} />
      <H2>Key Recruiters — PGDM Chennai</H2>
      <T headers={['Company','Sector']} rows={[
        ['JP Morgan Chase','BFSI'],['Amazon','E-commerce'],['Cisco','Technology'],
        ['PayPal','Fintech'],['Wells Fargo','BFSI'],['MasterCard','Fintech'],
        ['Standard Chartered','BFSI'],['BNY Mellon','BFSI'],['ITC','FMCG'],
        ['Nestle','FMCG'],['Gartner','Research'],['EY India','Consulting'],
        ['Mahindra and Mahindra','Automotive'],['HDFC Life','Insurance'],
        ['Decathlon','Retail'],['Godrej','Conglomerate'],
      ]} />
    </>
  )
  if (isSOIL) return (
    <>
      <H2>SOIL PGPM Placements 2024–25</H2>
      <T headers={['Metric','2024–25','2023–24','2022–23','2021–22']} rows={[
        ['Average CTC','Rs 12.3 LPA','Rs 11.75 LPA','Rs 11.5 LPA','Rs 11 LPA'],
        ['Top 50% Avg CTC','Rs 15.4 LPA','Rs 13.7 LPA','Rs 12.6 LPA','Rs 13.2 LPA'],
        ['Highest CTC','Rs 21.8 LPA','Rs 22 LPA','Rs 18.5 LPA','Rs 19 LPA'],
        ['Firms Participating','60','64','49','43'],
        ['ROI (Post/Pre MBA)','2.22x','2.31x','2.37x','2.52x'],
        ['Placement Rate','100%','100%','100%','100%'],
      ]} />
      <H2>PGPM 2024–25 — Specialization Breakdown</H2>
      <T headers={['Specialization','Avg CTC','Highest CTC']} rows={[
        ['Marketing','Rs 13.54 LPA','Rs 21.42 LPA'],
        ['Analytics','Rs 13.27 LPA','Rs 21.81 LPA'],
        ['Finance','Rs 11.18 LPA','—'],
      ]} />
      <H2>SOIL PGDM Placements — 5-Year Trend</H2>
      <T headers={['Batch','Avg CTC','Median CTC','Highest CTC','Firms']} rows={[
        ['2020–22','Rs 9.7 LPA','Rs 9.8 LPA','Rs 20 LPA','61'],
        ['2021–23','Rs 10.3 LPA','Rs 10 LPA','Rs 19.3 LPA','49'],
        ['2022–24','Rs 10.75 LPA','Rs 10.5 LPA','Rs 27 LPA','84'],
        ['2023–25','Rs 11.17 LPA','Rs 10.9 LPA','Rs 20.7 LPA','130'],
        ['2024–26 (interim)','Rs 11.5 LPA','—','Rs 24 LPA','—'],
      ]} />
      <H2>PGPM-HR Placements 2024–25</H2>
      <T headers={['Metric','2024–25']} rows={[
        ['Highest CTC','Rs 20 LPA'],['Average CTC','Rs 11.2 LPA'],
        ['Top 50% Average','Rs 13.7 LPA'],['% Opted for Placements','98%'],
        ['Placement Rate (of those who opted)','100%'],
      ]} />
      <H2>Industry Distribution — PGPM</H2>
      <T headers={['Industry','Share']} rows={[
        ['IT and ITES','22%'],['BFSI','14%'],['Automotive','14%'],
        ['Consulting','10%'],['Insurance','8%'],['Others','32%'],
      ]} />
      <H2>Function Distribution — PGPM</H2>
      <T headers={['Function','Share']} rows={[
        ['Consulting','31%'],['Analytics','21%'],['Business Development','17%'],
        ['Marketing','16%'],['Finance','10%'],['HR','5%'],
      ]} />
      <H2>Top Recruiters — All Programs (Last 3 Years)</H2>
      <T headers={['Company','Sector']} rows={[
        ['BCG','Consulting'],['Deloitte','Consulting'],['Gartner','Research and Consulting'],
        ['PWC','Consulting'],['KPMG Global','Consulting'],['S&P Global','BFSI'],
        ['ANZ','BFSI'],['Berkshire Hathaway','BFSI'],['Tresvista','BFSI / Finance'],
        ['Microsoft','Technology'],['TCS','Technology'],['HCL','Technology'],
        ['Mahindra and Mahindra','Automotive'],['Hero MotoCorp','Automotive'],
        ['Royal Enfield','Automotive'],['Tata Communications','Telecom'],
        ['Zomato','E-commerce'],['Urban Company','Consumer Tech'],
      ]} />
    </>
  )

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
  const isSOIL = slug === 'soil'
  const isGL   = slug === 'great-lakes-chennai'
  if (isGL) return (
    <>
      <H2>PGPM vs PGDM — Eligibility at a Glance</H2>
      <T headers={['Requirement','PGPM (1-Year)','PGDM (2-Year)']} rows={[
        ['Education',"Bachelor's degree from recognised institution","Bachelor's degree from recognised institution"],
        ['Work Experience','Minimum 2 years by 30 April 2026 (mandatory)','Not required — freshers welcome'],
        ['Accepted Tests','GMAT / CAT / XAT / NMAT','CAT / XAT / GMAT / NMAT / CMAT'],
        ['Typical GMAT Range','550+ (profile-based; no hard cutoff)','500+ (profile-based)'],
        ['Typical CAT Range','80%+ (profile-based)','70%+ (profile-based)'],
        ['Application Fee','Rs 2,200 (non-refundable)','Rs 2,200 (non-refundable)'],
      ]} />
      <H2>Admissions Process — 11 Steps (All Programs)</H2>
      <T headers={['Step','Stage','What Happens']} rows={[
        ['1','Online Application','Apply at greatlakes.edu.in; pay Rs 2,200; select program and campus'],
        ['2','Campus / Program Selection','Choose Chennai, Gurgaon, or both; PGPM or PGDM via common form'],
        ['3','Initial Screening','Admissions team reviews profile for minimum fit'],
        ['4','AI Interview Invite','Shortlisted candidates receive AI interview link by email'],
        ['5','AI Interview','Asynchronous video interview completed online at your schedule'],
        ['6','PI Invite','AI interview passers receive Personal Interview invite'],
        ['7','Personal Interview','In-depth conversation on goals, experience, and leadership potential'],
        ['8','Offer Letters','Final shortlist receives formal offer by email'],
        ['9','Offer Acceptance','Accept and pay initial seat deposit'],
        ['10','Document Verification','Submit academic certificates and experience proof'],
        ['11','Orientation and Commencement','Report to campus; program begins'],
      ]} />
      <H2>PGPM Batch Profile 2025-26</H2>
      <T headers={['Attribute','Chennai','Gurgaon']} rows={[
        ['Avg Work Experience','3.2 years','3.1 years'],
        ['Average Age','25 years','25 years'],
        ['Female Students','24%','36%'],
        ['Work Exp Distribution','24-30m: 25% | 30-36m: 32% | 36-48m: 27% | 48+m: 16%','24-35m: 49% | 36-48m: 38% | 49-60m: 10% | 60+m: 3%'],
        ['Top Pre-MBA Background','IT/ITES 38%, BFSI 8%, Consulting 7%','IT/ITES 46%, BFSI 12%, Consulting 11%'],
      ]} />
      <H2>PGDM Batch Profile 2025-27</H2>
      <T headers={['Attribute','Chennai','Gurgaon']} rows={[
        ['Batch Size','368','~180–200'],
        ['Female Students','35%','44%'],
        ['Freshers %','66%','75%'],
        ['Average Age','22 years','22 years'],
        ['Work Exp Distribution','Freshers 66% | 1-12m: 13% | 13-23m: 15% | 24-35m: 6%','Freshers 75% | 1-12m: 10% | 13-23m: 10% | 24-35m: 5%'],
      ]} />
      <H2>Important Disclaimers</H2>
      <P>Great Lakes uses CAT scores only for screening — IIMs have no role in any Great Lakes program. XAT scores are used only for screening — XLRI has no role in any Great Lakes program. The PGPM awards a PGCM (Post Graduate Certificate in Management), not technically an MBA — though widely accepted by employers as equivalent. The PGDM is NBA-accredited and fully equivalent to an MBA for employment and higher education purposes.</P>
    </>
  )
  if (isSOIL) return (
    <>
      <H2>SOIL Admissions — 9-Step Process</H2>
      <P>SOIL's admissions is holistic — no CAT cutoff auto-qualifies or disqualifies. Academic record, test score, work experience, and personal interview are evaluated together. The psychometric assessment is unique among Indian B-schools and reflects SOIL's leadership development philosophy.</P>
      <T headers={['Step','Stage','What Happens']} rows={[
        ['1','Application Submission','Online form at soilindia.net with academic background, work history, and essays'],
        ['2','Application Screening','SOIL team reviews profile for minimum eligibility and program fit'],
        ['3','Shortlisting','Shortlisted candidates invited to interview stage based on overall profile'],
        ['4','Personal Interview','In-depth conversation: career goals, leadership experience, values, domain knowledge'],
        ['5','Group Discussion / Activity','Team exercise assessing collaboration, communication, and analytical thinking'],
        ['6','Psychometric Assessment','SOIL-specific assessment aligned with leadership development philosophy'],
        ['7','Offer of Admission','Successful candidates receive formal admission offer'],
        ['8','Acceptance and Fee Payment','Accept offer and pay seat deposit to confirm place'],
        ['9','Orientation','Immersive orientation week begins the program'],
      ]} />
      <H2>Eligibility by Program</H2>
      <T headers={['Program','Minimum Eligibility','Work Experience','Freshers?']} rows={[
        ['PGPM',"Bachelor's degree in any discipline","Minimum 2 years required",'No'],
        ['PGPM-HR',"Bachelor's degree in any discipline",'Preferred; not mandatory','Yes (24% in 2025 batch)'],
        ['PGDM (SSOBD)',"Bachelor's degree in any discipline",'Not required','Yes (76% in 2023–25 batch)'],
      ]} />
      <H2>Accepted Entrance Tests</H2>
      <T headers={['Test','Notes']} rows={[
        ['CAT','Most common; no minimum cutoff published'],
        ['GMAT','Common for PGPM applicants from corporate backgrounds'],
        ['XAT','Accepted for all three programs'],
        ['GRE','Accepted; less common'],
        ['SOIL Aptitude Test','Available for applicants without standard test scores'],
      ]} />
      <H2>PGPM Batch Profile 2024–25</H2>
      <T headers={['Attribute','2024–25 Data']} rows={[
        ['Batch Size','~60 students'],['Average Work Experience','44.1 months (3.7 years)'],
        ['Female %','29%'],['Engineering Background','62%'],
        ['Average Age','27 years'],['States Represented','17'],
      ]} />
      <H2>PGDM Batch Profile 2023–25</H2>
      <T headers={['Attribute','2023–25 Data']} rows={[
        ['Average Age','22.5 years'],['Female %','46%'],
        ['Freshers %','76%'],['States Represented','25'],
      ]} />
      <H2>PGPM-HR Batch Profile 2025</H2>
      <T headers={['Attribute','2025 Data']} rows={[
        ['Average Age','24.7 years'],['Female %','64%'],
        ['Freshers %','24%'],['Average Work Experience','23 months'],
      ]} />
    </>
  )

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
  const isSOIL = slug === 'soil'
  const isGL   = slug === 'great-lakes-chennai'
  if (isGL) return (
    <>
      <H2>Two Campuses, Four Programs</H2>
      <T headers={['Feature','Chennai','Gurgaon']} rows={[
        ['Established','2004 (Flagship)','2010'],
        ['Campus Size','32 acres — LEED Platinum','7.5 acres — modern'],
        ['Location','ECR Road, 40km from Chennai city centre','NH-8, 45km from IGI Airport, Delhi'],
        ['Programs','PGPM + PGDM','PGPM + PGDM'],
        ['PGPM Avg CTC','Rs 17.8 LPA','Rs 15.1 LPA'],
        ['PGDM Avg CTC','Rs 15 LPA','Rs 11.8 LPA'],
        ['NIRF 2025','#37','#50'],
        ['Top PGPM Role','Consulting (61%)','Digital Consulting (29%) + Analytics (21%)'],
        ['Top PGDM Role','Finance (33%)','Finance (28%)'],
        ['PGPM Specialisations','7 tracks','5 tracks'],
        ['PGDM Specialisations','5 tracks','6 tracks (incl. HR)'],
        ['Unique Feature','PGPM 2.0 curriculum; LEED Platinum','Spatial Reality Lab; Rutgers partnership; HR spec'],
      ]} />
      <H2>Chennai Campus — Details</H2>
      <P>The flagship campus on ECR Road is the first LEED Platinum Rated Green Campus in South Asia — 32 acres of green infrastructure. It is 40km south of Chennai and 9km from Mahabalipuram UNESCO heritage site. Smart classrooms, library, gym, football field, basketball court. Hostel is mandatory and fully air-conditioned. Night canteen open until 2:45 AM.</P>
      <H2>Gurgaon Campus — Details</H2>
      <P>The North India campus on NH-8 is 45km from IGI Airport, inside the Delhi-NCR corporate corridor. Features 3 hostel buildings, 2 academic blocks, a Spatial Reality Lab for immersive business simulations (unique in India), and seminar halls with modern AV. 24/7 housekeeping and high-speed Wi-Fi throughout.</P>
      <H2>Karma-Yoga — In All Programs</H2>
      <T headers={['Impact','Chennai','Gurgaon']} rows={[
        ['Villages / Schools','27+ panchayat villages','27 village schools, 32 Karmabhoomis'],
        ['Events per year','60+ village-level events','Regular community engagement'],
        ['Children reached','5,000+ in tuition / science clubs','2,500+ in educational activities'],
        ['People reached','10,000+ with medical attention','Community-wide development programs'],
      ]} />
      <H2>International Partners — All Programs</H2>
      <T headers={['Institution','Country','Type','Campus']} rows={[
        ['IESEG School of Management','France','Immersion + Exchange','Both'],
        ['University of Bordeaux','France','Dual Degree (4–6 weeks)','Both'],
        ['SKEMA Business School','France','Immersion','Chennai'],
        ['Frankfurt School of Finance','Germany','Immersion','Chennai'],
        ['HHL Leipzig Graduate School','Germany','Immersion','Both'],
        ['EDHEC Business School','France','Partner','Both'],
        ['Bologna Business School','Italy','Exchange','Both'],
        ['PACE University','USA','Exchange','Both'],
        ['Rutgers-Camden School of Business','USA','Exchange','Gurgaon only'],
        ['Ural Federal University','Russia','Exchange','Gurgaon only'],
        ['NUCB Business School','Japan','Partner','Chennai only'],
      ]} />
    </>
  )
  if (isSOIL) return (
    <>
      <H2>SOIL — Two Campuses</H2>
      <T headers={['Feature','Gurugram (Sector 44)','Manesar (SSOBD)']} rows={[
        ['Programs','PGPM, PGPM-HR','PGDM (2-Year)'],
        ['Address','Plot 76, Bhagwan Mahaveer Marg, Sec 44, Gurugram','Manesar, Haryana (IMT Manesar belt)'],
        ['Character','Heart of corporate capital; direct recruiter proximity','Industrial belt; Design Thinking pedagogy'],
        ['Campus Format','Fully residential — live-in format','Fully residential — live-in format'],
      ]} />
      <H2>Gurugram Location — The Real Advantage</H2>
      <P>Gurugram is India's outsourcing and corporate services capital. Gartner, S&P Global, Microsoft, American Express, ANZ, Deloitte, and dozens of other SOIL recruiters have their India headquarters within 10-15km of the campus. Company visits, pre-placement talks, and alumni meetups happen spontaneously in ways that are impossible from Ahmedabad, Kolkata, or even Bengaluru.</P>
      <H2>Industry Consortium — 30+ Co-Creating Companies</H2>
      <T headers={['Consortium Company','Sector']} rows={[
        ['ABB','Electrical Equipment'],['Anand Group','Automotive Components'],
        ['Aditya Birla Group','Diversified Conglomerate'],['Hero MotoCorp','Automotive'],
        ['Mahindra and Mahindra','Automotive / Tech'],['Schneider Electric','Energy Management'],
        ['S&P Global','BFSI / Data'],['Tata Communications','Telecom'],
        ['Exide Industries','Manufacturing'],['Gartner','Research and Consulting'],
      ]} />
      <H2>International Exchange Programs</H2>
      <T headers={['Partner','Country','Note']} rows={[
        ['IESE Business School','Spain','Top-10 global MBA; short-term exchange program'],
        ['Shizenkan University','Japan','Leadership and humanistic management focus'],
        ['FGV (EAESP)','Brazil',"Latin America's top business school"],
      ]} />
      <H2>Global Academic Associations</H2>
      <T headers={['Institution','Country','Partnership Type']} rows={[
        ['Politecnico di Milano (Polimi)','Italy','Academic partnership; Design Thinking curriculum link'],
        ['Royal Roads University','Canada','Academic partnership; leadership education'],
        ['CEDEP','Spain / France','Executive education consortium'],
        ['Shizenkan University','Japan','Academic + exchange'],
        ['Johannesburg Business School','South Africa','Academic partnership; emerging markets focus'],
      ]} />
    </>
  )

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
  const isSOIL = slug === 'soil'
  const isGL   = slug === 'great-lakes-chennai'
  if (isGL) return (
    <>
      <H2>Great Lakes Alumni Network</H2>
      <T headers={['Metric','Value']} rows={[
        ['Total Alumni','15,000+'],['Countries Represented','30+'],
        ['CxO and Leadership Roles','300+'],['Years of Alumni History','20+ (since 2004)'],
      ]} />
      <H2>Notable Alumni</H2>
      <T headers={['Name','Batch','Current Role']} rows={[
        ['Ramya Balakrishnan','2007','Global Director — Strategy and Ops, Meta (Facebook), USA'],
        ['Shobha Subramanian','2007','Lead Product Manager, Uber, USA'],
        ['Neha Kumar Saraf','2007','Sr. Director, Visa, Singapore'],
        ['Harsh Ratan Mehta','2010','Global Director, PepsiCo'],
        ['Aparna S','2010','Director and Business Lead, Bain Capability Network'],
        ['Ritesh Pal','2014','Director, Morgan Stanley, UK'],
        ['Divyansh Nasa','—','Partner — Transaction Strategy and Execution, EY-Parthenon'],
        ['Guneet Gyani','—','Senior Manager — Search and Commerce, Google'],
        ['Amisha Arora','—','Head — Ecommerce, East Asia, H&M'],
        ['Hemant Grover','PGPM 2013','Director of Technology, Xceedance'],
      ]} />
      <H2>Prominent Speakers Who Addressed Students</H2>
      <T headers={['Speaker','Association']} rows={[
        ['Late Dr. Ratan Tata','Chairman Emeritus, Tata Sons'],
        ['Dr. Srikant Datar','Dean, Harvard Business School'],
        ['Prof. Sunil Chopra','IBM Distinguished Professor, Kellogg School of Management'],
        ['Dr. Philip Kotler','Professor Emeritus of Marketing, Kellogg'],
        ['Indra Nooyi','Former Chairman and CEO, PepsiCo'],
        ['Kiran Mazumdar Shaw','Executive Chairperson, Biocon and Biocon Biologics'],
        ['Vijay Govindarajan','Coxe Distinguished Professor, Tuck School (Dartmouth)'],
        ['Dr. Preetha Reddy','Vice Chairperson, Apollo Hospitals'],
        ['Suresh Narayanan','Managing Director, Nestle India'],
      ]} />
      <H2>Faculty Profile</H2>
      <T headers={['Metric','Number']} rows={[
        ['Full-Time Faculty','50+'],['International Visiting Faculty','25+'],
        ['Academic and Industry Visiting Faculty','70+'],
        ['Thought Leader Talks (2024-25)','50+'],
        ['Industry Leaders Interacting with Students (2024-25)','100+'],
      ]} />
    </>
  )
  if (isSOIL) return (
    <>
      <H2>SOIL Alumni Network</H2>
      <T headers={['Metric','Value']} rows={[
        ['PGPM-HR Alumni','500+'],['Organizations Represented (PGPM-HR)','200+'],
        ['Total Alumni Across All Programs (est.)','2,000+'],['Years in Operation','16 years (since 2009)'],
      ]} />
      <H2>Notable Alumni — PGPM-HR</H2>
      <T headers={['Name','Current Role','Program']} rows={[
        ["Karen D'Souza",'VP HR, Goldman Sachs','PGPM-HR'],
        ['Sreya Raghavan','VP HR, Morgan Stanley','PGPM-HR'],
        ['Sundaram Vasudevan','VP HR, JP Morgan Chase','PGPM-HR'],
        ['Arpit Bhatia','Associate Director, KPMG Global','PGPM-HR'],
      ]} />
      <H2>SOIL Leadership</H2>
      <T headers={['Name','Role']} rows={[
        ['Anil Sachdev','Founder and Chairman — serial education entrepreneur; decades of HR and leadership consulting'],
        ['Sahil Sachdev','Board of Governors'],
        ['Dr. R. Srinivasan','Director, 2-Year PGDM (SSOBD, Manesar)'],
        ['Mohammad Salman','Director, Career Management Services'],
      ]} />
      <H2>Why SOIL HR Alumni Stand Out</H2>
      <P>SOIL PGPM-HR is India's only dedicated 1-year residential HR program. This means alumni carry a genuinely differentiated credential in the HR profession — not a generalist MBA with an HR elective, but a program designed entirely around HR practice with industry consortium inputs from Mahindra, Aditya Birla, Hero, and others. VP-level HR alumni at Goldman Sachs, Morgan Stanley, and JP Morgan Chase demonstrate consistent program quality.</P>
    </>
  )

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
  const isSOIL = slug === 'soil'
  const isGL   = slug === 'great-lakes-chennai'
  if (isGL) return (
    <>
      <H2>All Programs at a Glance</H2>
      <T headers={['Feature','PGPM Chennai','PGPM Gurgaon','PGDM Chennai','PGDM Gurgaon']} rows={[
        ['Duration','1 year (7 terms)','1 year (7 terms)','2 years (6 terms + internship)','2 years (6 terms + internship)'],
        ['For','Experienced professionals 2+ yrs','Experienced professionals 2+ yrs','Freshers and early career','Freshers and early career'],
        ['Degree','PGCM (AICTE)','PGCM (AICTE)','PGDM (AICTE + NBA)','PGDM (AICTE + NBA)'],
        ['Industry Exposure','Live Industry Projects','Live Industry Projects','60-90 day Summer Internship','60-90 day Summer Internship'],
        ['Total Fees','Rs 23.50 L','Rs 21.66–24.10 L','Rs 16–18 L (approx)','Rs 14–16 L (approx)'],
        ['Avg CTC 2025','Rs 17.8 LPA','Rs 15.1 LPA','Rs 15 LPA','Rs 11.8 LPA'],
        ['Highest CTC 2025','Rs 30.8 LPA','Rs 21.8 LPA','Rs 39.3 LPA','Rs 22.7 LPA'],
        ['Specialisations','7 tracks','5 tracks','5 tracks','6 tracks (incl. HR)'],
        ['NIRF 2025','#37','#50','#37','#50'],
      ]} />
      <H2>PGPM Chennai — 7 Specialisation Tracks</H2>
      <T headers={['Track','Type','Key Courses']} rows={[
        ['Finance','Functional','Corporate Valuation and M&A, Options and Derivatives, Fixed Income, FinTech, Financial Risk Analytics'],
        ['Marketing','Functional','Consumer Behaviour, Brand Management, Digital Marketing, B2B and B2C Sales, CRM'],
        ['Operations','Functional','Decision Science, Supply Chain, Project Management, Service Operations, Agile'],
        ['Consulting','Industry','Unstructured Problem Solving, Digital Transformation, Technology Consulting, Execution Excellence'],
        ['Product Management','Industry','Strategic Product Development, AI for PMs, Product Lab, Stakeholder Management, Tech Product Sales'],
        ['Data Science','Industry','Advanced Data Mining, NLP and Neural Networks, Computer Vision, GenAI Models Lab, Big Data'],
        ['Analytics','Industry','Advanced Data Mining, Predictive and Prescriptive Analytics, Time Series, Pricing Strategy'],
      ]} />
      <H2>PGPM Gurgaon — 5 Specialisation Tracks</H2>
      <T headers={['Track','Key Courses']} rows={[
        ['Analytics, AI and ML','Machine Learning I and II, Marketing Analytics, Web Analytics, Deep Learning, NLP, HR Analytics'],
        ['Digital Strategy','Digital Enterprise Strategy, ERP, Digital Marketing, FinTech, Design Thinking, Tech Product Mgmt'],
        ['Marketing','Retail Analytics, Brand Management, Consumer Behaviour, B2B Tech Sales, CRM, AR and Metaverse Marketing'],
        ['Finance','Security Analysis, M&A, Financial Modelling, FinTech, Micro Finance, Alternative Investments'],
        ['Operations','ERP, Project Management, Supply Chain Modelling, Service Operations, Strategic Sourcing'],
      ]} />
      <H2>PGDM Chennai — 5 Specialisation Tracks</H2>
      <T headers={['Track','Key Courses']} rows={[
        ['Marketing','Digital Marketing, Brand Management, Sales and Distribution, Retail Analytics, B2B, CRM, Services Marketing'],
        ['Finance','Financial Statement Analysis, Wealth Management, Security Analysis, FinTech, M&A, Derivatives, Banking'],
        ['Analytics','Business Intelligence, Machine Learning, Deep Learning and NLP, Financial Risk Analytics, HR Analytics'],
        ['Operations','ERP, Services Operations, Project Management, Supply Chain, Demand Planning and Forecasting'],
        ['OB and Strategy','Cross-listed electives in Organisational Behaviour, Strategy, and Leadership'],
      ]} />
      <H2>PGDM Gurgaon — 6 Specialisation Tracks</H2>
      <T headers={['Track','Key Courses']} rows={[
        ['Marketing','Digital Marketing, Brand Management, Sales and Distribution, Retail Analytics, B2B, CRM, IMC'],
        ['Finance','Financial Statement Analysis, Wealth Management, Security Analysis, FinTech, M&A, Project Finance'],
        ['Analytics','Machine Learning, Deep Learning, Web Analytics, Financial Risk Analytics, Big Data'],
        ['Operations','ERP, Services Operations, Project Management, Supply Chain, Demand Planning'],
        ['Human Resource','Talent Acquisition, Performance Management, Negotiation, Leadership, Compensation, HR Analytics'],
        ['Open Electives','Contemporary Pricing, Game Theory and Public Policy, Managing Business in Multicultural Contexts'],
      ]} />
      <H2>What Makes Great Lakes Distinctive</H2>
      <T headers={['Feature','Detail']} rows={[
        ['First 1-year MBA in India','Pioneered the format; now widely replicated by other schools'],
        ['First Analytics MBA in India','First to offer Analytics as a full-time MBA specialisation'],
        ['First AI and ML MBA in India','First to offer AI and Machine Learning as a full-time specialisation'],
        ['Karma-Yoga','Mandatory in all programs — unique rural leadership experience across 59+ villages'],
        ['LEED Platinum Campus','First LEED Platinum Rated Green Campus in South Asia (Chennai)'],
        ['AACSB + AMBA Dual Crown','Only ~7 Indian B-schools hold both — same as ISB, IIM A, IIM B'],
        ['Summer Internship (PGDM)','60-90 day mandatory internship; frequently leads to PPOs'],
        ['Dual Degree Option','Second triple-accredited MBA at Univ. of Bordeaux in 4-6 weeks post-program'],
        ['Spatial Reality Lab','Immersive business simulation technology (Gurgaon — unique in India)'],
      ]} />
    </>
  )
  if (isSOIL) return (
    <>
      <H2>SOIL Programs — Three Paths, One Philosophy</H2>
      <T headers={['Program','Duration','Fees','Campus','Intake','Eligibility']} rows={[
        ['PGPM','1 year','Rs 15 L (approx)','Gurugram Sec 44','~60','Min 2 yrs work experience'],
        ['PGPM-HR','1 year','Rs 15 L (approx)','Gurugram Sec 44','TBD','Work exp preferred; freshers considered'],
        ['PGDM (SSOBD)','2 years','Rs 17 L (approx)','Manesar','TBD','Freshers welcome; AICTE approved'],
      ]} />
      <H2>PGPM — Flagship 1-Year Program</H2>
      <T headers={['PGPM Detail','Information']} rows={[
        ['Duration','1 year, full-time residential'],
        ['Campus','Gurugram Sector 44'],
        ['Specializations','Finance, Marketing, Analytics'],
        ['Avg Work Experience (2025 batch)','44.1 months'],
        ['Avg CTC 2025','Rs 12.3 LPA'],
        ['Highest CTC 2025','Rs 21.8 LPA'],
        ['ROI 2025','2.22x post vs pre-MBA salary'],
        ['Firms Recruiting','60 (2025), 64 (2024), 49 (2023)'],
        ['Exchange Partners','IESE (Spain), Shizenkan (Japan), FGV (Brazil)'],
        ['Entrance Exam','CAT / GMAT / XAT / GRE / SOIL Aptitude Test'],
      ]} />
      <H2>PGPM-HR — India's Only 1-Year PGPM-HR</H2>
      <T headers={['PGPM-HR Detail','Information']} rows={[
        ['Duration','1 year, full-time residential'],
        ['Campus','Gurugram Sector 44'],
        ['Specialization','Human Resources (dedicated)'],
        ['Alumni Network','500+ alumni in 200+ organizations'],
        ['Avg CTC 2025','Rs 11.2 LPA'],
        ['Highest CTC 2025','Rs 20 LPA'],
        ['Unique Feature',"India's only dedicated 1-year PGPM-HR"],
        ['Curriculum','Foundational — Core HR — Specialization — Leadership — Experiential'],
      ]} />
      <H2>PGDM — SOIL School of Business Design (SSOBD)</H2>
      <T headers={['PGDM Detail','Information']} rows={[
        ['Duration','2 years, full-time residential'],
        ['Campus','Manesar (SSOBD)'],
        ['Approval','AICTE approved'],
        ['Specializations','Marketing, Finance, Analytics, HR'],
        ['Curriculum Focus','Business + Design Thinking + Liberal Arts'],
        ['Avg CTC 2023–25','Rs 11.17 LPA'],
        ['Highest CTC 2023–25','Rs 20.7 LPA (Finance)'],
        ['Firms 2023–25','130'],
        ['Summer Internship','40+ companies; Rs 80K/month highest stipend (2025-27 batch)'],
        ['Fresher Intake','76% freshers in 2023–25 batch'],
      ]} />
      <H2>Global Academic Partnerships</H2>
      <T headers={['Institution','Country','Type']} rows={[
        ['IESE Business School','Spain','Exchange (PGPM)'],
        ['Politecnico di Milano','Italy','Academic partnership'],
        ['Shizenkan University','Japan','Exchange + Academic partnership'],
        ['Royal Roads University','Canada','Academic partnership'],
        ['CEDEP','Spain / France','Executive education consortium'],
        ['FGV (EAESP)','Brazil','Exchange (PGPM)'],
        ['Johannesburg Business School','South Africa','Academic partnership'],
      ]} />
    </>
  )

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
  const isSOIL = slug === 'soil'
  const isGL   = slug === 'great-lakes-chennai'
  if (isGL) return (
    <>
      <H2>Great Lakes — Ratings by Aspect</H2>
      <T headers={['Aspect','Rating /5','Honest Comment']} rows={[
        ['PGPM Placements (Chennai)','4.3','Rs 17.8 LPA avg, 61% consulting — strongest non-IIM consulting track'],
        ['PGDM Placements (Chennai)','4.0','Rs 15 LPA avg with Rs 39.3 LPA highest — strong for a fresher program'],
        ['PGPM Placements (Gurgaon)','3.8','Rs 15.1 LPA avg, digital-heavy — solid for NCR but gap vs Chennai is real'],
        ['PGDM Placements (Gurgaon)','3.5','Rs 11.8 LPA avg — evaluate MDI and IMT before committing'],
        ['Academic Quality','4.1','PGPM 2.0 genuinely industry-designed; PGDM strong on Finance and Analytics'],
        ['Campus (Chennai)','4.4','LEED Platinum, 32 acres ECR Road — best campus among 1-year programs'],
        ['Campus (Gurgaon)','3.9','Smaller, functional; Spatial Reality Lab unique; NCR location is real advantage'],
        ['International Exposure','4.1','13 global partners; dual degree at Bordeaux is genuinely distinctive'],
        ['ROI (PGPM Chennai)','4.3','2.7x salary multiplier, 1.5 yr payback — strong for this fee level'],
        ['Karma-Yoga','4.6','Most unique feature in Indian B-school space — alumni repeatedly cite it'],
        ['Overall','4.1','Best value 1-year MBA (PGPM) and solid fresher PGDM outside top-15 bracket'],
      ]} />
      <H2>Student Voices</H2>
      <T headers={['Quote','Source']} rows={[
        ['"The 1-year format was intense but exactly what I needed. I went from IT services to a consulting role at Deloitte — that career switch happened because of Great Lakes."','PGPM Alumni, Chennai, 2024'],
        ['"Karma-Yoga sounds gimmicky from outside but it genuinely changes how you think about leadership. Most memorable part of the program."','PGDM Alumni, Gurgaon, 2023'],
        ['"The PGDM summer internship led directly to my PPO at ICICI Bank. That bridge from academics to corporate is what makes the 2-year format valuable."','PGDM Alumni, Chennai, 2024'],
      ]} />
      <H2>PGPM vs PGDM — Which to Choose?</H2>
      <T headers={['Factor','Choose PGPM','Choose PGDM']} rows={[
        ['Work Experience','You have 2+ years','You are a fresher or under 2 years exp'],
        ['Time Available','You can afford only 1 year away','You want structured 2-year learning'],
        ['Career Goal','Consulting, Product Mgmt switch','Finance, FMCG, Banking entry role'],
        ['Summer Internship','No internship — live projects instead','Mandatory 60-90 day internship; leads to PPOs'],
        ['Fees','Rs 23.5L (Chennai)','Rs 16-18L (Chennai — lower per year)'],
        ['Avg CTC','Rs 17.8 LPA (Chennai)','Rs 15 LPA (Chennai)'],
        ['Highest CTC','Rs 30.8 LPA (Chennai)','Rs 39.3 LPA (Chennai) — higher outlier'],
      ]} />
      <H2>Great Lakes vs Alternatives</H2>
      <T headers={['School','Program','Fees','Avg CTC','Best For']} rows={[
        ['Great Lakes Chennai','PGPM 1-yr','Rs 23.5L','Rs 17.8 LPA','IT switchers into consulting/product; AACSB+AMBA'],
        ['Great Lakes Gurgaon','PGPM 1-yr','Rs 21.7-24.1L','Rs 15.1 LPA','Digital/Analytics roles, NCR proximity'],
        ['Great Lakes Chennai','PGDM 2-yr','Rs 16-18L','Rs 15 LPA','Freshers targeting Finance/FMCG with summer internship'],
        ['ISB Hyderabad','PGP 1-yr','Rs 42-45L','Rs 34 LPA','Premium brand, 4-7 yr exp, global targets'],
        ['MDI Gurgaon','PGDM 2-yr','Rs 23L','Rs 22 LPA','NIRF ranked; Gurgaon; stronger avg salary for freshers'],
        ['IMT Ghaziabad','PGDM 2-yr','Rs 18L','Rs 14 LPA','Older brand, larger network, Delhi NCR'],
        ['SOIL PGPM','PGPM 1-yr','Rs 15L','Rs 12.3 LPA','Lower fees, values-driven, smaller batch'],
      ]} />
    </>
  )
  if (isSOIL) return (
    <>
      <H2>SOIL — Honest Assessment</H2>
      <T headers={['Aspect','Rating /5','Honest Comment']} rows={[
        ['Placements (BFSI, consulting, automotive)','4.0','Strong for the fee level; 2x+ ROI consistent; not IIM-level salaries'],
        ['Academics and curriculum quality','4.2','Genuinely industry-aligned; Design Thinking in PGDM is distinctive'],
        ['Campus and facilities','4.0','Modern, residential; Gurugram location is a practical advantage'],
        ['ROI for fees paid','4.3','Best argument for SOIL; 2.22x–2.52x over 4 years'],
        ['Leadership development','4.5','The genuine differentiator; values-based education is real, not a tagline'],
        ['HR program (PGPM-HR)','4.6',"India's only 1-year PGPM-HR; VP-level alumni at Goldman, MS, JPM"],
        ['Brand recognition','3.0','Honest gap vs top-10 schools; matters less inside NCR corporates'],
        ['Overall','4.1','Strong choice for experienced professionals targeting NCR roles'],
      ]} />
      <H2>Student Voices</H2>
      <T headers={['Quote','Source']} rows={[
        ['"SOIL is genuinely different — the focus on values and leadership is not just talk, it is built into everything you do here."','PGPM Alumnus, 2024'],
        ['"The industry connections are real. Every project has an actual company behind it and people who care about the outcome."','PGPM-HR Alumnus, 2023'],
        ['"Gurugram location is a massive advantage — companies are literally next door and that shows in internship and placement quality."','PGDM Student, 2025'],
        ['"The small batch was initially a concern. But it meant every professor knew my name and every recruiter had a real conversation with us."','PGPM Alumnus, 2023'],
      ]} />
      <H2>SOIL vs Alternatives</H2>
      <T headers={['School','Fees','Avg CTC','NIRF Rank','Best For']} rows={[
        ['SOIL PGPM','Rs 15 L','Rs 12.3 LPA','Not ranked','ROI, HR, experienced professionals, NCR'],
        ['MDI Gurgaon','Rs 23 L','Rs 22 LPA','#14','Strong brand, NIRF ranked, Gurgaon'],
        ['IMT Ghaziabad','Rs 18 L','Rs 14 LPA','~#25','Larger alumni network, older brand'],
        ['Great Lakes Chennai PGPM','Rs 23.5 L','Rs 17.8 LPA','#37','AACSB+AMBA, consulting track, 1-yr'],
        ['ISB Hyderabad','Rs 43 L','Rs 34 LPA','#2','Top brand, global rankings, 5+ yrs exp'],
      ]} />
    </>
  )

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

export default function CollegeSectionClient({ slug, section }) {
  const [leadOpen, setLeadOpen] = useState(false)
  const basePath = `/colleges/${slug}`
  const isB    = slug === 'iim-bangalore'
  const isSOIL = slug === 'soil'
  const isGL   = slug === 'great-lakes-chennai'
  const collegeName = isGL ? 'Great Lakes Institute of Management' : isSOIL ? 'SOIL Institute of Management' : isB ? 'IIM Bangalore' : 'IIM Ahmedabad'
  const accentColor  = isGL ? '#1a3a6b' : isSOIL ? '#1b6b3a' : isB ? '#C0392B' : 'var(--orange)'
  const accentBg     = isGL ? 'rgba(26,58,107,.08)' : isSOIL ? 'rgba(27,107,58,.08)' : isB ? '#fdecea' : 'var(--orange-lt)'
  const accentBorder = isGL ? 'rgba(26,58,107,.2)' : isSOIL ? 'rgba(27,107,58,.2)' : isB ? 'rgba(192,57,43,.15)' : 'rgba(217,95,2,.15)'

  const METAS = {
    fees:       { title:`${collegeName} Fees 2025 — Complete Guide`, sub: isGL ? 'PGPM and PGDM fees, ROI analysis and education loans for all 4 programs' : isSOIL ? 'Program fees, ROI track record, living costs and education loans' : `Total cost, ROI, scholarships and education loans` },
    placements: { title:`${collegeName} Placements 2025 — Full Report`, sub: isGL ? 'PGPM and PGDM placement data — all 4 programs, sector breakdown and top recruiters' : isSOIL ? 'PGPM, PGPM-HR and PGDM placement data — 4-year trend, sectors and recruiters' : `Average package, sector breakdown, top recruiters and process` },
    admissions: { title:`${collegeName} Admission 2026 — Complete Guide`, sub: isGL ? 'PGPM and PGDM eligibility, 11-step process and batch profiles' : isSOIL ? '9-step process, eligibility, accepted tests and batch profiles for all 3 programs' : `CAT cutoff, shortlisting formula, PI process and batch profile` },
    reviews:    { title:`${collegeName} Reviews 2025 — Honest Assessment`, sub: isGL ? 'Ratings across all 4 programs, student quotes, PGPM vs PGDM comparison' : isSOIL ? 'Ratings, student quotes, honest pros and cons, comparison with peer programs' : `What students and alumni say about academics, placements and campus life` },
    campus:     { title:`${collegeName} Campus — Complete Guide`, sub: isGL ? 'Chennai and Gurgaon campuses, Karma-Yoga, 13 global partners and international immersion' : isSOIL ? 'Gurugram + Manesar campuses, industry consortium, international exchange and global partners' : isB ? 'Bengaluru location, international exchange, NSRCEL and student life' : 'Louis Kahn architecture, hostels, clubs and Ahmedabad life' },
    alumni:     { title:`${collegeName} Notable Alumni`, sub: isGL ? '15,000+ alumni in 30+ countries — Meta, Uber, Visa, PepsiCo, Morgan Stanley, Google' : isSOIL ? 'PGPM-HR alumni at Goldman Sachs, Morgan Stanley, JP Morgan and KPMG' : `Leaders, founders and public figures from ${collegeName}` },
    programs:   { title:`${collegeName} Programs 2025`, sub: isGL ? 'PGPM (1-yr) and PGDM (2-yr) at Chennai and Gurgaon — fees, specs and outcomes' : isSOIL ? 'PGPM (1-yr), PGPM-HR (1-yr), and PGDM (2-yr) — fees, eligibility and outcomes' : isB ? 'PGP MBA, PGPBA, EPGP, PGPEM and FPM' : 'PGP, PGPX, FABM, ePGP and FPM' },
  }

  const PAGES = { fees:FeesPage, placements:PlacementsPage, admissions:AdmissionsPage, reviews:ReviewsPage, campus:CampusPage, alumni:AlumniPage, programs:ProgramsPage }
  const Page = PAGES[section]
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
          <h1 style={{ fontFamily:'var(--serif)', fontSize:'clamp(1.9rem,3.5vw,2.5rem)', fontWeight:700, color:'var(--ink)', lineHeight:1.12, marginBottom:12 }}>{meta?.title}</h1>
          <p style={{ fontSize:15.5, color:'var(--muted)', lineHeight:1.75 }}>{meta?.sub}</p>
          <div style={{ height:3, width:56, background:accentColor, borderRadius:2, marginTop:18 }} />
        </div>
        <Page slug={slug} />
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
            <Link href={isGL ? '/compare?a=great-lakes-chennai&b=isb-hyderabad' : isSOIL ? '/compare?a=soil&b=mdi-gurgaon' : `/compare?a=${slug}&b=${isB?'iim-ahmedabad':'iim-bangalore'}`} style={{ background:'rgba(255,255,255,.07)', color:'rgba(255,255,255,.7)', padding:'12px 24px', borderRadius:10, fontSize:14, border:'1px solid rgba(255,255,255,.14)', textDecoration:'none' }}>
              {isGL ? 'Great Lakes vs ISB →' : isSOIL ? 'SOIL vs MDI Gurgaon →' : isB ? 'IIM B vs IIM A →' : 'IIM A vs IIM B →'}
            </Link>
          </div>
        </div>
      </div>
      <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)} />
      <style>{`@media(max-width:768px){ table{font-size:12px!important} th,td{padding:8px 10px!important} }`}</style>
    </div>
  )
}
