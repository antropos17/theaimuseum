"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { simulatorEras } from "@/data/models"
import { cn } from "@/lib/utils"

// Era-specific theme colors: from green monochrome (1966) to modern (2025)
const ERA_THEMES: Record<string, { text: string; prompt: string; accent: string; bg: string; label: string }> = {
  "1966": { text: "text-green-400", prompt: "text-green-300", accent: "text-green-500", bg: "bg-green-500", label: "ELIZA // Weizenbaum Labs // 1966" },
  "2020": { text: "text-amber-300", prompt: "text-amber-200", accent: "text-amber-500", bg: "bg-amber-500", label: "GPT-3 // OpenAI // 2020" },
  "2022": { text: "text-cyan-300", prompt: "text-cyan-200", accent: "text-cyan-500", bg: "bg-cyan-500", label: "ChatGPT // OpenAI // 2022" },
  "2024": { text: "text-purple-300", prompt: "text-purple-200", accent: "text-purple-500", bg: "bg-purple-500", label: "Claude 3 / GPT-4 // 2024" },
  "2025": { text: "text-rose-300", prompt: "text-rose-200", accent: "text-rose-500", bg: "bg-rose-500", label: "o3 / DeepSeek R1 // 2025" },
}

interface TermLine {
  type: "system" | "user" | "ai" | "divider" | "quality"
  text: string
  quality?: number
}

