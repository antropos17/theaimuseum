"use client"

import { useEffect } from "react"

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
]

export function useKonamiCode() {
  useEffect(() => {
    let sequence: string[] = []
    let timeoutId: NodeJS.Timeout

    const handleKeyDown = (e: KeyboardEvent) => {
      // Используем e.code для независимости от раскладки (русская/английская) и CapsLock
      sequence.push(e.code)
      if (sequence.length > KONAMI_CODE.length) {
        sequence.shift()
      }

      if (sequence.join(",") === KONAMI_CODE.join(",")) {
        console.log("ACCESS GRANTED: WING 13 — CONSPIRACY")
        
        // Очищаем последовательность после успеха
        sequence = []

        document.body.classList.add("agi-mode")
        document.documentElement.style.setProperty("--primary", "#ff0044")

        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          document.body.classList.remove("agi-mode")
          document.documentElement.style.removeProperty("--primary")
        }, 10000)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      clearTimeout(timeoutId)
      // На всякий случай очищаем эффекты при анмаунте
      document.body.classList.remove("agi-mode")
      document.documentElement.style.removeProperty("--primary")
    }
  }, [])
}

export function KonamiListener() {
  useKonamiCode()
  return null
}
