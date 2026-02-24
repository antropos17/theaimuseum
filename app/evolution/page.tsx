import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { EvolutionView } from '@/components/evolution/evolution-view'
import { createPageMetadata } from '@/lib/config'

export const metadata = createPageMetadata({
  title: 'Evolution of AI',
  description:
    'Watch AI evolve from 1950 to 2026 through an interactive neural graph and category charts.',
  path: '/evolution',
  ogTitle: 'Evolution of AI | The AI Museum',
  ogDescription: 'Interactive neural graph and capability charts showing 76 years of AI evolution.',
})

export default function EvolutionPage() {
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
      <EvolutionView />
    </>
  )
}
