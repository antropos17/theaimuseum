import type { Metadata } from "next"
import { QuizView } from "@/components/quiz/quiz-view"

export const metadata: Metadata = {
  title: "AI Quiz -- System Diagnostic",
  description: "Test your AI knowledge with 10 terminal-style diagnostic challenges. What's your clearance level?",
  openGraph: {
    title: "AI Quiz -- System Diagnostic | The AI Museum",
    description: "Test your AI knowledge. 10 challenges. What's your clearance level?",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
}

export default function QuizPage() {
  return <QuizView />
}
