"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { predictions } from "@/data/models"
import { cn } from "@/lib/utils"

const statusStyles: Record<string, { border: string; text: string; label: string }> = {
  loading: { border: "border-chart-4/30", text: "text-chart-4", label: "In Progress" },
  ironic: { border: "border-primary/30", text: "text-primary", label: "Ironic" },
  failing: { border: "border-chart-5/30", text: "text-chart-5", label: "Unlikely" },
}

export function PredictionsView() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div className="min-h-screen pt-12">
      <div className="mx-auto max-w-4xl px-4 pb-24 pt-10 lg:px-6">
        {/* Header */}
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Forecasts
        </p>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Predictions
        </h1>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          What the experts said. What actually happened.
        </p>

        <div className="mt-10 space-y-3">
          {predictions.map((pred, i) => {
            const isOpen = expanded === i
            const status = statusStyles[pred.status] ?? statusStyles.loading

            return (
              <button
                key={i}
                onClick={() => setExpanded(isOpen ? null : i)}
                className="w-full text-left rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{pred.who}</p>
                    <p className="mt-1.5 font-serif text-[15px] italic leading-relaxed text-foreground/80">
                      &ldquo;{pred.prediction}&rdquo;
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <span className="font-mono text-xs tabular-nums text-muted-foreground">
                      {pred.year}
                    </span>
                    <span className={cn("rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider", status.border, status.text)}>
                      {status.label}
                    </span>
                  </div>
                </div>

                {/* Confidence bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-muted-foreground">
                      Community confidence
                    </span>
                    <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                      {pred.pct}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${pred.pct}%`,
                        backgroundColor:
                          pred.pct > 50 ? "var(--chart-3)" : pred.pct > 25 ? "var(--chart-4)" : "var(--chart-5)",
                      }}
                    />
                  </div>
                </div>

                {/* Reality check expanded */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    isOpen ? "mt-4 max-h-24 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="border-t border-border pt-4">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      Reality Check
                    </p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-foreground/80">
                      {pred.reality}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
                  <ChevronRight className={cn("h-3 w-3 transition-transform", isOpen && "rotate-90")} />
                  <span>{isOpen ? "Hide" : "Reality check"}</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
