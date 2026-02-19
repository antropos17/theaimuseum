import type { Metadata } from "next"
import { Playfair_Display, DM_Sans, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/next"
import { MuseumNav } from "@/components/museum-nav"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "The AI Museum — 75 Years of Artificial Intelligence",
    template: "%s | The AI Museum",
  },
  description:
    "The world's first interactive museum of AI history (1950-2025). From Turing's question to machines that dream.",
  keywords: [
    "AI history",
    "artificial intelligence",
    "ChatGPT",
    "GPT-4",
    "machine learning",
    "deep learning",
    "AI timeline",
    "AI museum",
  ],
  openGraph: {
    title: "The AI Museum",
    description: "75 years of artificial intelligence. From Turing's question to machines that dream.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <MuseumNav />
          <main>{children}</main>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
