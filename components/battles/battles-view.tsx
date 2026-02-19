"use client"

import { useState } from "react"
import { companies } from "@/data/models"
import { cn } from "@/lib/utils"

export function BattlesView() {
  const [selected, setSelected] = useState<number | null>(null)
  const maxVal = Math.max(...companies.map((c) => c.valuation))
  const totalVal = companies.reduce((acc, c) => acc + c.valuation, 0)

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-4xl px-4 pb-24 pt-10">
        <span className="data-label">[Competition]</span>
        <h1 className="mt-3 text-2xl font-light tracking-tight text-foreground sm:text-3xl">The AI Wars</h1>
        <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
          Five companies. Trillions at stake. The race for artificial general intelligence.
        </p>

        <div className="mt-8 space-y-2">
          {companies.map((company, i) => {
            const isOpen = selected === i
            const barWidth = Math.max(4, (company.valuation / maxVal) * 100)
            return (
              <button
                key={company.name}
                onClick={() => setSelected(isOpen ? null : i)}
                className="terminal-card-solid w-full p-5 text-left"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: company.color }} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{company.name}</p>
                      <p className="font-mono text-[11px] text-muted-foreground">CEO: {company.ceo}</p>
                    </div>
                  </div>
                  <span className="font-mono text-lg tabular-nums text-foreground">${company.valuation}B</span>
                </div>
                <div className="mt-3 metric-bar">
                  <div className="metric-bar-fill" style={{ width: `${barWidth}%`, backgroundColor: company.color }} />
                </div>
                <div className={cn("overflow-hidden transition-all duration-300", isOpen ? "mt-4 max-h-40 opacity-100" : "max-h-0 opacity-0")}>
                  <div className="border-t border-dashed border-border pt-4">
                    <p className="data-label">Drama:</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-foreground/80">{company.drama}</p>
                  </div>
                </div>
                <p className="mt-3 font-mono text-[10px] text-muted-foreground">
                  {isOpen ? "[-] Hide details" : "[+] Show details"}
                </p>
              </button>
            )
          })}
        </div>

        <div className="mt-12 terminal-card-solid p-8 text-center">
          <p className="data-label">Total Market Value</p>
          <p className="mt-3 font-mono text-3xl font-light tabular-nums text-primary text-glow-subtle">
            ${new Intl.NumberFormat("en-US").format(totalVal)}B
          </p>
          <p className="mt-2 text-[13px] text-muted-foreground">
            All fighting for AGI.
          </p>
        </div>
      </div>
    </div>
  )
}
