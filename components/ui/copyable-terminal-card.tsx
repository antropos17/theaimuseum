'use client'

import { createElement } from 'react'
import { Copy } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface CopyableTerminalCardProps {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'button'
  [key: string]: unknown
}

export function CopyableTerminalCard({
  children,
  className,
  as = 'div',
  ...props
}: CopyableTerminalCardProps) {
  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const card = (e.currentTarget as HTMLElement).closest('[data-copyable-card]')
    if (card) {
      const text = (card as HTMLElement).innerText
      try {
        await navigator.clipboard.writeText(text)
        toast.success('Copied!', { duration: 2000 })
      } catch {
        // silently ignore
      }
    }
  }

  /* When the outer wrapper is a <button>, use a <span> for the copy
     trigger to avoid invalid nested <button> HTML (causes hydration errors). */
  const CopyTrigger = as === 'button' ? 'span' : 'button'

  return createElement(
    as,
    {
      'data-copyable-card': '',
      className: cn('terminal-card-solid relative group', className),
      ...props,
    },
    <>
      <CopyTrigger
        onClick={handleCopy}
        className="absolute top-2 right-2 z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100 [@media(hover:none)]:opacity-100 transition-opacity p-1 hover:bg-primary/10 border border-border hover:border-primary/50 cursor-pointer"
        aria-label="Copy card text"
        role="button"
        tabIndex={0}
      >
        <Copy className="h-4 w-4 text-muted-foreground hover:text-primary" />
      </CopyTrigger>
      {children}
    </>,
  )
}
