'use client'
import { useState, useRef, useEffect } from 'react'
import { detectIntent, generateResponse, logQuery } from '../lib/chatEngine'
import Link from 'next/link'

const SUGGESTIONS = [
  "IIM Ahmedabad fees and placements",
  "Colleges for 95 percentile CAT",
  "Is FMS better than IIM Lucknow?",
  "Best MBA for finance in India",
  "ISB vs IIM A — which to choose?",
  "CAT cutoff for MDI Gurgaon",
]

function CollegeCard({ college, aspect, cta, eligibilityCta }) {
  const fmt = (n) => n ? `₹${(n/100000).toFixed(1)}L` : '—'
  return (
    <div style={{background:'var(--white)',border:'1px solid var(--border)',borderRadius:12,overflow:'hidden',marginBottom:8}}>
      <div style={{height:3,background:'var(--orange)'}}></div>
      <div style={{padding:'14px 16px'}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
          <span style={{fontSize:24}}>{college.emoji}</span>
          <div>
            <div style={{fontFamily:'var(--serif)',fontSize:'1rem',fontWeight:700}}>{college.name}</div>
            <div style={{fontSize:11,color:'var(--muted)',fontFamily:'var(--mono)'}}>{college.city} · NIRF #{college.nirf || 'N/A'}</div>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginBottom:12}}>
          {[
            ['Fees',fmt(college.fees)],
            ['Avg Pkg',fmt(college.avgPkg)],
            ['Cutoff',college.cutoff],
          ].map(([l,v])=>(
            <div key={l} style={{background:'var(--cream)',borderRadius:8,padding:'8px 10px',textAlign:'center'}}>
              <div style={{fontSize:9.5,color:'var(--muted)',fontFamily:'var(--mono)',marginBottom:2}}>{l}</div>
              <div style={{fontSize:13,fontWeight:600,color:'var(--ink)'}}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          {college.tags.map(t=><span key={t} style={{fontSize:9.5,fontFamily:'var(--mono)',padding:'2px 8px',borderRadius:8,background:'var(--cream2)',color:'var(--muted)'}}>{t}</span>)}
        </div>
        <div style={{display:'flex',gap:8,marginTop:12}}>
          <Link href={cta.href} style={{flex:1,background:'var(--ink)',color:'#fff',padding:'8px 12px',borderRadius:7,fontSize:12,fontWeight:500,textAlign:'center',textDecoration:'none'}}>{cta.label}</Link>
          <Link href={eligibilityCta.href} style={{flex:1,background:'var(--orange-lt)',color:'var(--orange)',padding:'8px 12px',borderRadius:7,fontSize:12,fontWeight:500,textAlign:'center',textDecoration:'none',border:'1px solid var(--orange)'}}>{eligibilityCta.label}</Link>
        </div>
      </div>
    </div>
  )
}

function CollegeList({ colleges, cta, tip }) {
  return (
    <div>
      {tip && <div style={{fontSize:12.5,color:'var(--ink2)',marginBottom:10,padding:'8px 12px',background:'var(--cream)',borderRadius:8,borderLeft:'3px solid var(--orange)'}}>{tip}</div>}
      {colleges.map(c=>(
        <div key={c.slug} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 12px',border:'1px solid var(--border2)',borderRadius:8,marginBottom:6,background:'var(--white)'}}>
          <span style={{fontSize:18}}>{c.emoji}</span>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:500}}>{c.name}</div>
            <div style={{fontSize:11,color:'var(--muted)',fontFamily:'var(--mono)'}}>{c.cutoff} · ₹{(c.avgPkg/100000).toFixed(0)} LPA avg</div>
          </div>
          <Link href={`/colleges/${c.slug}`} style={{fontSize:11,color:'var(--blue)',textDecoration:'none'}}>View →</Link>
        </div>
      ))}
      <Link href={cta.href} style={{display:'block',width:'100%',background:'var(--ink)',color:'#fff',padding:'10px',borderRadius:8,fontSize:13,fontWeight:500,textAlign:'center',textDecoration:'none',marginTop:8}}>{cta.label}</Link>
    </div>
  )
}

function Message({ msg }) {
  const isUser = msg.role === 'user'
  const r = msg.response

  return (
    <div style={{display:'flex',justifyContent:isUser?'flex-end':'flex-start',marginBottom:12}}>
      {!isUser && <div style={{width:28,height:28,borderRadius:'50%',background:'var(--ink)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,flexShrink:0,marginRight:8,marginTop:2}}>AI</div>}
      <div style={{maxWidth:'85%'}}>
        {isUser ? (
          <div style={{background:'var(--ink)',color:'#fff',padding:'10px 14px',borderRadius:'16px 16px 4px 16px',fontSize:13,lineHeight:1.5}}>{msg.text}</div>
        ) : (
          <div>
            {msg.text && <div style={{background:'var(--cream)',padding:'10px 14px',borderRadius:'16px 16px 16px 4px',fontSize:13,lineHeight:1.65,color:'var(--ink)',marginBottom:r?8:0}}>{msg.text}</div>}
            {r?.type === 'college_card' && <CollegeCard {...r} />}
            {r?.type === 'college_list' && <CollegeList {...r} />}
            {r?.type === 'eligibility_push' && (
              <div style={{background:'var(--orange-lt)',border:'1px solid var(--orange)',borderRadius:12,padding:'14px 16px'}}>
                <div style={{fontSize:13,color:'var(--ink2)',marginBottom:10,lineHeight:1.65}}>{r.text}</div>
                <Link href={r.cta.href} style={{display:'block',background:'var(--orange)',color:'#fff',padding:'9px 14px',borderRadius:7,fontSize:13,fontWeight:500,textAlign:'center',textDecoration:'none',marginBottom:6}}>{r.cta.label}</Link>
                {r.followUp && <div style={{fontSize:11.5,color:'var(--muted)',textAlign:'center'}}>{r.followUp}</div>}
              </div>
            )}
            {(r?.type === 'text' || r?.type === 'comparison' || r?.type === 'general') && r?.text && (
              <div>
                <div style={{background:'var(--cream)',padding:'10px 14px',borderRadius:'0 16px 16px 4px',fontSize:13,lineHeight:1.65,color:'var(--ink)',marginBottom:8}}>{r.text}</div>
                <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                  {r.cta && <Link href={r.cta.href} style={{background:'var(--ink)',color:'#fff',padding:'7px 12px',borderRadius:7,fontSize:12,fontWeight:500,textDecoration:'none'}}>{r.cta.label}</Link>}
                  {r.eligibilityCta && <Link href={r.eligibilityCta.href} style={{background:'var(--orange-lt)',color:'var(--orange)',padding:'7px 12px',borderRadius:7,fontSize:12,fontWeight:500,textDecoration:'none',border:'1px solid var(--orange)'}}>{r.eligibilityCta.label}</Link>}
                </div>
              </div>
            )}
            {r?.needsAI && (
              <div style={{background:'var(--cream)',padding:'10px 14px',borderRadius:'0 16px 16px 4px',fontSize:13,color:'var(--muted)'}}>
                I don't have a specific answer for that yet. Try our <Link href="/eligibility" style={{color:'var(--orange)'}}>eligibility checker</Link> or <Link href="/colleges" style={{color:'var(--orange)'}}>browse colleges</Link>.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ── FLOATING CHAT BUTTON (shows on all pages) ────────────────
export function FloatingChat() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div style={{position:'fixed',bottom:24,right:24,zIndex:1000}}>
        <button onClick={()=>setOpen(!open)} style={{width:52,height:52,borderRadius:'50%',background:'var(--ink)',color:'#fff',border:'none',cursor:'pointer',fontSize:22,boxShadow:'0 4px 20px rgba(14,12,8,.25)',transition:'all .2s',display:'flex',alignItems:'center',justifyContent:'center'}}
          onMouseOver={e=>e.currentTarget.style.background='var(--orange)'}
          onMouseOut={e=>e.currentTarget.style.background='var(--ink)'}>
          {open ? '✕' : '💬'}
        </button>
      </div>
      {open && (
        <div style={{position:'fixed',bottom:88,right:24,width:360,zIndex:1000,boxShadow:'0 8px 40px rgba(14,12,8,.2)',borderRadius:16,overflow:'hidden'}}>
          <ChatWidget onClose={()=>setOpen(false)} compact />
        </div>
      )}
    </>
  )
}

// ── MAIN CHAT WIDGET ─────────────────────────────────────────
export default function ChatWidget({ onClose, compact = false }) {
  const [messages, setMessages] = useState([
    { role:'ai', text:'Hi! Ask me anything about MBA colleges in India — fees, placements, cutoffs, comparisons, or which college suits your profile.', response:null }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:'smooth'}) },[messages])

  async function send(text) {
    const query = text || input.trim()
    if (!query) return
    setInput('')
    setMessages(prev=>[...prev,{role:'user',text:query,response:null}])
    setLoading(true)

    // Log the query for content insights
    logQuery(query, detectIntent(query),
      'https://atcsvmnnhcxnudfxyrke.supabase.co',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    )

    await new Promise(r=>setTimeout(r,600)) // feel natural

    const intent = detectIntent(query)
    const response = generateResponse(intent, query)

    let aiText = null
    if (response.type === 'college_card') aiText = `Here's what I know about ${response.college.name}:`
    else if (response.type === 'college_list') aiText = response.text
    else if (response.type === 'eligibility_push') aiText = null
    else aiText = null

    setMessages(prev=>[...prev,{role:'ai',text:aiText,response}])
    setLoading(false)
  }

  return (
    <div style={{background:'var(--white)',display:'flex',flexDirection:'column',height:compact?480:600}}>
      {/* Header */}
      <div style={{background:'var(--ink)',padding:'14px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',flexShrink:0}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{width:8,height:8,borderRadius:'50%',background:'#1D9E75',animation:'blink 2s ease-in-out infinite'}}></div>
          <span style={{fontFamily:'var(--serif)',fontSize:'1rem',fontWeight:600,color:'#fff'}}>Collvera AI</span>
          <span style={{fontSize:9,color:'rgba(255,255,255,.4)',fontFamily:'var(--mono)'}}>MBA Guide</span>
        </div>
        {onClose && <button onClick={onClose} style={{background:'none',border:'none',color:'rgba(255,255,255,.5)',cursor:'pointer',fontSize:14}}>✕</button>}
      </div>

      {/* Messages */}
      <div style={{flex:1,overflowY:'auto',padding:'16px 14px',background:'var(--cream)'}}>
        {messages.map((m,i)=><Message key={i} msg={m}/>)}
        {loading && (
          <div style={{display:'flex',gap:8,alignItems:'center',padding:'10px 14px'}}>
            <div style={{width:28,height:28,borderRadius:'50%',background:'var(--ink)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,flexShrink:0}}>AI</div>
            <div style={{background:'var(--white)',padding:'10px 14px',borderRadius:'16px 16px 16px 4px',fontSize:13,color:'var(--muted)'}}>
              Thinking<span style={{animation:'blink 1s ease-in-out infinite'}}>...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div style={{padding:'8px 14px',borderTop:'1px solid var(--border2)',background:'var(--white)',overflowX:'auto',display:'flex',gap:6,flexShrink:0}}>
          {SUGGESTIONS.slice(0,compact?3:6).map(s=>(
            <button key={s} onClick={()=>send(s)} style={{whiteSpace:'nowrap',padding:'5px 10px',borderRadius:20,border:'1px solid var(--border)',background:'var(--cream)',fontSize:11,cursor:'pointer',color:'var(--ink2)',transition:'all .15s',fontFamily:'var(--sans)'}}
              onMouseOver={e=>e.currentTarget.style.borderColor='var(--orange)'}
              onMouseOut={e=>e.currentTarget.style.borderColor='var(--border)'}>
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{padding:'12px 14px',borderTop:'1px solid var(--border)',background:'var(--white)',display:'flex',gap:8,flexShrink:0}}>
        <input
          value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>e.key==='Enter'&&send()}
          placeholder="Ask about any MBA college..."
          style={{flex:1,padding:'9px 14px',border:'1.5px solid var(--border)',borderRadius:8,fontSize:13,fontFamily:'var(--sans)',outline:'none',background:'var(--cream)',transition:'border-color .15s'}}
          onFocus={e=>e.target.style.borderColor='var(--orange)'}
          onBlur={e=>e.target.style.borderColor='var(--border)'}
        />
        <button onClick={()=>send()} style={{background:'var(--orange)',color:'#fff',border:'none',borderRadius:8,padding:'9px 16px',fontSize:13,cursor:'pointer',fontWeight:500,transition:'background .2s'}}
          onMouseOver={e=>e.currentTarget.style.background='var(--orange2)'}
          onMouseOut={e=>e.currentTarget.style.background='var(--orange)'}>
          →
        </button>
      </div>
    </div>
  )
}
