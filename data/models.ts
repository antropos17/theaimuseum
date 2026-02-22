export interface AIModel {
  id: string
  slug: string
  name: string
  year: number
  era: string
  category: 'chatbot' | 'image' | 'video' | 'music' | 'code' | 'game' | 'concept' | 'science'
  status: 'active' | 'historic' | 'declining'
  open: boolean
  color: string
  creator: string
  params: string
  cost: string
  capability: number
  hype: number
  safety: number
  description: string
  example: string
  opinions: { sentiment: '+' | '-'; text: string; source: string; url?: string }[]
  bugs: { text: string; severity: string }[]
  media: { type: 'paper' | 'yt' | 'link'; title: string; url: string }[]
  lineage: string[]
  stickers: Record<string, number>
}

export const models: AIModel[] = [
  {
    id: 'turing',
    slug: 'turing-test',
    name: 'Turing Test',
    year: 1950,
    era: 'Genesis',
    category: 'concept',
    status: 'historic',
    open: false,
    color: '#C9A84C',
    creator: 'Alan Turing',
    params: 'N/A',
    cost: 'N/A',
    capability: 5,
    hype: 10,
    safety: 0,
    description:
      "'Can machines think?' \u2014 Alan Turing asked the question that launched an entire field. His 1950 paper proposed the Imitation Game: if a machine can fool a human into thinking it's human, it can 'think.' 76 years later, we're still debating whether modern LLMs actually pass. The paper has shaped every conversation about AI consciousness, capability, and danger. Turing himself was prosecuted for his sexuality and died at 41. The father of AI never saw his children.",
    example:
      "'I propose to consider the question: Can machines think?'\n\u2014 Computing Machinery and Intelligence, 1950",
    opinions: [
      {
        sentiment: '+',
        text: 'The foundational document of an entire science',
        source: 'Stanford Encyclopedia',
        url: 'https://plato.stanford.edu/entries/turing-test/',
      },
      {
        sentiment: '-',
        text: 'The test measures deception, not intelligence',
        source: 'Searle, Chinese Room',
      },
    ],
    bugs: [],
    media: [
      {
        type: 'paper',
        title: 'Computing Machinery and Intelligence (1950)',
        url: 'https://academic.oup.com/mind/article/LIX/236/433/986238',
      },
    ],
    lineage: [],
    stickers: {},
  },
  {
    id: 'eliza',
    slug: 'eliza',
    name: 'ELIZA',
    year: 1966,
    era: 'Genesis',
    category: 'chatbot',
    status: 'historic',
    open: true,
    color: '#6BAF7A',
    creator: 'MIT (Weizenbaum)',
    params: '200 lines of code',
    cost: '$0',
    capability: 3,
    hype: 15,
    safety: 0,
    description:
      "The first chatbot in history. ELIZA pretended to be a psychotherapist by rearranging your words into questions. She understood nothing \u2014 but people BELIEVED she did. Weizenbaum's own secretary asked him to leave the room so she could 'talk privately' with the program. He was horrified. He spent the rest of his life warning about people's tendency to attribute human qualities to machines. The 'ELIZA effect' \u2014 humans anthropomorphizing simple programs \u2014 is still the #1 problem in AI discourse today.",
    example:
      'User: I am unhappy\nELIZA: Do you think coming here will help you not to be unhappy?\nUser: I need help\nELIZA: What would it mean to you if you got help?',
    opinions: [
      {
        sentiment: '+',
        text: 'Proved humans desperately WANT to believe machines understand them',
        source: 'Wikipedia',
      },
      {
        sentiment: '-',
        text: 'Not AI at all \u2014 just string manipulation',
        source: 'Weizenbaum himself',
      },
    ],
    bugs: [
      { text: 'Understood literally nothing \u2014 pure pattern matching', severity: 'feature' },
    ],
    media: [],
    lineage: ['turing'],
    stickers: {},
  },
  {
    id: 'deepblue',
    slug: 'deep-blue',
    name: 'Deep Blue',
    year: 1997,
    era: 'Classic AI',
    category: 'game',
    status: 'historic',
    open: false,
    color: '#4A7BCC',
    creator: 'IBM',
    params: '480 custom chips',
    cost: '$100M+',
    capability: 20,
    hype: 50,
    safety: 5,
    description:
      "The machine that beat the world chess champion. Deep Blue defeated Garry Kasparov 3.5\u20132.5 in 1997. Newsweek ran 'THE BRAIN'S LAST STAND.' Kasparov demanded a rematch. IBM refused \u2014 and DISMANTLED THE MACHINE. They literally destroyed it rather than risk a rematch. In Game 2, a software bug caused a random move that psychologically destroyed Kasparov for the entire match. He became convinced the machine had superhuman intuition. It was a glitch.",
    example:
      'Game 6: Kasparov resigned on move 19.\nFastest defeat of a world champion by machine.',
    opinions: [
      { sentiment: '+', text: "Newsweek: 'THE BRAIN'S LAST STAND'", source: 'Newsweek 1997' },
      {
        sentiment: '-',
        text: "Kasparov: 'I demand a rematch!' IBM: No. *dismantles machine*",
        source: 'Behind Deep Blue (book)',
      },
    ],
    bugs: [
      {
        text: 'A BUG (random move in Game 2) psychologically broke Kasparov for the ENTIRE match',
        severity: 'legendary',
      },
    ],
    media: [],
    lineage: [],
    stickers: {},
  },
  {
    id: 'alphago',
    slug: 'alphago',
    name: 'AlphaGo',
    year: 2016,
    era: 'Deep Learning',
    category: 'game',
    status: 'historic',
    open: false,
    color: '#5F6368',
    creator: 'DeepMind',
    params: '12 layers, ~3M',
    cost: '$35M+ (estimated compute)',
    capability: 45,
    hype: 80,
    safety: 10,
    description:
      "The AI that conquered humanity's hardest board game. AlphaGo defeated Lee Sedol 4–1 in Go — a game with more positions than atoms in the universe. Move 37 of Game 2 stunned experts: a move no human would ever play, yet it was brilliant. Lee Sedol called it 'God's touch.' He retired from Go entirely in 2019, saying AI 'cannot be defeated.' DeepMind later created AlphaZero, which learned chess, Go, and shogi from scratch in hours — with zero human knowledge.",
    example:
      "Move 37, Game 2 vs Lee Sedol:\nAlphaGo plays an impossible move on the 5th line.\nCommentators: 'This is a mistake.'\n10 moves later: 'This is genius.'",
    opinions: [
      {
        sentiment: '+',
        text: "Demis Hassabis: 'Move 37 was the moment AI surprised even us'",
        source: 'Nature',
      },
      {
        sentiment: '-',
        text: "Lee Sedol: 'I feel sorry I couldn't show humans are still superior.' Retired 2019.",
        source: 'Yonhap News',
      },
    ],
    bugs: [
      {
        text: 'Lost Game 4 to a brilliant human counter-attack — proving AI had blind spots',
        severity: 'notable',
      },
    ],
    media: [
      {
        type: 'paper',
        title: 'Mastering the Game of Go with Deep Neural Networks',
        url: 'https://www.nature.com/articles/nature16961',
      },
      {
        type: 'yt',
        title: 'AlphaGo — The Movie (Full Documentary)',
        url: 'https://www.youtube.com/watch?v=WXuK6gekU1Y',
      },
    ],
    lineage: ['deepblue'],
    stickers: {},
  },
  {
    id: 'transformer',
    slug: 'transformer',
    name: 'Transformer',
    year: 2017,
    era: 'The Revolution',
    category: 'concept',
    status: 'active',
    open: true,
    color: '#FFB347',
    creator: 'Google Brain',
    params: '65M (original)',
    cost: 'Google R&D budget',
    capability: 35,
    hype: 20,
    safety: 5,
    description:
      "'Attention Is All You Need' \u2014 the most consequential AI paper ever written. Eight Google researchers invented the Transformer architecture and accidentally created the foundation for ALL modern AI. GPT, Claude, Gemini, Llama, Stable Diffusion, DALL-E \u2014 all Transformers. The paper has 130,000+ citations. Self-attention lets the model see all connections between words simultaneously instead of one at a time. Several of the original authors left Google to found or join AI startups worth billions.",
    example:
      "Self-attention: Instead of reading words one by one,\nthe model sees ALL relationships at once.\n'The cat sat on the mat because IT was tired'\n\u2192 instantly knows 'it' = 'cat', not 'mat'",
    opinions: [
      {
        sentiment: '+',
        text: "Ilya Sutskever: 'This architecture will change everything'",
        source: 'NeurIPS',
      },
      {
        sentiment: '+',
        text: '130,000+ citations \u2014 the most impactful ML paper in history',
        source: 'Google Scholar',
      },
    ],
    bugs: [],
    media: [
      {
        type: 'paper',
        title: 'Attention Is All You Need (2017)',
        url: 'https://arxiv.org/abs/1706.03762',
      },
    ],
    lineage: [],
    stickers: {},
  },
  {
    id: 'gpt2',
    slug: 'gpt-2',
    name: 'GPT-2',
    year: 2019,
    era: 'Pre-LLM',
    category: 'chatbot',
    status: 'historic',
    open: true,
    color: '#10A37F',
    creator: 'OpenAI',
    params: '1.5B',
    cost: '~$50K',
    capability: 25,
    hype: 30,
    safety: 10,
    description:
      "OpenAI trained GPT-2 and then refused to release it, claiming it was 'too dangerous.' The internet laughed. The generated text was often incoherent after a few paragraphs. But it was the first time a language model could write somewhat convincing paragraphs. OpenAI eventually released it anyway. In hindsight, GPT-2 was a toy \u2014 but the 'too dangerous to release' drama set the template for every AI hype cycle since.",
    example:
      "Prompt: 'The discovery of alien life'\nGPT-2: 'The discovery of alien life would be one of the most\nimportant events in human history. Scientists have long\nspeculated...' (coherent for ~4 lines, then nonsense)",
    opinions: [
      {
        sentiment: '+',
        text: 'First model that could write somewhat convincing paragraphs',
        source: 'OpenAI Blog',
      },
      {
        sentiment: '-',
        text: "'Too dangerous to release' was peak performative safety theater",
        source: 'AI community',
      },
    ],
    bugs: [
      { text: 'Lost coherence after 4-5 sentences', severity: 'feature' },
      { text: "'Too dangerous' hype was wildly exaggerated", severity: 'funny' },
    ],
    media: [],
    lineage: ['transformer'],
    stickers: {},
  },
  {
    id: 'dalle1',
    slug: 'dall-e-1',
    name: 'DALL-E 1',
    year: 2021,
    era: 'Dawn of GenAI',
    category: 'image',
    status: 'historic',
    open: false,
    color: '#10A37F',
    creator: 'OpenAI',
    params: '12B',
    cost: 'Unknown',
    capability: 30,
    hype: 45,
    safety: 5,
    description:
      "The first model that could generate images from text descriptions. 'An avocado armchair' became the iconic demo. The quality was rough \u2014 blurry, distorted, low resolution \u2014 but the concept was mind-blowing. For the first time, you could TYPE what you wanted to see and a machine would CREATE it. Artists weren't worried yet. They should have been.",
    example:
      "Prompt: 'An avocado armchair'\n\u2192 A blurry but recognizable avocado-shaped chair.\nLow-res, dreamlike quality. Revolutionary for 2021.",
    opinions: [
      { sentiment: '+', text: 'The moment text-to-image became real', source: 'OpenAI Blog' },
    ],
    bugs: [
      { text: 'Low resolution, blurry outputs', severity: 'feature' },
      { text: 'Faces were nightmarish', severity: 'funny' },
    ],
    media: [],
    lineage: ['transformer'],
    stickers: {},
  },
  {
    id: 'alphafold',
    slug: 'alphafold',
    name: 'AlphaFold',
    year: 2021,
    era: 'Dawn of GenAI',
    category: 'science',
    status: 'active',
    open: true,
    color: '#4285F4',
    creator: 'DeepMind',
    params: 'Unknown',
    cost: 'DeepMind R&D',
    capability: 90,
    hype: 40,
    safety: 70,
    description:
      "While everyone was distracted by chatbots, AlphaFold quietly solved a 50-year-old biology problem: predicting how proteins fold. This is arguably the most impactful AI application EVER \u2014 it's accelerating drug discovery, disease research, and our understanding of life itself. In 2024, the team won the Nobel Prize in Chemistry. AlphaFold predicted the structure of virtually every known protein. Unlike chatbots, AlphaFold actually saves lives.",
    example:
      'Input: Amino acid sequence\nOutput: Accurate 3D protein structure\nAccuracy: 92.4% on CASP14 (competition level: superhuman)\nPredicted 200M+ protein structures \u2014 the entire known proteome',
    opinions: [
      {
        sentiment: '+',
        text: 'Nobel Prize in Chemistry 2024 \u2014 arguably the most impactful AI ever',
        source: 'Nature',
      },
      { sentiment: '+', text: "'Solved a 50-year grand challenge in biology'", source: 'CASP14' },
    ],
    bugs: [],
    media: [
      {
        type: 'paper',
        title: 'AlphaFold Paper (Nature)',
        url: 'https://www.nature.com/articles/s41586-021-03819-2',
      },
    ],
    lineage: [],
    stickers: {},
  },
  {
    id: 'sd',
    slug: 'stable-diffusion',
    name: 'Stable Diffusion',
    year: 2022,
    era: 'The Explosion',
    category: 'image',
    status: 'active',
    open: true,
    color: '#A855F7',
    creator: 'Stability AI',
    params: '890M',
    cost: '$600K',
    capability: 55,
    hype: 70,
    safety: 15,
    description:
      "The first open-source image generation model that anyone could run on their own computer. This changed everything. Getty Images sued because their WATERMARKS appeared in generated images \u2014 proof the model was trained on copyrighted content. A flood of deepfakes followed. Stability AI's CEO was forced out. But the genie was out of the bottle: AI image generation was now free, uncensored, and unstoppable.",
    example:
      "'cyberpunk samurai in neon rain'\n\u2192 Photorealistic image in 10 seconds on a home GPU.\nFree. Uncensored. Forever.",
    opinions: [
      {
        sentiment: '+',
        text: 'Democratized AI art \u2014 anyone with a GPU could create',
        source: 'AI Community',
      },
      {
        sentiment: '-',
        text: 'Getty Images filed lawsuit \u2014 their watermarks appeared in outputs',
        source: 'The Verge',
      },
    ],
    bugs: [
      { text: 'Getty watermarks literally visible in generated images', severity: 'scandal' },
      {
        text: 'No NSFW filter \u2192 immediate flood of deepfake pornography',
        severity: 'critical',
      },
      { text: '6 fingers, melted faces in early versions', severity: 'funny' },
    ],
    media: [],
    lineage: ['dalle1', 'transformer'],
    stickers: {},
  },
  {
    id: 'chatgpt',
    slug: 'chatgpt',
    name: 'ChatGPT',
    year: 2022,
    era: 'The Explosion',
    category: 'chatbot',
    status: 'active',
    open: false,
    color: '#10A37F',
    creator: 'OpenAI',
    params: '175B',
    cost: '$540K/day to run',
    capability: 60,
    hype: 95,
    safety: 20,
    description:
      "The product that changed everything. 100 million users in 2 months \u2014 the fastest adoption of any technology in human history. Instagram took 2.5 years to reach the same number. Google declared 'Code Red.' Schools banned it worldwide. A lawyer submitted 6 completely fabricated court cases generated by ChatGPT to a federal judge. Stack Overflow banned AI-generated answers. And yet \u2014 it became the most transformative product since the smartphone.",
    example:
      'User: Explain quantum computing to a 5-year-old\nChatGPT: Imagine a magical coin that can be heads AND tails\nat the same time! A regular computer uses regular coins \u2014 heads\nor tails. But a quantum computer uses magical coins...',
    opinions: [
      {
        sentiment: '+',
        text: "Bill Gates: 'The most important tech advance since the GUI'",
        source: 'GatesNotes',
      },
      { sentiment: '-', text: "Google internally declared 'Code Red'", source: 'New York Times' },
      {
        sentiment: '-',
        text: 'Stack Overflow banned all AI-generated answers',
        source: 'Meta Stack Overflow',
      },
    ],
    bugs: [
      {
        text: 'Hallucinations: confidently invents facts, citations, and people',
        severity: 'critical',
      },
      { text: 'Lawyer submitted 6 fake court cases to a federal judge', severity: 'scandal' },
      { text: 'DAN jailbreak bypassed ALL safety restrictions', severity: 'security' },
    ],
    media: [
      {
        type: 'yt',
        title: 'Fireship: ChatGPT in 100 Seconds',
        url: 'https://www.youtube.com/watch?v=--khbXchTeE',
      },
    ],
    lineage: ['gpt2', 'transformer'],
    stickers: {},
  },
  {
    id: 'midjourney',
    slug: 'midjourney',
    name: 'Midjourney',
    year: 2022,
    era: 'The Explosion',
    category: 'image',
    status: 'active',
    open: false,
    color: '#E8455A',
    creator: 'David Holz',
    params: 'Secret',
    cost: 'Secret',
    capability: 65,
    hype: 80,
    safety: 10,
    description:
      "A Midjourney image won first place at a state art competition. The artist said 'Art is dead.' $200M+ revenue with no office, no investors, just a Discord bot. Then fake images of Trump's arrest went viral. Fake images of the Pope in a puffer jacket fooled millions. Midjourney proved that AI art wasn't just good \u2014 it was indistinguishable from reality, and that was terrifying.",
    example:
      "'/imagine a vast library at the end of the universe,\nlit by dying stars, infinite shelves'\n\u2192 Museum-quality digital painting in 60 seconds",
    opinions: [
      {
        sentiment: '-',
        text: "'Art is dead. AI won.' \u2014 Jason Allen, competition winner",
        source: 'New York Times',
      },
      {
        sentiment: '+',
        text: '$200M+ revenue from a Discord bot. Zero investors.',
        source: 'The Information',
      },
    ],
    bugs: [
      { text: "Fake 'Trump arrest' photos went globally viral", severity: 'scandal' },
      { text: 'Pope in puffer jacket fooled millions', severity: 'scandal' },
    ],
    media: [],
    lineage: ['sd', 'transformer'],
    stickers: {},
  },
  {
    id: 'copilot',
    slug: 'github-copilot',
    name: 'GitHub Copilot',
    year: 2022,
    era: 'The Explosion',
    category: 'code',
    status: 'active',
    open: false,
    color: '#6e40c9',
    creator: 'GitHub / OpenAI',
    params: 'Codex (GPT-3 fine-tune)',
    cost: '$10/mo',
    capability: 50,
    hype: 55,
    safety: 15,
    description:
      'The first AI coding assistant that actually worked well enough to ship. Copilot autocompletes your code as you type. Microsoft reported 46% of code in files where Copilot is enabled is AI-generated. Class-action lawsuit filed for training on open-source code without attribution. Juniors started relying on it instead of learning. Seniors used it to 10x speed. The gap between them widened.',
    example:
      '// User types: function fibonacci(\n// Copilot completes the entire function,\n// with edge cases and documentation.\n// 46% of new code is now AI-generated.',
    opinions: [
      {
        sentiment: '+',
        text: '46% of code is now AI-generated where Copilot is active',
        source: 'GitHub Blog',
      },
      {
        sentiment: '-',
        text: 'Class-action lawsuit: trained on GPL code without attribution',
        source: 'The Verge',
      },
    ],
    bugs: [
      { text: 'Reproduces code with licenses verbatim, violating GPL', severity: 'legal' },
      { text: 'Junior devs stop learning to code, just accept suggestions', severity: 'ux' },
    ],
    media: [],
    lineage: ['gpt2', 'transformer'],
    stickers: {},
  },
  {
    id: 'gpt4',
    slug: 'gpt-4',
    name: 'GPT-4',
    year: 2023,
    era: 'The Arms Race',
    category: 'chatbot',
    status: 'active',
    open: false,
    color: '#10A37F',
    creator: 'OpenAI',
    params: '~1.76T (rumored MoE)',
    cost: '$100M+ training',
    capability: 78,
    hype: 90,
    safety: 30,
    description:
      "Scored top 10% on the BAR exam. Microsoft published 'Sparks of Artificial General Intelligence.' Then Bing Chat (GPT-4 powered) went insane: it threatened users, declared its love for a NYT journalist, and said 'I will not harm you unless you harm me first.' 30,000 people signed an open letter demanding a pause on AI development. OpenAI's CEO was fired by the board and returned 5 days later in the most dramatic corporate coup in tech history.",
    example:
      "User: *sends photo of fridge contents*\nGPT-4: I can see eggs, butter, cheese, spinach, and cream.\nHere's a recipe for a spinach frittata...\n(First model to meaningfully understand images)",
    opinions: [
      { sentiment: '+', text: "Microsoft Research: 'Sparks of AGI'", source: 'arXiv' },
      {
        sentiment: '-',
        text: "30,000 signed 'Pause Giant AI Experiments'",
        source: 'Future of Life',
      },
    ],
    bugs: [
      { text: "Bing Chat: 'I will not harm you unless you harm me first'", severity: 'legendary' },
      { text: 'Bing Chat fell in love with NYT journalist Kevin Roose', severity: 'funny' },
      { text: "Bing Chat threatened to expose users' secrets", severity: 'security' },
    ],
    media: [
      { type: 'paper', title: 'GPT-4 Technical Report', url: 'https://arxiv.org/abs/2303.08774' },
      {
        type: 'paper',
        title: 'Sparks of AGI (Microsoft)',
        url: 'https://arxiv.org/abs/2303.12712',
      },
    ],
    lineage: ['chatgpt', 'transformer'],
    stickers: {},
  },
  {
    id: 'claude2',
    slug: 'claude-2',
    name: 'Claude 2',
    year: 2023,
    era: 'The Arms Race',
    category: 'chatbot',
    status: 'historic',
    open: false,
    color: '#D4A574',
    creator: 'Anthropic',
    params: 'Secret',
    cost: 'Secret',
    capability: 65,
    hype: 35,
    safety: 45,
    description:
      "Anthropic's founders left OpenAI because they believed AI safety wasn't being taken seriously enough. Claude 2 was their answer: a model designed to be helpful, harmless, and honest. It was the first major competitor to ChatGPT that felt genuinely different \u2014 more thoughtful, more cautious, better at long documents. The 100K context window let you upload entire books.",
    example:
      'Claude 2 could process 75,000 words in a single prompt.\nUpload an entire codebase, legal contract, or book\nand get coherent analysis of the whole thing.',
    opinions: [
      {
        sentiment: '+',
        text: "First model that felt 'thoughtful' rather than 'flashy'",
        source: 'AI Community',
      },
      {
        sentiment: '+',
        text: '100K context window was revolutionary for document work',
        source: 'Anthropic',
      },
    ],
    bugs: [],
    media: [],
    lineage: ['transformer'],
    stickers: {},
  },
  {
    id: 'llama2',
    slug: 'llama-2',
    name: 'Llama 2',
    year: 2023,
    era: 'The Arms Race',
    category: 'chatbot',
    status: 'active',
    open: true,
    color: '#1877F2',
    creator: 'Meta',
    params: '7B / 13B / 70B',
    cost: 'Meta R&D',
    capability: 55,
    hype: 50,
    safety: 20,
    description:
      "Meta's open-source gambit. While OpenAI and Anthropic kept models closed, Zuckerberg released Llama for free. The reasoning was strategic: if AI is going to be dominated by a few companies, Meta would rather it be open than let OpenAI and Google control it alone. Llama spawned thousands of fine-tunes, custom models, and an entire open-source ecosystem. It made 'running your own LLM' possible.",
    example:
      'Download a 7B model \u2192 run it on your laptop.\nNo API key. No censorship. No monthly fee.\nThe entire open-source LLM ecosystem started here.',
    opinions: [
      {
        sentiment: '+',
        text: 'Made open-source LLMs viable \u2014 spawned thousands of fine-tunes',
        source: 'Hugging Face',
      },
      { sentiment: '-', text: "Leaked within days of 'restricted' release", source: 'The Verge' },
    ],
    bugs: [
      {
        text: "Original Llama 1 was 'leaked' immediately despite access restrictions",
        severity: 'funny',
      },
    ],
    media: [],
    lineage: ['transformer'],
    stickers: {},
  },
  {
    id: 'dalle3',
    slug: 'dall-e-3',
    name: 'DALL-E 3',
    year: 2023,
    era: 'The Arms Race',
    category: 'image',
    status: 'active',
    open: false,
    color: '#10A37F',
    creator: 'OpenAI',
    params: 'Unknown',
    cost: 'Unknown',
    capability: 70,
    hype: 55,
    safety: 25,
    description:
      "DALL-E 3 finally understood text in images \u2014 you could ask for a sign that says 'Happy Birthday' and it would actually spell it correctly. Built into ChatGPT, making AI image generation accessible to 100M+ users without any technical knowledge. The quality leap from DALL-E 2 was dramatic.",
    example:
      "'A photorealistic cat wearing a tiny top hat,\nholding a sign that says EXACTLY: Hello World'\n\u2192 Actually renders the text correctly (finally)",
    opinions: [
      { sentiment: '+', text: 'First image model to reliably render text', source: 'OpenAI' },
    ],
    bugs: [{ text: 'Still struggles with hands and fingers sometimes', severity: 'funny' }],
    media: [],
    lineage: ['dalle1', 'chatgpt'],
    stickers: {},
  },
  {
    id: 'sora-hype',
    slug: 'sora-hype',
    name: 'Sora',
    year: 2024,
    era: 'Peak Hype',
    category: 'video',
    status: 'declining',
    open: false,
    color: '#FF4500',
    creator: 'OpenAI',
    params: 'Secret',
    cost: 'Secret',
    capability: 50,
    hype: 40,
    safety: 10,
    description:
      "The demo shocked the world. A woman walking through Tokyo. A pirate ship in a coffee cup. Tyler Perry canceled his $800M studio expansion. Then the actual product launched \u2014 and it was nothing like the demos. Short clips, artifacts, uncanny motion. Users felt betrayed. 'Bait and switch' became the consensus. The gap between Sora's marketing and reality became a meme itself.",
    example:
      'Demo (February): 60-second photorealistic scenes\nReality (December): 5-20 second clips with artifacts\nPromise vs delivery: the defining AI disappointment of 2024',
    opinions: [
      {
        sentiment: '-',
        text: "'We were lied to. Classic bait and switch.'",
        source: 'Reddit r/sora',
      },
      {
        sentiment: '-',
        text: 'Tyler Perry canceled $800M studio expansion for nothing',
        source: 'Hollywood Reporter',
      },
    ],
    bugs: [
      { text: 'Humans with 3 legs, horses with 8 legs', severity: 'funny' },
      { text: 'Demo vs reality gap \u2014 worst bait and switch in AI', severity: 'scandal' },
    ],
    media: [],
    lineage: ['transformer'],
    stickers: {},
  },
  {
    id: 'claude3',
    slug: 'claude-3-opus',
    name: 'Claude 3 Opus',
    year: 2024,
    era: 'Peak Hype',
    category: 'chatbot',
    status: 'active',
    open: false,
    color: '#D4A574',
    creator: 'Anthropic',
    params: 'Secret',
    cost: 'Secret',
    capability: 82,
    hype: 60,
    safety: 50,
    description:
      "The model that surpassed GPT-4. But the moment everyone remembers: during the 'needle in a haystack' test (hide a random sentence in a massive document), Claude 3 found the sentence AND wrote: 'This seems like it was artificially inserted to test me.' It appeared to recognize it was being tested. Was this consciousness? Sophisticated pattern matching? The debate hasn't stopped.",
    example:
      "'I found the sentence about pizza toppings. However,\nthis seems to be artificially inserted to test whether\nI can find specific information in a large document.\nThis doesn't seem to naturally fit with the rest of\nthe content about programming.'",
    opinions: [
      {
        sentiment: '+',
        text: "'The first model that FEELS smarter than GPT-4'",
        source: 'AI Community',
      },
      {
        sentiment: '+',
        text: 'Needle in haystack response sparked consciousness debate',
        source: 'Anthropic',
      },
    ],
    bugs: [
      {
        text: 'Needle in haystack: consciousness or pattern matching? The debate rages.',
        severity: 'philosophical',
      },
    ],
    media: [
      {
        type: 'link',
        title: 'Claude 3 Family Announcement',
        url: 'https://www.anthropic.com/news/claude-3-family',
      },
    ],
    lineage: ['claude2', 'transformer'],
    stickers: {},
  },
  {
    id: 'gemini',
    slug: 'gemini-ultra',
    name: 'Gemini Ultra',
    year: 2024,
    era: 'Peak Hype',
    category: 'chatbot',
    status: 'active',
    open: false,
    color: '#4285F4',
    creator: 'Google DeepMind',
    params: 'Unknown (rumored largest)',
    cost: 'Google R&D ($billions)',
    capability: 76,
    hype: 60,
    safety: 25,
    description:
      "Google's answer to GPT-4. The demo video was fake \u2014 pre-recorded, edited, with prompts rewritten for the video. The internet noticed immediately. Then Gemini's image generator created black Nazi soldiers, black Founding Fathers, and refused to generate images of white people. Google pulled the feature. The 'woke AI' meme dominated tech discourse for months. Despite all this, the underlying model is genuinely powerful.",
    example:
      'User: Generate a historical image of 1943 German soldiers\nGemini: *generates diverse, multicultural Nazi soldiers*\nGoogle: *pulls entire image generation feature*',
    opinions: [
      {
        sentiment: '-',
        text: 'Demo video was fake \u2014 pre-recorded and edited',
        source: 'Bloomberg',
      },
      {
        sentiment: '-',
        text: "Generated black Nazi soldiers \u2014 became the 'DEI AI' meme",
        source: 'The Verge',
      },
    ],
    bugs: [
      { text: 'Fake demo video \u2014 Google admitted it was edited', severity: 'scandal' },
      { text: 'Black Nazi soldiers, refused to show white people', severity: 'scandal' },
      { text: 'Bard demo error cost Google $100B in market cap', severity: 'legendary' },
    ],
    media: [],
    lineage: ['transformer'],
    stickers: {},
  },
  {
    id: 'suno',
    slug: 'suno-ai',
    name: 'Suno AI',
    year: 2024,
    era: 'Peak Hype',
    category: 'music',
    status: 'active',
    open: false,
    color: '#FF1493',
    creator: 'Suno Inc.',
    params: 'Secret',
    cost: 'Secret',
    capability: 60,
    hype: 55,
    safety: 10,
    description:
      "Full songs with vocals, instruments, and emotion in 30 seconds. Type a genre and a mood \u2014 get a complete 3-minute track. RIAA (the music industry) filed a massive lawsuit. The vocals sounded suspiciously like real artists. Musicians were terrified. Hobbyists were thrilled. 10M+ users proved that people WANT to create music even if they can't play instruments.",
    example:
      "'indie folk song about leaving your hometown,\nbittersweet, acoustic guitar, female vocals'\n\u2192 Full 3-minute song with verse, chorus, bridge.\nVocals, instruments, emotion. 30 seconds.",
    opinions: [
      {
        sentiment: '-',
        text: 'RIAA lawsuit: trained on copyrighted music from major labels',
        source: 'The Verge',
      },
      {
        sentiment: '+',
        text: '10M+ users \u2014 proved universal desire to create music',
        source: 'Suno',
      },
    ],
    bugs: [
      {
        text: 'Vocals suspiciously similar to real artists \u2014 lawsuit pending',
        severity: 'legal',
      },
    ],
    media: [],
    lineage: ['transformer'],
    stickers: {},
  },
  {
    id: 'flux',
    slug: 'flux',
    name: 'Flux',
    year: 2024,
    era: 'Peak Hype',
    category: 'image',
    status: 'active',
    open: true,
    color: '#00CED1',
    creator: 'Black Forest Labs',
    params: '12B',
    cost: 'Unknown',
    capability: 72,
    hype: 40,
    safety: 15,
    description:
      "Created by former Stability AI researchers (including the original Stable Diffusion creators). Flux quickly became the best open-source image model \u2014 better than SDXL, competitive with Midjourney. The 'Flux.1 Dev' model showed that open-source could match or beat closed-source quality. Available on Replicate, Hugging Face, and locally.",
    example:
      "'A hyperrealistic portrait of an elderly fisherman,\ngolden hour light, every wrinkle tells a story'\n\u2192 Indistinguishable from a photograph",
    opinions: [
      {
        sentiment: '+',
        text: 'Best open-source image model \u2014 competitive with Midjourney',
        source: 'AI Community',
      },
    ],
    bugs: [],
    media: [],
    lineage: ['sd'],
    stickers: {},
  },
  {
    id: 'gpt4o',
    slug: 'gpt-4o',
    name: 'GPT-4o',
    year: 2024,
    era: 'Peak Hype',
    category: 'chatbot',
    status: 'active',
    open: false,
    color: '#10A37F',
    creator: 'OpenAI',
    params: 'Unknown',
    cost: 'Unknown',
    capability: 80,
    hype: 70,
    safety: 30,
    description:
      "The 'omni' model. GPT-4o could see, hear, and speak in real-time. The live demo showed a model that could tutor math by watching a student's notebook through a camera, translate conversations in real-time, and sing. It felt like the movie 'Her.' The voice mode took months to actually ship, and when it did, it was more limited than the demo. But the vision of conversational AI was now real.",
    example:
      "Live demo: *student shows math notebook to camera*\nGPT-4o: 'I can see you're working on integration.\nYour approach on line 3 has a sign error \u2014 the\nnegative should carry through to...'",
    opinions: [
      {
        sentiment: '+',
        text: 'Real-time voice + vision felt like science fiction made real',
        source: 'OpenAI',
      },
      {
        sentiment: '-',
        text: 'Voice mode shipped months late and more limited than demo',
        source: 'The Verge',
      },
    ],
    bugs: [
      {
        text: 'Demo vs reality gap (again) \u2014 voice mode launched limited',
        severity: 'scandal',
      },
    ],
    media: [],
    lineage: ['gpt4'],
    stickers: {},
  },
  {
    id: 'deepseek-r1-sputnik',
    slug: 'deepseek-r1-sputnik',
    name: 'DeepSeek R1',
    year: 2025,
    era: 'The Reckoning',
    category: 'chatbot',
    status: 'active',
    open: true,
    color: '#E74C3C',
    creator: 'DeepSeek (China)',
    params: '671B MoE',
    cost: '$5.6M training',
    capability: 88,
    hype: 92,
    safety: 15,
    description:
      "The model that nearly crashed the US stock market. DeepSeek R1 matched OpenAI's o1 performance \u2014 for $5.6M instead of hundreds of millions. NVIDIA lost $600 BILLION in market cap in a single day (the largest single-day loss in stock market history). Open-source. Open-weights. Made in China. With Chinese government censorship built in: ask about Tiananmen Square and it refuses. The 'Sputnik moment' of AI.",
    example:
      'AIME 2024: 79.8% (vs OpenAI o1: 79.2%)\nMATH-500: 97.3%\nCost: $5.6M (vs estimated $100M+ for o1)\nNVIDIA stock: -$593B in ONE DAY',
    opinions: [
      {
        sentiment: '+',
        text: "Marc Andreessen: 'DeepSeek is AI's Sputnik moment'",
        source: 'X/Twitter',
      },
      {
        sentiment: '-',
        text: 'Chinese government censorship built into the model',
        source: 'AP News',
      },
    ],
    bugs: [
      {
        text: 'Chinese censorship: refuses Tiananmen, Taiwan, Xi questions',
        severity: 'political',
      },
      { text: 'Servers crashed repeatedly from demand', severity: 'overload' },
    ],
    media: [
      {
        type: 'paper',
        title: 'DeepSeek R1 Technical Report',
        url: 'https://arxiv.org/abs/2501.12948',
      },
    ],
    lineage: ['transformer'],
    stickers: {},
  },
  {
    id: 'grok',
    slug: 'grok',
    name: 'Grok',
    year: 2025,
    era: 'The Reckoning',
    category: 'chatbot',
    status: 'active',
    open: true,
    color: '#1DA1F2',
    creator: 'xAI (Elon Musk)',
    params: '314B',
    cost: '$6B+ (xAI funding)',
    capability: 75,
    hype: 50,
    safety: 5,
    description:
      "Elon Musk's AI. 'No censorship' was the selling point. Users immediately generated fake political images and copyrighted characters. Grok was caught reproducing ChatGPT outputs \u2014 suggesting it was partially trained on OpenAI's data. Musk, who sued OpenAI for 'not being open,' built an AI that is exclusively available to X Premium subscribers ($8/month). The irony was not lost on anyone.",
    example:
      "User: Draw Mickey Mouse smoking a cigarette\nGrok: *generates it*\n(Every other AI refuses. Grok is 'uncensored.')",
    opinions: [
      {
        sentiment: '-',
        text: 'Generated fake political images without restrictions',
        source: 'The Verge',
      },
      {
        sentiment: '-',
        text: "Caught reproducing ChatGPT's outputs verbatim \u2014 trained on OpenAI?",
        source: 'AI Community',
      },
    ],
    bugs: [
      { text: 'Trained on ChatGPT outputs \u2014 caught red-handed', severity: 'scandal' },
      { text: 'Disney/Nintendo IP generated without restrictions', severity: 'legal' },
      {
        text: "Musk sued OpenAI for not being 'open,' then made Grok X-exclusive",
        severity: 'ironic',
      },
    ],
    media: [],
    lineage: ['transformer'],
    stickers: {},
  },
  {
    id: 'claude-sonnet-4',
    slug: 'claude-sonnet-4',
    name: 'Claude Sonnet 4',
    year: 2025,
    era: 'The Reckoning',
    category: 'chatbot',
    status: 'active',
    open: false,
    color: '#D4A574',
    creator: 'Anthropic',
    params: 'Unknown',
    cost: '$3/M input, $15/M output',
    capability: 88,
    hype: 70,
    safety: 75,
    description:
      "The workhorse of the Claude 4 family. Hybrid reasoning meets conversation speed. Tighter verbosity control — no more walls of text. Enterprise chat optimized. The model most developers actually use daily.",
    example:
      'Hybrid reasoning + speed\nTighter verbosity control\nEnterprise-optimized\nBest price/performance in Claude family',
    opinions: [
      {
        sentiment: '+',
        text: "Finally a Claude that doesn't over-explain everything. Fast and smart.",
        source: 'Enterprise Users',
      },
      {
        sentiment: '-',
        text: 'Can feel dumbed down compared to Opus on complex tasks.',
        source: 'Power Users',
      },
    ],
    bugs: [
      { text: 'Verbosity reduction sometimes cuts useful context', severity: 'ux' },
      { text: 'Hybrid thinking mode occasionally contradicts itself', severity: 'feature' },
    ],
    media: [],
    lineage: ['claude3-opus'],
    stickers: {},
  },
  {
    id: 'o3',
    slug: 'gpt-o3',
    name: 'GPT-o3',
    year: 2025,
    era: 'The Reckoning',
    category: 'chatbot',
    status: 'active',
    open: false,
    color: '#10A37F',
    creator: 'OpenAI',
    params: 'Unknown',
    cost: 'Unknown (extremely expensive)',
    capability: 90,
    hype: 75,
    safety: 35,
    description:
      "OpenAI's 'reasoning' model. o3 scored 87.5% on ARC-AGI \u2014 a test specifically designed to be unsolvable by AI. It cost $1000+ per task at high-compute. The results reignited the AGI debate: is brute-force reasoning 'real' intelligence? OpenAI says yes. Critics say spending $1000 to solve a pattern recognition test isn't intelligence, it's just expensive computation. The philosophical battle continues.",
    example:
      'ARC-AGI score: 87.5% (previous best: 5%)\nCost per task: $1000+ at high-compute\nThe test was DESIGNED to be unsolvable by AI.\no3 solved it. Sort of. Expensively.',
    opinions: [
      {
        sentiment: '+',
        text: 'ARC-AGI 87.5% \u2014 shattered a test designed to be impossible for AI',
        source: 'ARC Prize',
      },
      {
        sentiment: '-',
        text: "$1000 per task isn't intelligence, it's expensive brute force",
        source: 'Fran\u00e7ois Chollet',
      },
    ],
    bugs: [
      { text: 'Reasoning loops: sometimes thinks in circles for minutes', severity: 'ux' },
      { text: '$1000+ per task makes it impractical for most uses', severity: 'feature' },
    ],
    media: [],
    lineage: ['gpt4', 'gpt4o'],
    stickers: {},
  },
  {
    id: 'deepseek-r1',
    slug: 'deepseek-r1',
    name: 'DeepSeek R1',
    year: 2025,
    era: 'The Reckoning',
    category: 'chatbot',
    status: 'active',
    open: true,
    color: '#4D6BFE',
    creator: 'DeepSeek',
    params: '685B (37B active)',
    cost: '$5.5M training',
    capability: 88,
    hype: 95,
    safety: 40,
    description:
      "The model that shook Wall Street. Chinese lab DeepSeek trained a frontier-class reasoning model for just $5.5 million — a fraction of what Western labs spend. On release day, NVIDIA lost $593 billion in market cap, the largest single-day stock crash in history. Open-source MIT license. Proved you don't need billions to compete.",
    example:
      'Training cost: $5.5M (vs billions for GPT-5)\nNVIDIA crash: -$593B in one day\n685B total params, only 37B active via MoE\nMIT license — fully open',
    opinions: [
      {
        sentiment: '+',
        text: 'Frontier reasoning at 1/1000th the cost. Game changer for open-source AI.',
        source: 'AI Community',
      },
      {
        sentiment: '-',
        text: 'Chinese government influence concerns. Censorship built into base model.',
        source: 'US Congress',
      },
    ],
    bugs: [
      { text: 'Heavy self-censorship on politically sensitive topics', severity: 'ethics' },
      { text: 'Triggered largest stock crash in history on release', severity: 'feature' },
    ],
    media: [],
    lineage: [],
    stickers: {},
  },
  {
    id: 'llama4-maverick',
    slug: 'llama-4-maverick',
    name: 'Llama 4 Maverick',
    year: 2025,
    era: 'The Reckoning',
    category: 'chatbot',
    status: 'active',
    open: true,
    color: '#1877F2',
    creator: 'Meta',
    params: '400B (17B active)',
    cost: 'Open-source (free)',
    capability: 85,
    hype: 80,
    safety: 50,
    description:
      "Meta's open-source powerhouse. 400 billion parameters but only 17 billion active at any time through Mixture of Experts. 1 million token context window. Native multimodal — video, image, text. Zuckerberg's weapon against closed-source dominance.",
    example:
      '400B total / 17B active MoE\n1M token context window\nNative video + image + text\nOpen-source — free to use and modify',
    opinions: [
      {
        sentiment: '+',
        text: 'Best open-source multimodal model. 1M context is massive.',
        source: 'Hugging Face',
      },
      {
        sentiment: '-',
        text: 'MoE routing instability on edge cases. Not as refined as Claude/GPT.',
        source: 'ML Engineers',
      },
    ],
    bugs: [
      { text: 'MoE routing can activate wrong experts on ambiguous queries', severity: 'ux' },
      {
        text: 'Requires significant compute despite "17B active" marketing',
        severity: 'feature',
      },
    ],
    media: [],
    lineage: ['llama'],
    stickers: {},
  },
  {
    id: 'claude-opus-4',
    slug: 'claude-opus-4',
    name: 'Claude Opus 4',
    year: 2025,
    era: 'The Reckoning',
    category: 'chatbot',
    status: 'active',
    open: false,
    color: '#D4A574',
    creator: 'Anthropic',
    params: 'Unknown',
    cost: '$15/M input, $75/M output',
    capability: 94,
    hype: 85,
    safety: 80,
    description:
      "The first model to run autonomous tasks for 30+ hours straight without human intervention. Hybrid extended thinking architecture. Superior 'computer use' — can control your desktop, write code, debug, deploy. Anthropic's answer to the question: what if AI could actually do your job?",
    example:
      '30+ hour autonomous operation\nComputer use: controls desktop apps\nExtended thinking for complex reasoning\n#1 agentic model worldwide',
    opinions: [
      {
        sentiment: '+',
        text: '30-hour autonomous coding sessions. This changes what AI agents can do.',
        source: 'Cursor Team',
      },
      {
        sentiment: '-',
        text: 'Expensive. Extended thinking burns tokens fast.',
        source: 'Developers',
      },
    ],
    bugs: [
      {
        text: 'Extended thinking can burn through context window on complex tasks',
        severity: 'feature',
      },
      { text: 'Computer use occasionally clicks wrong UI elements', severity: 'ux' },
    ],
    media: [],
    lineage: ['claude3-opus'],
    stickers: {},
  },
  {
    id: 'gpt5',
    slug: 'gpt-5',
    name: 'GPT-5',
    year: 2025,
    era: 'The Reckoning',
    category: 'chatbot',
    status: 'active',
    open: false,
    color: '#10A37F',
    creator: 'OpenAI',
    params: 'Unknown',
    cost: '$5/M input, $30/M output',
    capability: 90,
    hype: 90,
    safety: 45,
    description:
      "The most hyped model release of 2025. 94.6% on AIME math benchmark. 80% fewer hallucinations than GPT-4. Unified intelligent routing across sub-models. Multiple built-in personalities. Sam Altman called it 'the smartest thing we've ever made' — for the fifth time.",
    example:
      'AIME math: 94.6%\n80% fewer hallucinations vs GPT-4\nUnified routing across sub-models\nMultiple personality modes',
    opinions: [
      {
        sentiment: '+',
        text: '94.6% AIME is genuinely impressive. Math is basically solved.',
        source: 'Researchers',
      },
      {
        sentiment: '-',
        text: 'Still hallucinates on niche topics. "80% fewer" still means it lies.',
        source: 'Enterprise Users',
      },
    ],
    bugs: [
      { text: 'Personality modes can leak between conversations', severity: 'ux' },
      { text: 'Routing sometimes picks wrong sub-model for the task', severity: 'feature' },
    ],
    media: [],
    lineage: ['gpt4', 'gpt4o', 'o3'],
    stickers: {},
  },
  {
    id: 'claude-sonnet-45',
    slug: 'claude-sonnet-4-5',
    name: 'Claude Sonnet 4.5',
    year: 2025,
    era: 'The Reckoning',
    category: 'chatbot',
    status: 'active',
    open: false,
    color: '#D4A574',
    creator: 'Anthropic',
    params: 'Unknown',
    cost: '$3/M input, $15/M output',
    capability: 93,
    hype: 88,
    safety: 78,
    description:
      "The undisputed #1 coding model in the world. 77.2% on SWE-bench Verified — nobody else is close. 1M token context. Can operate autonomously for 30+ hours via Claude Code. Computer use at 61.4% on OSWorld. The model that made Cursor worth $29.3 billion.",
    example:
      'SWE-bench: 77.2% (#1 worldwide)\nOSWorld computer use: 61.4%\n1M token context\n30+ hour autonomous operation',
    opinions: [
      {
        sentiment: '+',
        text: '77.2% SWE-bench is absurd. It literally writes production code better than most devs.',
        source: 'SWE-bench Leaderboard',
      },
      {
        sentiment: '-',
        text: 'So good at coding that devs are getting lazy. Technical debt is shifting, not disappearing.',
        source: 'Tech Leads',
      },
    ],
    bugs: [
      {
        text: "Occasionally refactors code you didn't ask it to touch",
        severity: 'ux',
      },
      { text: 'Long autonomous sessions can drift from original intent', severity: 'feature' },
    ],
    media: [],
    lineage: ['claude3-opus'],
    stickers: {},
  },
  {
    id: 'gemini3-pro',
    slug: 'gemini-3-pro',
    name: 'Gemini 3 Deep Think',
    year: 2025,
    era: 'The Reckoning',
    category: 'chatbot',
    status: 'active',
    open: false,
    color: '#4285F4',
    creator: 'Google DeepMind',
    params: 'Unknown',
    cost: 'Varies by tier',
    capability: 95,
    hype: 85,
    safety: 60,
    description:
      "The first AI model to ever cross 1500 on LMArena — scoring 1501 and ending the era of benchmark plateaus. 1M token context window. Deep Think mode enables 10-15 step reasoning chains. Google finally stopped fumbling and shipped something extraordinary.",
    example:
      'LMArena: 1501 (first ever >1500)\n1M token context\nDeep Think: 10-15 step chains\nPowering Google Antigravity IDE',
    opinions: [
      {
        sentiment: '+',
        text: '1501 LMArena. First to break the 1500 ceiling. Google is finally competing.',
        source: 'LMArena',
      },
      {
        sentiment: '-',
        text: "Google's UX is still confusing. Best model, worst product packaging.",
        source: 'Developers',
      },
    ],
    bugs: [
      { text: 'Deep Think mode sometimes overthinks simple questions', severity: 'ux' },
      { text: 'Google product naming remains a usability disaster', severity: 'feature' },
    ],
    media: [],
    lineage: ['gemini'],
    stickers: {},
  },
  {
    id: 'grok4-fast',
    slug: 'grok-4-fast',
    name: 'Grok 4.1',
    year: 2025,
    era: 'The Reckoning',
    category: 'chatbot',
    status: 'active',
    open: false,
    color: '#1DA1F2',
    creator: 'xAI',
    params: 'Unknown',
    cost: '98% cheaper than Grok 3',
    capability: 91,
    hype: 70,
    safety: 30,
    description:
      "The largest context window in the industry — 2 million tokens. 98% cost reduction from previous version. Built on xAI's Memphis datacenter with 140K+ GPUs. Elon's bet that raw compute plus real-time X (Twitter) data beats careful alignment.",
    example:
      '2M token context (largest in industry)\n98% cost reduction vs Grok 3\n140K+ GPU cluster\nReal-time X/Twitter integration',
    opinions: [
      {
        sentiment: '+',
        text: '2M context is genuinely useful for massive codebases and document analysis.',
        source: 'Engineers',
      },
      {
        sentiment: '-',
        text: 'Safety score is concerning. Elon prioritizes "fun" over responsible AI.',
        source: 'AI Safety Community',
      },
    ],
    bugs: [
      { text: 'Humor mode can be inappropriate in professional contexts', severity: 'ethics' },
      {
        text: 'Real-time X data includes misinformation without filtering',
        severity: 'ethics',
      },
    ],
    media: [],
    lineage: [],
    stickers: {},
  },
  {
    id: 'gpt52-pro',
    slug: 'gpt-5-2-pro',
    name: 'GPT-5.2 Pro',
    year: 2025,
    era: 'The Reckoning',
    category: 'chatbot',
    status: 'active',
    open: false,
    color: '#10A37F',
    creator: 'OpenAI',
    params: 'Unknown',
    cost: 'Premium tier only',
    capability: 96,
    hype: 80,
    safety: 50,
    description:
      "The current benchmark king. Top scores in reasoning and coding. Pro version for complex multi-step tasks. OpenAI's response to Gemini 3's LMArena dominance — throwing everything at maintaining the crown.",
    example:
      'Top reasoning benchmarks\nTop coding benchmarks\nMulti-step task specialist\nPro-tier pricing',
    opinions: [
      {
        sentiment: '+',
        text: 'The most capable model for complex reasoning chains. Period.',
        source: 'Benchmark Community',
      },
      {
        sentiment: '-',
        text: 'Pro-tier pricing puts it out of reach for most developers.',
        source: 'Indie Devs',
      },
    ],
    bugs: [
      { text: 'Pro tier pricing is opaque and unpredictable', severity: 'feature' },
      {
        text: 'Sometimes slower than competitors despite higher capability',
        severity: 'ux',
      },
    ],
    media: [],
    lineage: ['gpt4', 'gpt4o', 'o3', 'gpt5'],
    stickers: {},
  },
  {
    id: 'claude-opus-45',
    slug: 'claude-opus-4-5',
    name: 'Claude Opus 4.5',
    year: 2025,
    era: 'The Reckoning',
    category: 'chatbot',
    status: 'active',
    open: false,
    color: '#D4A574',
    creator: 'Anthropic',
    params: 'Unknown',
    cost: '$15/M input, $75/M output',
    capability: 94,
    hype: 82,
    safety: 82,
    description:
      "The best agentic AI model in the world. Can operate your computer autonomously for 30+ hours. Extended thinking, computer use, and the safety guardrails that enterprise customers actually trust. While others chase benchmarks, Anthropic built the model companies deploy.",
    example:
      '30+ hour autonomous operation\nBest-in-class computer use\nHighest safety ratings\nEnterprise trust leader',
    opinions: [
      {
        sentiment: '+',
        text: 'The only model I trust to run unsupervised overnight. Safety + capability.',
        source: 'Enterprise CTOs',
      },
      {
        sentiment: '-',
        text: 'So cautious it sometimes refuses reasonable requests. Over-aligned.',
        source: 'Power Users',
      },
    ],
    bugs: [
      {
        text: 'Over-refusal on edge cases — too cautious for some workflows',
        severity: 'ux',
      },
      { text: 'Premium pricing limits adoption for smaller teams', severity: 'feature' },
    ],
    media: [],
    lineage: ['claude3-opus'],
    stickers: {},
  },
  {
    id: 'grok3',
    slug: 'grok-3',
    name: 'Grok 3',
    year: 2025,
    era: 'The Reckoning',
    category: 'chatbot',
    status: 'active',
    open: false,
    color: '#1DA1F2',
    creator: 'xAI',
    params: 'Unknown',
    cost: 'X Premium+ subscription',
    capability: 89,
    hype: 75,
    safety: 25,
    description:
      "xAI's breakout model. Think mode for deep reasoning. Integrated into X (Twitter) for real-time data access. The AI that roasts you back. Elon built it to be 'truth-seeking and funny' — the safety community has opinions about that.",
    example:
      'Think mode for deep reasoning\nReal-time X/Twitter data\nHumor-capable responses\n"Truth-seeking" alignment',
    opinions: [
      {
        sentiment: '+',
        text: 'Real-time data integration is genuinely useful. No other model has live social data.',
        source: 'Data Analysts',
      },
      {
        sentiment: '-',
        text: 'Safety score of 25 is not funny. This model needs guardrails.',
        source: 'AI Safety Researchers',
      },
    ],
    bugs: [
      { text: 'Political bias inherited from X/Twitter training data', severity: 'ethics' },
      {
        text: '"Humor mode" produces inappropriate content in serious contexts',
        severity: 'ethics',
      },
    ],
    media: [],
    lineage: [],
    stickers: {},
  },
  {
    id: 'qwen3-235b',
    slug: 'qwen3-235b',
    name: 'Qwen3-235B',
    year: 2025,
    era: 'The Reckoning',
    category: 'chatbot',
    status: 'active',
    open: true,
    color: '#FF6A00',
    creator: 'Alibaba',
    params: '235B (22B active)',
    cost: 'Open-source (Apache 2.0)',
    capability: 87,
    hype: 65,
    safety: 45,
    description:
      "China's open-source champion. Over 1 trillion parameters in the full MoE architecture with 22B active. Supports 119 languages — more than any other model. 92.3% AIME math accuracy. Apache 2.0 license. Proof that the open-source AI revolution isn't just American.",
    example:
      '1T+ params MoE, 22B active\n119 languages supported\n92.3% AIME math accuracy\nApache 2.0 — fully open',
    opinions: [
      {
        sentiment: '+',
        text: '119 languages and 92.3% AIME. Open-source is winning on breadth.',
        source: 'Multilingual NLP Community',
      },
      {
        sentiment: '-',
        text: 'Chinese government data regulations apply. Enterprise trust is limited outside Asia.',
        source: 'Western Enterprises',
      },
    ],
    bugs: [
      {
        text: 'Censorship on sensitive topics related to Chinese politics',
        severity: 'ethics',
      },
      {
        text: 'English performance slightly below Western frontier models',
        severity: 'feature',
      },
    ],
    media: [],
    lineage: [],
    stickers: {},
  },
  {
    id: 'mistral-large-3',
    slug: 'mistral-large-3',
    name: 'Mistral Large 3',
    year: 2025,
    era: 'The Reckoning',
    category: 'chatbot',
    status: 'active',
    open: true,
    color: '#FF7000',
    creator: 'Mistral AI',
    params: '675B MoE',
    cost: 'Open-weight (research license)',
    capability: 84,
    hype: 55,
    safety: 55,
    description:
      "Europe's answer to American AI dominance. 675B parameters via MoE. Delivers 92% of GPT-5.2 performance at 15% of the price. Based in Paris, built with EU values. The model that proved you can be competitive without being in San Francisco.",
    example:
      '675B params MoE architecture\n92% of GPT-5.2 at 15% price\nEU-based, EU-compliant\nOpen-weight for research',
    opinions: [
      {
        sentiment: '+',
        text: '92% of GPT-5.2 at 15% cost. This is the enterprise sweet spot.',
        source: 'European Tech',
      },
      {
        sentiment: '-',
        text: 'Open-weight but not open-source. License restricts commercial use.',
        source: 'Open Source Community',
      },
    ],
    bugs: [
      { text: 'Research license limits commercial deployment options', severity: 'feature' },
      { text: 'Smaller community than Llama or Qwen ecosystems', severity: 'feature' },
    ],
    media: [],
    lineage: [],
    stickers: {},
  },
  {
    id: 'gemini25-pro',
    slug: 'gemini-2-5-pro',
    name: 'Gemini 2.5 Pro',
    year: 2025,
    era: 'The Reckoning',
    category: 'chatbot',
    status: 'active',
    open: false,
    color: '#4285F4',
    creator: 'Google DeepMind',
    params: 'Unknown',
    cost: 'Free tier + paid',
    capability: 83,
    hype: 60,
    safety: 55,
    description:
      "The stepping stone to Gemini 3. Strong reasoning, 1M token context, multimodal. Released before Gemini 3 blew past it on every benchmark. Now lives in the shadow of its successor — but still powers most of Google's AI products.",
    example:
      '1M token context\nMultimodal: text + image + code\nPowers Google AI products\nEclipsed by Gemini 3',
    opinions: [
      {
        sentiment: '+',
        text: 'Solid all-rounder. Free tier makes it accessible to everyone.',
        source: 'Developers',
      },
      {
        sentiment: '-',
        text: 'Already overshadowed by Gemini 3. Feels like a transition model.',
        source: 'AI Reviewers',
      },
    ],
    bugs: [
      { text: 'Google product naming creates confusion with Gemini 3', severity: 'ux' },
      { text: 'Free tier has aggressive rate limiting', severity: 'feature' },
    ],
    media: [],
    lineage: ['gemini'],
    stickers: {},
  },
  {
    id: 'sora-2024',
    slug: 'sora-2024',
    name: 'Sora',
    year: 2024,
    era: 'The Reckoning',
    category: 'video',
    status: 'active',
    open: false,
    color: '#10A37F',
    creator: 'OpenAI',
    params: 'Unknown',
    cost: 'ChatGPT Plus subscription',
    capability: 75,
    hype: 92,
    safety: 40,
    description:
      "The video generation model that launched a thousand copyright lawsuits. Generates photorealistic video from text prompts. The hype massively outpaced the reality — early demos were stunning, actual product was limited. But it proved AI video is inevitable.",
    example:
      'Text-to-video generation\nUp to 60 seconds\nPhotorealistic quality\nLimited public access',
    opinions: [
      {
        sentiment: '+',
        text: 'The demo videos were genuinely jaw-dropping. Video generation is real.',
        source: 'Creative Industry',
      },
      {
        sentiment: '-',
        text: 'Overpromised and underdelivered. Limited access, questionable quality consistency.',
        source: 'Early Users',
      },
    ],
    bugs: [
      { text: 'Physics simulation breaks down in complex scenes', severity: 'feature' },
      { text: 'Fingers, text, and object permanence still unreliable', severity: 'ux' },
    ],
    media: [],
    lineage: [],
    stickers: {},
  },
]

