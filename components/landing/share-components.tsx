'use client'

import { useEffect, useState } from 'react'
import { Copy, Check, Share2 } from 'lucide-react'

const SITE_URL = 'https://v0-theaimuseum.vercel.app'
const SITE_TITLE = 'The AI Museum — 76 Years of AI History (Interactive)'
const TWEET_TEXT = 'I found The AI Museum — 76 years of AI history in one interactive site'

export function HeroShareBar({ visible }: { visible: boolean }) {
  const [copied, setCopied] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SITE_URL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('[v0] Failed to copy:', err)
    }
  }

  const handleWebShare = async () => {
    // Check if Web Share API is available and can share
    if (navigator.share && navigator.canShare) {
      const shareData = {
        title: SITE_TITLE,
        text: TWEET_TEXT,
        url: SITE_URL,
      }
      
      // Verify the data can be shared
      if (navigator.canShare(shareData)) {
        try {
          await navigator.share(shareData)
        } catch (err) {
          // AbortError means user cancelled, which is fine
          if ((err as Error).name !== 'AbortError') {
            console.error('[v0] Share failed:', err)
            // Fallback to copy on any other error
            handleCopy()
          }
        }
      } else {
        // If can't share this data, fallback to copy
        handleCopy()
      }
    } else {
      // Web Share API not available, fallback to copy
      handleCopy()
    }
  }

  return (
    <div
      className={`mt-4 flex flex-wrap items-center justify-center gap-2 transition-all duration-700 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: '150ms',
      }}
    >
      {/* GitHub */}
      <a
        href="https://github.com/theaimuseum"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 rounded-sm border border-border/30 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-muted-foreground transition-colors duration-200 hover:border-[#00ff88]/50 hover:text-[#00ff88]"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
        Star
      </a>

      {/* X/Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(TWEET_TEXT)}&url=${encodeURIComponent(SITE_URL)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 rounded-sm border border-border/30 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-muted-foreground transition-colors duration-200 hover:border-[#00ff88]/50 hover:text-[#00ff88]"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Post
      </a>

      {/* Reddit */}
      <a
        href={`https://reddit.com/submit?url=${encodeURIComponent(SITE_URL)}&title=${encodeURIComponent(SITE_TITLE)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 rounded-sm border border-border/30 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-muted-foreground transition-colors duration-200 hover:border-[#00ff88]/50 hover:text-[#00ff88]"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
        </svg>
        Share
      </a>

      {/* LinkedIn */}
      <a
        href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SITE_URL)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 rounded-sm border border-border/30 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-muted-foreground transition-colors duration-200 hover:border-[#00ff88]/50 hover:text-[#00ff88]"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        Post
      </a>

      {/* Telegram */}
      <a
        href={`https://t.me/share/url?url=${encodeURIComponent(SITE_URL)}&text=${encodeURIComponent(SITE_TITLE)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 rounded-sm border border-border/30 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-muted-foreground transition-colors duration-200 hover:border-[#00ff88]/50 hover:text-[#00ff88]"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
        Send
      </a>

      {/* Copy */}
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1 rounded-sm border border-border/30 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-muted-foreground transition-colors duration-200 hover:border-[#00ff88]/50 hover:text-[#00ff88]"
      >
        {copied ? (
          <>
            <Check size={14} strokeWidth={1.5} />
            Copied
          </>
        ) : (
          <>
            <Copy size={14} strokeWidth={1.5} />
            Copy
          </>
        )}
      </button>

      {/* Mobile Share - lg:hidden */}
      <button
        onClick={handleWebShare}
        className="inline-flex items-center gap-1 rounded-sm border border-border/30 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-muted-foreground transition-colors duration-200 hover:border-[#00ff88]/50 hover:text-[#00ff88] lg:hidden"
      >
        <Share2 size={14} strokeWidth={1.5} />
        Share
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

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SITE_URL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('[v0] Failed to copy:', err)
    }
  }

  const handleWebShare = async () => {
    // Check if Web Share API is available and can share
    if (navigator.share && navigator.canShare) {
      const shareData = {
        title: SITE_TITLE,
        text: TWEET_TEXT,
        url: SITE_URL,
      }
      
      // Verify the data can be shared
      if (navigator.canShare(shareData)) {
        try {
          await navigator.share(shareData)
        } catch (err) {
          // AbortError means user cancelled, which is fine
          if ((err as Error).name !== 'AbortError') {
            console.error('[v0] Share failed:', err)
            // Fallback to copy on any other error
            handleCopy()
          }
        }
      } else {
        // If can't share this data, fallback to copy
        handleCopy()
      }
    } else {
      // Web Share API not available, fallback to copy
      handleCopy()
    }
  }

  return (
    <aside
      className={`fixed left-0 top-1/2 z-50 hidden -translate-y-1/2 transition-opacity duration-300 lg:block ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col gap-3 rounded-r-lg border-r border-border/30 bg-card/80 px-1.5 py-3 backdrop-blur-sm">
        {/* GitHub */}
        <a
          href="https://github.com/theaimuseum"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-muted-foreground transition-colors hover:text-[#00ff88]"
          title="Star on GitHub"
        >
          <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>

        {/* X/Twitter */}
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(TWEET_TEXT)}&url=${encodeURIComponent(SITE_URL)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-muted-foreground transition-colors hover:text-[#00ff88]"
          title="Post on X"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>

        {/* Share2 */}
        <button
          onClick={handleWebShare}
          className="p-2 text-muted-foreground transition-colors hover:text-[#00ff88]"
          title="Share"
        >
          <Share2 size={20} strokeWidth={1.5} />
        </button>

        {/* Copy */}
        <button
          onClick={handleCopy}
          className="p-2 text-muted-foreground transition-colors hover:text-[#00ff88]"
          title={copied ? 'Copied!' : 'Copy URL'}
        >
          {copied ? <Check size={20} strokeWidth={1.5} /> : <Copy size={20} strokeWidth={1.5} />}
        </button>
      </div>
    </aside>
  )
}
