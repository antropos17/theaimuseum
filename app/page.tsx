import { HeroSection } from "@/components/landing/hero-section"
import { AIEvolutionDemo } from "@/components/landing/ai-evolution-demo"
import { HallsGrid } from "@/components/landing/halls-grid"
import { NewsletterSection } from "@/components/landing/newsletter-section"
import { DonationSection } from "@/components/landing/donation-section"
import { StickySidebarShare } from "@/components/landing/share-components"
import { Toaster } from "sonner"

export default function HomePage() {
  return (
    <>
      <StickySidebarShare />
      <HeroSection />
      <AIEvolutionDemo />
      <HallsGrid />
      <NewsletterSection />
      <DonationSection />
      <Toaster position="bottom-right" />
    </>
  )
}
