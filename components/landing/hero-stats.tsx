"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { Check, Share2 } from "lucide-react"
import { toast } from "sonner"

const stats = [
  { 
    value: 25, 
    label: "MODELS",
    fact: "The AI Museum documents 25+ AI models across 75 years of artificial intelligence. v0-theaimuseum.vercel.app"
  },
  { 
    value: 75, 
    label: "YEARS",
    fact: "75 years of AI — from Turing's 1950 paper to GPT-4. v0-theaimuseum.vercel.app"
  },
  { 
    value: 8, 
    label: "CATEGORIES",
    fact: "8 fields of AI research: NLP, Computer Vision, Robotics, Expert Systems, Neural Networks, RL, Generative AI, AGI. v0-theaimuseum.vercel.app"
  },
]

const DURATION = 2000

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function AnimatedCounter({ target, active }: { target: number; active: boolean }) {
  const [display, setDisplay] = useState(0)
  const rafRef = useRef<number | null>(null)
  const hasRun = useRef(false)

  const animate = useCallback(() => {
    if (hasRun.current) return
    hasRun.current = true
    const start = performance.now()
    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / DURATION, 1)
      const eased = easeOutCubic(progress)
      setDisplay(Math.round(eased * target))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [target])

  useEffect(() => {
    if (active) animate()
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [active, animate])

  return <>{display}</>
}

export function HeroStats() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const copyFact = async (fact: string) => {
    try {
      await navigator.clipboard.writeText(fact)
      toast("Copied", {
        icon: <Check size={12} />,
        duration: 2000,
      })
    } catch (err) {
      console.error("[v0] Failed to copy:", err)
    }
  }

  const shareAllStats = async () => {
    const combinedText = stats.map(s => s.fact).join("\n\n")
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "The AI Museum Stats",
          text: combinedText,
        })
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("[v0] Share failed:", err)
          await copyFact(combinedText)
        }
      }
    } else {
      await copyFact(combinedText)
    }
  }

  return (
    <div ref={containerRef} className="relative z-10 mx-auto max-w-4xl px-4 py-16">
      <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-20">
        {stats.map((stat) => (
          <button
            key={stat.label}
            onClick={() => copyFact(stat.fact)}
            className="terminal-card flex cursor-pointer flex-col items-center gap-3 px-8 py-6 transition-all duration-200 hover:text-[#00ff88] hover:underline hover:decoration-dashed hover:underline-offset-4 active:scale-95"
            style={{ transitionDuration: "100ms" }}
          >
            <span className="font-mono text-sm text-primary bracket-label">
              [{stat.label}]
            </span>
            <span className="font-mono text-4xl font-light tabular-nums text-glow-subtle sm:text-5xl">
              <AnimatedCounter target={stat.value} active={visible} />
            </span>
          </button>
        ))}
      </div>
      
      {/* Share All Stats */}
      <div className="mt-6 flex items-center justify-center">
        <button
          onClick={shareAllStats}
          className="inline-flex items-center gap-1.5 font-mono text-[9px] text-muted-foreground/60 transition-colors duration-200 hover:text-[#00ff88]"
        >
          <Share2 size={10} strokeWidth={1.5} />
          Share all stats
        </button>
      </div>
    </div>
  )
}
