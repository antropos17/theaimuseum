"use client"

import Link from "next/link"
import { useInView } from "@/hooks/use-in-view"
import {
  Compass,
  Terminal,
  GitBranch,
  Skull,
  Swords,
  SmilePlus,
  Users,
  TrendingUp,
  Trophy,
} from "lucide-react"

const wings = [
  { icon: Compass, name: "Timeline", desc: "All 25 AI models chronologically", tag: "25", href: "/explore" },
  { icon: Terminal, name: "Simulator", desc: "Chat with AI across 5 eras", tag: "5", href: "/simulator" },
  { icon: GitBranch, name: "Evolution", desc: "AI family tree visualization", tag: "graph", href: "/evolution" },
  { icon: Skull, name: "Graveyard", desc: "Dead AI projects and why", tag: "6", href: "/graveyard" },
  { icon: Swords, name: "AI Wars", desc: "The trillion-dollar race", tag: "5", href: "/battles" },
  { icon: SmilePlus, name: "Memes", desc: "Iconic AI moments", tag: "8", href: "/memes" },
  { icon: Users, name: "Victims", desc: "Professions disrupted by AI", tag: "5", href: "/victims" },
  { icon: TrendingUp, name: "Predictions", desc: "Expert forecasts vs reality", tag: "5", href: "/predictions" },
  { icon: Trophy, name: "Leaderboard", desc: "Top ranked AI models", tag: "rank", href: "/leaderboard" },
]

export function HallsGrid() {
  const { ref: headerRef, isInView: headerVisible } = useInView()
  const { ref: gridRef, isInView: gridVisible } = useInView()

  return (
    <section className="relative z-10 mx-auto max-w-5xl px-4 py-20">
      {/* Section header */}
      <div
        ref={headerRef}
        className={`mb-12 fade-in-up ${headerVisible ? "visible" : ""}`}
      >
        <span className="data-label">[Exhibits]</span>
        <h2 className="mt-3 text-2xl font-light tracking-tight text-foreground sm:text-3xl">
          Explore the Collection
        </h2>
        <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
          Navigate through curated exhibits spanning 75 years of artificial intelligence history.
        </p>
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        className={`grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3 fade-in-up ${gridVisible ? "visible" : ""}`}
        style={{ transitionDelay: "100ms" }}
      >
        {wings.map((wing) => {
          const Icon = wing.icon
          return (
            <Link
              key={wing.name}
              href={wing.href}
              className="group flex flex-col gap-4 bg-card p-6 transition-all duration-300 hover:bg-surface-2"
            >
              <div className="flex items-center justify-between">
                <Icon className="h-5 w-5 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
                <span className="font-mono text-[10px] text-muted-foreground">
                  [{wing.tag}]
                </span>
              </div>

              <div>
                <h3 className="text-sm font-medium text-foreground">{wing.name}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                  {wing.desc}
                </p>
              </div>

              <span className="mt-auto font-mono text-[11px] text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                enter &rarr;
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
