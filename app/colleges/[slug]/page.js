import { getCollege } from '../../../lib/supabase'
import CollegeDetailClient from './CollegeDetailClient'
import { notFound } from 'next/navigation'

// Rich metadata per college for SEO
const META = {
  'iim-ahmedabad': {
    title: 'IIM Ahmedabad — Fees, Placements, Cutoffs 2025 | Collvera',
    description: 'IIM Ahmedabad complete guide: ₹27.5L fees, ₹35.22 LPA avg package, 99%ile CAT cutoff, NIRF #1. Placements 2025, batch profile, scholarships, admission criteria.',
  },
}

export async function generateMetadata({ params }) {
  const meta = META[params.slug]
  if (meta) return { title: meta.title, description: meta.description,
    openGraph: { title: meta.title, description: meta.description } }
  const college = await getCollege(params.slug)
  if (!college) return { title: 'College Not Found | Collvera' }
  return {
    title: `${college.name} — Fees, Placements, Cutoffs 2025 | Collvera`,
    description: `${college.name} complete guide — fees, placements, CAT cutoff, batch profile, scholarships and admission criteria.`,
  }
}

export default async function CollegePage({ params }) {
  // Try Supabase first for basic college info, fall back gracefully
  let college = null
  try { college = await getCollege(params.slug) } catch {}

  // If no Supabase record but we have rich data, create a stub
  if (!college) {
    const STUBS = {
      'iim-ahmedabad': { id: 'iim-ahmedabad', slug: 'iim-ahmedabad', name: 'IIM Ahmedabad' },
    }
    college = STUBS[params.slug]
  }

  if (!college) notFound()

  return <CollegeDetailClient college={college} />
}
