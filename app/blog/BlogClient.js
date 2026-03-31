'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import Nav from '../../components/Nav'
import LeadModal from '../../components/LeadModal'

const POSTS_PER_PAGE = 12

const CATEGORIES = [
  { id: 'All', label: 'All', emoji: '📚' },
  { id: 'Placement Data', label: 'Placements', emoji: '💰' },
  { id: 'College Comparison', label: 'Comparisons', emoji: '⚖️' },
  { id: 'College Guide', label: 'College Guides', emoji: '🏛️' },
  { id: 'Score Guide', label: 'Score Guide', emoji: '📊' },
  { id: 'CAT Prep', label: 'CAT Prep', emoji: '✏️' },
  { id: 'GD-PI Prep', label: 'GD-PI', emoji: '🎤' },
  { id: 'City Guide', label: 'City Guide', emoji: '🏙️' },
  { id: 'Fees Guide', label: 'Fees & ROI', emoji: '💡' },
  { id: 'Career Guide', label: 'Career', emoji: '🚀' },
  { id: 'Education Guide', label: 'Education', emoji: '🎓' },
  { id: 'Ranking', label: 'Rankings', emoji: '🏆' },
]

const CAT_COLORS = {
  'Placement Data':   { bg:'#fff0e6', color:'#b84e00', dot:'#d95f02' },
  'College Comparison':{ bg:'#e6f1fb', color:'#1565c0', dot:'#185fa5' },
  'College Guide':    { bg:'#e6f1fb', color:'#1565c0', dot:'#185fa5' },
  'Score Guide':      { bg:'#fdecea', color:'#a32d2d', dot:'#c62828' },
  'CAT Prep':         { bg:'#f3e5f5', color:'#4a148c', dot:'#7b1fa2' },
  'GD-PI Prep':       { bg:'#fce4ec', color:'#880e4f', dot:'#c2185b' },
  'City Guide':       { bg:'#e8f5e9', color:'#1b5e20', dot:'#2e7d32' },
  'Fees Guide':       { bg:'#fff8e1', color:'#854f0b', dot:'#f9a825' },
  'Career Guide':     { bg:'#e8eaf6', color:'#1a237e', dot:'#3949ab' },
  'Education Guide':  { bg:'#e0f7fa', color:'#006064', dot:'#00838f' },
  'Ranking':          { bg:'#e8eaf6', color:'#1a237e', dot:'#3949ab' },
}

function getCatStyle(cat) {
  return CAT_COLORS[cat] || { bg:'var(--cream2)', color:'var(--muted)', dot:'var(--muted)' }
}

function CategoryBadge({ cat, small }) {
  const s = getCatStyle(cat)
  return (
    <span style={{ fontSize: small ? 9.5 : 10.5, padding: small ? '2px 7px' : '3px 9px', borderRadius: 20, background: s.bg, color: s.color, fontFamily: 'var(--mono)', whiteSpace: 'nowrap', fontWeight: 500 }}>
      {cat}
    </span>
  )
}

function FeaturedCard({ post }) {
  const s = getCatStyle(post.category)
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', height: '100%', transition: 'all .2s', cursor: 'pointer' }}
        onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(14,12,8,.1)' }}
        onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
        <div style={{ height: 4, background: s.dot }}></div>
        <div style={{ padding: '20px 22px' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
            <CategoryBadge cat={post.category} small />
            <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{post.read_time}</span>
          </div>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.35, marginBottom: 10, color: 'var(--ink)' }}>{post.title}</h3>
          <p style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 14 }}>{post.description}</p>
          <div style={{ fontSize: 12, color: s.dot, fontWeight: 600 }}>Read article →</div>
        </div>
      </div>
    </Link>
  )
}

function ListRow({ post, index }) {
  const s = getCatStyle(post.category)
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{ padding: '16px 0', borderBottom: '1px solid var(--border2)', display: 'flex', gap: 16, alignItems: 'flex-start', cursor: 'pointer', transition: 'background .15s' }}
        onMouseOver={e => e.currentTarget.style.background = 'var(--cream)'}
        onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: s.color, flexShrink: 0, fontFamily: 'var(--mono)' }}>
          {String(index).padStart(2, '0')}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 5, alignItems: 'center', flexWrap: 'wrap' }}>
            <CategoryBadge cat={post.category} small />
            <span style={{ fontSize: 10.5, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{post.read_time}</span>
          </div>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: '.95rem', fontWeight: 700, marginBottom: 4, color: 'var(--ink)', lineHeight: 1.35, transition: 'color .15s' }}>{post.title}</h3>
          <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{post.description}</p>
        </div>
        <div style={{ fontSize: 18, color: 'var(--muted)', flexShrink: 0, alignSelf: 'center' }}>→</div>
      </div>
    </Link>
  )
}

