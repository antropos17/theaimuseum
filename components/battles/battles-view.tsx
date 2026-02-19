"use client"

import { useState } from "react"
import { ChevronRight, Swords } from "lucide-react"
import { companies } from "@/data/models"
import { cn } from "@/lib/utils"

export function BattlesView() {
  const [selected, setSelected] = useState<number | null>(null)
  const maxVal = Math.max(...companies.map((c) => c.valuation))
  const totalVal = companies.reduce((acc, c) => acc + c.valuation, 0)

  return (
    <div className="min-h-screen pt-12">
      <div className="mx-auto max-w-5xl px-4 pb-24 pt-10 lg:px-6">
        {/* Header */}
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Competition
        </p>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          The AI Wars
        </h1>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Five companies. Trillions at stake. Unlimited drama.
        </p>

        {/* Company cards */}
        <div className="mt-10 space-y-3">
          {companies.map((company, i) => {
            const isOpen = selected === i
            const barWidth = Math.max(4, (company.valuation / maxVal) * 100)

            return (
              <button
                key={company.name}
                onClick={() => setSelected(isOpen ? null : i)}
                className="w-full text-left rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${company.color}15` }}
                    >
                      <Swords className="h-4 w-4" style={{ color: company.color }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {company.name}
                      </h3>
                      <p className="font-mono text-[11px] text-muted-foreground">
                        CEO: {company.ceo}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-lg font-semibold tabular-nums text-foreground">
                    ${company.valuation}B
                  </span>
                </div>

                {/* Valuation bar */}
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${barWidth}%`, backgroundColor: company.color }}
                  />
                </div>

                {/* Expanded drama */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    isOpen ? "mt-4 max-h-32 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="border-t border-border pt-4">
                    <p className="text-[13px] leading-relaxed text-foreground/80">
                      <span className="font-medium text-chart-5">Drama:</span>{" "}
                      {company.drama}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
                  <ChevronRight className={cn("h-3 w-3 transition-transform", isOpen && "rotate-90")} />
                  <span>{isOpen ? "Hide details" : "View details"}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Summary card */}
        <div className="mt-12 rounded-xl border border-border bg-card p-6 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            Total Market Value
          </p>
          <p className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground">
            ${new Intl.NumberFormat("en-US").format(totalVal)}B
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            All fighting for the same prize: artificial general intelligence.
          </p>
        </div>
      </div>
    </div>
  )
}
