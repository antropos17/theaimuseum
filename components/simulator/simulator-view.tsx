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

  // Reset when era changes
  useEffect(() => {
    setMessages([])
    setPromptIdx(0)
    setTyping(false)
    setTypedText("")
  }, [eraIdx])

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, typedText])

  function sendNext() {
    if (typing || promptIdx >= era.prompts.length) return

    const prompt = era.prompts[promptIdx]
    setMessages((prev) => [...prev, { role: "user", text: prompt.prompt }])
    setTyping(true)
    setTypedText("")

    // Simulate typing
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
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-3xl px-4 pb-24">
        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
          AI Simulator
        </h1>
        <p className="mt-2 font-sans text-sm text-muted-foreground">
          Experience how AI responses evolved from 1966 to 2025.
        </p>

        {/* Era tabs */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {simulatorEras.map((e, i) => (
            <button
              key={e.era}
              onClick={() => setEraIdx(i)}
              className={cn(
                "rounded-lg px-3 py-1.5 font-sans text-xs font-medium transition-all",
                eraIdx === i
                  ? "bg-primary/12 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {e.era} - {e.label}
            </button>
          ))}
        </div>

        {/* Chat window */}
        <div className="mt-6 glass rounded-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <div className="flex items-center gap-2">
              <div className="status-dot status-dot-active" />
              <span className="font-sans text-sm font-bold text-foreground">
                {era.label}
              </span>
            </div>
            <span className="font-mono text-[11px] text-muted-foreground">
              {era.era}
            </span>
          </div>

          {/* Messages area */}
          <div ref={scrollRef} className="h-80 overflow-y-auto p-5 space-y-4">
            {messages.length === 0 && !typing && (
              <div className="flex h-full items-center justify-center">
                <p className="font-sans text-sm text-muted-foreground text-center">
                  Click &quot;Send prompt&quot; to begin the conversation with {era.label}
                </p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-xl px-4 py-3",
                    msg.role === "user"
                      ? "bg-primary/10 text-foreground"
                      : "bg-muted text-foreground"
                  )}
                >
                  <p className="font-mono text-xs whitespace-pre-wrap leading-relaxed">
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && typedText && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-xl bg-muted px-4 py-3">
                  <p className="font-mono text-xs whitespace-pre-wrap leading-relaxed text-foreground">
                    {typedText}
                    <span className="animate-pulse">|</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="border-t border-border px-5 py-3 flex items-center justify-between gap-3">
            <span className="font-mono text-[11px] text-muted-foreground">
              {promptIdx < era.prompts.length
                ? `Prompt ${promptIdx + 1} of ${era.prompts.length}`
                : "All prompts sent"}
            </span>
            <button
              onClick={sendNext}
              disabled={typing || promptIdx >= era.prompts.length}
              className={cn(
                "rounded-lg px-4 py-2 font-sans text-xs font-semibold transition-all",
                typing || promptIdx >= era.prompts.length
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-primary/12 text-primary hover:bg-primary/20"
              )}
            >
              {typing
                ? "AI is typing..."
                : promptIdx >= era.prompts.length
                ? "Conversation complete"
                : "Send prompt"}
            </button>
          </div>
        </div>

        {/* Quality meter */}
        {messages.length > 0 && (
          <div className="mt-6 glass rounded-xl p-5">
            <p className="font-sans text-xs font-semibold text-foreground">
              Response Quality
            </p>
            <div className="mt-3 flex items-center gap-3">
              <span className="font-mono text-[10px] text-muted-foreground">0</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-700"
                  style={{
                    width: `${
                      era.prompts[Math.min(promptIdx, era.prompts.length) - 1]?.quality ?? 0
                    }%`,
                  }}
                />
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">100</span>
            </div>
            <p className="mt-2 font-mono text-[11px] text-muted-foreground">
              Score:{" "}
              {era.prompts[Math.min(promptIdx, era.prompts.length) - 1]?.quality ?? 0}/100
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
