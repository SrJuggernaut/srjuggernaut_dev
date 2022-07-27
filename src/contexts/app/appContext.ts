import { createContext, Dispatch } from 'react'

import type { AppAction } from '@contexts/app/appReducer'
export interface AppState {
  theme: 'light' | 'dark'
}

export interface AppContext {
  appState: AppState
  appDispatch: Dispatch<AppAction>
}

const appContext = createContext<AppContext>({} as AppContext)

export default appContext
