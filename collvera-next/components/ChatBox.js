'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const SUGGESTIONS = [
  "IIM Ahmedabad fees and placements",
  "Colleges for 95 percentile CAT",
  "Is FMS better than IIM Lucknow?",
  "Best MBA for finance in India",
  "ISB vs IIM A — which to choose?",
  "CAT cutoff for MDI Gurgaon",
]

// Per-college pros, cons, verdict, most-asked
const COLLEGE_INTEL = {
  'iim-ahmedabad': {
    verdict: "India's #1 MBA for consulting and FMCG. Fees recover in under 10 months at average salary. The IIM A brand opens doors no other Indian B-school can match globally.",
    pros: ["Best consulting placements — BCG, McKinsey, Bain", "FMCG leadership — HUL, P&G, ITC", "Global career mobility, strongest alumni network"],
    cons: ["Extremely competitive — 99%+ and strong academics needed", "Ahmedabad — not a major metro city", "High-pressure, intense campus environment"],
    asked: ["Is 99 percentile enough for IIM A?", "IIM A vs IIM B for consulting", "What is the IIM A interview like?"]
  },
  'iim-bangalore': {
    verdict: "Best IIM for tech, startups, and product management. Bangalore location gives students direct access to India's Silicon Valley throughout the program.",
    pros: ["Best IIM for tech and startup careers", "Bangalore ecosystem — Amazon, Google, Flipkart recruit heavily", "Strong in analytics and product management"],
    cons: ["99%+ required — as competitive as IIM A", "Higher cost than IIM C despite similar placements", "Less strong than IIM A for pure consulting"],
    asked: ["IIM A vs IIM B — which is better?", "Is IIM B good for tech jobs?", "IIM B placement for engineers"]
  },
  'iim-calcutta': {
    verdict: "India's best MBA for investment banking and finance. Wall Street connections are stronger here than any other Indian B-school. The oldest IIM — 60+ years of legacy.",
    pros: ["Best for investment banking and PE", "Highest international package among all IIMs", "60-year alumni network in global finance"],
    cons: ["Kolkata location — far from Mumbai and Delhi corporate hubs", "Lower average package than IIM A and B", "Finance-heavy — less diverse sector placement"],
    asked: ["IIM C vs IIM A for finance?", "IIM Calcutta placement in investment banking", "Is Kolkata location a disadvantage?"]
  },
  'iim-lucknow': {
    verdict: "Best ROI among old IIMs. Same calibre as IIM C placements at ₹5L lower fees. Often overlooked — serious candidates should compare carefully before dismissing it.",
    pros: ["₹22L fees — most affordable old IIM", "Strong FMCG and consulting placements", "100% placement within 3 days — fastest among IIMs"],
    cons: ["97%+ CAT required — still very competitive", "Lucknow — tier 2 city, less corporate access", "Less global brand recognition than BLACKI top 3"],
    asked: ["FMS Delhi vs IIM Lucknow — which is better?", "Is IIM L worth it vs IIM K?", "IIM Lucknow placement for freshers"]
  },
  'fms-delhi': {
    verdict: "Unmatched ROI in Indian MBA. ₹2.43 lakh total fees for ₹34 LPA average placement — the math is extraordinary. Serious 98+ percentile scorers should evaluate this before IIM A.",
    pros: ["₹2.43L total fees — 11x cheaper than IIM A", "₹34 LPA avg package — comparable to IIM A", "Delhi location — best corporate access in India"],
    cons: ["98%+ CAT required — extremely selective", "Government institution — fewer campus amenities", "Less global brand recognition outside India"],
    asked: ["FMS Delhi vs IIM Lucknow fees comparison", "FMS placement vs IIM A", "Is FMS Delhi government or private?"]
  },
  'xlri-jamshedpur': {
    verdict: "India's undisputed #1 for HR careers. For BM students, strong consulting and FMCG outcomes. The XAT route means less competition from CAT-focused students.",
    pros: ["#1 HR MBA in India — no competition", "XAT route — separate from CAT pressure", "Beautiful campus, strong Jesuit values culture"],
    cons: ["Highest fees among non-ISB options at ₹28.5L", "Jamshedpur — remote location", "BM placements trail IIM L despite similar fees"],
    asked: ["XLRI BM vs XLRI HRM — which to choose?", "XLRI vs IIM Lucknow", "XAT cutoff for XLRI 2025"]
  },
  'isb-hyderabad': {
    verdict: "For working professionals with 4+ years experience, ISB is transformational. For freshers or candidates who can get into old IIMs — the ₹43L fee is hard to justify.",
    pros: ["Global FT Top 30 ranking", "1-year program — less opportunity cost", "Best for senior-level career transitions"],
    cons: ["₹43L fees — highest in India by far", "Requires GMAT 710+ and 2+ years experience", "Not suitable for freshers or recent graduates"],
    asked: ["ISB vs IIM A — which is better?", "Is ISB worth ₹43 lakhs?", "ISB GMAT cutoff 2025"]
  },
  'spjimr-mumbai': {
    verdict: "Best non-IIM MBA in Mumbai for quality of education. Work experience strongly preferred — if you have 1-2 years, SPJIMR gives you IIM-calibre outcomes at a Mumbai location advantage.",
    pros: ["Mumbai location — best industry access", "Strong FMCG and marketing placements", "Diverse, international program culture"],
    cons: ["Work experience strongly preferred — freshers at disadvantage", "₹26.5L fees for ₹27 LPA avg — moderate ROI", "Smaller batch — less diverse peer network"],
    asked: ["SPJIMR vs MDI Gurgaon — which is better?", "SPJIMR without work experience", "JBIMS vs SPJIMR Mumbai"]
  },
  'mdi-gurgaon': {
    verdict: "Best MBA for Delhi NCR corporate access. Gurgaon is India's corporate hub — MDI students intern and network with Fortune 500 companies throughout the program.",
    pros: ["Gurgaon location — unmatched corporate proximity", "Strong HR and consulting placements", "Good work-experience weightage in selection"],
    cons: ["₹28.2L fees for ₹22 LPA avg — lowest ROI among Tier 1 non-IIMs", "95%+ required — competitive", "HR-heavy reputation limits some career paths"],
    asked: ["MDI Gurgaon vs SPJIMR", "MDI placement for consulting", "MDI Gurgaon CAT cutoff 2025"]
  },
  'jbims-mumbai': {
    verdict: "Extraordinary value for Maharashtra residents. ₹4.5L fees and ₹28 LPA average placement puts JBIMS alongside XLRI and MDI for ROI. The MH-CET requirement keeps competition lower.",
    pros: ["₹4.5L total fees — second cheapest top MBA after FMS", "Mumbai's finance network directly accessible", "Strong alumni in banking and financial services"],
    cons: ["MH-CET 99%+ required — state-level exam needs separate prep", "Primarily useful for Mumbai-based careers", "Less national brand recognition than IIMs"],
    asked: ["JBIMS vs SPJIMR Mumbai", "MH-CET cutoff for JBIMS", "Is JBIMS better than NMIMS?"]
  },
  'imt-ghaziabad': {
    verdict: "Best Tier 2 MBA for NCR-based careers. IMT's Ghaziabad location gives solid Delhi NCR access at CAT 88%+ — a realistic target for students who missed top IIMs.",
    pros: ["NCR location — corporate Delhi access", "CAT 88%+ cutoff — more accessible", "Strong general management placements"],
    cons: ["₹12 LPA avg package — moderate outcome", "Ghaziabad location — not central Delhi", "Tier 2 brand — less recruiters than IIMs"],
    asked: ["IMT vs FORE Delhi — which is better?", "IMT Ghaziabad placement 2025", "IMT CAT cutoff for OBC"]
  },
  'tapmi-manipal': {
    verdict: "Hidden gem for banking and finance careers. TAPMI's residential Manipal campus offers a quality experience at accessible fees — underrated relative to its actual placement outcomes.",
    pros: ["Strong banking and finance specialisation", "Residential campus — immersive experience", "CAT 85%+ — accessible for many profiles"],
    cons: ["Manipal — remote coastal location", "₹11 LPA avg — modest placement outcomes", "Less known outside South India"],
    asked: ["TAPMI vs FORE Delhi", "TAPMI placement for banking careers", "Is TAPMI worth it?"]
  },
  'nmims-mumbai': {
    verdict: "Strong choice for finance and pharma management in Mumbai. The NMAT route is less competitive than CAT, making NMIMS accessible to students who perform better on NMAT's format.",
    pros: ["Mumbai location — finance and pharma access", "NMAT route — different and less crowded than CAT", "Strong banking, NBFC and pharma placements"],
    cons: ["₹27L fees for ₹18 LPA avg — mediocre ROI", "Less brand recognition than IIMs nationally", "NMAT requires separate preparation"],
    asked: ["NMIMS vs IMT Ghaziabad", "NMAT score for NMIMS 2025", "Is NMIMS worth ₹27 lakhs?"]
  },
}

