import { getCollege } from '../../../lib/supabase'
import CollegeDetailClient from './CollegeDetailClient'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  if (params.slug === 'iim-ahmedabad') return {
    title: 'IIM Ahmedabad — Fees, Placements, Cutoffs 2025 | Collvera',
    description: 'IIM Ahmedabad complete guide: Rs 27.5L fees, Rs 35.22 LPA avg package, 99%ile CAT cutoff, NIRF #1. Placements 2025, batch profile, scholarships.',
  }
  const college = await getCollege(params.slug)
  if (!college) return { title: 'College Not Found | Collvera' }
  return {
    title: `${college.name} — Fees, Placements, Cutoffs 2025 | Collvera`,
    description: `${college.name} complete guide — fees, placements, CAT cutoff and admission criteria.`,
  }
}

export default async function CollegePage({ params }) {
  let dbCollege = null
  try { dbCollege = await getCollege(params.slug) } catch {}

  const college = {
    id: dbCollege?.id || params.slug,
    slug: params.slug,
    name: dbCollege?.name || params.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
  }

  return <CollegeDetailClient college={college} />
}
