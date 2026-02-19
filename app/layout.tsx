import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import Script from "next/script"
import { ThemeProvider } from "@/components/theme-provider"
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {/* CRT background layers */}
          <div className="phosphor-glow" aria-hidden="true" />
          <div className="crt-overlay" aria-hidden="true" />
          <div className="crt-vignette" aria-hidden="true" />

          <MuseumNav />
          <main className="relative z-10 min-h-screen">{children}</main>
          <MuseumFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
