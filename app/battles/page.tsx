import type { Metadata } from "next"
import { BattlesView } from "@/components/battles/battles-view"

export const metadata: Metadata = {
  title: "AI Wars -- Corporate Battles",
  description: "The war for AI dominance. Companies, drama, and billions of dollars.",
  openGraph: {
    title: "AI Wars | The AI Museum",
    description: "The war for AI dominance. Companies, drama, and billions of dollars.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
}

export default function BattlesPage() {
  return <BattlesView />
}
