"use client"

import { useState, useMemo } from "react"
import { RotateCcw, Trophy } from "lucide-react"
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
    if (optIdx === question.answer) {
      setScore((s) => s + 1)
    }
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
    const grade =
      pct >= 80 ? "AI Historian" : pct >= 60 ? "AI Enthusiast" : pct >= 40 ? "AI Tourist" : "AI Newbie"

    return (
      <div className="min-h-screen pt-12">
        <div className="mx-auto max-w-lg px-4 pb-24 pt-10 text-center lg:px-6">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Results
          </p>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Quiz Complete
          </h1>

          <div className="mt-10 rounded-xl border border-border bg-card p-8">
            <div className="flex items-center justify-center">
              <Trophy className="h-8 w-8 text-chart-4" />
            </div>
            <p className="mt-4 font-mono text-5xl font-bold tabular-nums text-primary">
              {score}/{questions.length}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {pct}% correct
            </p>
            <p className="mt-4 font-serif text-xl font-semibold text-foreground">
              {grade}
            </p>

            <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-1000"
                style={{ width: `${pct}%` }}
              />
            </div>

            <button
              onClick={restart}
              className="mt-8 flex items-center gap-2 mx-auto rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-12">
      <div className="mx-auto max-w-lg px-4 pb-24 pt-10 lg:px-6">
        {/* Header */}
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Challenge
        </p>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          AI History Quiz
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Test your knowledge. {questions.length} questions, no cheating.
        </p>

        {/* Progress */}
        <div className="mt-6 flex items-center gap-3">
          <span className="font-mono text-xs tabular-nums text-muted-foreground">
            {currentQ + 1}/{questions.length}
          </span>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
            />
          </div>
          <span className="font-mono text-xs tabular-nums text-primary">
            {score}pts
          </span>
        </div>

        {/* Question card */}
        <div className="mt-8 rounded-xl border border-border bg-card p-6">
          <p className="text-[15px] font-semibold leading-relaxed text-foreground">
            {question.q}
          </p>

          <div className="mt-6 space-y-2">
            {question.options.map((opt, i) => {
              const isCorrect = i === question.answer
              const isSelected = i === selected

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={answered}
                  className={cn(
                    "flex w-full items-center gap-3 text-left rounded-lg border px-4 py-3 text-sm transition-all",
                    !answered && "border-border hover:border-primary/30 hover:bg-surface-1",
                    answered && isCorrect && "border-chart-3/40 bg-chart-3/5 text-foreground",
                    answered && isSelected && !isCorrect && "border-chart-5/40 bg-chart-5/5 text-foreground",
                    answered && !isSelected && !isCorrect && "border-border opacity-40"
                  )}
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border font-mono text-[10px] text-muted-foreground">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              )
            })}
          </div>

          {answered && (
            <div className="mt-5 flex justify-end">
              <button
                onClick={nextQuestion}
                className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
              >
                {currentQ + 1 >= questions.length ? "See Results" : "Next"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
