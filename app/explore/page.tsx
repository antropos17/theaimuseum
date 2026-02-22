import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ExploreTimeline } from '@/components/explore/explore-timeline'

export const metadata: Metadata = {
  title: 'AI Timeline: 1950–2026 | The AI Museum',
  description:
    'Interactive timeline of 40 landmark AI systems from 1950 to 2026. Explore breakthroughs from the Turing Test and ELIZA to ChatGPT, GPT-5, Claude Opus 4, and Gemini 3.',
  openGraph: {
    title: 'AI Timeline: 1950–2026 | The AI Museum',
    description:
      'Interactive timeline of 40 landmark AI systems. From ELIZA (1966) to GPT-5.2 Pro (2026).',
    images: [
      {
        url: '/api/og?title=AI%20Timeline%3A%201950%E2%80%932026&subtitle=40%20Landmark%20AI%20Systems',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Timeline: 1950–2026 | The AI Museum',
    description:
      'Interactive timeline of 40 landmark AI systems. From ELIZA (1966) to GPT-5.2 Pro (2026).',
  },
  alternates: { canonical: 'https://v0-theaimuseum.vercel.app/explore' },
}

export default function ExplorePage() {
  return (
    <>
      <div className="px-4 pt-6 pb-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Museum
        </Link>
      </div>
      <ExploreTimeline />
    </>
  )
}
