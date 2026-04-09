'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import Nav from '../../components/Nav'
import LeadModal from '../../components/LeadModal'

function fmtFees(n) {
  if (!n) return null
  const l = n / 100000
  return `₹${l >= 10 ? Math.round(l) : l.toFixed(1)}L`
}
function fmtPkg(n) {
  if (!n) return null
  return `₹${(n / 100000).toFixed(1)} LPA`
}

const TIER_LABEL = { 1: 'IIM / Premier', 2: 'Top Private', 3: 'Regional' }

export default function CollegesClient({ initialColleges }) {
  const [leadOpen, setLeadOpen] = useState(false)
  const [search,   setSearch]   = useState('')
  const [city,     setCity]     = useState('')
  const [tier,     setTier]     = useState('')
  const [maxFees,  setMaxFees]  = useState('')
  const [sort,     setSort]     = useState('nirf')

  const cities = useMemo(
    () => [...new Set(initialColleges.map(c => c.city).filter(Boolean))].sort(),
    [initialColleges]
  )

  const filtered = useMemo(() => {
    let list = initialColleges.filter(c => {
      if (search  && !c.name?.toLowerCase().includes(search.toLowerCase())) return false
      if (city    && c.city !== city)                   return false
      if (tier    && c.tier !== parseInt(tier))         return false
      if (maxFees && c.min_fees > parseInt(maxFees))    return false
      return true
    })
    list.sort((a, b) => {
      if (sort === 'nirf')    return (a.nirf_rank || 999) - (b.nirf_rank || 999)
      if (sort === 'package') return (b.latest_avg_package || 0) - (a.latest_avg_package || 0)
      if (sort === 'fees')    return (a.min_fees || 0) - (b.min_fees || 0)
      return 0
    })
    return list
  }, [initialColleges, search, city, tier, maxFees, sort])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <Nav onLeadOpen={() => setLeadOpen(true)} />

      {/* HERO */}
      <div style={{ background: 'var(--ink)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 36px' }}>
          <p style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'rgba(255,255,255,.3)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 10 }}>India · MBA · 2026</p>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,3.5vw,2.8rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: 8 }}>Find Your MBA</h1>
          <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,.4)', lineHeight: 1.7, maxWidth: 500, margin: 0 }}>Browse every top Indian B-school — ranked, compared, and verified with fees, placements, and Claude's honest verdict.</p>
        </div>
      </div>

      {/* FILTERS — sticky */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '12px 24px', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>

          {/* search */}
          <div style={{ position: 'relative', minWidth: 180, flex: '1 1 180px' }}>
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', fontSize: 13, pointerEvents: 'none' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
              style={{ width: '100%', paddingLeft: 30, height: 36, borderRadius: 8, border: '1.5px solid var(--border)', fontSize: 13, background: 'var(--cream)', boxSizing: 'border-box' }} />
          </div>

          {/* city */}
          <select value={city} onChange={e => setCity(e.target.value)}
            style={{ height: 36, borderRadius: 8, border: '1.5px solid var(--border)', fontSize: 13, background: 'var(--cream)', padding: '0 10px', cursor: 'pointer' }}>
            <option value="">All Cities</option>
            {cities.map(c => <option key={c}>{c}</option>)}
          </select>

          {/* tier */}
          <select value={tier} onChange={e => setTier(e.target.value)}
            style={{ height: 36, borderRadius: 8, border: '1.5px solid var(--border)', fontSize: 13, background: 'var(--cream)', padding: '0 10px', cursor: 'pointer' }}>
            <option value="">All Tiers</option>
            <option value="1">Tier 1</option>
            <option value="2">Tier 2</option>
            <option value="3">Tier 3</option>
          </select>

          {/* fees */}
          <select value={maxFees} onChange={e => setMaxFees(e.target.value)}
            style={{ height: 36, borderRadius: 8, border: '1.5px solid var(--border)', fontSize: 13, background: 'var(--cream)', padding: '0 10px', cursor: 'pointer' }}>
            <option value="">Any Fees</option>
            <option value="500000">Under ₹5L</option>
            <option value="1500000">Under ₹15L</option>
            <option value="2500000">Under ₹25L</option>
          </select>

          {/* sort pills */}
          <div style={{ display: 'flex', gap: 6, marginLeft: 'auto' }}>
            {[['nirf','NIRF Rank'],['fees','Fees ↑'],['package','Package ↓']].map(([v,l]) => (
              <button key={v} onClick={() => setSort(v)}
                style={{ height: 34, padding: '0 14px', borderRadius: 20, border: `1.5px solid ${sort===v ? 'var(--orange)' : 'var(--border)'}`, background: sort===v ? 'var(--orange)' : 'transparent', color: sort===v ? '#fff' : 'var(--ink2)', fontSize: 12.5, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .15s' }}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* LIST */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 24px 80px' }}>

        <p style={{ fontSize: 12.5, fontFamily: 'var(--mono)', color: 'var(--muted)', marginBottom: 16 }}>
          {filtered.length} colleges
          {(city || tier || maxFees) && (
            <button onClick={() => { setCity(''); setTier(''); setMaxFees('') }}
              style={{ marginLeft: 10, fontSize: 11, color: 'var(--orange)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--mono)' }}>
              clear filters ✕
            </button>
          )}
        </p>

        {/* column headers */}
        <div style={{ display: 'grid', gridTemplateColumns: '56px minmax(0,1fr) 100px 120px 130px 150px', gap: '0 16px', padding: '6px 20px', marginBottom: 6 }}>
          {['Rank','College','Fees','Package','Tier',''].map((h,i) => (
            <div key={i} style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.1em' }}>{h}</div>
          ))}
        </div>

        {/* rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {filtered.map(c => {
            const fees = fmtFees(c.min_fees)
            const pkg  = fmtPkg(c.latest_avg_package)
            const color = c.color || 'var(--orange)'

            return (
              <Link key={c.id} href={`/colleges/${c.slug}`}
                style={{ textDecoration: 'none', display: 'grid', gridTemplateColumns: '56px minmax(0,1fr) 100px 120px 130px 150px', gap: '0 16px', alignItems: 'center', background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 12, padding: '14px 20px', transition: 'border-color .15s, box-shadow .15s', position: 'relative', overflow: 'hidden' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.boxShadow = `0 2px 16px rgba(0,0,0,.06)` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                {/* left accent */}
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: color, borderRadius: '12px 0 0 12px' }} />

                {/* rank */}
                <div style={{ paddingLeft: 6 }}>
                  {c.nirf_rank ? (
                    <>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>#{c.nirf_rank}</div>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--muted)', marginTop: 1 }}>NIRF</div>
                    </>
                  ) : <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)' }}>—</div>}
                </div>

                {/* name */}
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3, marginBottom: 2 }}>{c.name}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>📍 {c.city}, {c.state}</div>
                </div>

                {/* fees */}
                <div>
                  {fees
                    ? <><div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink)' }}>{fees}</div><div style={{ fontSize: 9.5, fontFamily: 'var(--mono)', color: 'var(--muted)', marginTop: 1 }}>fees from</div></>
                    : <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>Contact</div>
                  }
                </div>

                {/* package */}
                <div>
                  {pkg
                    ? <><div style={{ fontSize: 13.5, fontWeight: 700, color }}>{pkg}</div><div style={{ fontSize: 9.5, fontFamily: 'var(--mono)', color: 'var(--muted)', marginTop: 1 }}>avg pkg</div></>
                    : <div style={{ fontSize: 11.5, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>See profile →</div>
                  }
                </div>

                {/* tier */}
                <div>
                  <span style={{ fontSize: 11, padding: '3px 9px', borderRadius: 20, background: c.tier === 1 ? '#fff5ee' : 'var(--cream)', color: c.tier === 1 ? 'var(--orange)' : 'var(--muted)', fontFamily: 'var(--mono)', fontWeight: 500, border: `1px solid ${c.tier === 1 ? 'rgba(217,95,2,.25)' : 'var(--border)'}`, whiteSpace: 'nowrap' }}>
                    {TIER_LABEL[c.tier] || 'Other'}
                  </span>
                </div>

                {/* cta */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: color, background: 'transparent', padding: '7px 16px', borderRadius: 8, border: `1.5px solid ${color}40`, whiteSpace: 'nowrap' }}>
                    View Details →
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* bottom CTA */}
        <div style={{ marginTop: 40, background: 'var(--ink)', borderRadius: 16, padding: '32px 28px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: 8 }}>Not sure which college fits your profile?</div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,.45)', marginBottom: 22, lineHeight: 1.7, maxWidth: 440, margin: '0 auto 22px' }}>Enter your CAT percentile. Claude finds your realistic options from all colleges above.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/eligibility" style={{ background: 'var(--orange)', color: '#fff', padding: '11px 24px', borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Check my eligibility →</Link>
            <Link href="/compare"     style={{ background: 'rgba(255,255,255,.08)', color: 'rgba(255,255,255,.7)', padding: '11px 24px', borderRadius: 10, fontSize: 14, border: '1px solid rgba(255,255,255,.15)', textDecoration: 'none' }}>Compare colleges</Link>
          </div>
        </div>
      </div>

      <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)} context="College Explorer" />

      <style>{`
        @media (max-width: 900px) {
          .college-row { grid-template-columns: 48px 1fr 90px 110px !important; }
        }
        @media (max-width: 640px) {
          .college-row { grid-template-columns: 48px 1fr !important; }
        }
        input:focus, select:focus { outline: none; border-color: var(--orange) !important; }
      `}</style>
    </div>
  )
}
