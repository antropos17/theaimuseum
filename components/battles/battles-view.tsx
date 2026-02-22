'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { companies, models } from '@/data/models'
import { cn } from '@/lib/utils'
import { CopyableTerminalCard } from '@/components/ui/copyable-terminal-card'
import { ArrowLeft } from 'lucide-react'

/* ── Animated Valuation Counter ─────────────────────────────────── */
function ValuationCounter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [val, setVal] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const dur = 1400
          const start = performance.now()
          const step = (now: number) => {
            const t = Math.min((now - start) / dur, 1)
            const ease = 1 - Math.pow(1 - t, 3)
            setVal(Math.round(ease * target))
            if (t < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.3 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return (
    <span ref={ref} className="font-mono text-xl tabular-nums text-primary text-glow-subtle">
      ${new Intl.NumberFormat('en-US').format(val)}B
    </span>
  )
}

/* ── Compare Tool ───────────────────────────────────────────────── */
function CompareTool() {
  const [slots, setSlots] = useState<(string | '')[]>(['', '', ''])
  const selected = slots
    .map((s, i) => {
      const m = models.find((m) => m.id === s)
      return m ? { ...m, _slotIdx: i } : null
    })
    .filter(Boolean) as ((typeof models)[number] & { _slotIdx: number })[]

  return (
    <CopyableTerminalCard className="p-6">
      <p className="data-label mb-4">[Compare Models]</p>
      <div className="grid gap-3 sm:grid-cols-3">
        {slots.map((slot, i) => (
          <select
            key={i}
            value={slot}
            onChange={(e) => {
              const next = [...slots]
              next[i] = e.target.value
              setSlots(next)
            }}
            className="w-full border border-dashed border-border bg-transparent px-3 py-2 font-mono text-xs text-foreground focus:border-primary focus:outline-none"
          >
            <option value="">-- slot_{i + 1} --</option>
            {models.map((m) => (
              <option key={m.id} value={m.id} className="bg-background text-foreground">
                {m.name} ({m.year})
              </option>
            ))}
          </select>
        ))}
      </div>

      {selected.length >= 2 && (
        <div className="mt-5 overflow-x-auto">
          <table className="w-full border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-dashed border-border">
                <th className="px-3 py-2 text-left text-muted-foreground">FIELD</th>
                {selected.map((m) => (
                  <th key={m._slotIdx} className="px-3 py-2 text-left text-foreground">
                    {m.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {(['year', 'creator', 'params', 'capability', 'hype', 'safety'] as const).map(
                (field) => (
                  <tr key={field} className="border-b border-dashed border-border/40">
                    <td className="px-3 py-2 uppercase text-primary/70">{field}</td>
                    {selected.map((m) => (
                      <td key={m._slotIdx} className="px-3 py-2 tabular-nums text-foreground">
                        {typeof m[field] === 'number' && field !== 'year'
                          ? `${m[field]}%`
                          : String(m[field])}
                      </td>
                    ))}
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      )}
      {selected.length < 2 && (
        <p className="mt-4 text-center font-mono text-[11px] text-muted-foreground">
          Select at least 2 models to compare.
        </p>
      )}
    </CopyableTerminalCard>
  )
}

/* ── Main Battles View ──────────────────────────────────────────── */
export function BattlesView() {
  const [selected, setSelected] = useState<number | null>(null)
  const maxVal = Math.max(...companies.map((c) => c.valuation))

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-4xl px-4 pb-24 pt-10">
        <Link
          href="/"
          className="flex items-center gap-1.5 mb-4 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          Back to Museum
        </Link>
        <span className="data-label">[Competition]</span>
        <h1 className="mt-3 text-2xl font-light tracking-tight text-foreground sm:text-3xl">
          The AI Wars
        </h1>
        <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
          Five companies. Trillions at stake. The race for artificial general intelligence.
        </p>

        {/* Company cards */}
        <div className="mt-8 space-y-3">
          {companies.map((company, i) => {
            const isOpen = selected === i
            const barWidth = Math.max(4, (company.valuation / maxVal) * 100)
            return (
              <CopyableTerminalCard
                key={company.name}
                onClick={() => setSelected(isOpen ? null : i)}
                className="group w-full p-5 text-left transition-all duration-300 hover:-translate-y-px cursor-pointer"
                as="button"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-3 w-3 rounded-sm"
                      style={{
                        backgroundColor: company.color,
                        boxShadow: `0 0 8px ${company.color}40`,
                      }}
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">{company.name}</p>
                      <p className="font-mono text-[11px] text-muted-foreground">
                        CEO: {company.ceo}
                      </p>
                    </div>
                  </div>
                  <ValuationCounter target={company.valuation} />
                </div>
                <div className="mt-3 metric-bar">
                  <div
                    className="metric-bar-fill transition-all duration-1000"
                    style={{ width: `${barWidth}%`, backgroundColor: company.color }}
                  />
                </div>
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300',
                    isOpen ? 'mt-4 max-h-40 opacity-100' : 'max-h-0 opacity-0',
                  )}
                >
                  <div className="border-t border-dashed border-border pt-4">
                    <p className="data-label text-chart-5">[Drama]</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-foreground/80">
                      {company.drama}
                    </p>
                  </div>
                </div>
                <p className="mt-3 font-mono text-[10px] text-muted-foreground">
                  {isOpen ? '[-] Collapse' : '[+] Expand drama'}
                </p>
              </CopyableTerminalCard>
            )
          })}
        </div>

        {/* Compare models tool */}
        <div className="mt-12">
          <CompareTool />
        </div>

        {/* View full leaderboard link */}
        <div className="mt-6 text-center">
          <Link
            href="/leaderboard"
            className="inline-block font-mono text-xs text-primary text-glow-subtle transition-opacity hover:opacity-80"
          >
            {'>'} VIEW FULL LEADERBOARD
          </Link>
        </div>
      </div>
    </div>
  )
}
