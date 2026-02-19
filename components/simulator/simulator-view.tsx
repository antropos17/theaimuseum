"use client"

import { useState, useEffect, useRef } from "react"
import { Send, Terminal } from "lucide-react"
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
    <div className="min-h-screen pt-12">
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-10 lg:px-6">
        {/* Header */}
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Interactive
        </p>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          AI Simulator
        </h1>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Experience how AI responses evolved from 1966 to 2025.
        </p>

        {/* Era tabs */}
        <div className="mt-6 flex flex-wrap items-center gap-1">
          {simulatorEras.map((e, i) => (
            <button
              key={e.era}
              onClick={() => setEraIdx(i)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-all",
                eraIdx === i
                  ? "border border-primary/30 bg-primary/10 text-primary"
                  : "border border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {e.era}
            </button>
          ))}
        </div>

        {/* Chat window */}
        <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <div className="flex items-center gap-2.5">
              <Terminal className="h-3.5 w-3.5 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                {era.label}
              </span>
            </div>
            <span className="font-mono text-[11px] text-muted-foreground">
              {era.era}
            </span>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="h-80 overflow-y-auto p-5">
            <div className="space-y-4">
              {messages.length === 0 && !typing && (
                <div className="flex h-full min-h-[200px] items-center justify-center">
                  <p className="text-center text-sm text-muted-foreground">
                    Click &quot;Send prompt&quot; to begin the conversation with {era.label}
                  </p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-4 py-3",
                      msg.role === "user"
                        ? "bg-primary/10 text-foreground"
                        : "border border-border bg-surface-1 text-foreground"
                    )}
                  >
                    <p className="font-mono text-xs leading-relaxed whitespace-pre-wrap">
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))}

              {typing && typedText && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg border border-border bg-surface-1 px-4 py-3">
                    <p className="font-mono text-xs leading-relaxed whitespace-pre-wrap text-foreground">
                      {typedText}
                      <span className="animate-pulse text-primary">|</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between border-t border-border px-5 py-3">
            <span className="font-mono text-[11px] text-muted-foreground">
              {promptIdx < era.prompts.length
                ? `Prompt ${promptIdx + 1} of ${era.prompts.length}`
                : "All prompts sent"}
            </span>
            <button
              onClick={sendNext}
              disabled={typing || promptIdx >= era.prompts.length}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium transition-all",
                typing || promptIdx >= era.prompts.length
                  ? "cursor-not-allowed border border-border text-muted-foreground"
                  : "bg-primary text-primary-foreground hover:brightness-110"
              )}
            >
              {typing ? (
                "Typing..."
              ) : promptIdx >= era.prompts.length ? (
                "Complete"
              ) : (
                <>
                  Send <Send className="h-3 w-3" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quality bar */}
        {messages.length > 0 && (
          <div className="mt-6 rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Response Quality
              </span>
              <span className="font-mono text-xs tabular-nums text-foreground">
                {era.prompts[Math.min(promptIdx, era.prompts.length) - 1]?.quality ?? 0}/100
              </span>
            </div>
            <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700"
                style={{
                  width: `${era.prompts[Math.min(promptIdx, era.prompts.length) - 1]?.quality ?? 0}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
