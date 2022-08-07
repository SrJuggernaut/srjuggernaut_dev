import type { AppState, Alert } from '@contexts/app/appContext'

export type AppAction = |
  { type: 'SET_THEME', payload: 'light' | 'dark' } |
  { type: 'ADD_ALERT', payload: Alert } |
  { type: 'REMOVE_ALERT', payload: string } |
  { type: 'SET_IS_LOGGED_IN', payload: boolean }

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
  case 'SET_THEME':{
    window.localStorage.setItem('theme', action.payload)
    return { ...state, theme: action.payload }
  }
  case 'ADD_ALERT':{
    return { ...state, alerts: [...state.alerts, action.payload] }
  }
  case 'REMOVE_ALERT':{
    return { ...state, alerts: state.alerts.filter(m => m.id !== action.payload) }
  }
  default:
    return state
  }
}

export default appReducer
