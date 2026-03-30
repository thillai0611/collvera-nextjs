import './globals.css'
import { FloatingChat } from '../components/ChatBox'
import Script from 'next/script'

export const metadata = {
  title: 'Collvera — India\'s AI MBA College Guide',
  description: 'AI-powered MBA college discovery. Find the right college, check eligibility, compare fees and placements. 100% AI. Zero bias.',
  verification: { google: 'Wz1N2UOjAJaLB_collvera' }
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
