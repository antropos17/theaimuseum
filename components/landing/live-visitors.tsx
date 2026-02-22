'use client'

import { useState, useEffect } from 'react'
import { Zap } from 'lucide-react'

export function LiveVisitors() {
  const [count, setCount] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setCount(Math.floor(Math.random() * (48 - 12 + 1)) + 12)

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev === null) return null
        const delta = Math.floor(Math.random() * 3) + 1
        const direction = Math.random() > 0.5 ? 1 : -1
        const next = prev + delta * direction
        return Math.max(12, Math.min(48, next))
      })
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted || count === null) {
    return (
      <div className="flex items-center gap-1.5">
        <Zap
          size={10}
          strokeWidth={1.5}
          className="text-[#00ff88] animate-[opacityPulse_2s_ease-in-out_infinite]"
        />
        <span className="font-mono text-[10px] text-muted-foreground">
          [—] minds exploring right now
        </span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1.5">
      <Zap
        size={10}
        strokeWidth={1.5}
        className="text-[#00ff88] animate-[opacityPulse_2s_ease-in-out_infinite]"
      />
      <span className="font-mono text-[10px] text-muted-foreground">
        [{count}] minds exploring right now
      </span>
    </div>
  )
}
