'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, RefreshCw, Terminal, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

const CRASH_LINES = [
  { delay: 0, text: 'EXCEPTION at 0x00000500 in render_engine.exe', color: 'text-[#ff0044]' },
  { delay: 150, text: 'Stack trace: /museum/runtime → UNHANDLED_REJECTION', color: 'text-orange-400' },
  { delay: 300, text: 'Memory dump: 0xDE 0xAD 0xBE 0xEF ... [CORRUPTED]', color: 'text-yellow-400/70' },
  { delay: 450, text: 'Attempting auto-recovery... FAILED', color: 'text-[#ff0044]' },
  { delay: 600, text: 'KERNEL_PANIC: component tree collapsed', color: 'text-[#ff0044]' },
]

function CrashLine({ text, color, delay }: { text: string; color: string; delay: number }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay + 200)
    return () => clearTimeout(t)
  }, [delay])
  return (
    <div
      className={cn('font-mono text-[11px] transition-all duration-300', color)}
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-8px)' }}
    >
      <span className="text-muted-foreground/40 mr-2 select-none">{'>>'}</span>
      {text}
    </div>
  )
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [entered, setEntered] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 150)
    }, 4000 + Math.random() * 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    console.error('Runtime error:', error.message)
  }, [error])

  return (
    <div className="min-h-screen pt-20 pb-24">
      <div className="mx-auto max-w-3xl px-4 pt-8">
        {/* Error banner */}
        <div
          className={cn(
            'mb-6 flex items-center gap-2 border border-dashed border-[#ff0044]/30 bg-[#ff0044]/5 px-4 py-2.5 transition-all duration-700',
            entered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          )}
        >
          <div className="h-1.5 w-1.5 rounded-full bg-[#ff0044] animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#ff0044]">
            RUNTIME ERROR :: COMPONENT CRASHED
          </span>
          {error.digest && (
            <span className="ml-auto font-mono text-[10px] text-muted-foreground/40">
              DIGEST_{error.digest}
            </span>
          )}
        </div>

        {/* Main error title with glitch */}
        <div
          className={cn(
            'transition-all duration-700 delay-100',
            entered ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
          )}
        >
          <div className="relative">
            <h1
              className={cn(
                'text-6xl sm:text-8xl font-light tracking-tighter text-foreground select-none',
                glitchActive && 'not-found-glitch',
              )}
            >
              <span className="text-[#ff0044]">E</span>
              <span className="text-foreground/30">R</span>
              <span className="text-[#ff0044]">R</span>
            </h1>
            {glitchActive && (
              <>
                <h1
                  className="absolute inset-0 text-6xl sm:text-8xl font-light tracking-tighter text-cyan-400/30 select-none"
                  style={{ transform: 'translate(2px, -2px)', clipPath: 'inset(20% 0 40% 0)' }}
                  aria-hidden="true"
                >
                  ERR
                </h1>
                <h1
                  className="absolute inset-0 text-6xl sm:text-8xl font-light tracking-tighter text-[#ff0044]/30 select-none"
                  style={{ transform: 'translate(-2px, 2px)', clipPath: 'inset(50% 0 10% 0)' }}
                  aria-hidden="true"
                >
                  ERR
                </h1>
              </>
            )}
          </div>

          <h2 className="mt-4 text-xl sm:text-2xl font-light tracking-tight text-foreground">
            Something Went Wrong
          </h2>
          <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-muted-foreground">
            {error.message || 'An unexpected error occurred while rendering this exhibit.'}
          </p>
        </div>

        {/* Crash dump terminal */}
        <div
          className={cn(
            'mt-8 border border-dashed border-border/40 bg-card/20 backdrop-blur-sm transition-all duration-700 delay-200',
            entered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          )}
        >
          <div className="flex items-center gap-2 border-b border-dashed border-border/30 px-4 py-2">
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-[#ff0044]/70" />
              <div className="h-1.5 w-1.5 rounded-full bg-yellow-500/70" />
              <div className="h-1.5 w-1.5 rounded-full bg-green-500/70" />
            </div>
            <span className="font-mono text-[10px] text-muted-foreground/50">error_dump.log</span>
            <Terminal className="ml-auto h-3 w-3 text-muted-foreground/30" />
          </div>
          <div className="px-4 py-3 space-y-1">
            {CRASH_LINES.map((line, i) => (
              <CrashLine key={i} {...line} />
            ))}
          </div>
        </div>

        {/* Recovery actions */}
        <div
          className={cn(
            'mt-10 transition-all duration-700 delay-400',
            entered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          )}
        >
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="h-4 w-4 text-[#ff0044]/70" />
            <h3 className="text-lg font-light tracking-tight text-foreground">
              Recovery Options
            </h3>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 border border-dashed border-[#ff0044]/30 bg-[#ff0044]/5 px-5 py-2.5 text-[#ff0044] hover:bg-[#ff0044]/10 hover:border-[#ff0044]/50 transition-all font-mono text-[12px] cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              retry_render()
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 border border-dashed border-border/50 bg-card/30 px-5 py-2.5 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all font-mono text-[12px]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              cd ~/museum
            </Link>
          </div>
        </div>

        {/* Bottom terminal epitaph */}
        <div
          className={cn(
            'mt-16 transition-all duration-700 delay-500',
            entered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          )}
        >
          <div className="border-t border-dashed border-border/20 pt-8 text-center">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/30">
              END OF ERROR REPORT
            </p>
            <p className="mt-4 text-sm italic text-muted-foreground/50">
              {'"Even the best neural networks crash sometimes."'}
            </p>
            <p className="mt-4 font-mono text-[10px] text-[#ff0044]/40">
              {'> process.recover()'}
              <span className="cursor-blink" />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
