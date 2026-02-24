import { PassportView } from '@/components/passport/passport-view'
import { createPageMetadata } from '@/lib/config'

export const metadata = createPageMetadata({
  title: 'Neural Passport -- Visitor Card Generator',
  description: 'Generate your AI Museum visitor card. Share it with the world.',
  path: '/passport',
  ogTitle: 'Neural Passport | The AI Museum',
  ogImage: '/api/og',
})

export default function PassportPage() {
  return <PassportView />
}
