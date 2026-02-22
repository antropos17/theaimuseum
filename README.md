# THE AI MUSEUM

**Interactive online museum documenting 75 years of artificial intelligence history (1950-2025)**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/antropos17/theaimuseum)

---

## OVERVIEW

The AI Museum is an immersive web experience that chronicles the evolution of artificial intelligence through 25+ historical exhibits spanning 10 themed wings. From the Turing Test to GPT-4, from ELIZA to AlphaFold, explore the breakthroughs, failures, scandals, and transformative moments that shaped modern AI.

**LIVE SITE:** [theaimuseum.com](https://theaimuseum.com)

---

## FEATURES

### [MAIN EXHIBITS]

- **AI Timeline** — Chronological journey through 75 years of AI history
- **Model Exhibits** — Deep dives into 25+ landmark AI systems with technical specs, examples, controversies, and cultural impact
- **Interactive Chat Simulator** — Experience conversations with historical AI systems from ELIZA (1966) to modern LLMs

### [INTERACTIVE HALLS]

- **AI Graveyard** — Memorial to discontinued AI products (Google Bard, Cortana, IBM Watson, etc.)
- **Corporate Battles** — Track the competitive dynamics between OpenAI, Google, Anthropic, Meta, and xAI
- **Meme Hall** — Archive of AI-generated viral moments and cultural phenomena
- **Job Displacement Tracker** — Monitor automation impact across industries
- **Prediction Scorecard** — Evaluate historical AI predictions against reality
- **AI IQ Quiz** — Test your knowledge of AI history
- **Model Leaderboard** — Rankings of AI systems by capability, hype, and safety
- **Digital Passport** — Collect achievement badges across museum exhibits

---

## TECH STACK

### [FRAMEWORK]

- **Next.js 16.1** — React framework with App Router
- **React 19.2** — Latest React with Server Components
- **TypeScript 5.7** — Type-safe development

### [STYLING]

- **Tailwind CSS 4.1** — Utility-first CSS framework
- **shadcn/ui** — Accessible component library
- **Custom Neo-8-Bit Design System** — CRT phosphor glow + retro terminal aesthetic

### [UI COMPONENTS]

- **Radix UI** — Unstyled accessible primitives
- **Lucide React** — Icon system
- **Recharts** — Data visualization
- **Sonner** — Toast notifications

### [DEPLOYMENT]

- **Vercel** — Hosting and serverless functions
- **Vercel Analytics** — Performance monitoring

---

## INSTALLATION

### [PREREQUISITES]

- Node.js 18+
- pnpm (recommended), npm, or yarn

### [LOCAL DEVELOPMENT]

```bash
# Clone the repository
git clone https://github.com/antropos17/theaimuseum.git
cd theaimuseum

# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

The app will be available at `http://localhost:3000`

---

## PROJECT STRUCTURE

```
theaimuseum/
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Landing page
│   ├── explore/             # Timeline exhibit
│   ├── simulator/           # Chat simulator
│   ├── graveyard/           # Discontinued AI products
│   ├── battles/             # Corporate competition tracker
│   ├── memes/               # AI meme archive
│   ├── victims/             # Job displacement tracker
│   ├── predictions/         # Prediction scorecard
│   ├── quiz/                # AI knowledge quiz
│   ├── leaderboard/         # Model rankings
│   ├── passport/            # Achievement system
│   ├── model/[slug]/        # Individual model exhibits
│   └── api/                 # API routes
├── components/              # React components
│   ├── landing/             # Homepage sections
│   ├── ui/                  # shadcn/ui components
│   └── [feature]/           # Feature-specific components
├── data/
│   └── models.ts            # AI model database (25+ exhibits)
├── hooks/                   # Custom React hooks
├── lib/
│   └── utils.ts             # Utility functions
└── public/                  # Static assets
```

---

## DESIGN SYSTEM

### [NEO-8-BIT CRT AESTHETIC]

The AI Museum uses a custom design system inspired by retro computing terminals and CRT phosphor displays:

**COLOR PALETTE:**

- Primary: `#00ff88` (phosphor green)
- Background: `#0a0a0f` (deep black)
- Amber: `#ffb800`
- Red: `#ff3366`
- Cyan: `#00d4ff`

**TYPOGRAPHY:**

- UI: `JetBrains Mono` (monospace)
- Body: `Inter` (sans-serif)

**VISUAL EFFECTS:**

- CRT scanlines overlay
- Phosphor glow on text and borders
- Terminal-style dashed borders
- Glass morphism cards with backdrop blur
- Retro window chrome with colored dots

**INTERACTION PATTERNS:**

- Hover: Border color shifts to `#00ff88` with glow
- Focus: 2px outline with offset
- Active: Scale down to 0.97
- Terminal prefix: `>` on interactive elements
- Uppercase headers with bracket labels `[SECTION]`

---

## DATA STRUCTURE

Each AI model exhibit includes:

```typescript
interface AIModel {
  id: string // Unique identifier
  slug: string // URL-friendly name
  name: string // Display name
  year: number // Release year
  era: string // Historical period
  category: string // Type (chatbot, image, game, etc.)
  status: string // active | historic | declining
  open: boolean // Open source?
  color: string // Brand color
  creator: string // Organization/person
  params: string // Model size/architecture
  cost: string // Training/operation cost
  capability: number // Technical capability score (0-100)
  hype: number // Public hype score (0-100)
  safety: number // Safety alignment score (0-100)
  description: string // Historical narrative
  example: string // Demonstration output
  opinions: Array // Expert/public opinions
  bugs: Array // Known issues and controversies
  media: Array // Papers, videos, links
  lineage: Array // Parent models/influences
  stickers: Object // Achievement badges
}
```

---

## API ROUTES

### Newsletter Subscription

```
POST /api/newsletter
Body: { email: string }
```

### Open Graph Images

```
GET /api/og
Query: { title, subtitle }
```

---

## CONTRIBUTING

We welcome contributions! Areas of interest:

- **Content:** Add more AI models, historical events, and exhibits
- **Features:** Implement new interactive experiences
- **Design:** Enhance the Neo-8-Bit aesthetic
- **Data:** Improve accuracy of historical information
- **Accessibility:** Ensure WCAG compliance

### [DEVELOPMENT GUIDELINES]

**DESIGN RULES:**

- Maintain Neo-8-Bit terminal aesthetic (do NOT remove CRT effects)
- Use JetBrains Mono for UI, Inter for body text
- Icons: Lucide React only (14px, strokeWidth 1.5)
- Text sizing: 10px labels, 11px mono UI, 12px body
- All new elements MUST match retro/terminal style

**CODE RULES:**

- TypeScript strict mode — no `any` types
- Server Components by default, `"use client"` only when necessary
- Follow existing patterns in codebase
- Write complete code — no placeholder comments
- Keep responses concise

---

## DEPLOYMENT

### [VERCEL (RECOMMENDED)]

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/antropos17/theaimuseum)

### [MANUAL DEPLOYMENT]

```bash
# Build
pnpm build

# Output will be in .next/ folder
# Deploy to any hosting provider that supports Next.js
```

---

## LICENSE

MIT License — see LICENSE file for details

---

## CREDITS

**CREATED BY:** antropos17  
**FRAMEWORK:** Next.js (Vercel)  
**DESIGN SYSTEM:** Custom Neo-8-Bit CRT aesthetic  
**ICONS:** Lucide React  
**COMPONENTS:** shadcn/ui + Radix UI

---

## CONTACT

**GitHub:** [antropos17/theaimuseum](https://github.com/antropos17/theaimuseum)  
**Issues:** [Report bugs or request features](https://github.com/antropos17/theaimuseum/issues)

---

**[SYSTEM INITIALIZED]**  
**[MUSEUM STATUS: OPERATIONAL]**  
**[EXHIBITS: 25+ MODELS]**  
**[TIMELINE: 1950-2025]**  
**[VISITORS: TRACKING...]**

`> EXPLORE THE HISTORY OF ARTIFICIAL INTELLIGENCE`
