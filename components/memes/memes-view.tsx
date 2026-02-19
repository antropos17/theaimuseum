"use client"

import { memes } from "@/data/models"

export function MemesView() {
  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-10">
        <p className="mb-2 text-[8px] uppercase tracking-[0.3em] text-muted-foreground">{'>'} Hall of Fame</p>
        <h1 className="text-lg text-primary sm:text-xl">AI MEME TIMELINE</h1>
        <p className="mt-2 text-[8px] leading-relaxed text-muted-foreground">
          The funniest and most iconic moments in AI history.
        </p>

        <div className="relative mt-8">
          {/* Pixel spine */}
          <div className="absolute left-0.5 top-0 hidden h-full w-[2px] bg-border md:block" />

          <div className="space-y-2">
            {memes.map((meme, i) => (
              <div key={i} className="relative md:pl-6">
                <div className="absolute left-0 top-3 hidden h-[4px] w-[4px] bg-primary md:block" />
                <div className="pixel-border bg-card p-4 transition-colors hover:border-primary">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[8px] tabular-nums text-primary">{meme.year}</span>
                    <span className="text-[6px] text-muted-foreground">#{meme.tag}</span>
                  </div>
                  <p className="mt-2 text-[7px] leading-[2] text-foreground">{meme.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="mx-auto h-[2px] w-8 bg-border" />
          <p className="mt-4 text-[8px] italic text-muted-foreground">
            {'"Any sufficiently advanced bug is indistinguishable from a feature."'}
          </p>
        </div>
      </div>
    </div>
  )
}
