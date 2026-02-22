import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || '75 Years of Artificial Intelligence'
    const subtitle = searchParams.get('subtitle') || ''

    return new ImageResponse(
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#0a0a0f',
          padding: '60px 80px',
          fontFamily: 'monospace',
          position: 'relative',
          backgroundImage: `
              radial-gradient(circle, #ffffff08 1px, transparent 1px)
            `,
          backgroundSize: '32px 32px',
          boxShadow: 'inset 0 0 0 2px #00ff8830',
        }}
      >
        {/* Scanline overlay effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, #ffffff05 2px, #ffffff05 3px)',
            pointerEvents: 'none',
          }}
        />

        {/* Top section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 1 }}>
          <div
            style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: 'white',
              letterSpacing: '0.2em',
              display: 'flex',
            }}
          >
            ┌─ THE AI MUSEUM ─┐
          </div>
          <div
            style={{
              fontSize: '16px',
              color: '#a0a0b0',
              display: 'flex',
            }}
          >
            &gt; est. 1950
          </div>
        </div>

        {/* Center section */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: subtitle ? '16px' : '0',
            zIndex: 1,
            marginTop: '-60px',
          }}
        >
          <div
            style={{
              fontSize: '28px',
              color: '#00ff88',
              display: 'flex',
              maxWidth: '1000px',
              lineHeight: 1.4,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: '20px',
                color: '#a0a0b0',
                display: 'flex',
                maxWidth: '1000px',
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        {/* Bottom section */}
        <div
          style={{
            fontSize: '14px',
            color: '#ffffff40',
            display: 'flex',
            zIndex: 1,
          }}
        >
          v0-theaimuseum.vercel.app
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e: unknown) {
    console.log(`Error generating OG image: ${e}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
