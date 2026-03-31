import { getBlogPosts } from '../../lib/supabase'
import BlogClient from './BlogClient'

export const revalidate = 3600 // re-fetch from Supabase every 1 hour

export const metadata = {
  title: 'MBA Blog — College Guides, CAT Tips, Rankings | Collvera',
  description: 'Expert guides on MBA admissions, CAT preparation, college comparisons, fees, placements and more. Updated regularly by Collvera AI.',
}

export default async function BlogPage() {
  const posts = await getBlogPosts()
  return <BlogClient posts={posts} />
}
