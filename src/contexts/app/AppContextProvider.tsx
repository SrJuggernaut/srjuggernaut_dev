import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import React, { useLayoutEffect, useMemo, useReducer } from 'react'

import appContext, { AppState } from '@contexts/app/appContext'
import appReducer from '@contexts/app/appReducer'
import { darkTheme, lightTheme } from '@styles/muiTheme'

export interface AppContextProviderProps {
  children: React.ReactNode
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const initialState: AppState = {
    theme: 'dark'
  }

  const [state, dispatch] = useReducer(appReducer, initialState)

  const theme = useMemo(() => createTheme(state.theme === 'dark' ? darkTheme : lightTheme), [state.theme])

  useLayoutEffect(() => {
    const localTheme = localStorage.getItem('theme') as AppState['theme']
    if (localTheme) {
      dispatch({ type: 'SET_THEME', payload: localTheme })
    }
  }, [])

  return (
    <appContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </appContext.Provider>
  )
}

export default AppContextProvider
