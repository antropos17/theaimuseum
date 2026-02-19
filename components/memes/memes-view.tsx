"use client"

import { memes } from "@/data/models"

export function MemesView() {
  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-10">
        <span className="data-label">[Hall of Fame]</span>
        <h1 className="mt-3 text-2xl font-light tracking-tight text-foreground sm:text-3xl">AI Meme Timeline</h1>
        <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
          The funniest and most iconic moments in AI history.
        </p>

        <div className="relative mt-8">
          {/* Timeline spine */}
          <div className="absolute left-[3px] top-0 hidden h-full w-px bg-border md:block" />

          <div className="space-y-2">
            {memes.map((meme, i) => (
              <div key={i} className="relative md:pl-8">
                <div className="absolute left-0 top-4 hidden h-[7px] w-[7px] rounded-full border border-primary bg-primary/20 md:block" />
                <div className="terminal-card-solid p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-sm tabular-nums text-primary text-glow-subtle">{meme.year}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">#{meme.tag}</span>
                  </div>
                  <p className="mt-2 text-[14px] leading-relaxed text-foreground">{meme.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="mx-auto h-px w-12 bg-border" />
          <p className="mt-5 text-sm italic text-muted-foreground">
            {'"Any sufficiently advanced bug is indistinguishable from a feature."'}
          </p>
        </div>
      </div>
    </div>
  )
}
