"use client"

import { useEffect, useState, useRef } from "react"

interface ChatWindow {
  id: string
  title: string
  year: string
  userMessage: string
  aiResponse: string
  intelligence: number
  tag?: { text: string; variant: "error" | "success" }
}

const CHAT_WINDOWS: ChatWindow[] = [
  {
    id: "eliza",
    title: "eliza.exe",
    year: "1966",
    userMessage: "What is The AI Museum?",
    aiResponse: "Do you think a museum could help you understand what you feel about machines?",
    intelligence: 8,
  },
  {
    id: "gpt2",
    title: "gpt-2.exe",
    year: "2019",
    userMessage: "What is The AI Museum?",
    aiResponse: "The AI Museum is a place where people go to see... art? It was founded in 2000 by scientists who wanted... contains 10,000 exhibits including a real dinosaur.",
    intelligence: 35,
    tag: { text: "HALLUCINATION", variant: "error" },
  },
  {
    id: "modern",
    title: "modern-ai.exe",
    year: "2025",
    userMessage: "What is The AI Museum?",
    aiResponse: "The AI Museum covers 75 years of AI history — from Turing's test to DeepSeek R1. 25 models across 10 wings. Free and open-source.",
    intelligence: 93,
    tag: { text: "VERIFIED", variant: "success" },
  },
]

const TYPING_DELAY = 30

