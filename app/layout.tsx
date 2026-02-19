import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
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
  title: {
    default: "The AI Museum - 75 Years of Artificial Intelligence",
    template: "%s | The AI Museum",
  },
  description:
    "The world's first interactive museum of AI history. 25 exhibits spanning 1950-2025. From Turing's question to machines that dream.",
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
