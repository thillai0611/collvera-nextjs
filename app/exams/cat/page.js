import CATGuide from './CATGuide'

export const metadata = {
  title: 'CAT Exam 2025-26 — Complete Guide: Syllabus, Pattern, Dates, Strategy',
  description: 'The most complete CAT exam guide for 2025-26. CAT syllabus, exam pattern, registration dates, section-wise preparation strategy, score vs percentile and 40 FAQs answered.',
  keywords: ['CAT exam 2025', 'CAT syllabus', 'CAT preparation', 'CAT eligibility', 'CAT exam pattern', 'CAT score vs percentile'],
  alternates: { canonical: 'https://collvera.com/exams/cat' },
  openGraph: {
    title: 'CAT Exam 2025-26 — The Complete Guide',
    description: 'Syllabus, pattern, dates, strategy and 40 FAQs. Everything a CAT aspirant needs in one page.',
    url: 'https://collvera.com/exams/cat',
    type: 'article',
  }
}

export default function CATPage() {
  return <CATGuide />
}
