"use client"

import { useState, useEffect, useCallback, useRef } from "react"

const STORAGE_KEY = "museum-booted"

const BOOT_LINES = [
  { text: 'CPU: Neural Processing Unit...', suffix: ' OK' },
  { text: 'RAM: 40 Exhibits loaded...', suffix: ' OK' },
  { text: 'DISK: 76 years of data...', suffix: ' OK' },
  { text: 'GPU: CRT Phosphor Engine...', suffix: ' OK' },
  { text: 'NET: Connecting to AI Museum...', suffix: '' },
]

const LINE_DELAY = 200
const PROGRESS_DURATION = 600
const PROGRESS_STEPS = 20

type Phase =
  | "black"
  | "header"
  | "lines"
  | "progress"
  | "complete"
  | "flash"
  | "done"

export function CrtBootSequence({ children }: { children: React.ReactNode }) {
  const [shouldShow, setShouldShow] = useState<boolean | null>(null)
  const [phase, setPhase] = useState<Phase>("black")
  const [visibleLines, setVisibleLines] = useState(0)
  const [progressValue, setProgressValue] = useState(0)
  const [flashOpacity, setFlashOpacity] = useState(0)
  const dismissed = useRef(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const booted = localStorage.getItem(STORAGE_KEY)
    setShouldShow(!booted)
  }, [])

  const finish = useCallback(() => {
    if (dismissed.current) return
    dismissed.current = true
    localStorage.setItem(STORAGE_KEY, "1")
    setFlashOpacity(1)
    setPhase("flash")
    setTimeout(() => {
      setFlashOpacity(0)
      setTimeout(() => setPhase("done"), 150)
    }, 120)
  }, [])

  const skip = useCallback(() => {
    finish()
  }, [finish])

  useEffect(() => {
    if (shouldShow !== true || dismissed.current) return

    const timers: ReturnType<typeof setTimeout>[] = []

    // Phase 1: black → header
    timers.push(setTimeout(() => setPhase("header"), 500))

    // Phase 2: header → lines start
    timers.push(setTimeout(() => setPhase("lines"), 900))

    // Phase 3: lines appear one by one (200ms each)
    BOOT_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setVisibleLines(i + 1)
      }, 900 + LINE_DELAY * (i + 1)))
    })

    const linesEnd = 900 + LINE_DELAY * (BOOT_LINES.length + 1)

    // Phase 4: progress bar
    timers.push(setTimeout(() => setPhase("progress"), linesEnd))

    const stepMs = PROGRESS_DURATION / PROGRESS_STEPS
    for (let s = 1; s <= PROGRESS_STEPS; s++) {
      timers.push(setTimeout(() => {
        setProgressValue(Math.min(Math.round((s / PROGRESS_STEPS) * 100), 100))
      }, linesEnd + stepMs * s))
    }

    // Phase 5: boot complete
    timers.push(setTimeout(() => setPhase("complete"), linesEnd + PROGRESS_DURATION + 200))

    return () => timers.forEach(clearTimeout)
  }, [shouldShow])

  useEffect(() => {
    if (phase !== "complete") return
    const handler = () => finish()
    window.addEventListener("keydown", handler)
    window.addEventListener("click", handler)
    return () => {
      window.removeEventListener("keydown", handler)
      window.removeEventListener("click", handler)
    }
  }, [phase, finish])

  // SSR / already booted
  if (shouldShow === null) return null
  if (shouldShow === false || phase === "done") return <>{children}</>

  const progressBarWidth = 30
  const filled = Math.round((progressValue / 100) * progressBarWidth)
  const empty = progressBarWidth - filled
  const bar = `[${"█".repeat(filled)}${"░".repeat(empty)}] ${progressValue}%`

  return (
    <>
      {/* Boot overlay */}
      <div
        className="fixed inset-0 z-[10001] flex flex-col font-mono boot-crt-flicker"
        style={{ background: "#0a0a0f" }}
      >
        {/* CRT scanlines for boot screen */}
        <div className="boot-scanlines" aria-hidden="true" />

        {/* Terminal content */}
        <div className="relative z-10 p-6 sm:p-10 flex-1 flex flex-col">
          {/* Header */}
          {(phase === "header" || phase === "lines" || phase === "progress" || phase === "complete") && (
            <div
              className="boot-line text-[#00ff88] text-xs sm:text-sm mb-4"
              style={{ textShadow: "0 0 10px rgba(0,255,136,0.4)" }}
            >
              MUSEUM_OS v1950.2026
            </div>
          )}

          {/* Boot lines */}
          {(phase === "lines" || phase === "progress" || phase === "complete") && (
            <div className="flex flex-col gap-0.5">
              {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                <div
                  key={i}
                  className="boot-line text-[#00ff88] text-[11px] sm:text-xs"
                  style={{ textShadow: "0 0 6px rgba(0,255,136,0.25)" }}
                >
                  {line.text}
                  {line.suffix && (
                    <span className="text-[#00ff88] font-bold">{line.suffix}</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Progress bar */}
          {(phase === "progress" || phase === "complete") && (
            <div
              className="boot-line text-[#00ff88] text-[11px] sm:text-xs mt-3 whitespace-pre"
              style={{ textShadow: "0 0 6px rgba(0,255,136,0.25)" }}
            >
              {bar}
            </div>
          )}

          {/* Boot complete message */}
          {phase === "complete" && (
            <div
              className="boot-line text-[#00ff88] text-xs sm:text-sm mt-6 cursor-blink"
              style={{ textShadow: "0 0 12px rgba(0,255,136,0.5)" }}
            >
              BOOT COMPLETE. PRESS ANY KEY TO ENTER.
            </div>
          )}
        </div>

        {/* Skip button */}
        <button
          onClick={(e) => { e.stopPropagation(); skip() }}
          className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 text-[9px] font-mono tracking-wider text-[#00ff88]/30 hover:text-[#00ff88]/60 transition-colors"
        >
          [SKIP]
        </button>
      </div>

      {/* White flash overlay */}
      <div
        className="fixed inset-0 z-[10002] pointer-events-none"
        style={{
          background: "#fff",
          opacity: flashOpacity,
          transition: "opacity 150ms ease-out",
        }}
      />
    </>
  )
}
