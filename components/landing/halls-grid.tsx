"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

const halls = [
  { icon: "\uD83E\uDDE0", name: "Timeline", description: "Every model that shaped AI", count: "25 Exhibits", href: "/explore" },
  { icon: "\uD83D\uDCCA", name: "Evolution", description: "Watch AI evolve in real-time", count: "Interactive Graph", href: "/evolution" },
  { icon: "\uD83E\uDEA6", name: "Graveyard", description: "Where AI projects go to die", count: "6 Dead Projects", href: "/graveyard" },
  { icon: "\u2694\uFE0F", name: "Battles", description: "The war for AI dominance", count: "5 Companies", href: "/battles" },
  { icon: "\uD83D\uDE02", name: "Memes", description: "AI's funniest moments", count: "8 Moments", href: "/memes" },
  { icon: "\uD83D\uDC94", name: "Victims", description: "Professions disrupted by AI", count: "5 Industries", href: "/victims" },
  { icon: "\uD83C\uDFAE", name: "Simulator", description: "Talk to AI from every era", count: "5 Eras", href: "/simulator" },
  { icon: "\uD83D\uDD2E", name: "Predictions", description: "What experts got right and wrong", count: "5 Forecasts", href: "/predictions" },
  { icon: "\uD83C\uDFC6", name: "Leaderboard", description: "Community-ranked models", count: "Live Rankings", href: "/leaderboard" },
]

export function HallsGrid() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const refs = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = refs.current.indexOf(entry.target as HTMLAnchorElement)
            if (index !== -1) {
              setTimeout(() => {
                setVisibleItems((prev) => new Set(prev).add(index))
              }, index * 100)
            }
          }
        })
      },
      { threshold: 0.1 }
    )

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
        Inside the Museum
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {halls.map((hall, i) => (
          <Link
            key={hall.name}
            href={hall.href}
            ref={(el) => { refs.current[i] = el }}
            className={`glass glass-hover group flex flex-col gap-3 rounded-xl p-6 transition-all duration-500 ${
              visibleItems.has(i) ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <span className="text-3xl">{hall.icon}</span>
            <h3 className="font-sans text-base font-bold text-foreground">
              {hall.name}
            </h3>
            <p className="font-sans text-[13px] leading-relaxed text-muted-foreground">
              {hall.description}
            </p>
            <span className="mt-auto inline-block rounded-md bg-primary/8 px-2.5 py-1 font-mono text-[11px] text-primary">
              {hall.count}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
