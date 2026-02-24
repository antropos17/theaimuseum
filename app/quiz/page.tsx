import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { QuizView } from '@/components/quiz/quiz-view'
import { createPageMetadata } from '@/lib/config'

export const metadata = createPageMetadata({
  title: 'AI History Quiz: Test Your Knowledge | The AI Museum',
  description:
    '10 terminal-style diagnostic challenges on AI history. From the Turing Test to large language models — how much do you actually know about artificial intelligence?',
  path: '/quiz',
  ogTitle: 'AI History Quiz | The AI Museum',
  ogDescription:
    "10 terminal-style challenges on AI history. From the Turing Test to LLMs. What's your clearance level?",
  ogImage: '/api/og?title=AI%20History%20Quiz&subtitle=System%20Diagnostic%20%E2%80%94%2010%20Challenges',
})

export default function QuizPage() {
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
      <QuizView />
    </>
  )
}
