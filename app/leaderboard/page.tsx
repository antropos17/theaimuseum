import type { Metadata } from "next"
import { LeaderboardView } from "@/components/leaderboard/leaderboard-view"

export const metadata: Metadata = {
  title: "AI Leaderboard -- Community Rankings",
  description: "Community-ranked AI models. Vote for your favorites across capability, hype, and safety.",
  openGraph: {
    title: "AI Leaderboard | The AI Museum",
    description: "Community-ranked AI models. Vote for your favorites.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
}

export default function LeaderboardPage() {
  return <LeaderboardView />
}
