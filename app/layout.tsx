import type { Metadata, Viewport } from "next"
import { Press_Start_2P, Playfair_Display } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { MuseumNav } from "@/components/museum-nav"
import { MuseumFooter } from "@/components/museum-footer"
import "./globals.css"

const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "THE AI MUSEUM // 75 YEARS OF AI",
    template: "%s // THE AI MUSEUM",
  },
  description:
    "The world's first interactive 8-bit museum of AI history (1950-2025). From Turing's question to machines that dream.",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e8e0d4" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a12" },
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
      <body className={`${pixelFont.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="starfield" aria-hidden="true" />
          <div className="vignette" aria-hidden="true" />
          <MuseumNav />
          <main className="relative z-10 min-h-screen">{children}</main>
          <MuseumFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
