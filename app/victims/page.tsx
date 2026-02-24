import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { VictimsView } from '@/components/victims/victims-view'
import { createPageMetadata } from '@/lib/config'

export const metadata = createPageMetadata({
  title: 'AI Job Displacement Tracker | The AI Museum',
  description:
    'Which professions is AI disrupting? Data-driven analysis of automation rates across 20+ industries — from creative and technical to service and knowledge work.',
  path: '/victims',
  ogTitle: 'AI Job Displacement Tracker | The AI Museum',
  ogDescription: 'Which professions is AI disrupting? Automation risk data across 20+ industries.',
  ogImage: '/api/og?title=AI%20Job%20Displacement%20Tracker&subtitle=The%20Human%20Cost%20of%20Progress',
})

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
