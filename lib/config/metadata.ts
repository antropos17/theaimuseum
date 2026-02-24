import type { Metadata } from 'next'
import { siteConfig } from './site'

type PageMetadataInput = {
  title: string
  description: string
  path: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
}

export function createPageMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  ogImage,
}: PageMetadataInput): Metadata {
  const canonical = `${siteConfig.url}${path}`
  const resolvedOgTitle = ogTitle ?? title
  const resolvedOgDescription = ogDescription ?? description
  const resolvedOgImage = ogImage ?? '/og-image.png'

  return {
    title,
    description,
    openGraph: {
      title: resolvedOgTitle,
      description: resolvedOgDescription,
      images: [{ url: resolvedOgImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedOgTitle,
      description: resolvedOgDescription,
    },
    alternates: { canonical },
  }
}
