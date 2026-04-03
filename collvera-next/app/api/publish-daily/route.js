export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const SUPABASE_URL = 'https://atcsvmnnhcxnudfxyrke.supabase.co'
const POSTS_PER_DAY = 3

export async function GET(request) {
  const serviceKey = process.env.SUPABASE_SERVICE_KEY
  if (!serviceKey) {
    return Response.json({ error: 'Service key not configured' }, { status: 500 })
  }

  const headers = {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    'Content-Type': 'application/json',
  }

  // Get oldest unpublished posts
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/blog_posts?is_published=eq.false&order=id.asc&limit=${POSTS_PER_DAY}&select=id,title,slug`,
    { headers }
  )
  const posts = await res.json()
  if (!posts.length) return Response.json({ message: 'Queue empty — generate more content!' })

  const published = []
  for (const post of posts) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?id=eq.${post.id}`, {
      method: 'PATCH',
      headers: { ...headers, Prefer: 'return=minimal' },
      body: JSON.stringify({ is_published: true, published_at: new Date().toISOString() })
    })
    if (r.ok) published.push(post.title)
  }

  const countRes = await fetch(
    `${SUPABASE_URL}/rest/v1/blog_posts?is_published=eq.false&select=id`,
    { headers: { ...headers, Prefer: 'count=exact' } }
  )
  const remaining = parseInt(countRes.headers.get('content-range')?.split('/')[1] || '0')

  return Response.json({
    published,
    publishedToday: published.length,
    remainingInQueue: remaining,
    daysLeft: Math.floor(remaining / POSTS_PER_DAY),
    runAt: new Date().toISOString()
  })
}
