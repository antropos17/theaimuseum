import type { Metadata } from "next"
import { EvolutionView } from "@/components/evolution/evolution-view"

export const metadata: Metadata = {
  title: "Evolution of AI",
  description: "Watch AI evolve from 1950 to 2025 through an interactive neural graph and category charts.",
}

export default function EvolutionPage() {
  return <EvolutionView />
}
