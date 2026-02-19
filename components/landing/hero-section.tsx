"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, ChevronDown } from "lucide-react"

export function HeroSection() {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    // Stagger reveal stages: 0 -> 1 -> 2 -> 3 -> 4
    const timers = [
      setTimeout(() => setStage(1), 150),
      setTimeout(() => setStage(2), 400),
      setTimeout(() => setStage(3), 650),
      setTimeout(() => setStage(4), 900),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4">
      {/* ── Background layers ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Breathing primary glow */}
        <div className="breathe absolute left-1/2 top-[30%] h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.06] blur-[140px]" />
        {/* Breathing secondary glow (offset phase) */}
        <div className="breathe-alt absolute bottom-[20%] right-[20%] h-[400px] w-[500px] rounded-full bg-chart-2/[0.04] blur-[120px]" />
        {/* Tertiary floating accent */}
        <div className="float-slow absolute left-[15%] top-[60%] h-[200px] w-[300px] rounded-full bg-chart-4/[0.02] blur-[100px]" />
        {/* Dot grid */}
        <div className="dot-grid absolute inset-0 opacity-30" />
        {/* Floating orbs */}
        <div className="float absolute left-[10%] top-[20%] h-1 w-1 rounded-full bg-primary/30" />
        <div className="float-delay absolute right-[15%] top-[30%] h-1.5 w-1.5 rounded-full bg-chart-2/20" />
        <div className="float-slow absolute left-[30%] bottom-[25%] h-1 w-1 rounded-full bg-chart-4/20" />
        <div className="float absolute right-[25%] bottom-[35%] h-0.5 w-0.5 rounded-full bg-primary/20" />
        {/* Edge fades */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        {/* Overline pill */}
        <div
          className={`mb-8 flex items-center gap-2.5 rounded-full border border-border bg-surface-1/80 px-4 py-1.5 backdrop-blur-sm transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${stage >= 1 ? "translate-y-0 opacity-100 scale-100" : "translate-y-6 opacity-0 scale-95"}`}
        >
          <div className="h-1.5 w-1.5 rounded-full bg-primary glow-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Est. 1950 &middot; 25 Exhibits &middot; 75 Years of AI
          </span>
        </div>

        {/* Main heading — split into lines for staggered reveal */}
        <h1 className="font-serif text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          <span
            className={`block overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${stage >= 2 ? "translate-y-0 opacity-100" : "translate-y-[110%] opacity-0"}`}
          >
            <span className="inline-block text-foreground">The AI</span>
          </span>
          <span
            className={`block overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${stage >= 2 ? "translate-y-0 opacity-100" : "translate-y-[110%] opacity-0"}`}
            style={{ transitionDelay: "100ms" }}
          >
            <span className="inline-block gradient-text">Museum</span>
          </span>
        </h1>

        {/* Description — blur-in effect */}
        <p
          className={`mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg transition-all duration-800 ${stage >= 3 ? "translate-y-0 opacity-100 blur-0" : "translate-y-4 opacity-0 blur-sm"}`}
        >
          75 years of artificial intelligence. From Turing{"'"}s question to machines that dream.
        </p>

        {/* CTAs */}
        <div
          className={`mt-10 flex flex-col items-center gap-3 sm:flex-row transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${stage >= 4 ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
        >
          <Link
            href="/explore"
            className="group relative flex items-center gap-2.5 overflow-hidden rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.97]"
          >
            {/* Shimmer sweep on hover */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">Begin the Journey</span>
            <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/simulator"
            className="group rounded-full border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition-all duration-300 hover:border-foreground/20 hover:text-foreground hover:shadow-sm active:scale-[0.97]"
          >
            Try the Simulator
          </Link>
        </div>
      </div>

      {/* Scroll indicator — gentle bounce */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 ${stage >= 4 ? "opacity-60" : "opacity-0"}`}
        style={{ transitionDelay: "400ms" }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/50">
            Scroll
          </span>
          <ChevronDown className="h-4 w-4 animate-bounce text-muted-foreground/40" />
        </div>
      </div>
    </section>
  )
}
