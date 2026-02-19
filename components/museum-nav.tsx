"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Search,
  Sun,
  Moon,
  ChevronDown,
  Compass,
  GitBranch,
  Skull,
  Swords,
  SmilePlus,
  Users,
  Terminal,
  TrendingUp,
  HelpCircle,
  Trophy,
  Menu,
  X,
} from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { CommandPalette } from "@/components/command-palette"

const navGroups = [
  {
    label: "Explore",
    items: [
      { label: "Timeline", href: "/explore", icon: Compass, desc: "Browse all 25 AI models" },
      { label: "Evolution", href: "/evolution", icon: GitBranch, desc: "See how models connect" },
      { label: "Leaderboard", href: "/leaderboard", icon: Trophy, desc: "Rankings by capability" },
    ],
  },
  {
    label: "Halls",
    items: [
      { label: "Graveyard", href: "/graveyard", icon: Skull, desc: "AI projects that died" },
      { label: "AI Wars", href: "/battles", icon: Swords, desc: "The trillion-dollar race" },
      { label: "Memes", href: "/memes", icon: SmilePlus, desc: "Iconic AI moments" },
      { label: "Victims", href: "/victims", icon: Users, desc: "Professions disrupted" },
    ],
  },
  {
    label: "Interactive",
    items: [
      { label: "Simulator", href: "/simulator", icon: Terminal, desc: "Chat with AI across eras" },
      { label: "Predictions", href: "/predictions", icon: TrendingUp, desc: "What experts got wrong" },
      { label: "Quiz", href: "/quiz", icon: HelpCircle, desc: "Test your AI knowledge" },
    ],
  },
]

export function MuseumNav() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [cmdOpen, setCmdOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null)

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
    setActiveDropdown(null)
  }, [pathname])

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setActiveDropdown(label)
  }

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  const isGroupActive = (group: (typeof navGroups)[0]) =>
    group.items.some((item) => pathname === item.href)

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-background/60 backdrop-blur-md"
        )}
      >
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 lg:px-6">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
              <span className="font-serif text-[10px] font-bold text-primary-foreground">AI</span>
            </div>
            <span className="font-serif text-sm font-semibold text-foreground">
              The AI Museum
            </span>
          </Link>

          {/* Desktop nav groups */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navGroups.map((group) => (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(group.label)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={cn(
                    "flex items-center gap-1 rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors",
                    isGroupActive(group)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {group.label}
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 transition-transform duration-200",
                      activeDropdown === group.label && "rotate-180"
                    )}
                  />
                </button>

                {/* Dropdown panel */}
                {activeDropdown === group.label && (
                  <div
                    className="absolute left-1/2 top-full -translate-x-1/2 pt-2"
                    onMouseEnter={() => handleMouseEnter(group.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="animate-slide-down w-64 rounded-xl border border-border bg-popover p-2 shadow-xl">
                      {group.items.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                              "flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors",
                              isActive
                                ? "bg-primary/10 text-foreground"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                          >
                            <Icon className="mt-0.5 h-4 w-4 shrink-0" />
                            <div className="flex flex-col">
                              <span className="text-[13px] font-medium text-foreground">
                                {item.label}
                              </span>
                              <span className="text-[11px] text-muted-foreground">
                                {item.desc}
                              </span>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex shrink-0 items-center gap-1.5">
            {/* Search */}
            <button
              onClick={() => setCmdOpen(true)}
              className="flex h-8 items-center gap-2 rounded-lg border border-border px-2.5 text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
              aria-label="Open search"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden text-xs sm:inline">Search</span>
              <kbd className="hidden rounded border border-border bg-muted px-1 font-mono text-[10px] sm:inline">
                {"K"}
              </kbd>
            </button>

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-3.5 w-3.5" />
                ) : (
                  <Moon className="h-3.5 w-3.5" />
                )}
              </button>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="animate-slide-down border-t border-border bg-background p-4 md:hidden">
            {navGroups.map((group) => (
              <div key={group.label} className="mb-4 last:mb-0">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {group.label}
                </p>
                <div className="flex flex-col gap-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                          isActive
                            ? "bg-primary/10 text-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </header>

      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
    </>
  )
}
