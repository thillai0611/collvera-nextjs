import { getColleges } from '../../lib/supabase'
import CollegesClient from './CollegesClient'

export const metadata = {
  title: 'MBA Colleges in India 2026 — Fees, Cutoffs, Placements | Collvera',
  description: 'Browse 100+ MBA and PGDM colleges in India. Filter by city, fees, exam, specialisation. Compare placements and get personalised recommendations.',
}

export default async function CollegesPage() {
  const colleges = await getColleges()
  return <CollegesClient initialColleges={colleges} />
}
