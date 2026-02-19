"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { memes } from "@/data/models"
import { CopyableTerminalCard } from "@/components/ui/copyable-terminal-card"
import { ArrowLeft } from "lucide-react"

/* Deterministic tilt values from index to avoid hydration mismatch */
const tilts = [-2.5, 1.8, -1.2, 2.4, -3, 1.5, -2, 2.8]

export function MemesView() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el) } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-4xl px-4 pb-24 pt-10">
        <Link href="/" className="flex items-center gap-1.5 mb-4 text-xs font-mono text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft size={14} strokeWidth={1.5} />
          Back to Museum
        </Link>
        <span className="data-label">[Hall of Fame]</span>
        <h1 className="mt-3 text-2xl font-light tracking-tight text-foreground sm:text-3xl">
          AI Meme Timeline
        </h1>
        <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
          The funniest, most iconic, and most unhinged moments in AI history.
        </p>

        {/* Card grid */}
        <div
          ref={gridRef}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {memes.map((meme, i) => {
            const baseTilt = tilts[i % tilts.length]
            return (
              <CopyableTerminalCard
                key={i}
                className="group relative flex flex-col items-center p-6 text-center transition-all duration-300"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible
                    ? `translateY(0) rotate(${baseTilt}deg)`
                    : `translateY(24px) rotate(0deg)`,
                  transitionDelay: `${i * 70}ms`,
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {/* Hover tilt override */}
                <style>{`
                  .meme-card-${i}:hover {
                    transform: translateY(-4px) rotate(0deg) scale(1.03) !important;
                    box-shadow: 0 0 20px rgba(0, 255, 136, 0.08);
                  }
                `}</style>
                <div className={`meme-card-${i} contents`}>
                  {/* Large emoji */}
                  <span className="text-5xl leading-none transition-transform duration-300 group-hover:scale-110">
                    {meme.emoji}
                  </span>

                  {/* Year tag */}
                  <span className="mt-4 inline-block font-mono text-[10px] tabular-nums text-primary text-glow-subtle">
                    [{meme.year}]
                  </span>

                  {/* Text */}
                  <p className="mt-2 text-[13px] leading-relaxed text-foreground/90">
                    {meme.text}
                  </p>

                  {/* Hashtag */}
                  <span className="mt-3 inline-block font-mono text-[11px] text-muted-foreground transition-colors group-hover:text-primary">
                    #{meme.tag}
                  </span>
                </div>
              </CopyableTerminalCard>
            )
          })}
        </div>

        {/* Footer quote */}
        <div className="mt-14 text-center">
          <div className="mx-auto h-px w-12 bg-border" />
          <p className="mt-5 font-mono text-[12px] italic text-muted-foreground">
            {'"Any sufficiently advanced bug is indistinguishable from a feature."'}
          </p>
          <p className="mt-1 font-mono text-[10px] text-muted-foreground/60">
            -- Anonymous AI Engineer
          </p>
        </div>
      </div>
    </div>
  )
}
