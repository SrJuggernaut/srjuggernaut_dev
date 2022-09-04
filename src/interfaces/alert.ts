export interface Alert {
  id: string
  severity: 'error' | 'warning' | 'info' | 'success'
  title: string
  message?: string
}
