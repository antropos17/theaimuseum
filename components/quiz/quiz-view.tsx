"use client"

import { useState, useMemo } from "react"
import { quizQuestions } from "@/data/models"
import { cn } from "@/lib/utils"

export function QuizView() {
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [finished, setFinished] = useState(false)

  const questions = useMemo(() => quizQuestions, [])
  const question = questions[currentQ]

  function handleAnswer(optIdx: number) {
    if (answered) return
    setSelected(optIdx)
    setAnswered(true)
    if (optIdx === question.answer) setScore((s) => s + 1)
  }

  function nextQuestion() {
    if (currentQ + 1 >= questions.length) {
      setFinished(true)
    } else {
      setCurrentQ((c) => c + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  function restart() {
    setCurrentQ(0)
    setSelected(null)
    setScore(0)
    setAnswered(false)
    setFinished(false)
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100)
    const grade = pct >= 80 ? "AI Historian" : pct >= 60 ? "AI Enthusiast" : pct >= 40 ? "AI Tourist" : "AI Newbie"
    return (
      <div className="min-h-screen pt-16">
        <div className="mx-auto max-w-md px-4 pb-24 pt-10 text-center">
          <span className="data-label">[Results]</span>
          <h1 className="mt-3 text-2xl font-light tracking-tight text-foreground">Quiz Complete</h1>
          <div className="mt-8 terminal-card-solid p-8">
            <p className="font-mono text-4xl font-light tabular-nums text-primary text-glow-subtle">{score}/{questions.length}</p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">{pct}% correct</p>
            <p className="mt-4 text-lg font-light text-foreground">{grade}</p>
            <div className="mt-4 metric-bar">
              <div className="metric-bar-fill bg-primary" style={{ width: `${pct}%` }} />
            </div>
            <button onClick={restart} className="mt-6 border border-primary bg-primary/10 px-5 py-2.5 font-mono text-xs text-primary transition-colors hover:bg-primary/20">
              [Retry]
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-md px-4 pb-24 pt-10">
        <span className="data-label">[Challenge]</span>
        <h1 className="mt-3 text-2xl font-light tracking-tight text-foreground sm:text-3xl">AI History Quiz</h1>
        <p className="mt-2 text-[14px] text-muted-foreground">
          {questions.length} questions. No cheating.
        </p>

        {/* Progress */}
        <div className="mt-6 flex items-center gap-3">
          <span className="font-mono text-xs tabular-nums text-muted-foreground">{currentQ + 1}/{questions.length}</span>
          <div className="metric-bar flex-1">
            <div className="metric-bar-fill bg-primary" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
          </div>
          <span className="font-mono text-xs tabular-nums text-primary text-glow-subtle">{score}pts</span>
        </div>

        {/* Question */}
        <div className="mt-6 terminal-card-solid p-6">
          <p className="text-[15px] leading-relaxed text-foreground">{question.q}</p>
          <div className="mt-5 space-y-2">
            {question.options.map((opt, i) => {
              const isCorrect = i === question.answer
              const isSelected = i === selected
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={answered}
                  className={cn(
                    "flex w-full items-center gap-3 border px-4 py-3 text-left text-[13px] transition-all duration-200",
                    !answered && "border-border hover:border-primary/30 hover:text-foreground",
                    answered && isCorrect && "border-chart-3 bg-chart-3/5 text-foreground",
                    answered && isSelected && !isCorrect && "border-chart-5 bg-chart-5/5 text-foreground",
                    answered && !isSelected && !isCorrect && "opacity-30"
                  )}
                >
                  <span className="font-mono text-xs text-muted-foreground">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </button>
              )
            })}
          </div>

          {answered && (
            <div className="mt-5 flex justify-end">
              <button onClick={nextQuestion} className="border border-primary bg-primary/10 px-5 py-2 font-mono text-xs text-primary transition-colors hover:bg-primary/20">
                {currentQ + 1 >= questions.length ? "[Results]" : "[Next]"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
