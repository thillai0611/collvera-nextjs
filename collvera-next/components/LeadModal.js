'use client'
import { useState } from 'react'
import { submitLead } from '../lib/supabase'

export default function LeadModal({ open, onClose, context = '' }) {
  const [form, setForm] = useState({ name:'', email:'', phone:'', cat_score:'', budget:'', goal:'' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!open) return null

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = async () => {
    if (!form.name || !form.email || !form.phone) {
      alert('Please fill name, email and phone.'); return
    }
    setLoading(true)
    const ok = await submitLead({
      name: form.name,
      email: form.email,
      phone: form.phone,
      cat_score: form.cat_score,
      budget: form.budget,
      goal: form.goal,
      source_page: context || (typeof window !== 'undefined' ? window.location.pathname : ''),
      utm_source: typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('utm_source') : null,
      utm_medium: typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('utm_medium') : null,
    })
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, zIndex:1000, background:'rgba(26,18,8,0.6)', display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background:'var(--white)', borderRadius:'var(--radius-lg)', width:'100%', maxWidth:480, boxShadow:'var(--shadow-lg)', overflow:'hidden' }}>

        <div style={{ background:'var(--ink)', padding:'24px 28px 20px', position:'relative' }}>
          <button onClick={onClose} style={{ position:'absolute', top:16, right:16, background:'rgba(255,255,255,0.1)', border:'none', color:'#fff', width:28, height:28, borderRadius:'50%', cursor:'pointer', fontSize:14 }}>✕</button>
          <div style={{ fontFamily:'var(--font-display)', fontSize:'1.4rem', fontWeight:700, color:'#fff', marginBottom:4 }}>Get Your Free Shortlist</div>
          <div style={{ fontSize:13, color:'rgba(255,255,255,0.6)' }}>{context || 'A counsellor will call within 24 hrs with colleges matched to your profile.'}</div>
        </div>

        {submitted ? (
          <div style={{ padding:'40px 28px', textAlign:'center' }}>
            <div style={{ fontSize:48, marginBottom:12 }}>🎉</div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:'1.3rem', fontWeight:600, marginBottom:8 }}>You're all set!</div>
            <p style={{ color:'var(--muted)', fontSize:14, lineHeight:1.6 }}>Our counsellor will WhatsApp you within 24 hours with a personalised college list.</p>
            <button className="btn btn-primary" onClick={onClose} style={{ marginTop:24 }}>Close</button>
          </div>
        ) : (
          <div style={{ padding:'24px 28px' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12 }} className="form-grid">
              <div>
                <label style={{ fontSize:12, color:'var(--muted)', display:'block', marginBottom:4 }}>Full Name *</label>
                <input placeholder="Your name" value={form.name} onChange={e => set('name', e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize:12, color:'var(--muted)', display:'block', marginBottom:4 }}>Phone / WhatsApp *</label>
                <input placeholder="+91 98765 43210" value={form.phone} onChange={e => set('phone', e.target.value)} />
              </div>
            </div>
            <div style={{ marginBottom:12 }}>
              <label style={{ fontSize:12, color:'var(--muted)', display:'block', marginBottom:4 }}>Email *</label>
              <input type="email" placeholder="you@email.com" value={form.email} onChange={e => set('email', e.target.value)} />
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12 }} className="form-grid">
              <div>
                <label style={{ fontSize:12, color:'var(--muted)', display:'block', marginBottom:4 }}>Expected CAT Percentile</label>
                <select value={form.cat_score} onChange={e => set('cat_score', e.target.value)}>
                  <option value="">Select percentile</option>
                  <option>99%+ (IIM A/B/C)</option>
                  <option>95–99% (Old IIMs)</option>
                  <option>90–95% (New IIMs)</option>
                  <option>80–90% (Tier 2)</option>
                  <option>Below 80%</option>
                  <option>Appearing this year</option>
                  <option>GMAT / Other exam</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize:12, color:'var(--muted)', display:'block', marginBottom:4 }}>Fee Budget</label>
                <select value={form.budget} onChange={e => set('budget', e.target.value)}>
                  <option value="">Select budget</option>
                  <option>Under ₹5 Lakhs</option>
                  <option>₹5L – ₹15L</option>
                  <option>₹15L – ₹25L</option>
                  <option>₹25L – ₹40L</option>
                  <option>Above ₹40L</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom:20 }}>
              <label style={{ fontSize:12, color:'var(--muted)', display:'block', marginBottom:4 }}>Career Goal</label>
              <select value={form.goal} onChange={e => set('goal', e.target.value)}>
                <option value="">Select goal</option>
                <option>Consulting</option>
                <option>Finance / Banking</option>
                <option>Marketing / FMCG</option>
                <option>Tech / Product</option>
                <option>Entrepreneurship</option>
                <option>HR / People</option>
                <option>International career</option>
              </select>
            </div>
            <button className="btn btn-primary" onClick={submit} disabled={loading} style={{ width:'100%', justifyContent:'center', padding:'13px', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Saving...' : 'Get My Free Shortlist 🚀'}
            </button>
            <p style={{ textAlign:'center', fontSize:11, color:'var(--muted)', marginTop:10 }}>🔒 No spam. Your data is only used to connect you with colleges.</p>
          </div>
        )}
      </div>
    </div>
  )
}
