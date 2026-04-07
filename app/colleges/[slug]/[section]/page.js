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
