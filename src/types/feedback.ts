export interface Alert {
  id: string
  text: string,
  severity: 'success' | 'error' | 'info' | 'warning'
}
