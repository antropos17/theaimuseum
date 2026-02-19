import type { Metadata } from "next"
import { ExploreTimeline } from "@/components/explore/explore-timeline"

export const metadata: Metadata = {
  title: "Explore — AI Timeline 1950-2025",
  description: "Every AI model that shaped history. From Turing's 1950 paper to GPT-o3 in 2025.",
}

export default function ExplorePage() {
  return <ExploreTimeline />
}
