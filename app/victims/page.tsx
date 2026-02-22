import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { VictimsView } from '@/components/victims/victims-view'

export const metadata: Metadata = {
  title: 'AI Job Displacement Tracker | The AI Museum',
  description:
    'Which professions is AI disrupting? Data-driven analysis of automation rates across 20+ industries — from creative and technical to service and knowledge work.',
  openGraph: {
    title: 'AI Job Displacement Tracker | The AI Museum',
    description: 'Which professions is AI disrupting? Automation risk data across 20+ industries.',
    images: [
      {
        url: '/api/og?title=AI%20Job%20Displacement%20Tracker&subtitle=The%20Human%20Cost%20of%20Progress',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Job Displacement Tracker | The AI Museum',
    description: 'Which professions is AI disrupting? Automation risk data across 20+ industries.',
  },
  alternates: { canonical: 'https://v0-theaimuseum.vercel.app/victims' },
}

export default function VictimsPage() {
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
      <VictimsView />
    </>
  )
}
