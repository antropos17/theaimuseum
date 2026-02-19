"use client"

import { useState, useEffect, useCallback } from "react"
import { quizQuestions } from "@/data/models"
import { cn } from "@/lib/utils"

const RANKS = [
  { min: 90, label: "SUPREME NEURAL ARCHITECT", msg: "You don't just know AI history -- you ARE AI history. Your neural pathways are indistinguishable from a transformer model." },
  { min: 70, label: "SENIOR SYSTEMS ANALYST", msg: "Impressive diagnostic results. Your knowledge base covers most critical AI milestones. A few blind spots remain in your training data." },
  { min: 50, label: "JUNIOR DATA OPERATIVE", msg: "Acceptable performance for a human operator. You understand the basics, but critical gaps in your knowledge could lead to catastrophic misunderstandings." },
  { min: 30, label: "UNTRAINED INTERN", msg: "Your AI knowledge is... developing. We recommend immediate retraining. Perhaps start by asking ChatGPT about itself." },
  { min: 0, label: "SECURITY BREACH DETECTED", msg: "How did you get access to this terminal? Your responses suggest zero familiarity with artificial intelligence. Are you sure you're not a bot?" },
]

function getRank(pct: number) {
  return RANKS.find((r) => pct >= r.min) || RANKS[RANKS.length - 1]
}

