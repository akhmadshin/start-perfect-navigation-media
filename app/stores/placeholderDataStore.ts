import { create } from 'zustand'

interface BearState {
  placeholderData?: object;
  setPlaceholderData: (placeholderData?: object) => void
}

export const usePlaceholderDataStore = create<BearState>()(
  (set) => ({
    placeholderData: undefined,
    setPlaceholderData: (placeholderData) => set(() => ({ placeholderData })),
  }),
)