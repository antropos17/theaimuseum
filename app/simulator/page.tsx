import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SimulatorView } from '@/components/simulator/simulator-view'

export const metadata: Metadata = {
  title: 'AI Chat Simulator: Talk to AI from Every Era | The AI Museum',
  description:
    'Experience how AI conversation evolved from ELIZA (1966) to DeepSeek R1 (2025). An interactive terminal simulator spanning 60 years of chatbot and language model history.',
  openGraph: {
    title: 'AI Chat Simulator | The AI Museum',
    description:
      'Talk to AI from every era. From ELIZA (1966) to DeepSeek R1 (2025) — 60 years of AI conversation.',
    images: [
      {
        url: '/api/og?title=AI%20Chat%20Simulator&subtitle=Talk%20to%20AI%20from%20Every%20Era',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Chat Simulator | The AI Museum',
    description:
      'Talk to AI from every era. From ELIZA (1966) to DeepSeek R1 (2025) — 60 years of AI conversation.',
  },
  alternates: { canonical: 'https://v0-theaimuseum.vercel.app/simulator' },
}

export default function SimulatorPage() {
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
      <SimulatorView />
    </>
  )
}
