"use client"

import { useState, useEffect } from "react"
import { VirusScanLoader } from "@/components/virus-scan-loader"

export default function Template({ children }: { children: React.ReactNode }) {
  const [isScanning, setIsScanning] = useState(true)

  useEffect(() => {
    if (isScanning) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isScanning])

  return (
    <>
      {isScanning && <VirusScanLoader onComplete={() => setIsScanning(false)} speed={2} />}
      <div className={`transition-opacity duration-700 ${isScanning ? "opacity-0" : "opacity-100"}`}>
        {children}
      </div>
    </>
  )
}