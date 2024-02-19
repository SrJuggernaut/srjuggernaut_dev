import { Box, Container, Link as MuiLink, Typography } from '@mui/material'
import NextLink from 'next/link'

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 120px)'
      }}
    >
      <Container
        fixed
      >
        <Typography variant="h1" align="center" color="secondary" gutterBottom>404</Typography>
        <Typography variant="h2" align="center" gutterBottom>Página no encontrada</Typography>
        <Typography variant="body1" align="center">Quizá te interesa <MuiLink component={NextLink} href="/">volver al inicio</MuiLink>.</Typography>
      </Container>
    </Box>
  )
}

export default NotFound
