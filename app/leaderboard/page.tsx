import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { LeaderboardView } from '@/components/leaderboard/leaderboard-view'

export const metadata: Metadata = {
  title: 'AI Leaderboard -- Community Rankings',
  description:
    'Community-ranked AI models. Vote for your favorites across capability, hype, and safety.',
  openGraph: {
    title: 'AI Leaderboard | The AI Museum',
    description: 'Community-ranked AI models. Vote for your favorites.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
}

export default function LeaderboardPage() {
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
      <LeaderboardView />
    </>
  )
}
