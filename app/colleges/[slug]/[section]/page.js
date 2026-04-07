import { notFound } from 'next/navigation'
import CollegeSectionClient from './CollegeSectionClient'

const VALID_SECTIONS = ['fees', 'placements', 'admissions', 'campus', 'alumni', 'programs', 'reviews']

const META = {
  'iim-ahmedabad': {
    fees: {
      title: 'IIM Ahmedabad Fees 2025: Total Cost Rs 27.5L, Scholarships, Loans & ROI | Collvera',
      description: 'IIM Ahmedabad total fees 2025-27: Rs 27.5 lakhs (tuition Rs 20.1L + other Rs 7.15L). Scholarships, education loans without collateral, monthly living costs and fee ROI analysis.',
    },
    placements: {
      title: 'IIM Ahmedabad Placements 2025: Rs 35.22 LPA Average, BCG 35 Offers, 100% Placed | Collvera',
      description: 'IIM Ahmedabad placement report 2025: Rs 35.22 LPA average, Rs 34.53 LPA median, Rs 1.10 Crore highest. Consulting 40%, BFSI 25%. BCG 35 offers, Accenture Strategy 31 offers. 178 companies.',
    },
    admissions: {
      title: 'IIM Ahmedabad Admission 2026: CAT Cutoff 99%ile, Selection Process, Batch Profile | Collvera',
      description: 'IIM Ahmedabad admission process 2026: CAT cutoff 99 percentile general, 85 percentile sectional minimum. Shortlisting: CAT 65% + Application Rating 35%. PI carries 50% weight in final selection.',
    },
    campus: {
      title: 'IIM Ahmedabad Campus: Louis Kahn Architecture, Hostels, Clubs & Student Life | Collvera',
      description: 'IIM Ahmedabad campus guide: 107 acres, 27 dormitories, Louis Kahn red-brick heritage buildings. 50+ clubs, sports facilities, Gujarat dry state, student life review from current students.',
    },
    alumni: {
      title: 'IIM Ahmedabad Notable Alumni: Raghuram Rajan, Ajay Banga & More | Collvera',
      description: 'IIM Ahmedabad famous alumni: Raghuram Rajan (Former RBI Governor), Ajay Banga (World Bank President), Sanjeev Bikhchandani (Naukri), Deep Kalra (MakeMyTrip), Chetan Bhagat and more.',
    },
    programs: {
      title: 'IIM Ahmedabad Programs 2025: PGP, PGPX, FABM, FPM Fees & Eligibility | Collvera',
      description: 'IIM Ahmedabad programs: PGP MBA Rs 27.5L 2 years, PGPX Executive Rs 35L 1 year, PGP-FABM Rs 27.5L agri-business, FPM PhD fully funded Rs 42,000/month stipend.',
    },
    reviews: {
      title: 'IIM Ahmedabad Reviews 2025: Students on Academics, Placements & Campus Life | Collvera',
      description: 'Honest IIM Ahmedabad student reviews 2025: transformative academics, extreme first-year pressure, 100% placements, isolated Ahmedabad location, Gujarat dry state, limited international offers.',
    },
  }

  'iim-bangalore': {
    fees: {
      title: 'IIM Bangalore Fees 2025: Total Cost Rs 26L, Scholarships, Loans & ROI | Collvera',
      description: 'IIM Bangalore PGP fees 2025-27: Rs 26 lakhs total. Financial aid for income below Rs 8 LPA, Aditya Birla Scholarship Rs 1.75L, education loans, monthly living costs in Bengaluru and ROI analysis.',
    },
    placements: {
      title: 'IIM Bangalore Placements 2025: Rs 34.88 LPA Average, 22 Overseas Offers, 177 Companies | Collvera',
      description: 'IIM Bangalore placement report 2025: Rs 34.88 LPA mean salary, Rs 32.61 LPA median. Consulting 41%, 22 international offers. Accenture Strategy 75 offers, BCG 25, McKinsey 14. 208 PPOs accepted.',
    },
    admissions: {
      title: 'IIM Bangalore Admission 2026: CAT Cutoff, Selection Process & Batch Profile | Collvera',
      description: 'IIM Bangalore PGP 2026 admission: CAT aggregate cutoff 85%ile General. Pre-PI weights: CAT 55%, Academics 30%, Work exp 10%. Post-PI: Interview 40%, WAT 10%. Batch of 544 with 37.5% female.',
    },
    campus: {
      title: 'IIM Bangalore Campus: Bengaluru Location, Hostels, Clubs & International Exchange | Collvera',
      description: 'IIM Bangalore campus guide: Bannerghatta Road Bengaluru, 95 partner universities in 30 countries, 200+ students on exchange annually, NSRCEL startup incubator, Yale Global Network for Advanced Management.',
    },
    alumni: {
      title: 'IIM Bangalore Notable Alumni: Nandan Nilekani, Kiran Mazumdar-Shaw & More | Collvera',
      description: 'IIM Bangalore famous alumni: Nandan Nilekani (Infosys co-founder, Aadhaar), Kiran Mazumdar-Shaw (Biocon founder), S.D. Shibulal (Infosys CEO), Aroon Purie (India Today founder) and more.',
    },
    programs: {
      title: 'IIM Bangalore Programs 2025: PGP, PGPBA, EPGP, FPM Fees & Eligibility | Collvera',
      description: 'IIM Bangalore programs: PGP MBA Rs 26L 2 years, PGPBA Business Analytics Rs 26L, EPGP Executive MBA 1 year FT ranked #34, FPM PhD fully funded. CAT cutoffs, eligibility and structure explained.',
    },
    reviews: {
      title: 'IIM Bangalore Reviews 2025: Students on Academics, Placements & Bengaluru Life | Collvera',
      description: 'Honest IIM Bangalore student reviews 2025: Bengaluru location advantage for tech and startups, 22 international placements, NSRCEL incubation, off-campus flexibility in Year 2, consulting vs tech placement balance.',
    },
  },
}

export async function generateMetadata({ params }) {
  const m = META[params.slug]?.[params.section]
  if (!m) return { title: 'IIM Ahmedabad | Collvera' }
  return {
    title: m.title,
    description: m.description,
    openGraph: { title: m.title, description: m.description },
    alternates: { canonical: `https://collvera.com/colleges/${params.slug}/${params.section}` },
  }
}

export default function CollegeSectionPage({ params }) {
  if (!VALID_SECTIONS.includes(params.section)) notFound()
  return <CollegeSectionClient slug={params.slug} section={params.section} />
}
