"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useStore } from "@/lib/stores/store"

/* ── path mapping ── */
function toTerminalPath(pathname: string): string {
  if (pathname === "/") return "C:\\AI_MUSEUM>"
  const segments = pathname
    .replace(/^\//, "")
    .split("/")
    .map((s) => s.replace(/-/g, "_").toUpperCase())
  return `C:\\AI_MUSEUM\\${segments.join("\\")}>`
}

/* ── session timer ── */
function useSessionTimer() {
  const [elapsed, setElapsed] = useState("00:00")

  useEffect(() => {
    const KEY = "ai_museum_session_start"
    let start = Number(sessionStorage.getItem(KEY))
    if (!start) {
      start = Date.now()
      sessionStorage.setItem(KEY, String(start))
    }

    const tick = () => {
      const diff = Math.floor((Date.now() - start) / 1000)
      const h = Math.floor(diff / 3600)
      const m = Math.floor((diff % 3600) / 60)
      const s = diff % 60
      setElapsed(
        h > 0
          ? `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
          : `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
      )
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return elapsed
}

/* ── component ── */
export function TerminalHud() {
  const pathname = usePathname()
  const visitedCount = useStore((s) => s.visitedModels.length)
  const elapsed = useSessionTimer()

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex h-8 items-center border-t border-[#00ff88]/30 bg-[#0a0a0f] px-3 font-mono text-[10px] text-[#00ff88] select-none"
      style={{ textShadow: "0 0 4px rgba(0,255,136,0.5)" }}
    >
      {/* 1 — path + blinking cursor */}
      <span className="shrink-0 whitespace-nowrap">
        {toTerminalPath(pathname)}
        <span className="ml-px inline-block animate-terminal-blink">█</span>
      </span>

      {/* 2 — exhibit counter (hidden on mobile) */}
      <span className="mx-auto hidden sm:inline-block">
        EXHIBITS: {visitedCount}/40
      </span>

      {/* 3 — session timer (hidden on mobile) */}
      <span className="mr-4 hidden shrink-0 sm:inline-block">
        SESSION: {elapsed}
      </span>

      {/* 4 — online status (hidden on mobile) */}
      <span className="hidden shrink-0 items-center gap-1 sm:inline-flex">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#00ff88] animate-terminal-blink" />
        [ONLINE]
      </span>
    </div>
  )
}
