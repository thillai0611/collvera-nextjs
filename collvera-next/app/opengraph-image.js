import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Collvera — India\'s AI MBA College Guide'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{
        background: '#0e0c08',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '80px',
        fontFamily: 'serif',
        position: 'relative',
      }}>
        {/* Background grid */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}/>

        {/* Top bar */}
        <div style={{ display:'flex', alignItems:'center', gap: 12, marginBottom: 60 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#fff', fontFamily: 'serif' }}>Collvera</div>
          <div style={{ fontSize: 11, color: '#1D9E75', background: 'rgba(29,158,117,.15)', padding: '3px 10px', borderRadius: 20, border: '1px solid rgba(29,158,117,.3)', fontFamily: 'monospace' }}>AI · live</div>
        </div>

        {/* Main headline */}
        <div style={{ fontSize: 64, fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: 24, maxWidth: 800 }}>
          India's AI MBA College Guide
        </div>

        {/* Sub */}
        <div style={{ fontSize: 24, color: 'rgba(255,255,255,.5)', marginBottom: 48, maxWidth: 700, lineHeight: 1.5 }}>
          Compare fees, placements and cutoffs. Check your eligibility in 2 minutes.
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 40 }}>
          {[['20+', 'Colleges'], ['100%', 'AI-powered'], ['₹2.43L', 'Cheapest top MBA'], ['Free', 'Always']].map(([n, l]) => (
            <div key={l} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#d95f02' }}>{n}</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,.4)', fontFamily: 'monospace' }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <div style={{ position: 'absolute', bottom: 40, right: 80, fontSize: 16, color: 'rgba(255,255,255,.3)', fontFamily: 'monospace' }}>
          collvera.com
        </div>
      </div>
    ),
    { ...size }
  )
}
