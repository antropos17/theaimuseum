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
        <p className="mb-2 text-[8px] uppercase tracking-[0.3em] text-muted-foreground">{'>'} Competition</p>
        <h1 className="text-lg text-primary sm:text-xl">THE AI WARS</h1>
        <p className="mt-2 text-[8px] leading-relaxed text-muted-foreground">
          Five companies. Trillions at stake.
        </p>

        <div className="mt-8 space-y-2">
          {companies.map((company, i) => {
            const isOpen = selected === i
            const barWidth = Math.max(4, (company.valuation / maxVal) * 100)
            return (
              <button
                key={company.name}
                onClick={() => setSelected(isOpen ? null : i)}
                className="pixel-border w-full bg-card p-4 text-left transition-colors hover:border-primary"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2" style={{ backgroundColor: company.color }} />
                    <div>
                      <p className="text-[9px] text-foreground">{company.name}</p>
                      <p className="text-[7px] text-muted-foreground">CEO: {company.ceo}</p>
                    </div>
                  </div>
                  <span className="text-[10px] tabular-nums text-foreground">${company.valuation}B</span>
                </div>
                <div className="mt-3 h-[6px] w-full bg-muted">
                  <div className="h-full transition-all duration-500" style={{ width: `${barWidth}%`, backgroundColor: company.color }} />
                </div>
                <div className={cn("overflow-hidden transition-all duration-200", isOpen ? "mt-3 max-h-32 opacity-100" : "max-h-0 opacity-0")}>
                  <div className="border-t-2 border-dashed border-border pt-3">
                    <p className="text-[7px] text-chart-5">DRAMA:</p>
                    <p className="mt-1 text-[7px] leading-[2] text-foreground/80">{company.drama}</p>
                  </div>
                </div>
                <p className="mt-2 text-[6px] text-muted-foreground">
                  {isOpen ? "[-] HIDE" : "[+] DETAILS"}
                </p>
              </button>
            )
          })}
        </div>

        <div className="mt-10 pixel-border bg-card p-6 text-center">
          <p className="text-[7px] text-muted-foreground">TOTAL MARKET VALUE</p>
          <p className="mt-2 text-xl text-primary">${new Intl.NumberFormat("en-US").format(totalVal)}B</p>
          <p className="mt-2 text-[7px] text-muted-foreground">
            All fighting for AGI.
          </p>
        </div>
      </div>
    </div>
  )
}
