import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ExploreTimeline } from "@/components/explore/explore-timeline"

export const metadata: Metadata = {
  title: "Explore -- AI Timeline 1950-2025",
  description: "Every AI model that shaped history. From Turing's 1950 paper to GPT-o3 in 2025.",
  openGraph: {
    title: "Explore -- AI Timeline 1950-2025 | The AI Museum",
    description: "Every AI model that shaped history. 25 exhibits from 1950 to 2025.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
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

