import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { EvolutionView } from "@/components/evolution/evolution-view"

export const metadata: Metadata = {
  title: "Evolution of AI",
  description: "Watch AI evolve from 1950 to 2025 through an interactive neural graph and category charts.",
  openGraph: {
    title: "Evolution of AI | The AI Museum",
    description: "Interactive neural graph and capability charts showing 75 years of AI evolution.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
}

export default function EvolutionPage() {
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
      <EvolutionView />
    </>
  )
}
