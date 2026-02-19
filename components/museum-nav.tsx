"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { CommandPalette } from "@/components/command-palette"

const navItems = [
  { label: "EXPLORE", href: "/explore" },
  { label: "EVOLUTION", href: "/evolution" },
  { label: "BATTLES", href: "/battles" },
  { label: "SIMULATOR", href: "/simulator" },
  { label: "QUIZ", href: "/quiz" },
]

export function MuseumNav() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [cmdOpen, setCmdOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

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

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-100",
          scrolled
            ? "bg-background/95 border-b-4 border-border"
            : "bg-background/80"
        )}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="pixel-border-gold flex h-8 w-8 items-center justify-center bg-primary">
              <span className="text-[6px] text-primary-foreground">AI</span>
            </div>
            <span className="hidden text-[8px] text-primary sm:block">
              THE AI MUSEUM
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-[7px] transition-colors",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCmdOpen(true)}
              className="pixel-btn flex h-8 items-center gap-2 bg-card px-3 text-[6px] text-muted-foreground"
              aria-label="Search"
            >
              [/] SEARCH
            </button>

            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="pixel-btn flex h-8 w-8 items-center justify-center bg-card text-[8px] text-muted-foreground"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? "O" : "*"}
              </button>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="pixel-btn flex h-8 w-8 items-center justify-center bg-card text-[8px] text-muted-foreground md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? "X" : "="}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="pixel-slide-down border-t-4 border-border bg-background p-4 md:hidden">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-3 text-[7px]",
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {">"} {item.label}
                </Link>
              ))}
              <Link href="/graveyard" className="px-3 py-3 text-[7px] text-muted-foreground hover:text-foreground">{">"} GRAVEYARD</Link>
              <Link href="/memes" className="px-3 py-3 text-[7px] text-muted-foreground hover:text-foreground">{">"} MEMES</Link>
              <Link href="/victims" className="px-3 py-3 text-[7px] text-muted-foreground hover:text-foreground">{">"} VICTIMS</Link>
              <Link href="/predictions" className="px-3 py-3 text-[7px] text-muted-foreground hover:text-foreground">{">"} PREDICTIONS</Link>
              <Link href="/leaderboard" className="px-3 py-3 text-[7px] text-muted-foreground hover:text-foreground">{">"} LEADERBOARD</Link>
            </div>
          </div>
        )}
      </header>

      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
    </>
  )
}
