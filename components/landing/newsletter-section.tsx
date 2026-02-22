'use client'

import { useState } from 'react'
import { Check, Download } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'
import { CopyableTerminalCard } from '@/components/ui/copyable-terminal-card'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { ref, isInView } = useInView()

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Invalid email')
        setLoading(false)
        return
      }

      if (data.success) {
        setSubscribed(true)
      }
    } catch {
      setError('Invalid email')
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      ref={ref}
      className={`relative z-10 mx-auto max-w-5xl px-4 py-16 fade-in-up ${isInView ? 'visible' : ''}`}
    >
      <CopyableTerminalCard className="overflow-hidden border border-primary/30">
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
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            [Subscribe]
          </p>

          <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-lg font-light tracking-tight text-white">
                Get the AI History Brief
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[#B0C4B8]">
                One email per week. 76 years of AI breakthroughs, decoded for humans.
              </p>
            </div>

            {subscribed ? (
              <div className="shrink-0">
                <div className="font-mono text-xs text-primary">
                  {'> SUBSCRIBED! Check your inbox.'}
                </div>
              </div>
            ) : (
              <div className="shrink-0">
                <form onSubmit={handleSubscribe} className="flex">
                  <div className="flex items-center border border-dashed border-border bg-background transition-colors focus-within:border-primary">
                    <span className="px-3 font-mono text-[11px] text-primary">{'>'}</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setError('')
                      }}
                      placeholder="your@email.com"
                      className="w-full min-w-0 bg-transparent py-2.5 pr-2 font-mono text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none sm:w-48"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="border border-l-0 border-primary bg-[#00E68A] px-4 py-2.5 font-mono text-[11px] font-bold text-black transition-colors hover:bg-[#00ff88] disabled:opacity-50"
                  >
                    {loading ? '[SENDING...]' : '[SEND]'}
                  </button>
                </form>
                {error && <p className="mt-2 font-mono text-xs text-chart-5">{error}</p>}
              </div>
            )}
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
