import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { LeaderboardView } from '@/components/leaderboard/leaderboard-view'
import { createPageMetadata } from '@/lib/config'

export const metadata = createPageMetadata({
  title: 'AI Leaderboard -- Community Rankings',
  description:
    'Community-ranked AI models. Vote for your favorites across capability, hype, and safety.',
  path: '/leaderboard',
  ogTitle: 'AI Leaderboard | The AI Museum',
  ogDescription: 'Community-ranked AI models. Vote for your favorites.',
})

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
