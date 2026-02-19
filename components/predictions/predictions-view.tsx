"use client"

import { useState } from "react"
import { predictions } from "@/data/models"
import { cn } from "@/lib/utils"

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  loading: { bg: "bg-[var(--museum-warning)]/10", text: "text-[var(--museum-warning)]", label: "In Progress" },
  ironic: { bg: "bg-primary/10", text: "text-primary", label: "Ironic" },
  failing: { bg: "bg-destructive/10", text: "text-destructive", label: "Unlikely" },
}

export function PredictionsView() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-4xl px-4 pb-24">
        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
          Predictions
        </h1>
        <p className="mt-2 font-sans text-sm text-muted-foreground">
          What the experts said. What actually happened.
        </p>

        <div className="mt-10 space-y-4">
          {predictions.map((pred, i) => {
            const isOpen = expanded === i
            const status = statusColors[pred.status] ?? statusColors.loading

            return (
              <button
                key={i}
                onClick={() => setExpanded(isOpen ? null : i)}
                className={cn(
                  "w-full text-left glass rounded-xl p-6 transition-all duration-300",
                  isOpen && "glass-hover"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-sans text-sm font-bold text-foreground">
                      {pred.who}
                    </p>
                    <p className="mt-1 font-serif text-base italic text-foreground/80">
                      &ldquo;{pred.prediction}&rdquo;
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <span className="font-mono text-xs text-muted-foreground">
                      {pred.year}
                    </span>
                    <span className={cn("rounded-lg px-2.5 py-1 font-mono text-[11px]", status.bg, status.text)}>
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
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {pred.pct}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${pred.pct}%`,
                        backgroundColor:
                          pred.pct > 50
                            ? "var(--museum-success)"
                            : pred.pct > 25
                            ? "var(--museum-warning)"
                            : "var(--museum-danger)",
                      }}
                    />
                  </div>
                </div>

                {/* Expanded: reality */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    isOpen ? "mt-4 max-h-24 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="border-t border-border pt-4">
                    <p className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Reality Check
                    </p>
                    <p className="mt-1 font-sans text-sm leading-relaxed text-foreground/80">
                      {pred.reality}
                    </p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
