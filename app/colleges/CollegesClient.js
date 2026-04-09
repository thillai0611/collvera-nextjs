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
      if (city    && c.city !== city)                return false
      if (tier    && c.tier !== parseInt(tier))      return false
      if (maxFees && c.min_fees > parseInt(maxFees)) return false
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
    <div style={{ minHeight: '100vh', background: '#f5f3ef' }}>
      <Nav onLeadOpen={() => setLeadOpen(true)} />

      {/* ── HERO ── */}
      <div style={{ background: 'var(--ink)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '44px 24px 40px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'rgba(255,255,255,.25)', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 12 }}>Collvera · MBA India · 2026</p>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.2rem,4vw,3.2rem)', fontWeight: 700, color: '#fff', lineHeight: 1.05, margin: 0 }}>Find Your MBA</h1>
          </div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,.38)', lineHeight: 1.75, maxWidth: 380, margin: 0 }}>
            Every top Indian B-school ranked and verified — fees, placements, and Claude's honest assessment.
          </p>
        </div>

        {/* ── FILTER BAR inside hero ── */}
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px 0' }}>
          <div style={{ background: 'rgba(255,255,255,.06)', borderRadius: '12px 12px 0 0', border: '1px solid rgba(255,255,255,.1)', borderBottom: 'none', padding: '14px 18px', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>

            {/* search */}
            <div style={{ position: 'relative', flex: '1 1 160px', minWidth: 140 }}>
              <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 12, pointerEvents: 'none', opacity: .5 }}>🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search college..."
                style={{ width: '100%', paddingLeft: 28, height: 34, borderRadius: 7, border: '1px solid rgba(255,255,255,.15)', background: 'rgba(255,255,255,.08)', color: '#fff', fontSize: 13, boxSizing: 'border-box', outline: 'none' }} />
            </div>

            {/* selects */}
            {[
              { val: city,    set: setCity,    opts: [['','All Cities'], ...cities.map(c=>[c,c])] },
              { val: tier,    set: setTier,    opts: [['','All Tiers'],['1','Tier 1'],['2','Tier 2'],['3','Tier 3']] },
              { val: maxFees, set: setMaxFees, opts: [['','Any Fees'],['500000','Under ₹5L'],['1500000','Under ₹15L'],['2500000','Under ₹25L']] },
            ].map((f, i) => (
              <select key={i} value={f.val} onChange={e => f.set(e.target.value)}
                style={{ height: 34, borderRadius: 7, border: '1px solid rgba(255,255,255,.15)', background: 'rgba(255,255,255,.08)', color: '#fff', fontSize: 13, padding: '0 10px', cursor: 'pointer', outline: 'none' }}>
                {f.opts.map(([v,l]) => <option key={v} value={v} style={{ background: '#222', color: '#fff' }}>{l}</option>)}
              </select>
            ))}

            {/* sort pills */}
            <div style={{ display: 'flex', gap: 5, marginLeft: 'auto', flexShrink: 0 }}>
              {[['nirf','NIRF'],['fees','Fees ↑'],['package','Pkg ↓']].map(([v,l]) => (
                <button key={v} onClick={() => setSort(v)}
                  style={{ height: 32, padding: '0 13px', borderRadius: 20, border: `1px solid ${sort===v ? 'var(--orange)' : 'rgba(255,255,255,.2)'}`, background: sort===v ? 'var(--orange)' : 'transparent', color: sort===v ? '#fff' : 'rgba(255,255,255,.55)', fontSize: 12, fontWeight: 500, cursor: 'pointer', transition: 'all .15s', whiteSpace: 'nowrap' }}>
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── LIST ── */}
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px 80px' }}>

        {/* table header */}
        <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 100px 120px 140px 140px', gap: '0 12px', padding: '11px 20px', background: '#fff', borderLeft: '1px solid #e5e0d8', borderRight: '1px solid #e5e0d8', borderBottom: '1px solid #e5e0d8', marginBottom: 0 }}>
          {['Rank','College','Fees From','Avg Package','Tier',''].map((h,i) => (
            <div key={i} style={{ fontSize: 10, fontFamily: 'var(--mono)', color: '#999', textTransform: 'uppercase', letterSpacing: '.1em' }}>{h}</div>
          ))}
        </div>

        {/* count row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 20px 10px', background: '#fff', borderLeft: '1px solid #e5e0d8', borderRight: '1px solid #e5e0d8', borderBottom: '1px solid #eee' }}>
          <span style={{ fontSize: 11.5, fontFamily: 'var(--mono)', color: '#aaa' }}>{filtered.length} colleges</span>
          {(city || tier || maxFees) && (
            <button onClick={() => { setCity(''); setTier(''); setMaxFees('') }}
              style={{ fontSize: 10.5, color: 'var(--orange)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--mono)', padding: 0 }}>
              clear filters ×
            </button>
          )}
        </div>

        {/* college rows */}
        <div style={{ background: '#fff', border: '1px solid #e5e0d8', borderTop: 'none' }}>
          {filtered.map((c, idx) => {
            const fees  = fmtFees(c.min_fees)
            const pkg   = fmtPkg(c.latest_avg_package)
            const color = c.color || 'var(--orange)'
            const isLast = idx === filtered.length - 1

            return (
              <Link key={c.id} href={`/colleges/${c.slug}`}
                style={{ textDecoration: 'none', display: 'grid', gridTemplateColumns: '60px 1fr 100px 120px 140px 140px', gap: '0 12px', alignItems: 'center', padding: '16px 20px', borderTop: idx === 0 ? 'none' : '1px solid #f0ece5', position: 'relative', transition: 'background .12s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#fdf9f5'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {/* accent bar */}
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: color }} />

                {/* rank */}
                <div style={{ paddingLeft: 4 }}>
                  {c.nirf_rank
                    ? <div style={{ fontFamily: 'var(--mono)', fontSize: 15, fontWeight: 800, color: 'var(--ink)', lineHeight: 1 }}>
                        #{c.nirf_rank}
                        <div style={{ fontSize: 8.5, fontWeight: 400, color: '#bbb', marginTop: 2, letterSpacing: '.06em' }}>NIRF</div>
                      </div>
                    : <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: '#ccc' }}>—</div>
                  }
                </div>

                {/* name + location */}
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.25, marginBottom: 3 }}>{c.name}</div>
                  <div style={{ fontSize: 11.5, color: '#aaa', fontFamily: 'var(--mono)', display: 'flex', alignItems: 'center', gap: 3 }}>
                    <span style={{ fontSize: 9 }}>📍</span> {c.city}, {c.state}
                  </div>
                </div>

                {/* fees */}
                <div>
                  {fees
                    ? <><div style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--ink)' }}>{fees}</div>
                        <div style={{ fontSize: 9.5, color: '#bbb', fontFamily: 'var(--mono)', marginTop: 1 }}>fees from</div></>
                    : <div style={{ fontSize: 12, color: '#ccc', fontFamily: 'var(--mono)' }}>Contact</div>
                  }
                </div>

                {/* package */}
                <div>
                  {pkg
                    ? <><div style={{ fontSize: 14.5, fontWeight: 700, color }}>{pkg}</div>
                        <div style={{ fontSize: 9.5, color: '#bbb', fontFamily: 'var(--mono)', marginTop: 1 }}>avg package</div></>
                    : <div style={{ fontSize: 11.5, color: '#c8c0b8', fontFamily: 'var(--mono)' }}>See profile</div>
                  }
                </div>

                {/* tier badge */}
                <div>
                  <span style={{
                    display: 'inline-block', fontSize: 10.5, padding: '4px 10px', borderRadius: 20, fontFamily: 'var(--mono)', fontWeight: 600, whiteSpace: 'nowrap',
                    background: c.tier === 1 ? '#fff5ee' : c.tier === 2 ? '#f5f3ff' : '#f0fdf4',
                    color: c.tier === 1 ? 'var(--orange)' : c.tier === 2 ? '#6d28d9' : '#16a34a',
                    border: `1px solid ${c.tier === 1 ? 'rgba(217,95,2,.2)' : c.tier === 2 ? 'rgba(109,40,217,.15)' : 'rgba(22,163,74,.15)'}`,
                  }}>
                    {c.tier === 1 ? 'Premier IIM' : c.tier === 2 ? 'Top Private' : 'Regional'}
                  </span>
                </div>

                {/* cta */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color, padding: '7px 16px', borderRadius: 8, border: `1.5px solid ${color}33`, background: `${color}0d`, whiteSpace: 'nowrap', transition: 'all .12s' }}>
                    View Details →
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* bottom CTA */}
        <div style={{ marginTop: 40, background: 'var(--ink)', borderRadius: 16, padding: '36px 32px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: 8 }}>Not sure which college fits your profile?</div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,.4)', marginBottom: 24, lineHeight: 1.8, maxWidth: 420, margin: '0 auto 24px' }}>
            Enter your CAT percentile and background. Claude finds your realistic options from all colleges above.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/eligibility" style={{ background: 'var(--orange)', color: '#fff', padding: '12px 26px', borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Check my eligibility →</Link>
            <Link href="/compare"     style={{ background: 'rgba(255,255,255,.07)', color: 'rgba(255,255,255,.65)', padding: '12px 26px', borderRadius: 10, fontSize: 14, border: '1px solid rgba(255,255,255,.13)', textDecoration: 'none' }}>Compare colleges</Link>
          </div>
        </div>
      </div>

      <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)} context="College Explorer" />

      <style>{`
        input::placeholder { color: rgba(255,255,255,.3) !important; }
        input:focus { border-color: var(--orange) !important; }
        select option { background: #1a1a1a; color: #fff; }
        @media (max-width: 860px) {
          .college-row-inner { grid-template-columns: 52px 1fr 90px 110px !important; }
          .college-col-tier, .college-col-cta { display: none !important; }
        }
        @media (max-width: 560px) {
          .college-row-inner { grid-template-columns: 44px 1fr !important; }
          .college-col-fees { display: none !important; }
        }
      `}</style>
    </div>
  )
}
