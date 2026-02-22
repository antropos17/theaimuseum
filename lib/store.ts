import { create } from 'zustand'

interface AppState {
  hasBooted: boolean
  currentSection: string
  setBooted: () => void
  setCurrentSection: (sectionId: string) => void
  resetBoot: () => void
}

export const useStore = create<AppState>()((set) => ({
  hasBooted: false,
  currentSection: 'hero',
  setBooted: () => set({ hasBooted: true }),
  setCurrentSection: (sectionId) => set({ currentSection: sectionId }),
  resetBoot: () => set({ hasBooted: false }),
}))
