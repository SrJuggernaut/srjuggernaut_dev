import { Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, Typography } from '@mui/material'
import NextImage from 'next/image'
import NextLink from 'next/link'

import Contained from '@components/layouts/Contained'

const Tools = () => {
  return (
    <Contained>
      <Typography variant="h1" align="center">Tools</Typography>
      <Typography variant="body1">
        Una serie de proyectos que he desarrollado para facilitar mi trabajo, y que espero que puedan ser de utilidad para otros.
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 300px))',
          justifyContent: 'space-around',
          gap: 1,
          mt: 1
        }}
      >
        <Card>
          <NextLink href="/tools/stable-diffusion-pc" passHref>
            <CardActionArea
              LinkComponent={'a'}
            >
              <CardHeader
                title="Stable diffusion prompt creator"
                subheader="Crea prompts para generar imágenes con IA"
              />
              <CardMedia title="Your title">
                <Box sx={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '128 / 72'
                }}>
                  <NextImage
                    src="/img/text-to-image-machine.jpg"
                    layout="fill"
                  />
                </Box>
              </CardMedia>
              <CardContent>
                <Typography variant="body1">
              Este es un proyecto que he desarrollado para facilitar la creación de prompts para generar imágenes con IA.
                </Typography>
              </CardContent>
            </CardActionArea>
          </NextLink>
        </Card>
      </Box>
    </Contained>
  )
}
export default Tools