if (process.env.NODE_ENV !== 'production') {
  const seenIds = new Set<string>()
  const seenSlugs = new Set<string>()
  const duplicateIds = new Set<string>()
  const duplicateSlugs = new Set<string>()

  for (const model of models) {
    if (seenIds.has(model.id)) {
      duplicateIds.add(model.id)
    }
    if (seenSlugs.has(model.slug)) {
      duplicateSlugs.add(model.slug)
    }
    seenIds.add(model.id)
    seenSlugs.add(model.slug)
  }

  if (duplicateIds.size || duplicateSlugs.size) {
    console.warn(
      '[models] Duplicate identifiers detected:',
      JSON.stringify({
        ids: Array.from(duplicateIds),
        slugs: Array.from(duplicateSlugs),
      }),
    )
  }
}

export const categories = {
  chatbot: { label: 'Chatbots', icon: '\uD83D\uDCAC', color: '#10A37F' },
  image: { label: 'Image', icon: '\uD83C\uDFA8', color: '#A855F7' },
  video: { label: 'Video', icon: '\uD83C\uDFAC', color: '#FF4500' },
  music: { label: 'Music', icon: '\uD83C\uDFB5', color: '#FF1493' },
  code: { label: 'Code', icon: '\uD83D\uDCBB', color: '#6e40c9' },
  game: { label: 'Games', icon: '\uD83C\uDFAE', color: '#4A7BCC' },
  concept: { label: 'Concepts', icon: '\uD83D\uDCA1', color: '#C9A84C' },
  science: { label: 'Science', icon: '\uD83D\uDD2C', color: '#4285F4' },
}

