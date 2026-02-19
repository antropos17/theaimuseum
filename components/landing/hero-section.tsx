"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export function HeroSection() {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 200),
      setTimeout(() => setStage(2), 600),
      setTimeout(() => setStage(3), 1000),
      setTimeout(() => setStage(4), 1400),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center px-4">
      {/* Pixel grid background */}
      <div className="pixel-grid absolute inset-0" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        {/* Overline */}
        <div
          className={`mb-8 transition-opacity duration-100 ${stage >= 1 ? "opacity-100" : "opacity-0"}`}
          style={{ transitionTimingFunction: "steps(4)" }}
        >
          <p className="text-[7px] text-primary">
            {">>>"} SYSTEM ONLINE {"<<<"} EST. 1950 // 25 EXHIBITS
          </p>
        </div>

        {/* Title */}
        <div className={`transition-opacity duration-100 ${stage >= 2 ? "opacity-100" : "opacity-0"}`}
          style={{ transitionTimingFunction: "steps(4)" }}
        >
          <h1 className="text-[24px] leading-[1.8] text-foreground sm:text-[32px] md:text-[40px]">
            THE AI
          </h1>
          <h1 className="text-[24px] leading-[1.4] text-primary sm:text-[32px] md:text-[40px]">
            MUSEUM
          </h1>
        </div>

        {/* Pixel divider */}
        <div className={`my-8 flex items-center gap-2 transition-opacity duration-100 ${stage >= 2 ? "opacity-100" : "opacity-0"}`}
          style={{ transitionTimingFunction: "steps(4)" }}
        >
          <div className="h-1 w-8 bg-primary" />
          <div className="h-1 w-2 bg-primary/50" />
          <div className="h-1 w-1 bg-primary/30" />
        </div>

        {/* Description */}
        <p
          className={`max-w-md text-[8px] leading-[2.2] text-muted-foreground transition-opacity duration-100 ${stage >= 3 ? "opacity-100" : "opacity-0"}`}
          style={{ transitionTimingFunction: "steps(4)" }}
        >
          75 YEARS OF ARTIFICIAL INTELLIGENCE. FROM TURING{"'"}S QUESTION TO MACHINES THAT DREAM.
        </p>

        {/* CTAs */}
        <div
          className={`mt-10 flex flex-col items-center gap-4 sm:flex-row transition-opacity duration-100 ${stage >= 4 ? "opacity-100" : "opacity-0"}`}
          style={{ transitionTimingFunction: "steps(4)" }}
        >
          <Link
            href="/explore"
            className="pixel-btn-gold bg-primary px-6 py-3 text-[8px] text-primary-foreground"
          >
            {">"} BEGIN JOURNEY
          </Link>
          <Link
            href="/simulator"
            className="pixel-btn bg-card px-6 py-3 text-[8px] text-muted-foreground"
          >
            {">"} SIMULATOR
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-100 ${stage >= 4 ? "opacity-60" : "opacity-0"}`}
        style={{ transitionTimingFunction: "steps(4)" }}
      >
        <p className="text-[6px] text-muted-foreground" style={{ animation: "blink8bit 1.5s steps(1) infinite" }}>
          SCROLL DOWN
        </p>
      </div>
    </section>
  )
}
