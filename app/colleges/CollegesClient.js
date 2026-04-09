'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import Nav from '../../components/Nav'
import LeadModal from '../../components/LeadModal'

const FEES_OPTIONS = [
  { label: 'Any Fees',    value: '' },
  { label: 'Under ₹5L',  value: '500000' },
  { label: 'Under ₹15L', value: '1500000' },
  { label: 'Under ₹25L', value: '2500000' },
]

const SORT_OPTIONS = [
  { label: 'NIRF Rank',     value: 'nirf' },
  { label: 'Fees: Low → High', value: 'fees' },
  { label: 'Avg Package',   value: 'package' },
]

const TIER_LABELS = { 1: 'IIM / Premier', 2: 'Top Private', 3: 'Regional' }

function fmt_fees(n) {
  if (!n) return null
  const l = n / 100000
  return `₹${l >= 10 ? Math.round(l) : l.toFixed(1)}L`
}

function fmt_pkg(n) {
  if (!n) return null
  return `₹${(n / 100000).toFixed(1)} LPA`
}

export default function CollegesClient({ initialColleges }) {
  const [leadOpen, setLeadOpen]   = useState(false)
  const [search, setSearch]       = useState('')
  const [city, setCity]           = useState('')
  const [tier, setTier]           = useState('')
  const [maxFees, setMaxFees]     = useState('')
  const [sort, setSort]           = useState('nirf')
  const [hovered, setHovered]     = useState(null)

  const cities = useMemo(
    () => [...new Set(initialColleges.map(c => c.city).filter(Boolean))].sort(),
    [initialColleges]
  )

  const filtered = useMemo(() => {
    let list = initialColleges.filter(c => {
      if (search && !c.name?.toLowerCase().includes(search.toLowerCase())) return false
      if (city && c.city !== city) return false
      if (tier && c.tier !== parseInt(tier)) return false
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

  const hasData = initialColleges.length > 0

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <Nav onLeadOpen={() => setLeadOpen(true)} />

      {/* ── PAGE HEADER ── */}
      <div style={{ background: 'var(--ink)', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 32px' }}>
          <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'rgba(255,255,255,.35)', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 12 }}>
            India · MBA · 2026
          </div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: '#fff', marginBottom: 10, lineHeight: 1.1 }}>
            Find Your MBA
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,.45)', maxWidth: 480, lineHeight: 1.7, margin: 0 }}>
            Browse every top Indian B-school ranked, compared, and verified — with fees, placements, and Claude's honest verdict.
          </p>
        </div>
      </div>

      {/* ── FILTERS ── */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '14px 24px', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: '1 1 200px', minWidth: 160 }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: 'var(--muted)', pointerEvents: 'none' }}>🔍</span>
            <input
              placeholder="Search college..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', paddingLeft: 34, paddingRight: 12, height: 38, borderRadius: 8, border: '1.5px solid var(--border)', fontSize: 13, background: 'var(--cream)', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          {/* City */}
          <select value={city} onChange={e => setCity(e.target.value)}
            style={{ height: 38, borderRadius: 8, border: '1.5px solid var(--border)', fontSize: 13, background: 'var(--cream)', padding: '0 12px', cursor: 'pointer', minWidth: 120 }}>
            <option value="">All Cities</option>
            {cities.map(c => <option key={c}>{c}</option>)}
          </select>

          {/* Tier */}
          <select value={tier} onChange={e => setTier(e.target.value)}
            style={{ height: 38, borderRadius: 8, border: '1.5px solid var(--border)', fontSize: 13, background: 'var(--cream)', padding: '0 12px', cursor: 'pointer', minWidth: 110 }}>
            <option value="">All Tiers</option>
            <option value="1">Tier 1</option>
            <option value="2">Tier 2</option>
            <option value="3">Tier 3</option>
          </select>

          {/* Fees */}
          <select value={maxFees} onChange={e => setMaxFees(e.target.value)}
            style={{ height: 38, borderRadius: 8, border: '1.5px solid var(--border)', fontSize: 13, background: 'var(--cream)', padding: '0 12px', cursor: 'pointer', minWidth: 130 }}>
            {FEES_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>

          {/* Sort pills */}
          <div style={{ display: 'flex', gap: 6, marginLeft: 'auto' }}>
            {SORT_OPTIONS.map(o => (
              <button key={o.value} onClick={() => setSort(o.value)}
                style={{ height: 34, padding: '0 14px', borderRadius: 20, border: `1.5px solid ${sort === o.value ? 'var(--orange)' : 'var(--border)'}`, background: sort === o.value ? 'var(--orange)' : 'transparent', color: sort === o.value ? '#fff' : 'var(--ink2)', fontSize: 12, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .15s' }}>
                {o.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 24px 80px' }}>
        {!hasData ? (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🏗️</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', marginBottom: 8 }}>College data loading soon</h2>
            <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 24 }}>We're curating verified data for 100+ colleges.</p>
            <button style={{ background: 'var(--orange)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: 10, fontSize: 14, cursor: 'pointer' }} onClick={() => setLeadOpen(true)}>Get Free Counselling →</button>
          </div>
        ) : (
          <>
            {/* Count + active filters */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 13, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                {filtered.length} colleges
              </span>
              {[city && { label: city, clear: () => setCity('') }, tier && { label: `Tier ${tier}`, clear: () => setTier('') }, maxFees && { label: `Under ₹${parseInt(maxFees)/100000}L`, clear: () => setMaxFees('') }].filter(Boolean).map((f, i) => (
                <button key={i} onClick={f.clear}
                  style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 20, background: 'var(--orange-lt)', border: '1px solid rgba(217,95,2,.2)', fontSize: 12, color: 'var(--orange)', cursor: 'pointer', fontWeight: 500 }}>
                  {f.label} ✕
                </button>
              ))}
            </div>

            {/* ── TABLE HEADER (desktop) ── */}
            <div style={{ display: 'grid', gridTemplateColumns: '52px 1fr 110px 120px 100px 160px', gap: 0, padding: '8px 16px', background: 'transparent', marginBottom: 4 }}
              className="college-table-header">
              <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Rank</div>
              <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em' }}>College</div>
              <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Fees From</div>
              <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Avg Package</div>
              <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Tier</div>
              <div></div>
            </div>

            {/* ── COLLEGE ROWS ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {filtered.map((c, idx) => {
                const isHov = hovered === c.id
                const fees  = fmt_fees(c.min_fees)
                const pkg   = fmt_pkg(c.latest_avg_package)

                return (
                  <div key={c.id}
                    onMouseEnter={() => setHovered(c.id)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '52px 1fr 110px 120px 100px 160px',
                      gap: 0,
                      alignItems: 'center',
                      background: isHov ? 'var(--white)' : 'var(--white)',
                      border: `1.5px solid ${isHov ? 'var(--orange)' : 'var(--border)'}`,
                      borderRadius: 12,
                      padding: '14px 16px',
                      transition: 'all .15s',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    className="college-row"
                    onClick={() => window.location.href = `/colleges/${c.slug}`}
                  >
                    {/* Accent stripe */}
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: c.color || 'var(--orange)', borderRadius: '12px 0 0 12px', opacity: isHov ? 1 : 0.4, transition: 'opacity .15s' }} />

                    {/* Rank */}
                    <div style={{ paddingLeft: 8 }}>
                      {c.nirf_rank ? (
                        <div>
                          <div style={{ fontFamily: 'var(--mono)', fontSize: 15, fontWeight: 700, color: isHov ? 'var(--orange)' : 'var(--ink)', lineHeight: 1 }}>#{c.nirf_rank}</div>
                          <div style={{ fontSize: 9, fontFamily: 'var(--mono)', color: 'var(--muted)', marginTop: 2 }}>NIRF</div>
                        </div>
                      ) : (
                        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)' }}>—</div>
                      )}
                    </div>

                    {/* College name + location */}
                    <div>
                      <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.25, marginBottom: 3 }}>{c.name}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>📍 {c.city}, {c.state}</div>
                    </div>

                    {/* Fees */}
                    <div>
                      {fees ? (
                        <>
                          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{fees}</div>
                          <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--muted)', marginTop: 1 }}>fees from</div>
                        </>
                      ) : (
                        <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>Contact</div>
                      )}
                    </div>

                    {/* Package */}
                    <div>
                      {pkg ? (
                        <>
                          <div style={{ fontSize: 14, fontWeight: 700, color: c.color || 'var(--orange)' }}>{pkg}</div>
                          <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--muted)', marginTop: 1 }}>avg package</div>
                        </>
                      ) : (
                        <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>See profile</div>
                      )}
                    </div>

                    {/* Tier */}
                    <div>
                      <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 20, background: c.tier === 1 ? 'rgba(217,95,2,.1)' : 'var(--cream)', color: c.tier === 1 ? 'var(--orange)' : 'var(--muted)', fontFamily: 'var(--mono)', fontWeight: 500, border: `1px solid ${c.tier === 1 ? 'rgba(217,95,2,.2)' : 'var(--border)'}` }}>
                        {TIER_LABELS[c.tier] || 'Other'}
                      </span>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                      <Link href={`/colleges/${c.slug}`}
                        onClick={e => e.stopPropagation()}
                        style={{ fontSize: 12.5, fontWeight: 600, color: isHov ? '#fff' : 'var(--orange)', background: isHov ? 'var(--orange)' : 'var(--orange-lt)', border: `1.5px solid ${isHov ? 'var(--orange)' : 'rgba(217,95,2,.2)'}`, padding: '7px 16px', borderRadius: 8, textDecoration: 'none', transition: 'all .15s', whiteSpace: 'nowrap' }}>
                        View Details →
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Bottom CTA */}
            {filtered.length > 0 && (
              <div style={{ marginTop: 40, background: 'var(--ink)', borderRadius: 16, padding: '32px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: 8 }}>
                  Not sure which college fits your profile?
                </div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,.45)', marginBottom: 22, lineHeight: 1.7 }}>
                  Enter your CAT percentile and background. Claude finds your realistic options from all the colleges above.
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link href="/eligibility" style={{ background: 'var(--orange)', color: '#fff', padding: '12px 24px', borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
                    Check my eligibility →
                  </Link>
                  <Link href="/compare" style={{ background: 'rgba(255,255,255,.08)', color: 'rgba(255,255,255,.7)', padding: '12px 24px', borderRadius: 10, fontSize: 14, border: '1px solid rgba(255,255,255,.15)', textDecoration: 'none' }}>
                    Compare colleges
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)} context="College Explorer" />

      <style>{`
        @media (max-width: 768px) {
          .college-row {
            grid-template-columns: 44px 1fr 90px !important;
          }
          .college-row > :nth-child(4),
          .college-row > :nth-child(5) {
            display: none !important;
          }
          .college-row > :nth-child(6) {
            grid-column: 1 / -1;
            margin-top: 10px;
          }
          .college-table-header {
            display: none !important;
          }
        }
        @media (max-width: 540px) {
          .college-row {
            grid-template-columns: 44px 1fr !important;
          }
          .college-row > :nth-child(3) {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
