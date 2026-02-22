---
name: museum-context
description: Full context for The AI Museum project. Use whenever working on this codebase — provides stack, design system, file structure, component rules, and data model so no context needs to be repeated. Triggers on any code task in this project.
---

# The AI Museum — Project Context

## Project Identity

- **URL**: https://v0-theaimuseum.vercel.app
- **GitHub**: https://github.com/antropos17/theaimuseum
- **Vercel project**: `v0-ai-museum-build`
- **Purpose**: Interactive encyclopedia of AI history — 25 AI systems across 10 wing-pages

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict — no `any`) |
| Styling | Tailwind CSS v4 |
| React | React 19 |
| Components | shadcn/ui primitives (`components/ui/`) |
| Icons | **Lucide React only** — never emoji in UI |
| Deploy | Vercel |

## Design System — "Neo-8-Bit"

**Aesthetic**: CRT phosphor terminal + glassmorphism

### Core Tokens

```css
--background: #0a0a0f      /* dark canvas */
--primary:    #00ff88      /* phosphor green accent */
--card:       #111116
--border:     approx #2a2a35
--radius:     0px          /* sharp corners everywhere */
```

### Typography

- `font-mono` / `JetBrains Mono` — all UI labels, terminal chrome, code
- `Inter` — body prose only
- Sizes: `text-[10px]` labels · `text-[11px]` mono UI · `text-xs` body mono

### Glass/Surface Pattern

```tsx
className="bg-card/30 backdrop-blur-sm border border-border/50"
```

### CRT Effects (preserve always)

- `phosphor-glow` — green text glow
- `crt-overlay` + `crt-vignette` — scanlines/vignette, always `aria-hidden`
- `crt-text` — phosphor text effect

### UI Grammar Rules

| Element | Convention |
|---------|------------|
| Interactive prefix | `>` before clickable items |
| Section labels | `[LABEL]` bracket format |
| App/tool names | `.exe` suffix |
| Terminal chrome | Red · Yellow · Green dots + mono label |
| Borders default | `border-border` solid |
| Borders interactive | `border-dashed` |
| Borders hover | `border-primary/30` |

**Never**: emoji in UI, `border-radius > 0`, non-Lucide icons.

## File Structure

```
app/
  page.tsx                  — Landing (главная)
  layout.tsx                — Root layout (не трогать без запроса)
  globals.css               — Design tokens + CRT utilities
  explore/page.tsx          — Wing: каталог всех 25 моделей
  simulator/page.tsx        — Wing: симулятор диалогов
  evolution/page.tsx        — Wing: таймлайн эволюции ИИ
  graveyard/page.tsx        — Wing: устаревшие модели
  battles/page.tsx          — Wing: сравнение моделей
  memes/page.tsx            — Wing: мемы об ИИ
  victims/page.tsx          — Wing: жертвы автоматизации
  predictions/page.tsx      — Wing: предсказания
  quiz/page.tsx             — Wing: викторина
  leaderboard/page.tsx      — Wing: рейтинг
  model/[id]/page.tsx       — Динамическая страница модели
  passport/page.tsx         — AI паспорт пользователя

components/
  landing/                  — Компоненты главной страницы
  museum-nav.tsx            — Глобальная навигация
  museum-footer.tsx         — Глобальный футер
  command-palette.tsx       — Cmd+K палитра команд
  theme-provider.tsx        — Dark theme wrapper
  ui/                       — shadcn примитивы (НЕ ТРОГАТЬ)
  [wing]/                   — Компоненты каждого крыла
```

## Data Model (`data/models.ts`)

```typescript
interface AIModel {
  id: string           // уникальный slug для роутинга
  slug: string
  name: string
  year: number
  era: string
  category: "chatbot" | "image" | "video" | "music" | "code" | "game" | "concept" | "science"
  status: "active" | "historic" | "declining"
  open: boolean        // open source?
  color: string        // hex accent цвет модели
  creator: string
  params: string       // "175B", "Unknown", etc.
  cost: string
  capability: number   // 0–100
  hype: number         // 0–100
  safety: number       // 0–100
  description: string
  example: string
  opinions: { sentiment: "+" | "-"; text: string; source: string; url?: string }[]
  bugs: { text: string; severity: string }[]
  media: { type: "paper" | "yt" | "link"; title: string; url: string }[]
  lineage: string[]    // id предшественников
  stickers: Record<string, number>
}
```

25 моделей — от `"turing"` (1950) до современных.

## Coding Rules

1. **TypeScript strict** — типизируй все пропсы и state явно
2. **Max 300 строк** на компонент — при превышении предложи разбить
3. **Не трогай** `components/ui/`, `app/layout.tsx` без явного запроса
4. **Preserve** все CRT-эффекты и анимации при любых изменениях
5. Комментарии — только на нетривиальной логике (анимации, state-машины)

## После каждого изменения

Напомни проверить на `localhost:3000` и предложи коммит:
```
git add -A && git commit -m "feat/fix/style: описание"
```
