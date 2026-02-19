"use client"

import { useRef, createElement } from "react"
import { Copy } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface CopyableTerminalCardProps {
  children: React.ReactNode
  className?: string
  as?: "div" | "button"
  [key: string]: unknown
}

export function CopyableTerminalCard({ children, className, as = "div", ...props }: CopyableTerminalCardProps) {
  const cardRef = useRef<HTMLElement>(null)

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (cardRef.current) {
      const text = cardRef.current.innerText
      try {
        await navigator.clipboard.writeText(text)
        toast({
          description: "Copied!",
          duration: 2000,
        })
      } catch (err) {
        console.log("[v0] Failed to copy:", err)
      }
    }
  }

  return createElement(
    as,
    {
      ref: cardRef,
      className: cn("terminal-card-solid relative group", className),
      ...props
    },
    <>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-primary/10 border border-border hover:border-primary/50"
        aria-label="Copy card text"
      >
        <Copy className="h-4 w-4 text-muted-foreground hover:text-primary" />
      </button>
      {children}
    </>
  )
}
