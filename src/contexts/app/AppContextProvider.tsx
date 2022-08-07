import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import dynamic from 'next/dynamic'
import React, { useEffect, useMemo, useReducer } from 'react'

import appContext, { AppState } from '@contexts/app/appContext'
import appReducer from '@contexts/app/appReducer'
import { darkTheme, lightTheme } from '@styles/muiTheme'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { account } from '@lib/appwrite'

export interface AppContextProviderProps {
  children: React.ReactNode
}

const Snackbar = dynamic(() => import('@mui/material/Snackbar'), { ssr: false, suspense: true })
const Alert = dynamic(() => import('@mui/material/Alert'), { ssr: false, suspense: true })
const IconButton = dynamic(() => import('@mui/material/IconButton'), { ssr: false, suspense: true })
const Box = dynamic(() => import('@mui/material/Box'), { ssr: false, suspense: true })

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const initialState: AppState = {
    theme: 'dark',
    alerts: [],
    isLoggedIn: false
  }

  const [appState, appDispatch] = useReducer(appReducer, initialState)

  const theme = useMemo(() => createTheme(appState.theme === 'dark' ? darkTheme : lightTheme), [appState.theme])

  useEffect(() => {
    const localTheme = localStorage.getItem('theme') as AppState['theme']
    if (localTheme) {
      appDispatch({ type: 'SET_THEME', payload: localTheme })
    }
    // account.getSession('current')
    //   .then(() => {
    //     appDispatch({ type: 'SET_IS_LOGGED_IN', payload: true })
    //   })
    //   .catch(() => {
    //     appDispatch({ type: 'SET_IS_LOGGED_IN', payload: false })
    //   })
  }, [])

  return (
    <appContext.Provider
      value={{
        appState,
        appDispatch
      }}
    >
      <ThemeProvider theme={theme}>
        {appState.alerts.length > 0 && (
          <Snackbar
            open
            message={appState.alerts[0].text}
          >
            <Alert
              severity={appState.alerts[0].severity}
              sx={{
                display: 'flex',
                alignItems: 'center'
              }}
              action={(
                <IconButton onClick={() => appDispatch({ type: 'REMOVE_ALERT', payload: appState.alerts[0].id })} >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      aspectRatio: '1/1',
                      width: 'auto',
                      height: 'auto',
                      padding: 0,
                      margin: 0
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} fixedWidth size="xs" />
                  </Box>
                </IconButton>
              )}
            >
              {appState.alerts[0].text}
            </Alert>
          </Snackbar>
        ) }
        <CssBaseline />
        {children}
      </ThemeProvider>
    </appContext.Provider>
  )
}

export default AppContextProvider
