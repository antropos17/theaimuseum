"use client"

import { useState, useEffect, useRef } from "react"
import { simulatorEras } from "@/data/models"
import { cn } from "@/lib/utils"

interface Message {
  role: "user" | "ai"
  text: string
}

export function SimulatorView() {
  const [eraIdx, setEraIdx] = useState(0)
  const [messages, setMessages] = useState<Message[]>([])
  const [promptIdx, setPromptIdx] = useState(0)
  const [typing, setTyping] = useState(false)
  const [typedText, setTypedText] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  const era = simulatorEras[eraIdx]

  useEffect(() => {
    setMessages([])
    setPromptIdx(0)
    setTyping(false)
    setTypedText("")
  }, [eraIdx])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, typedText])

  function sendNext() {
    if (typing || promptIdx >= era.prompts.length) return
    const prompt = era.prompts[promptIdx]
    setMessages((prev) => [...prev, { role: "user", text: prompt.prompt }])
    setTyping(true)
    setTypedText("")
    const response = prompt.response
    let charIdx = 0
    const interval = setInterval(() => {
      charIdx++
      setTypedText(response.slice(0, charIdx))
      if (charIdx >= response.length) {
        clearInterval(interval)
        setMessages((prev) => [...prev, { role: "ai", text: response }])
        setTypedText("")
        setTyping(false)
        setPromptIdx((prev) => prev + 1)
      }
    }, 18)
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-10">
        <span className="data-label">[Interactive]</span>
        <h1 className="mt-3 text-2xl font-light tracking-tight text-foreground sm:text-3xl">AI Simulator</h1>
        <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
          Experience how AI responses evolved from 1966 to 2025.
        </p>

        {/* Era tabs */}
        <div className="mt-6 flex flex-wrap gap-1">
          {simulatorEras.map((e, i) => (
            <button
              key={e.era}
              onClick={() => setEraIdx(i)}
              className={cn(
                "border px-3 py-1.5 font-mono text-[11px] transition-all duration-200",
                eraIdx === i ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground hover:text-foreground"
              )}
            >
              {e.era}
            </button>
          ))}
        </div>

        {/* Terminal */}
        <div className="mt-4 terminal-card-solid overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5 bg-surface-2">
            <span className="font-mono text-xs text-primary text-glow-subtle">{era.label}</span>
            <span className="font-mono text-[10px] text-muted-foreground">{era.era}</span>
          </div>

          <div ref={scrollRef} className="h-72 overflow-y-auto p-4">
            {messages.length === 0 && !typing && (
              <div className="flex h-full items-center justify-center">
                <p className="font-mono text-xs text-muted-foreground text-center">
                  Click [Send] to begin the conversation<span className="cursor-blink" />
                </p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={cn("mb-3", msg.role === "user" ? "text-right" : "text-left")}>
                <span className="data-label">{msg.role === "user" ? "You" : "AI"}</span>
                <div className={cn(
                  "mt-1 inline-block border px-4 py-2.5 text-[13px] leading-relaxed",
                  msg.role === "user"
                    ? "border-primary/20 bg-primary/5 text-foreground"
                    : "border-border bg-surface-2 text-foreground"
                )}>
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && typedText && (
              <div className="text-left">
                <span className="data-label">AI</span>
                <div className="mt-1 inline-block border border-border bg-surface-2 px-4 py-2.5 text-[13px] leading-relaxed text-foreground">
                  {typedText}<span className="cursor-blink" />
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-border px-4 py-2.5 bg-surface-2">
            <span className="font-mono text-[10px] text-muted-foreground">
              {promptIdx < era.prompts.length ? `${promptIdx + 1}/${era.prompts.length}` : "Complete"}
            </span>
            <button
              onClick={sendNext}
              disabled={typing || promptIdx >= era.prompts.length}
              className={cn(
                "border px-4 py-1.5 font-mono text-xs transition-all duration-200",
                typing || promptIdx >= era.prompts.length
                  ? "border-border text-muted-foreground"
                  : "border-primary bg-primary/10 text-primary hover:bg-primary/20"
              )}
            >
              {typing ? "Typing..." : promptIdx >= era.prompts.length ? "Done" : "[Send]"}
            </button>
          </div>
        </div>

        {/* Quality indicator */}
        {messages.length > 0 && (
          <div className="mt-4 terminal-card-solid p-4">
            <div className="flex items-center justify-between">
              <span className="data-label">Response Quality</span>
              <span className="font-mono text-xs tabular-nums text-foreground">
                {era.prompts[Math.min(promptIdx, era.prompts.length) - 1]?.quality ?? 0}/100
              </span>
            </div>
            <div className="mt-2 metric-bar">
              <div
                className="metric-bar-fill bg-primary"
                style={{ width: `${era.prompts[Math.min(promptIdx, era.prompts.length) - 1]?.quality ?? 0}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
