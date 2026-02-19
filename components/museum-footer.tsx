"use client"

import Link from "next/link"
import { useInView } from "@/hooks/use-in-view"

const links = [
  { label: "Explore", href: "/explore" },
  { label: "Evolution", href: "/evolution" },
  { label: "Graveyard", href: "/graveyard" },
  { label: "AI Wars", href: "/battles" },
  { label: "Simulator", href: "/simulator" },
  { label: "Quiz", href: "/quiz" },
  { label: "Leaderboard", href: "/leaderboard" },
]

export function MuseumFooter() {
  const { ref, isInView } = useInView(0.05)

  return (
    <footer ref={ref} className="relative z-10 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className={`flex flex-col gap-10 sm:flex-row sm:justify-between fade-in-up ${isInView ? "visible" : ""}`}>
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center border border-primary/30 bg-primary/10">
                <span className="font-mono text-[10px] font-bold text-primary">AI</span>
              </div>
              <span className="text-sm font-medium text-foreground">
                The AI Museum
              </span>
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
              The world{"'"}s first interactive museum of AI history.
              75 years of breakthroughs, failures, and everything in between.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p className="data-label mb-3">
              [Navigation]
            </p>
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="data-label mb-3">
              [Info]
            </p>
            <div className="flex flex-col gap-2 text-[13px] text-muted-foreground">
              <span>Open Source</span>
              <span>Built with Next.js</span>
              <span>Free Forever</span>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="my-10 overflow-hidden">
          <div className={`h-px w-full bg-border line-grow ${isInView ? "visible" : ""}`} style={{ transitionDelay: "300ms" }} />
        </div>

        <div className={`flex flex-col items-center justify-between gap-3 sm:flex-row fade-in-up ${isInView ? "visible" : ""}`} style={{ transitionDelay: "400ms" }}>
          <p className="font-mono text-[10px] text-muted-foreground">
            2025 The AI Museum. All rights reserved.
          </p>
          <p className="font-mono text-[10px] text-muted-foreground">
            est. 1950 &middot; 25 Models &middot; 1950&ndash;2025
          </p>
        </div>
      </div>
    </footer>
  )
}
