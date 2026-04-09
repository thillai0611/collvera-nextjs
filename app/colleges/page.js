import { getColleges } from '../../lib/supabase'
import { COLLEGES }    from '../../lib/colleges'
import CollegesClient  from './CollegesClient'

export const revalidate = 0

export const metadata = {
  title: 'MBA Colleges in India 2026 — Fees, Cutoffs, Placements | Collvera',
  description: 'Browse 100+ MBA and PGDM colleges in India. Filter by city, fees, exam, specialisation. Compare placements and get personalised recommendations.',
}

export default async function CollegesPage() {
  const raw = await getColleges()

  const colleges = raw.map(c => {
    const local = COLLEGES[c.slug] || {}
    return {
      ...c,
      avg_package:        local.avgPkg    ? local.avgPkg                 : null,
      cat_cutoff:         local.exams?.CAT                               || null,
      tags:               local.tags                                     || [],
      verdict:            local.verdict                                  || null,
      work_exp_required:  local.workExpRequired                          || false,
      work_exp_preferred: local.workExpPreferred                         || false,
      top_recruiters:     local.topRecruiters                            || [],
    }
  })

  return <CollegesClient initialColleges={colleges} />
}
