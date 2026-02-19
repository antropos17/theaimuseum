"use client"

import Link from "next/link"
import {
  Compass,
  GitBranch,
  Skull,
  Swords,
  SmilePlus,
  Users,
  Terminal,
  TrendingUp,
  Trophy,
} from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

const wings = [
  {
    icon: Compass,
    name: "Timeline",
    desc: "Every model that shaped AI",
    count: "25 Exhibits",
    href: "/explore",
    featured: true,
  },
  {
    icon: Terminal,
    name: "Simulator",
    desc: "Chat with AI from every era",
    count: "5 Eras",
    href: "/simulator",
    featured: true,
  },
  {
    icon: GitBranch,
    name: "Evolution",
    desc: "Watch AI evolve in real-time",
    count: "Interactive Graph",
    href: "/evolution",
    featured: false,
  },
  {
    icon: Skull,
    name: "Graveyard",
    desc: "Where AI projects go to die",
    count: "6 Dead Projects",
    href: "/graveyard",
    featured: false,
  },
  {
    icon: Swords,
    name: "AI Wars",
    desc: "The trillion-dollar race",
    count: "5 Companies",
    href: "/battles",
    featured: false,
  },
  {
    icon: SmilePlus,
    name: "Memes",
    desc: "AI's funniest moments",
    count: "8 Moments",
    href: "/memes",
    featured: false,
  },
  {
    icon: Users,
    name: "Victims",
    desc: "Professions disrupted by AI",
    count: "5 Industries",
    href: "/victims",
    featured: false,
  },
  {
    icon: TrendingUp,
    name: "Predictions",
    desc: "What experts got right and wrong",
    count: "5 Forecasts",
    href: "/predictions",
    featured: false,
  },
  {
    icon: Trophy,
    name: "Leaderboard",
    desc: "Community-ranked models",
    count: "Live Rankings",
    href: "/leaderboard",
    featured: false,
  },
]

export function HallsGrid() {
  const { ref, isInView } = useInView()

  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      {/* Section header */}
      <div ref={ref} className={`mb-12 transition-all duration-700 ${isInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Wings
        </p>
        <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Explore the Collection
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Navigate through curated exhibits spanning 75 years of breakthroughs, failures, and everything in between.
        </p>
      </div>

      {/* Bento grid */}
      <div className={`grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 stagger ${isInView ? "visible" : ""}`}>
        {wings.map((wing) => {
          const Icon = wing.icon
          return (
            <Link
              key={wing.name}
              href={wing.href}
              className={cn(
                "group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-200",
                "hover:-translate-y-px hover:border-primary/20 hover:shadow-lg hover:shadow-glow",
                "active:scale-[0.99]",
                wing.featured && "sm:col-span-1 lg:row-span-1"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-2">
                  <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                <span className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                  {wing.count}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {wing.name}
                </h3>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                  {wing.desc}
                </p>
              </div>

              {/* Hover arrow hint */}
              <div className="mt-auto flex items-center gap-1 text-[12px] font-medium text-muted-foreground/0 transition-all group-hover:text-primary">
                <span>Enter</span>
                <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
