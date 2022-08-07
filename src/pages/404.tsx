import { Box, Typography } from '@mui/material'
import React from 'react'

import Contained from '@components/layouts/Contained'
import Link from '@components/Link'
import Seo from '@components/Seo'

const Portafolio = () => {
  return (
    <Contained>
      <Seo
        title="Not Found"
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 120px)'
        }}
      >
        <Box
          sx={(theme) => ({
            width: '100%',
            padding: 1,
            [theme.breakpoints.up('sm')]: {
              maxWidth: theme.breakpoints.values.sm
            }
          })}
        >
          <Typography variant="h1" align="center" color="secondary" gutterBottom>404</Typography>
          <Typography variant="h2" align="center" gutterBottom>Página no encontrada</Typography>
          <Typography variant="body1" align="center">Quizá te interesa <Link href="/">volver al inicio</Link>.</Typography>
        </Box>
      </Box>
    </Contained>
  )
}

export default Portafolio
