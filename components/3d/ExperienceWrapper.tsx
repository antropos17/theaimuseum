"use client"

import { useState, useEffect, useCallback } from "react"
import dynamic from "next/dynamic"
import { CrtMonitor3D } from "./crt-monitor-3d"
import { cn } from "@/lib/utils"

const BootSequence = dynamic(
  () => import("@/components/3d/BootSequence").then((m) => m.BootSequence),
  { ssr: false },
)
const NeuralCanvas = dynamic(
  () => import("@/components/3d/NeuralCanvas").then((m) => m.NeuralCanvas),
  { ssr: false },
)

type Phase = "loading" | "boot" | "transition" | "fadeout" | "ready"

const SESSION_KEY = "aimuseum-booted"

export function ExperienceWrapper({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>("loading")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const alreadyBooted = sessionStorage.getItem(SESSION_KEY)
    setPhase(alreadyBooted ? "ready" : "boot")
    setMounted(true)
  }, [])

  const handleInitialize = useCallback(() => {
    setPhase("transition")
    sessionStorage.setItem(SESSION_KEY, "1")

    // Step 1: Let monitor zoom-in animate (600ms)
    // Step 2: Fade out the overlay smoothly (800ms)
    setTimeout(() => {
      setPhase("fadeout")
    }, 600)

    // Step 3: Remove overlay from DOM after fade completes
    setTimeout(() => {
      setPhase("ready")
    }, 1400)
  }, [])

  const showOverlay = mounted && phase !== "ready"

  return (
    <>
      {/* SSR dark cover — prevents content flash before JS hydration */}
      {!mounted && (
        <div className="fixed inset-0 z-[9999] bg-[#0a0a0f]" aria-hidden="true" />
      )}

      {/* Neural network background — client only */}
      {mounted && (
        <NeuralCanvas
          className={phase === "ready" ? "opacity-30" : "opacity-50"}
        />
      )}

      {/* Boot/Transition overlay — fixed fullscreen */}
      {showOverlay && (
        <div
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center transition-opacity ease-out",
            phase === "fadeout" ? "opacity-0 duration-800" : "opacity-100 duration-300"
          )}
        >
          <div className="w-full h-full absolute inset-0 z-40 bg-background">
            <CrtMonitor3D
              isPowered={true}
              isZoomingIn={phase === "transition" || phase === "fadeout"}
            >
              <BootSequence onInitialize={handleInitialize} />
            </CrtMonitor3D>
          </div>
        </div>
      )}

      {/* Page content — always in DOM for SSR LCP. Hidden during boot. */}
      <div
        data-boot-wrapper
        className={cn(
          "transition-opacity ease-out",
          phase === "fadeout" ? "opacity-100 duration-800" : "",
          !mounted || phase === "ready" ? "opacity-100 duration-300" : "",
          mounted && phase !== "ready" && phase !== "fadeout" ? "opacity-0 pointer-events-none duration-300" : ""
        )}
      >
        {children}
      </div>
    </>
  )
}
