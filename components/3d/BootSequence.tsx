"use client"

import { useEffect, useState, useRef } from "react"

type Status = "OK" | "SUSPECT" | "WARNING" | "FAILED"

interface BootLine {
  text: string
  delay: number
  glow?: boolean
  status?: Status
}

const bootLines: BootLine[] = [
  { text: "[MUSEUM_OS v2026.02] BOOT SEQUENCE INITIATED", delay: 150, glow: true },
  { text: "", delay: 20 },
  { text: "CPU : Quantum Neural Processor @ 4.20 GHz", delay: 50 },
  { text: "MEM : 16384 MB Extended..................", delay: 40, status: "OK" },
  { text: "GPU : CRT Phosphor Engine v8.0...........", delay: 40, status: "OK" },
  { text: "VGA : Phosphor Display 1024x768..........", delay: 40, status: "OK" },
  { text: "", delay: 15 },
  { text: "Detecting Primary Master.... AI Core Database", delay: 60 },
  { text: "Detecting Primary Slave..... 64TB Neural Storage", delay: 50 },
  { text: "", delay: 15 },
  { text: "Loading neural pathways..................", delay: 40, status: "OK" },
  { text: "Calibrating temporal sensors.............", delay: 35, status: "OK" },
  { text: "Mounting exhibit databases...............", delay: 35, status: "OK" },
  { text: "Scanning 40 AI models...................", delay: 50, status: "OK" },
  { text: "Verifying consciousness.dll.............", delay: 80, status: "SUSPECT" },
  { text: "Skynet prevention module................", delay: 45, status: "WARNING" },
  { text: "Initializing phosphor display...........", delay: 35, status: "OK" },
  { text: "Connecting to timeline [1950-2026]......", delay: 40, status: "OK" },
  { text: "Loading CRT shader pipeline.............", delay: 35, status: "OK" },
  { text: "Applying scanline overlay...............", delay: 35, status: "OK" },
  { text: "Establishing quantum link...............", delay: 40, status: "OK" },
  { text: "", delay: 15 },
  { text: "All subsystems nominal. 40 exhibits across 10 wings.", delay: 80 },
]

const STATUS_COLORS: Record<Status, string> = {
  OK: "#00ff88",
  SUSPECT: "#ffaa00",
  WARNING: "#ffaa00",
  FAILED: "#ff4444",
}

const STATUS_SHADOWS: Record<Status, string> = {
  OK: "0 0 6px rgba(0,255,136,0.4)",
  SUSPECT: "0 0 6px rgba(255,170,0,0.4)",
  WARNING: "0 0 6px rgba(255,170,0,0.4)",
  FAILED: "0 0 8px rgba(255,68,68,0.5)",
}

interface BootSequenceProps {
  onInitialize: () => void
}

