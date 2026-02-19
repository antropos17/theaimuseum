import Link from "next/link"

const navLinks = [
  { label: "Explore", href: "/explore" },
  { label: "Evolution", href: "/evolution" },
  { label: "Graveyard", href: "/graveyard" },
  { label: "AI Wars", href: "/battles" },
  { label: "Simulator", href: "/simulator" },
  { label: "Quiz", href: "/quiz" },
  { label: "Leaderboard", href: "/leaderboard" },
]

export function MuseumFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
                <span className="font-serif text-[10px] font-bold text-primary-foreground">
                  AI
                </span>
              </div>
              <span className="font-serif text-sm font-semibold text-foreground">
                The AI Museum
              </span>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
              The world{"'"}s first interactive museum of AI history. 75 years of breakthroughs,
              failures, and everything in between.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              Navigation
            </p>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Meta */}
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              Project
            </p>
            <div className="flex flex-col gap-2">
              <span className="text-[13px] text-muted-foreground">Open Source</span>
              <span className="text-[13px] text-muted-foreground">Built with Next.js</span>
              <span className="text-[13px] text-muted-foreground">Free Forever</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 sm:flex-row">
          <p className="font-mono text-[11px] text-muted-foreground">
            &copy; 2025 The AI Museum. All rights reserved.
          </p>
          <p className="font-mono text-[11px] text-muted-foreground">
            Est. 1950 &middot; 25 Models &middot; 1950--2025
          </p>
        </div>
      </div>
    </footer>
  )
}
