"use client"

import { Hash } from "lucide-react"
import { memes } from "@/data/models"

export function MemesView() {
  return (
    <div className="min-h-screen pt-12">
      <div className="mx-auto max-w-4xl px-4 pb-24 pt-10 lg:px-6">
        {/* Header */}
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Hall of Fame
        </p>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          AI Meme Timeline
        </h1>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          The funniest, most embarrassing, and most iconic moments in AI history.
        </p>

        {/* Timeline */}
        <div className="relative mt-10">
          {/* Spine */}
          <div className="absolute left-3 top-0 hidden h-full w-px bg-border md:left-5 md:block" aria-hidden="true" />

          <div className="space-y-4">
            {memes.map((meme, i) => (
              <div key={i} className="relative flex items-start gap-4 md:pl-14">
                {/* Dot on spine */}
                <div className="absolute left-[9px] top-5 hidden h-2 w-2 rounded-full bg-primary md:left-[17px] md:block" aria-hidden="true" />

                <div className="w-full rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/20">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs tabular-nums text-primary">{meme.year}</span>
                    <span className="flex items-center gap-1 rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                      <Hash className="h-2.5 w-2.5" />
                      {meme.tag}
                    </span>
                  </div>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-foreground">
                    {meme.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <div className="mt-16 flex flex-col items-center text-center">
          <div className="h-px w-12 bg-border" />
          <p className="mt-6 font-serif text-base italic text-muted-foreground">
            {"\"Any sufficiently advanced bug is indistinguishable from a feature.\""}
          </p>
        </div>
      </div>
    </div>
  )
}
