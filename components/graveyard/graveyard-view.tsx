"use client"

import { useState } from "react"
import { graveyard } from "@/data/models"
import { cn } from "@/lib/utils"

export function GraveyardView() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-10">
        <p className="mb-2 text-[8px] uppercase tracking-[0.3em] text-muted-foreground">{'>'} Memorial</p>
        <h1 className="text-lg text-primary sm:text-xl">AI GRAVEYARD</h1>
        <p className="mt-2 text-[8px] leading-relaxed text-muted-foreground">
          Where AI projects go to die. Rest in peace.
        </p>

        <div className="mt-8 space-y-2">
          {graveyard.map((item, i) => {
            const isOpen = expanded === i
            return (
              <button
                key={item.name}
                onClick={() => setExpanded(isOpen ? null : i)}
                className="pixel-border w-full bg-card p-4 text-left transition-colors hover:border-chart-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-chart-5">+</span>
                    <div>
                      <p className="text-[9px] text-foreground">{item.name}</p>
                      <p className="text-[7px] text-muted-foreground">{item.years}</p>
                    </div>
                  </div>
                  <span className="text-[6px] text-chart-5">[DECEASED]</span>
                </div>
                <p className="mt-2 text-[7px] text-muted-foreground">
                  <span className="text-chart-5">CAUSE:</span> {item.cause}
                </p>
                <div className={cn("overflow-hidden transition-all duration-200", isOpen ? "mt-3 max-h-40 opacity-100" : "max-h-0 opacity-0")}>
                  <div className="border-t-2 border-dashed border-border pt-3">
                    <p className="text-[7px] leading-[2] text-foreground/80">{item.detail}</p>
                  </div>
                </div>
                <p className="mt-2 text-[6px] text-muted-foreground">
                  {isOpen ? "[-] CLOSE" : "[+] READ EPITAPH"}
                </p>
              </button>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="mx-auto h-[2px] w-8 bg-border" />
          <p className="mt-4 text-[8px] italic text-muted-foreground">
            {'"Move fast and break things."'}
          </p>
          <p className="mt-1 text-[6px] text-muted-foreground">
            They moved fast. Things broke.
          </p>
        </div>
      </div>
    </div>
  )
}
