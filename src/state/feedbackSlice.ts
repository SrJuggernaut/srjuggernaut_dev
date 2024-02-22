import { Alert } from '@/types/feedback'
import { StateCreator } from 'zustand'

export type FeedbackSlice = {
  alerts: Array<Alert>
  addAlert: (alert: Alert) => void
  removeAlert: (alertId: Alert['id']) => void
}

const feedbackSlice: StateCreator<FeedbackSlice, [], [], FeedbackSlice> = (set) => ({
  alerts: [],
  addAlert: (alert: Alert) => set((state) => ({ alerts: [...state.alerts, alert] })),
  removeAlert: (alertId: string) => set((state) => ({ alerts: state.alerts.filter((alert) => alert.id !== alertId) }))
})

export default feedbackSlice
