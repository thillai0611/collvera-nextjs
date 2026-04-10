import './globals.css'
import { FloatingChat } from '../components/ChatBox'
import Script from 'next/script'

export const metadata = {
  metadataBase: new URL('https://collvera.com'),
  title: {
    default: 'Collvera — India\'s AI MBA College Guide',
    template: '%s | Collvera'
  },
  description: 'Claude-run MBA college discovery for India. Compare fees, placements and cutoffs across 20+ colleges. Check your eligibility in 2 minutes. 100% AI. Zero bias.',
  keywords: ['MBA colleges India', 'IIM admissions', 'CAT 2025', 'MBA eligibility checker', 'IIM fees placements', 'best MBA India'],
  authors: [{ name: 'Collvera AI' }],
  creator: 'Collvera',
  publisher: 'Collvera',
  verification: { google: 'Wz1N2UOjAJaLB_collvera' },
  icons: {
    icon: [
      { url: '/favicon.ico',  sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon.svg',  type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://collvera.com',
    siteName: 'Collvera',
    title: 'Collvera — India\'s AI MBA College Guide',
    description: 'Claude-run MBA college discovery. Compare fees, placements and cutoffs. Check your eligibility in 2 minutes.',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Collvera — India\'s AI MBA College Guide',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Collvera — India\'s AI MBA College Guide',
    description: 'Claude-run MBA college discovery. Compare fees, placements and cutoffs across 20+ colleges.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://collvera.com',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
      </head>
      <body>
        {children}
        <FloatingChat />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-MP6WXYQ3M9" strategy="afterInteractive"/>
        <Script id="ga4" strategy="afterInteractive">{`
          window.dataLayer=window.dataLayer||[];
          function gtag(){dataLayer.push(arguments);}
          gtag('js',new Date());
          gtag('config','G-MP6WXYQ3M9');
        `}</Script>
      </body>
    </html>
  )
}
