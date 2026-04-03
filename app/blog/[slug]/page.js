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
    alternates: { canonical: `https://collvera.com/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `https://collvera.com/blog/${post.slug}`,
      siteName: 'Collvera',
      publishedTime: post.published_at,
      authors: ['Collvera AI'],
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

// Shared FAQ generator — same source used for both schema and visual section.
// Keeping them in sync means Google never sees schema questions that don't
// match what's visible on the page.
function getFAQs(post) {
  const category = post.category || ''
  const title    = post.title?.split('—')[0]?.trim() || 'this college'

  const map = {
    'College Guide': [
      { q: `What are the total fees for ${title}?`,       a: 'Fee details are covered in this guide. Refer to the official college website for the current year figures.' },
      { q: `What is the CAT cutoff for ${title}?`,        a: 'CAT cutoff varies by category, gender, and academic background. Details and historical trends are in this guide.' },
      { q: `Is ${title} worth it for ROI?`,               a: 'ROI depends on career goals, target sector, and work experience. This guide breaks down fees vs average placement for an honest comparison.' },
      { q: 'How does category affect MBA admissions?',    a: 'OBC candidates receive 3-percentile effective relaxation. SC/ST candidates receive 8-10 percentile relaxation. Female candidates get 3-5 percentile boost at most IIMs.' },
    ],
    'CAT Prep': [
      { q: 'How many months to prepare for CAT?',         a: '6-12 months for most aspirants. Starting April-May for a November exam is ideal. Focused 3-month prep is possible with prior quant exposure.' },
      { q: 'What is the CAT exam pattern in 2025?',       a: '3 sections: VARC, DILR, QA. Approximately 66 questions, 120 minutes total, 40 minutes per section. Negative marking of -1 for wrong MCQs.' },
      { q: 'How many CAT mocks should I take?',           a: '20-30 full mocks in the final 3 months. Rigorous post-mock analysis matters more than raw quantity. Identify weak areas and fix them between mocks.' },
      { q: 'What percentile do I need for IIM Ahmedabad?',a: '99 percentile overall with minimum 85 percentile in each section. Female non-engineers may convert at 97-98 percentile due to diversity bonus.' },
    ],
    'Placement Data': [
      { q: 'Are MBA college placement figures accurate?',  a: 'IIMs follow IPRS audited reporting. Private colleges vary — always check whether figures include all students or only placed ones, and whether international offers are counted.' },
      { q: 'What is the difference between average and median package?', a: 'Average is pulled up by outliers. Median — where half earn above and half below — is the more realistic figure to plan your ROI around.' },
      { q: 'How does CTC differ from take-home salary?',  a: 'At Rs 30-35 LPA CTC, monthly take-home is approximately Rs 1.75-2.0 lakhs — about 60-65% of the annual figure after tax and PF deductions.' },
      { q: 'Which MBA college has the best placement ROI?',a: 'FMS Delhi: Rs 2.43 lakh total fees, Rs 34 LPA average. Fee recovery in under one month of work. Unmatched ROI among all Indian B-schools.' },
    ],
  }

  return map[category] || [
    { q: 'How do I check MBA college eligibility?',       a: 'Use collvera.com/eligibility — enter your percentile, category, and academic profile to see conversion chances across 20+ colleges.' },
    { q: 'Which MBA college has the best ROI in India?',  a: 'FMS Delhi — Rs 2.43 lakh fees with Rs 34 LPA average placement. Best ROI in India by a wide margin.' },
    { q: 'What is a good CAT percentile for top B-schools?', a: '99%ile for IIM A/B/C. 97-98%ile for XLRI, SPJIMR, FMS. 95-96%ile for MDI, IIM Lucknow, IIFT. Below 95%ile: IMT, TAPMI, FORE territory.' },
  ]
}

export default async function BlogPostPage({ params }) {
  const post = await getBlogPost(params.slug)
  if (!post) notFound()

  const faqs = getFAQs(post)
  const url  = `https://collvera.com/blog/${post.slug}`

  // Single @graph block — one script tag, zero duplication risk.
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        'headline': post.title,
        'description': post.description,
        'datePublished': post.published_at,
        'dateModified': post.updated_at || post.published_at,
        'author': { '@type': 'Organization', 'name': 'Collvera', 'url': 'https://collvera.com' },
        'publisher': {
          '@type': 'Organization',
          'name': 'Collvera',
          'url': 'https://collvera.com',
          'logo': { '@type': 'ImageObject', 'url': 'https://collvera.com/og-image.png' }
        },
        'mainEntityOfPage': { '@type': 'WebPage', '@id': url },
        'keywords': [post.primary_keyword, ...(post.secondary_keywords || [])].filter(Boolean).join(', '),
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        'mainEntity': faqs.map(f => ({
          '@type': 'Question',
          'name': f.q,
          'acceptedAnswer': { '@type': 'Answer', 'text': f.a }
        }))
      }
    ]
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BlogPostClient post={post} faqs={faqs} />
    </>
  )
}
