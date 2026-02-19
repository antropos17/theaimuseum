"use client"

import { useRouter } from "next/navigation"
import { models, categories } from "@/data/models"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter()

  const handleSelect = (slug: string) => {
    onOpenChange(false)
    router.push(`/model/${slug}`)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search AI models..." />
      <CommandList>
        <CommandEmpty>No models found.</CommandEmpty>
        <CommandGroup heading="Models">
          {models.map((model) => {
            const cat = categories[model.category]
            return (
              <CommandItem
                key={model.id}
                value={`${model.name} ${model.creator} ${model.year}`}
                onSelect={() => handleSelect(model.slug)}
                className="flex items-center gap-3 cursor-pointer"
              >
                <span className="text-base">{cat.icon}</span>
                <div className="flex flex-col">
                  <span className="font-sans text-sm font-medium text-foreground">
                    {model.name}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
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