// Upcoming questions (static for now, will be real data later)
const UPCOMING_ASKED = {
  'iim-ahmedabad': ["Is 99 percentile enough for IIM A?", "IIM A vs IIM B for consulting", "IIM A interview experience"],
  'iim-bangalore': ["IIM A vs IIM B which is better?", "IIM B for tech jobs", "IIM Bangalore placement for engineers"],
  'fms-delhi': ["FMS vs IIM L fees comparison", "FMS placement vs IIM A", "Is FMS Delhi worth it?"],
  'xlri-jamshedpur': ["XLRI BM vs HRM which to choose?", "XLRI vs IIM Lucknow", "XAT 2026 cutoff for XLRI"],
}

function CollegeCard({ college, slug }) {
  const intel = COLLEGE_INTEL[slug] || null
  const fmt = n => n ? `₹${(n/100000).toFixed(n>=10000000?0:1)}L` : '—'
  const upcoming = UPCOMING_ASKED[slug] || intel?.asked || []

  return (
    <div style={{background:'#1a1a1a',borderRadius:14,overflow:'hidden',border:'1px solid rgba(255,255,255,.1)',marginTop:8}}>
      {/* Top accent */}
      <div style={{height:3,background:'linear-gradient(90deg,#d95f02,#e85d04)'}}></div>

      {/* Header */}
      <div style={{padding:'13px 15px 11px',borderBottom:'1px solid rgba(255,255,255,.07)',display:'flex',alignItems:'center',gap:10}}>
        <span style={{fontSize:24}}>{college.emoji}</span>
        <div style={{flex:1}}>
          <div style={{fontFamily:'var(--serif)',fontSize:'.95rem',fontWeight:700,color:'#fff'}}>{college.name}</div>
          <div style={{fontSize:10,color:'rgba(255,255,255,.35)',fontFamily:'var(--mono)',marginTop:1}}>{college.city}{college.nirf ? ` · NIRF #${college.nirf}` : ''}</div>
        </div>
        {college.nirf <= 5 && <div style={{fontSize:9,color:'#1D9E75',background:'rgba(29,158,117,.1)',padding:'2px 7px',borderRadius:10,border:'1px solid rgba(29,158,117,.2)',fontFamily:'var(--mono)',whiteSpace:'nowrap'}}>Top Pick</div>}
      </div>

      {/* Stats */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1px',background:'rgba(255,255,255,.06)'}}>
        {[['FEES',fmt(college.fees),'#fff'],['AVG PKG',fmt(college.avgPkg),'#1D9E75'],['CUTOFF',college.cutoff,'#d95f02']].map(([l,v,c])=>(
          <div key={l} style={{background:'#1a1a1a',padding:'9px 8px',textAlign:'center'}}>
            <div style={{fontSize:9,color:'rgba(255,255,255,.3)',fontFamily:'var(--mono)',marginBottom:3}}>{l}</div>
            <div style={{fontSize:13,fontWeight:700,color:c}}>{v}</div>
          </div>
        ))}
      </div>

      {/* AI Verdict */}
      {intel?.verdict && (
        <div style={{padding:'11px 14px',borderBottom:'1px solid rgba(255,255,255,.06)'}}>
          <div style={{fontSize:9,color:'rgba(255,255,255,.3)',fontFamily:'var(--mono)',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:5}}>AI Verdict</div>
          <div style={{fontSize:12.5,color:'rgba(255,255,255,.72)',lineHeight:1.65}}>{intel.verdict}</div>
        </div>
      )}

      {/* Pros & Cons */}
      {intel && (intel.pros || intel.cons) && (
        <div style={{padding:'11px 14px',borderBottom:'1px solid rgba(255,255,255,.06)',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))',gap:12}}>
          {intel.pros && (
            <div>
              <div style={{fontSize:9,color:'#1D9E75',fontFamily:'var(--mono)',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:6}}>✓ Strong for</div>
              {intel.pros.map((p,i)=>(
                <div key={i} style={{fontSize:11.5,color:'rgba(255,255,255,.6)',marginBottom:4,lineHeight:1.4}}>{p}</div>
              ))}
            </div>
          )}
          {intel.cons && (
            <div>
              <div style={{fontSize:9,color:'rgba(217,95,2,.8)',fontFamily:'var(--mono)',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:6}}>⚠ Consider</div>
              {intel.cons.map((c,i)=>(
                <div key={i} style={{fontSize:11.5,color:'rgba(255,255,255,.6)',marginBottom:4,lineHeight:1.4}}>{c}</div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Students also asked */}
      {upcoming.length > 0 && (
        <div style={{padding:'10px 14px',borderBottom:'1px solid rgba(255,255,255,.06)'}}>
          <div style={{fontSize:9,color:'rgba(255,255,255,.25)',fontFamily:'var(--mono)',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:6,display:'flex',alignItems:'center',gap:6}}>
            Students also asked
            <span style={{background:'rgba(255,255,255,.06)',borderRadius:8,padding:'1px 6px',fontSize:8,color:'rgba(255,255,255,.3)'}}>live soon</span>
          </div>
          {upcoming.slice(0,3).map((q,i)=>(
            <div key={i} style={{fontSize:11.5,color:'rgba(255,255,255,.35)',marginBottom:3,lineHeight:1.4}}>· {q}</div>
          ))}
        </div>
      )}

      {/* CTAs */}
      <div style={{padding:'11px 14px',display:'flex',gap:7}}>
        <Link href={`/colleges/${slug}`} style={{flex:1,background:'#d95f02',color:'#fff',padding:'8px 10px',borderRadius:8,fontSize:12,fontWeight:500,textAlign:'center',textDecoration:'none'}}>Full Guide →</Link>
        <Link href="/eligibility" style={{flex:1,background:'rgba(255,255,255,.07)',color:'rgba(255,255,255,.7)',padding:'8px 10px',borderRadius:8,fontSize:12,fontWeight:500,textAlign:'center',textDecoration:'none',border:'1px solid rgba(255,255,255,.1)'}}>Am I eligible? →</Link>
      </div>
    </div>
  )
}

function CollegeList({ colleges, tip }) {
  return (
    <div style={{marginTop:8}}>
      {tip && <div style={{fontSize:12,color:'rgba(255,255,255,.65)',marginBottom:8,padding:'8px 12px',background:'rgba(217,95,2,.1)',borderRadius:8,borderLeft:'3px solid #d95f02',lineHeight:1.6}}>{tip}</div>}
      {colleges.map(c=>(
        <div key={c.slug} style={{display:'flex',alignItems:'center',gap:10,padding:'9px 12px',border:'1px solid rgba(255,255,255,.08)',borderRadius:9,marginBottom:6,background:'rgba(255,255,255,.03)'}}>
          <span style={{fontSize:18}}>{c.emoji}</span>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:500,color:'#fff'}}>{c.name}</div>
            <div style={{fontSize:10.5,color:'rgba(255,255,255,.35)',fontFamily:'var(--mono)'}}>{c.cutoff} · ₹{(c.avgPkg/100000).toFixed(0)} LPA avg</div>
          </div>
          <Link href={`/colleges/${c.slug}`} style={{fontSize:11,color:'#d95f02',textDecoration:'none',flexShrink:0}}>View →</Link>
        </div>
      ))}
      <Link href="/eligibility" style={{display:'block',background:'#d95f02',color:'#fff',padding:'9px',borderRadius:8,fontSize:12.5,fontWeight:500,textAlign:'center',textDecoration:'none',marginTop:6}}>Check My Full Eligibility →</Link>
    </div>
  )
}

function parseClaudeResponse(text) {
  // Detect if response mentions a college card should be shown
  // Claude will return JSON hints if needed
  try {
    if (text.startsWith('{') && text.includes('"type"')) {
      return JSON.parse(text)
    }
  } catch {}
  return null
}

function AIMessage({ text, loading, collegeCard, collegeList }) {
  if (loading) return (
    <div style={{display:'flex',gap:8,marginBottom:14,alignItems:'flex-start'}}>
      <div style={{width:26,height:26,borderRadius:'50%',background:'#d95f02',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,flexShrink:0,fontFamily:'var(--mono)'}}>AI</div>
      <div style={{background:'rgba(255,255,255,.06)',padding:'10px 14px',borderRadius:'4px 14px 14px 14px',fontSize:13,color:'rgba(255,255,255,.4)'}}>Thinking...</div>
    </div>
  )

  // Parse CTA from text
  const ctaMatch = text?.match(/\/(eligibility|colleges\/[\w-]+|blog\/[\w-]+|compare)/)
  const cleanText = text?.replace(/→?\s*(https?:\/\/\S+|collvera\.com\/\S+|(?:^|\s)\/(eligibility|colleges\/[\w-]+|blog\/[\w-]+|compare))/g,'').trim()
  const ctaHref = ctaMatch ? ctaMatch[0] : null
  const ctaLabel = ctaHref?.includes('eligibility') ? 'Check My Eligibility →'
    : ctaHref?.includes('colleges') ? 'View Full College Guide →'
    : ctaHref?.includes('compare') ? 'Compare Colleges →'
    : ctaHref?.includes('blog') ? 'Read Full Guide →' : null

  return (
    <div style={{display:'flex',gap:8,marginBottom:14,alignItems:'flex-start'}}>
      <div style={{width:26,height:26,borderRadius:'50%',background:'#d95f02',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,flexShrink:0,fontFamily:'var(--mono)',marginTop:2}}>AI</div>
      <div style={{flex:1,minWidth:0}}>
        {cleanText && (
          <div style={{background:'rgba(255,255,255,.07)',padding:'11px 14px',borderRadius:'4px 14px 14px 14px',fontSize:13,lineHeight:1.7,color:'rgba(255,255,255,.88)',whiteSpace:'pre-wrap'}}>{cleanText}</div>
        )}
        {collegeCard && <CollegeCard college={collegeCard.college} slug={collegeCard.slug}/>}
        {collegeList && <CollegeList colleges={collegeList.colleges} tip={collegeList.tip}/>}
        {ctaHref && ctaLabel && !collegeCard && (
          <Link href={ctaHref} style={{display:'inline-block',marginTop:7,background:'#d95f02',color:'#fff',padding:'6px 14px',borderRadius:7,fontSize:12,fontWeight:500,textDecoration:'none'}}>{ctaLabel}</Link>
        )}
      </div>
    </div>
  )
}

function UserMessage({ text }) {
  return (
    <div style={{display:'flex',justifyContent:'flex-end',marginBottom:14}}>
      <div style={{background:'rgba(255,255,255,.12)',color:'#fff',padding:'10px 14px',borderRadius:'14px 4px 14px 14px',fontSize:13,lineHeight:1.55,maxWidth:'80%'}}>{text}</div>
    </div>
  )
}

export function FloatingChat() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div style={{position:'fixed',bottom:16,right:16,zIndex:1000}}>
        <button onClick={()=>setOpen(!open)}
          style={{width:52,height:52,borderRadius:'50%',background:'#0e0c08',color:'#fff',border:'2px solid rgba(255,255,255,.12)',cursor:'pointer',boxShadow:'0 4px 20px rgba(0,0,0,.4)',transition:'all .2s',display:'flex',alignItems:'center',justifyContent:'center',fontSize:open?16:22}}
          onMouseOver={e=>e.currentTarget.style.background='#d95f02'}
          onMouseOut={e=>e.currentTarget.style.background='#0e0c08'}>
          {open?'✕':'💬'}
        </button>
        {!open&&<div style={{position:'absolute',top:-8,right:-4,background:'#1D9E75',borderRadius:10,padding:'1px 6px',fontSize:9,color:'#fff',fontFamily:'var(--mono)',fontWeight:600}}>AI</div>}
      </div>
      {open&&(
        <div style={{position:'fixed',bottom:80,right:8,left:8,width:'auto',maxWidth:400,margin:'0 auto',zIndex:1000,boxShadow:'0 8px 40px rgba(0,0,0,.5)',borderRadius:16,overflow:'hidden',border:'1px solid rgba(255,255,255,.1)'}}>
          <ChatWidget onClose={()=>setOpen(false)} height={460} compact/>
        </div>
      )}
    </>
  )
}

export default function ChatWidget({ onClose, height=520, compact=false }) {
  const INIT = [{role:'ai',text:'Hi! Ask me anything about MBA colleges in India — fees, placements, cutoffs, comparisons, or which college suits your profile.',collegeCard:null,collegeList:null}]

  const [messages, setMessages] = useState(()=>{
    if(typeof window==='undefined') return INIT
    try { const s=sessionStorage.getItem('cv_chat'); return s?JSON.parse(s):INIT } catch { return INIT }
  })
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSug, setShowSug] = useState(true)
  const msgsRef = useRef(null)

  useEffect(()=>{
    try { sessionStorage.setItem('cv_chat', JSON.stringify(messages.slice(-20))) } catch {}
    if(msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight
  },[messages])

  // Detect college from query for card display
  function detectCollegeCard(query, responseText) {
    const q = (query + ' ' + responseText).toLowerCase()
    const map = {
      'iim ahmedabad':'iim-ahmedabad','iim a ':'iim-ahmedabad','iima':'iim-ahmedabad',
      'iim bangalore':'iim-bangalore','iim b ':'iim-bangalore','iimb':'iim-bangalore',
      'iim calcutta':'iim-calcutta','iim c ':'iim-calcutta','iimc':'iim-calcutta',
      'iim lucknow':'iim-lucknow','iim l ':'iim-lucknow','iiml':'iim-lucknow',
      'iim kozhikode':'iim-kozhikode','iim k ':'iim-kozhikode','iimk':'iim-kozhikode',
      'iim indore':'iim-indore','iim i ':'iim-indore','iimi':'iim-indore',
      'fms delhi':'fms-delhi',' fms ':'fms-delhi',
      'xlri':'xlri-jamshedpur',
      'spjimr':'spjimr-mumbai','sp jain':'spjimr-mumbai',
      'mdi gurgaon':'mdi-gurgaon',' mdi ':'mdi-gurgaon',
      'isb hyderabad':'isb-hyderabad',' isb ':'isb-hyderabad',
      'jbims':'jbims-mumbai',
      'nmims':'nmims-mumbai',
      'imt ghaziabad':'imt-ghaziabad',' imt ':'imt-ghaziabad',
      'tapmi':'tapmi-manipal',
    }
    const COLLEGE_DATA = {
      'iim-ahmedabad':{name:'IIM Ahmedabad',emoji:'🏛️',city:'Ahmedabad',nirf:1,fees:2750000,avgPkg:3522000,cutoff:'99%+',tags:['Consulting','FMCG']},
      'iim-bangalore':{name:'IIM Bangalore',emoji:'🎓',city:'Bangalore',nirf:2,fees:2620000,avgPkg:3488000,cutoff:'99%+',tags:['Tech','Startups']},
      'iim-calcutta':{name:'IIM Calcutta',emoji:'🏛️',city:'Kolkata',nirf:5,fees:2700000,avgPkg:3100000,cutoff:'99%+',tags:['Finance','Consulting']},
      'iim-lucknow':{name:'IIM Lucknow',emoji:'🏛️',city:'Lucknow',nirf:6,fees:2200000,avgPkg:3230000,cutoff:'97%+',tags:['FMCG','Consulting']},
      'iim-kozhikode':{name:'IIM Kozhikode',emoji:'🏛️',city:'Kozhikode',nirf:3,fees:2400000,avgPkg:2800000,cutoff:'96%+',tags:['Analytics','Marketing']},
      'iim-indore':{name:'IIM Indore',emoji:'🏛️',city:'Indore',nirf:7,fees:1650000,avgPkg:2500000,cutoff:'97%+',tags:['General Mgmt']},
      'fms-delhi':{name:'FMS Delhi',emoji:'🎓',city:'New Delhi',nirf:12,fees:243000,avgPkg:3400000,cutoff:'98%+',tags:['Consulting','FMCG']},
      'xlri-jamshedpur':{name:'XLRI Jamshedpur',emoji:'✝️',city:'Jamshedpur',nirf:9,fees:2850000,avgPkg:2800000,cutoff:'XAT 97%+',tags:['HR','Consulting']},
      'spjimr-mumbai':{name:'SPJIMR Mumbai',emoji:'🎓',city:'Mumbai',nirf:20,fees:2650000,avgPkg:2700000,cutoff:'95%+',tags:['Marketing','FMCG']},
      'mdi-gurgaon':{name:'MDI Gurgaon',emoji:'🏢',city:'Gurgaon',nirf:11,fees:2816000,avgPkg:2200000,cutoff:'95%+',tags:['HR','Consulting']},
      'isb-hyderabad':{name:'ISB Hyderabad',emoji:'🌏',city:'Hyderabad',nirf:null,fees:4300000,avgPkg:3400000,cutoff:'GMAT 710+',tags:['Consulting','Finance']},
      'jbims-mumbai':{name:'JBIMS Mumbai',emoji:'🏛️',city:'Mumbai',nirf:null,fees:450000,avgPkg:2800000,cutoff:'MH-CET 99%+',tags:['Finance']},
      'nmims-mumbai':{name:'NMIMS Mumbai',emoji:'🏛️',city:'Mumbai',nirf:24,fees:2700000,avgPkg:1800000,cutoff:'NMAT 215+',tags:['Finance','Pharma']},
      'imt-ghaziabad':{name:'IMT Ghaziabad',emoji:'🏢',city:'Ghaziabad',nirf:42,fees:2095000,avgPkg:1200000,cutoff:'88%+',tags:['General Mgmt']},
      'tapmi-manipal':{name:'TAPMI Manipal',emoji:'🎓',city:'Manipal',nirf:58,fees:1730000,avgPkg:1100000,cutoff:'85%+',tags:['Banking','Finance']},
    }
    // Only show card if query is specifically about one college
    const isComparison = /vs|compare|or|between/.test(q)
    if (isComparison) return null
    for (const [alias, slug] of Object.entries(map)) {
      if (q.includes(alias)) {
        const college = COLLEGE_DATA[slug]
        if (college) return { college, slug }
        break
      }
    }
    return null
  }

  async function send(text) {
    const query = (text||input).trim()
    if(!query||loading) return
    setInput('')
    setShowSug(false)
    const newMessages = [...messages, {role:'user',text:query,collegeCard:null,collegeList:null}]
    setMessages(newMessages)
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ query, messages: newMessages.slice(-6) })
      })
      const data = await res.json()
      const card = detectCollegeCard(query, data.text||'')
      setMessages(prev=>[...prev, {
        role:'ai',
        text: data.text,
        collegeCard: card,
        collegeList: null
      }])
    } catch {
      setMessages(prev=>[...prev, {role:'ai',text:'Having trouble. Try our eligibility checker → /eligibility',collegeCard:null,collegeList:null}])
    }
    setLoading(false)
  }

  return (
    <div style={{background:'#111',display:'flex',flexDirection:'column',height,fontFamily:'var(--sans)'}}>
      <div style={{background:'#0a0a0a',padding:'12px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',flexShrink:0,borderBottom:'1px solid rgba(255,255,255,.07)'}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <span style={{width:7,height:7,borderRadius:'50%',background:'#1D9E75',animation:'blink 2s ease-in-out infinite',display:'inline-block'}}></span>
          <span style={{fontFamily:'var(--serif)',fontSize:'1rem',fontWeight:600,color:'#fff'}}>Collvera AI</span>
          <span style={{fontSize:9,color:'rgba(255,255,255,.25)',fontFamily:'var(--mono)'}}>powered by Claude</span>
        </div>
        <div style={{display:'flex',gap:8}}>
          {messages.length>1&&(
            <button onClick={()=>{setMessages(INIT);setShowSug(true);try{sessionStorage.removeItem('cv_chat')}catch{}}}
              style={{background:'none',border:'1px solid rgba(255,255,255,.1)',color:'rgba(255,255,255,.35)',cursor:'pointer',fontSize:10,padding:'3px 8px',borderRadius:5,fontFamily:'var(--mono)'}}>clear</button>
          )}
          {onClose&&<button onClick={onClose} style={{background:'none',border:'none',color:'rgba(255,255,255,.35)',cursor:'pointer',fontSize:16}}>✕</button>}
        </div>
      </div>

      <div ref={msgsRef} style={{flex:1,overflowY:'auto',padding:'16px 12px',scrollBehavior:'smooth'}}>
        {messages.map((m,i)=>(
          m.role==='user'
            ? <UserMessage key={i} text={m.text}/>
            : <AIMessage key={i} text={m.text} collegeCard={m.collegeCard} collegeList={m.collegeList}/>
        ))}
        {loading&&<AIMessage loading/>}
      </div>

      {showSug&&(
        <div style={{padding:'8px 10px',borderTop:'1px solid rgba(255,255,255,.06)',overflowX:'auto',display:'flex',gap:6,flexShrink:0,scrollbarWidth:'none',WebkitOverflowScrolling:'touch',msOverflowStyle:'none'}}>
          {SUGGESTIONS.slice(0,compact?3:6).map(s=>(
            <button key={s} onClick={()=>send(s)}
              style={{whiteSpace:'nowrap',padding:'5px 10px',borderRadius:20,border:'1px solid rgba(255,255,255,.1)',background:'rgba(255,255,255,.04)',fontSize:11,cursor:'pointer',color:'rgba(255,255,255,.6)',fontFamily:'var(--sans)',flexShrink:0,transition:'all .15s'}}
              onMouseOver={e=>{e.currentTarget.style.borderColor='#d95f02';e.currentTarget.style.color='#fff'}}
              onMouseOut={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,.1)';e.currentTarget.style.color='rgba(255,255,255,.6)'}}>
              {s}
            </button>
          ))}
        </div>
      )}

      <div style={{padding:'10px 12px',borderTop:'1px solid rgba(255,255,255,.08)',background:'#0a0a0a',display:'flex',gap:8,flexShrink:0,minWidth:0}}>
        <input value={input} onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>e.key==='Enter'&&!loading&&send()}
          placeholder="Ask about any MBA college..."
          style={{flex:1,minWidth:0,padding:'9px 12px',border:'1.5px solid rgba(255,255,255,.1)',borderRadius:8,fontSize:13,fontFamily:'var(--sans)',outline:'none',background:'rgba(255,255,255,.06)',color:'#fff',transition:'border-color .15s'}}
          onFocus={e=>e.target.style.borderColor='#d95f02'}
          onBlur={e=>e.target.style.borderColor='rgba(255,255,255,.1)'}
        />
        <button onClick={()=>!loading&&send()} disabled={loading}
          style={{background:loading?'rgba(255,255,255,.1)':'#d95f02',color:'#fff',border:'none',borderRadius:8,padding:'9px 16px',fontSize:14,cursor:loading?'default':'pointer',fontWeight:500,transition:'all .2s',flexShrink:0}}>
          {loading?'...':'→'}
        </button>
      </div>
    </div>
  )
}
