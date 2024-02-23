import Imagotype from '@/components/assets/Imagotype'
import Logo from '@/components/assets/Logo'
import { Box, Button, Typography } from '@mui/material'
import NextImage from 'next/image'
import NextLink from 'next/link'

const HomePage = () => {
  return (
    <>
      <Box
        sx={{
          display: 'grid',
          alignItems: 'center',
          gridTemplateColumns: {
            xs: '1fr',
            md: '1fr 1fr'
          },
          minHeight: '70vh'
        }}
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
          <Typography variant="h1" sx={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: '0',
            margin: '-1px',
            border: '0',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            background: 'transparent'
          }}>SrJuggernaut</Typography>
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
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr'
            },
            alignItems: 'center',
            gap: 1
          }}
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
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                aspectRatio: '1/1'
              }}
            >
              <NextImage
                src="/img/Juan_Carlos_Sanchez.png"
                alt="Juan Carlos Sánchez Méndez"
                fill
                style={{
                  objectFit: 'contain'
                }}
              />
            </Box>
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
    </>
  )
}

export default HomePage
