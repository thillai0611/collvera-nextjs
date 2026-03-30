'use client'
import { useState, useRef, useEffect } from 'react'
import { detectIntent, generateResponse } from '../lib/chatEngine'
import Link from 'next/link'

const SUGGESTIONS = [
  "IIM Ahmedabad fees and placements",
  "Colleges for 95 percentile CAT",
  "Is FMS better than IIM Lucknow?",
  "Best MBA for finance in India",
  "ISB vs IIM A",
  "CAT cutoff for MDI Gurgaon",
]

function CollegeCard({ college, cta, eligibilityCta }) {
  const fmt = n => n ? `₹${(n/100000).toFixed(1)}L` : '—'
  return (
    <div style={{background:'#1a1a1a',border:'1px solid rgba(255,255,255,.1)',borderRadius:12,overflow:'hidden',marginTop:8}}>
      <div style={{height:3,background:'var(--orange)'}}></div>
      <div style={{padding:'14px 16px'}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
          <span style={{fontSize:22}}>{college.emoji}</span>
          <div>
            <div style={{fontFamily:'var(--serif)',fontSize:'1rem',fontWeight:700,color:'#fff'}}>{college.name}</div>
            <div style={{fontSize:10,color:'rgba(255,255,255,.4)',fontFamily:'var(--mono)'}}>{college.city} · NIRF #{college.nirf||'N/A'}</div>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:6,marginBottom:12}}>
          {[['Fees',fmt(college.fees)],['Avg Pkg',fmt(college.avgPkg)],['Cutoff',college.cutoff]].map(([l,v])=>(
            <div key={l} style={{background:'rgba(255,255,255,.06)',borderRadius:7,padding:'7px 8px',textAlign:'center'}}>
              <div style={{fontSize:9,color:'rgba(255,255,255,.4)',fontFamily:'var(--mono)',marginBottom:2}}>{l}</div>
              <div style={{fontSize:12,fontWeight:600,color:'#fff'}}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:10}}>
          {college.tags.map(t=><span key={t} style={{fontSize:9,fontFamily:'var(--mono)',padding:'2px 7px',borderRadius:8,background:'rgba(255,255,255,.08)',color:'rgba(255,255,255,.5)'}}>{t}</span>)}
        </div>
        <div style={{display:'flex',gap:6}}>
          <Link href={cta.href} style={{flex:1,background:'var(--orange)',color:'#fff',padding:'7px 10px',borderRadius:7,fontSize:11.5,fontWeight:500,textAlign:'center',textDecoration:'none'}}>{cta.label}</Link>
          <Link href={eligibilityCta.href} style={{flex:1,background:'rgba(255,255,255,.08)',color:'rgba(255,255,255,.8)',padding:'7px 10px',borderRadius:7,fontSize:11.5,fontWeight:500,textAlign:'center',textDecoration:'none'}}>{eligibilityCta.label}</Link>
        </div>
      </div>
    </div>
  )
}

function CollegeList({ colleges, cta, tip }) {
  return (
    <div style={{marginTop:8}}>
      {tip && <div style={{fontSize:12,color:'rgba(255,255,255,.6)',marginBottom:8,padding:'8px 10px',background:'rgba(217,95,2,.15)',borderRadius:8,borderLeft:'3px solid var(--orange)',lineHeight:1.6}}>{tip}</div>}
      {colleges.map(c=>(
        <div key={c.slug} style={{display:'flex',alignItems:'center',gap:10,padding:'9px 12px',border:'1px solid rgba(255,255,255,.08)',borderRadius:8,marginBottom:6,background:'rgba(255,255,255,.04)'}}>
          <span style={{fontSize:18}}>{c.emoji}</span>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:500,color:'#fff'}}>{c.name}</div>
            <div style={{fontSize:10.5,color:'rgba(255,255,255,.4)',fontFamily:'var(--mono)'}}>{c.cutoff} · ₹{(c.avgPkg/100000).toFixed(0)} LPA avg</div>
          </div>
          <Link href={`/colleges/${c.slug}`} style={{fontSize:11,color:'var(--orange)',textDecoration:'none'}}>View →</Link>
        </div>
      ))}
      <Link href={cta.href} style={{display:'block',width:'100%',background:'var(--orange)',color:'#fff',padding:'9px',borderRadius:8,fontSize:12.5,fontWeight:500,textAlign:'center',textDecoration:'none',marginTop:6}}>{cta.label}</Link>
    </div>
  )
}

