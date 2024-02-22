import { StateCreator } from 'zustand'

export type AppSlice = {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const appSlice: StateCreator<AppSlice, [], [], AppSlice> = (set) => ({
  theme: 'dark',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }))
})

export default appSlice
