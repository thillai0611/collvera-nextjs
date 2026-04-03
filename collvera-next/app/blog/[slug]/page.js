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

  // FAQ schema based on category
  const faqsByCategory = {
    'College Guide': [
      { q: `What is the fee for ${post.title?.split('—')[0]?.trim()}?`, a: 'The fees and details are covered in this guide. Check the official website for current figures.' },
      { q: `What is the CAT cutoff?`, a: 'CAT cutoff details are in this guide. Cutoffs vary by category and academic profile.' },
      { q: `Is it worth it?`, a: 'ROI analysis is in this guide. Depends on your career goals and target sector.' },
    ],
    'CAT Prep': [
      { q: 'How many months to prepare for CAT?', a: '6-12 months for most aspirants. Starting April-May for a November exam is ideal.' },
      { q: 'What is the CAT exam pattern?', a: '3 sections: VARC, DILR, QA. ~66 questions, 120 minutes total, 40 min per section. -1 for wrong MCQ.' },
      { q: 'How many mocks before CAT?', a: '20-30 full mocks in the final 3 months. Analysis after each mock matters more than quantity.' },
    ],
    'Placement Data': [
      { q: 'Are college placement figures accurate?', a: 'IIMs follow IPRS audited reporting. Private colleges vary. Always check if figures include all students or only placed ones.' },
      { q: 'What is the difference between average and median package?', a: 'Average is pulled up by high outliers. Median — where half earn above and half below — is more realistic.' },
      { q: 'How does CTC differ from in-hand salary?', a: 'At Rs 30-35 LPA CTC, monthly in-hand is approximately Rs 1.75-2.0 lakhs — about 60-65% of the annual figure.' },
    ],
  }
  const faqItems = faqsByCategory[post.category] || [
    { q: 'How do I check MBA college eligibility?', a: 'Use collvera.com/eligibility — enter your score, academics and profile to see match % for 20+ colleges.' },
    { q: 'Which MBA college has the best ROI?', a: 'FMS Delhi — Rs 2.43L fees with Rs 34 LPA average. Best ROI in India.' },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqItems.map(f => ({
      '@type': 'Question',
      'name': f.q,
      'acceptedAnswer': { '@type': 'Answer', 'text': f.a }
    }))
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}/>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <BlogPostClient post={post} />
    </>
  )
}
