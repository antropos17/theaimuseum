"use client"

import { memes } from "@/data/models"

export function MemesView() {
  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-4xl px-4 pb-24">
        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
          AI Meme Hall of Fame
        </h1>
        <p className="mt-2 font-sans text-sm text-muted-foreground">
          The funniest, most embarrassing, and most iconic moments in AI history.
        </p>

        <div className="relative mt-10">
          {/* Vertical timeline line */}
          <div className="absolute left-6 top-0 h-full w-px bg-border md:left-1/2" />

          <div className="space-y-8">
            {memes.map((meme, i) => {
              const isLeft = i % 2 === 0
              return (
                <div
                  key={i}
                  className={`relative flex items-start gap-4 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 z-10 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-card border border-border md:left-1/2">
                    <span className="text-xs">{meme.emoji}</span>
                  </div>

                  {/* Card */}
                  <div
                    className={`ml-12 w-full glass rounded-xl p-5 md:ml-0 md:w-[calc(50%-2rem)] ${
                      isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs text-primary">{meme.year}</span>
                      <span className="rounded-md bg-primary/8 px-2 py-0.5 font-mono text-[10px] text-primary">
                        #{meme.tag}
                      </span>
                    </div>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-foreground">
                      {meme.text}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom quote */}
        <div className="mt-16 text-center">
          <p className="font-serif text-lg italic text-muted-foreground">
            {"\"Any sufficiently advanced bug is indistinguishable from a feature.\""}
          </p>
        </div>
      </div>
    </div>
  )
}
