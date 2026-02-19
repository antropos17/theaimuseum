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
  ArrowUpRight,
} from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

const wings = [
  { icon: Compass, name: "Timeline", desc: "Every model that shaped AI", count: "25 Exhibits", href: "/explore", featured: true },
  { icon: Terminal, name: "Simulator", desc: "Chat with AI from every era", count: "5 Eras", href: "/simulator", featured: true },
  { icon: GitBranch, name: "Evolution", desc: "Watch AI evolve in real-time", count: "Interactive", href: "/evolution" },
  { icon: Skull, name: "Graveyard", desc: "Where AI projects go to die", count: "6 Dead", href: "/graveyard" },
  { icon: Swords, name: "AI Wars", desc: "The trillion-dollar race", count: "5 Companies", href: "/battles" },
  { icon: SmilePlus, name: "Memes", desc: "AI's funniest moments", count: "8 Moments", href: "/memes" },
  { icon: Users, name: "Victims", desc: "Professions disrupted by AI", count: "5 Industries", href: "/victims" },
  { icon: TrendingUp, name: "Predictions", desc: "What experts got right and wrong", count: "5 Forecasts", href: "/predictions" },
  { icon: Trophy, name: "Leaderboard", desc: "Community-ranked models", count: "Live", href: "/leaderboard" },
]

export function HallsGrid() {
  const { ref: headerRef, isInView: headerVisible } = useInView()
  const { ref: gridRef, isInView: gridVisible } = useInView()

  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      {/* Section header */}
      <div ref={headerRef} className={`mb-12 fade-in-up ${headerVisible ? "visible" : ""}`}>
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

      {/* Bento grid — stagger-scale variant */}
      <div
        ref={gridRef}
        className={`grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 stagger-scale ${gridVisible ? "visible" : ""}`}
      >
        {wings.map((wing) => {
          const Icon = wing.icon
          return (
            <Link
              key={wing.name}
              href={wing.href}
              className={cn(
                "card-hover group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-border bg-card p-6",
                "hover:border-primary/20 active:scale-[0.98]",
                wing.featured && "sm:col-span-1 lg:row-span-1"
              )}
            >
              {/* Subtle hover glow overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-2 transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110">
                  <Icon className="h-4 w-4 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
                </div>
                <span className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-muted-foreground transition-colors duration-300 group-hover:bg-primary/5 group-hover:text-primary/70">
                  {wing.count}
                </span>
              </div>

              <div className="relative">
                <h3 className="text-sm font-semibold text-foreground">
                  {wing.name}
                </h3>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                  {wing.desc}
                </p>
              </div>

              {/* Hover arrow */}
              <div className="relative mt-auto flex items-center gap-1 text-[12px] font-medium text-muted-foreground/0 transition-all duration-300 group-hover:text-primary">
                <span className="transition-transform duration-300 group-hover:translate-x-0">Enter</span>
                <ArrowUpRight className="h-3 w-3 -translate-x-1 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
