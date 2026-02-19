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
    const grade = pct >= 80 ? "AI HISTORIAN" : pct >= 60 ? "AI ENTHUSIAST" : pct >= 40 ? "AI TOURIST" : "AI NEWBIE"
    return (
      <div className="min-h-screen pt-16">
        <div className="mx-auto max-w-md px-4 pb-24 pt-10 text-center">
          <p className="mb-2 text-[8px] uppercase tracking-[0.3em] text-muted-foreground">{'>'} Results</p>
          <h1 className="text-lg text-primary">QUIZ COMPLETE</h1>
          <div className="mt-8 pixel-border bg-card p-8">
            <p className="text-[10px] text-chart-4">* * *</p>
            <p className="mt-3 text-3xl tabular-nums text-primary">{score}/{questions.length}</p>
            <p className="mt-1 text-[8px] text-muted-foreground">{pct}% correct</p>
            <p className="mt-4 text-[10px] text-foreground">{grade}</p>
            <div className="mt-4 h-[6px] w-full bg-muted">
              <div className="h-full bg-primary transition-all duration-700" style={{ width: `${pct}%` }} />
            </div>
            <button onClick={restart} className="mt-6 pixel-border bg-primary px-4 py-2 text-[8px] text-primary-foreground hover:brightness-110">
              [RETRY]
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-md px-4 pb-24 pt-10">
        <p className="mb-2 text-[8px] uppercase tracking-[0.3em] text-muted-foreground">{'>'} Challenge</p>
        <h1 className="text-lg text-primary sm:text-xl">AI HISTORY QUIZ</h1>
        <p className="mt-2 text-[8px] text-muted-foreground">
          {questions.length} questions. No cheating.
        </p>

        {/* Progress */}
        <div className="mt-4 flex items-center gap-2">
          <span className="text-[7px] tabular-nums text-muted-foreground">{currentQ + 1}/{questions.length}</span>
          <div className="h-[4px] flex-1 bg-muted">
            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
          </div>
          <span className="text-[7px] tabular-nums text-primary">{score}pts</span>
        </div>

        {/* Question */}
        <div className="mt-6 pixel-border bg-card p-5">
          <p className="text-[9px] leading-[2] text-foreground">{question.q}</p>
          <div className="mt-4 space-y-1.5">
            {question.options.map((opt, i) => {
              const isCorrect = i === question.answer
              const isSelected = i === selected
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={answered}
                  className={cn(
                    "pixel-border flex w-full items-center gap-2 px-3 py-2 text-left text-[7px] transition-colors",
                    !answered && "hover:border-primary hover:text-foreground",
                    answered && isCorrect && "border-chart-3 bg-chart-3/10 text-foreground",
                    answered && isSelected && !isCorrect && "border-chart-5 bg-chart-5/10 text-foreground",
                    answered && !isSelected && !isCorrect && "opacity-30"
                  )}
                >
                  <span className="text-muted-foreground">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </button>
              )
            })}
          </div>

          {answered && (
            <div className="mt-4 flex justify-end">
              <button onClick={nextQuestion} className="pixel-border bg-primary px-4 py-1.5 text-[7px] text-primary-foreground hover:brightness-110">
                {currentQ + 1 >= questions.length ? "[RESULTS]" : "[NEXT]"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
