import { Box, Typography } from '@mui/material'
import Container from '@styles/container'
import React from 'react'

const Footer = () => {
  return (
    <Box>
      <Container>
        <Box
          sx={(theme) => ({
            display: 'grid',
            gridTemplateColumns: '1fr',
            [theme.breakpoints.up('sm')]: {
              gridTemplateColumns: '1fr 1fr'
            },
            [theme.breakpoints.up('md')]: {
              gridTemplateColumns: '1fr 1fr 1fr'
            }
          })}
        >
          <Box>
            <Typography component="span" variant='h3'>
              Desarrollo
            </Typography>
          </Box>
          <Box>
            <Typography component="span" variant='h3'>
              Otros proyectos
            </Typography>
          </Box>
          <Box>
            <Typography component="span" variant='h3'>
              Contacto
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
