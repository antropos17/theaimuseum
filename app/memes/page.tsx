import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { MemesView } from '@/components/memes/memes-view'

export const metadata: Metadata = {
  title: 'AI Memes -- Cultural Artifacts',
  description: "AI's funniest, most embarrassing, and most iconic moments in history.",
  openGraph: {
    title: 'AI Memes | The AI Museum',
    description: "AI's funniest, most embarrassing, and most iconic moments.",
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
}

export default function MemesPage() {
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
      <MemesView />
    </>
  )
}
