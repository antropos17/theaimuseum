'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { quizQuestions } from '@/data/models'
import { cn } from '@/lib/utils'
import { CopyableTerminalCard } from '@/components/ui/copyable-terminal-card'
import confetti from 'canvas-confetti'
import { ArrowLeft } from 'lucide-react'

const RANKS = [
  {
    min: 90,
    label: 'SUPREME NEURAL ARCHITECT',
    msg: "You don't just know AI history -- you ARE AI history. Your neural pathways are indistinguishable from a transformer model.",
  },
  {
    min: 70,
    label: 'SENIOR SYSTEMS ANALYST',
    msg: 'Impressive diagnostic results. Your knowledge base covers most critical AI milestones. A few blind spots remain in your training data.',
  },
  {
    min: 50,
    label: 'JUNIOR DATA OPERATIVE',
    msg: 'Acceptable performance for a human operator. You understand the basics, but critical gaps in your knowledge could lead to catastrophic misunderstandings.',
  },
  {
    min: 30,
    label: 'UNTRAINED INTERN',
    msg: 'Your AI knowledge is... developing. We recommend immediate retraining. Perhaps start by asking ChatGPT about itself.',
  },
  {
    min: 0,
    label: 'SECURITY BREACH DETECTED',
    msg: "How did you get access to this terminal? Your responses suggest zero familiarity with artificial intelligence. Are you sure you're not a bot?",
  },
]

function getRank(pct: number) {
  return RANKS.find((r) => pct >= r.min) || RANKS[RANKS.length - 1]
}

