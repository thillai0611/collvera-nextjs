// ── College registry ─────────────────────────────────────────────────────────
// To add a new college:
// 1. Create lib/colleges/[slug].js
// 2. Import and add it to COLLEGES array below
// 3. Done — no other files need changing

import iimAhmedabad from './iim-ahmedabad'
import iimBangalore from './iim-bangalore'

export const COLLEGES = [
  iimAhmedabad,
  iimBangalore,
  // iimCalcutta,
  // iimLucknow,
  // fmsDelhi,
  // xlriJamshedpur,
  // spjimrMumbai,
  // mdiGurgaon,
  // iiftDelhi,
  // isbHyderabad,
]

// Map for O(1) lookup by slug
export const COLLEGE_MAP = Object.fromEntries(COLLEGES.map(c => [c.slug, c]))

export default COLLEGES
