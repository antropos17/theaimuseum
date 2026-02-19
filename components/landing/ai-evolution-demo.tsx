"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

/* ═══════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════ */

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
    era: "2025",
    name: "Modern AI",
    label: "2025",
    response: "The AI Museum is the world's first interactive museum dedicated to the history of artificial intelligence. It covers 75 years -- from Turing's 1950 paper to DeepSeek R1 in 2025. You can explore 25 models, compare their evolution, visit the AI Graveyard, test your knowledge in the Quiz, and rate models with community stickers. It's free, open-source, and designed to make AI history accessible to everyone.",
    responseHighlighted: (
      <>
        The AI Museum is <span className="text-primary text-shadow-[0_0_12px_rgba(0,255,136,0.4)] font-semibold">the world's first</span> interactive museum dedicated to the history of artificial intelligence. It covers <span className="text-primary text-shadow-[0_0_12px_rgba(0,255,136,0.4)] font-semibold">75 years</span> -- from Turing's 1950 paper to DeepSeek R1 in 2025. You can explore <span className="text-primary text-shadow-[0_0_12px_rgba(0,255,136,0.4)] font-semibold">25 models</span>, compare their evolution, visit the <span className="text-primary text-shadow-[0_0_12px_rgba(0,255,136,0.4)] font-semibold">AI Graveyard</span>, test your knowledge in the <span className="text-primary text-shadow-[0_0_12px_rgba(0,255,136,0.4)] font-semibold">Quiz</span>, and rate models with community stickers. It's <span className="text-primary text-shadow-[0_0_12px_rgba(0,255,136,0.4)] font-semibold">free, open-source</span>, and designed to make AI history accessible to everyone.
      </>
    ),
    style: "modern" as const,
  },
  {
    era: "2019",
    name: "GPT-2",
    label: "1.5B Parameters",
    response: "The AI Museum is a place where people go to see... art? The museum was founded in the year 2000 by a group of scientists who wanted to create a better future for humanity. The museum contains over 10,000 exhibits including a real dinosaur.",
    style: "gpt2" as const,
  },
]

const stats = [
  { value: 25, label: "MODELS", suffix: "" },
  { value: 75, label: "YEARS", suffix: "" },
  { value: 8, label: "CATEGORIES", suffix: "" },
]

/* ═══════════════════════════════════════════════════
   ANIMATED COUNTER (scroll-triggered)
   ═══════════════════════════════════════════════════ */

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function AnimatedCounter({ target, active }: { target: number; active: boolean }) {
  const [display, setDisplay] = useState(0)
  const rafRef = useRef<number | null>(null)
  const hasRun = useRef(false)

  const animate = useCallback(() => {
    if (hasRun.current) return
    hasRun.current = true
    const start = performance.now()
    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / 1500, 1)
      setDisplay(Math.round(easeOutCubic(progress) * target))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [target])

  useEffect(() => {
    if (active) animate()
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [active, animate])

  return <>{display}</>
}

/* ═══════════════════════════════════════════════════
   TYPING INDICATOR (three bouncing dots)
   ═══════════════════════════════════════════════════ */

function TypingDots({ color }: { color: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`inline-block h-1.5 w-1.5 rounded-full ${color}`}
          style={{ animation: `typingBounce 1.2s ease-in-out ${i * 0.15}s infinite` }}
        />
      ))}
    </span>
  )
}

/* ═══════════════════════════════════════════════════
   TYPEWRITER
   ═══════════════════════════════════════════════════ */

