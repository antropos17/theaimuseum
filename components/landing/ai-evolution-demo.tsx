"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const QUESTION = "What is The AI Museum?"

const responses = [
  {
    era: "1966",
    name: "ELIZA",
    label: "First Chatbot",
    response: "Do you think a museum could help you understand what you feel about machines?",
    style: "eliza" as const,
  },
  {
    era: "2019",
    name: "GPT-2",
    label: "1.5B Parameters",
    response: "The AI Museum is a place where people go to see... art? The museum was founded in the year 2000 by a group of scientists who wanted to create a better future for humanity. The museum contains over 10,000 exhibits including a real dinosaur.",
    style: "gpt2" as const,
  },
  {
    era: "2025",
    name: "Modern AI",
    label: "2025",
    response: "The AI Museum is the world's first interactive museum dedicated to the history of artificial intelligence. It covers 75 years — from Turing's 1950 paper to DeepSeek R1 in 2025. You can explore 25 models, compare their evolution, visit the AI Graveyard, test your knowledge in the Quiz, and rate models with community stickers. It's free, open-source, and designed to make AI history accessible to everyone.",
    style: "modern" as const,
  },
]

function TypewriterText({ text, active, speed = 30 }: { text: string; active: boolean; speed?: number }) {
  const [displayedText, setDisplayedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (!active) return
    let index = 0
    setDisplayedText("")
    
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        setShowCursor(false)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, active, speed])

  // Blinking cursor effect
  useEffect(() => {
    if (!showCursor) return
    const cursor = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(cursor)
  }, [showCursor])

  return (
    <span>
      {displayedText}
      {active && displayedText.length < text.length && showCursor && (
        <span className="animate-pulse">▋</span>
      )}
    </span>
  )
}

function ChatWindow({ data, index, triggerAnimation }: { data: typeof responses[0]; index: number; triggerAnimation: boolean }) {
  const [startTyping, setStartTyping] = useState(false)

  useEffect(() => {
    if (!triggerAnimation) return
    const timer = setTimeout(() => {
      setStartTyping(true)
    }, index * 2000) // Stagger by 2 seconds

    return () => clearTimeout(timer)
  }, [triggerAnimation, index])

  const styleClasses = {
    eliza: "bg-black border-2 border-green-500/30",
    gpt2: "bg-zinc-900 border border-amber-600/30",
    modern: "glass-btn bg-card/50 border border-border",
  }

  const textClasses = {
    eliza: "text-green-500 font-mono text-shadow-[0_0_8px_rgba(34,197,94,0.5)]",
    gpt2: "text-amber-100 font-mono",
    modern: "text-foreground",
  }

  return (
    <div className={`relative flex flex-col overflow-hidden ${styleClasses[data.style]} transition-all duration-300`}>
      {/* Header bar */}
      <div className={`flex items-center justify-between border-b px-3 py-2 ${
        data.style === "eliza" ? "border-green-500/30 bg-green-950/20" :
        data.style === "gpt2" ? "border-amber-600/30 bg-amber-950/20" :
        "border-border bg-surface-2"
      }`}>
        <div className="flex items-center gap-2">
          <div className={`flex gap-1 ${data.style === "modern" ? "" : "opacity-50"}`}>
            <div className={`h-2 w-2 rounded-full ${data.style === "modern" ? "bg-red-500" : "bg-green-500"}`} />
            <div className={`h-2 w-2 rounded-full ${data.style === "modern" ? "bg-amber-500" : "bg-green-500/50"}`} />
            <div className={`h-2 w-2 rounded-full ${data.style === "modern" ? "bg-primary" : "bg-green-500/30"}`} />
          </div>
          <span className={`font-mono text-[10px] uppercase tracking-wider ${
            data.style === "eliza" ? "text-green-400" :
            data.style === "gpt2" ? "text-amber-400" :
            "text-muted-foreground"
          }`}>
            {data.name} · {data.era}
          </span>
        </div>
        <span className={`font-mono text-[9px] ${
          data.style === "eliza" ? "text-green-500/60" :
          data.style === "gpt2" ? "text-amber-500/60" :
          "text-muted-foreground"
        }`}>
          [{data.label}]
        </span>
      </div>

      {/* Chat content */}
      <div className="flex-1 space-y-3 p-4">
        {/* User message */}
        <div className="flex justify-end">
          <div className={`max-w-[85%] rounded px-3 py-2 ${
            data.style === "eliza" ? "bg-green-900/30 text-green-300" :
            data.style === "gpt2" ? "bg-amber-900/30 text-amber-200" :
            "bg-primary/10 text-foreground"
          }`}>
            <p className={`text-sm ${data.style === "modern" ? "" : "font-mono"}`}>
              {QUESTION}
            </p>
          </div>
        </div>

        {/* AI response */}
        <div className="flex">
          <div className={`max-w-[90%] rounded px-3 py-2 ${
            data.style === "eliza" ? "bg-green-950/50 border border-green-500/20" :
            data.style === "gpt2" ? "bg-amber-950/50 border border-amber-600/20" :
            "bg-surface-2 border border-border"
          }`}>
            <p className={`text-sm leading-relaxed ${textClasses[data.style]}`}>
              <TypewriterText text={data.response} active={startTyping} speed={data.style === "eliza" ? 50 : 25} />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AIEvolutionDemo() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative border-y border-border bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section header */}
        <div className="mb-12 text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
            {'>'} AI_EVOLUTION_DEMO
          </p>
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            The Same Question. Three Eras.
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground md:text-base">
            Watch how artificial intelligence evolved from deflecting questions to understanding context to generating comprehensive answers.
          </p>
        </div>

        {/* Chat windows grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {responses.map((data, index) => (
            <ChatWindow key={index} data={data} index={index} triggerAnimation={isVisible} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/explore"
            className="group inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            AI evolved. Now explore how.
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
