"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { CommandPalette } from "@/components/command-palette"
import { Search, Sun, Moon, Menu, X } from "lucide-react"

const navItems = [
  { label: "Explore", href: "/explore" },
  { label: "Evolution", href: "/evolution" },
  { label: "Battles", href: "/battles" },
  { label: "Simulator", href: "/simulator" },
  { label: "Quiz", href: "/quiz" },
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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center border border-primary/30 bg-primary/10">
              <span className="font-mono text-[10px] font-bold text-primary text-glow-subtle">AI</span>
            </div>
            <span className="hidden text-sm font-medium text-foreground sm:block">
              The AI Museum
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-1.5 font-mono text-xs tracking-wide transition-colors duration-200",
                  pathname === item.href
                    ? "text-primary text-glow-subtle"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCmdOpen(true)}
              className="flex h-8 items-center gap-2 border border-border bg-card/50 px-3 font-mono text-[10px] text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
              aria-label="Search"
            >
              <Search className="h-3 w-3" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden rounded bg-muted px-1 py-0.5 text-[9px] sm:inline">
                {"K"}
              </kbd>
            </button>

            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex h-8 w-8 items-center justify-center border border-border bg-card/50 text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
              </button>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-8 w-8 items-center justify-center border border-border bg-card/50 text-muted-foreground md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-border bg-background/95 backdrop-blur-xl p-4 md:hidden">
            <div className="flex flex-col gap-0.5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-2.5 font-mono text-xs transition-colors",
                    pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="my-2 h-px bg-border" />
              {[
                { label: "Graveyard", href: "/graveyard" },
                { label: "Memes", href: "/memes" },
                { label: "Victims", href: "/victims" },
                { label: "Predictions", href: "/predictions" },
                { label: "Leaderboard", href: "/leaderboard" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2.5 font-mono text-xs text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
    </>
  )
}