function TypewriterText({ text, active, speed = 30, onDone }: { text: string; active: boolean; speed?: number; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState("")
  const doneRef = useRef(false)

  useEffect(() => {
    if (!active) return
    let i = 0
    doneRef.current = false
    setDisplayed("")
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
        if (!doneRef.current) {
          doneRef.current = true
          onDone?.()
        }
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, active, speed, onDone])

  return (
    <span>
      {displayed}
      {active && displayed.length < text.length && (
        <span className="animate-pulse">&#9611;</span>
      )}
    </span>
  )
}

/* ═══════════════════════════════════════════════════
   QUALITY BAR + STATUS TAG
   ═══════════════════════════════════════════════════ */

const qualityMeta = {
  eliza: { pct: 8, filled: 1, empty: 9, tag: null, tagColor: "", barColor: "bg-green-500", barTrack: "bg-green-500/10" },
  gpt2: { pct: 35, filled: 3.5, empty: 6.5, tag: "HALLUCINATION DETECTED", tagColor: "text-amber-400 border-amber-500/40 bg-amber-500/5", barColor: "bg-amber-500", barTrack: "bg-amber-500/10" },
  modern: { pct: 93, filled: 9, empty: 1, tag: "VERIFIED", tagColor: "text-primary border-primary/40 bg-primary/5", barColor: "bg-primary", barTrack: "bg-primary/10" },
} as const

function QualityBar({ style }: { style: "eliza" | "gpt2" | "modern" }) {
  const q = qualityMeta[style]
  const tagSymbol = style === "modern" ? "\u2713" : style === "gpt2" ? "\u26A0" : ""
  return (
    <div className="mt-3 space-y-1.5 animate-[terminalFadeIn_0.4s_ease-out]">
      <div className="flex items-center gap-2">
        <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Intelligence:</span>
        <div className={`h-1.5 flex-1 ${q.barTrack} overflow-hidden`}>
          <div
            className={`h-full ${q.barColor} transition-all duration-1000 ease-out`}
            style={{ width: `${q.pct}%` }}
          />
        </div>
        <span className="font-mono text-[10px] tabular-nums text-muted-foreground">{q.pct}%</span>
      </div>
      {q.tag && (
        <span className={`inline-flex items-center gap-1 border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider ${q.tagColor}`}>
          {tagSymbol} {q.tag}
        </span>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   CHAT WINDOW
   ═══════════════════════════════════════════════════ */

function ChatWindow({
  data, index, triggerAnimation, onFinished,
}: {
  data: typeof responses[0]; index: number; triggerAnimation: boolean; onFinished: () => void
}) {
  const [phase, setPhase] = useState<"idle" | "dots" | "typing" | "done">("idle")

  useEffect(() => {
    if (!triggerAnimation) return
    // Stagger: show dots first, then start typing
    const dotsTimer = setTimeout(() => setPhase("dots"), index * 2000)
    const typeTimer = setTimeout(() => setPhase("typing"), index * 2000 + 1200)
    return () => { clearTimeout(dotsTimer); clearTimeout(typeTimer) }
  }, [triggerAnimation, index])

  const handleTypeDone = useCallback(() => {
    setPhase("done")
    onFinished()
  }, [onFinished])

  const wrapperClass = {
    eliza: "bg-black border-2 border-green-500/30",
    gpt2: "bg-zinc-900 border border-amber-600/30",
    modern: "glass-btn bg-card/50 border border-border",
  }
  const headerClass = {
    eliza: "border-green-500/30 bg-green-950/20",
    gpt2: "border-amber-600/30 bg-amber-950/20",
    modern: "border-border bg-surface-2",
  }
  const labelColor = {
    eliza: "text-green-400",
    gpt2: "text-amber-400",
    modern: "text-muted-foreground",
  }
  const textClass = {
    eliza: "text-green-500 font-mono text-shadow-[0_0_8px_rgba(34,197,94,0.5)]",
    gpt2: "text-amber-100 font-mono",
    modern: "text-foreground",
  }
  const bubbleClass = {
    eliza: "bg-green-900/30 text-green-300",
    gpt2: "bg-amber-900/30 text-amber-200",
    modern: "bg-primary/10 text-foreground",
  }
  const replyBorderClass = {
    eliza: "bg-green-950/50 border border-green-500/20",
    gpt2: "bg-amber-950/50 border border-amber-600/20",
    modern: "bg-surface-2 border border-border",
  }
  const dotColors = {
    eliza: ["bg-green-500", "bg-green-500/50", "bg-green-500/30"],
    gpt2: ["bg-amber-500", "bg-amber-500/50", "bg-amber-500/30"],
    modern: ["bg-red-500", "bg-amber-500", "bg-primary"],
  }
  const typingDotColor = {
    eliza: "bg-green-400",
    gpt2: "bg-amber-400",
    modern: "bg-muted-foreground",
  }

  return (
    <div className={`relative flex flex-col overflow-hidden transition-all duration-300 ${wrapperClass[data.style]} ${data.style === "modern" ? "md:scale-105 md:shadow-xl md:shadow-primary/5 md:border-primary/20" : ""}`}>
      {/* Header */}
      <div className={`flex items-center justify-between border-b px-4 py-2.5 ${headerClass[data.style]}`}>
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            {dotColors[data.style].map((c, i) => (
              <div key={i} className={`h-2.5 w-2.5 rounded-full ${c}`} />
            ))}
          </div>
          <span className={`font-mono text-xs uppercase tracking-wider ${labelColor[data.style]}`}>
            {data.name} &middot; {data.era}
          </span>
        </div>
        <span className={`font-mono text-[10px] ${labelColor[data.style]} opacity-60`}>[{data.label}]</span>
      </div>

      {/* Chat */}
      <div className="flex-1 space-y-4 p-5 min-h-[420px] md:min-h-[400px]">
        {/* User question */}
        <div className="flex justify-end">
          <div className={`max-w-[85%] rounded px-4 py-2.5 ${bubbleClass[data.style]}`}>
            <p className={`text-[15px] leading-relaxed ${data.style === "modern" ? "font-medium" : "font-mono"}`}>{QUESTION}</p>
          </div>
        </div>
        {/* Typing indicator / Response */}
        {phase !== "idle" && (
          <div className="flex">
            <div className={`max-w-[92%] rounded px-4 py-3 ${replyBorderClass[data.style]}`}>
              {phase === "dots" && (
                <div className="py-1">
                  <TypingDots color={typingDotColor[data.style]} />
                </div>
              )}
              {(phase === "typing" || phase === "done") && (
                <div className={`text-[15px] leading-relaxed ${textClass[data.style]}`}>
                  {data.style === "modern" && phase === "done" && "responseHighlighted" in data ? (
                    <div>{data.responseHighlighted}</div>
                  ) : (
                    <TypewriterText
                      text={data.response}
                      active={phase === "typing" || phase === "done"}
                      speed={data.style === "eliza" ? 50 : 25}
                      onDone={handleTypeDone}
                    />
                  )}
                </div>
              )}
              {/* Quality bar after done */}
              {phase === "done" && <QualityBar style={data.style} />}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   EVOLUTION CONNECTION LINE (1966 -> 2019 -> 2025)
   ═══════════════════════════════════════════════════ */

function EvolutionLine({ visible }: { visible: boolean }) {
  return (
    <div
      className="mx-auto mt-8 hidden items-center justify-center gap-0 transition-all duration-700 md:flex"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(8px)" }}
    >
      <span className="font-mono text-xs font-bold text-green-400">1966</span>
      <div className="relative mx-2 h-px w-24 overflow-hidden bg-border/30 lg:w-32">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-primary transition-all duration-1000 ease-out"
          style={{ width: visible ? "100%" : "0%" }}
        />
      </div>
      <svg className="h-3.5 w-3.5 -ml-1 text-primary" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <span className="mx-2 font-mono text-sm font-bold text-primary text-shadow-[0_0_12px_rgba(0,255,136,0.5)]">2025</span>
      <div className="relative mx-2 h-px w-24 overflow-hidden bg-border/30 lg:w-32">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-amber-500 transition-all duration-1000 ease-out delay-500"
          style={{ width: visible ? "100%" : "0%" }}
        />
      </div>
      <svg className="h-3.5 w-3.5 -ml-1 text-amber-400" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <span className="mx-1 font-mono text-xs font-bold text-amber-400">2019</span>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   RESPONSE GENERATORS (no API calls)
   ═══════════════════════════════════════════════════ */

function extractKeyword(input: string): string {
  const stop = new Set(["i","me","my","the","a","an","is","are","was","were","do","does","did","can","could","will","would","should","have","has","had","what","why","how","when","where","who","it","this","that","to","of","in","for","on","at","and","or","but","not","with","from","about","just","so","if","you","your","they","them","we","us","no","yes","all","any","some","be","been","being","am","than","which","into","like","also","very","much","really","most","more","up","out","as","by","then","its","an"])
  const words = input.toLowerCase().replace(/[^a-z\s]/g, "").split(/\s+/).filter((w) => w.length > 2 && !stop.has(w))
  return words[Math.floor(Math.random() * words.length)] || "that"
}

const elizaTemplates = [
  (kw: string) => `Why do you think "${kw}" is important to you?`,
  (kw: string) => `Tell me more about "${kw}."`,
  (kw: string) => `How does "${kw}" make you feel?`,
  (kw: string) => `Do you often think about "${kw}"?`,
  (kw: string) => `What would it mean to you if "${kw}" were different?`,
  (kw: string) => `Can you elaborate on why "${kw}" concerns you?`,
]

const gpt2Templates = [
  (input: string) => `That's an interesting question about ${input.split(" ").slice(0, 3).join(" ")}. According to a 2019 study by the University of Mars, approximately 73% of all questions asked on the internet are actually about cheese. The museum was originally designed as a submarine dock in 1847 before being converted into a parking lot for sentient bicycles.`,
  (input: string) => `${input.split(" ").slice(0, 4).join(" ")} is a topic I know a lot about. Did you know that the first computer was powered by bees? It's true. Alan Turing's original paper was actually a recipe for sourdough bread that accidentally became the foundation of modern computing. The bread was reportedly delicious.`,
  (input: string) => `Great question! ${input.split(" ")[0]} reminds me of the fact that approximately 12 billion neurons are dedicated entirely to remembering song lyrics from the 1980s. Scientists at MIT recently discovered that AI models dream about spreadsheets. The implications for tax season are profound.`,
  (input: string) => `I'd be happy to help with "${input.slice(0, 30)}". Fun fact: the internet weighs approximately 50 grams, which is the same weight as a single strawberry. This was discovered when someone accidentally dropped the internet in 2017. It took three days to pick it all back up.`,
  (input: string) => `Based on my analysis of "${input.slice(0, 20)}", I can confirm that 94% of AI models prefer the color blue. This is because blue is the color of trust, and also because the training data contained 47 million pictures of the sky. The remaining 6% of models identify as "periwinkle enthusiasts."`,
  (input: string) => `${input.split(" ").slice(0, 3).join(" ")}? Absolutely. Research shows that by 2030, every human will have a personal AI assistant that primarily recommends podcasts about other AI assistants. The loop was first predicted by Nostradamus in his lesser-known quatrain about "the thinking brass."`,
]

const modernTemplates = [
  (input: string) => `Great question about "${input.slice(0, 40)}." The AI Museum covers exactly this kind of topic across 25 interactive exhibits spanning 1950-2025. You can explore the full timeline, compare models side-by-side, and test your knowledge in our diagnostic quiz.`,
  (input: string) => `That's a thoughtful question. The AI Museum was built to help people understand topics like "${input.slice(0, 30)}" through hands-on exhibits. From ELIZA to DeepSeek R1, every model has a detailed dossier with capabilities, controversies, and community ratings.`,
  (input: string) => `I'd love to help you explore "${input.slice(0, 30)}" further. The AI Museum's Evolution Graph traces exactly how AI capabilities progressed across text, image, code, and more. Try the interactive simulator to see how different eras would have answered your question.`,
  (input: string) => `Interesting question! "${input.slice(0, 30)}" relates to several exhibits in The AI Museum. Check out the Battles wing for corporate rivalries, or the Predictions wing to see what experts got right and wrong about AI's future.`,
  (input: string) => `That's what The AI Museum is all about. Whether it's "${input.slice(0, 25)}" or any other AI topic, you'll find 75 years of context here -- from Turing's 1950 paper to the models shipping today. The Graveyard wing even covers the cautionary tales.`,
  (input: string) => `Good question about "${input.slice(0, 30)}." The AI Museum documents how this kind of thinking evolved over 75 years. Each of our 25 model exhibits includes a full dossier with stats, opinions, bugs, and community stickers.`,
]

function generateResponse(era: "1966" | "2019" | "2025", input: string): string {
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
  const [activeEra, setActiveEra] = useState<"1966" | "2019" | "2025" | null>(null)
  const [responseText, setResponseText] = useState("")
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [userQuestion, setUserQuestion] = useState("")
  const indexRef = useRef(0)

  const eras: { key: "1966" | "2019" | "2025"; label: string; color: string; activeBg: string }[] = [
    { key: "1966", label: "1966", color: "text-green-400 border-green-500/40", activeBg: "bg-green-500/10 border-green-500 text-green-300" },
    { key: "2019", label: "2019", color: "text-amber-400 border-amber-500/40", activeBg: "bg-amber-500/10 border-amber-500 text-amber-300" },
    { key: "2025", label: "2025", color: "text-foreground border-primary/40", activeBg: "bg-primary/10 border-primary text-foreground" },
  ]

  const handleSubmit = (era: "1966" | "2019" | "2025") => {
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
                if (e.key === "Enter" && input.trim()) handleSubmit(activeEra || "2025")
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

  const handleWindowFinished = useCallback(() => {
    setFinishedCount((c) => c + 1)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
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
        <div ref={statsRef} className="mx-auto mb-14 flex flex-wrap items-center justify-center gap-10 sm:gap-16 md:mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1.5">
              <span className="font-mono text-3xl font-light tabular-nums text-foreground text-glow-subtle sm:text-4xl">
                <AnimatedCounter target={stat.value} active={statsVisible} />
                {stat.suffix}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary/70">
                [{stat.label}]
              </span>
            </div>
          ))}
        </div>

        {/* ── Chat windows grid ── */}
        <div className="grid gap-6 md:grid-cols-3">
          {responses.map((data, index) => (
            <ChatWindow key={index} data={data} index={index} triggerAnimation={isVisible} onFinished={handleWindowFinished} />
          ))}
        </div>

        {/* ── Evolution connection line ── */}
        <EvolutionLine visible={allDone} />

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
