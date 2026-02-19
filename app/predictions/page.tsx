import type { Metadata } from "next"
import { PredictionsView } from "@/components/predictions/predictions-view"

export const metadata: Metadata = {
  title: "AI Predictions -- Expert Forecasts",
  description: "What AI experts predicted and what actually happened. LIVE, FAILING, and IRONIC forecasts.",
  openGraph: {
    title: "AI Predictions | The AI Museum",
    description: "What AI experts predicted and what actually happened.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
}

export default function PredictionsPage() {
  return <PredictionsView />
}