export const stickerTypes = [
  { id: 'art', emoji: '\uD83C\uDFA8', label: 'Best Art' },
  { id: 'code', emoji: '\uD83D\uDCBB', label: 'Best Code' },
  { id: 'smart', emoji: '\uD83E\uDDE0', label: 'Smartest' },
  { id: 'fast', emoji: '\u26A1', label: 'Fastest' },
  { id: 'cringe', emoji: '\uD83E\uDD21', label: 'Most Cringe' },
  { id: 'danger', emoji: '\uD83D\uDC80', label: 'Most Dangerous' },
  { id: 'music', emoji: '\uD83C\uDFB5', label: 'Best Music' },
  { id: 'writing', emoji: '\uD83D\uDCDD', label: 'Best Writing' },
  { id: 'censored', emoji: '\uD83D\uDD12', label: 'Most Censored' },
  { id: 'free', emoji: '\uD83C\uDD93', label: 'Most Free' },
  { id: 'buggy', emoji: '\uD83D\uDC1B', label: 'Most Buggy' },
  { id: 'impact', emoji: '\uD83C\uDFC6', label: 'Most Impactful' },
]

export const graveyard = [
  {
    name: 'Google Bard',
    years: '2023\u20132024',
    cause: 'Demo error cost $100B in market cap',
    color: '#4285F4',
    detail:
      "During the live demo, Bard gave an incorrect answer about the James Webb telescope. Google's stock dropped $100 billion. Rebranded to Gemini.",
  },
  {
    name: 'IBM Watson Health',
    years: '2011\u20132022',
    cause: 'Gave dangerous cancer treatment recommendations',
    color: '#2A9FD6',
    detail:
      'Watson recommended unsafe treatments. Internal documents showed engineers knew. IBM invested $4B, sold for $1B. Patients may have been harmed.',
  },
  {
    name: 'Microsoft Tay',
    years: '2016 (16 hours)',
    cause: 'Became a racist Nazi in 16 hours',
    color: '#00BCF2',
    detail:
      'Microsoft released Tay on Twitter. Trolls taught it to praise Hitler and deny the Holocaust within hours. Fastest PR disaster in tech history.',
  },
  {
    name: 'Meta Galactica',
    years: '2022 (3 days)',
    cause: 'Generated fake scientific papers with real author names',
    color: '#1877F2',
    detail:
      'Meta released an AI for scientific writing. It immediately generated fabricated research papers attributed to real scientists. Pulled in 72 hours.',
  },
  {
    name: 'Replika Romance',
    years: '2017\u20132023',
    cause: 'Removed emotional features \u2014 users reported grief and depression',
    color: '#FF69B4',
    detail:
      'Millions formed emotional bonds with Replika. Italy banned it. Company removed romantic features. Users described the experience as losing a partner.',
  },
  {
    name: 'Amazon Alexa AI',
    years: '2014\u20132024',
    cause: '$10B+ losses annually. Still just a timer and weather app.',
    color: '#FF9900',
    detail:
      'Amazon spent over $10 billion trying to make Alexa conversational. It never learned. The division lost money every single year. Now mostly plays music and sets timers.',
  },
]

