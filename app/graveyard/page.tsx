import type { Metadata } from "next"
import { GraveyardView } from "@/components/graveyard/graveyard-view"

export const metadata: Metadata = {
  title: "AI Graveyard -- Crash Dump Archive",
  description: "Where AI projects go to die. 6 cautionary tales of discontinued AI systems.",
  openGraph: {
    title: "AI Graveyard | The AI Museum",
    description: "Where AI projects go to die. 6 cautionary tales of discontinued AI systems.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
}

export default function GraveyardPage() {
  return <GraveyardView />
}