export function AIEvolutionDemo() {
  const [visibleWindows, setVisibleWindows] = useState<string[]>([])
  const [typedText, setTypedText] = useState<Record<string, string>>({})
  const [isTyping, setIsTyping] = useState<Record<string, boolean>>({})
  const sectionRef = useRef<HTMLElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!sectionRef.current) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            startSequentialAnimation()
          }
        })
      },
      { threshold: 0.3 }
    )

    observerRef.current.observe(sectionRef.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const startSequentialAnimation = () => {
    let delay = 0

    CHAT_WINDOWS.forEach((window, index) => {
      setTimeout(() => {
        setVisibleWindows((prev) => [...prev, window.id])
        typeText(window.id, window.aiResponse)
      }, delay)

      const typingDuration = window.aiResponse.length * TYPING_DELAY
      delay += typingDuration + 1500
    })
  }

  const typeText = (windowId: string, text: string) => {
    setIsTyping((prev) => ({ ...prev, [windowId]: true }))
    let index = 0

    const interval = setInterval(() => {
      if (index <= text.length) {
        setTypedText((prev) => ({
          ...prev,
          [windowId]: text.slice(0, index),
        }))
        index++
      } else {
        clearInterval(interval)
        setIsTyping((prev) => ({ ...prev, [windowId]: false }))
      }
    }, TYPING_DELAY)
  }

  const renderIntelligenceBar = (percentage: number) => {
    const blocks = 10
    const filled = Math.round((percentage / 100) * blocks)
    return (
      <span className="font-mono tabular-nums">
        {"█".repeat(filled)}
        {"░".repeat(blocks - filled)}
      </span>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="relative px-4 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="data-label text-primary">
            {'>>> '}SAME QUESTION. THREE ERAS.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {CHAT_WINDOWS.map((window) => {
            const isVisible = visibleWindows.includes(window.id)
            const currentTypedText = typedText[window.id] || ""
            const isCurrentlyTyping = isTyping[window.id]

            return (
              <div
                key={window.id}
                className={`terminal-card flex flex-col p-4 transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <div className="mb-4 flex items-center justify-between border-b border-dashed border-border pb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-[#ff3366]" />
                      <div className="h-2 w-2 rounded-full bg-[#ffb800]" />
                      <div className="h-2 w-2 rounded-full bg-[#00ff88]" />
                    </div>
                    <span className="font-mono text-[11px] text-foreground">
                      {window.title}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {window.year}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="data-label">[USER]</span>
                    <p className="text-xs leading-relaxed text-foreground">
                      {window.userMessage}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="data-label text-primary">[AI]</span>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {currentTypedText}
                      {isCurrentlyTyping && (
                        <span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-primary" />
                      )}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-2 border-t border-dashed border-border pt-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-muted-foreground">
                      Intelligence: {renderIntelligenceBar(window.intelligence)}{" "}
                      <span className="tabular-nums">{window.intelligence}%</span>
                    </span>
                  </div>
                  {window.tag && (
                    <div className="flex">
                      <span
                        className={`inline-flex items-center border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide ${
                          window.tag.variant === "error"
                            ? "border-destructive/30 text-destructive"
                            : "border-primary/30 text-primary"
                        }`}
                      >
                        {window.tag.text}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
  (input: string) => `Good question about "${input.slice(0, 30)}." The AI Museum documents how this kind of thinking evolved over 75 years. Each of our 25 model exhibits includes a full dossier with stats, opinions, bugs, and community stickers.`,
]

function generateResponse(era: "1966" | "2019" | "2026", input: string): string {
  const keyword = extractKeyword(input)
  const pick = (arr: Array<(s: string) => string>) => arr[Math.floor(Math.random() * arr.length)]
  if (era === "1966") return pick(elizaTemplates)(keyword)
  if (era === "2019") return pick(gpt2Templates)(input)
  return pick(modernTemplates)(input)
}

/* ═══════════════════════════════════════════════════
   INTERACTIVE "TRY IT" INPUT
   ═══════════════════════════════════════════════════ */

function TryItSection() {
  const [input, setInput] = useState("")
  const [activeEra, setActiveEra] = useState<"1966" | "2019" | "2026" | null>(null)
  const [responseText, setResponseText] = useState("")
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [userQuestion, setUserQuestion] = useState("")
  const indexRef = useRef(0)

  const eras: { key: "1966" | "2019" | "2026"; label: string; color: string; activeBg: string }[] = [
    { key: "1966", label: "1966", color: "text-green-400 border-green-500/40", activeBg: "bg-green-500/10 border-green-500 text-green-300" },
    { key: "2019", label: "2019", color: "text-amber-400 border-amber-500/40", activeBg: "bg-amber-500/10 border-amber-500 text-amber-300" },
    { key: "2026", label: "2026", color: "text-foreground border-primary/40", activeBg: "bg-primary/10 border-primary text-foreground" },
  ]

  const handleSubmit = (era: "1966" | "2019" | "2026") => {
    if (!input.trim() || isTyping) return
    setUserQuestion(input.trim())
    setActiveEra(era)
    const resp = generateResponse(era, input.trim())
    setResponseText(resp)
    setDisplayedText("")
    setIsTyping(true)
    indexRef.current = 0
    setInput("")
  }

  useEffect(() => {
    if (!isTyping || !responseText) return
    const speed = activeEra === "1966" ? 45 : activeEra === "2019" ? 20 : 15
    const interval = setInterval(() => {
      indexRef.current++
      if (indexRef.current >= responseText.length) {
        setDisplayedText(responseText)
        setIsTyping(false)
        clearInterval(interval)
      } else {
        setDisplayedText(responseText.slice(0, indexRef.current))
      }
    }, speed)
    return () => clearInterval(interval)
  }, [isTyping, responseText, activeEra])

  const eraLabel = activeEra === "1966" ? "ELIZA" : activeEra === "2019" ? "GPT-2" : "Modern AI"
  const responseColor = activeEra === "1966"
    ? "text-green-400 border-green-500/20 bg-green-950/30 font-mono text-shadow-[0_0_8px_rgba(34,197,94,0.4)]"
    : activeEra === "2019"
    ? "text-amber-200 border-amber-600/20 bg-amber-950/30 font-mono"
    : "text-foreground border-border bg-surface-2"

  return (
    <div className="mt-12 md:mt-16">
      {/* Divider */}
      <div className="mx-auto mb-6 flex items-center justify-center gap-4">
        <div className="h-px flex-1 max-w-16 bg-border" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">[Try it yourself]</span>
        <div className="h-px flex-1 max-w-16 bg-border" />
      </div>
      <p className="mb-6 text-center text-sm text-muted-foreground">
        Type any question, pick an era, and see how AI handles it.
      </p>

      <div className="mx-auto max-w-2xl">
        {/* Input row */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-primary/50">{'>'}</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && input.trim()) handleSubmit(activeEra || "2026")
              }}
              placeholder="Ask any AI era a question..."
              className="h-11 w-full border border-border bg-card pl-7 pr-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-primary focus:outline-none"
              disabled={isTyping}
            />
          </div>
          <div className="flex gap-1">
            {eras.map((era) => (
              <button
                key={era.key}
                onClick={() => handleSubmit(era.key)}
                disabled={!input.trim() || isTyping}
                className={`h-11 border px-3 font-mono text-[11px] font-bold transition-all disabled:opacity-30 ${
                  activeEra === era.key ? era.activeBg : `${era.color} hover:bg-card`
                }`}
              >
                {era.label}
              </button>
            ))}
          </div>
        </div>

        {/* Response area */}
        {(displayedText || isTyping) && activeEra && (
          <div className="mt-5 animate-[terminalFadeIn_0.2s_ease-out]">
            <div className="mb-2 flex justify-end">
              <div className="max-w-[80%] border border-border bg-primary/5 px-3 py-1.5">
                <p className="font-mono text-xs text-muted-foreground">{userQuestion}</p>
              </div>
            </div>
            <div className="flex">
              <div className={`max-w-[90%] border px-3 py-2 ${responseColor}`}>
                <p className="mb-1 font-mono text-[9px] uppercase tracking-wider opacity-50">
                  [{eraLabel}]
                </p>
                <p className="text-sm leading-relaxed">
                  {displayedText}
                  {isTyping && <span className="ml-0.5 animate-pulse">&#9611;</span>}
                </p>
              </div>
            </div>
            {!isTyping && (
              <p className="mt-2.5 text-center font-mono text-[9px] text-muted-foreground/60">
                Try another era for the same question -- or ask something new
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   MAIN EXPORT: "See How AI Evolved" Section
   ═══════════════════════════════════════════════════ */

export function AIEvolutionDemo() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)
  const [finishedCount, setFinishedCount] = useState(0)
  const allDone = finishedCount >= 3
  const [countersComplete, setCountersComplete] = useState(0)
  const allCountersComplete = countersComplete >= 3

  const handleWindowFinished = useCallback(() => {
    setFinishedCount((c) => c + 1)
  }, [])

  const handleCounterComplete = useCallback(() => {
    setCountersComplete((c) => c + 1)
  }, [])

  const handleStatClick = async (shareText: string) => {
    try {
      await navigator.clipboard.writeText(shareText)
      toast("Fact copied! Share it →", {
        duration: 2000,
      })
    } catch (err) {
      console.error("[v0] Failed to copy:", err)
      toast.error("Failed to copy")
    }
  }

  const handleShareAll = async () => {
    const allStatsText = "The AI Museum: 25+ models, 75 years, 8 categories of AI history. Free interactive museum 🤖🧠 https://theaimuseum.vercel.app"
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "The AI Museum Stats",
          text: allStatsText,
          url: "https://theaimuseum.vercel.app",
        })
      } catch (err) {
        const errorName = (err as Error).name
        // User cancelled the share dialog - ignore this error
        if (errorName === "AbortError") {
          return
        }
        // NotAllowedError or other errors - fallback to copy
        console.log("[v0] Share failed:", errorName)
        try {
          await navigator.clipboard.writeText(allStatsText)
          toast("Stats copied to clipboard!", { duration: 2000 })
        } catch {
          // If clipboard also fails, open Twitter
          const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(allStatsText)}`
          window.open(twitterUrl, "_blank", "noopener,noreferrer")
        }
      }
    } else {
      // Fallback for browsers without share API
      try {
        await navigator.clipboard.writeText(allStatsText)
        toast("Stats copied to clipboard!", { duration: 2000 })
      } catch {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(allStatsText)}`
        window.open(twitterUrl, "_blank", "noopener,noreferrer")
      }
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative border-y border-border bg-surface py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* ── Section heading ── */}
        <div className="mb-6 text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
            {'>'} AI_EVOLUTION_DEMO
          </p>
          <h2 className="mb-5 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Same Question. 75 Years Apart.
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            We asked three eras of AI the exact same question.
            Watch the leap from deflection to hallucination to genuine understanding.
          </p>
        </div>

        {/* ── Animated stat counters ── */}
        <div ref={statsRef} className="mx-auto mb-4 flex flex-col items-center gap-6 md:mb-6">
          <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16">
            {stats.map((stat, index) => (
              <button
                key={stat.label}
                onClick={() => allCountersComplete && handleStatClick(stat.shareText)}
                disabled={!allCountersComplete}
                className={`group flex flex-col items-center gap-1.5 transition-all duration-200 ${
                  allCountersComplete 
                    ? "cursor-pointer hover:scale-105" 
                    : "cursor-default"
                }`}
                title={allCountersComplete ? "Click to copy fact" : ""}
              >
                <span className="font-mono text-3xl font-light tabular-nums text-foreground text-glow-subtle sm:text-4xl">
                  <AnimatedCounter 
                    target={stat.value} 
                    active={statsVisible}
                    onComplete={handleCounterComplete}
                  />
                  {stat.suffix}
                </span>
                <span className={`font-mono text-[10px] uppercase tracking-widest transition-all duration-200 ${
                  allCountersComplete 
                    ? "text-primary/70 group-hover:text-primary group-hover:underline group-hover:decoration-dashed group-hover:underline-offset-2" 
                    : "text-primary/70"
                }`}>
                  [{stat.label}]
                </span>
              </button>
            ))}
          </div>
          
          {/* Share all stats button */}
          <button
            onClick={handleShareAll}
            disabled={!allCountersComplete}
            className={`inline-flex items-center gap-1.5 border border-border/30 px-3 py-1.5 font-mono text-[10px] text-muted-foreground transition-all duration-200 ${
              allCountersComplete
                ? "opacity-100 hover:border-primary/50 hover:text-foreground hover:shadow-[0_0_20px_rgba(0,255,136,0.15)]"
                : "opacity-0 pointer-events-none"
            }`}
            title="Share all stats"
          >
            <span>📊</span> Share all stats
          </button>

          {/* Explorer Avatars */}
          <div className="flex items-center justify-center mt-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-emerald-500 to-cyan-500" />
              <div className="-ml-2 h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-violet-500 to-fuchsia-500" />
              <div className="-ml-2 h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-amber-500 to-orange-500" />
              <div className="-ml-2 h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-cyan-500 to-blue-500" />
              <div className="-ml-2 h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-rose-500 to-pink-500" />
              <div className="-ml-2 h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-sky-500 to-indigo-500" />
            </div>
            <div className="ml-3 flex items-center gap-1.5">
              <Users size={12} strokeWidth={1.5} className="text-muted-foreground" />
              <span className="font-mono text-[11px] text-muted-foreground">+2.4k explorers</span>
            </div>
          </div>
        </div>

        {/* ── Chat windows grid with neural merge ── */}
        <div className="relative mx-auto max-w-6xl">
          <NeuralMerge visible={allDone} />
          <div className="grid gap-8 md:grid-cols-3 lg:gap-10">
            {responses.map((data, index) => {
              const yearColor = data.style === "eliza"
                ? "text-green-400 text-shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                : data.style === "modern"
                ? "text-primary text-shadow-[0_0_12px_rgba(0,255,136,0.5)]"
                : "text-amber-400 text-shadow-[0_0_10px_rgba(245,158,11,0.5)]"
              return (
                <div key={index} className="flex flex-col items-center gap-3">
                  <ChatWindow data={data} index={index} triggerAnimation={isVisible} onFinished={handleWindowFinished} />
                  <span className={`font-mono text-sm font-bold tracking-wider ${yearColor}`}>
                    {data.era}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Interactive input ── */}
        <TryItSection />

        {/* ── CTA ── */}
        <div className="mt-14 text-center md:mt-16">
          <Link
            href="/explore"
            className="glass-btn-primary group inline-flex items-center gap-2.5 px-6 py-3 font-mono text-sm text-foreground transition-all"
          >
            {'>'} Explore the full timeline
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
