import type { Metadata } from "next"
import { MemesView } from "@/components/memes/memes-view"

export const metadata: Metadata = {
  title: "AI Memes -- Cultural Artifacts",
  description: "AI's funniest, most embarrassing, and most iconic moments in history.",
  openGraph: {
    title: "AI Memes | The AI Museum",
    description: "AI's funniest, most embarrassing, and most iconic moments.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
}

export default function MemesPage() {
  return <MemesView />
}
