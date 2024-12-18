import { create } from 'zustand'

interface BearState {
  isOptimisticMode?: boolean;
  setMode: (isOptimisticMode: boolean) => void
}

export const useModeStore = create<BearState>()(
  (set) => ({
    isOptimisticMode: true,
    setMode: (isOptimisticMode) => set(() => ({ isOptimisticMode })),
  }),
)