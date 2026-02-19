import type { Metadata } from "next"
import { PassportView } from "@/components/passport/passport-view"

export const metadata: Metadata = {
  title: "Neural Passport -- Visitor Card Generator",
  description: "Generate your AI Museum visitor card. Share it with the world.",
  openGraph: {
    title: "Neural Passport | The AI Museum",
    description: "Generate your AI Museum visitor card. Share it with the world.",
    images: [{ url: "/api/og", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
}

export default function PassportPage() {
  return <PassportView />
}
