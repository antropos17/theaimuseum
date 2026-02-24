import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PredictionsView } from '@/components/predictions/predictions-view'
import { createPageMetadata } from '@/lib/config'

export const metadata = createPageMetadata({
  title: 'AI Expert Predictions Scorecard | The AI Museum',
  description:
    'Tracking AI expert forecasts vs. reality. Live, failing, and ironic predictions from leading researchers, executives, and futurists — who got it right?',
  path: '/predictions',
  ogTitle: 'AI Expert Predictions Scorecard | The AI Museum',
  ogDescription:
    'Tracking AI expert forecasts vs. reality. Who got it right? Live, failing, and ironic predictions.',
  ogImage: '/api/og?title=AI%20Predictions%20Scorecard&subtitle=Experts%20vs.%20Reality',
})

export default function PredictionsPage() {
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
      <PredictionsView />
    </>
  )
}
