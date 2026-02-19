"use client"

import { useState, useRef, useCallback } from "react"
import Link from "next/link"
import { ArrowLeft, Download, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"

const AI_MODELS = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "DALL-E",
  "Midjourney",
  "AlphaGo",
  "Deep Blue",
  "GPT-4",
  "Stable Diffusion",
  "Other",
] as const

const PASSPORT_URL = "https://v0-theaimuseum.vercel.app/passport"

const PassportLabel = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
      {label}
    </span>
    {children}
  </div>
)

const ActionButton = ({ onClick, disabled, icon, children }: {
  onClick: () => void
  disabled?: boolean
  icon: React.ReactNode
  children: React.ReactNode
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="glass-btn flex h-9 items-center gap-2 px-4 text-foreground transition-all duration-200 hover:text-primary disabled:opacity-50"
  >
    {icon}
    <span className="font-mono text-[11px] uppercase tracking-wide">
      {children}
    </span>
  </button>
)

const PassportCard = ({ name, model, visitorId, date }: {
  name: string
  model: string
  visitorId: string
  date: string
}) => (
  <div
    id="passport-card"
    className="relative mx-auto flex h-[240px] w-[400px] flex-col justify-between overflow-hidden border border-primary/60 bg-[#0a0a0f] p-5"
    style={{ boxShadow: "0 0 30px rgba(0,255,136,0.08), inset 0 0 60px rgba(0,255,136,0.02)" }}
  >
    {/* Scanline overlay inside card */}
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,136,0.015) 2px, rgba(0,255,136,0.015) 4px)",
      }}
      aria-hidden="true"
    />

    {/* Top labels */}
    <div className="relative z-10 flex items-start justify-between">
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/60">
          THE AI MUSEUM
        </div>
        <div className="mt-1 font-mono text-xs font-bold uppercase tracking-[0.15em] text-primary text-glow-subtle">
          NEURAL PASSPORT
        </div>
      </div>
      {/* Window dots */}
      <div className="flex items-center gap-1.5">
        <span className="inline-block h-2 w-2 rounded-full bg-[#ff3366]/80" />
        <span className="inline-block h-2 w-2 rounded-full bg-[#ffb800]/80" />
        <span className="inline-block h-2 w-2 rounded-full bg-primary/80" />
      </div>
    </div>

    {/* Middle: visitor info */}
    <div className="relative z-10 flex flex-col gap-2">
      <PassportLabel label="[VISITOR]">
        <div className="mt-0.5 font-mono text-lg font-bold tracking-wide text-foreground">
          {name}
        </div>
      </PassportLabel>
      <PassportLabel label="[FAVORITE MODEL]">
        <div className="mt-0.5 font-mono text-sm text-[#00d4ff]">
          {model}
        </div>
      </PassportLabel>
    </div>

    {/* Dashed separator */}
    <div className="relative z-10 border-t border-dashed border-primary/30" />

    {/* Bottom: visitor # + date */}
    <div className="relative z-10 flex items-center justify-between">
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
        Visitor #{visitorId}
      </span>
      <span className="font-mono text-[10px] tabular-nums tracking-wider text-muted-foreground">
        {date}
      </span>
    </div>
  </div>
)

export const PassportView = () => {
  const [name, setName] = useState("")
  const [model, setModel] = useState("")
  const [generated, setGenerated] = useState(false)
  const [visitorId, setVisitorId] = useState("")
  const [date, setDate] = useState("")
  const [downloading, setDownloading] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleGenerate = useCallback(() => {
    if (!name.trim() || !model) return
    const id = String(Math.floor(1000 + Math.random() * 9000))
    const now = new Date()
    const d = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")}`
    setVisitorId(id)
    setDate(d)
    setGenerated(true)
  }, [name, model])

  const handleDownload = useCallback(async () => {
    const el = document.getElementById("passport-card")
    if (!el) return
    setDownloading(true)
    try {
      const html2canvas = (await import("html2canvas")).default
      const canvas = await html2canvas(el, {
        backgroundColor: "#0a0a0f",
        scale: 2,
      })
      const link = document.createElement("a")
      link.download = "neural-passport.png"
      link.href = canvas.toDataURL("image/png")
      link.click()
    } finally {
      setDownloading(false)
    }
  }, [])

  const handleShareX = useCallback(() => {
    const text = "I just got my Neural Passport at The AI Museum!"
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(PASSPORT_URL)}`
    window.open(url, "_blank", "noopener,noreferrer")
  }, [])

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-10">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground transition-colors duration-200 hover:text-primary"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          Back to Museum
        </Link>

        {/* Header */}
        <h1 className="mt-6 font-mono text-2xl font-bold uppercase tracking-wide text-foreground">
          Neural Passport
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Generate your AI Museum visitor card. Share it with the world.
        </p>

        {/* Form */}
        {!generated ? (
          <div className="mt-8 space-y-5">
            {/* Name field */}
            <div className="space-y-2">
              <label className="data-label" htmlFor="passport-name">
                Your Name
              </label>
              <input
                id="passport-name"
                type="text"
                maxLength={24}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="> enter name_"
                className="h-10 w-full border border-dashed border-border bg-card/30 px-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors duration-200 focus:border-primary"
              />
              <span className="font-mono text-[10px] text-muted-foreground/60">
                {name.length}/24
              </span>
            </div>

            {/* Model field */}
            <div className="space-y-2">
              <label className="data-label" htmlFor="passport-model">
                Favorite AI Model
              </label>
              <div className="relative">
                <select
                  id="passport-model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className={cn(
                    "h-10 w-full appearance-none border border-dashed border-border bg-card/30 px-3 font-mono text-sm outline-none transition-colors duration-200 focus:border-primary",
                    model ? "text-foreground" : "text-muted-foreground/50"
                  )}
                >
                  <option value="" disabled>
                    {"> select model_"}
                  </option>
                  {AI_MODELS.map((m) => (
                    <option key={m} value={m} className="bg-card text-foreground">
                      {m}
                    </option>
                  ))}
                </select>
                {/* Chevron */}
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-muted-foreground">
                  {"▾"}
                </div>
              </div>
            </div>

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              disabled={!name.trim() || !model}
              className={cn(
                "glass-btn-primary mt-2 flex h-10 w-full items-center justify-center gap-2 px-6 text-primary transition-all duration-200",
                "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 disabled:hover:border-primary/15 disabled:hover:shadow-none"
              )}
            >
              <span className="font-mono text-xs uppercase tracking-wide">
                {">"} Generate Passport
              </span>
            </button>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            {/* Passport card */}
            <div ref={cardRef}>
              <PassportCard
                name={name}
                model={model}
                visitorId={visitorId}
                date={date}
              />
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-center gap-3">
              <ActionButton
                onClick={handleShareX}
                icon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                }
              >
                Share on X
              </ActionButton>

              <ActionButton
                onClick={handleDownload}
                disabled={downloading}
                icon={<Download size={14} strokeWidth={1.5} />}
              >
                {downloading ? "Saving..." : "Download as PNG"}
              </ActionButton>
            </div>

            {/* Reset */}
            <div className="text-center">
              <button
                onClick={() => setGenerated(false)}
                className="font-mono text-[10px] text-muted-foreground transition-colors duration-200 hover:text-primary"
              >
                {">"} Generate another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
