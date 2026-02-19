"use client"

import { useState } from "react"
import { toast } from "sonner"

export function NewsletterSection() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      toast.success("Thanks for subscribing! (Coming in Phase 2)")
      setEmail("")
    }
  }

  return (
    <section className="mx-auto max-w-lg px-4 py-16">
      <div className="glass rounded-xl p-8 text-center">
        <h3 className="font-serif text-xl font-bold text-foreground">
          AI history is being written right now.
        </h3>
        <p className="mt-2 font-sans text-sm text-muted-foreground">
          Every breakthrough, every scandal &mdash; from 1950 to today.
        </p>

        <form onSubmit={handleSubscribe} className="mt-6 flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 rounded-lg border border-border bg-background/50 px-4 py-2.5 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
          />
          <button
            type="submit"
            className="rounded-lg bg-primary px-5 py-2.5 font-sans text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Subscribe
          </button>
        </form>

        <p className="mt-3 font-mono text-[11px] text-muted-foreground">
          Join 0 subscribers
        </p>
      </div>
    </section>
  )
}
