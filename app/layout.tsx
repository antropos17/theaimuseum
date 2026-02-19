import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import Script from "next/script"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import { MuseumNav } from "@/components/museum-nav"
import { MuseumFooter } from "@/components/museum-footer"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

export const metadata: Metadata = {
  title: "The AI Museum — 75 Years of Artificial Intelligence History",
  description:
    "Explore 75 years of AI history through interactive exhibits spanning 1950-2025. From Turing's foundational work to modern large language models like GPT and ChatGPT. Learn about machine learning, neural networks, deep learning, computer vision, NLP, and the evolution of artificial intelligence through engaging timelines, simulators, quizzes, and the AI Graveyard of discontinued projects.",
  keywords: [
    "Artificial Intelligence",
    "Machine Learning",
    "Deep Learning",
    "Neural Networks",
    "AI History",
    "Alan Turing",
    "GPT",
    "ChatGPT",
    "Large Language Models",
    "AI Museum",
    "AI Education",
    "Computer Vision",
    "NLP",
    "AI Ethics",
    "AI Timeline",
    "ELIZA",
    "AlphaGo",
    "Generative AI",
  ],
  openGraph: {
    type: "website",
    siteName: "The AI Museum",
    title: "The AI Museum — 75 Years of Artificial Intelligence History",
    description: "Explore 75 years of AI history through interactive exhibits spanning 1950-2025.",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "The AI Museum" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@theaimuseum",
    title: "The AI Museum — 75 Years of Artificial Intelligence History",
    description: "Explore 75 years of AI history through interactive exhibits spanning 1950-2025.",
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://v0-theaimuseum.vercel.app",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://v0-theaimuseum.vercel.app/#website",
        "url": "https://v0-theaimuseum.vercel.app",
        "name": "The AI Museum",
        "description": "The world's first interactive museum of AI history spanning 75 years",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://v0-theaimuseum.vercel.app/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Museum",
        "@id": "https://v0-theaimuseum.vercel.app/#museum",
        "name": "The AI Museum",
        "description": "Interactive museum showcasing 75 years of artificial intelligence history from 1950 to 2025",
        "url": "https://v0-theaimuseum.vercel.app",
        "isAccessibleForFree": true,
        "knowsAbout": [
          "Artificial Intelligence",
          "Machine Learning",
          "Deep Learning",
          "Neural Networks",
          "NLP",
          "Computer Vision",
          "Reinforcement Learning",
          "Expert Systems",
          "AI History",
          "Alan Turing",
          "Turing Test",
          "ELIZA chatbot",
          "SHRDLU",
          "Dartmouth Conference",
          "AI Winter",
          "Deep Blue",
          "IBM Watson",
          "AlphaGo",
          "DeepMind",
          "GPT",
          "Large Language Models",
          "Generative AI",
          "ChatGPT",
          "DALL-E",
          "Stable Diffusion",
          "Midjourney",
          "AI Ethics",
          "AI Safety",
          "AI Alignment",
          "AGI",
          "Transformer Architecture",
          "Backpropagation",
          "CNN",
          "RNN",
          "GAN",
          "Diffusion Models",
          "Prompt Engineering",
          "AI Failures",
          "Discontinued AI Projects",
          "Joseph Weizenbaum",
          "John McCarthy",
          "Marvin Minsky",
          "Geoffrey Hinton",
          "Yann LeCun",
          "Yoshua Bengio",
          "Fei-Fei Li",
          "ImageNet",
          "Demis Hassabis",
          "AI Education",
          "AI Timeline",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": "https://v0-theaimuseum.vercel.app/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is The AI Museum?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The AI Museum is an interactive online museum showcasing 75 years of artificial intelligence history from 1950 to 2025, featuring timelines, interactive simulators, quizzes, and the AI Graveyard.",
            },
          },
          {
            "@type": "Question",
            "name": "What AI can you talk to at The AI Museum?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can interact with historical AI systems like ELIZA (1966), engage with AI-powered exhibits, and explore conversational AI evolution through our interactive simulators.",
            },
          },
          {
            "@type": "Question",
            "name": "Is The AI Museum free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, The AI Museum is completely free and accessible to everyone interested in learning about AI history.",
            },
          },
          {
            "@type": "Question",
            "name": "What is the AI Graveyard?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The AI Graveyard is a special exhibit documenting discontinued AI projects and failures, providing valuable lessons from AI history.",
            },
          },
          {
            "@type": "Question",
            "name": "What time period does The AI Museum cover?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The AI Museum spans 75 years of AI history from 1950 (Turing's foundational work) to 2025 (modern large language models and generative AI).",
            },
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": "https://v0-theaimuseum.vercel.app/#exhibits",
        "name": "AI Museum Exhibits",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "AI Timeline",
            "url": "https://v0-theaimuseum.vercel.app/timeline",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "AI Simulator",
            "url": "https://v0-theaimuseum.vercel.app/simulator",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "AI Quiz",
            "url": "https://v0-theaimuseum.vercel.app/quiz",
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "AI Graveyard",
            "url": "https://v0-theaimuseum.vercel.app/graveyard",
          },
        ],
      },
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <Script id="schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {/* CRT background layers */}
          <div className="phosphor-glow" aria-hidden="true" />
          <div className="crt-overlay" aria-hidden="true" />
          <div className="crt-vignette" aria-hidden="true" />

          <MuseumNav />
          <main className="relative z-10 min-h-screen">{children}</main>
          <MuseumFooter />
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
