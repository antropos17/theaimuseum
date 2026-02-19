"use client"

import { useState } from "react"
import { predictions } from "@/data/models"
import { cn } from "@/lib/utils"

const statusLabels: Record<string, { text: string; color: string }> = {
  loading: { text: "IN PROGRESS", color: "text-chart-4" },
  ironic: { text: "IRONIC", color: "text-primary" },
  failing: { text: "UNLIKELY", color: "text-chart-5" },
}

export function PredictionsView() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-10">
        <p className="mb-2 text-[8px] uppercase tracking-[0.3em] text-muted-foreground">{'>'} Forecasts</p>
        <h1 className="text-lg text-primary sm:text-xl">PREDICTIONS</h1>
        <p className="mt-2 text-[8px] leading-relaxed text-muted-foreground">
          What the experts said. What actually happened.
        </p>

        <div className="mt-8 space-y-2">
          {predictions.map((pred, i) => {
            const isOpen = expanded === i
            const status = statusLabels[pred.status] ?? statusLabels.loading

            return (
              <button
                key={i}
                onClick={() => setExpanded(isOpen ? null : i)}
                className="pixel-border w-full bg-card p-4 text-left transition-colors hover:border-primary"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-[9px] text-foreground">{pred.who}</p>
                    <p className="mt-1 text-[7px] italic leading-[2] text-foreground/80">
                      {'"'}{pred.prediction}{'"'}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className="text-[7px] tabular-nums text-muted-foreground">{pred.year}</span>
                    <span className={cn("text-[6px]", status.color)}>[{status.text}]</span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[6px] text-muted-foreground">CONFIDENCE</span>
                    <span className="text-[6px] tabular-nums text-muted-foreground">{pred.pct}%</span>
                  </div>
                  <div className="mt-1 h-[6px] w-full bg-muted">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${pred.pct}%`,
                        backgroundColor: pred.pct > 50 ? "var(--chart-3)" : pred.pct > 25 ? "var(--chart-4)" : "var(--chart-5)",
                      }}
                    />
                  </div>
                </div>

                <div className={cn("overflow-hidden transition-all duration-200", isOpen ? "mt-3 max-h-24 opacity-100" : "max-h-0 opacity-0")}>
                  <div className="border-t-2 border-dashed border-border pt-3">
                    <p className="text-[6px] text-muted-foreground">REALITY CHECK:</p>
                    <p className="mt-1 text-[7px] leading-[2] text-foreground/80">{pred.reality}</p>
                  </div>
                </div>
                <p className="mt-2 text-[6px] text-muted-foreground">
                  {isOpen ? "[-] HIDE" : "[+] REALITY CHECK"}
                </p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
