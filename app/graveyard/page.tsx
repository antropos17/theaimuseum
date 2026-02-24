import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { GraveyardView } from '@/components/graveyard/graveyard-view'
import { createPageMetadata } from '@/lib/config'

export const metadata = createPageMetadata({
  title: 'AI Graveyard -- Crash Dump Archive',
  description: 'Where AI projects go to die. 6 cautionary tales of discontinued AI systems.',
  path: '/graveyard',
  ogTitle: 'AI Graveyard | The AI Museum',
})

export default function GraveyardPage() {
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
      <GraveyardView />
    </>
  )
}
