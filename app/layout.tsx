import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Playfair_Display } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { MuseumNav } from "@/components/museum-nav"
import { MuseumFooter } from "@/components/museum-footer"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "The AI Museum -- 75 Years of Artificial Intelligence",
    template: "%s | The AI Museum",
  },
  description:
    "The world's first interactive museum of AI history (1950--2025). From Turing's question to machines that dream.",
  keywords: [
    "AI history",
    "artificial intelligence",
    "machine learning",
    "deep learning",
    "AI timeline",
    "interactive museum",
  ],
  openGraph: {
    title: "The AI Museum",
    description:
      "75 years of artificial intelligence. From Turing's question to machines that dream.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="grain" />
          <MuseumNav />
          <main className="min-h-screen">{children}</main>
          <MuseumFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
