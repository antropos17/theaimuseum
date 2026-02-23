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

## Data Files (lib/data/ — split into modules)
- models.ts — 40+ AI systems with full metadata
- companies.ts — OpenAI, Google, Anthropic, Meta, xAI
- memes.ts — 13 meme events
- predictions.ts — 5 expert predictions
- victims.ts — 5 disrupted job categories
- graveyard.ts — 6 discontinued AI projects
- stickers.ts — 12 passport stickers
- index.ts — barrel re-exports all data
- README.md — data layer docs

Types defined in lib/types/models.ts — AIModel is the core interface.

## Current Status
- Version: 0.8.0-dev
- PR #5 merged: data monolith split into 9 files — done
- 56 static pages | 31 Shadcn UI components

## Key Numbers
- 40+ AI models | 76 years (1950-2026) | $202.3B global AI investment 2025

## 3D Stack
React Three Fiber + Drei. Always `use client` + dynamic import.
CSS fallback required for every 3D component. Mobile: simplified or disabled.