export function QuizView() {
  const [phase, setPhase] = useState<'boot' | 'quiz' | 'results'>('boot')
  const [bootLine, setBootLine] = useState(0)
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const confettiFired = useRef(false)

  const questions = quizQuestions
  const question = questions[currentQ]
  const total = questions.length

  // Boot sequence
  const BOOT_LINES = [
    '> LOADING DIAGNOSTIC MODULE...',
    '> CALIBRATING KNOWLEDGE VECTORS...',
    '> ESTABLISHING NEURAL LINK...',
    '> 10 CHALLENGES QUEUED',
    '> BEGIN SYSTEM DIAGNOSTIC_',
  ]

  useEffect(() => {
    if (phase !== 'boot') return
    const timers: NodeJS.Timeout[] = []
    BOOT_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setBootLine(i), i * 350))
    })
    timers.push(
      setTimeout(
        () => {
          setPhase('quiz')
          setTimerActive(true)
        },
        BOOT_LINES.length * 350 + 400,
      ),
    )
    return () => timers.forEach(clearTimeout)
  }, [phase])

  // Timer
  useEffect(() => {
    if (!timerActive) return
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(interval)
  }, [timerActive])

  // Fire confetti once on score reveal
  useEffect(() => {
    if (phase === 'results' && !confettiFired.current) {
      confettiFired.current = true
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        gravity: 0.8,
        colors: ['#00ff88', '#00d4ff', '#ffb800', '#ffffff'],
      })
    }
  }, [phase])

  const handleAnswer = useCallback(
    (optIdx: number) => {
      if (answered) return
      setSelected(optIdx)
      setAnswered(true)
      if (optIdx === question.answer) setScore((s) => s + 1)
      // Show feedback flash, then allow next
      setShowFeedback(true)
    },
    [answered, question],
  )

  function nextQuestion() {
    if (currentQ + 1 >= total) {
      setTimerActive(false)
      setPhase('results')
    } else {
      setCurrentQ((c) => c + 1)
      setSelected(null)
      setAnswered(false)
      setShowFeedback(false)
    }
  }

  function skipBoot() {
    setPhase('quiz')
    setTimerActive(true)
  }

  function restart() {
    setPhase('boot')
    setBootLine(0)
    setCurrentQ(0)
    setSelected(null)
    setScore(0)
    setAnswered(false)
    setShowFeedback(false)
    setElapsed(0)
    setTimerActive(false)
    confettiFired.current = false
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  // ----- BOOT SCREEN -----
  if (phase === 'boot') {
    return (
      <div className="min-h-screen pt-16 cursor-pointer" onClick={skipBoot}>
        <div className="mx-auto max-w-xl px-4 pb-24 pt-20">
          <CopyableTerminalCard className="p-8">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              sys://diagnostic/ai-history
            </p>
            <div className="mt-6 space-y-3">
              {BOOT_LINES.map((line, i) => (
                <p
                  key={i}
                  className={cn(
                    'font-mono text-sm transition-all duration-300',
                    i <= bootLine ? 'opacity-100 text-primary text-glow-subtle' : 'opacity-0',
                    i === bootLine && 'animate-pulse',
                  )}
                >
                  {line}
                </p>
              ))}
            </div>
            <p className="mt-8 font-mono text-[10px] text-muted-foreground/50 animate-pulse">
              Click anywhere to skip
            </p>
          </CopyableTerminalCard>
        </div>
      </div>
    )
  }

  // ----- RESULTS SCREEN -----
  if (phase === 'results') {
    const pct = Math.round((score / total) * 100)
    const rank = getRank(pct)

    // Dynamic challenge text based on score
    let challengeText = ''
    if (score === 10) {
      challengeText = "Perfect score on the AI Museum Quiz. I'm an AI Curator."
    } else if (score >= 7) {
      challengeText = `I scored ${score}/10 on the AI History Quiz. Can you beat me?`
    } else if (score >= 4) {
      challengeText = `I scored ${score}/10 — AI history is harder than I thought.`
    } else {
      challengeText = `Only ${score}/10 on the AI quiz. This thing humbled me.`
    }

    const challengeUrl = 'https://v0-theaimuseum.vercel.app/quiz'

    const handleChallengeFriend = async () => {
      // Try Web Share API first
      if (navigator.share) {
        try {
          await navigator.share({
            text: `${challengeText} ${challengeUrl}`,
            url: challengeUrl,
          })
        } catch (err) {
          console.log('[v0] Share cancelled or failed:', err)
        }
      } else {
        // Fallback to Twitter
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(challengeText)}&url=${encodeURIComponent(challengeUrl)}`
        window.open(twitterUrl, '_blank', 'noopener,noreferrer')
      }
    }

    const handleShareTwitter = () => {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(challengeText)}&url=${encodeURIComponent(challengeUrl)}`
      window.open(twitterUrl, '_blank', 'noopener,noreferrer')
    }

    const handleShareWhatsApp = () => {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${challengeText} ${challengeUrl}`)}`
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    }

    const handleCopyLink = async () => {
      try {
        await navigator.clipboard.writeText(challengeUrl)
        // Success - you could add a toast here if desired
      } catch (err) {
        console.log('[v0] Copy failed:', err)
      }
    }
    return (
      <div className="min-h-screen pt-16">
        <div className="mx-auto max-w-xl px-4 pb-24 pt-10">
          <CopyableTerminalCard className="p-8">
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
                    backgroundColor:
                      pct >= 70
                        ? 'var(--chart-3)'
                        : pct >= 40
                          ? 'var(--chart-2)'
                          : 'var(--chart-5)',
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
                <p
                  className={cn(
                    'mt-2 font-mono text-sm tracking-wide',
                    pct >= 70
                      ? 'text-primary text-glow-subtle'
                      : pct >= 40
                        ? 'text-chart-2'
                        : 'text-chart-5',
                  )}
                >
                  [{rank.label}]
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{rank.msg}</p>
              </div>
            </div>

            {/* Challenge a Friend - Large Primary Button */}
            <div className="mt-6 border-t border-dashed border-border pt-6">
              <button
                onClick={handleChallengeFriend}
                className="glass-btn-primary w-full px-6 py-3.5 font-mono text-sm text-foreground flex items-center justify-center gap-2"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
                CHALLENGE A FRIEND
              </button>

              {/* Social proof with Users icon */}
              <div className="mt-2 flex items-center justify-center gap-1.5">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-muted-foreground"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span className="font-mono text-[10px] text-muted-foreground">
                  2,400+ have taken the quiz
                </span>
              </div>
            </div>

            {/* Share Platforms Row */}
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={handleShareTwitter}
                className="p-2 border border-border/30 rounded hover:border-[#00ff88]/50 hover:text-[#00ff88] transition"
                title="Share on X/Twitter"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>
              <button
                onClick={handleShareWhatsApp}
                className="p-2 border border-border/30 rounded hover:border-[#00ff88]/50 hover:text-[#00ff88] transition"
                title="Share on WhatsApp"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </button>
              <button
                onClick={handleCopyLink}
                className="p-2 border border-border/30 rounded hover:border-[#00ff88]/50 hover:text-[#00ff88] transition"
                title="Copy link"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
              <button
                onClick={handleChallengeFriend}
                className="p-2 border border-border/30 rounded hover:border-[#00ff88]/50 hover:text-[#00ff88] transition"
                title="Share via..."
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
              </button>
            </div>

            {/* Retry */}
            <div className="mt-4 border-t border-dashed border-border pt-4">
              <button
                onClick={restart}
                className="border border-border px-5 py-2.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {'>'} RESTART_DIAGNOSTIC
              </button>
            </div>
          </CopyableTerminalCard>
        </div>
      </div>
    )
  }

  // ----- QUIZ SCREEN -----
  const progressPct = ((currentQ + 1) / total) * 100
  const isCorrect = selected === question.answer

  // Share individual question
  const handleShareQuestion = async () => {
    const shareText = `Can you answer this AI history question?\n\n"${question.q}"\n\nTest your knowledge at The AI Museum`
    const shareUrl = 'https://v0-theaimuseum.vercel.app/quiz'

    if (navigator.share) {
      try {
        await navigator.share({
          text: `${shareText} ${shareUrl}`,
          url: shareUrl,
        })
      } catch (err) {
        console.log('[v0] Share cancelled or failed:', err)
      }
    } else {
      // Fallback to Twitter
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
      window.open(twitterUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const handleCopyQuestion = async () => {
    const questionText = `${question.q}\n\nOptions:\nA) ${question.options[0]}\nB) ${question.options[1]}\nC) ${question.options[2]}\nD) ${question.options[3]}\n\nAnswer: ${String.fromCharCode(65 + question.answer)}) ${question.options[question.answer]}\n\nFrom The AI Museum - https://v0-theaimuseum.vercel.app/quiz`

    try {
      await navigator.clipboard.writeText(questionText)
    } catch (err) {
      console.log('[v0] Copy failed:', err)
    }
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-xl px-4 pb-24 pt-10">
        <Link
          href="/"
          className="flex items-center gap-1.5 mb-4 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          Back to Museum
        </Link>

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
            {String(currentQ + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
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
            'mt-6 border transition-all duration-300',
            showFeedback && isCorrect && 'border-chart-3 shadow-[0_0_20px_rgba(0,200,100,0.1)]',
            showFeedback && !isCorrect && 'border-chart-5 shadow-[0_0_20px_rgba(255,80,80,0.1)]',
            !showFeedback && 'border-border',
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
              challenge_{String(currentQ + 1).padStart(2, '0')}.exe
            </span>
          </div>

          <div className="p-6">
            {/* Question prompt */}
            <div className="flex gap-2">
              <span className="font-mono text-sm text-primary text-glow-subtle shrink-0">
                {'>'}
              </span>
              <p className="text-[15px] leading-relaxed text-foreground">{question.q}</p>
            </div>

            {/* Share question buttons */}
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={handleShareQuestion}
                className="border border-border/50 px-3 py-1.5 font-mono text-[10px] text-muted-foreground/70 transition-colors hover:border-primary/40 hover:text-primary"
              >
                {'>'} Share Question
              </button>
              <button
                onClick={handleCopyQuestion}
                className="border border-border/50 px-3 py-1.5 font-mono text-[10px] text-muted-foreground/70 transition-colors hover:border-cyan-500/40 hover:text-cyan-400"
              >
                📋 Copy
              </button>
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
                      'group flex w-full items-center gap-3 border px-4 py-3 text-left font-mono text-[13px] transition-all duration-200',
                      // Default state
                      !answered &&
                        'border-border/50 text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-primary/5',
                      // Answered: correct answer highlight
                      answered && isThisCorrect && 'border-chart-3 bg-chart-3/10 text-foreground',
                      // Answered: wrong selection
                      answered &&
                        isThisSelected &&
                        !isThisCorrect &&
                        'border-chart-5 bg-chart-5/10 text-foreground',
                      // Answered: unselected wrong options dim
                      answered &&
                        !isThisSelected &&
                        !isThisCorrect &&
                        'border-border/20 text-muted-foreground/30',
                    )}
                  >
                    <span
                      className={cn(
                        'inline-flex h-6 w-6 shrink-0 items-center justify-center border text-[10px]',
                        !answered &&
                          'border-border/50 text-muted-foreground group-hover:border-primary/40 group-hover:text-primary',
                        answered && isThisCorrect && 'border-chart-3 text-chart-3',
                        answered &&
                          isThisSelected &&
                          !isThisCorrect &&
                          'border-chart-5 text-chart-5',
                        answered &&
                          !isThisSelected &&
                          !isThisCorrect &&
                          'border-border/20 text-muted-foreground/30',
                      )}
                    >
                      {answered && isThisCorrect
                        ? '+'
                        : answered && isThisSelected && !isThisCorrect
                          ? 'x'
                          : letter}
                    </span>
                    <span>{opt}</span>
                  </button>
                )
              })}
            </div>

            {/* Feedback + Next */}
            {answered && (
              <div className="mt-5 flex items-center justify-between border-t border-dashed border-border pt-4 animate-[terminalFadeIn_0.3s_ease-out]">
                <p className={cn('font-mono text-xs', isCorrect ? 'text-chart-3' : 'text-chart-5')}>
                  {isCorrect
                    ? '> CORRECT -- Neural pathways aligned'
                    : `> ERROR -- Expected: ${question.options[question.answer]}`}
                </p>
                <button
                  onClick={nextQuestion}
                  className="border border-primary bg-primary/10 px-4 py-2 font-mono text-[11px] text-primary transition-colors hover:bg-primary/20"
                >
                  {currentQ + 1 >= total ? '> RESULTS' : '> NEXT'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom status */}
        <div className="mt-4 flex items-center justify-between">
          <p className="font-mono text-[10px] text-muted-foreground/40">Difficulty: STANDARD</p>
          <p className="font-mono text-[10px] text-muted-foreground/40">
            {total - currentQ - 1} remaining
          </p>
        </div>
      </div>
    </div>
  )
}
