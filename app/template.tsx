"use client"

import { useState, useEffect } from "react"
import { ChannelSwitch } from "@/components/effects/channel-switch"

export default function Template({ children }: { children: React.ReactNode }) {
  const [isSwitching, setIsSwitching] = useState(true)

  useEffect(() => {
    if (isSwitching) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isSwitching])

  return (
    <>
      {isSwitching && <ChannelSwitch onComplete={() => setIsSwitching(false)} durationMs={400} />}
      <div className={`transition-opacity duration-300 ${isSwitching ? "opacity-0" : "opacity-100"}`}>
        {children}
      </div>
    </>
  )
}