function AIMessage({ msg }) {
  const r = msg.response
  return (
    <div style={{display:'flex',gap:8,marginBottom:14,alignItems:'flex-start'}}>
      <div style={{width:26,height:26,borderRadius:'50%',background:'var(--orange)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,flexShrink:0,fontFamily:'var(--mono)',marginTop:2}}>AI</div>
      <div style={{flex:1,minWidth:0}}>
        {msg.text && (
          <div style={{background:'rgba(255,255,255,.06)',padding:'10px 14px',borderRadius:'4px 14px 14px 14px',fontSize:13,lineHeight:1.65,color:'rgba(255,255,255,.85)',marginBottom:r?0:0}}>{msg.text}</div>
        )}
        {r?.type==='college_card' && <CollegeCard {...r}/>}
        {r?.type==='college_list' && <CollegeList {...r}/>}
        {r?.type==='eligibility_push' && (
          <div style={{background:'rgba(217,95,2,.12)',border:'1px solid rgba(217,95,2,.3)',borderRadius:12,padding:'12px 14px',marginTop:msg.text?8:0}}>
            <div style={{fontSize:13,color:'rgba(255,255,255,.8)',marginBottom:10,lineHeight:1.65}}>{r.text}</div>
            <Link href={r.cta.href} style={{display:'block',background:'var(--orange)',color:'#fff',padding:'9px 14px',borderRadius:7,fontSize:13,fontWeight:500,textAlign:'center',textDecoration:'none',marginBottom:6}}>{r.cta.label}</Link>
            {r.followUp && <div style={{fontSize:11,color:'rgba(255,255,255,.4)',textAlign:'center',marginTop:4}}>{r.followUp}</div>}
          </div>
        )}
        {(r?.type==='text'||r?.type==='comparison'||r?.type==='general'||r?.type==='ranking'||r?.type==='career'||r?.type==='budget'||r?.type==='cat_prep') && (
          <div>
            {r.text && !msg.text && <div style={{background:'rgba(255,255,255,.06)',padding:'10px 14px',borderRadius:'4px 14px 14px 14px',fontSize:13,lineHeight:1.65,color:'rgba(255,255,255,.85)',marginBottom:8}}>{r.text}</div>}
            {(r.cta||r.eligibilityCta) && (
              <div style={{display:'flex',gap:6,flexWrap:'wrap',marginTop:8}}>
                {r.cta && <Link href={r.cta.href} style={{background:'var(--orange)',color:'#fff',padding:'6px 12px',borderRadius:7,fontSize:11.5,fontWeight:500,textDecoration:'none'}}>{r.cta.label}</Link>}
                {r.eligibilityCta && <Link href={r.eligibilityCta.href} style={{background:'rgba(255,255,255,.08)',color:'rgba(255,255,255,.7)',padding:'6px 12px',borderRadius:7,fontSize:11.5,textDecoration:'none'}}>{r.eligibilityCta.label}</Link>}
              </div>
            )}
          </div>
        )}
        {r?.needsAI && (
          <div style={{background:'rgba(255,255,255,.06)',padding:'10px 14px',borderRadius:'4px 14px 14px 14px',fontSize:13,color:'rgba(255,255,255,.5)',lineHeight:1.6}}>
            I don't have a specific answer for that yet. Try our <Link href="/eligibility" style={{color:'var(--orange)'}}>eligibility checker</Link> or <Link href="/colleges" style={{color:'var(--orange)'}}>browse colleges →</Link>
          </div>
        )}
      </div>
    </div>
  )
}

function UserMessage({ text }) {
  return (
    <div style={{display:'flex',justifyContent:'flex-end',marginBottom:14}}>
      <div style={{background:'rgba(255,255,255,.12)',color:'#fff',padding:'10px 14px',borderRadius:'14px 4px 14px 14px',fontSize:13,lineHeight:1.5,maxWidth:'80%'}}>{text}</div>
    </div>
  )
}

// ── FLOATING CHAT BUTTON ──────────────────────────────────────
export function FloatingChat() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div style={{position:'fixed',bottom:24,right:24,zIndex:1000}}>
        <button onClick={()=>setOpen(!open)}
          style={{width:52,height:52,borderRadius:'50%',background:'var(--ink)',color:'#fff',border:'2px solid rgba(255,255,255,.1)',cursor:'pointer',fontSize:22,boxShadow:'0 4px 20px rgba(14,12,8,.3)',transition:'all .2s',display:'flex',alignItems:'center',justifyContent:'center'}}
          onMouseOver={e=>e.currentTarget.style.background='var(--orange)'}
          onMouseOut={e=>e.currentTarget.style.background='var(--ink)'}>
          {open ? '✕' : '💬'}
        </button>
        {!open && <div style={{position:'absolute',top:-8,right:-4,background:'#1D9E75',borderRadius:10,padding:'1px 6px',fontSize:9,color:'#fff',fontFamily:'var(--mono)',fontWeight:600,whiteSpace:'nowrap'}}>AI</div>}
      </div>
      {open && (
        <div style={{position:'fixed',bottom:88,right:24,width:340,zIndex:1000,boxShadow:'0 8px 40px rgba(0,0,0,.4)',borderRadius:16,overflow:'hidden',border:'1px solid rgba(255,255,255,.1)'}}>
          <ChatWidget onClose={()=>setOpen(false)} compact height={420}/>
        </div>
      )}
    </>
  )
}

