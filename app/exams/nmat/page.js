import NMATCollegesClient from './NMATCollegesClient'

export const metadata = {
  title: 'Top MBA Colleges Accepting NMAT 2026 — Cutoffs, Fees & Placements | Collvera',
  description: 'Complete list of NMAT participating institutes 2026. NMIMS Mumbai cutoff 210+, SPJIMR, ISB, SDA Bocconi, XIM, TISS — with NMAT score requirements, fees, average placements and expert assessment.',
  alternates: { canonical: 'https://collvera.com/exams/nmat/colleges' },
  openGraph: {
    title: 'Top MBA Colleges Accepting NMAT 2026 — Cutoffs, Fees & Placements | Collvera',
    description: 'NMAT 2026 participating institutes: NMIMS Mumbai (210+), NMIMS Bangalore (200+), SPJIMR, ISB, SDA Bocconi, XIM Bhubaneswar with cutoffs, fees and placements.',
    url: 'https://collvera.com/exams/nmat/colleges',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Which top MBA colleges accept NMAT scores in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Top MBA colleges accepting NMAT 2026 include NMIMS Mumbai (cutoff 210+), NMIMS Bangalore (200+), SPJIMR Mumbai (200+), ISB Hyderabad (210+ or GMAT 700+), SDA Bocconi Asia Pacific (200+), TISS Mumbai (190+), and XIM Bhubaneswar (185+). NMIMS exclusively accepts NMAT and does not accept CAT.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is NMAT accepted in IIMs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. IIMs only accept CAT scores for their flagship PGP MBA programmes. NMAT is not accepted by any IIM for their main MBA programme. However, some IIM executive programmes may accept GMAT, which is a different exam.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a good NMAT score for NMIMS Mumbai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A score of 210 or above is typically required for a shortlist call from NMIMS Mumbai. Scores between 215-230 give a strong chance. NMIMS Bangalore has a slightly lower cutoff of around 200-215. These cutoffs vary year to year based on test-taker performance.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many attempts are allowed in NMAT 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NMAT allows 3 attempts per testing season with a mandatory gap of at least 15 days between attempts. Your best score across all attempts is considered by colleges. This makes NMAT significantly more forgiving than CAT, which allows only one attempt per year.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I take both NMAT and CAT?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, most serious MBA aspirants should take both. CAT opens IIMs, FMS, XLRI and 1000+ colleges. NMAT opens NMIMS exclusively (they do not accept CAT), plus some premium private colleges. If NMIMS Mumbai is a target, NMAT is essential. SPJIMR and ISB accept multiple exams including both.',
      },
    },
    {
      '@type': 'Question',
      name: 'What MBA colleges can I get with an NMAT score of 190?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'With an NMAT score of 190, you are competitive for NMIMS Hyderabad, NMIMS Navi Mumbai, TISS Mumbai (HR programme), XIM Bhubaneswar, and Shiv Nadar University. You may also apply to NMIMS Bangalore and NMIMS Mumbai though admission is not guaranteed at this score.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the total fee for NMIMS Mumbai MBA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The total fee for NMIMS Mumbai MBA (PGDM) is approximately Rs 23.5 lakhs for the two-year programme. This covers tuition, library, and academic fees but excludes living expenses. The average placement package from NMIMS Mumbai is approximately Rs 22.5 LPA.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does SPJIMR accept NMAT scores?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, SPJIMR Mumbai accepts NMAT scores along with CAT and XAT. A score of 200+ in NMAT is typically required for SPJIMR shortlisting. SPJIMR is one of the highest-ranked colleges accepting NMAT with average placements of Rs 28 LPA.',
      },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://collvera.com' },
    { '@type': 'ListItem', position: 2, name: 'Exams', item: 'https://collvera.com/exams' },
    { '@type': 'ListItem', position: 3, name: 'NMAT', item: 'https://collvera.com/exams/nmat' },
    { '@type': 'ListItem', position: 4, name: 'Colleges Accepting NMAT', item: 'https://collvera.com/exams/nmat/colleges' },
  ],
}

export default function NMATCollegesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <NMATCollegesClient />
    </>
  )
}
