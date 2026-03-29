'use client'
import { useState } from 'react'
import Nav from '../components/Nav'
import LeadModal from '../components/LeadModal'
import Ticker from '../components/home/Ticker'
import Hero from '../components/home/Hero'
import MiniCAT from '../components/home/MiniCAT'
import Link from 'next/link'

const DEADLINES=[{day:15,mon:'Apr',college:'ISB Hyderabad',prog:'PGP 2025-26 Round 3',urgency:'urgent',tags:['GMAT 680+','Work exp 2yr+'],days:18},{day:20,mon:'Apr',college:'SPJIMR Mumbai',prog:'PGDM 2025-27 Final round',urgency:'urgent',tags:['CAT/XAT 95%+','Work exp req'],days:23},{day:30,mon:'Apr',college:'XLRI Jamshedpur',prog:'PGDM-HRM 2025-27',urgency:'soon',tags:['XAT 94%+'],days:33},{day:5,mon:'May',college:'MDI Gurgaon',prog:'PGPM 2025-27 Round 2',urgency:'soon',tags:['CAT 95%+'],days:38},{day:15,mon:'May',college:'IIM Lucknow',prog:'PGP 2025-27 Final offers',urgency:'ok',tags:['CAT 97%+'],days:48},{day:31,mon:'May',college:'IMT Ghaziabad',prog:'PGDM 2025-27 Last round',urgency:'ok',tags:['CAT/XAT 88%+'],days:64}]
const PLACEMENTS=[{name:'IIM Ahmedabad',e:'🏛️',pkg:35,delta:8,bars:[24,26,28,31,35]},{name:'IIM Bangalore',e:'🎓',pkg:33,delta:6,bars:[23,25,27,30,33]},{name:'FMS Delhi',e:'🎓',pkg:34,delta:12,bars:[20,24,26,29,34]},{name:'XLRI',e:'✝️',pkg:28,delta:5,bars:[20,22,23,25,28]},{name:'JBIMS Mumbai',e:'🏛️',pkg:28,delta:9,bars:[18,20,22,24,28]},{name:'MDI Gurgaon',e:'🏢',pkg:22,delta:4,bars:[15,16,18,20,22]},{name:'SPJIMR',e:'🎓',pkg:27,delta:7,bars:[17,19,22,24,27]},{name:'NMIMS',e:'🏛️',pkg:18,delta:3,bars:[13,14,15,16,18]}]
const FEATURES=[{icon:'🔍',title:'Ask anything — real answers',body:'"IIM A vs IIM B for consulting", "Best MBA under ₹10L". Instant answers from verified data, not sponsored content.'},{icon:'⚖️',title:'Side-by-side comparisons',body:'Compare any two colleges on fees, placements, cutoffs, culture. AI gives a verdict for your specific goals.'},{icon:'🧠',title:'Readiness test + prediction',body:'Take 3 real CAT questions. AI predicts your percentile and shows exactly what to improve to unlock better colleges.'},{icon:'📊',title:'Verified placement data',body:'Every number shows when verified and from which source. Confidence score on every data point. No inflated figures.'},{icon:'🎯',title:'Eligibility checker',body:'Enter your full profile. AI calculates your realistic match % for each college with reasons — not just a cutoff comparison.'},{icon:'📅',title:'Deadline tracker — live',body:'AI tracks all upcoming application windows, PI dates, and shortlist releases. Updated automatically. Never miss a deadline.'}]
const urgBg={urgent:'#fdecea',soon:'#fff8e1',ok:'var(--teal-lt)'}
const urgColor={urgent:'#a32d2d',soon:'#854f0b',ok:'var(--teal)'}

