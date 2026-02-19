"use client"

import Link from "next/link"
import { useInView } from "@/hooks/use-in-view"

const wings = [
  { icon: "[T]", name: "TIMELINE", desc: "ALL 25 AI MODELS", count: "25", href: "/explore" },
  { icon: "[>]", name: "SIMULATOR", desc: "CHAT WITH AI ERAS", count: "5", href: "/simulator" },
  { icon: "[E]", name: "EVOLUTION", desc: "AI FAMILY TREE", count: "++", href: "/evolution" },
  { icon: "[X]", name: "GRAVEYARD", desc: "DEAD AI PROJECTS", count: "6", href: "/graveyard" },
  { icon: "[!]", name: "AI WARS", desc: "TRILLION $ RACE", count: "5", href: "/battles" },
  { icon: "[:]", name: "MEMES", desc: "AI FUNNY MOMENTS", count: "8", href: "/memes" },
  { icon: "[?]", name: "VICTIMS", desc: "JOBS DISRUPTED", count: "5", href: "/victims" },
  { icon: "[P]", name: "PREDICTIONS", desc: "EXPERT FORECASTS", count: "5", href: "/predictions" },
  { icon: "[#]", name: "LEADERBOARD", desc: "TOP RANKED AI", count: "LV", href: "/leaderboard" },
]

export function HallsGrid() {
  const { ref: headerRef, isInView: headerVisible } = useInView()
  const { ref: gridRef, isInView: gridVisible } = useInView()

  return (
    <section className="relative z-10 mx-auto max-w-5xl px-4 py-20">
      {/* Section header */}
      <div
        ref={headerRef}
        className={`mb-10 transition-opacity duration-200 ${headerVisible ? "opacity-100" : "opacity-0"}`}
        style={{ transitionTimingFunction: "steps(4)" }}
      >
        <p className="mb-3 text-[6px] text-primary">{">>>"} WINGS</p>
        <h2 className="text-[14px] text-foreground sm:text-[18px]">
          EXPLORE THE COLLECTION
        </h2>
        <p className="mt-3 text-[7px] leading-[2] text-muted-foreground">
          NAVIGATE THROUGH CURATED EXHIBITS SPANNING 75 YEARS OF AI.
        </p>
      </div>

      {/* 8-bit grid */}
      <div
        ref={gridRef}
        className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 transition-opacity duration-200 ${gridVisible ? "opacity-100" : "opacity-0"}`}
        style={{ transitionTimingFunction: "steps(6)" }}
      >
        {wings.map((wing, i) => (
          <Link
            key={wing.name}
            href={wing.href}
            className="pixel-border pixel-card-hover group relative flex flex-col gap-4 bg-card p-5"
            style={{
              animationDelay: `${i * 80}ms`,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-primary">{wing.icon}</span>
              <span className="text-[6px] text-muted-foreground">
                [{wing.count}]
              </span>
            </div>

            <div>
              <h3 className="text-[9px] text-foreground">{wing.name}</h3>
              <p className="mt-2 text-[7px] leading-[2] text-muted-foreground">
                {wing.desc}
              </p>
            </div>

            {/* Hover arrow */}
            <p className="text-[7px] text-primary opacity-0 transition-opacity duration-100 group-hover:opacity-100" style={{ transitionTimingFunction: "steps(2)" }}>
              {">"} ENTER
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
