"use client"

import { useState } from "react"
import { ChevronRight, Skull } from "lucide-react"
import { graveyard } from "@/data/models"
import { cn } from "@/lib/utils"

export function GraveyardView() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div className="min-h-screen pt-12">
      <div className="mx-auto max-w-4xl px-4 pb-24 pt-10 lg:px-6">
        {/* Header */}
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Memorial
        </p>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          AI Graveyard
        </h1>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Where AI projects go to die. Rest in peace.
        </p>

        {/* Tombstones */}
        <div className="mt-10 space-y-3">
          {graveyard.map((item, i) => {
            const isOpen = expanded === i
            return (
              <button
                key={item.name}
                onClick={() => setExpanded(isOpen ? null : i)}
                className="w-full text-left rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-chart-5/20"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-chart-5/10">
                      <Skull className="h-4 w-4 text-chart-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {item.name}
                      </h3>
                      <p className="font-mono text-[11px] text-muted-foreground">
                        {item.years}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full border border-chart-5/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-chart-5">
                    Deceased
                  </span>
                </div>

                <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                  <span className="font-medium text-chart-5">Cause of death:</span>{" "}
                  {item.cause}
                </p>

                {/* Expanded detail */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    isOpen ? "mt-4 max-h-40 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="border-t border-border pt-4">
                    <p className="text-[13px] leading-relaxed text-foreground/80">
                      {item.detail}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
                  <ChevronRight className={cn("h-3 w-3 transition-transform", isOpen && "rotate-90")} />
                  <span>{isOpen ? "Close epitaph" : "Read epitaph"}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Bottom epitaph */}
        <div className="mt-16 flex flex-col items-center text-center">
          <div className="h-px w-12 bg-border" />
          <p className="mt-6 font-serif text-base italic text-muted-foreground">
            {"\"Move fast and break things.\""}
          </p>
          <p className="mt-1.5 text-xs text-muted-foreground">
            They moved fast. Things broke. These are the things.
          </p>
        </div>
      </div>
    </div>
  )
}
