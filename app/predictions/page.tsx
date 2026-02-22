import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PredictionsView } from '@/components/predictions/predictions-view'

export const metadata: Metadata = {
  title: 'AI Expert Predictions Scorecard | The AI Museum',
  description:
    'Tracking AI expert forecasts vs. reality. Live, failing, and ironic predictions from leading researchers, executives, and futurists — who got it right?',
  openGraph: {
    title: 'AI Expert Predictions Scorecard | The AI Museum',
    description:
      'Tracking AI expert forecasts vs. reality. Who got it right? Live, failing, and ironic predictions.',
    images: [
      {
        url: '/api/og?title=AI%20Predictions%20Scorecard&subtitle=Experts%20vs.%20Reality',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Expert Predictions Scorecard | The AI Museum',
    description:
      'Tracking AI expert forecasts vs. reality. Who got it right? Live, failing, and ironic predictions.',
  },
  alternates: { canonical: 'https://v0-theaimuseum.vercel.app/predictions' },
}

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
