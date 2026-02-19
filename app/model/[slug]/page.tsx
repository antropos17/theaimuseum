import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { models, categories } from "@/data/models"
import { ModelExhibit } from "@/components/model/model-exhibit"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return models.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const model = models.find((m) => m.slug === slug)
  if (!model) return {}
  const desc = model.description.slice(0, 160)
  return {
    title: `${model.name} (${model.year})`,
    description: desc,
    openGraph: {
      title: `${model.name} (${model.year}) | The AI Museum`,
      description: desc,
      type: "article",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: model.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${model.name} (${model.year})`,
      description: desc,
    },
  }
}

export default async function ModelPage({ params }: Props) {
  const { slug } = await params
  const modelIndex = models.findIndex((m) => m.slug === slug)
  const model = models[modelIndex]
  if (!model) notFound()

  const sorted = [...models].sort((a, b) => a.year - b.year)
  const sortedIndex = sorted.findIndex((m) => m.id === model.id)
  const prev = sortedIndex > 0 ? sorted[sortedIndex - 1] : null
  const next = sortedIndex < sorted.length - 1 ? sorted[sortedIndex + 1] : null

  const cat = categories[model.category]

  return (
    <ModelExhibit
      model={model}
      category={cat}
      prevModel={prev}
      nextModel={next}
    />
  )
}
