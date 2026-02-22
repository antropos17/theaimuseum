'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  Compass,
  Terminal,
  GitBranch,
  Skull,
  Swords,
  SmilePlus,
  Users,
  TrendingUp,
  Trophy,
  BrainCircuit,
} from 'lucide-react'
import {
  models,
  graveyard,
  memes as memesData,
  victims as victimsData,
  predictions as predictionsData,
  companies,
  simulatorEras,
  quizQuestions,
} from '@/data/models'

// --- Derived stats, computed once at module level from static data ---
const totalModels = models.length
const activeModels = models.filter((m) => m.status === 'active').length
const chatbotCount = models.filter((m) => m.category === 'chatbot').length
const imageCount = models.filter((m) => m.category === 'image').length
const modelsWithLineage = models.filter((m) => m.lineage.length > 0).length
const uniqueErasCount = new Set(models.map((m) => m.era)).size
const totalSimPrompts = simulatorEras.reduce((sum, e) => sum + e.prompts.length, 0)
const latestModel = models.reduce((a, b) => (b.year > a.year ? b : a))
const topCapability = Math.max(...models.map((m) => m.capability))
const topModel = [...models]
  .filter((m) => m.capability === topCapability)
  .sort((a, b) => b.year - a.year)[0]

interface WingData {
  icon: LucideIcon
  name: string
  desc: string
  tag: string
  href: string
  featured: boolean
  chips?: { label: string; value: string }[]
}

const wings: WingData[] = [
  {
    icon: Compass,
    name: 'Timeline',
    desc: `All ${totalModels} AI systems mapped chronologically — from Turing Test (1950) to ${latestModel.name} (${latestModel.year})`,
    tag: `${totalModels} models`,
    href: '/explore',
    featured: true,
    chips: [
      { label: 'chatbots', value: `${chatbotCount}` },
      { label: 'image', value: `${imageCount}` },
      { label: 'active', value: `${activeModels}` },
    ],
  },
  {
    icon: Terminal,
    name: 'Simulator',
    desc: `Chat with AI across ${simulatorEras.length} distinct eras — from ELIZA's pattern-matching to o3's chain-of-thought reasoning`,
    tag: `${simulatorEras.length} eras`,
    href: '/simulator',
    featured: true,
    chips: [
      { label: 'span', value: '1966—2025' },
      { label: 'prompts', value: `${totalSimPrompts}` },
    ],
  },
  {
    icon: GitBranch,
    name: 'Evolution',
    desc: `${modelsWithLineage} models connected by lineage across ${uniqueErasCount} eras — trace every breakthrough back to its origin`,
    tag: `${modelsWithLineage} links`,
    href: '/evolution',
    featured: false,
  },
  {
    icon: Skull,
    name: 'Graveyard',
    desc: `${graveyard.length} failed projects — from Tay's 16-hour racist meltdown to Watson's $4B healthcare collapse`,
    tag: `${graveyard.length} tombs`,
    href: '/graveyard',
    featured: false,
  },
  {
    icon: Swords,
    name: 'AI Wars',
    desc: `${companies.length} labs, one trillion-dollar race — OpenAI, Google, Anthropic, Meta, xAI`,
    tag: `${companies.length} labs`,
    href: '/battles',
    featured: false,
  },
  {
    icon: SmilePlus,
    name: 'Memes',
    desc: `${memesData.length} moments that broke the internet — Sydney's love, Gemini's Nazis, DeepSeek's $600B shock`,
    tag: `${memesData.length} memes`,
    href: '/memes',
    featured: false,
  },
  {
    icon: Users,
    name: 'Victims',
    desc: `${victimsData.length} professions disrupted — illustrators, copywriters, junior devs, call centres`,
    tag: `${victimsData.length} jobs`,
    href: '/victims',
    featured: false,
  },
  {
    icon: TrendingUp,
    name: 'Predictions',
    desc: `${predictionsData.length} expert forecasts vs brutal reality — Kurzweil, Hinton, Altman, LeCun`,
    tag: `${predictionsData.length} takes`,
    href: '/predictions',
    featured: false,
  },
  {
    icon: Trophy,
    name: 'Leaderboard',
    desc: `${activeModels} active models ranked. ${topModel.name} leads at ${topModel.capability}/100 capability`,
    tag: `#1 ${topModel.name}`,
    href: '/leaderboard',
    featured: false,
  },
  {
    icon: BrainCircuit,
    name: 'Quiz',
    desc: `${quizQuestions.length} questions across 75 years — from Alan Turing to NVIDIA's $600B crash`,
    tag: `${quizQuestions.length} q`,
    href: '/quiz',
    featured: false,
  },
]

