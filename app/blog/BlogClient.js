'use client'
import { useState } from 'react'
import Link from 'next/link'
import Nav from '../../components/Nav'
import LeadModal from '../../components/LeadModal'

const categories = ['All', 'CAT Cutoffs', 'College Comparison', 'College Deep Dive', 'CAT Prep', 'MBA Basics', 'Fees and ROI', 'City Guide']

export default function BlogClient({ posts }) {
  const [leadOpen, setLeadOpen] = useState(false)
  const [category, setCategory] = useState('All')

  const filtered = category === 'All' ? posts : posts.filter(p => p.category === category)

  const trending = posts.filter(p =>
    ['CAT Cutoffs', 'College Comparison', 'CAT Prep'].includes(p.category)
  ).slice(0, 3)

  return (
    <div style={{ minHeight:'100vh' }}>
      <Nav onLeadOpen={() => setLeadOpen(true)} />
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'32px 24px 60px' }}>

        <div style={{ marginBottom:32 }}>
          <h1 style={{ fontSize:'2rem', fontWeight:700, marginBottom:8 }}>MBA Guides & Resources</h1>
          <p style={{ color:'var(--muted)', fontSize:14 }}>Everything you need to know about MBA admissions in India — cutoffs, fees, comparisons and prep strategy.</p>
        </div>

        {/* Trending */}
        {trending.length > 0 && category === 'All' && (
          <div style={{ marginBottom:36 }}>
            <div style={{ fontSize:12, fontWeight:600, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:16 }}>Trending Now</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:20 }}>
              {trending.map(post => (
                <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration:'none' }}>
                  <div className="card" style={{ padding:0, overflow:'hidden', cursor:'pointer', transition:'transform 0.2s', height:'100%' }}
                    onMouseEnter={e => e.currentTarget.style.transform='translateY(-3px)'}
                    onMouseLeave={e => e.currentTarget.style.transform='none'}>
                    <div style={{ height:4, background:'var(--orange)' }}></div>
                    <div style={{ padding:'20px 22px' }}>
                      <div style={{ display:'flex', gap:8, marginBottom:10, flexWrap:'wrap' }}>
                        <span className="tag tag-orange">{post.category}</span>
                        <span style={{ fontSize:11, color:'var(--muted)' }}>{post.read_time}</span>
                      </div>
                      <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1rem', fontWeight:700, lineHeight:1.3, marginBottom:10, color:'var(--ink)' }}>{post.title}</h3>
                      <p style={{ fontSize:13, color:'var(--muted)', lineHeight:1.6, marginBottom:14 }}>{post.description}</p>
                      <div style={{ fontSize:12, color:'var(--orange)', fontWeight:600 }}>Read article →</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div style={{ display:'flex', gap:8, marginBottom:24, flexWrap:'wrap' }}>
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)} style={{
              padding:'7px 16px', borderRadius:20, fontSize:12, fontWeight:500, cursor:'pointer', border:'1px solid',
              background: category===c ? 'var(--orange)' : 'var(--white)',
              color: category===c ? '#fff' : 'var(--ink2)',
              borderColor: category===c ? 'var(--orange)' : 'var(--border)',
            }}>{c}</button>
          ))}
        </div>

        {/* All posts list */}
        <div style={{ fontSize:12, fontWeight:600, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:16 }}>
          {category === 'All' ? `All Articles (${posts.length})` : `${category} (${filtered.length})`}
        </div>

        <div style={{ display:'flex', flexDirection:'column' }}>
          {filtered.map((post, i) => (
            <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration:'none' }}>
              <div style={{ padding:'20px 0', borderBottom:'1px solid var(--border2)', display:'flex', gap:20, alignItems:'flex-start', cursor:'pointer' }}
                onMouseEnter={e => e.currentTarget.querySelector('h3').style.color='var(--orange)'}
                onMouseLeave={e => e.currentTarget.querySelector('h3').style.color='var(--ink)'}>
                <div style={{ width:32, height:32, borderRadius:8, background:'var(--orange-light)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', fontSize:'0.9rem', fontWeight:700, color:'var(--orange)', flexShrink:0 }}>
                  {String(i+1).padStart(2,'0')}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', gap:8, marginBottom:6, flexWrap:'wrap' }}>
                    <span className="tag">{post.category}</span>
                    <span style={{ fontSize:11, color:'var(--muted)' }}>{post.read_time}</span>
                  </div>
                  <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1rem', fontWeight:700, marginBottom:6, color:'var(--ink)', transition:'color 0.15s' }}>{post.title}</h3>
                  <p style={{ fontSize:13, color:'var(--muted)', lineHeight:1.6, margin:0 }}>{post.description}</p>
                </div>
                <div style={{ fontSize:20, color:'var(--muted)', flexShrink:0, alignSelf:'center' }}>→</div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop:40, padding:'28px', background:'var(--ink)', borderRadius:'var(--radius-lg)', textAlign:'center' }}>
          <div style={{ fontFamily:'var(--font-display)', fontSize:'1.1rem', fontWeight:600, color:'#fff', marginBottom:8 }}>Ready to find your college?</div>
          <p style={{ fontSize:13, color:'rgba(255,255,255,0.6)', marginBottom:16 }}>Use our AI tools to check eligibility, compare colleges and predict your rank.</p>
          <button className="btn btn-primary" onClick={() => setLeadOpen(true)}>Get Free Counselling →</button>
        </div>
      </div>

      <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)} context="Blog page" />
    </div>
  )
}