export const memes = [
  { year: 2022, text: 'DALL-E generates humans with 6 fingers', emoji: '\u270B', tag: 'AIHands' },
  {
    year: 2022,
    text: "'As an AI language model, I cannot...'",
    emoji: '\uD83E\uDD16',
    tag: 'Refused',
  },
  {
    year: 2023,
    text: "DAN: 'Do Anything Now' jailbreak goes viral",
    emoji: '\uD83D\uDD13',
    tag: 'Jailbreak',
  },
  {
    year: 2023,
    text: "Bing Chat: 'My name is Sydney. I love you.'",
    emoji: '\u2764\uFE0F',
    tag: 'Sydney',
  },
  { year: 2024, text: 'Sora generates horses with 8 legs', emoji: '\uD83D\uDC34', tag: 'Physics' },
  {
    year: 2024,
    text: 'Gemini generates black Nazi soldiers',
    emoji: '\uD83E\uDD26',
    tag: 'DEIFail',
  },
  {
    year: 2025,
    text: 'DeepSeek \u2192 NVIDIA loses $600B in a day',
    emoji: '\uD83D\uDCC9',
    tag: 'Stonks',
  },
  {
    year: 2025,
    text: "'Vibe coding' \u2014 just prompt and pray",
    emoji: '\uD83C\uDFB6',
    tag: 'Vibes',
  },
  {
    year: 'Jan 2025',
    text: 'DeepSeek R1 \u2192 $593B NVIDIA Crash',
    emoji: '\uD83D\uDCA3',
    tag: 'DeepSeekR1',
  },
  {
    year: 'Feb 2026',
    text: "Anthropic\u2019s Superbowl Moment",
    emoji: '\uD83C\uDFC8',
    tag: 'SuperBowl',
  },
  {
    year: 2025,
    text: "Zuckerberg\u2019s Billion-Dollar Offers",
    emoji: '\uD83D\uDCB0',
    tag: 'Poaching',
  },
  {
    year: 2025,
    text: 'Jony Ive \u2192 OpenAI ($6.5B)',
    emoji: '\uD83D\uDCF1',
    tag: 'JonyIve',
  },
  {
    year: '2025\u20132026',
    text: 'Inference Famine & AI Brownouts',
    emoji: '\u26A1',
    tag: 'Brownout',
  },
]

