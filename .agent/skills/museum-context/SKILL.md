---
name: museum-context
description: Use when working on The AI Museum. Contains page structure, design tokens, data file locations, and current project status. Triggers on any museum-related work, page editing, content updates, or when you need to understand the project structure.
---

# AI Museum Context

## Pages
/, /battles, /evolution, /explore, /graveyard, /leaderboard, /memes, /passport, /predictions, /quiz, /simulator, /victims, /model/[slug] (40+ models), /_not-found (BSOD 404)

## Design Tokens
BG: #0a0a0f | Accent: #00ff88 | Glow: box-shadow 0 0 20px rgba(0,255,136,0.3)
Font: JetBrains Mono | CRT scanlines: repeating-linear-gradient
Dark theme ONLY. No light mode.

## Data Files
All content lives in lib/data/models.ts (monolith, 2098 lines):
- models[] — 40+ AI systems with full metadata
- companies[] — OpenAI, Google, Anthropic, Meta, xAI
- memes[] — 13 meme events
- predictions[] — 5 expert predictions
- victims[] — 5 disrupted job categories
- graveyard[] — 6 discontinued AI projects
- stickers[] — 12 passport stickers

Types defined in lib/types/models.ts — AIModel is the core interface.

## Key Numbers
- 40+ AI models | 76 years (1950-2026) | $202.3B global AI investment 2025
- 55 static pages | 31 Shadcn UI components

## 3D Stack
React Three Fiber + Drei. Always `use client` + dynamic import.
CSS fallback required for every 3D component. Mobile: simplified or disabled.
