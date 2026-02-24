"use client"

import { useEffect, useState, useRef } from "react"

const bootLines = [
  { text: "[MUSEUM_OS v2026.02] BOOT SEQUENCE INITIATED", delay: 200, glow: true },
  { text: "", delay: 60 },
  { text: "CPU : Quantum Neural Processor @ 4.20 GHz", delay: 80 },
  { text: "MEM : 16384 MB Extended.................. OK", delay: 70 },
  { text: "GPU : CRT Phosphor Engine v8.0........... OK", delay: 70 },
  { text: "VGA : VGA-Compatible Phosphor Display..... OK", delay: 70 },
  { text: "", delay: 40 },
  { text: "Detecting Primary Master.... AI Core Database", delay: 120 },
  { text: "Detecting Primary Slave..... 64TB Neural Storage", delay: 100 },
  { text: "", delay: 40 },
  { text: "Loading neural pathways.................. OK", delay: 90 },
  { text: "Calibrating temporal sensors............. OK", delay: 80 },
  { text: "Mounting exhibit databases............... OK", delay: 80 },
  { text: "Scanning 40 AI models................... OK", delay: 100 },
  { text: "Verifying consciousness.dll......... SUSPECT", delay: 120 },
  { text: "Initializing phosphor display........... OK", delay: 80 },
  { text: "Connecting to timeline [1950-2026]...... OK", delay: 90 },
  { text: "Loading CRT shader pipeline............. OK", delay: 70 },
  { text: "Applying scanline overlay............... OK", delay: 70 },
  { text: "Establishing quantum link............... OK", delay: 90 },
  { text: "", delay: 40 },
  { text: "All subsystems nominal. 40 exhibits across 10 wings.", delay: 140 },
]

interface BootSequenceProps {
  onInitialize: () => void
}

export function BootSequence({ onInitialize }: BootSequenceProps) {
  const [lines, setLines] = useState<Array<{ text: string; glow?: boolean }>>([])
  const [progress, setProgress] = useState(-1)
  const [ready, setReady] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let isMounted = true
    const timers: ReturnType<typeof setTimeout>[] = []

    let accDelay = 400

    bootLines.forEach((line) => {
      accDelay += line.delay + Math.random() * 80
      timers.push(
        setTimeout(() => {
          if (!isMounted) return
          setLines((prev) => [...prev, { text: line.text, glow: line.glow }])
        }, accDelay),
      )
    })

    // Start progress bar
    accDelay += 250
    timers.push(
      setTimeout(() => {
        if (isMounted) setProgress(0)
      }, accDelay),
    )

    // Progress steps
    const steps = 30
    const stepMs = 35
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
      }, accDelay + steps * stepMs + 350),
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

      {/* Boot content */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-10 scrollbar-none"
        style={{ fontSize: "clamp(11px, 1.4vw, 15px)", lineHeight: "1.5" }}
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
              animation: "bootLineIn 0.12s ease-out forwards",
            }}
          >
            {line.text}
          </div>
        ))}

        {/* Progress bar */}
        {progress >= 0 && (
          <div
            className="mt-3"
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
            className="mt-4"
            style={{
              opacity: 0,
              animation: "bootLineIn 0.3s ease-out 0.1s forwards",
            }}
          >
            <div
              className="text-[#00ff88] mb-4 font-bold"
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

      {/* Version footer */}
      <div
        className="px-4 pb-2 sm:px-6 sm:pb-3 md:px-10 flex justify-between items-center"
        style={{ fontSize: "clamp(9px, 1vw, 12px)" }}
      >
        <span className="text-[#00ff88]/20">NO CARRIER</span>
        <span className="text-[#00ff88]/20">v0.8.0</span>
      </div>
    </div>
  )
}
