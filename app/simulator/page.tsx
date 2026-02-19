import type { Metadata } from "next"
import { SimulatorView } from "@/components/simulator/simulator-view"

export const metadata: Metadata = {
  title: "AI Simulator -- Terminal Experience",
  description: "Talk to AI from every era. Experience how responses evolved from ELIZA (1966) to DeepSeek R1 (2025).",
  openGraph: {
    title: "AI Simulator | The AI Museum",
    description: "Talk to AI from every era. From ELIZA (1966) to DeepSeek R1 (2025).",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
}

export default function SimulatorPage() {
  return <SimulatorView />
}
