import { create } from 'zustand'

interface AppState {
  hasBooted: boolean
  currentSection: string
  visitedModels: string[]
  setBooted: () => void
  setCurrentSection: (sectionId: string) => void
  resetBoot: () => void
  addVisitedModel: (slug: string) => void
}

export const useStore = create<AppState>()((set) => ({
  hasBooted: false,
  currentSection: 'hero',
  visitedModels: [],
  setBooted: () => set({ hasBooted: true }),
  setCurrentSection: (sectionId) => set({ currentSection: sectionId }),
  resetBoot: () => set({ hasBooted: false }),
  addVisitedModel: (slug) =>
    set((state) => ({
      visitedModels: state.visitedModels.includes(slug)
        ? state.visitedModels
        : [...state.visitedModels, slug],
    })),
}))
