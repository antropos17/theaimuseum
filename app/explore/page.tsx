import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ExploreTimeline } from '@/components/explore/explore-timeline'
import { createPageMetadata } from '@/lib/config'

export const metadata = createPageMetadata({
  title: 'AI Timeline: 1950–2026 | The AI Museum',
  description:
    'Interactive timeline of 40 landmark AI systems from 1950 to 2026. Explore breakthroughs from the Turing Test and ELIZA to ChatGPT, GPT-5, Claude Opus 4, and Gemini 3.',
  path: '/explore',
  ogTitle: 'AI Timeline: 1950–2026 | The AI Museum',
  ogDescription:
    'Interactive timeline of 40 landmark AI systems. From ELIZA (1966) to GPT-5.2 Pro (2026).',
  ogImage: '/api/og?title=AI%20Timeline%3A%201950%E2%80%932026&subtitle=40%20Landmark%20AI%20Systems',
})

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
