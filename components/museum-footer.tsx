"use client"

import Link from "next/link"
import { Star } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

const links = [
  { label: "Explore", href: "/explore" },
  { label: "Evolution", href: "/evolution" },
  { label: "Graveyard", href: "/graveyard" },
  { label: "AI Wars", href: "/battles" },
  { label: "Simulator", href: "/simulator" },
  { label: "Memes", href: "/memes" },
  { label: "Victims", href: "/victims" },
  { label: "Predictions", href: "/predictions" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Quiz", href: "/quiz" },
  { label: "Passport", href: "/passport" },
]

const socials = [
  { label: "GitHub", href: "https://github.com/theaimuseum", icon: "GH" },
  { label: "X / Twitter", href: "https://x.com/theaimuseum", icon: "X" },
  { label: "Telegram", href: "https://t.me/theaimuseum", icon: "TG" },
  { label: "Reddit", href: "https://reddit.com/r/theaimuseum", icon: "RD" },
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

            {/* Social icons */}
            <div className="mt-5 flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className="flex h-8 w-8 items-center justify-center border border-dashed border-border font-mono text-[9px] text-muted-foreground transition-all hover:border-primary hover:text-primary"
                >
                  {s.icon}
                </a>
              ))}
            </div>
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
                  className="text-[13px] text-[#B0C4B8] transition-colors duration-200 hover:text-foreground"
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
              <span className="inline-flex items-center gap-1.5">Open Source <Star size={12} strokeWidth={1.5} className="text-muted-foreground" /> <span className="font-mono text-xs text-muted-foreground">127</span></span>
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
            &copy; {new Date().getFullYear()} The AI Museum. All rights reserved.
          </p>
          <p className="font-mono text-[10px] text-muted-foreground">
            est. 1950 &middot; 25 Models &middot; 1950&ndash;2025
          </p>
        </div>
      </div>
    </footer>
  )
}
