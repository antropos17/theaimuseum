'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Skull, Terminal, AlertTriangle, Search, Zap, Brain, Swords, Gamepad2, Trophy, MessageSquare, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const CRASH_LINES = [
  { delay: 0, text: 'SEGFAULT at 0x00000404 in exhibit_loader.exe', color: 'text-red-400' },
  { delay: 150, text: 'Stack trace: /museum/exhibits/??? → NULL_POINTER', color: 'text-orange-400' },
  { delay: 300, text: 'Memory dump: 0xFF 0x00 0x04 0x04 ... [CORRUPTED]', color: 'text-yellow-400/70' },
  { delay: 450, text: 'Attempting recovery... FAILED', color: 'text-red-400' },
  { delay: 600, text: 'KERNEL_PANIC: exhibit not found in neural_index', color: 'text-red-500' },
]

const SUGGESTED_WINGS = [
  { name: 'explore.exe', desc: 'Browse all 40 AI exhibits in the catalog', href: '/explore', icon: Search, color: '#00ff88' },
  { name: 'evolution.exe', desc: 'Timeline of AI from 1950 to present day', href: '/evolution', icon: Zap, color: '#00aaff' },
  { name: 'battles.exe', desc: 'Head-to-head comparisons of AI models', href: '/battles', icon: Swords, color: '#ffaa00' },
  { name: 'graveyard.exe', desc: 'Where discontinued AI projects rest in peace', href: '/graveyard', icon: Skull, color: '#ff4444' },
  { name: 'simulator.exe', desc: 'Chat with historical AI personalities', href: '/simulator', icon: MessageSquare, color: '#a855f7' },
  { name: 'quiz.exe', desc: 'Test your AI knowledge with trivia', href: '/quiz', icon: Gamepad2, color: '#22c55e' },
  { name: 'leaderboard.exe', desc: 'Top-ranked AI systems by capability', href: '/leaderboard', icon: Trophy, color: '#eab308' },
  { name: 'victims.exe', desc: 'Jobs and industries disrupted by automation', href: '/victims', icon: TrendingDown, color: '#f97316' },
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

function WingCard({ wing, index }: { wing: typeof SUGGESTED_WINGS[0]; index: number }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 900 + index * 80)
    return () => clearTimeout(t)
  }, [index])

  const Icon = wing.icon

  return (
    <Link
      href={wing.href}
      className="group block transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
      }}
    >
      <div className="border border-dashed border-border/50 bg-card/30 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/40 group-hover:bg-card/50"
        style={{ boxShadow: 'none' }}
        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 20px ${wing.color}10` }}
        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
      >
        {/* Card header — skillsmp style with dots */}
        <div className="flex items-center gap-2 border-b border-dashed border-border/30 px-3 py-2">
          <div className="flex items-center gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-red-500/70" />
            <div className="h-1.5 w-1.5 rounded-full bg-yellow-500/70" />
            <div className="h-1.5 w-1.5 rounded-full bg-green-500/70" />
          </div>
          <span className="font-mono text-[10px] text-muted-foreground/60 truncate">
            {wing.name}
          </span>
          <div className="ml-auto flex items-center gap-1">
            <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: wing.color, opacity: 0.6 }} />
            <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: wing.color, opacity: 0.7 }}>
              ONLINE
            </span>
          </div>
        </div>

        {/* Card body — code-style lines like skillsmp */}
        <div className="px-3 py-3 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-muted-foreground/30 select-none w-3 text-right">1</span>
            <span className="font-mono text-[11px]">
              <span className="text-primary/70">{'>'}</span>{' '}
              <span className="font-medium" style={{ color: wing.color }}>GOTO</span>{' '}
              <span className="text-foreground font-medium">{wing.name.replace('.exe', '')}</span>
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-mono text-[10px] text-muted-foreground/30 select-none w-3 text-right">2</span>
            <span className="font-mono text-[11px] text-muted-foreground/70 leading-relaxed">
              {wing.desc}
            </span>
          </div>
        </div>

        {/* Card footer */}
        <div className="flex items-center justify-between border-t border-dashed border-border/20 px-3 py-1.5">
          <div className="flex items-center gap-1.5">
            <Icon className="h-3 w-3 text-muted-foreground/40 group-hover:text-primary/60 transition-colors" />
            <span className="font-mono text-[9px] text-muted-foreground/30">
              /museum{wing.href}
            </span>
          </div>
          <span className="font-mono text-[9px] text-muted-foreground/20 group-hover:text-primary/50 transition-colors">
            ENTER →
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function NotFound() {
  const [entered, setEntered] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)
  const [errorCode, setErrorCode] = useState('0x0404')

  useEffect(() => {
    setErrorCode(`0x${Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, '0')}`)
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

  return (
    <div className="min-h-screen pt-20 pb-24">
      <div className="mx-auto max-w-4xl px-4 pt-8">
        {/* Breadcrumb — skillsmp style */}
        <div
          className={cn(
            'transition-all duration-700',
            entered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          )}
        >
          <div className="inline-flex items-center gap-2 border border-border/50 bg-card/30 backdrop-blur-sm px-4 py-2 mb-8">
            <span className="font-mono text-[11px] text-primary/70">$</span>
            <span className="font-mono text-[11px] text-muted-foreground">pwd:</span>
            <Link href="/" className="font-mono text-[11px] text-primary hover:text-primary/80 transition-colors">~</Link>
            <span className="font-mono text-[11px] text-muted-foreground/40">/</span>
            <span className="font-mono text-[11px] text-red-400">???</span>
            <span className="font-mono text-[11px] text-muted-foreground/40">/</span>
            <span className="font-mono text-[11px] text-red-400 font-medium">NOT_FOUND</span>
          </div>
        </div>

        {/* Error banner */}
        <div
          className={cn(
            'mb-6 flex items-center gap-2 border border-dashed border-red-500/20 bg-red-500/5 px-4 py-2.5 transition-all duration-700 delay-100',
            entered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          )}
        >
          <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-red-400">
            FATAL ERROR :: EXHIBIT NOT FOUND
          </span>
          <span className="ml-auto font-mono text-[10px] text-muted-foreground/40">
            ERR_{errorCode}
          </span>
        </div>

        {/* Main 404 title with glitch */}
        <div
          className={cn(
            'transition-all duration-700 delay-200',
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
              <span className="text-red-400">4</span>
              <span className="text-foreground/30">0</span>
              <span className="text-red-400">4</span>
            </h1>
            {glitchActive && (
              <>
                <h1
                  className="absolute inset-0 text-6xl sm:text-8xl font-light tracking-tighter text-cyan-400/30 select-none"
                  style={{ transform: 'translate(2px, -2px)', clipPath: 'inset(20% 0 40% 0)' }}
                  aria-hidden="true"
                >
                  <span>4</span><span>0</span><span>4</span>
                </h1>
                <h1
                  className="absolute inset-0 text-6xl sm:text-8xl font-light tracking-tighter text-red-400/30 select-none"
                  style={{ transform: 'translate(-2px, 2px)', clipPath: 'inset(50% 0 10% 0)' }}
                  aria-hidden="true"
                >
                  <span>4</span><span>0</span><span>4</span>
                </h1>
              </>
            )}
          </div>

          <h2 className="mt-4 text-xl sm:text-2xl font-light tracking-tight text-foreground">
            Exhibit Not Found
          </h2>
          <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-muted-foreground">
            The exhibit you&apos;re looking for has been decommissioned, moved to another wing,
            or never existed in our neural index.
          </p>
        </div>

        {/* Crash dump terminal */}
        <div
          className={cn(
            'mt-8 border border-dashed border-border/40 bg-card/20 backdrop-blur-sm transition-all duration-700 delay-300',
            entered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          )}
        >
          <div className="flex items-center gap-2 border-b border-dashed border-border/30 px-4 py-2">
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-red-500/70" />
              <div className="h-1.5 w-1.5 rounded-full bg-yellow-500/70" />
              <div className="h-1.5 w-1.5 rounded-full bg-green-500/70" />
            </div>
            <span className="font-mono text-[10px] text-muted-foreground/50">crash_dump.log</span>
            <Terminal className="ml-auto h-3 w-3 text-muted-foreground/30" />
          </div>
          <div className="px-4 py-3 space-y-1">
            {CRASH_LINES.map((line, i) => (
              <CrashLine key={i} {...line} />
            ))}
          </div>
        </div>

        {/* Suggestions header — skillsmp style stats */}
        <div
          className={cn(
            'mt-12 transition-all duration-700 delay-500',
            entered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          )}
        >
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="h-4 w-4 text-primary/70" />
            <h3 className="text-lg font-light tracking-tight text-foreground">
              Recovery Options
            </h3>
          </div>
          <div className="flex items-center gap-2 mb-6">
            <Brain className="h-3.5 w-3.5 text-muted-foreground/40" />
            <span className="font-mono text-[11px] text-muted-foreground/60">
              {SUGGESTED_WINGS.length} active wings
            </span>
            <span className="font-mono text-[10px] text-muted-foreground/30">--status=online</span>
          </div>
        </div>

        {/* Wing cards grid — skillsmp card style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SUGGESTED_WINGS.map((wing, i) => (
            <WingCard key={wing.href} wing={wing} index={i} />
          ))}
        </div>

        {/* Back link */}
        <div
          className={cn(
            'mt-10 transition-all duration-700 delay-700',
            entered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          )}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 glass-btn px-4 py-2.5 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="font-mono text-[11px]">cd ~/museum</span>
          </Link>
        </div>

        {/* Bottom terminal epitaph */}
        <div
          className={cn(
            'mt-16 transition-all duration-700 delay-[800ms]',
            entered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          )}
        >
          <div className="border-t border-dashed border-border/20 pt-8 text-center">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/30">
              END OF CRASH REPORT
            </p>
            <p className="mt-4 text-sm italic text-muted-foreground/50">
              {'"Not all who wander are lost — but this page definitely is."'}
            </p>
            <p className="mt-4 font-mono text-[10px] text-red-400/40">
              {'> process.exit(404)'}
              <span className="cursor-blink" />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
