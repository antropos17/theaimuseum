"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, ChevronDown } from "lucide-react"

export function HeroSection() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4">
      {/* Background effects -- pure CSS, no canvas */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Primary radial glow */}
        <div className="absolute left-1/2 top-[30%] h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.06] blur-[140px]" />
        {/* Secondary subtle glow */}
        <div className="absolute bottom-[20%] right-[20%] h-[300px] w-[400px] rounded-full bg-chart-2/[0.03] blur-[100px]" />
        {/* Dot grid */}
        <div className="dot-grid absolute inset-0 opacity-30" />
        {/* Edge fades */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        {/* Overline pill */}
        <div
          className={`mb-8 flex items-center gap-2.5 rounded-full border border-border bg-surface-1/80 px-4 py-1.5 backdrop-blur-sm transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          style={{ transitionDelay: "0ms" }}
        >
          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-soft" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Est. 1950 &middot; 25 Exhibits &middot; 1950--2025
          </span>
        </div>

        {/* Main heading */}
        <h1
          className={`font-serif text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem] transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
          style={{ transitionDelay: "150ms" }}
        >
          <span className="block text-foreground">The AI</span>
          <span className="block gradient-text">Museum</span>
        </h1>

        {/* Description */}
        <p
          className={`mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
          style={{ transitionDelay: "300ms" }}
        >
          75 years of artificial intelligence. From Turing{"'"}s question to machines that dream.
        </p>

        {/* CTAs */}
        <div
          className={`mt-10 flex flex-col items-center gap-3 sm:flex-row transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
          style={{ transitionDelay: "450ms" }}
        >
          <Link
            href="/explore"
            className="group flex items-center gap-2.5 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
          >
            Begin the Journey
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/simulator"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground active:scale-[0.98]"
          >
            Try the Simulator
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
        style={{ transitionDelay: "700ms" }}
      >
        <ChevronDown className="h-5 w-5 animate-bounce text-muted-foreground/40" />
      </div>
    </section>
  )
}
