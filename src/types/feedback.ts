export interface Alert {
  id: string
  title: string
  text: string,
  severity: 'success' | 'error' | 'info' | 'warning'
}
