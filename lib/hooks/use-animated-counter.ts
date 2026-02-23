'use client'

import { useEffect, useRef, useState } from 'react'

interface UseAnimatedCounterOptions {
  /** The final value to animate toward. */
  target: number
  /** Animation duration in milliseconds. Defaults to 1400. */
  duration?: number
  /** When true the animation begins. Ignored once the animation has already run. */
  active: boolean
  /** The value to start animating from. Defaults to 0. */
  start?: number
}

/**
 * Animates a number from `start` to `target` using a cubic ease-out curve
 * driven by requestAnimationFrame. The animation runs at most once — a ref
 * guards against re-triggering even if `active` toggles back to true.
 *
 * @returns The current interpolated value (integer, rounded).
 */
export function useAnimatedCounter({
  target,
  duration = 1400,
  active,
  start = 0,
}: UseAnimatedCounterOptions): number {
  const [value, setValue] = useState(start)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!active || hasRun.current) return

    hasRun.current = true
    const t0 = performance.now()

    const step = (now: number) => {
      const t = Math.min((now - t0) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 3) // cubic ease-out
      setValue(Math.round(start + ease * (target - start)))
      if (t < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [active, target, duration, start])

  return value
}
