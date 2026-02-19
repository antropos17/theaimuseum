import { HeroSection } from "@/components/landing/hero-section"
import { StatsTicker } from "@/components/landing/stats-ticker"
import { AIEvolutionDemo } from "@/components/landing/ai-evolution-demo"
import { HallsGrid } from "@/components/landing/halls-grid"
import { NewsletterSection } from "@/components/landing/newsletter-section"
import { Toaster } from "sonner"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsTicker />
      <AIEvolutionDemo />
      <HallsGrid />
      <NewsletterSection />
      <Toaster position="bottom-right" />
    </>
  )
}
