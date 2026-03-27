import { getCollege, getCollegePrograms, getCollegeLoans } from '../../../lib/supabase'
import CollegeDetailClient from './CollegeDetailClient'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const college = await getCollege(params.slug)
  if (!college) return { title: 'College Not Found | Collvera' }
  return {
    title: `${college.name} — Fees, Placements, Cutoffs 2026 | Collvera`,
    description: `${college.name} — Total fees ₹${college.min_fees ? (college.min_fees/100000).toFixed(0) : 'N/A'}L, Average package, CAT cutoff, placements 2026. Compare programs and check eligibility.`,
    openGraph: {
      title: `${college.name} | Collvera`,
      description: `Complete guide to ${college.name} — fees, placements, cutoffs, scholarships.`,
    }
  }
}

export default async function CollegePage({ params }) {
  const college = await getCollege(params.slug)
  if (!college) notFound()

  const [programs, loans] = await Promise.all([
    getCollegePrograms(college.id),
    getCollegeLoans(college.id),
  ])

  return <CollegeDetailClient college={college} programs={programs} loans={loans} />
}
