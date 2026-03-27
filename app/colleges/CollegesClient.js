'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import Nav from '../../components/Nav'
import LeadModal from '../../components/LeadModal'

export default function CollegesClient({ initialColleges }) {
  const [leadOpen, setLeadOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('')
  const [tier, setTier] = useState('')
  const [maxFees, setMaxFees] = useState('')
  const [sort, setSort] = useState('nirf')

  const cities = [...new Set(initialColleges.map(c => c.city).filter(Boolean))].sort()

  const filtered = useMemo(() => {
    let list = initialColleges.filter(c => {
      if (search && !c.name?.toLowerCase().includes(search.toLowerCase())) return false
      if (city && c.city !== city) return false
      if (tier && c.tier !== parseInt(tier)) return false
      if (maxFees && c.min_fees > parseInt(maxFees)) return false
      return true
    })
    list.sort((a, b) => {
      if (sort === 'nirf') return (a.nirf_rank || 999) - (b.nirf_rank || 999)
      if (sort === 'package') return (b.latest_avg_package || 0) - (a.latest_avg_package || 0)
      if (sort === 'fees') return (a.min_fees || 0) - (b.min_fees || 0)
      return 0
    })
    return list
  }, [initialColleges, search, city, tier, maxFees, sort])

  // Fallback if no data yet
  const hasData = initialColleges.length > 0

  return (
    <div style={{ minHeight:'100vh' }}>
      <Nav onLeadOpen={() => setLeadOpen(true)} />
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'32px 24px 60px' }}>
        <div style={{ marginBottom:32 }}>
          <h1 style={{ fontSize:'2rem', fontWeight:700, marginBottom:8 }}>Explore MBA Colleges</h1>
          <p style={{ color:'var(--muted)', fontSize:14 }}>Browse and filter 100+ MBA & PGDM colleges across India</p>
        </div>

        {/* Filters */}
        <div style={{ display:'flex', gap:12, marginBottom:28, flexWrap:'wrap' }}>
          <input placeholder="Search college..." value={search} onChange={e => setSearch(e.target.value)} style={{ minWidth:200, flex:1 }} />
          <select value={city} onChange={e => setCity(e.target.value)} style={{ width:'auto', minWidth:130 }}>
            <option value="">All Cities</option>
            {cities.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={tier} onChange={e => setTier(e.target.value)} style={{ width:'auto', minWidth:110 }}>
            <option value="">All Tiers</option>
            <option value="1">Tier 1</option>
            <option value="2">Tier 2</option>
            <option value="3">Tier 3</option>
          </select>
          <select value={maxFees} onChange={e => setMaxFees(e.target.value)} style={{ width:'auto', minWidth:140 }}>
            <option value="">Any Fees</option>
            <option value="500000">Under ₹5L</option>
            <option value="1500000">Under ₹15L</option>
            <option value="2500000">Under ₹25L</option>
          </select>
          <select value={sort} onChange={e => setSort(e.target.value)} style={{ width:'auto', minWidth:160 }}>
            <option value="nirf">Sort: NIRF Rank</option>
            <option value="package">Sort: Avg Package</option>
            <option value="fees">Sort: Fees Low-High</option>
          </select>
        </div>

        {!hasData ? (
          <div style={{ textAlign:'center', padding:'80px 20px' }}>
            <div style={{ fontSize:40, marginBottom:16 }}>🏗️</div>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'1.4rem', marginBottom:8 }}>College data loading soon</h2>
            <p style={{ color:'var(--muted)', fontSize:14, marginBottom:24 }}>We're curating verified data for 100+ colleges. Meanwhile, our AI can answer your questions.</p>
            <button className="btn btn-primary" onClick={() => setLeadOpen(true)}>Get Free Counselling →</button>
          </div>
        ) : (
          <>
            <div style={{ fontSize:13, color:'var(--muted)', marginBottom:20 }}>Showing {filtered.length} colleges</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:20 }}>
              {filtered.map(c => (
                <div key={c.id} className="card" style={{ padding:0, overflow:'hidden', transition:'transform 0.2s'}}
                  onMouseEnter={e => e.currentTarget.style.transform='translateY(-3px)'}
                  onMouseLeave={e => e.currentTarget.style.transform='none'}>
                  <div style={{ height:4, background:c.color || 'var(--orange)' }}></div>
                  <div style={{ padding:'18px 20px' }}>
                    <div style={{ fontSize:11, color:'var(--muted)', marginBottom:3 }}>#{c.nirf_rank} NIRF</div>
                    <h3 style={{ fontSize:'1rem', fontWeight:700, fontFamily:'var(--font-display)', marginBottom:4 }}>{c.name}</h3>
                    <div style={{ fontSize:12, color:'var(--muted)', marginBottom:12 }}>📍 {c.city}, {c.state}</div>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:14 }}>
                      <div style={{ background:'var(--cream)', borderRadius:8, padding:'8px 10px' }}>
                        <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>AVG PACKAGE</div>
                        <div style={{ fontSize:13, fontWeight:700 }}>{c.latest_avg_package ? `₹${(c.latest_avg_package/100000).toFixed(0)} LPA` : 'N/A'}</div>
                      </div>
                      <div style={{ background:'var(--cream)', borderRadius:8, padding:'8px 10px' }}>
                        <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>FEES FROM</div>
                        <div style={{ fontSize:13, fontWeight:700 }}>{c.min_fees ? `₹${(c.min_fees/100000).toFixed(0)}L` : 'N/A'}</div>
                      </div>
                    </div>
                    <div style={{ display:'flex', gap:8 }}>
                      <Link href={`/colleges/${c.slug}`} className="btn btn-primary btn-sm" style={{ flex:1, justifyContent:'center', textDecoration:'none' }}>
                        View Details
                      </Link>
                      <button className="btn btn-outline btn-sm" style={{ flex:1, justifyContent:'center' }} onClick={() => setLeadOpen(true)}>
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)} context="College Explorer" />
    </div>
  )
}
