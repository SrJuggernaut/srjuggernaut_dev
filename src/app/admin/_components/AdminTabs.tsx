'use client'
import TabContactForm from '@/app/admin/_components/TabContactForm'
import useStore from '@/state/useStore'
import { Box, Skeleton, Tab, Tabs, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type ExistentTab = 'initial' | 'contact-forms'

const AdminTabs = () => {
  const status = useStore((state) => state.status)
  const account = useStore((state) => state.account)
  const teams = useStore((state) => state.teams)
  const [currentTaB, setCurrentTaB] = useState<ExistentTab>('initial')
  const router = useRouter()

  useEffect(() => {
    if (status === 'idle' && account === undefined && teams === undefined) {
      router.push('/login')
    }
  }, [status])
  if (status === 'starting' || status === 'loading') {
    return (
      <>
        <Skeleton variant="text" sx={{ fontSize: '48px' }} />
        <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      </>
    )
  }
  return (
    <>
      <Box
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tabs
          value={currentTaB}
          onChange={(_event, newValue) => setCurrentTaB(newValue)}
        >
          <Tab label="Initial" value="initial" />
          <Tab label="Contactos" value="contact-forms" />
        </Tabs>
      </Box>
      <AnimatePresence
        initial={false}
        mode="wait"
      >
        {currentTaB === 'initial' && (
          <Box
            key="initial"
            component={motion.div}
            sx={{
              padding: 2
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Typography variant="h2" align="center">Panel de administración</Typography>
            <Typography variant="body1">
              Desde esta pagina puedes administrar la pagina completa.
            </Typography>
          </Box>
        )}
        {currentTaB === 'contact-forms' && (
          <Box
            key="contact-forms"
            component={motion.div}
            sx={{
              padding: 2
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <TabContactForm />
          </Box>
        )}
      </AnimatePresence>
    </>
  )
}

export default AdminTabs
