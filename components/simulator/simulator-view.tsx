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
        <p className="mb-2 text-[8px] uppercase tracking-[0.3em] text-muted-foreground">{'>'} Interactive</p>
        <h1 className="text-lg text-primary sm:text-xl">AI SIMULATOR</h1>
        <p className="mt-2 text-[8px] leading-relaxed text-muted-foreground">
          Experience how AI responses evolved from 1966 to 2025.
        </p>

        {/* Era tabs */}
        <div className="mt-6 flex flex-wrap gap-1">
          {simulatorEras.map((e, i) => (
            <button
              key={e.era}
              onClick={() => setEraIdx(i)}
              className={cn(
                "pixel-border px-2 py-1 text-[6px] transition-colors",
                eraIdx === i ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"
              )}
            >
              {e.era}
            </button>
          ))}
        </div>

        {/* Terminal */}
        <div className="mt-4 pixel-border overflow-hidden bg-card">
          <div className="flex items-center justify-between border-b-2 border-border px-4 py-2">
            <span className="text-[8px] text-primary">{'>'} {era.label}</span>
            <span className="text-[6px] text-muted-foreground">{era.era}</span>
          </div>

          <div ref={scrollRef} className="h-64 overflow-y-auto p-4">
            {messages.length === 0 && !typing && (
              <div className="flex h-full items-center justify-center">
                <p className="text-[7px] text-muted-foreground text-center">
                  CLICK [SEND] TO BEGIN...
                </p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={cn("mb-3", msg.role === "user" ? "text-right" : "text-left")}>
                <span className="text-[6px] text-muted-foreground">{msg.role === "user" ? "YOU" : "AI"}</span>
                <div className={cn(
                  "mt-0.5 inline-block pixel-border px-3 py-2 text-[7px] leading-[2]",
                  msg.role === "user" ? "bg-primary/10 text-foreground" : "bg-background text-foreground"
                )}>
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && typedText && (
              <div className="text-left">
                <span className="text-[6px] text-muted-foreground">AI</span>
                <div className="mt-0.5 pixel-border bg-background px-3 py-2 text-[7px] leading-[2] text-foreground inline-block">
                  {typedText}<span className="animate-pulse text-primary">_</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t-2 border-border px-4 py-2">
            <span className="text-[6px] text-muted-foreground">
              {promptIdx < era.prompts.length ? `${promptIdx + 1}/${era.prompts.length}` : "DONE"}
            </span>
            <button
              onClick={sendNext}
              disabled={typing || promptIdx >= era.prompts.length}
              className={cn(
                "pixel-border px-3 py-1 text-[7px] transition-colors",
                typing || promptIdx >= era.prompts.length
                  ? "text-muted-foreground"
                  : "bg-primary text-primary-foreground hover:brightness-110"
              )}
            >
              {typing ? "TYPING..." : promptIdx >= era.prompts.length ? "COMPLETE" : "[SEND]"}
            </button>
          </div>
        </div>

        {/* Quality */}
        {messages.length > 0 && (
          <div className="mt-4 pixel-border bg-card p-3">
            <div className="flex items-center justify-between">
              <span className="text-[7px] text-muted-foreground">QUALITY</span>
              <span className="text-[7px] tabular-nums text-foreground">
                {era.prompts[Math.min(promptIdx, era.prompts.length) - 1]?.quality ?? 0}/100
              </span>
            </div>
            <div className="mt-2 h-[6px] w-full bg-muted">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${era.prompts[Math.min(promptIdx, era.prompts.length) - 1]?.quality ?? 0}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
