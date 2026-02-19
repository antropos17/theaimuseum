"use client"

import { useInView } from "@/hooks/use-in-view"
import { Heart } from "lucide-react"

export function DonationSection() {
  const { ref, isInView } = useInView(0.2)

  return (
    <section
      ref={ref}
      className={`relative z-10 mx-auto max-w-5xl px-4 pb-16 pt-4 fade-in-up ${isInView ? "visible" : ""}`}
    >
      <div className="terminal-card-solid overflow-hidden">
        {/* Terminal chrome */}
        <div className="flex items-center gap-2 border-b border-border px-4 py-2">
          <div className="flex gap-1.5">
            <div className="h-2 w-2 rounded-full bg-chart-5/60" />
            <div className="h-2 w-2 rounded-full bg-chart-2/60" />
            <div className="h-2 w-2 rounded-full bg-chart-3/60" />
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">support.exe</span>
        </div>

        <div className="flex flex-col items-center gap-6 p-8 text-center sm:flex-row sm:gap-8 sm:p-10 sm:text-left">
          {/* Icon */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-dashed border-primary/30 bg-primary/5">
            <Heart size={22} className="text-primary" />
          </div>

          {/* Copy */}
          <div className="flex-1">
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary">[Support the Museum]</p>
            <h3 className="mt-2 text-lg font-light tracking-tight text-foreground">
              Help keep the exhibits running.
            </h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
              This museum is free, open-source, and powered entirely by caffeine and curiosity.
              Every contribution helps us document AI history for everyone.
            </p>
          </div>

          {/* Button */}
          <a
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn-primary shrink-0 px-8 py-3.5 font-mono text-xs text-foreground transition-all hover:scale-[1.02]"
          >
            {'>'} Buy us a coffee
          </a>
        </div>
      </div>
    </section>
  )
}
