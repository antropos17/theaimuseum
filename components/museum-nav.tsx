"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { CommandPalette } from "@/components/command-palette"

const navItems = [
  { label: "Explore", href: "/explore" },
  { label: "Evolution", href: "/evolution" },
  { label: "Graveyard", href: "/graveyard" },
  { label: "Battles", href: "/battles" },
  { label: "Memes", href: "/memes" },
  { label: "Victims", href: "/victims" },
  { label: "Simulator", href: "/simulator" },
  { label: "Predictions", href: "/predictions" },
  { label: "Quiz", href: "/quiz" },
  { label: "Leaderboard", href: "/leaderboard" },
]

export function MuseumNav() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [cmdOpen, setCmdOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCmdOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "glass shadow-lg" : "glass"
        )}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="text-primary"
              >
                <circle cx="12" cy="12" r="3" fill="currentColor" />
                <circle cx="12" cy="4" r="2" fill="currentColor" opacity="0.5" />
                <circle cx="12" cy="20" r="2" fill="currentColor" opacity="0.5" />
                <circle cx="4" cy="12" r="2" fill="currentColor" opacity="0.5" />
                <circle cx="20" cy="12" r="2" fill="currentColor" opacity="0.5" />
                <line x1="12" y1="6" x2="12" y2="9" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                <line x1="12" y1="15" x2="12" y2="18" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                <line x1="6" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                <line x1="15" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.3" />
              </svg>
            </div>
            <span className="hidden font-serif text-base font-bold text-foreground sm:inline">
              The AI Museum
            </span>
          </Link>

          {/* Center pills */}
          <div className="scrollbar-none flex items-center gap-1 overflow-x-auto px-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "shrink-0 rounded-lg px-3 py-1.5 font-sans text-xs font-medium transition-all",
                    isActive
                      ? "bg-primary/12 text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Right side */}
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={() => setCmdOpen(true)}
              className="flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background/50 px-2.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden rounded border border-border bg-muted px-1 font-mono text-[10px] sm:inline">
                {"K"}
              </kbd>
            </button>

            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
            )}
          </div>
        </div>
      </nav>

      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
    </>
  )
}
