import type { AppState } from '@contexts/app/appContext'

export type AppAction = |
  { type: 'SET_THEME', payload: 'light' | 'dark' }

const appReducer = (state:AppState, action: AppAction) => {
  switch (action.type) {
  case 'SET_THEME':{
    window.localStorage.setItem('theme', action.payload)
    return { ...state, theme: action.payload }
  }
  default:
    return state
  }
}

export default appReducer
