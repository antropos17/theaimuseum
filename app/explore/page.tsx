import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ExploreTimeline } from "@/components/explore/explore-timeline"

export const metadata: Metadata = {
  title: "AI Timeline: 1950–2025 | The AI Museum",
  description: "Interactive timeline of 25 landmark AI systems from 1950 to 2025. Explore breakthroughs from the Turing Test and ELIZA to ChatGPT, GPT-4, and DeepSeek R1.",
  openGraph: {
    title: "AI Timeline: 1950–2025 | The AI Museum",
    description: "Interactive timeline of 25 landmark AI systems. From ELIZA (1966) to DeepSeek R1 (2025).",
    images: [{ url: "/api/og?title=AI%20Timeline%3A%201950%E2%80%932025&subtitle=25%20Landmark%20AI%20Systems", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Timeline: 1950–2025 | The AI Museum",
    description: "Interactive timeline of 25 landmark AI systems. From ELIZA (1966) to DeepSeek R1 (2025).",
  },
  alternates: { canonical: "https://v0-theaimuseum.vercel.app/explore" },
}

export default function ExplorePage() {
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
      <ExploreTimeline />
    </>
  )
}