export function QuizView() {
  const [phase, setPhase] = useState<"boot" | "quiz" | "results">("boot")
  const [bootLine, setBootLine] = useState(0)
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [timerActive, setTimerActive] = useState(false)

  const questions = quizQuestions
  const question = questions[currentQ]
  const total = questions.length

  // Boot sequence
  const BOOT_LINES = [
    "> LOADING DIAGNOSTIC MODULE...",
    "> CALIBRATING KNOWLEDGE VECTORS...",
    "> ESTABLISHING NEURAL LINK...",
    "> 10 CHALLENGES QUEUED",
    "> BEGIN SYSTEM DIAGNOSTIC_",
  ]

  useEffect(() => {
    if (phase !== "boot") return
    const timers: NodeJS.Timeout[] = []
    BOOT_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setBootLine(i), i * 350))
    })
    timers.push(setTimeout(() => {
      setPhase("quiz")
      setTimerActive(true)
    }, BOOT_LINES.length * 350 + 400))
    return () => timers.forEach(clearTimeout)
  }, [phase])

  // Timer
  useEffect(() => {
    if (!timerActive) return
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(interval)
  }, [timerActive])

  const handleAnswer = useCallback((optIdx: number) => {
    if (answered) return
    setSelected(optIdx)
    setAnswered(true)
    if (optIdx === question.answer) setScore((s) => s + 1)
    // Show feedback flash, then allow next
    setShowFeedback(true)
  }, [answered, question])

  function nextQuestion() {
    if (currentQ + 1 >= total) {
      setTimerActive(false)
      setPhase("results")
    } else {
      setCurrentQ((c) => c + 1)
      setSelected(null)
      setAnswered(false)
      setShowFeedback(false)
    }
  }

  function skipBoot() {
    setPhase("quiz")
    setTimerActive(true)
  }

  function restart() {
    setPhase("boot")
    setBootLine(0)
    setCurrentQ(0)
    setSelected(null)
    setScore(0)
    setAnswered(false)
    setShowFeedback(false)
    setElapsed(0)
    setTimerActive(false)
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
  }

  // ----- BOOT SCREEN -----
  if (phase === "boot") {
    return (
      <div className="min-h-screen pt-16 cursor-pointer" onClick={skipBoot}>
        <div className="mx-auto max-w-xl px-4 pb-24 pt-20">
          <div className="terminal-card-solid p-8">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              sys://diagnostic/ai-history
            </p>
            <div className="mt-6 space-y-3">
              {BOOT_LINES.map((line, i) => (
                <p
                  key={i}
                  className={cn(
                    "font-mono text-sm transition-all duration-300",
                    i <= bootLine ? "opacity-100 text-primary text-glow-subtle" : "opacity-0",
                    i === bootLine && "animate-pulse"
                  )}
                >
                  {line}
                </p>
              ))}
            </div>
            <p className="mt-8 font-mono text-[10px] text-muted-foreground/50 animate-pulse">
              Click anywhere to skip
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ----- RESULTS SCREEN -----
  if (phase === "results") {
    const pct = Math.round((score / total) * 100)
    const rank = getRank(pct)
    const shareTextX = encodeURIComponent(
      `My AI IQ: ${pct}% -- Rank: ${rank.label}\n\nScored ${score}/${total} on The AI Museum diagnostic exam in ${formatTime(elapsed)}.\n\nCan you beat me?`
    )
    const shareTextTg = encodeURIComponent(
      `I scored ${score}/${total} (${pct}%) on The AI Museum diagnostic exam!\nRank: ${rank.label}\nTime: ${formatTime(elapsed)}\n\nTest your AI knowledge:`
    )
    return (
      <div className="min-h-screen pt-16">
        <div className="mx-auto max-w-xl px-4 pb-24 pt-10">
          <div className="terminal-card-solid p-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                sys://diagnostic/results
              </p>
              <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                {formatTime(elapsed)}
              </span>
            </div>

            <div className="mt-6 border border-dashed border-border p-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Diagnostic Complete
              </p>

              {/* Score display */}
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-mono text-5xl font-light tabular-nums text-primary text-glow-subtle">
                  {score}
                </span>
                <span className="font-mono text-lg text-muted-foreground">/{total}</span>
              </div>

              {/* Progress bar */}
              <div className="mt-3 metric-bar">
                <div
                  className="metric-bar-fill"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: pct >= 70 ? "var(--chart-3)" : pct >= 40 ? "var(--chart-2)" : "var(--chart-5)",
                  }}
                />
              </div>
              <p className="mt-1 font-mono text-[10px] tabular-nums text-muted-foreground text-right">
                {pct}% accuracy
              </p>

              {/* Rank */}
              <div className="mt-5 border border-border p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Clearance Level
                </p>
                <p className={cn(
                  "mt-2 font-mono text-sm tracking-wide",
                  pct >= 70 ? "text-primary text-glow-subtle" : pct >= 40 ? "text-chart-2" : "text-chart-5"
                )}>
                  [{rank.label}]
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                  {rank.msg}
                </p>
              </div>
            </div>

            {/* Share my AI IQ */}
            <div className="mt-6 space-y-3">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">[Share my AI IQ]</p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${shareTextX}&url=${encodeURIComponent("https://theaimuseum.dev/quiz")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-btn-primary flex items-center gap-2 px-5 py-2.5 font-mono text-xs text-foreground"
                >
                  {'>'} Share on X
                </a>
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent("https://theaimuseum.dev/quiz")}&text=${shareTextTg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-border px-5 py-2.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {'>'} Share on Telegram
                </a>
              </div>
            </div>

            {/* Retry */}
            <div className="mt-4 border-t border-dashed border-border pt-4">
              <button
                onClick={restart}
                className="border border-border px-5 py-2.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {">"} RESTART_DIAGNOSTIC
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ----- QUIZ SCREEN -----
  const progressPct = ((currentQ + 1) / total) * 100
  const isCorrect = selected === question.answer

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-xl px-4 pb-24 pt-10">

        {/* Top HUD */}
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            sys://diagnostic/active
          </p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
              {formatTime(elapsed)}
            </span>
            <span className="font-mono text-xs tabular-nums text-primary text-glow-subtle">
              [{score}pts]
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 flex items-center gap-3">
          <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
            {String(currentQ + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </span>
          <div className="metric-bar flex-1">
            <div
              className="metric-bar-fill bg-primary transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div
          className={cn(
            "mt-6 border transition-all duration-300",
            showFeedback && isCorrect && "border-chart-3 shadow-[0_0_20px_rgba(0,200,100,0.1)]",
            showFeedback && !isCorrect && "border-chart-5 shadow-[0_0_20px_rgba(255,80,80,0.1)]",
            !showFeedback && "border-border"
          )}
        >
          {/* Terminal window chrome */}
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-1.5">
              <div className="h-2 w-2 rounded-full bg-chart-5/60" />
              <div className="h-2 w-2 rounded-full bg-chart-2/60" />
              <div className="h-2 w-2 rounded-full bg-chart-3/60" />
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">
              challenge_{String(currentQ + 1).padStart(2, "0")}.exe
            </span>
          </div>

          <div className="p-6">
            {/* Question prompt */}
            <div className="flex gap-2">
              <span className="font-mono text-sm text-primary text-glow-subtle shrink-0">{">"}</span>
              <p className="text-[15px] leading-relaxed text-foreground">{question.q}</p>
            </div>

            {/* Answer options */}
            <div className="mt-6 space-y-2">
              {question.options.map((opt, i) => {
                const isThisCorrect = i === question.answer
                const isThisSelected = i === selected
                const letter = String.fromCharCode(65 + i)

                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={answered}
                    className={cn(
                      "group flex w-full items-center gap-3 border px-4 py-3 text-left font-mono text-[13px] transition-all duration-200",
                      // Default state
                      !answered && "border-border/50 text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-primary/5",
                      // Answered: correct answer highlight
                      answered && isThisCorrect && "border-chart-3 bg-chart-3/10 text-foreground",
                      // Answered: wrong selection
                      answered && isThisSelected && !isThisCorrect && "border-chart-5 bg-chart-5/10 text-foreground",
                      // Answered: unselected wrong options dim
                      answered && !isThisSelected && !isThisCorrect && "border-border/20 text-muted-foreground/30"
                    )}
                  >
                    <span className={cn(
                      "inline-flex h-6 w-6 shrink-0 items-center justify-center border text-[10px]",
                      !answered && "border-border/50 text-muted-foreground group-hover:border-primary/40 group-hover:text-primary",
                      answered && isThisCorrect && "border-chart-3 text-chart-3",
                      answered && isThisSelected && !isThisCorrect && "border-chart-5 text-chart-5",
                      answered && !isThisSelected && !isThisCorrect && "border-border/20 text-muted-foreground/30"
                    )}>
                      {answered && isThisCorrect ? "+" : answered && isThisSelected && !isThisCorrect ? "x" : letter}
                    </span>
                    <span>{opt}</span>
                  </button>
                )
              })}
            </div>

            {/* Feedback + Next */}
            {answered && (
              <div className="mt-5 flex items-center justify-between border-t border-dashed border-border pt-4 animate-[terminalFadeIn_0.3s_ease-out]">
                <p className={cn(
                  "font-mono text-xs",
                  isCorrect ? "text-chart-3" : "text-chart-5"
                )}>
                  {isCorrect
                    ? "> CORRECT -- Neural pathways aligned"
                    : `> ERROR -- Expected: ${question.options[question.answer]}`
                  }
                </p>
                <button
                  onClick={nextQuestion}
                  className="border border-primary bg-primary/10 px-4 py-2 font-mono text-[11px] text-primary transition-colors hover:bg-primary/20"
                >
                  {currentQ + 1 >= total ? "> RESULTS" : "> NEXT"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom status */}
        <div className="mt-4 flex items-center justify-between">
          <p className="font-mono text-[10px] text-muted-foreground/40">
            Difficulty: STANDARD
          </p>
          <p className="font-mono text-[10px] text-muted-foreground/40">
            {total - currentQ - 1} remaining
          </p>
        </div>
      </div>
    </div>
  )
}