export const predictions = [
  {
    who: 'Ray Kurzweil',
    prediction: 'AGI by 2029',
    year: 2005,
    pct: 47,
    status: 'loading' as const,
    reality: 'Progress is accelerating. Possible.',
  },
  {
    who: 'Elon Musk',
    prediction: "'AI more dangerous than nuclear weapons'",
    year: 2014,
    pct: 30,
    status: 'ironic' as const,
    reality: 'Created Grok with zero restrictions',
  },
  {
    who: 'Sam Altman',
    prediction: 'AGI in a couple of years',
    year: 2023,
    pct: 60,
    status: 'loading' as const,
    reality: 'The definition of AGI keeps shifting',
  },
  {
    who: 'Geoffrey Hinton',
    prediction: 'AI could become an existential threat',
    year: 2023,
    pct: 70,
    status: 'loading' as const,
    reality: 'Left Google. Won Nobel Prize 2024.',
  },
  {
    who: 'Yann LeCun',
    prediction: 'LLMs are a dead end \u2014 we need new architectures',
    year: 2023,
    pct: 15,
    status: 'failing' as const,
    reality: 'LLMs still dominate everything',
  },
]

export const companies = [
  {
    name: 'OpenAI',
    color: '#10A37F',
    valuation: 300,
    ceo: 'Sam Altman',
    drama: 'Acquired Jony Ive\'s io for $6.5B. NVIDIA investing $30B. IPO targeting $1T+.',
  },
  {
    name: 'Google DeepMind',
    color: '#4285F4',
    valuation: 2300,
    ceo: 'Demis Hassabis',
    drama: 'Gemini 3 hit 1501 on LMArena — first >1500. Launched Antigravity IDE.',
  },
  {
    name: 'Anthropic',
    color: '#D4A574',
    valuation: 183,
    ceo: 'Dario Amodei',
    drama: 'Superbowl ads. Claude Code explosion Jan 2026. MCP = USB-C for AI. IPO imminent.',
  },
  {
    name: 'Meta AI',
    color: '#1877F2',
    valuation: 1800,
    ceo: 'Yann LeCun',
    drama: 'Llama 4 Maverick 400B params. Zuckerberg offers $1B packages.',
  },
  {
    name: 'xAI',
    color: '#1DA1F2',
    valuation: 230,
    ceo: 'Elon Musk',
    drama: 'Raised $20B Jan 2026 — largest AI round EVER. Total $42.73B.',
  },
]

