'use client'
import useStore from '@/state/useStore'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dynamic from 'next/dynamic'
import { FC } from 'react'

const Snackbar = dynamic(() => import('@mui/material/Snackbar'), { ssr: false, suspense: true })
const Alert = dynamic(() => import('@mui/material/Alert'), { ssr: false, suspense: true })
const AlertTitle = dynamic(() => import('@mui/material/AlertTitle'), { ssr: false, suspense: true })
const IconButton = dynamic(() => import('@mui/material/IconButton'), { ssr: false, suspense: true })
const Box = dynamic(() => import('@mui/material/Box'), { ssr: false, suspense: true })

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
