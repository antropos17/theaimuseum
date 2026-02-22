## [0.7.0] - 2026-02-22

### Added
- 15 new AI models (total 40): DeepSeek R1, GPT-5, Claude Opus 4, Gemini 3 Pro, etc.
- Real company valuations (OpenAI $300B, Anthropic $183B, xAI $230B)
- Neo-8-Bit text logos for companies
- 5 new memes (DeepSeek $593B crash, Anthropic Superbowl, etc.)
- Updated leaderboard - GPT-5.2 Pro #1 at 96/100
- Phosphor cursor trail (CRT green glow)
- Konami code easter egg
- Virus scan terminal loader
- app/template.tsx

### Changed
- Tailwind CSS 4.0 -> 4.2.0
- 25 -> 40 exhibits across all pages and Schema.org
- 1950-2025 -> 1950-2026

### Fixed
- Schema.org JSON-LD: 25->40 exhibits
- data/models.ts: duplicate slug collisions (sora, deepseek)
- battles-view.tsx: stable unique keys, deduplicated option labels
- pnpm-lock.yaml sync

### Known Issues
- ESLint config incompatible with current CLI version
- metadataBase not set in metadata
- next.config.mjs has deprecated eslint key