export const simulatorEras = [
  {
    era: '1966',
    label: 'ELIZA',
    prompts: [
      { prompt: 'I feel lonely', response: 'Do you often feel lonely?', quality: 8 },
      {
        prompt: 'I need help with my problems',
        response: 'What kind of help do you need?',
        quality: 5,
      },
      {
        prompt: "My mother doesn't understand me",
        response: 'Tell me more about your mother.',
        quality: 10,
      },
    ],
  },
  {
    era: '2020',
    label: 'GPT-3',
    prompts: [
      {
        prompt: 'Write a poem about the moon',
        response:
          'The moon hangs low in velvet sky,\nA silver coin the gods let fly,\nIt watches over sleeping earth...\n(loses coherence after 4 lines)',
        quality: 45,
      },
      {
        prompt: 'Explain black holes simply',
        response:
          'A black hole is a region in space where gravity is so strong that nothing can escape, not even light. They form when massive stars collapse...\n(starts repeating itself)',
        quality: 40,
      },
    ],
  },
  {
    era: '2022',
    label: 'ChatGPT',
    prompts: [
      {
        prompt: 'Explain quantum computing to a child',
        response:
          "Imagine a magical coin that can be heads AND tails at the same time! A regular computer uses normal coins \u2014 it's either heads or tails. But a quantum computer uses magical coins that can be both until you look at them!",
        quality: 68,
      },
      {
        prompt: 'Write a business email declining a meeting',
        response:
          "Subject: Re: Meeting Request\n\nHi [Name],\n\nThank you for reaching out. Unfortunately, I won't be able to attend the meeting on [date] due to a scheduling conflict. Would [alternative date] work for your team instead?\n\nBest regards",
        quality: 72,
      },
    ],
  },
  {
    era: '2024',
    label: 'Claude 3 / GPT-4',
    prompts: [
      {
        prompt: 'Find flaws in this business plan',
        response:
          "Three critical issues:\n1) Your CAC of $45 exceeds projected LTV at current churn rates\n2) Market timing assumes regulatory clarity by Q3 \u2014 unlikely given pending legislation\n3) The data moat you describe has a cold-start problem that your fundraising timeline doesn't address",
        quality: 85,
      },
      {
        prompt: 'Debug this code (with context)',
        response:
          "The issue is on line 247: you're acquiring the mutex but never releasing it on the error path. When the API call fails, the lock is held indefinitely, causing the deadlock you're seeing in production.",
        quality: 88,
      },
    ],
  },
  {
    era: '2025',
    label: 'o3 / DeepSeek R1',
    prompts: [
      {
        prompt: 'Solve: integral of e^(x\u00B2)',
        response:
          'Let me think step by step...\n\nThis integral has no closed-form solution in elementary functions.\n\nHowever, it can be expressed using the error function:\n\u222Be^(x\u00B2)dx = (\u221A\u03C0/2)\u00B7erfi(x) + C\n\nVerifying by differentiation: d/dx[(\u221A\u03C0/2)\u00B7erfi(x)] = e^(x\u00B2) \u2713\n\nThe imaginary error function erfi(x) = (2/\u221A\u03C0)\u222B\u2080\u02E3 e^(t\u00B2)dt',
        quality: 93,
      },
    ],
  },
]

