import Link from 'next/link'
import Nav from '../../../components/Nav'
export const metadata = { title: 'NMAT Exam Guide 2025-26 — Coming Soon | Collvera' }
export default function Page() {
  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)' }}>
      <Nav />
      <div style={{ maxWidth:600, margin:'80px auto', padding:'0 24px', textAlign:'center' }}>
        <div style={{ fontSize:48, marginBottom:16 }}>📊</div>
        <h1 style={{ fontFamily:'var(--serif)', fontSize:'2rem', fontWeight:700, marginBottom:12 }}>NMAT Complete Guide</h1>
        <p style={{ fontSize:14, color:'var(--muted)', marginBottom:24, lineHeight:1.7 }}>The comprehensive NMAT guide is being prepared — syllabus, pattern, score guide, NMIMS cutoffs and 40 FAQs.</p>
        <Link href="/exams" style={{ background:'var(--orange)', color:'#fff', padding:'11px 24px', borderRadius:8, fontSize:13, fontWeight:500, textDecoration:'none', marginRight:10 }}>← All Exams</Link>
        <Link href="/exams/cat" style={{ background:'var(--ink)', color:'#fff', padding:'11px 24px', borderRadius:8, fontSize:13, fontWeight:500, textDecoration:'none' }}>See CAT Guide →</Link>
      </div>
    </div>
  )
}
