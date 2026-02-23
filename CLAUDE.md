# AI Museum

Interactive encyclopedia of AI history. Neo-8-Bit CRT aesthetic.
Site: v0-theaimuseum.vercel.app | Repo: github.com/antropos17/theaimuseum

## Commands
- `pnpm dev`: Start dev server (Turbopack)
- `pnpm build`: Production build — run after every change, must pass with 0 errors
- `pnpm lint`: ESLint check — 0 warnings expected

## Stack
Read package.json for exact versions. NEVER hardcode version numbers.
Next.js (App Router), React, TypeScript strict, Tailwind, pnpm ONLY.
3D: React Three Fiber + Drei + Three.js. Animation: GSAP + Framer Motion.
State: Zustand. UI: Radix + Shadcn. OS: Windows — use `;` not `&&` in terminal.

## Code Style
- Server Components by default. Add `use client` only when needed (events, hooks, browser APIs).
- Dynamic imports for heavy libs: `dynamic(() => import(...), { ssr: false })`.
- TypeScript strict. No `any` — use `unknown` and narrow. Named exports.
- Early returns for errors, happy path last. Max 300 lines per file.
- Functional components only. Collocate types next to components.

## Design System
- BG: #0a0a0f | Accent: #00ff88 | Font: JetBrains Mono
- Dark theme ONLY. CRT scanlines, phosphor glow, retro terminal vibes.
- Use existing Shadcn components from components/ui/ before creating new ones.

## Project Map
- `app/` — Pages: /, /battles, /evolution, /explore, /graveyard, /leaderboard, /memes, /passport, /predictions, /quiz, /simulator, /victims, /model/[slug]
- `components/ui/` — Shadcn (31 components). Extend, don't duplicate.
- `components/layout/` — Nav, footer, theme, command palette
- `components/sections/` — Hero, halls-grid, newsletter, donation
- `components/effects/` — Channel-switch, phosphor-trail, virus-scan
- `components/3d/` — CRT monitor, neural background (R3F)
- `lib/data/models.ts` — ALL content data (2098 lines, monolith). Source of truth for models, companies, memes, predictions, victims, graveyard.
- `lib/types/models.ts` — AIModel interface. Source of truth for types.
- `lib/stores/store.ts` — Zustand global state
- `lib/hooks/` — Custom hooks (use-in-view, use-konami-code, etc.)

## Workflow
1. Read existing code before changing anything. Search for similar implementations first.
2. Extend existing files — don't create duplicates.
3. `pnpm build` must pass with 0 errors before any commit.
4. Small, focused commits: `type: concise description` (feat/fix/style/chore/refactor).
5. Feature branches: `feat/name`. Never force push main.
6. При использовании скилла — логируй: [SKILL: name] в начале ответа.

## Guardrails
- Don't suggest — implement. Don't ask "should I?" when the task is clear.
- Don't explain what you're about to do — just do it, then report what changed.
- Don't use npm (breaks lockfile) — use pnpm instead.
- Don't hardcode paths with usernames — detect from environment.
- Don't create files in project root — organize in appropriate subdirectories.
- Don't over-document — update existing docs, don't create new ones unless asked.

## Vercel
Team: team_HjsLixEYtiBw7bRX4NQyJ8hl
Project: prj_9FIFOFny7pjIgWjflVIVTFVM2hAF
Auto-deploys from main. Preview deploys from feature branches.

## Current Status
- 55 static pages, 40+ AI models tracked, 76 years (1950-2026)
- 3D CRT monitor (R3F + CSS fallback), boot sequence, channel switch nav
- PR #5 pending: split lib/data/models.ts monolith into 9 files
- Content update needed: valuations show $0B, need real data

## Skills
Read .claude/skills/ for domain knowledge when working on specific areas.
