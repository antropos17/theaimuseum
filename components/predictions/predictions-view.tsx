'use client'

import { useState } from 'react'
import Link from 'next/link'
import { predictions } from '@/data/models'
import { cn } from '@/lib/utils'
import { CopyableTerminalCard } from '@/components/ui/copyable-terminal-card'
import { ArrowLeft } from 'lucide-react'

const statusConfig: Record<string, { label: string; color: string; glow: string; spin?: boolean }> =
  {
    loading: { label: 'LIVE', color: 'text-emerald-400', glow: 'bg-emerald-400', spin: true },
    ironic: { label: 'IRONIC', color: 'text-amber-400', glow: 'bg-amber-400' },
    failing: { label: 'FAILING', color: 'text-red-400', glow: 'bg-red-400' },
  }

export function PredictionsView() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-10">
        <Link
          href="/"
          className="flex items-center gap-1.5 mb-4 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          Back to Museum
        </Link>
        <span className="data-label">[Forecasts]</span>
        <h1 className="mt-3 text-2xl font-light tracking-tight text-foreground sm:text-3xl">
          Predictions
        </h1>
        <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
          What the experts said. What actually happened.
        </p>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4">
          {Object.entries(statusConfig).map(([key, cfg]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span className={cn('inline-block h-2 w-2 rounded-full', cfg.glow)} />
              <span className={cn('font-mono text-[10px]', cfg.color)}>{cfg.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-3">
          {predictions.map((pred, i) => {
            const isOpen = expanded === i
            const cfg = statusConfig[pred.status] ?? statusConfig.loading

            return (
              <CopyableTerminalCard
                key={i}
                onClick={() => setExpanded(isOpen ? null : i)}
                className="group w-full p-5 text-left transition-all duration-300 hover:-translate-y-px cursor-pointer"
                as="button"
              >
                {/* Header with status */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{pred.who}</p>
                      <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                        [{pred.year}]
                      </span>
                    </div>
                    <p className="mt-1.5 text-[13px] italic leading-relaxed text-foreground/80">
                      {'"'}
                      {pred.prediction}
                      {'"'}
                    </p>
                  </div>

                  {/* Status badge */}
                  <div className="flex shrink-0 items-center gap-1.5 rounded border border-dashed border-border px-2 py-1">
                    {cfg.spin ? (
                      /* Spinning indicator for LIVE predictions */
                      <svg
                        className="h-3 w-3 animate-spin"
                        viewBox="0 0 16 16"
                        fill="none"
                        style={{ color: 'var(--primary)' }}
                      >
                        <circle
                          cx="8"
                          cy="8"
                          r="6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="28"
                          strokeDashoffset="8"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      <span className={cn('inline-block h-1.5 w-1.5 rounded-full', cfg.glow)} />
                    )}
                    <span className={cn('font-mono text-[10px] font-bold', cfg.color)}>
                      {cfg.label}
                    </span>
                  </div>
                </div>

                {/* Confidence bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <span className="data-label">Confidence</span>
                    <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                      {pred.pct}%
                    </span>
                  </div>
                  <div className="mt-1.5 metric-bar">
                    <div
                      className="metric-bar-fill"
                      style={{
                        width: `${pred.pct}%`,
                        backgroundColor:
                          pred.status === 'loading'
                            ? 'var(--primary)'
                            : pred.status === 'ironic'
                              ? '#f59e0b'
                              : '#ef4444',
                      }}
                    />
                  </div>
                </div>

                {/* Expandable reality check */}
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300',
                    isOpen ? 'mt-4 max-h-32 opacity-100' : 'max-h-0 opacity-0',
                  )}
                >
                  <div className="border-t border-dashed border-border pt-4">
                    <p className="data-label">
                      {pred.status === 'ironic' ? '[The Irony]' : '[Reality Check]'}
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-foreground/80">
                      {pred.reality}
                    </p>
                  </div>
                </div>
                <p className="mt-3 font-mono text-[10px] text-muted-foreground">
                  {isOpen ? '[-] Hide' : '[+] Reality check'}
                </p>
              </CopyableTerminalCard>
            )
          })}
        </div>

        {/* Disclaimer */}
        <div className="mt-10 terminal-card p-5 text-center">
          <p className="font-mono text-[11px] text-muted-foreground">
            {'"Prediction is very difficult, especially about the future."'}
          </p>
          <p className="mt-1 font-mono text-[10px] text-muted-foreground/50">-- Niels Bohr</p>
        </div>
      </div>
    </div>
  )
}
