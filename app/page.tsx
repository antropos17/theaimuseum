import { HeroSection } from '@/components/landing/hero-section'
import { AIEvolutionDemo } from '@/components/landing/ai-evolution-demo'
import { HallsGrid } from '@/components/landing/halls-grid'
import { NewsletterSection } from '@/components/landing/newsletter-section'
import { DonationSection } from '@/components/landing/donation-section'
import { StickySidebarShare } from '@/components/landing/share-components'
import { ExperienceWrapper } from '@/components/3d/ExperienceWrapper'

export default function HomePage() {
  return (
    <ExperienceWrapper>
      <StickySidebarShare />
      <main>
        <div className="sr-only">
          <h1>The AI Museum — Interactive Online Museum of Artificial Intelligence History</h1>
          <p>
            Explore 76 years of AI history from 1950 to 2026. 40 exhibits across 10 themed wings
            covering the Turing Test, ELIZA, Deep Blue, AlphaGo, GPT, DALL-E, ChatGPT, and more.
            Free and open-source. Features include an AI timeline, chat simulator, AI graveyard,
            corporate AI battles, meme hall, job displacement tracker, prediction scorecard, AI IQ
            quiz, and model leaderboard.
          </p>
        </div>
        <HeroSection />
        <AIEvolutionDemo />
        <HallsGrid />
        <NewsletterSection />
        <DonationSection />
      </main>
    </ExperienceWrapper>
  )
}