export function SimulatorView() {
  const [eraIdx, setEraIdx] = useState(0)
  const [lines, setLines] = useState<TermLine[]>([])
  const [promptIdx, setPromptIdx] = useState(0)
  const [phase, setPhase] = useState<"idle" | "typing-user" | "typing-ai" | "done">("idle")
  const [typedText, setTypedText] = useState("")
  const [showPromptPicker, setShowPromptPicker] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const era = simulatorEras[eraIdx]
  const theme = ERA_THEMES[era.era] ?? ERA_THEMES["2022"]

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines, typedText])

  // Reset on era change
  const switchEra = useCallback((idx: number) => {
    if (timerRef.current) clearInterval(timerRef.current)
    setEraIdx(idx)
    setLines([
      { type: "system", text: `--- SESSION INITIALIZED ---` },
      { type: "system", text: `LOADING MODULE: ${simulatorEras[idx].label}` },
      { type: "system", text: `YEAR: ${simulatorEras[idx].era} | STATUS: ONLINE` },
      { type: "divider", text: "" },
    ])
    setPromptIdx(0)
    setPhase("idle")
    setTypedText("")
    setShowPromptPicker(true)
  }, [])

  // Initialize on mount
  useEffect(() => {
    switchEra(0)
  }, [switchEra])

  // Typewriter function
  function typeText(
    text: string,
    speed: number,
    onChar: (partial: string) => void,
    onDone: () => void
  ) {
    let idx = 0
    timerRef.current = setInterval(() => {
      idx++
      onChar(text.slice(0, idx))
      if (idx >= text.length) {
        if (timerRef.current) clearInterval(timerRef.current)
        onDone()
      }
    }, speed)
  }

  // Handle prompt selection
  function selectPrompt(pIdx: number) {
    if (phase !== "idle") return
    const prompt = era.prompts[pIdx]
    if (!prompt) return

    setShowPromptPicker(false)
    setPhase("typing-user")
    setTypedText("")

    // Type out user prompt
    typeText(prompt.prompt, 25, setTypedText, () => {
      // Commit user line
      setLines((prev) => [
        ...prev,
        { type: "user", text: prompt.prompt },
      ])
      setTypedText("")

      // Small delay, then type AI response
      setTimeout(() => {
        setPhase("typing-ai")
        typeText(prompt.response, 14, setTypedText, () => {
          // Commit AI response + quality bar
          setLines((prev) => [
            ...prev,
            { type: "ai", text: prompt.response },
            { type: "quality", text: `RESPONSE_QUALITY`, quality: prompt.quality },
            { type: "divider", text: "" },
          ])
          setTypedText("")
          setPromptIdx((p) => p + 1)

          // Check if more prompts available
          if (pIdx + 1 >= era.prompts.length) {
            setPhase("done")
            setLines((prev) => [
              ...prev,
              { type: "system", text: "ALL PROMPTS EXHAUSTED. SELECT ANOTHER ERA OR REVIEW LOG." },
            ])
          } else {
            setPhase("idle")
            setShowPromptPicker(true)
          }
        })
      }, 400)
    })
  }

  const isTyping = phase === "typing-user" || phase === "typing-ai"
  const remainingPrompts = era.prompts.slice(promptIdx)
  const [messageCount, setMessageCount] = useState(0)
  const [showSharePrompt, setShowSharePrompt] = useState(false)

  // Track message count and show share prompt after 5+ messages
  useEffect(() => {
    const completedMessages = lines.filter(line => line.type === "ai").length
    setMessageCount(completedMessages)
    if (completedMessages >= 5 && !showSharePrompt && phase === "idle") {
      setShowSharePrompt(true)
    }
  }, [lines, phase, showSharePrompt])

  // Challenge friend share handler
  const handleShare = async () => {
    const aiName = era.label.split(" // ")[0]
    const year = era.era
    const text = `I just talked to ${aiName} from ${year} at The AI Museum 🤖 Try it →`
    const url = "https://v0-theaimuseum.vercel.app/simulator"
    
    if (navigator.share) {
      try {
        await navigator.share({ text, url })
        setShowSharePrompt(false)
      } catch (err) {
        console.log("[v0] Share cancelled or failed:", err)
      }
    } else {
      // Fallback to Twitter intent
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
      window.open(twitterUrl, "_blank", "noopener,noreferrer")
    }
  }

  // Copy conversation to clipboard
  const handleCopyConversation = async () => {
    const transcript = lines
      .filter(line => line.type === "user" || line.type === "ai")
      .map(line => {
        if (line.type === "user") return `> ${line.text}`
        return line.text
      })
      .join("\n\n")
    
    const fullText = `Conversation with ${era.label}\n${"=".repeat(50)}\n\n${transcript}\n\n${"-".repeat(50)}\nThe AI Museum - https://v0-theaimuseum.vercel.app/simulator`
    
    try {
      await navigator.clipboard.writeText(fullText)
      // You could add a toast here if you want
    } catch (err) {
      console.log("[v0] Copy failed:", err)
    }
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-10">
        {/* Header */}
        <span className="data-label">[Interactive Terminal]</span>
        <h1 className="mt-3 text-2xl font-light tracking-tight text-foreground sm:text-3xl">
          AI Simulator
        </h1>
        <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
          Converse with AI systems across 60 years of evolution. Each era has its own personality.
        </p>

        {/* Era selector */}
        <div className="mt-6 flex flex-wrap gap-2">
          {simulatorEras.map((e, i) => {
            const t = ERA_THEMES[e.era] ?? ERA_THEMES["2022"]
            return (
              <button
                key={e.era}
                onClick={() => switchEra(i)}
                disabled={isTyping}
                className={cn(
                  "group relative border px-3 py-2 font-mono text-[11px] transition-all duration-200",
                  eraIdx === i
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/20",
                  isTyping && "opacity-50 pointer-events-none"
                )}
              >
                <span className="block text-[10px] opacity-50">{e.era}</span>
                <span className="block">{e.label}</span>
                {eraIdx === i && (
                  <span className={cn("absolute -bottom-px left-0 right-0 h-px", t.bg)} />
                )}
              </button>
            )
          })}
        </div>

        {/* Terminal window */}
        <div className="mt-5 overflow-hidden border border-border bg-[#0a0a0f]">
          {/* Title bar */}
          <div className="flex items-center justify-between border-b border-border/50 bg-[#111118] px-4 py-2">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
              </div>
              <span className={cn("font-mono text-[10px]", theme.accent)}>
                {theme.label}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {isTyping && (
                <span className="font-mono text-[10px] text-yellow-400 animate-pulse">
                  PROCESSING...
                </span>
              )}
              <span className="font-mono text-[10px] text-muted-foreground">
                {promptIdx}/{era.prompts.length}
              </span>
            </div>
          </div>

          {/* Terminal body */}
          <div
            ref={scrollRef}
            className="h-[420px] overflow-y-auto p-4 font-mono text-[13px] leading-relaxed"
            style={{
              // CRT phosphor glow per era
              textShadow: era.era === "1966"
                ? "0 0 6px rgba(74, 222, 128, 0.25)"
                : "none",
            }}
          >
            {/* Rendered lines */}
            {lines.map((line, i) => {
              if (line.type === "divider") {
                return (
                  <div key={i} className="my-2 border-t border-dashed border-border/30" />
                )
              }
              if (line.type === "system") {
                return (
                  <div key={i} className="mb-1 text-muted-foreground text-[11px]">
                    <span className="opacity-50">[SYS]</span> {line.text}
                  </div>
                )
              }
              if (line.type === "user") {
                return (
                  <div key={i} className={cn("mb-1", theme.prompt)}>
                    <span className="opacity-60">{"> "}</span>
                    {line.text}
                  </div>
                )
              }
              if (line.type === "ai") {
                return (
                  <div key={i} className={cn("mb-1 whitespace-pre-wrap pl-2 border-l border-dashed", theme.text, `border-${theme.accent.replace("text-", "")}`)}>
                    {line.text}
                  </div>
                )
              }
              if (line.type === "quality") {
                const q = line.quality ?? 0
                return (
                  <div key={i} className="my-2 flex items-center gap-3">
                    <span className="text-[10px] text-muted-foreground font-mono">[QUALITY]</span>
                    <div className="flex-1 h-1.5 bg-border/30 overflow-hidden">
                      <div
                        className={cn("h-full transition-all duration-1000 ease-out", theme.bg)}
                        style={{ width: `${q}%` }}
                      />
                    </div>
                    <span className={cn("text-[11px] font-mono tabular-nums", theme.accent)}>
                      {q}/100
                    </span>
                  </div>
                )
              }
              return null
            })}

            {/* Currently typing text */}
            {phase === "typing-user" && typedText && (
              <div className={cn("mb-1", theme.prompt)}>
                <span className="opacity-60">{"> "}</span>
                {typedText}
                <span className="cursor-blink" />
              </div>
            )}
            {phase === "typing-ai" && typedText && (
              <div className={cn("mb-1 whitespace-pre-wrap pl-2 border-l border-dashed", theme.text, "border-border")}>
                {typedText}
                <span className="cursor-blink" />
              </div>
            )}

            {/* Prompt picker */}
            {showPromptPicker && phase === "idle" && remainingPrompts.length > 0 && (
              <div className="mt-3">
                <div className="mb-2 text-[10px] text-muted-foreground">
                  [SELECT PROMPT]
                </div>
                <div className="flex flex-col gap-1.5">
                  {remainingPrompts.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => selectPrompt(promptIdx + i)}
                      className={cn(
                        "group text-left border border-dashed border-border/50 px-3 py-2 transition-all duration-200",
                        "hover:border-primary/40 hover:bg-primary/5"
                      )}
                    >
                      <span className={cn("font-mono text-[12px]", theme.prompt)}>
                        <span className="opacity-50 mr-2">{`0${i + 1}>`}</span>
                        {p.prompt}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Idle cursor when nothing happening and no prompts */}
            {phase === "idle" && remainingPrompts.length === 0 && lines.length > 0 && (
              <div className="mt-2 text-muted-foreground">
                <span className="opacity-60">{"> "}</span>
                <span className="cursor-blink" />
              </div>
            )}

            {/* Done state */}
            {phase === "done" && (
              <div className="mt-2 text-muted-foreground">
                <span className="opacity-60">{"> "}</span>
                <span className="cursor-blink" />
              </div>
            )}
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between border-t border-border/50 bg-[#111118] px-4 py-2">
            <div className="flex items-center gap-3">
              <span className={cn(
                "inline-block h-1.5 w-1.5 rounded-full",
                isTyping ? "bg-yellow-400 animate-pulse" : phase === "done" ? "bg-muted-foreground" : "bg-green-400"
              )} />
              <span className="font-mono text-[10px] text-muted-foreground">
                {isTyping ? "TRANSMITTING" : phase === "done" ? "SESSION COMPLETE" : "AWAITING INPUT"}
              </span>
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">
              ERA: {era.era} | LATENCY: {era.era === "1966" ? "800ms" : era.era === "2020" ? "2400ms" : era.era === "2022" ? "1200ms" : "340ms"}
            </span>
          </div>
        </div>

        {/* Era info */}
        <div className="mt-4 border border-dashed border-border p-4">
          <div className="flex items-center justify-between">
            <span className="data-label">[ERA INFO]</span>
            <span className={cn("font-mono text-[10px]", theme.accent)}>
              {era.prompts.length} prompts available
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
            {era.era === "1966" && "ELIZA was one of the first chatbots, created at MIT. It used simple pattern matching to simulate a Rogerian psychotherapist. Users were often convinced they were talking to a real person."}
            {era.era === "2020" && "GPT-3 stunned the world with 175B parameters. It could write essays, code, and poetry -- but often lost coherence in longer outputs and confidently stated falsehoods."}
            {era.era === "2022" && "ChatGPT brought AI to the mainstream. 100M users in 2 months. It could hold conversations, admit mistakes, and refuse harmful requests -- a massive leap in usability."}
            {era.era === "2024" && "Claude 3 and GPT-4 represent frontier models with near-human reasoning. They can analyze documents, debug code, and provide nuanced analysis with far fewer hallucinations."}
            {era.era === "2025" && "o3 and DeepSeek R1 push reasoning further with chain-of-thought approaches. DeepSeek trained for $5.6M vs billions for competitors, proving efficiency can rival brute force."}
          </p>
        </div>

        {/* Floating share prompt (after 5+ messages) */}
        {showSharePrompt && (
          <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-[terminalFadeIn_0.5s_ease-out]">
            <div className="border border-dashed border-primary/40 bg-[#0a0a0f]/95 px-5 py-4 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <p className="font-mono text-[11px] text-primary">
                    [SHARE] 🤖 You just talked to AI from {era.era}. Challenge a friend →
                  </p>
                </div>
                <button
                  onClick={() => setShowSharePrompt(false)}
                  className="text-muted-foreground/50 hover:text-foreground transition-colors"
                >
                  <span className="font-mono text-[10px]">✕</span>
                </button>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={handleShare}
                  className="glass-btn-primary px-4 py-2 font-mono text-[11px] text-foreground"
                >
                  {'>'} Share
                </button>
                <button
                  onClick={handleCopyConversation}
                  className="border border-border px-4 py-2 font-mono text-[11px] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  📋 Copy conversation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
