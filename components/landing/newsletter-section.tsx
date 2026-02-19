"use client"

import { useState } from "react"
import { toast } from "sonner"
import { useInView } from "@/hooks/use-in-view"

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
      <div className="terminal-card-solid p-8 sm:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-light tracking-tight text-foreground">
              AI history is being written now.
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
              Every breakthrough, every scandal &mdash; delivered to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full min-w-0 border border-border bg-background px-4 py-2.5 font-mono text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none sm:w-56"
              required
            />
            <button
              type="submit"
              className="glass-btn-primary shrink-0 px-5 py-2.5 text-foreground"
            >
              {submitted ? "Done" : "Subscribe"}
            </button>
          </form>
        </div>
        <p className="mt-4 font-mono text-[10px] text-muted-foreground">
          No spam. Unsubscribe anytime. Free forever.
        </p>
      </div>
    </section>
  )
}
