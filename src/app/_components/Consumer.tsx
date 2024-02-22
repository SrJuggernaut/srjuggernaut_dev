'use client'
import useHandleError from '@/hooks/useHandleError'
import { getCurrentSession, getCurrentUser, getCurrentUserTeams } from '@/services/frontend/account'
import useStore from '@/state/useStore'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert, AlertTitle, Box, IconButton, Snackbar } from '@mui/material'
import { AppwriteException } from 'appwrite'
import { FC, useCallback, useEffect } from 'react'

const Consumer:FC = () => {
  const { handleError } = useHandleError()
  const alerts = useStore((state) => state.alerts)
  const removeAlert = useStore((state) => state.removeAlert)
  const status = useStore((state) => state.status)
  const setStatus = useStore((state) => state.setStatus)
  const setAccount = useStore((state) => state.setAccount)
  const setTeams = useStore((state) => state.setTeams)
  const setSession = useStore((state) => state.setSession)

  const startSession = useCallback(async () => {
    setStatus('loading')
    try {
      const session = await getCurrentSession()
      const user = await getCurrentUser()
      const teams = await getCurrentUserTeams()
      setSession(session)
      setAccount(user)
      setTeams(teams)
    } catch (error) {
      setAccount(undefined)
      setTeams(undefined)
      setSession(undefined)
      if (!(error instanceof AppwriteException && error.code === 401)) {
        throw error
      }
    } finally {
      setStatus('idle')
    }
  }, [])

  useEffect(() => {
    if (status === 'starting') {
      startSession()
        .catch(error => {
          handleError(error, 'Error al cargar la sesión', 'Ocurrio un error al cargar la sesión. Por favor, inicia de nuevo la sesión.')
        })
    }
  }, [status])

  return (
    <>
      {alerts.length > 0 && (
        <Snackbar
          open
          message={alerts[0].text}
        >
          <Alert
            severity={alerts[0].severity}
            variant='filled'
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
            action={(
              <IconButton onClick={() => {
                removeAlert(alerts[0].id)
              }} >
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
            <AlertTitle>{alerts[0].title}</AlertTitle>
            {alerts[0].text}
          </Alert>
        </Snackbar>
      ) }
    </>
  )
}

export default Consumer