// ── MAIN CHAT WIDGET ──────────────────────────────────────────
export default function ChatWidget({ onClose, compact=false, height=520 }) {
  const INIT = [{ role:'ai', text:'Hi! Ask me anything about MBA colleges in India — fees, placements, cutoffs, comparisons, or which college suits your profile.', response:null }]

  // Session memory — persists until page closes
  const [messages, setMessages] = useState(()=>{
    if(typeof window==='undefined') return INIT
    try {
      const saved = sessionStorage.getItem('collvera_chat')
      return saved ? JSON.parse(saved) : INIT
    } catch { return INIT }
  })
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const msgsRef = useRef(null)

  // Save to sessionStorage on every message change
  useEffect(()=>{
    try { sessionStorage.setItem('collvera_chat', JSON.stringify(messages)) } catch {}
    // Scroll ONLY the messages container, not the page
    if(msgsRef.current) {
      msgsRef.current.scrollTop = msgsRef.current.scrollHeight
    }
  },[messages])

  async function send(text) {
    const query = (text||input).trim()
    if(!query) return
    setInput('')
    setShowSuggestions(false)
    setMessages(prev=>[...prev,{role:'user',text:query,response:null}])
    setLoading(true)

    await new Promise(r=>setTimeout(r,500))

    const intent = detectIntent(query)
    const response = generateResponse(intent, query)

    let aiText = null
    if(response.type==='college_card') aiText=`Here's what I know about ${response.college?.name}:`
    else if(response.type==='college_list') aiText=response.text
    else if(response.type==='text'||response.type==='comparison'||response.type==='ranking'||response.type==='career'||response.type==='budget'||response.type==='cat_prep') aiText=response.text

    setMessages(prev=>[...prev,{role:'ai',text:aiText,response}])
    setLoading(false)
  }

  return (
    <div style={{background:'#111',display:'flex',flexDirection:'column',height:height,fontFamily:'var(--sans)'}}>
      {/* Header */}
      <div style={{background:'#0a0a0a',padding:'12px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',flexShrink:0,borderBottom:'1px solid rgba(255,255,255,.08)'}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <span style={{width:7,height:7,borderRadius:'50%',background:'#1D9E75',animation:'blink 2s ease-in-out infinite',display:'inline-block'}}></span>
          <span style={{fontFamily:'var(--serif)',fontSize:'1rem',fontWeight:600,color:'#fff'}}>Collvera AI</span>
          <span style={{fontSize:9,color:'rgba(255,255,255,.3)',fontFamily:'var(--mono)'}}>MBA Guide · India</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          {messages.length>1 && (
            <button onClick={()=>{setMessages(INIT);setShowSuggestions(true);sessionStorage.removeItem('collvera_chat')}}
              style={{background:'none',border:'1px solid rgba(255,255,255,.1)',color:'rgba(255,255,255,.4)',cursor:'pointer',fontSize:10,padding:'3px 8px',borderRadius:5,fontFamily:'var(--mono)'}}>
              clear
            </button>
          )}
          {onClose && <button onClick={onClose} style={{background:'none',border:'none',color:'rgba(255,255,255,.4)',cursor:'pointer',fontSize:16,padding:2}}>✕</button>}
        </div>
      </div>

      {/* Messages — scrolls internally, never scrolls the page */}
      <div ref={msgsRef} style={{flex:1,overflowY:'auto',padding:'16px 14px',scrollBehavior:'smooth'}}>
        {messages.map((m,i)=>(
          m.role==='user'
            ? <UserMessage key={i} text={m.text}/>
            : <AIMessage key={i} msg={m}/>
        ))}
        {loading && (
          <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:14}}>
            <div style={{width:26,height:26,borderRadius:'50%',background:'var(--orange)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,flexShrink:0,fontFamily:'var(--mono)'}}>AI</div>
            <div style={{background:'rgba(255,255,255,.06)',padding:'10px 14px',borderRadius:'4px 14px 14px 14px',fontSize:13,color:'rgba(255,255,255,.4)'}}>Thinking...</div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      {showSuggestions && (
        <div style={{padding:'8px 12px',borderTop:'1px solid rgba(255,255,255,.06)',overflowX:'auto',display:'flex',gap:6,flexShrink:0,scrollbarWidth:'none'}}>
          {SUGGESTIONS.slice(0,compact?3:6).map(s=>(
            <button key={s} onClick={()=>send(s)}
              style={{whiteSpace:'nowrap',padding:'5px 10px',borderRadius:20,border:'1px solid rgba(255,255,255,.12)',background:'rgba(255,255,255,.05)',fontSize:11,cursor:'pointer',color:'rgba(255,255,255,.65)',transition:'all .15s',fontFamily:'var(--sans)',flexShrink:0}}
              onMouseOver={e=>{e.currentTarget.style.borderColor='var(--orange)';e.currentTarget.style.color='#fff'}}
              onMouseOut={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,.12)';e.currentTarget.style.color='rgba(255,255,255,.65)'}}>
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{padding:'10px 12px',borderTop:'1px solid rgba(255,255,255,.08)',background:'#0a0a0a',display:'flex',gap:8,flexShrink:0}}>
        <input
          value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>e.key==='Enter'&&!loading&&send()}
          placeholder="Ask about any MBA college..."
          style={{flex:1,padding:'9px 14px',border:'1.5px solid rgba(255,255,255,.1)',borderRadius:8,fontSize:13,fontFamily:'var(--sans)',outline:'none',background:'rgba(255,255,255,.06)',color:'#fff',transition:'border-color .15s'}}
          onFocus={e=>e.target.style.borderColor='var(--orange)'}
          onBlur={e=>e.target.style.borderColor='rgba(255,255,255,.1)'}
        />
        <button onClick={()=>!loading&&send()}
          style={{background:'var(--orange)',color:'#fff',border:'none',borderRadius:8,padding:'9px 16px',fontSize:14,cursor:'pointer',fontWeight:500,transition:'background .2s',flexShrink:0}}
          onMouseOver={e=>e.currentTarget.style.background='#b84e00'}
          onMouseOut={e=>e.currentTarget.style.background='var(--orange)'}>
          →
        </button>
      </div>
    </div>
  )
}
