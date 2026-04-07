import { COLLEGE_MAP } from '../../../lib/colleges/index'
import CollegeDetailClient from './CollegeDetailClient'

export async function generateMetadata({ params }) {
  const college = COLLEGE_MAP[params.slug]
  if (!college) return { title: 'College Not Found | Collvera' }

  const title = `${college.name} MBA 2026: Fees ₹${college.fees.total}L, Placements ₹${college.placements.avg} LPA, CAT Cutoff ${college.admissions.cutoff_general}%ile | Collvera`
  const description = `${college.name} complete guide 2026: fees ₹${college.fees.total} lakhs, average placement ₹${college.placements.avg} LPA, NIRF rank #${college.nirf}. Admissions, scholarships, campus life, student reviews.`

  return {
    title,
    description,
    openGraph: { title, description, type: 'website', url: `https://collvera.com/colleges/${params.slug}` },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: `https://collvera.com/colleges/${params.slug}` },
  }
}

export default function CollegePage({ params }) {
  const college = COLLEGE_MAP[params.slug] || null
  return <CollegeDetailClient college={college} />
}
