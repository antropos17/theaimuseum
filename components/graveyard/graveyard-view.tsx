"use client"

import { useState } from "react"
import { graveyard } from "@/data/models"
import { cn } from "@/lib/utils"

export function GraveyardView() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-10">
        <span className="data-label">[Memorial]</span>
        <h1 className="mt-3 text-2xl font-light tracking-tight text-foreground sm:text-3xl">AI Graveyard</h1>
        <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
          Where AI projects go to die. Rest in peace.
        </p>

        <div className="mt-8 space-y-2">
          {graveyard.map((item, i) => {
            const isOpen = expanded === i
            return (
              <button
                key={item.name}
                onClick={() => setExpanded(isOpen ? null : i)}
                className="terminal-card-solid w-full p-5 text-left"
                style={{ borderLeftWidth: "2px", borderLeftColor: "var(--chart-5)" }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.name}</p>
                    <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">{item.years}</p>
                  </div>
                  <span className="font-mono text-[10px] text-chart-5">[DECEASED]</span>
                </div>
                <p className="mt-2 text-[13px] text-muted-foreground">
                  <span className="font-mono text-chart-5">Cause:</span> {item.cause}
                </p>
                <div className={cn("overflow-hidden transition-all duration-300", isOpen ? "mt-3 max-h-40 opacity-100" : "max-h-0 opacity-0")}>
                  <div className="border-t border-dashed border-border pt-3">
                    <p className="text-[13px] leading-relaxed text-foreground/80">{item.detail}</p>
                  </div>
                </div>
                <p className="mt-3 font-mono text-[10px] text-muted-foreground">
                  {isOpen ? "[-] Close" : "[+] Read epitaph"}
                </p>
              </button>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="mx-auto h-px w-12 bg-border" />
          <p className="mt-5 text-sm italic text-muted-foreground">
            {'"Move fast and break things."'}
          </p>
          <p className="mt-1 font-mono text-[11px] text-muted-foreground">
            They moved fast. Things broke.
          </p>
        </div>
      </div>
    </div>
  )
}
