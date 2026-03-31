export const revalidate = 3600

import { getBlogPost } from '../../../lib/supabase'
import BlogPostClient from './BlogPostClient'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const post = await getBlogPost(params.slug)
  if (!post) return { title: 'Article Not Found | Collvera' }
  return {
    title: post.title,
    description: post.description,
    keywords: [post.primary_keyword, ...(post.secondary_keywords || [])].filter(Boolean),
    alternates: {
      canonical: `https://collvera.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `https://collvera.com/blog/${post.slug}`,
      siteName: 'Collvera',
      publishedTime: post.published_at,
      authors: ['Collvera AI'],
      images: [{
        url: '/og-image.png',
        width: 1200,
        height: 630,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default async function BlogPostPage({ params }) {
  const post = await getBlogPost(params.slug)
  if (!post) notFound()

  // Article schema markup
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': post.title,
    'description': post.description,
    'datePublished': post.published_at,
    'dateModified': post.updated_at || post.published_at,
    'author': {
      '@type': 'Organization',
      'name': 'Collvera',
      'url': 'https://collvera.com'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Collvera',
      'url': 'https://collvera.com',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://collvera.com/og-image.png'
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://collvera.com/blog/${post.slug}`
    },
    'keywords': [post.primary_keyword, ...(post.secondary_keywords || [])].filter(Boolean).join(', '),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <BlogPostClient post={post} />
    </>
  )
}
