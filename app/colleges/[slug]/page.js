import { getCollege } from '../../../lib/supabase'
import CollegeDetailClient from './CollegeDetailClient'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const META = {
    'iim-ahmedabad': {
      title: 'IIM Ahmedabad — Fees, Placements, Cutoffs 2025 | Collvera',
      description: 'IIM Ahmedabad complete guide: Rs 27.5L fees, Rs 35.22 LPA avg package, 99%ile CAT cutoff, NIRF #1. Placements 2025, batch profile, scholarships, admission criteria.',
    },
  }
  const meta = META[params.slug]
  if (meta) return { title: meta.title, description: meta.description }
  const college = await getCollege(params.slug)
  if (!college) return { title: 'College Not Found | Collvera' }
  return {
    title: `${college.name} — Fees, Placements, Cutoffs 2025 | Collvera`,
    description: `${college.name} complete guide — fees, placements, CAT cutoff, batch profile and admission criteria.`,
  }
}

export default async function CollegePage({ params }) {
  let college = null
  try { college = await getCollege(params.slug) } catch {}

  // Always ensure slug is set correctly from the URL
  const collegeData = {
    id: college?.id || params.slug,
    slug: params.slug,
    name: college?.name || params.slug.replace(/-/g, ' '),
    ...college,
    slug: params.slug, // force slug from URL, not DB
  }

  return <CollegeDetailClient college={collegeData} />
}
