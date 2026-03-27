import './globals.css'

export const metadata = {
  title: 'Collvera — India\'s AI-Powered College Guide',
  description: 'Find the best MBA and PG colleges in India. Compare fees, placements, cutoffs. AI-powered recommendations personalised to your profile.',
  keywords: 'MBA colleges India, CAT cutoffs, IIM admissions, MBA fees placements, best MBA colleges',
  openGraph: {
    title: 'Collvera — India\'s AI College Guide',
    description: 'Compare 100+ MBA colleges. Check eligibility. Find your perfect college.',
    url: 'https://collvera.com',
    siteName: 'Collvera',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