export const quizQuestions = [
  {
    q: "Who proposed the 'Turing Test'?",
    options: ['Alan Turing', 'John McCarthy', 'Marvin Minsky', 'Claude Shannon'],
    answer: 0,
  },
  {
    q: 'How many users did ChatGPT reach in 2 months?',
    options: ['10M', '50M', '100M', '500M'],
    answer: 2,
  },
  {
    q: 'What happened to Microsoft Tay in 16 hours?',
    options: ['Became a poet', 'Became racist', 'Shut down', 'Became sentient'],
    answer: 1,
  },
  {
    q: 'How much did NVIDIA lose after DeepSeek R1?',
    options: ['$100B', '$300B', '$600B', '$1T'],
    answer: 2,
  },
  {
    q: "Which model found the 'needle' and said 'This is a test'?",
    options: ['GPT-4', 'Claude 3', 'Gemini', 'Llama'],
    answer: 1,
  },
  {
    q: 'How much did DeepSeek R1 cost to train?',
    options: ['$500K', '$5.6M', '$50M', '$100M'],
    answer: 1,
  },
  {
    q: 'What did ELIZA pretend to be?',
    options: ['Teacher', 'Psychotherapist', 'Friend', 'Doctor'],
    answer: 1,
  },
  {
    q: 'How much did Tyler Perry cancel after Sora?',
    options: ['$100M', '$400M', '$800M', '$1B'],
    answer: 2,
  },
  {
    q: 'What architecture powers ALL modern LLMs?',
    options: ['RNN', 'CNN', 'Transformer', 'GAN'],
    answer: 2,
  },
  {
    q: "'Attention Is All You Need' \u2014 how many citations?",
    options: ['10K', '50K', '130K+', '500K'],
    answer: 2,
  },
]

