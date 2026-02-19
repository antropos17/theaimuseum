"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

const BOOT_LINES = [
  "INITIATING SYSTEM...",
  "LOADING HISTORICAL DATABASE...",
  "CALIBRATING NEURAL NETWORKS...",
  "ESTABLISHING CONNECTION...",
  "SYSTEM READY."
]

export function HeroSection() {
  const [bootComplete, setBootComplete] = useState(false)
  const [bootLineIndex, setBootLineIndex] = useState(0)
  const [stage, setStage] = useState(0)
  const [explorers, setExplorers] = useState(0)
  const [copied, setCopied] = useState(false)
  const mounted = useRef(false)
  const skipBoot = () => {
    setBootComplete(true)
    setStage(4)
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText('https://v0-theaimuseum.vercel.app')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  useEffect(() => {
    mounted.current = true
    
    // Set initial visitor count immediately on mount
    const initialCount = 247 + Math.floor(Math.random() * 337)
    setExplorers(initialCount)
    
    // Boot sequence
    const bootTimers: NodeJS.Timeout[] = []
    BOOT_LINES.forEach((_, i) => {
      bootTimers.push(setTimeout(() => {
        if (mounted.current) setBootLineIndex(i)
      }, i * 400))
    })
    
    // Complete boot after last line + delay
    const completeTimer = setTimeout(() => {
      if (mounted.current) setBootComplete(true)
    }, BOOT_LINES.length * 400 + 600)
    
    // Stage reveal timers after boot
    const stageTimers = [
      setTimeout(() => { if (mounted.current) setStage(1) }, BOOT_LINES.length * 400 + 800),
      setTimeout(() => { if (mounted.current) setStage(2) }, BOOT_LINES.length * 400 + 1100),
      setTimeout(() => { if (mounted.current) setStage(3) }, BOOT_LINES.length * 400 + 1500),
      setTimeout(() => { if (mounted.current) setStage(4) }, BOOT_LINES.length * 400 + 1900),
    ]

    // Visitor counter updates
    const interval = setInterval(() => {
      if (mounted.current) {
        setExplorers((prev) => {
          const delta = Math.floor(Math.random() * 7) - 3
          return Math.max(247, Math.min(583, prev + delta))
        })
      }
    }, 3000)

    return () => {
      mounted.current = false
      bootTimers.forEach(clearTimeout)
      clearTimeout(completeTimer)
      stageTimers.forEach(clearTimeout)
      clearInterval(interval)
    }
  }, [])

  return (
    <section
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4"
      onClick={!bootComplete ? skipBoot : undefined}
      style={{ cursor: !bootComplete ? 'pointer' : 'default' }}
    >
      {/* CRT noise background */}
      <div className="crt-noise absolute inset-0" aria-hidden="true" />
      
      {/* Dot grid background */}
      <div className="dot-grid-pattern absolute inset-0 opacity-30" aria-hidden="true" />

      {/* Boot sequence overlay */}
      {!bootComplete && (
        <div className="absolute inset-0 z-20 flex flex-col items-start justify-center bg-background px-8">
          <div className="font-mono text-xs text-primary space-y-1">
            {BOOT_LINES.slice(0, bootLineIndex + 1).map((line, i) => (
              <div
                key={i}
                className="boot-line"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {'> '}{line}
              </div>
            ))}
          </div>
          <p className="mt-8 font-mono text-[10px] text-muted-foreground">
            [CLICK TO SKIP]
          </p>
        </div>
      )}

      {/* Main content */}
      <div className={`relative z-10 flex max-w-2xl flex-col items-center text-center transition-opacity duration-700 ${bootComplete ? 'opacity-100' : 'opacity-0'}`}>
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
              <>[{new Intl.NumberFormat("en-US").format(explorers)}] ONLINE</>
            ) : (
              <>[CONNECTING...]</>
            )}
          </span>
        </div>

        {/* Title with phosphor glow */}
        <div
          className={`transition-all duration-1000 ${stage >= 2 ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <h1 className="text-4xl font-light tracking-tight text-foreground text-glow-subtle sm:text-5xl md:text-6xl">
            The AI Museum
          </h1>
          <p className="mt-1 font-mono text-sm tracking-wider text-primary">
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

        {/* Subtitle with blinking cursor */}
        <p
          className={`max-w-md text-[15px] leading-relaxed text-muted-foreground transition-all duration-700 ${stage >= 3 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          75 years of artificial intelligence. From Turing{"'"}s question
          to machines that dream<span className={stage >= 3 ? "cursor-blink" : ""}></span>
        </p>

        {/* CTA buttons - terminal style */}
        <div
          className={`mt-10 flex flex-col items-center gap-3 sm:flex-row transition-all duration-700 ${stage >= 4 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <Link
            href="/explore"
            className="glass-btn-primary px-6 py-3 text-foreground"
          >
            <span className="text-primary">{'> '}</span>BEGIN JOURNEY
          </Link>
          <Link
            href="/simulator"
            className="glass-btn px-6 py-3 text-muted-foreground"
          >
            <span className="text-primary">{'> '}</span>AI SIMULATOR
          </Link>
        </div>

        {/* Share bar */}
        <div
          className={`mt-6 flex items-center gap-2 transition-all duration-700 ${stage >= 4 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", transitionDelay: "100ms" }}
        >
          <a
            href="https://twitter.com/intent/tweet?text=I%20just%20discovered%20The%20AI%20Museum%20%E2%80%94%2075%20years%20of%20AI%20history%20%F0%9F%A4%96%20https%3A%2F%2Fv0-theaimuseum.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-dashed border-muted-foreground/30 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            Share on X
          </a>
          <a
            href="https://t.me/share/url?url=https://v0-theaimuseum.vercel.app&text=I%20just%20discovered%20The%20AI%20Museum%20%E2%80%94%2075%20years%20of%20AI%20history%20%F0%9F%A4%96"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-dashed border-muted-foreground/30 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            Telegram
          </a>
          <button
            onClick={handleCopyLink}
            className="border border-dashed border-muted-foreground/30 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
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