function WingCard({
  wing,
  index,
  visible,
}: {
  wing: WingData
  index: number
  visible: boolean
}) {
  const Icon = wing.icon
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={wing.href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative flex flex-col overflow-hidden border border-border bg-card
        transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        hover:-translate-y-1 hover:bg-card/50 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(0,255,136,0.15)]
        ${wing.featured ? 'sm:col-span-2 sm:row-span-1' : ''}
      `}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transitionDelay: `${index * 70}ms`,
        borderLeftWidth: '2px',
        borderLeftColor: isHovered ? 'rgba(0, 255, 136, 1)' : 'rgba(0, 255, 136, 0.4)',
      }}
    >
      {/* Left border sweep animation */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-0.5 overflow-hidden">
        <div
          className="h-0 w-full bg-gradient-to-b from-transparent via-primary to-transparent transition-all duration-300 ease-out"
          style={{
            height: isHovered ? '100%' : '0%',
          }}
        />
      </div>

      {/* Scanline sweep effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ top: 0 }}
            animate={{ top: '100%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'linear' }}
            className="pointer-events-none absolute left-0 z-20 h-[2px] w-full bg-white/[0.04]"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Terminal window chrome bar */}
      <div
        className="flex items-center gap-1.5 border-b border-border px-3 py-1.5 transition-colors duration-300"
        style={{
          backgroundColor: isHovered ? 'rgba(0, 255, 136, 0.06)' : 'hsl(var(--surface-2))',
        }}
      >
        <span className="h-2 w-2 rounded-full bg-destructive/60" />
        <span className="h-2 w-2 rounded-full bg-warning/60" />
        <span className="h-2 w-2 rounded-full bg-success/60" />
        <span className="ml-2 font-mono text-[9px] uppercase tracking-widest text-[#00ff88]">
          {wing.name}.exe
        </span>
        <span className="ml-auto font-mono text-[9px] text-muted-foreground/50">[{wing.tag}]</span>
      </div>

      {/* Card body */}
      <div className={`flex flex-1 flex-col gap-3 p-5 ${wing.featured ? 'sm:p-6' : ''}`}>
        <div className="flex items-start justify-between">
          <div className="flex h-9 w-9 items-center justify-center border border-dashed border-border transition-all duration-300 group-hover:border-solid group-hover:border-primary/60">
            <Icon className="h-4 w-4 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
          </div>
        </div>

        <div className="flex-1">
          <h3
            className={`font-medium tracking-tight text-[#EAFBF0] ${wing.featured ? 'text-base' : 'text-sm'}`}
          >
            {wing.name}
          </h3>
          <p
            className={`mt-1.5 leading-relaxed text-[#B0C4B8] ${wing.featured ? 'text-[13px]' : 'text-[12px] line-clamp-2'}`}
          >
            {wing.desc}
          </p>
          {/* Data chips — shown only on featured cards */}
          {wing.featured && wing.chips && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {wing.chips.map((chip) => (
                <span
                  key={chip.label}
                  className="border border-border px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground/70 transition-colors duration-300 group-hover:border-primary/30"
                >
                  {chip.label}
                  <span className="ml-1 text-primary">{chip.value}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-dashed border-border pt-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            wing/{wing.name.toLowerCase().replace(/\s/g, '-')}
          </span>
          <span className="font-mono text-[10px] text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {'>'} enter_
          </span>
        </div>
      </div>
    </Link>
  )
}

export function HallsGrid() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.unobserve(el)
        }
      },
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative z-10 mx-auto max-w-5xl px-4 py-20">
      {/* Section header — terminal command style */}
      <div
        className="mb-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(12px)',
        }}
      >
        <div className="flex items-center gap-2 text-primary">
          <span className="font-mono text-[11px] tracking-widest text-glow-subtle">
            {'>'} SELECT_WING
          </span>
          <span className="cursor-blink font-mono text-[11px]" />
        </div>
        <h2 className="mt-3 text-2xl font-light tracking-tight text-foreground sm:text-3xl">
          Museum Wings
        </h2>
        <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-muted-foreground">
          {totalModels} models · {uniqueErasCount} eras · {activeModels} active — spanning 75 years
          of artificial intelligence history.
        </p>
      </div>

      {/* Bento grid — 3 cols desktop, 2 tablet, 1 mobile */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {wings.map((wing, i) => (
          <WingCard key={wing.name} wing={wing} index={i} visible={visible} />
        ))}
      </div>
    </section>
  )
}
