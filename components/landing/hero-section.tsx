"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { ChevronDown, ChevronRight } from "lucide-react"
import { HeroShareBar } from "./share-components"
import { LiveVisitors } from "./live-visitors"

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
  const mounted = useRef(false)
  const skipBoot = () => {
    setBootComplete(true)
    setStage(4)
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
      {/* Subtle phosphor text-shadow for legibility over CRT texture */}
      <div
        className={`relative z-10 flex max-w-2xl flex-col items-center text-center transition-opacity duration-700 ${bootComplete ? 'opacity-100' : 'opacity-0'}`}
        style={{ textShadow: "0 0 20px rgba(0,255,136,0.15)" }}
      >
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

        {/* Title with phosphor glow - dominating viewport */}
        <div
          className={`transition-all duration-1000 ${stage >= 2 ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <h1 
            className="text-7xl font-bold tracking-tight sm:text-8xl md:text-9xl" 
            style={{ 
              color: "#FFFFFF",
              textShadow: "0 0 40px rgba(0,255,136,0.5), 0 0 80px rgba(0,255,136,0.3), 0 0 120px rgba(0,255,136,0.15), 0 2px 4px rgba(0,0,0,0.8)"
            }}
          >
            The AI Museum
          </h1>
          
          {/* Museum entrance plaque - elegant and high contrast */}
          <div className="mt-6 flex flex-col items-center gap-3">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
            <p 
              className="font-mono text-base font-medium tracking-[0.3em] uppercase sm:text-lg" 
              style={{ 
                color: "#00ff88",
                textShadow: "0 0 20px rgba(0,255,136,0.6)"
              }}
            >
              est. 1950
            </p>
            <p 
              className="max-w-lg text-lg font-medium leading-relaxed sm:text-xl" 
              style={{ 
                color: "#E0E0E0",
                textShadow: "0 1px 2px rgba(0,0,0,0.8)"
              }}
            >
              The world{"'"}s first interactive museum of artificial intelligence
            </p>
            <p 
              className="mt-2 font-mono text-sm tracking-wider opacity-70" 
              style={{ color: "#00ff88" }}
            >
              75 years • 25 exhibits • From Turing to reasoning machines
            </p>
          </div>
        </div>

        {/* CTA buttons - terminal style */}
        <div
          className={`mt-8 flex w-full max-w-md flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center transition-all duration-700 ${stage >= 4 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          {/* Primary: BEGIN JOURNEY - Mainframe console button */}
          <Link
            href="/explore"
            className="group relative inline-flex items-center justify-center rounded-md bg-primary px-8 py-4 font-mono text-base font-bold uppercase tracking-wider text-background transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,255,136,0.6)] sm:flex-1 sm:text-lg animate-in fade-in slide-in-from-bottom-2"
            style={{
              boxShadow: "0 0 20px rgba(0,255,136,0.4), 0 0 40px rgba(0,255,136,0.2), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -2px 8px rgba(0,0,0,0.3)",
              animation: "glow-pulse 3s ease-in-out infinite",
              animationDelay: "1s"
            }}
          >
            {/* Scanline effect */}
            <span className="absolute inset-0 overflow-hidden rounded-md pointer-events-none">
              <span className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/20" />
            </span>
            
            {/* Scale overlay - absolute positioned to not affect layout */}
            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.02] group-active:scale-[0.98]">
              <span className="flex items-center gap-2">
                <span>Begin Journey</span>
                <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </span>
            
            {/* Static content to maintain layout */}
            <span className="invisible flex items-center gap-2">
              <span>Begin Journey</span>
              <ChevronRight className="h-5 w-5" />
            </span>
          </Link>

          {/* Secondary: AI SIMULATOR - Subordinate outline button */}
          <Link
            href="/simulator"
            className="group relative inline-flex items-center justify-center rounded-md border-2 border-primary/40 bg-transparent px-5 py-3 font-mono text-sm font-medium uppercase tracking-wider text-primary/80 transition-all duration-300 hover:border-primary/60 hover:bg-primary/5 hover:text-primary sm:flex-[0.6]"
            style={{
              boxShadow: "0 0 10px rgba(0,255,136,0.1), inset 0 1px 0 rgba(0,255,136,0.1)"
            }}
          >
            {/* Scale overlay - absolute positioned to not affect layout */}
            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.02] group-active:scale-[0.98]">
              AI Simulator
            </span>
            
            {/* Static content to maintain layout */}
            <span className="invisible">AI Simulator</span>
          </Link>
        </div>

        {/* Mobile sticky primary CTA */}
        <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
          <div className="relative bg-gradient-to-t from-background via-background to-transparent px-4 pb-4 pt-8">
            <Link
              href="/explore"
              className="group flex w-full items-center justify-center rounded-md bg-primary px-8 py-4 font-mono text-base font-bold uppercase tracking-wider text-background shadow-[0_0_30px_rgba(0,255,136,0.5)] transition-all duration-300"
              style={{
                boxShadow: "0 0 25px rgba(0,255,136,0.5), 0 0 50px rgba(0,255,136,0.3), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -2px 8px rgba(0,0,0,0.3)",
                willChange: "transform"
              }}
            >
              <span className="flex items-center gap-2 transition-transform duration-300 group-active:scale-[0.97]">
                <span>Begin Journey</span>
                <ChevronRight className="h-5 w-5 transition-transform duration-300 group-active:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>

        {/* Hero Share Bar */}
        <HeroShareBar visible={stage >= 4} />
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 transition-all duration-500 ${stage >= 4 ? "opacity-60" : "opacity-0"}`}
      >
        <span className="font-mono text-[10px] tracking-widest text-muted-foreground">SCROLL</span>
        <ChevronDown className="bounce-chevron h-4 w-4 text-muted-foreground" />
        <LiveVisitors />
      </div>
    </section>
  )
}
