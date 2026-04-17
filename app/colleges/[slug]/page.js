import { COLLEGE_MAP, COLLEGES } from '../../../lib/colleges/index'
import CollegeDetailClient from './CollegeDetailClient'

export async function generateStaticParams() {
  return COLLEGES.map(college => ({ slug: college.slug }))
}

export async function generateMetadata({ params }) {
  const college = COLLEGE_MAP[params.slug]
  if (!college) return { title: 'College Not Found | Collvera' }

  const avgPkg = college.placements?.avg || college.placements?.avg_pgpm || ''
  const totalFees = college.fees?.total || college.fees?.total_pgdm || ''
  const cutoff = college.admissions?.cutoff_general || college.admissions?.cat_cutoff_min || ''

  const title = `${college.name} MBA 2026: Fees ₹${totalFees}L, Placements ₹${avgPkg} LPA, CAT Cutoff ${cutoff}%ile | Collvera`
  const description = `${college.name} complete guide 2026: fees ₹${totalFees} lakhs, average placement ₹${avgPkg} LPA, NIRF rank #${college.nirf}. Admissions, scholarships, campus life, student reviews.`

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
