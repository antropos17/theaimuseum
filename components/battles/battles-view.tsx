"use client"

import { useState } from "react"
import { companies } from "@/data/models"
import { cn } from "@/lib/utils"

export function BattlesView() {
  const [selected, setSelected] = useState<number | null>(null)
  const maxVal = Math.max(...companies.map((c) => c.valuation))

  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-5xl px-4 pb-24">
        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
          The AI Wars
        </h1>
        <p className="mt-2 font-sans text-sm text-muted-foreground">
          Five companies. Trillions at stake. Unlimited drama.
        </p>

        {/* Valuation chart */}
        <div className="mt-10 space-y-4">
          {companies.map((company, i) => {
            const isOpen = selected === i
            const barWidth = Math.max(4, (company.valuation / maxVal) * 100)

            return (
              <button
                key={company.name}
                onClick={() => setSelected(isOpen ? null : i)}
                className={cn(
                  "w-full text-left glass rounded-xl p-6 transition-all duration-300",
                  isOpen && "glass-hover"
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-4 w-4 rounded-full"
                      style={{ backgroundColor: company.color }}
                    />
                    <h3 className="font-sans text-base font-bold text-foreground">
                      {company.name}
                    </h3>
                  </div>
                  <span className="font-mono text-sm text-foreground">
                    ${company.valuation}B
                  </span>
                </div>

                {/* Bar */}
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${barWidth}%`,
                      backgroundColor: company.color,
                    }}
                  />
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-muted-foreground">
                    CEO: {company.ceo}
                  </span>
                </div>

                {/* Expanded drama */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    isOpen ? "mt-4 max-h-32 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="border-t border-border pt-4">
                    <p className="font-sans text-sm font-semibold text-destructive/80">
                      Drama:
                    </p>
                    <p className="mt-1 font-sans text-sm leading-relaxed text-foreground/80">
                      {company.drama}
                    </p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Summary */}
        <div className="mt-12 glass rounded-xl p-6 text-center">
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-wide">
            Total Market Value Represented
          </p>
          <p className="mt-2 font-serif text-3xl font-bold text-foreground">
            ${companies.reduce((acc, c) => acc + c.valuation, 0).toLocaleString()}B
          </p>
          <p className="mt-2 font-sans text-xs text-muted-foreground">
            All fighting for the same prize: artificial general intelligence.
          </p>
        </div>
      </div>
    </div>
  )
}
