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
        <span className="data-label">[Forecasts]</span>
        <h1 className="mt-3 text-2xl font-light tracking-tight text-foreground sm:text-3xl">Predictions</h1>
        <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
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
                className="terminal-card-solid w-full p-5 text-left"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{pred.who}</p>
                    <p className="mt-1 text-[13px] italic leading-relaxed text-foreground/80">
                      {'"'}{pred.prediction}{'"'}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className="font-mono text-xs tabular-nums text-muted-foreground">{pred.year}</span>
                    <span className={cn("font-mono text-[10px]", status.color)}>[{status.text}]</span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between">
                    <span className="data-label">Confidence</span>
                    <span className="font-mono text-[10px] tabular-nums text-muted-foreground">{pred.pct}%</span>
                  </div>
                  <div className="mt-1.5 metric-bar">
                    <div
                      className="metric-bar-fill"
                      style={{
                        width: `${pred.pct}%`,
                        backgroundColor: pred.pct > 50 ? "var(--chart-3)" : pred.pct > 25 ? "var(--chart-4)" : "var(--chart-5)",
                      }}
                    />
                  </div>
                </div>

                <div className={cn("overflow-hidden transition-all duration-300", isOpen ? "mt-3 max-h-32 opacity-100" : "max-h-0 opacity-0")}>
                  <div className="border-t border-dashed border-border pt-3">
                    <p className="data-label">Reality Check:</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-foreground/80">{pred.reality}</p>
                  </div>
                </div>
                <p className="mt-3 font-mono text-[10px] text-muted-foreground">
                  {isOpen ? "[-] Hide" : "[+] Reality check"}
                </p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
