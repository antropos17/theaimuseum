"use client"

import { useState, useRef, useCallback } from "react"
import dynamic from "next/dynamic"
import { CrtMonitor3D } from "../crt-monitor-3d" // Use the new orchestrator
import { cn } from "@/lib/utils"

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
  const [phase, setPhase] = useState<Phase>(() => {
    if (typeof window === "undefined") return "loading"
    const alreadyBooted = sessionStorage.getItem(SESSION_KEY)
    return alreadyBooted ? "ready" : "boot"
  })
  const [mounted] = useState(() => typeof window !== "undefined")
  const flashRef = useRef<HTMLDivElement>(null)

  // CRT power-off transition (from Boot to Ready)
  const handleInitialize = useCallback(() => {
    setPhase("transition")
    sessionStorage.setItem(SESSION_KEY, "1")

    const flash = flashRef.current
    if (flash) {
      // Step 1: Screen flash (0-150ms)
      flash.style.transition = "opacity 100ms ease-out"
      flash.style.opacity = "0.6"

      setTimeout(() => {
        // Step 2: Flash fades (150-400ms)
        flash.style.transition = "opacity 300ms ease-out"
        flash.style.opacity = "0"
      }, 150)
    }

    // Give the 3D camera 1200ms to dive into the screen
    setTimeout(() => {
      setPhase("ready")
    }, 1200)
  }, [])

  // SSR guard
  if (!mounted) {
    return <div className="min-h-screen bg-[#0a0a0f]" />
  }

  return (
    <>
      {/* Neural network background - always visible, but dimmer when ready */}
      <NeuralCanvas
        className={phase === "ready" ? "opacity-30" : "opacity-50"}
      />

      {/* Main Experience: Either the 3D CRT (Boot/Transition) OR the actual DOM App (Ready) */}
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        {/* Flash overlay for transition */}
        {phase === "transition" && (
          <div
            ref={flashRef}
            className="absolute inset-0 pointer-events-none z-[60]"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,255,136,0.4) 0%, rgba(255,255,255,0.3) 50%, transparent 80%)",
              opacity: 0,
            }}
          />
        )}

        {/* 3D CRT Monitor - Only rendered during loading, boot, or diving transition */}
        {phase !== "ready" && (
          <div className="w-full h-full pointer-events-auto bg-[#0a0a0f] absolute inset-0 z-40 transition-opacity duration-500">
            <CrtMonitor3D
              isPowered={true}
              isZoomingIn={phase === "transition"} // Triggers the camera dive
            >
              <BootSequence onInitialize={handleInitialize} />
            </CrtMonitor3D>
          </div>
        )}

        {/* Actual DOM App Data - Renders after the camera dives into the screen */}
        <div
          data-boot-wrapper
          className={cn(
            "w-full h-full pointer-events-auto absolute inset-0 z-30 transition-opacity duration-1000",
            phase === "ready" ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          {children}
        </div>
      </div>
    </>
  )
}
