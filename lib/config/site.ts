export const siteConfig = {
  name: 'The AI Museum',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://v0-theaimuseum.vercel.app',
  description:
    "Explore 76 years of AI history through interactive exhibits spanning 1950-2026. From Turing's foundational work to modern large language models like GPT and ChatGPT. Learn about machine learning, neural networks, deep learning, computer vision, NLP, and the evolution of artificial intelligence through engaging timelines, simulators, quizzes, and the AI Graveyard of discontinued projects.",
  shortDescription:
    'Explore 76 years of AI history through interactive exhibits spanning 1950-2026.',
  ogImage: '/api/og',
  twitter: {
    handle: '@theaimuseum',
    card: 'summary_large_image' as const,
  },
  github: 'https://github.com/antropos17/theaimuseum',
} as const
