"use client"

import { useEffect, useState } from "react"

const SITE_URL = "https://theaimuseum.vercel.app"
const SITE_TITLE = "The AI Museum — 75 Years of AI History (Interactive)"
const TWEET_TEXT = "I just discovered The AI Museum — 75 years of AI history in one interactive site 🤖🧠"

export function HeroShareBar({ visible }: { visible: boolean }) {
  const [copied, setCopied] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SITE_URL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("[v0] Failed to copy:", err)
    }
  }

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: SITE_TITLE,
          text: TWEET_TEXT,
          url: SITE_URL,
        })
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("[v0] Share failed:", err)
          handleCopy()
        }
      }
    } else {
      handleCopy()
    }
  }

  if (isMobile) {
    return (
      <div
        className={`mt-4 transition-all duration-700 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: "150ms",
        }}
      >
        <button
          onClick={handleWebShare}
          className="inline-flex items-center gap-2 border border-border/30 px-3 py-1.5 font-mono text-[10px] text-muted-foreground transition-colors hover:border-[#00ff88]/50 hover:text-foreground"
        >
          {copied ? "Copied!" : "Share"}
        </button>
      </div>
    )
  }

  return (
    <div
      className={`mt-6 flex flex-wrap items-center justify-center gap-2 transition-all duration-700 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
      style={{
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: "150ms",
      }}
    >
      <a
        href="https://github.com/theaimuseum/theaimuseum"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 border border-border/30 px-2.5 py-1 font-mono text-[10px] text-muted-foreground transition-colors hover:border-[#00ff88]/50 hover:text-foreground"
      >
        ⭐ Star
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(TWEET_TEXT)}&url=${encodeURIComponent(SITE_URL)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 border border-border/30 px-2.5 py-1 font-mono text-[10px] text-muted-foreground transition-colors hover:border-[#00ff88]/50 hover:text-foreground"
      >
        𝕏 Post
      </a>
      <a
        href={`https://reddit.com/submit?url=${encodeURIComponent(SITE_URL)}&title=${encodeURIComponent(SITE_TITLE)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 border border-border/30 px-2.5 py-1 font-mono text-[10px] text-muted-foreground transition-colors hover:border-[#00ff88]/50 hover:text-foreground"
      >
        Reddit
      </a>
      <a
        href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SITE_URL)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 border border-border/30 px-2.5 py-1 font-mono text-[10px] text-muted-foreground transition-colors hover:border-[#00ff88]/50 hover:text-foreground"
      >
        LinkedIn
      </a>
      <a
        href={`https://t.me/share/url?url=${encodeURIComponent(SITE_URL)}&text=${encodeURIComponent("The AI Museum — 75 years of AI history 🤖")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 border border-border/30 px-2.5 py-1 font-mono text-[10px] text-muted-foreground transition-colors hover:border-[#00ff88]/50 hover:text-foreground"
      >
        Telegram
      </a>
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1 border border-border/30 px-2.5 py-1 font-mono text-[10px] text-muted-foreground transition-colors hover:border-[#00ff88]/50 hover:text-foreground"
      >
        📋 {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  )
}

export function StickySidebarShare() {
  const [isVisible, setIsVisible] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SITE_URL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("[v0] Failed to copy:", err)
    }
  }

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: SITE_TITLE,
          text: TWEET_TEXT,
          url: SITE_URL,
        })
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("[v0] Share failed:", err)
          handleCopy()
        }
      }
    } else {
      handleCopy()
    }
  }

  return (
    <aside
      className={`fixed left-0 top-1/2 z-50 hidden -translate-y-1/2 transition-opacity duration-300 md:block ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col gap-1 rounded-r-lg border border-border/30 bg-card/80 px-1 py-2 backdrop-blur-sm">
        <a
          href="https://github.com/theaimuseum/theaimuseum"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-8 w-8 items-center justify-center font-mono text-[10px] text-muted-foreground transition-colors hover:text-foreground"
          title="Star on GitHub"
        >
          ⭐
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(TWEET_TEXT)}&url=${encodeURIComponent(SITE_URL)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-8 w-8 items-center justify-center font-mono text-[10px] text-muted-foreground transition-colors hover:text-foreground"
          title="Post on X"
        >
          𝕏
        </a>
        <button
          onClick={handleWebShare}
          className="flex h-8 w-8 items-center justify-center font-mono text-[10px] text-muted-foreground transition-colors hover:text-foreground"
          title="Share"
        >
          ↗
        </button>
        <button
          onClick={handleCopy}
          className="flex h-8 w-8 items-center justify-center font-mono text-[10px] text-muted-foreground transition-colors hover:text-foreground"
          title={copied ? "Copied!" : "Copy URL"}
        >
          {copied ? "✓" : "📋"}
        </button>
      </div>
    </aside>
  )
}