export function BootSequence({ onInitialize }: BootSequenceProps) {
  const [lines, setLines] = useState<BootLine[]>([])
  const [progress, setProgress] = useState(-1)
  const [ready, setReady] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let isMounted = true
    const timers: ReturnType<typeof setTimeout>[] = []

    let accDelay = 200

    bootLines.forEach((line) => {
      accDelay += line.delay + Math.random() * 25
      timers.push(
        setTimeout(() => {
          if (!isMounted) return
          setLines((prev) => [...prev, line])
        }, accDelay),
      )
    })

    // Start progress bar
    accDelay += 150
    timers.push(
      setTimeout(() => {
        if (isMounted) setProgress(0)
      }, accDelay),
    )

    // Progress steps — fast ASCII bar
    const steps = 25
    const stepMs = 25
    for (let s = 1; s <= steps; s++) {
      timers.push(
        setTimeout(() => {
          if (!isMounted) return
          setProgress(Math.min(Math.round((s / steps) * 100), 100))
        }, accDelay + s * stepMs),
      )
    }

    // Ready
    timers.push(
      setTimeout(() => {
        if (isMounted) setReady(true)
      }, accDelay + steps * stepMs + 200),
    )

    return () => {
      isMounted = false
      timers.forEach(clearTimeout)
    }
  }, [])

  // Auto-scroll boot text
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines, progress, ready])

  const barWidth = 40
  const filled = progress >= 0 ? Math.round((progress / 100) * barWidth) : 0
  const empty = barWidth - filled

  return (
    <div className="absolute inset-0 flex flex-col bg-[#050508] text-[#00ff88] font-mono overflow-hidden">
      {/* Subtle screen flicker */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          animation: "bootFlicker 4s steps(1) infinite",
        }}
      />

      {/* Boot content — terminal layout */}
      <div className="flex-1 flex items-start justify-center overflow-hidden">
        <div
          ref={scrollRef}
          className="w-full max-w-2xl overflow-y-auto overflow-x-hidden px-4 py-3 sm:px-6 sm:py-4 scrollbar-none"
          style={{ fontSize: "clamp(11px, 1.4vw, 15px)", lineHeight: "1.55" }}
        >
          {lines.map((line, i) => (
            <div
              key={i}
              className="min-h-[1.4em] whitespace-pre-wrap"
              style={{
                textShadow: line.glow
                  ? "0 0 10px rgba(0,255,136,0.5), 0 0 3px rgba(0,255,136,0.3)"
                  : "0 0 4px rgba(0,255,136,0.15)",
                opacity: 0,
                animation: "bootLineIn 0.1s ease-out forwards",
              }}
            >
              {line.status ? (
                <>
                  <span>{line.text} </span>
                  <span
                    style={{
                      color: STATUS_COLORS[line.status],
                      textShadow: STATUS_SHADOWS[line.status],
                      fontWeight: line.status !== "OK" ? 700 : 400,
                    }}
                  >
                    {line.status}
                  </span>
                </>
              ) : (
                line.text
              )}
            </div>
          ))}

          {/* Progress bar */}
          {progress >= 0 && (
            <div
              className="mt-2"
              style={{
                textShadow: "0 0 6px rgba(0,255,136,0.25)",
                opacity: 0,
                animation: "bootLineIn 0.15s ease-out forwards",
              }}
            >
              <div className="flex items-center gap-2 whitespace-pre">
                <span className="text-[#00ff88]/60">LOAD</span>
                <span>
                  [{"█".repeat(filled)}
                  {"░".repeat(empty)}]
                </span>
                <span className="text-[#00ff88]/80 tabular-nums">{progress}%</span>
              </div>
            </div>
          )}

          {/* Ready state */}
          {ready && (
            <div
              className="mt-3"
              style={{
                opacity: 0,
                animation: "bootLineIn 0.3s ease-out 0.1s forwards",
              }}
            >
              <div
                className="text-[#00ff88] mb-3 font-bold"
                style={{ textShadow: "0 0 15px rgba(0,255,136,0.6)" }}
              >
                {">"} SYSTEM READY. ALL EXHIBITS LOADED.
              </div>

              <button
                onClick={onInitialize}
                className="group relative px-3 py-1.5 sm:px-4 sm:py-2 border border-[#00ff88]/60 text-[#00ff88] hover:bg-[#00ff88] hover:text-[#0a0a0f] transition-all duration-300 font-bold uppercase tracking-[0.15em] cursor-pointer"
                style={{
                  fontSize: "clamp(10px, 1.2vw, 14px)",
                  boxShadow:
                    "0 0 20px rgba(0,255,136,0.15), inset 0 0 20px rgba(0,255,136,0.08)",
                  textShadow: "0 0 8px rgba(0,255,136,0.4)",
                  animation: "pulseDot 2.5s ease-in-out infinite",
                }}
              >
                <span className="relative z-10">▶ INITIALIZE NEURAL LINK</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Version footer */}
      <div
        className="px-4 pb-2 sm:px-6 sm:pb-3 flex justify-between items-center"
        style={{ fontSize: "clamp(9px, 1vw, 12px)" }}
      >
        <span className="text-[#00ff88]/20">NO CARRIER</span>
        <span className="text-[#00ff88]/20">v0.8.0</span>
      </div>
    </div>
  )
}
