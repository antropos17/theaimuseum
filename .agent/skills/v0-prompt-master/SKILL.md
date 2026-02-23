---
name: v0-prompting
description: Generate optimized prompts for v0.dev. Triggers on "промпт для v0", "сделай в v0", "v0 component", "UI компонент для v0". Reads project context, design system, and outputs a focused 50-150 word prompt ready to paste.
---

# v0 Prompt Generator

## Why
v0.dev works best with short, precise prompts. Long prompts waste tokens and confuse generation. This skill reads your actual codebase and produces a prompt that hits first try.

## Process
1. Read package.json — detect framework (say "Next.js App Router", NEVER hardcode version)
2. Read globals.css + tailwind.config — extract design tokens (colors, fonts, spacing)
3. Read the target component/page if it exists — understand current structure
4. Read museum-context skill if available — understand project domain
5. Generate prompt: 50-150 words, one component per prompt

## Prompt Structure
Create [what].
Tech: [framework] + Tailwind + TypeScript.
Design: [bg color, accent, font, aesthetic from project].
Layout: [specific layout requirements].
Must: [3-5 key requirements].
Must NOT: [2-3 anti-patterns to avoid].
Single file, no external deps.

## Rules
- NEVER hardcode versions — detect from package.json
- Reference actual project design tokens, not generic ones
- One prompt = one component. Never batch multiple
- Max 150 words. Shorter is better
- Include "Must NOT" section — prevents common v0 mistakes
- If user gives vague request — read existing similar components first, then generate

## Examples

### Good prompt (from AI Museum context)
"Create a model comparison card. Next.js App Router + Tailwind + TypeScript. Dark bg #0a0a0f, accent #00ff88, font-mono. Card shows two AI models side by side with name, capability score as progress bar, company logo, and year. Hover: green glow border. Must: responsive, accessible, use CSS grid. Must NOT: use external icon libraries, add animations, exceed 200 lines. Single file."

### Bad prompt (too vague)
"Make a nice card for AI models with cool effects"
