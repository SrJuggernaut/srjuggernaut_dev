import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Container, Link as MuiLink, Typography } from '@mui/material'
import NextLink from 'next/link'

const Footer = () => {
  return (
    <Box>
      <Container
        fixed
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1fr 1fr 1fr'
            }
          }}
        >
          <Box>
            <Typography component="span" variant='h3'>
              Desarrollo
            </Typography>
            <ul className='fa-ul'>
              <li className='fa-li'>
                <MuiLink component={NextLink} href="/portafolio" >
                  <FontAwesomeIcon icon={faChevronRight} listItem fixedWidth />
                  Portafolio
                </MuiLink>
              </li>
            </ul>
          </Box>
          <Box>
            <Typography component="span" variant='h3'>
              Otros proyectos
            </Typography>
            <ul className='fa-ul'>
              <li className='fa-li'>
                <MuiLink href="https://juggernautplays.com/">
                  <FontAwesomeIcon icon={faChevronRight} listItem fixedWidth />
                  JuggernautPlays
                </MuiLink>
              </li>
              <li className='fa-li'>
                <MuiLink href="https://entgamers.pro/">
                  <FontAwesomeIcon icon={faChevronRight} listItem fixedWidth />
                  EntGamers
                </MuiLink>
              </li>
            </ul>
          </Box>
          <Box>
            <Typography component="span" variant='h3'>
              Contacto
            </Typography>
            <ul className='fa-ul'>
              <li className='fa-li'>
                <MuiLink href="https://www.facebook.com/SrJuggernaut/">
                  <FontAwesomeIcon icon={faChevronRight} listItem fixedWidth />
                  Facebook
                </MuiLink>
              </li>
              <li className='fa-li'>
                <MuiLink href="https://twitter.com/srjuggernaut">
                  <FontAwesomeIcon icon={faChevronRight} listItem fixedWidth />
                  Twitter
                </MuiLink>
              </li>
            </ul>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