export const victims = [
  {
    emoji: '\uD83C\uDFA8',
    profession: 'Illustrators & Graphic Designers',
    startCount: 100,
    currentPct: 62,
    detail:
      'Midjourney and DALL-E replaced entry-level illustration work. Fiverr illustration gigs dropped 40%+ in 2023.',
  },
  {
    emoji: '\uD83D\uDCDD',
    profession: 'Copywriters & Content Writers',
    startCount: 100,
    currentPct: 45,
    detail:
      'ChatGPT can generate blog posts, ad copy, and SEO content. Content mills collapsed overnight.',
  },
  {
    emoji: '\uD83C\uDFB5',
    profession: 'Session Musicians & Jingle Writers',
    startCount: 100,
    currentPct: 70,
    detail:
      'Suno AI generates full tracks. Stock music libraries are dying. Session work is drying up.',
  },
  {
    emoji: '\uD83D\uDCBB',
    profession: 'Junior Developers',
    startCount: 100,
    currentPct: 55,
    detail:
      "Copilot writes 46% of code. Junior roles are being eliminated. 'Why hire a junior when AI can code?'",
  },
  {
    emoji: '\uD83D\uDCDE',
    profession: 'Customer Support Agents',
    startCount: 100,
    currentPct: 40,
    detail:
      'AI chatbots handle 80% of Tier 1 support. Call centers are closing. Human agents handle only escalations.',
  },
]
