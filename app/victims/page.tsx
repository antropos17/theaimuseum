import type { Metadata } from "next"
import { VictimsView } from "@/components/victims/victims-view"

export const metadata: Metadata = {
  title: "AI Victims -- Disrupted Professions",
  description: "Professions disrupted by AI. The human cost of progress, measured in percentages.",
  openGraph: {
    title: "AI Victims | The AI Museum",
    description: "Professions disrupted by AI. The human cost of progress.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
}

export default function VictimsPage() {
  return <VictimsView />
}
