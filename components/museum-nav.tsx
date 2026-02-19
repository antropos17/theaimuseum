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
  { label: "Passport", href: "/passport" },
]

export function MuseumNav() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [scrollOpacity, setScrollOpacity] = useState(0)
  const [cmdOpen, setCmdOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => {
      const scrollY = window.scrollY
      setScrolled(scrollY > 20)
      const opacity = Math.min(0.65 + (scrollY / 300) * 0.3, 0.95)
      setScrollOpacity(opacity)
    }
    // Defer initial check to avoid state update before mount completes
    const raf = requestAnimationFrame(() => onScroll())
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
    }
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
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? `rgba(10, 10, 15, ${scrollOpacity})` : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
          boxShadow: scrolled ? '0 1px 0 0 rgba(0, 255, 136, 0.08)' : 'none',
        }}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo with abstract neural/computing icon */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Abstract neural connection icon */}
            <div className="relative flex h-9 w-9 items-center justify-center">
              <svg 
                viewBox="0 0 24 24" 
                className="h-9 w-9 text-primary transition-all duration-300 group-hover:text-primary/80"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                {/* Neural network nodes */}
                <circle cx="6" cy="6" r="1.5" fill="currentColor" opacity="0.6" />
                <circle cx="12" cy="4" r="1.5" fill="currentColor" />
                <circle cx="18" cy="6" r="1.5" fill="currentColor" opacity="0.6" />
                <circle cx="6" cy="12" r="1.5" fill="currentColor" opacity="0.8" />
                <circle cx="18" cy="12" r="1.5" fill="currentColor" opacity="0.8" />
                <circle cx="6" cy="18" r="1.5" fill="currentColor" opacity="0.6" />
                <circle cx="12" cy="20" r="1.5" fill="currentColor" />
                <circle cx="18" cy="18" r="1.5" fill="currentColor" opacity="0.6" />
                {/* Connections */}
                <path d="M6 6 L12 4 L18 6" strokeDasharray="2 2" opacity="0.3" />
                <path d="M6 6 L6 12 L6 18" strokeDasharray="2 2" opacity="0.3" />
                <path d="M18 6 L18 12 L18 18" strokeDasharray="2 2" opacity="0.3" />
                <path d="M6 12 L18 12" strokeDasharray="2 2" opacity="0.3" />
                <path d="M6 18 L12 20 L18 18" strokeDasharray="2 2" opacity="0.3" />
              </svg>
            </div>
            <span className="font-mono text-sm font-medium tracking-wide text-foreground transition-colors group-hover:text-primary">
              THE_AI_MUSEUM
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-1 py-2 font-mono text-xs tracking-wide transition-all duration-300",
                    isActive
                      ? "text-primary nav-link-active"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Search trigger with terminal hint */}
            <button
              onClick={() => setCmdOpen(true)}
              className="flex h-9 items-center gap-2.5 border border-border/50 bg-card/30 px-3.5 font-mono text-[10px] text-muted-foreground backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/50 hover:text-foreground"
              aria-label="Search"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">SEARCH</span>
              <kbd className="hidden rounded border border-border/50 bg-muted/50 px-1.5 py-0.5 text-[9px] tracking-wider sm:inline">
                ⌘K
              </kbd>
            </button>

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex h-9 w-9 items-center justify-center border border-border/50 bg-card/30 text-muted-foreground backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/50 hover:text-foreground"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-9 w-9 items-center justify-center border border-border/50 bg-card/30 text-muted-foreground backdrop-blur-sm md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div 
            className="border-t border-border/50 backdrop-blur-xl p-6 md:hidden"
            style={{
              backgroundColor: `rgba(10, 10, 15, 0.9)`
            }}
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-3 font-mono text-xs tracking-wide transition-colors",
                    pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="my-2 h-px bg-border/30" />
              {[
                { label: "Graveyard", href: "/graveyard" },
                { label: "Memes", href: "/memes" },
                { label: "Victims", href: "/victims" },
                { label: "Predictions", href: "/predictions" },
                { label: "Leaderboard", href: "/leaderboard" },
                { label: "Passport", href: "/passport" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-3 font-mono text-xs tracking-wide text-muted-foreground hover:text-foreground"
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
