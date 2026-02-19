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
    const timers = [
      setTimeout(() => setStage(1), 200),
      setTimeout(() => setStage(2), 500),
      setTimeout(() => setStage(3), 900),
      setTimeout(() => setStage(4), 1300),
    ]
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
      {/* Dot grid background */}
      <div className="dot-grid-pattern absolute inset-0 opacity-30" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        {/* Live counter */}
        <div
          className={`mb-8 flex items-center gap-2.5 transition-all duration-700 ${stage >= 1 ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
        >
          <span
            className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-primary"
            aria-hidden="true"
          />
          <span className="font-mono text-[11px] tracking-wider text-muted-foreground">
            {explorers > 0 ? (
              <>{new Intl.NumberFormat("en-US").format(explorers)} explorers online</>
            ) : (
              <>connecting...</>
            )}
          </span>
        </div>

        {/* Title */}
        <div
          className={`transition-all duration-1000 ${stage >= 2 ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <h1 className="text-4xl font-light tracking-tight text-foreground sm:text-5xl md:text-6xl">
            The AI Museum
          </h1>
          <p className="mt-1 font-mono text-sm tracking-wider text-primary text-glow-subtle">
            est. 1950
          </p>
        </div>

        {/* Divider */}
        <div
          className={`my-8 flex items-center gap-3 transition-all duration-700 ${stage >= 2 ? "opacity-100" : "opacity-0"}`}
        >
          <div className="h-px w-12 bg-border" />
          <span className="font-mono text-[10px] text-muted-foreground">//</span>
          <div className="h-px w-12 bg-border" />
        </div>

        {/* Subtitle */}
        <p
          className={`max-w-md text-[15px] leading-relaxed text-muted-foreground transition-all duration-700 ${stage >= 3 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          75 years of artificial intelligence. From Turing{"'"}s question
          to machines that dream. 25 exhibits. 8 categories. 5 eras.
        </p>

        {/* CTA buttons */}
        <div
          className={`mt-10 flex flex-col items-center gap-3 sm:flex-row transition-all duration-700 ${stage >= 4 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <Link
            href="/explore"
            className="glass-btn-primary px-7 py-3 text-foreground"
          >
            Begin Journey
          </Link>
          <Link
            href="/simulator"
            className="glass-btn px-7 py-3 text-muted-foreground"
          >
            AI Simulator
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 transition-all duration-500 ${stage >= 4 ? "opacity-60" : "opacity-0"}`}
      >
        <span className="font-mono text-[10px] tracking-widest text-muted-foreground">SCROLL</span>
        <ChevronDown className="bounce-chevron h-4 w-4 text-muted-foreground" />
      </div>
    </section>
  )
}
