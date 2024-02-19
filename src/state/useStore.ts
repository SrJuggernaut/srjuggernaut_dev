import { Alert } from '@/types/feedback'
import { create } from 'zustand'

interface State {
  theme: 'light' | 'dark'
  alerts: Array<Alert>
}

interface Actions {
  toggleTheme: () => void
  addAlert: (alert: Alert) => void
  removeAlert: (alertId: string) => void
}

const useStore = create<State & Actions>((set) => ({
  theme: typeof window !== 'undefined' ? (window.localStorage.getItem('theme') as State['theme'] || 'dark') : 'dark',
  alerts: [],
  toggleTheme: () => {
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }))
  },
  addAlert: (alert) => {
    set((state) => ({ alerts: [...state.alerts, alert] }))
  },
  removeAlert: (alertId) => {
    set((state) => ({ alerts: state.alerts.filter((alert) => alert.id !== alertId) }))
  }
}))

export default useStore
