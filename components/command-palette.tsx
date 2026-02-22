'use client'

import { useRouter } from 'next/navigation'
import { models, categories } from '@/data/models'
import {
  Compass,
  GitBranch,
  Trophy,
  Skull,
  Swords,
  SmilePlus,
  Users,
  Terminal,
  TrendingUp,
  HelpCircle,
  Home,
  Fingerprint,
} from 'lucide-react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'

const pages = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Timeline', href: '/explore', icon: Compass },
  { label: 'Evolution', href: '/evolution', icon: GitBranch },
  { label: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  { label: 'Graveyard', href: '/graveyard', icon: Skull },
  { label: 'AI Wars', href: '/battles', icon: Swords },
  { label: 'Memes', href: '/memes', icon: SmilePlus },
  { label: 'Victims', href: '/victims', icon: Users },
  { label: 'Simulator', href: '/simulator', icon: Terminal },
  { label: 'Predictions', href: '/predictions', icon: TrendingUp },
  { label: 'Quiz', href: '/quiz', icon: HelpCircle },
  { label: 'Passport', href: '/passport', icon: Fingerprint },
]

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter()

  const navigate = (href: string) => {
    onOpenChange(false)
    router.push(href)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search models, pages..." className="font-mono text-sm" />
      <CommandList>
        <CommandEmpty className="py-6 text-center font-mono text-sm text-muted-foreground">
          No results found.
        </CommandEmpty>

        <CommandGroup heading="Pages">
          {pages.map((page) => {
            const Icon = page.icon
            return (
              <CommandItem
                key={page.href}
                value={page.label}
                onSelect={() => navigate(page.href)}
                className="cursor-pointer gap-3"
              >
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{page.label}</span>
              </CommandItem>
            )
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Models">
          {models.map((model) => {
            const cat = categories[model.category]
            return (
              <CommandItem
                key={model.id}
                value={`${model.name} ${model.creator} ${model.year}`}
                onSelect={() => navigate(`/model/${model.slug}`)}
                className="cursor-pointer gap-3"
              >
                <div
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: cat.color }}
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm">{model.name}</span>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {model.creator} &middot; {model.year}
                  </span>
                </div>
              </CommandItem>
            )
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
