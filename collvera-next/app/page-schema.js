// Homepage schema — exported and used in layout
export const homepageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  'name': 'Collvera',
  'url': 'https://collvera.com',
  'description': 'AI-powered MBA college discovery for India',
  'potentialAction': {
    '@type': 'SearchAction',
    'target': {
      '@type': 'EntryPoint',
      'urlTemplate': 'https://collvera.com/blog?search={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  }
}

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    {
      '@type': 'Question',
      'name': 'What is the CAT cutoff for IIM Ahmedabad?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'IIM Ahmedabad requires 99 percentile overall in CAT with 85 percentile sectional minimum. General category male engineers face the highest competition.' }
    },
    {
      '@type': 'Question',
      'name': 'What are the fees for IIM Ahmedabad?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'IIM Ahmedabad total fees for the 2-year PGP program are Rs 27.5 lakhs as of 2025.' }
    },
    {
      '@type': 'Question',
      'name': 'Which MBA college has the best ROI in India?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'FMS Delhi has the best MBA ROI in India with total fees of Rs 2.43 lakhs and average placement of Rs 34 LPA — fee recovery in under one month.' }
    },
    {
      '@type': 'Question',
      'name': 'Is 95 percentile in CAT enough for IIM?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'At 95 percentile, you can target IIM Kozhikode (cutoff 96%), MDI Gurgaon (95%), and SPJIMR Mumbai (95%). Female candidates and non-engineers receive effective relaxation of 3-5 percentile at most IIMs.' }
    },
    {
      '@type': 'Question',
      'name': 'What is the average package at IIM Ahmedabad?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'IIM Ahmedabad average package in 2025 is Rs 35.22 LPA (mean) with a median of Rs 34.53 LPA. The highest domestic package was Rs 1.10 Crore.' }
    }
  ]
}
