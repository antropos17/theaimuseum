import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { MemesView } from '@/components/memes/memes-view'
import { createPageMetadata } from '@/lib/config'

export const metadata = createPageMetadata({
  title: 'AI Memes -- Cultural Artifacts',
  description: "AI's funniest, most embarrassing, and most iconic moments in history.",
  path: '/memes',
  ogTitle: 'AI Memes | The AI Museum',
  ogDescription: "AI's funniest, most embarrassing, and most iconic moments.",
})

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
