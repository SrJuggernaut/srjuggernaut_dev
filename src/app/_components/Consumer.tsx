'use client'
import useStore from '@/state/useStore'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert, AlertTitle, Box, IconButton, Snackbar } from '@mui/material'
import { FC } from 'react'

const Consumer:FC = () => {
  const alerts = useStore((state) => state.alerts)
  const removeAlert = useStore((state) => state.removeAlert)
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
