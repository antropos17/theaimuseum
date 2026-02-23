"use client"

import { useEffect, useRef } from "react"

interface CRTMonitorProps {
  children: React.ReactNode
  isTransitioning?: boolean
}

export function CRTMonitor({ children, isTransitioning }: CRTMonitorProps) {
  const monitorRef = useRef<HTMLDivElement>(null)

  // Floating animation
  useEffect(() => {
    if (isTransitioning || !monitorRef.current) return

    const el = monitorRef.current
    let frame: number
    let t = 0

    const animate = () => {
      t += 0.015
      const y = Math.sin(t) * 8
      const rx = 2 + Math.sin(t * 0.7) * 0.5
      const ry = Math.sin(t * 0.5) * 1
      el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(${y}px)`
      frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [isTransitioning])

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        ref={monitorRef}
        className={`relative transition-transform ${isTransitioning ? "duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)]" : ""}`}
        style={{
          transform: "perspective(1200px) rotateX(2deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Monitor outer casing */}
        <div
          className="relative rounded-[1.5rem] sm:rounded-[2rem]"
          style={{
            padding: "clamp(16px, 3vw, 36px)",
            background: "linear-gradient(160deg, #1e1e26 0%, #111116 40%, #0d0d12 70%, #15151c 100%)",
            boxShadow: [
              "0 0 0 1px rgba(255,255,255,0.04)",
              "0 0 0 2px rgba(0,0,0,0.4)",
              "0 30px 80px -20px rgba(0,0,0,0.85)",
              "0 0 120px -30px rgba(0,255,136,0.08)",
              "inset 0 1px 0 rgba(255,255,255,0.06)",
              "inset 0 -1px 0 rgba(0,0,0,0.3)",
            ].join(", "),
          }}
        >
          {/* Inner bezel rim */}
          <div
            className="relative rounded-[0.5rem] sm:rounded-[0.75rem] overflow-hidden"
            style={{
              width: "clamp(300px, 65vw, 640px)",
              aspectRatio: "4 / 3",
              background: "#030306",
              boxShadow: [
                "inset 0 3px 15px rgba(0,0,0,0.9)",
                "inset 0 0 60px rgba(0,255,136,0.015)",
                "0 0 50px -15px rgba(0,255,136,0.12)",
              ].join(", "),
            }}
          >
            {/* Screen content */}
            <div className="relative w-full h-full overflow-hidden">
              {children}
            </div>

            {/* Screen glass reflection - convex curvature */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: [
                  "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.04) 0%, transparent 50%)",
                  "radial-gradient(ellipse at 70% 80%, rgba(255,255,255,0.02) 0%, transparent 40%)",
                  "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.3) 100%)",
                ].join(", "),
                borderRadius: "inherit",
              }}
            />

            {/* Scanlines on monitor screen */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.08]"
              style={{
                background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)",
                borderRadius: "inherit",
              }}
            />

            {/* Screen edge glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                borderRadius: "inherit",
                boxShadow: "inset 0 0 30px rgba(0,255,136,0.04)",
              }}
            />
          </div>

          {/* Bottom details bar */}
          <div className="flex items-center justify-between mt-3 px-1">
            {/* Brand */}
            <span
              className="font-mono tracking-[0.25em] uppercase select-none"
              style={{
                fontSize: "clamp(6px, 1vw, 9px)",
                color: "rgba(255,255,255,0.08)",
              }}
            >
              Neural Display Corp.
            </span>

            {/* Power LED */}
            <div className="flex items-center gap-2">
              <span
                className="font-mono tracking-[0.2em] uppercase select-none"
                style={{
                  fontSize: "clamp(6px, 1vw, 8px)",
                  color: "rgba(255,255,255,0.06)",
                }}
              >
                POWER
              </span>
              <div
                className="rounded-full animate-pulse"
                style={{
                  width: "clamp(4px, 0.6vw, 7px)",
                  height: "clamp(4px, 0.6vw, 7px)",
                  background: "#00ff88",
                  boxShadow: "0 0 6px #00ff88, 0 0 15px rgba(0,255,136,0.5), 0 0 30px rgba(0,255,136,0.2)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Monitor stand - neck */}
        <div
          className="mx-auto"
          style={{
            width: "clamp(60px, 10vw, 100px)",
            height: "clamp(12px, 2vw, 22px)",
            background: "linear-gradient(180deg, #111116 0%, #0a0a0f 100%)",
            borderRadius: "0 0 4px 4px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
          }}
        />

        {/* Monitor stand - base */}
        <div
          className="mx-auto"
          style={{
            width: "clamp(100px, 18vw, 180px)",
            height: "clamp(6px, 1vw, 10px)",
            background: "linear-gradient(180deg, #131316 0%, #0c0c10 100%)",
            borderRadius: "0 0 8px 8px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)",
          }}
        />
      </div>
    </div>
  )
}
