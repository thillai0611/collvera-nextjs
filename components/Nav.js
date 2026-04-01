'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href:'/colleges', label:'Colleges' },
  { href:'/compare', label:'Compare' },
  { href:'/eligibility', label:'Eligibility' },
  { href:'/exams', label:'Exams' },
  { href:'/rankings', label:'Rankings' },
  { href:'/mba-game', label:'🎮 MBA Game' },
  { href:'/blog', label:'Blog' },
]

export default function Nav({ onLeadOpen }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <nav style={{ position:'sticky',top:0,zIndex:200,background:'rgba(6,5,4,.96)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,.06)',padding:'0 24px',height:54,display:'flex',alignItems:'center',justifyContent:'space-between' }}>
        <Link href="/" style={{ display:'flex',alignItems:'center',gap:8,textDecoration:'none',flexShrink:0 }}>
          <span style={{ fontFamily:'var(--serif)',fontSize:'1.2rem',fontWeight:700,color:'#fff' }}>Collvera</span>
          <span style={{ fontSize:9,color:'#1D9E75',background:'rgba(29,158,117,.15)',padding:'3px 8px',borderRadius:20,letterSpacing:'.06em',fontFamily:'var(--mono)',border:'1px solid rgba(29,158,117,.25)',display:'flex',alignItems:'center',gap:4 }}>
            <span style={{ width:5,height:5,borderRadius:'50%',background:'#1D9E75',animation:'blink 2s ease-in-out infinite' }}></span>
            Claude · live
          </span>
        </Link>

        <div className="desktop-only" style={{ display:'flex',gap:2 }}>
          {links.map(l => (
            <Link key={l.href+l.label} href={l.href} style={{ padding:'5px 11px',borderRadius:6,fontSize:12,color:pathname===l.href?'#fff':'rgba(255,255,255,.5)',background:pathname===l.href?'rgba(255,255,255,.08)':'transparent',textDecoration:'none',transition:'all .15s' }}>
              {l.label}
            </Link>
          ))}
        </div>

        <div style={{ display:'flex',alignItems:'center',gap:10 }}>
          <div className="desktop-only" style={{ fontSize:10,fontFamily:'var(--mono)',color:'rgba(255,255,255,.3)',display:'flex',alignItems:'center',gap:5 }}>
            <span style={{ width:5,height:5,borderRadius:'50%',background:'#1D9E75',animation:'blink 2s ease-in-out infinite' }}></span>
            AI processing queries
          </div>
          {onLeadOpen && (
            <button onClick={onLeadOpen} style={{ background:'var(--orange)',color:'#fff',padding:'7px 14px',borderRadius:7,fontSize:12,cursor:'pointer',border:'none',fontWeight:500 }}>
              Free Counselling →
            </button>
          )}
          <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-hamburger" style={{ display:'none',background:'none',border:'none',cursor:'pointer',padding:4,flexDirection:'column',gap:5 }}>
            <span style={{ display:'block',width:22,height:2,background:'#fff',borderRadius:2,transition:'all .2s',transform:menuOpen?'rotate(45deg) translate(5px,5px)':'none' }}></span>
            <span style={{ display:'block',width:22,height:2,background:'#fff',borderRadius:2,transition:'all .2s',opacity:menuOpen?0:1 }}></span>
            <span style={{ display:'block',width:22,height:2,background:'#fff',borderRadius:2,transition:'all .2s',transform:menuOpen?'rotate(-45deg) translate(5px,-5px)':'none' }}></span>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div style={{ position:'fixed',top:54,left:0,right:0,bottom:0,background:'rgba(6,5,4,.98)',zIndex:199,padding:'16px 24px',overflowY:'auto' }}>
          {links.map(l => (
            <Link key={l.href+l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{ display:'block',padding:'16px 8px',borderBottom:'1px solid rgba(255,255,255,.06)',fontSize:'1rem',fontWeight:500,textDecoration:'none',color:pathname===l.href?'var(--orange)':'rgba(255,255,255,.8)',fontFamily:'var(--serif)' }}>{l.label}</Link>
          ))}
          <button onClick={() => { onLeadOpen?.(); setMenuOpen(false); }} style={{ width:'100%',marginTop:20,padding:14,background:'var(--orange)',color:'#fff',border:'none',borderRadius:8,fontSize:14,cursor:'pointer' }}>
            Get Free Counselling →
          </button>
        </div>
      )}

      <style>{`
        @media(max-width:768px){
          .desktop-only{display:none!important}
          .mobile-hamburger{display:flex!important}
        }
      `}</style>
    </>
  )
}
