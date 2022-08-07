import { createContext, Dispatch } from 'react'

import type { AppAction } from '@contexts/app/appReducer'

export interface Alert {
  id: string
  text: string,
  severity: 'success' | 'error' | 'info' | 'warning'
}
export interface AppState {
  theme: 'light' | 'dark',
  alerts: Array<Alert>,
  isLoggedIn: boolean
}

export interface AppContext {
  appState: AppState
  appDispatch: Dispatch<AppAction>
}

const appContext = createContext<AppContext>({
  appState: {
    theme: 'light',
    alerts: [],
    isLoggedIn: false
  },
  appDispatch: () => {}
})

export default appContext
