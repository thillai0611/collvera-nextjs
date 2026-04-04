export const revalidate = 3600

import { getBlogPost, getRecentBlogPosts } from '../../../lib/supabase'
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

function getFAQs(post) {
  const category = post.category || ''
  const title = post.title?.split('—')[0]?.trim() || 'this college'
  const map = {
    'College Guide': [
      { q: `What are the total fees for ${title}?`, a: 'Fee details are covered in this guide. Refer to the official college website for the current year figures.' },
      { q: `What is the CAT cutoff for ${title}?`, a: 'CAT cutoff varies by category, gender, and academic background. Details and historical trends are in this guide.' },
      { q: `Is ${title} worth it for ROI?`, a: 'ROI depends on career goals, target sector, and work experience. This guide breaks down fees vs average placement for an honest comparison.' },
      { q: 'How does category affect MBA admissions?', a: 'OBC candidates receive 3-percentile effective relaxation. SC/ST candidates receive 8-10 percentile relaxation. Female candidates get 3-5 percentile boost at most IIMs.' },
    ],
    'CAT Prep': [
      { q: 'How many months to prepare for CAT?', a: '6-12 months for most aspirants. Starting April-May for a November exam is ideal.' },
      { q: 'What is the CAT exam pattern in 2025?', a: '3 sections: VARC, DILR, QA. ~66 questions, 120 minutes, 40 min per section. -1 for wrong MCQs.' },
      { q: 'How many CAT mocks should I take?', a: '20-30 full mocks in the final 3 months. Analysis after each mock matters more than quantity.' },
      { q: 'What percentile do I need for IIM Ahmedabad?', a: '99 percentile overall with 85 percentile minimum in each section.' },
    ],
    'Placement Data': [
      { q: 'Are MBA college placement figures accurate?', a: 'IIMs follow IPRS audited reporting. Private colleges vary — always check if figures include all students or only placed ones.' },
      { q: 'What is the difference between average and median package?', a: 'Average is pulled up by outliers. Median is the more realistic figure to plan your ROI around.' },
      { q: 'How does CTC differ from take-home salary?', a: 'At Rs 30-35 LPA CTC, monthly take-home is approximately Rs 1.75-2.0 lakhs — about 60-65% of the annual figure.' },
      { q: 'Which MBA college has the best placement ROI?', a: 'FMS Delhi: Rs 2.43 lakh fees, Rs 34 LPA average. Fee recovery in under one month of work.' },
    ],
    'College Comparison': [
      { q: 'How do I decide between two MBA colleges?', a: 'Key factors: placements in your target sector, fees vs ROI, location, batch profile, and alumni network in your city.' },
      { q: 'Is average package the right metric to compare colleges?', a: 'No — median package, sector mix, and % placed are more reliable. A high average can be skewed by 2-3 outlier offers.' },
      { q: 'Can I convert multiple college calls simultaneously?', a: 'Yes. Most top colleges have GD-PI rounds in Feb-April. Prepare a single strong narrative and tailor your Why MBA + Why This College for each.' },
    ],
    'Score Guide': [
      { q: 'Which colleges can I get with this percentile?', a: 'The full list is covered above. Category, background, and gender also affect your chances — use the eligibility checker at collvera.com/eligibility.' },
      { q: 'Is this percentile enough for IIM?', a: 'Old IIMs (A, B, C) require 99%+ for General. IIM Kozhikode, Lucknow, Indore work at 95-97%. Female and non-engineer candidates get 3-5 percentile effective relaxation.' },
      { q: 'What should I do if I miss the cutoff by a few percentile?', a: 'Apply to colleges just below your score as backup, attempt the exam next year, or explore XAT/NMAT as alternative routes.' },
    ],
  }
  return map[category] || [
    { q: 'How do I check MBA college eligibility?', a: 'Use collvera.com/eligibility — enter your percentile, category, and profile to see conversion chances across 20+ colleges.' },
    { q: 'Which MBA college has the best ROI in India?', a: 'FMS Delhi — Rs 2.43 lakh fees with Rs 34 LPA average placement. Best ROI in India by a wide margin.' },
    { q: 'What is a good CAT percentile for top B-schools?', a: '99%ile for IIM A/B/C. 97-98%ile for XLRI, SPJIMR, FMS. 95-96%ile for MDI, IIM Lucknow, IIFT. Below 95%ile: IMT, TAPMI, FORE territory.' },
  ]
}

export default async function BlogPostPage({ params }) {
  const [post, recentPosts] = await Promise.all([
    getBlogPost(params.slug),
    getRecentBlogPosts(8, params.slug),
  ])
  if (!post) notFound()

  const faqs = getFAQs(post)
  const url  = `https://collvera.com/blog/${post.slug}`

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
          '@type': 'Organization', 'name': 'Collvera', 'url': 'https://collvera.com',
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
      <BlogPostClient post={post} faqs={faqs} recentPosts={recentPosts} />
    </>
  )
}
