"use client"

import { useState } from "react"
import { toast } from "sonner"
import { useInView } from "@/hooks/use-in-view"
import { CopyableTerminalCard } from "@/components/ui/copyable-terminal-card"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const { ref, isInView } = useInView()

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      toast.success("Subscribed! Welcome to the archive.")
      setTimeout(() => {
        setEmail("")
        setSubmitted(false)
      }, 3000)
    }
  }

  return (
    <section
      ref={ref}
      className={`relative z-10 mx-auto max-w-5xl px-4 py-16 fade-in-up ${isInView ? "visible" : ""}`}
    >
      <CopyableTerminalCard className="overflow-hidden">
        {/* Terminal chrome */}
        <div className="flex items-center gap-2 border-b border-border px-4 py-2">
          <div className="flex gap-1.5">
            <div className="h-2 w-2 rounded-full bg-chart-5/60" />
            <div className="h-2 w-2 rounded-full bg-chart-2/60" />
            <div className="h-2 w-2 rounded-full bg-chart-3/60" />
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">newsletter.exe</span>
        </div>

        <div className="p-8 sm:p-10">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">[Subscribe]</p>

          <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-lg font-light tracking-tight text-foreground">
                Get the AI History Brief
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                One email per week. 75 years of AI breakthroughs, decoded for humans.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex shrink-0">
              <div className="flex items-center border border-dashed border-border bg-background transition-colors focus-within:border-primary">
                <span className="px-3 font-mono text-[11px] text-primary">{'>'}</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full min-w-0 bg-transparent py-2.5 pr-2 font-mono text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none sm:w-48"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitted}
                className="border border-l-0 border-primary bg-primary/10 px-4 py-2.5 font-mono text-[11px] text-primary transition-colors hover:bg-primary/20 disabled:opacity-50"
              >
                {submitted ? "[OK]" : "[SEND]"}
              </button>
            </form>
          </div>

          <p className="mt-4 font-mono text-[10px] text-muted-foreground/50">
            No spam. Unsubscribe anytime. Free forever.
          </p>

          <div className="mt-8 border-t border-border/20 pt-6">
            <p className="mb-2 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
              As seen on
            </p>
            <div className="flex items-center justify-center gap-6">
              <span className="font-mono text-[11px] text-muted-foreground/30 transition-colors hover:text-primary/50">
                Product Hunt
              </span>
              <span className="font-mono text-[11px] text-muted-foreground/30 transition-colors hover:text-primary/50">
                Hacker News
              </span>
              <span className="font-mono text-[11px] text-muted-foreground/30 transition-colors hover:text-primary/50">
                Reddit
              </span>
              <span className="font-mono text-[11px] text-muted-foreground/30 transition-colors hover:text-primary/50">
                dev.to
              </span>
              <span className="font-mono text-[11px] text-muted-foreground/30 transition-colors hover:text-primary/50">
                GitHub
              </span>
            </div>
          </div>
        </div>
      </CopyableTerminalCard>
    </section>
  )
}
