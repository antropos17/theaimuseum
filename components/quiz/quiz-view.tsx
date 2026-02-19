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
      <div className="min-h-screen pt-20">
        <div className="mx-auto max-w-lg px-4 pb-24 text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Quiz Complete
          </h1>

          <div className="mt-10 glass rounded-xl p-8">
            <p className="font-mono text-6xl font-bold text-primary">
              {score}/{questions.length}
            </p>
            <p className="mt-2 font-sans text-sm text-muted-foreground">
              {pct}% correct
            </p>
            <p className="mt-4 font-serif text-xl font-bold text-foreground">
              {grade}
            </p>

            {/* Grade bar */}
            <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-1000"
                style={{ width: `${pct}%` }}
              />
            </div>

            <button
              onClick={restart}
              className="mt-8 rounded-lg bg-primary/12 px-6 py-2.5 font-sans text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-lg px-4 pb-24">
        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
          AI History Quiz
        </h1>
        <p className="mt-2 font-sans text-sm text-muted-foreground">
          Test your knowledge. 10 questions, no cheating.
        </p>

        {/* Progress */}
        <div className="mt-6 flex items-center gap-3">
          <span className="font-mono text-xs text-muted-foreground">
            {currentQ + 1}/{questions.length}
          </span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
            />
          </div>
          <span className="font-mono text-xs text-primary">
            Score: {score}
          </span>
        </div>

        {/* Question */}
        <div className="mt-8 glass rounded-xl p-6">
          <p className="font-sans text-base font-bold text-foreground leading-relaxed">
            {question.q}
          </p>

          <div className="mt-6 space-y-3">
            {question.options.map((opt, i) => {
              const isCorrect = i === question.answer
              const isSelected = i === selected

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className={cn(
                    "w-full text-left rounded-lg px-4 py-3 font-sans text-sm transition-all border",
                    !answered && "border-border hover:border-primary/30 hover:bg-primary/5",
                    answered && isCorrect && "border-[var(--museum-success)] bg-[var(--museum-success)]/10 text-foreground",
                    answered && isSelected && !isCorrect && "border-destructive bg-destructive/10 text-foreground",
                    answered && !isSelected && !isCorrect && "border-border opacity-50"
                  )}
                  disabled={answered}
                >
                  <span className="font-mono text-xs text-muted-foreground mr-2">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {opt}
                </button>
              )
            })}
          </div>

          {answered && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={nextQuestion}
                className="rounded-lg bg-primary/12 px-5 py-2 font-sans text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
              >
                {currentQ + 1 >= questions.length ? "See Results" : "Next Question"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
