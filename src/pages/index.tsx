import { Box, Button, Typography } from '@mui/material'
import type { NextPage } from 'next'
import NextLink from 'next/link'

import Contained from '@components/layouts/Contained'
import Imagotype from '@components/logo/Imagotype'
import Logo from '@components/logo/Logo'
import ScreenReaderOnly from '@styles/screenReaderOnly'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <Contained>
      <Box
        sx={(theme) => ({
          display: 'grid',
          alignItems: 'center',
          gridTemplateColumns: '1fr',
          minHeight: '70vh',
          [theme.breakpoints.up('md')]: {
            gridTemplateColumns: '1fr 1fr'
          }
        })}
      >
        <div>
          <Imagotype
            sx={{
              width: '100%',
              height: 'auto'
            }}
          />
        </div>
        <div>
          <Logo sx={{
            width: '100%',
            height: 'auto'
          }} />
          <ScreenReaderOnly>SrJuggernaut</ScreenReaderOnly>
          <Typography variant="h2" align="center">Diseño web imparable</Typography>
        </div>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          minHeight: '70vh'
        }}
      >
        <Typography variant="h2" align="center">Curriculum</Typography>
        <Box
          sx={(theme) => ({
            display: 'grid',
            gridTemplateColumns: '1fr',
            alignItems: 'center',
            gap: 1,
            [theme.breakpoints.up('sm')]: {
              gridTemplateColumns: '1fr 1fr'
            }
          })}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              '&>div': {
                width: '75%',
                height: 'auto'
              }
            }}
          >
            <div>
              <Image
                src="/img/Juan_Carlos_Sanchez.png"
                alt="Juan Carlos Sánchez Méndez"
                width={600}
                height={600}
              />
            </div>
          </Box>
          <div>
            <Typography gutterBottom variant="h3" align="center">Juan Carlos Sánchez Méndez</Typography>
            <Typography variant="body1" align="center">Soy un FullStack developer Javascript. Quiero crear sitios web y sistemas que impacten positivamente a negocios y comunidades, ganándome la vida con lo que me gusta hacer.</Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: 1
              }}
            >
              <Button
                LinkComponent={NextLink}
                href="/curriculum"
                variant="contained"
              >
                Ver Curriculum
              </Button>
            </Box>
          </div>
        </Box>
      </Box>
    </Contained>
  )
}

export default Home
