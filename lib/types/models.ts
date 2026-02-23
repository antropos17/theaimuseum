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