export default function HomePage(){
  const [leadOpen,setLeadOpen]=useState(false)
  return(
    <div style={{minHeight:'100vh'}}>
      <Ticker/>
      <Nav onLeadOpen={()=>setLeadOpen(true)}/>
      <Hero onLeadOpen={()=>setLeadOpen(true)}/>
      {/* AI Identity Bar */}
      <div style={{background:'#0a0907',borderTop:'1px solid rgba(15,110,86,.15)',borderBottom:'1px solid rgba(15,110,86,.15)',padding:'14px 32px',display:'flex',alignItems:'center',justifyContent:'center',gap:40,flexWrap:'wrap'}}>
        {[['100%','AI-generated answers'],['0','humans involved'],['0','paid listings'],['Live','verified data'],['Free','always']].map(([n,l],i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:8,fontSize:11.5,color:'rgba(255,255,255,.55)',fontFamily:'var(--mono)'}}>
            <strong style={{color:'#1D9E75'}}>{n}</strong>&nbsp;{l}
          </div>
        ))}
      </div>
      <MiniCAT onLeadOpen={()=>setLeadOpen(true)}/>
      {/* Counter */}
      <div style={{background:'var(--ink)',padding:'18px 32px',display:'flex',justifyContent:'center',gap:56,flexWrap:'wrap'}}>
        {[['312+','students guided today'],['20+','verified colleges'],['2,100+','AI queries answered'],['Free','always']].map(([n,l])=>(
          <div key={l} style={{textAlign:'center'}}>
            <div style={{fontFamily:'var(--serif)',fontSize:'1.7rem',fontWeight:700,color:'#fff'}}>{n}</div>
            <div style={{fontSize:10,color:'rgba(255,255,255,.35)',fontFamily:'var(--mono)',marginTop:2}}>{l}</div>
          </div>
        ))}
      </div>
      {/* Below fold */}
      <div style={{maxWidth:1100,margin:'0 auto',padding:'48px 32px 64px'}}>
        <SectionHead>what collvera AI does</SectionHead>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:14,marginBottom:48}}>
          {FEATURES.map((f,i)=>(
            <div key={i} style={{background:'var(--white)',border:'1px solid var(--border)',borderRadius:12,padding:20,cursor:'pointer',transition:'all .2s'}}
              onMouseOver={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.borderColor='var(--ink)'}}
              onMouseOut={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.borderColor='var(--border)'}}>
              <div style={{fontSize:22,marginBottom:12}}>{f.icon}</div>
              <div style={{fontSize:13.5,fontWeight:500,marginBottom:5}}>{f.title}</div>
              <div style={{fontSize:12,color:'var(--muted)',lineHeight:1.65}}>{f.body}</div>
            </div>
          ))}
        </div>
        <SectionHead>application deadlines — AI tracked</SectionHead>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:12,marginBottom:48}}>
          {DEADLINES.map((d,i)=>(
            <div key={i} style={{background:'var(--white)',border:'1px solid var(--border)',borderRadius:11,padding:16,display:'flex',gap:14,alignItems:'flex-start',transition:'transform .2s'}}
              onMouseOver={e=>e.currentTarget.style.transform='translateY(-2px)'}
              onMouseOut={e=>e.currentTarget.style.transform='none'}>
              <div style={{background:'var(--cream)',borderRadius:8,padding:'8px 10px',textAlign:'center',flexShrink:0,minWidth:50}}>
                <div style={{fontFamily:'var(--serif)',fontSize:'1.4rem',fontWeight:700,lineHeight:1}}>{d.day}</div>
                <div style={{fontSize:9.5,fontFamily:'var(--mono)',color:'var(--muted)',textTransform:'uppercase',marginTop:2}}>{d.mon}</div>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,fontWeight:500,marginBottom:2}}>{d.college}</div>
                <div style={{fontSize:11,color:'var(--muted)',marginBottom:7,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{d.prog}</div>
                <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
                  {d.tags.map(t=><span key={t} style={{fontSize:9,fontFamily:'var(--mono)',padding:'2px 7px',borderRadius:8,background:urgBg[d.urgency],color:urgColor[d.urgency]}}>{t}</span>)}
                </div>
                <div style={{fontSize:10,fontFamily:'var(--mono)',marginTop:6,color:urgColor[d.urgency],fontWeight:d.urgency==='urgent'?500:'normal'}}>{d.days<=7?'⚠️ ':''}{d.days} days remaining</div>
              </div>
            </div>
          ))}
        </div>
        <SectionHead>placement trends 2024 — source verified</SectionHead>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:12,marginBottom:48}}>
          {PLACEMENTS.map((p,i)=>{
            const mx=Math.max(...p.bars)
            return(
              <div key={i} style={{background:'var(--white)',border:'1px solid var(--border)',borderRadius:11,padding:16,transition:'transform .2s'}}
                onMouseOver={e=>e.currentTarget.style.transform='translateY(-2px)'}
                onMouseOut={e=>e.currentTarget.style.transform='none'}>
                <div style={{fontSize:12.5,fontWeight:500,marginBottom:2}}>{p.e} {p.name}</div>
                <div style={{fontFamily:'var(--serif)',fontSize:'1.5rem',fontWeight:700,marginBottom:3}}>₹{p.pkg} LPA</div>
                <div style={{fontSize:11,fontFamily:'var(--mono)',color:'var(--teal)'}}>↑ {p.delta}% vs 2023</div>
                <div style={{display:'flex',alignItems:'flex-end',gap:3,height:28,marginTop:10}}>
                  {p.bars.map((v,j)=><div key={j} style={{background:j===4?'var(--teal)':'var(--cream2)',borderRadius:'2px 2px 0 0',flex:1,height:`${Math.round(v/mx*100)}%`}}></div>)}
                </div>
              </div>
            )
          })}
        </div>
        {/* Blog CTA */}
        <div style={{background:'var(--ink)',borderRadius:16,padding:32,textAlign:'center'}}>
          <div style={{fontFamily:'var(--serif)',fontSize:'1.3rem',fontWeight:700,color:'#fff',marginBottom:8}}>20 expert MBA guides — free</div>
          <p style={{fontSize:13,color:'rgba(255,255,255,.5)',marginBottom:20,maxWidth:480,margin:'0 auto 20px'}}>IIM comparisons, fee ROI, CAT prep strategy, city guides — written by AI, verified by data.</p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/blog" style={{background:'var(--orange)',color:'#fff',padding:'11px 22px',borderRadius:8,fontSize:13,fontWeight:500,textDecoration:'none'}}>Read the guides →</Link>
            <button onClick={()=>setLeadOpen(true)} style={{background:'transparent',color:'rgba(255,255,255,.7)',border:'1px solid rgba(255,255,255,.15)',padding:'11px 22px',borderRadius:8,fontSize:13,cursor:'pointer'}}>Get free counselling</button>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer style={{background:'#060504',borderTop:'1px solid rgba(255,255,255,.06)',padding:'32px',textAlign:'center'}}>
        <div style={{fontFamily:'var(--serif)',fontSize:'1.1rem',fontWeight:600,color:'#fff',marginBottom:6,display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
          Collvera
          <span style={{fontSize:9,color:'#1D9E75',background:'rgba(29,158,117,.15)',padding:'2px 7px',borderRadius:20,fontFamily:'var(--mono)',border:'1px solid rgba(29,158,117,.25)'}}>AI</span>
        </div>
        <div style={{fontSize:11,color:'rgba(255,255,255,.3)',marginBottom:16,fontFamily:'var(--mono)'}}>India's only MBA guide run entirely by AI</div>
        <div style={{display:'flex',justifyContent:'center',gap:20,fontSize:12,flexWrap:'wrap'}}>
          {[['Colleges','/colleges'],['Compare','/compare'],['Eligibility','/eligibility'],['Rankings','/rankings'],['Blog','/blog']].map(([l,h])=>(
            <Link key={h} href={h} style={{color:'rgba(255,255,255,.35)',textDecoration:'none'}}>{l}</Link>
          ))}
        </div>
        <div style={{fontSize:10,color:'rgba(255,255,255,.2)',marginTop:16,fontFamily:'var(--mono)'}}>© 2026 Collvera.com · Data from NIRF, official college websites</div>
      </footer>
      <LeadModal open={leadOpen} onClose={()=>setLeadOpen(false)}/>
    </div>
  )
}

function SectionHead({children}){
  return(
    <div style={{fontSize:10,fontFamily:'var(--mono)',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.1em',marginBottom:20,display:'flex',alignItems:'center',gap:12}}>
      {children}<span style={{flex:1,height:1,background:'var(--border)'}}></span>
    </div>
  )
}
