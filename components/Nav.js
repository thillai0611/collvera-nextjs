'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/colleges', label: 'Explore' },
  { href: '/compare', label: 'Compare' },
  { href: '/eligibility', label: 'Eligibility' },
  { href: '/predictor', label: 'Rank Predictor' },
  { href: '/rankings', label: 'Rankings' },
  { href: '/blog', label: 'Blog' },
]

export default function Nav({ onLeadOpen }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <nav style={{ position:'sticky', top:0, zIndex:100, background:'rgba(247,244,239,0.97)', backdropFilter:'blur(12px)', borderBottom:'1px solid rgba(26,18,8,0.1)', padding:'0 24px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', height:60 }}>
          <Link href="/" style={{ display:'flex', alignItems:'baseline', gap:4, textDecoration:'none' }}>
            <span style={{ fontFamily:'var(--font-display)', fontSize:'1.3rem', fontWeight:700, color:'var(--ink)' }}>Collvera</span>
            <span style={{ fontSize:10, fontWeight:600, color:'var(--orange)', background:'var(--orange-light)', padding:'2px 6px', borderRadius:4, marginLeft:4, letterSpacing:'0.06em' }}>AI</span>
          </Link>

          <div className="desktop-nav" style={{ display:'flex', gap:2, alignItems:'center', flex:1, justifyContent:'center' }}>
            {links.map(l => (
              <Link key={l.href} href={l.href} style={{
                padding:'6px 10px', borderRadius:6, fontSize:12, fontWeight:500, textDecoration:'none',
                background: pathname === l.href ? 'var(--orange-light)' : 'transparent',
                color: pathname === l.href ? 'var(--orange)' : 'var(--ink2)',
                whiteSpace:'nowrap',
              }}>{l.label}</Link>
            ))}
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:12, flexShrink:0 }}>
            <button className="btn btn-primary btn-sm desktop-cta" onClick={onLeadOpen}>Free Counselling →</button>
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ display:'none', background:'none', border:'none', cursor:'pointer', padding:4, flexDirection:'column', gap:5 }}>
              <span style={{ display:'block', width:22, height:2, background:'var(--ink)', borderRadius:2, transition:'all 0.2s', transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }}></span>
              <span style={{ display:'block', width:22, height:2, background:'var(--ink)', borderRadius:2, opacity: menuOpen ? 0 : 1, transition:'all 0.2s' }}></span>
              <span style={{ display:'block', width:22, height:2, background:'var(--ink)', borderRadius:2, transition:'all 0.2s', transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }}></span>
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div style={{ position:'fixed', top:60, left:0, right:0, bottom:0, background:'rgba(247,244,239,0.99)', zIndex:99, padding:'16px 24px', overflowY:'auto' }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{
              display:'block', padding:'16px 8px', borderBottom:'1px solid var(--border2)',
              fontSize:'1rem', fontWeight:500, textDecoration:'none',
              color: pathname === l.href ? 'var(--orange)' : 'var(--ink)',
              fontFamily:'var(--font-display)',
            }}>{l.label}</Link>
          ))}
          <button className="btn btn-primary" onClick={() => { onLeadOpen(); setMenuOpen(false); }} style={{ width:'100%', justifyContent:'center', marginTop:20, padding:14 }}>
            Get Free Counselling →
          </button>
        </div>
      )}
    </>
  )
}
