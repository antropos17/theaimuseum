"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { HeroBackground } from "./hero-background"

export function HeroSection() {
  const [explorers, setExplorers] = useState(347)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    const interval = setInterval(() => {
      setExplorers(Math.floor(Math.random() * (583 - 247) + 247))
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="noise-overlay relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <HeroBackground />

      {/* Gradient blobs */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #a855f7, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full opacity-[0.03]"
        style={{ background: "radial-gradient(circle, #22d3ee, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <span
          className={`font-mono text-[11px] uppercase tracking-[4px] text-muted-foreground transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          style={{ transitionDelay: "200ms" }}
        >
          EST. 1950
        </span>

        <h1
          className={`mt-4 font-serif text-5xl font-extrabold leading-tight tracking-tight transition-all duration-700 md:text-7xl ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          style={{ transitionDelay: "400ms" }}
        >
          <span className="gradient-text">The AI Museum</span>
        </h1>

        <p
          className={`mt-6 max-w-xl font-sans text-lg leading-relaxed text-muted-foreground transition-all duration-700 md:text-xl ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          style={{ transitionDelay: "600ms" }}
        >
          75 years of artificial intelligence. From Turing&apos;s question to machines that dream.
        </p>

        <div
          className={`mt-6 flex items-center gap-2 transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          style={{ transitionDelay: "800ms" }}
        >
          <span className="status-dot status-dot-active" />
          <span className="font-mono text-xs text-muted-foreground">
            {explorers} explorers online
          </span>
        </div>

        <Link
          href="/explore"
          className={`group mt-8 inline-flex items-center gap-2 rounded-xl px-8 py-4 font-sans text-base font-semibold text-foreground transition-all duration-700 glass-hover gradient-border ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          style={{ transitionDelay: "1000ms" }}
        >
          Begin the Journey
          <span className="inline-block transition-transform group-hover:translate-x-1">
            &rarr;
          </span>
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 z-10 animate-bounce opacity-50">
        <ChevronDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  )
}
