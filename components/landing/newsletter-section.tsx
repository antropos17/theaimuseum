"use client"

import { useState } from "react"
import { toast } from "sonner"
import { ArrowRight } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      toast.success("Thanks for subscribing!")
      setEmail("")
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="flex flex-col items-start justify-between gap-8 rounded-xl border border-border bg-card p-8 sm:flex-row sm:items-center sm:p-10">
        {/* Left text */}
        <div className="max-w-md">
          <h3 className="font-serif text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            AI history is being written right now.
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Every breakthrough, every scandal &mdash; delivered to your inbox.
          </p>
        </div>

        {/* Right form */}
        <div className="w-full sm:w-auto">
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full min-w-0 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 sm:w-64"
              required
            />
            <button
              type="submit"
              className="flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
            >
              Subscribe
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
          <p className="mt-2.5 font-mono text-[10px] text-muted-foreground">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  )
}
