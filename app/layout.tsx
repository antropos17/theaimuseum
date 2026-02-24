import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { Toaster } from 'sonner'
import { MuseumNav } from '@/components/layout/museum-nav'
import { MuseumFooter } from '@/components/layout/museum-footer'
import { PhosphorTrail, ChannelSwitchTransition } from '@/components/effects'
import { TerminalHud } from '@/components/layout'
import { KonamiListener } from '@/lib/hooks'
import { siteConfig } from '@/lib/config'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.name} — 76 Years of Artificial Intelligence History`,
  description: siteConfig.description,
  keywords: [
    'Artificial Intelligence',
    'Machine Learning',
    'Deep Learning',
    'Neural Networks',
    'AI History',
    'Alan Turing',
    'GPT',
    'ChatGPT',
    'Large Language Models',
    'AI Museum',
    'AI Education',
    'Computer Vision',
    'NLP',
    'AI Ethics',
    'AI Timeline',
    'ELIZA',
    'AlphaGo',
    'Generative AI',
  ],
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: `${siteConfig.name} — 76 Years of Artificial Intelligence History`,
    description: siteConfig.shortDescription,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: siteConfig.twitter.card,
    site: siteConfig.twitter.handle,
    title: `${siteConfig.name} — 76 Years of Artificial Intelligence History`,
    description: siteConfig.shortDescription,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteConfig.url,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f5f0' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description:
      "The world's first interactive museum of AI history. 40+ exhibits spanning 1950-2026. From Turing's question to machines that dream.",
    inLanguage: 'en',
    creator: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    about: {
      '@type': 'Thing',
      name: 'Artificial Intelligence History',
      description: '76 years of AI breakthroughs, failures, and cultural impact from 1950 to 2026',
    },
    mainEntity: {
      '@type': 'Museum',
      name: siteConfig.name,
      description: 'Interactive online museum featuring 40+ AI exhibits across 10 themed wings',
      isAccessibleForFree: true,
      availableLanguage: 'English',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/explore?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is The AI Museum?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "The AI Museum is the world's first interactive online museum dedicated to the history of artificial intelligence, covering 40 major AI systems from 1950 to 2026 across 10 themed exhibit wings.",
        },
      },
      {
        '@type': 'Question',
        name: 'Is The AI Museum free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, The AI Museum is completely free, open-source, and requires no login or registration.',
        },
      },
      {
        '@type': 'Question',
        name: 'What AI models are featured in The AI Museum?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The museum features 40+ AI systems including the Turing Test (1950), ELIZA (1966), Deep Blue (1997), AlphaGo (2016), GPT-3 (2020), ChatGPT (2022), GPT-4 (2023), Claude (2023), Gemini (2023), Grok (2024), DeepSeek R1 (2025), GPT-5 (2025), Claude Opus 4 (2025), and Gemini 3 Pro (2025).',
        },
      },
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Script
          id="suppress-threejs-warnings"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const originalWarn = console.warn;
                console.warn = function(...args) {
                  const message = args[0];
                  if (typeof message === 'string' && message.includes('THREE.Clock: This module has been deprecated')) {
                    return;
                  }
                  originalWarn.apply(console, args);
                };
              })();
            `,
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <PhosphorTrail />
          <KonamiListener />

          {/* CRT ambient effects */}
          <div className="phosphor-glow" aria-hidden="true" />
          <div className="crt-overlay" aria-hidden="true" />
          <div className="crt-vignette" aria-hidden="true" />

          <MuseumNav />
          <main className="relative z-10 min-h-screen pb-8">
            <ChannelSwitchTransition>{children}</ChannelSwitchTransition>
          </main>
          <MuseumFooter />
          <TerminalHud />
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
