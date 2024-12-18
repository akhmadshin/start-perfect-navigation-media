import { create } from 'zustand'

interface BearState {
  navigatedPathname: string;
  navigate: (pathname: string) => void
}

export const useFakeAppStore = create<BearState>()(
  (set) => ({
    navigatedPathname: '/',
    navigate: (navigatedPathname) => set(() => ({ navigatedPathname })),
  }),
)