"use client"

import { useState } from "react"
import { graveyard } from "@/data/models"
import { cn } from "@/lib/utils"

export function GraveyardView() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-4xl px-4 pb-24">
        <div className="flex items-center gap-3">
          <span className="text-3xl" aria-hidden="true">RIP</span>
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              AI Graveyard
            </h1>
            <p className="mt-1 font-sans text-sm text-muted-foreground">
              Where AI projects go to die. Rest in peace.
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-4">
          {graveyard.map((item, i) => {
            const isOpen = expanded === i
            return (
              <button
                key={item.name}
                onClick={() => setExpanded(isOpen ? null : i)}
                className={cn(
                  "w-full text-left glass rounded-xl p-6 transition-all duration-300",
                  isOpen && "glass-hover"
                )}
              >
                {/* Tombstone header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: item.color, opacity: 0.4 }}
                      />
                      <h3 className="font-serif text-lg font-bold text-foreground">
                        {item.name}
                      </h3>
                    </div>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      {item.years}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-lg bg-destructive/10 px-3 py-1.5 font-mono text-[11px] text-destructive">
                    DECEASED
                  </span>
                </div>

                {/* Cause of death */}
                <p className="mt-3 font-sans text-sm text-muted-foreground">
                  <span className="font-semibold text-destructive/80">Cause of death:</span>{" "}
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
                    <p className="font-sans text-sm leading-relaxed text-foreground/80">
                      {item.detail}
                    </p>
                  </div>
                </div>

                {/* Click hint */}
                <div className="mt-3 flex items-center gap-1.5">
                  <span
                    className={cn(
                      "font-mono text-[10px] text-muted-foreground transition-transform",
                      isOpen && "rotate-90"
                    )}
                  >
                    {">"}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {isOpen ? "Close epitaph" : "Read epitaph"}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Epitaph */}
        <div className="mt-16 flex flex-col items-center text-center">
          <div className="h-px w-16 bg-border" />
          <p className="mt-6 font-serif text-lg italic text-muted-foreground">
            {"\"Move fast and break things.\""}
          </p>
          <p className="mt-2 font-sans text-xs text-muted-foreground">
            They moved fast. Things broke. These are the things.
          </p>
        </div>
      </div>
    </div>
  )
}
