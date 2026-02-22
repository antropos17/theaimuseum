"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import dynamic from "next/dynamic"

const CRTMonitor = dynamic(
  () => import("@/components/3d/CRTMonitor").then((m) => m.CRTMonitor),
  { ssr: false },
)
const BootSequence = dynamic(
  () => import("@/components/3d/BootSequence").then((m) => m.BootSequence),
  { ssr: false },
)
const NeuralCanvas = dynamic(
  () => import("@/components/3d/NeuralCanvas").then((m) => m.NeuralCanvas),
  { ssr: false },
)

type Phase = "loading" | "boot" | "transition" | "ready"

const SESSION_KEY = "aimuseum-booted"

export function ExperienceWrapper({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>("loading")
  const [mounted, setMounted] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)

  // Check session on mount
  useEffect(() => {
    setMounted(true)
    const alreadyBooted = sessionStorage.getItem(SESSION_KEY)
    setPhase(alreadyBooted ? "ready" : "boot")
  }, [])

  // CRT power-off transition
  const handleInitialize = useCallback(() => {
    setPhase("transition")
    sessionStorage.setItem(SESSION_KEY, "1")

    const overlay = overlayRef.current
    const flash = flashRef.current
    if (!overlay || !flash) {
      setPhase("ready")
      return
    }

    // Step 1: Screen flash (0-150ms)
    flash.style.transition = "opacity 100ms ease-out"
    flash.style.opacity = "0.6"

    setTimeout(() => {
      // Step 2: Flash fades (150-400ms)
      flash.style.transition = "opacity 300ms ease-out"
      flash.style.opacity = "0"
    }, 150)

    setTimeout(() => {
      // Step 3: CRT power-off - shrink vertically (400-1000ms)
      overlay.style.transition =
        "transform 600ms cubic-bezier(0.23, 1, 0.32, 1), opacity 400ms ease-out"
      overlay.style.transform = "scaleY(0.003)"
      overlay.style.opacity = "0.8"
    }, 400)

    setTimeout(() => {
      // Step 4: Shrink to dot and fade (1000-1300ms)
      overlay.style.transition =
        "transform 300ms ease-in, opacity 300ms ease-in"
      overlay.style.transform = "scaleY(0.003) scaleX(0)"
      overlay.style.opacity = "0"
    }, 1000)

    setTimeout(() => {
      // Step 5: Done
      setPhase("ready")
    }, 1350)
  }, [])

  // SSR guard
  if (!mounted) {
    return <div className="min-h-screen bg-[#0a0a0f]" />
  }

  return (
    <>
      {/* Neural network background - always visible */}
      <NeuralCanvas
        className={phase === "ready" ? "opacity-30" : "opacity-50"}
      />

      {/* Boot overlay */}
      {(phase === "boot" || phase === "transition") && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0f]"
          style={{ transformOrigin: "center center" }}
        >
          <CRTMonitor isTransitioning={phase === "transition"}>
            <BootSequence onInitialize={handleInitialize} />
          </CRTMonitor>

          {/* Flash overlay */}
          <div
            ref={flashRef}
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,255,136,0.4) 0%, rgba(255,255,255,0.3) 50%, transparent 80%)",
              opacity: 0,
            }}
          />
        </div>
      )}

      {/* Main content */}
      <div
        className={`relative z-10 transition-opacity duration-700 ${
          phase === "ready"
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {children}
      </div>
    </>
  )
}
