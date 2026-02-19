import { HeroSection } from "@/components/landing/hero-section"
import { HallsGrid } from "@/components/landing/halls-grid"
import { NewsletterSection } from "@/components/landing/newsletter-section"
import { MuseumFooter } from "@/components/museum-footer"
import { Toaster } from "sonner"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HallsGrid />
      <NewsletterSection />

      {/* Donation */}
      <section className="mx-auto max-w-lg px-4 py-12 text-center">
        <p className="font-sans text-sm text-muted-foreground">
          Help keep the exhibits in good condition
        </p>
        <p className="mt-1 font-sans text-xs text-muted-foreground">
          The AI Museum is free and open-source.
        </p>
        <a
          href="#"
          className="mt-4 inline-block rounded-lg border border-border px-5 py-2.5 font-sans text-sm text-muted-foreground transition-colors hover:text-foreground hover:border-foreground/20"
        >
          Buy us a coffee
        </a>
      </section>

      <MuseumFooter />
      <Toaster position="bottom-right" theme="dark" />
    </>
  )
}
