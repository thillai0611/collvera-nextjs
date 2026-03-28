import { getBlogPost } from '../../../lib/supabase'
import BlogPostClient from './BlogPostClient'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const post = await getBlogPost(params.slug)
  if (!post) return { title: 'Article Not Found | Collvera' }
  return {
    title: `${post.title} | Collvera`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
    }
  }
}

export default async function BlogPostPage({ params }) {
  const post = await getBlogPost(params.slug)
  if (!post) notFound()
  return <BlogPostClient post={post} />
}
