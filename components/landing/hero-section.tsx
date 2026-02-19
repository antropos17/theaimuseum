"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const [stage, setStage] = useState(0)
  const [explorers, setExplorers] = useState(0)
  const mounted = useRef(false)

  useEffect(() => {
    mounted.current = true
    // Staggered reveal
    const timers = [
      setTimeout(() => setStage(1), 200),
      setTimeout(() => setStage(2), 500),
      setTimeout(() => setStage(3), 900),
      setTimeout(() => setStage(4), 1300),
    ]
    // Live counter — only set client-side to avoid hydration mismatch
    setExplorers(247 + Math.floor(Math.random() * 337))
    const interval = setInterval(() => {
      setExplorers((prev) => {
        const delta = Math.floor(Math.random() * 7) - 3
        return Math.max(247, Math.min(583, prev + delta))
      })
    }, 3000)
    return () => {
      timers.forEach(clearTimeout)
      clearInterval(interval)
    }
  }, [])

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4">
      {/* Layer 1: Gradient mesh — morphing purple & cyan blobs */}
      <div className="gradient-mesh" aria-hidden="true" />

      {/* Layer 2: Dot grid overlay at 2% opacity */}
      <div className="dot-grid absolute inset-0" aria-hidden="true" />

      {/* Layer 3: Pixel grid */}
      <div className="pixel-grid absolute inset-0" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        {/* Live counter — replaces "SYSTEM ONLINE" */}
        <div
          className={`mb-6 flex items-center gap-2 transition-all duration-500 ${stage >= 1 ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
          style={{ transitionTimingFunction: "steps(4)" }}
        >
          <span
            className="pulse-dot inline-block h-2 w-2 bg-[#22c55e]"
            aria-hidden="true"
          />
          <p className="text-[7px] text-muted-foreground">
            {explorers > 0 ? (
              <>{new Intl.NumberFormat("en-US").format(explorers)} EXPLORERS ONLINE</>
            ) : (
              <>CONNECTING...</>
            )}
          </p>
        </div>

        {/* Title — Playfair Display, 72px, gradient text with glow */}
        <div
          className={`transition-all duration-700 ${stage >= 2 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <h1
            className="gradient-heading text-[40px] font-bold leading-[1.1] tracking-tight sm:text-[56px] md:text-[72px]"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              textShadow: "0 0 40px rgba(168, 85, 247, 0.2), 0 0 80px rgba(34, 211, 238, 0.1)",
            }}
          >
            THE AI
            <br />
            MUSEUM
          </h1>
        </div>

        {/* Pixel divider */}
        <div
          className={`my-6 flex items-center gap-2 transition-all duration-500 ${stage >= 2 ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`}
          style={{ transitionTimingFunction: "steps(6)" }}
        >
          <div className="h-[3px] w-10 bg-[#a855f7]" />
          <div className="h-[3px] w-3 bg-[#a855f7]/50" />
          <div className="h-[3px] w-1.5 bg-[#22d3ee]/50" />
        </div>

        {/* Subtitle */}
        <p
          className={`max-w-lg text-[8px] leading-[2.4] text-muted-foreground transition-all duration-600 ${stage >= 3 ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
          style={{ transitionTimingFunction: "steps(4)" }}
        >
          75 YEARS OF ARTIFICIAL INTELLIGENCE. FROM TURING{"'"}S QUESTION TO MACHINES THAT DREAM.
          25 EXHIBITS. 8 CATEGORIES. 5 ERAS.
        </p>

        {/* CTA buttons — glassmorphism */}
        <div
          className={`mt-10 flex flex-col items-center gap-4 sm:flex-row transition-all duration-700 ${stage >= 4 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <Link
            href="/explore"
            className="glass-btn-primary px-8 py-3.5 text-[8px] font-bold text-foreground"
          >
            {">"} BEGIN JOURNEY
          </Link>
          <Link
            href="/simulator"
            className="glass-btn px-8 py-3.5 text-[8px] text-muted-foreground"
          >
            {">"} SIMULATOR
          </Link>
        </div>
      </div>

      {/* Scroll-down indicator — bouncing chevron */}
      <div
        className={`absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 transition-all duration-500 ${stage >= 4 ? "opacity-60" : "opacity-0"}`}
      >
        <p className="text-[6px] text-muted-foreground">SCROLL</p>
        <ChevronDown className="bounce-chevron h-4 w-4 text-muted-foreground" />
      </div>
    </section>
  )
}
