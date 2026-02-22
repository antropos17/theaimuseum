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
  const intervalsRef = useRef<NodeJS.Timeout[]>([])
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

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
      // Clean up all intervals and timeouts
      intervalsRef.current.forEach(interval => clearInterval(interval))
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
      intervalsRef.current = []
      timeoutsRef.current = []
    }
  }, [])

  const startSequentialAnimation = () => {
    let delay = 0

    CHAT_WINDOWS.forEach((window, index) => {
      const timeout = setTimeout(() => {
        setVisibleWindows((prev) => [...prev, window.id])
        typeText(window.id, window.aiResponse)
      }, delay)
      timeoutsRef.current.push(timeout)

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
        // Remove interval from tracking when done
        intervalsRef.current = intervalsRef.current.filter(i => i !== interval)
      }
    }, TYPING_DELAY)
    
    intervalsRef.current.push(interval)
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
