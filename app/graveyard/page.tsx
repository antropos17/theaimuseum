import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { GraveyardView } from '@/components/graveyard/graveyard-view'

export const metadata: Metadata = {
  title: 'AI Graveyard -- Crash Dump Archive',
  description: 'Where AI projects go to die. 6 cautionary tales of discontinued AI systems.',
  openGraph: {
    title: 'AI Graveyard | The AI Museum',
    description: 'Where AI projects go to die. 6 cautionary tales of discontinued AI systems.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
}

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
