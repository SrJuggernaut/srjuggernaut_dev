import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import dynamic from 'next/dynamic'
import { FC, ReactNode, Suspense, SyntheticEvent, useMemo } from 'react'

import useAppSelector from '@hooks/useAppSelector'
import { darkTheme, lightTheme } from '@styles/muiTheme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import useAppDispatch from '@hooks/useAppDispatch'
import { removeAlert } from '@lib/redux/slices'

const Slide = dynamic(() => import('@mui/material/Slide'), { ssr: false, suspense: true })
const Alert = dynamic(() => import('@mui/material/Alert'), { ssr: false, suspense: true })
const AlertTitle = dynamic(() => import('@mui/material/AlertTitle'), { ssr: false, suspense: true })
const SnackBar = dynamic(() => import('@mui/material/Snackbar'), { ssr: false, suspense: true })
const IconButton = dynamic(() => import('@mui/material/IconButton'), { ssr: false, suspense: true })

export interface AppWrapperProps {
  children: ReactNode
}

const AppWrapper: FC<AppWrapperProps> = ({
  children
}) => {
  const state = useAppSelector((state) => state)
  const dispatch = useAppDispatch()
  const theme = useMemo(() => createTheme(state.theme === 'dark' ? darkTheme : lightTheme), [state.theme])

  const handleRemoveFirstAlert = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(removeAlert())
  }
  return (
    <>
      <ThemeProvider theme={theme} >
        <CssBaseline />
        <Suspense>
          {state.alerts.length > 0 && (
            <SnackBar
              open={state.alerts.length > 0}
              TransitionComponent={Slide}
              onClose={handleRemoveFirstAlert}
            >
              <Alert
                severity={state.alerts[0].severity}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      aspectRatio: '1 / 1'
                    }}
                    onClick={handleRemoveFirstAlert}
                  >
                    <FontAwesomeIcon icon={faTimes} size="xs" fixedWidth />
                  </IconButton>
                }
              >
                <AlertTitle >{state.alerts[0].title}</AlertTitle>
                {state.alerts[0].message || null}
              </Alert>
            </SnackBar>
          )}
        </Suspense>
        {children}
      </ThemeProvider>
    </>
  )
}
export default AppWrapper