export default function BlogClient({ posts }) {
  const [leadOpen, setLeadOpen] = useState(false)
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [view, setView] = useState('grid') // grid | list

  // Filter + search
  const filtered = useMemo(() => {
    let result = posts
    if (category !== 'All') result = result.filter(p => p.category === category)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(p =>
        p.title?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
      )
    }
    return result
  }, [posts, category, search])

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)

  // Featured = first 3 when on page 1 and no search
  const showFeatured = page === 1 && !search && category === 'All'
  const featured = showFeatured ? posts.slice(0, 3) : []
  const listPosts = paginated

  // Category counts
  const counts = useMemo(() => {
    const c = {}
    posts.forEach(p => { c[p.category] = (c[p.category] || 0) + 1 })
    return c
  }, [posts])

  function handleCategory(cat) {
    setCategory(cat)
    setPage(1)
    setSearch('')
  }

  function handleSearch(val) {
    setSearch(val)
    setPage(1)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <Nav onLeadOpen={() => setLeadOpen(true)} />

      {/* Header */}
      <div style={{ background: 'var(--ink)', borderBottom: '1px solid rgba(255,255,255,.06)', padding: '40px 32px 36px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: '#1D9E75', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 10 }}>
            AI-written · verified data · updated daily
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
            <div>
              <h1 style={{ fontFamily: 'var(--serif)', fontSize: '2.2rem', fontWeight: 700, color: '#fff', marginBottom: 6 }}>MBA Guides & Resources</h1>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', lineHeight: 1.65, maxWidth: 500 }}>
                {posts.length} articles on MBA admissions, CAT preparation, college comparisons, fees and placements.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'rgba(255,255,255,.3)' }}>View:</div>
              {['grid', 'list'].map(v => (
                <button key={v} onClick={() => setView(v)}
                  style={{ padding: '6px 12px', borderRadius: 7, fontSize: 11, cursor: 'pointer', border: '1px solid', fontFamily: 'var(--mono)', background: view === v ? 'rgba(255,255,255,.12)' : 'transparent', color: view === v ? '#fff' : 'rgba(255,255,255,.35)', borderColor: view === v ? 'rgba(255,255,255,.2)' : 'rgba(255,255,255,.1)' }}>
                  {v === 'grid' ? '⊞ Grid' : '≡ List'}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: 500 }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: 'rgba(255,255,255,.3)' }}>🔍</span>
            <input
              value={search}
              onChange={e => handleSearch(e.target.value)}
              placeholder="Search articles..."
              style={{ width: '100%', padding: '10px 14px 10px 38px', background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 9, fontSize: 13, color: '#fff', fontFamily: 'var(--sans)', outline: 'none', transition: 'border-color .15s' }}
              onFocus={e => e.target.style.borderColor = 'rgba(217,95,2,.7)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.12)'}
            />
            {search && (
              <button onClick={() => handleSearch('')} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,.4)', cursor: 'pointer', fontSize: 14 }}>✕</button>
            )}
          </div>
        </div>
      </div>

      {/* Category filters */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 54, zIndex: 100 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', gap: 4, overflowX: 'auto', scrollbarWidth: 'none', padding: '12px 0' }}>
            {CATEGORIES.map(cat => {
              const count = cat.id === 'All' ? posts.length : (counts[cat.id] || 0)
              if (cat.id !== 'All' && count === 0) return null
              const active = category === cat.id
              return (
                <button key={cat.id} onClick={() => handleCategory(cat.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 13px', borderRadius: 20, fontSize: 12, cursor: 'pointer', border: '1.5px solid', whiteSpace: 'nowrap', transition: 'all .15s', fontFamily: 'var(--sans)', fontWeight: active ? 500 : 400, background: active ? 'var(--ink)' : 'var(--cream)', color: active ? '#fff' : 'var(--ink2)', borderColor: active ? 'var(--ink)' : 'var(--border)', flexShrink: 0 }}>
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                  <span style={{ fontSize: 10, fontFamily: 'var(--mono)', opacity: .6 }}>{count}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 32px 60px' }}>

        {/* Search results header */}
        {search && (
          <div style={{ marginBottom: 20, fontSize: 13, color: 'var(--muted)' }}>
            {filtered.length} results for "<strong style={{ color: 'var(--ink)' }}>{search}</strong>"
            <button onClick={() => handleSearch('')} style={{ marginLeft: 10, fontSize: 11, color: 'var(--orange)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Clear</button>
          </div>
        )}

        {/* Featured cards — only on page 1, no filter, no search */}
        {showFeatured && featured.length > 0 && (
          <div style={{ marginBottom: 36 }}>
            <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              Latest articles <span style={{ flex: 1, height: 1, background: 'var(--border)' }}></span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
              {featured.map(p => <FeaturedCard key={p.id} post={p} />)}
            </div>
          </div>
        )}

        {/* Section header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.1em' }}>
            {category === 'All' && !search ? `All articles — ${filtered.length} total` : `${filtered.length} article${filtered.length !== 1 ? 's' : ''}`}
          </div>
          <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
            Page {page} of {totalPages || 1}
          </div>
        </div>

        {/* Posts — grid or list */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--muted)' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 14 }}>No articles found. <button onClick={() => { handleSearch(''); handleCategory('All') }} style={{ color: 'var(--orange)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontSize: 14 }}>Clear filters</button></div>
          </div>
        ) : view === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16, marginBottom: 32 }}>
            {listPosts.map(p => <FeaturedCard key={p.id} post={p} />)}
          </div>
        ) : (
          <div style={{ background: 'var(--white)', borderRadius: 12, border: '1px solid var(--border)', padding: '0 24px', marginBottom: 32 }}>
            {listPosts.map((p, i) => <ListRow key={p.id} post={p} index={(page - 1) * POSTS_PER_PAGE + i + (showFeatured ? 4 : 1)} />)}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginBottom: 48 }}>
            <button onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              disabled={page === 1}
              style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--white)', color: page === 1 ? 'var(--muted)' : 'var(--ink)', cursor: page === 1 ? 'default' : 'pointer', fontSize: 12, fontFamily: 'var(--sans)' }}>
              ← Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(n => n === 1 || n === totalPages || Math.abs(n - page) <= 1)
              .reduce((acc, n, i, arr) => {
                if (i > 0 && n - arr[i - 1] > 1) acc.push('...')
                acc.push(n)
                return acc
              }, [])
              .map((n, i) => n === '...' ? (
                <span key={`dots-${i}`} style={{ padding: '8px 4px', color: 'var(--muted)', fontSize: 12 }}>…</span>
              ) : (
                <button key={n} onClick={() => { setPage(n); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid', background: page === n ? 'var(--ink)' : 'var(--white)', color: page === n ? '#fff' : 'var(--ink)', borderColor: page === n ? 'var(--ink)' : 'var(--border)', cursor: 'pointer', fontSize: 12, fontWeight: page === n ? 600 : 400, fontFamily: 'var(--mono)' }}>
                  {n}
                </button>
              ))
            }

            <button onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              disabled={page === totalPages}
              style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--white)', color: page === totalPages ? 'var(--muted)' : 'var(--ink)', cursor: page === totalPages ? 'default' : 'pointer', fontSize: 12, fontFamily: 'var(--sans)' }}>
              Next →
            </button>
          </div>
        )}

        {/* CTA */}
        <div style={{ background: 'var(--ink)', borderRadius: 14, padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: 4 }}>Know which college to target?</div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', margin: 0 }}>Use AI to check your eligibility across 20+ colleges in 2 minutes.</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/eligibility" style={{ background: 'var(--orange)', color: '#fff', padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>Check Eligibility →</Link>
            <button onClick={() => setLeadOpen(true)} style={{ background: 'rgba(255,255,255,.08)', color: 'rgba(255,255,255,.7)', padding: '10px 20px', borderRadius: 8, fontSize: 13, cursor: 'pointer', border: '1px solid rgba(255,255,255,.12)' }}>Free Counselling</button>
          </div>
        </div>
      </div>

      <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)} />
    </div>
  )
}
