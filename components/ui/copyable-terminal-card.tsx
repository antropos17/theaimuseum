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

  /* When the outer wrapper is a <button>, use a <span> for the copy
     trigger to avoid invalid nested <button> HTML (causes hydration errors). */
  const CopyTrigger = as === "button" ? "span" : "button"

  return createElement(
    as,
    {
      ref: cardRef,
      className: cn("terminal-card-solid relative group", className),
      ...props
    },
    <>
      <CopyTrigger
        onClick={handleCopy}
        className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-primary/10 border border-border hover:border-primary/50 cursor-pointer"
        aria-label="Copy card text"
        role="button"
        tabIndex={0}
      >
        <Copy className="h-4 w-4 text-muted-foreground hover:text-primary" />
      </CopyTrigger>
      {children}
    </>
  )
}
