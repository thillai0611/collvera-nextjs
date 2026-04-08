import { getBlogPosts } from '../lib/supabase'
import { COLLEGES } from '../lib/colleges/index'

const BASE = 'https://collvera.com'
const SECTIONS = ['fees', 'placements', 'admissions', 'programs', 'campus', 'alumni', 'reviews']
const TODAY = new Date()

export default async function sitemap() {

  // 1. Static pages
  const staticPages = [
    { url: BASE,                         priority: 1.0,  changeFrequency: 'daily' },
    { url: `${BASE}/colleges`,           priority: 0.95, changeFrequency: 'daily' },
    { url: `${BASE}/blog`,              priority: 0.9,  changeFrequency: 'daily' },
    { url: `${BASE}/compare`,           priority: 0.85, changeFrequency: 'weekly' },
    { url: `${BASE}/eligibility`,       priority: 0.85, changeFrequency: 'weekly' },
    { url: `${BASE}/rankings`,          priority: 0.8,  changeFrequency: 'weekly' },
    { url: `${BASE}/predictor`,         priority: 0.8,  changeFrequency: 'weekly' },
    { url: `${BASE}/mba-game`,          priority: 0.75, changeFrequency: 'monthly' },
    { url: `${BASE}/exams`,             priority: 0.85, changeFrequency: 'weekly' },
    { url: `${BASE}/exams/cat`,         priority: 0.9,  changeFrequency: 'weekly' },
    { url: `${BASE}/exams/xat`,         priority: 0.85, changeFrequency: 'weekly' },
    { url: `${BASE}/exams/nmat`,        priority: 0.85, changeFrequency: 'weekly' },
  ].map(p => ({ ...p, lastModified: TODAY }))

  // 2. College overview pages (from lib/colleges — always up to date)
  const collegePages = COLLEGES.map(c => ({
    url: `${BASE}/colleges/${c.slug}`,
    lastModified: TODAY,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  // 3. College sub-pages (7 per college)
  const collegeSectionPages = COLLEGES.flatMap(c =>
    SECTIONS.map(section => ({
      url: `${BASE}/colleges/${c.slug}/${section}`,
      lastModified: TODAY,
      changeFrequency: 'weekly',
      priority: 0.85,
    }))
  )

  // 4. Blog posts from Supabase
  let blogPages = []
  try {
    const posts = await getBlogPosts()
    blogPages = posts.map(post => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(post.published_at || TODAY),
      changeFrequency: 'monthly',
      priority: 0.75,
    }))
  } catch (e) {
    console.error('Sitemap: failed to load blog posts', e)
  }

  return [
    ...staticPages,
    ...collegePages,
    ...collegeSectionPages,
    ...blogPages,
  ]
}
