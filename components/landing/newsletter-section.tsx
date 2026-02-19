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
      toast.success("SUBSCRIBED! WELCOME PLAYER.")
      setTimeout(() => {
        setEmail("")
        setSubmitted(false)
      }, 3000)
    }
  }

  return (
    <section
      ref={ref}
      className={`relative z-10 mx-auto max-w-5xl px-4 py-16 transition-opacity duration-200 ${isInView ? "opacity-100" : "opacity-0"}`}
      style={{ transitionTimingFunction: "steps(4)" }}
    >
      <div className="pixel-border bg-card p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Left */}
          <div>
            <h3 className="text-[10px] text-foreground">
              AI HISTORY IS BEING WRITTEN NOW.
            </h3>
            <p className="mt-3 text-[7px] leading-[2] text-muted-foreground">
              EVERY BREAKTHROUGH, EVERY SCANDAL -- DELIVERED TO YOUR INBOX.
            </p>
          </div>

          {/* Right form */}
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="YOUR@EMAIL.COM"
              className="w-full min-w-0 border-2 border-border bg-background px-3 py-2.5 text-[7px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none sm:w-56"
              required
            />
            <button
              type="submit"
              className="pixel-btn-gold shrink-0 bg-primary px-4 py-2.5 text-[7px] text-primary-foreground"
            >
              {submitted ? "OK!" : "> GO"}
            </button>
          </form>
        </div>
        <p className="mt-4 text-[6px] text-muted-foreground">
          NO SPAM. UNSUBSCRIBE ANYTIME. FREE FOREVER.
        </p>
      </div>
    </section>
  )
}
