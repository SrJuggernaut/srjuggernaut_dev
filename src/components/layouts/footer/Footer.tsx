import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Typography } from '@mui/material'
import React from 'react'

import Container from '@styles/container'
import Link from '@components/Link'

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
            <ul className='fa-ul'>
              <li className='fa-li'>
                <Link href="/portafolio">
                  <FontAwesomeIcon icon={faChevronRight} listItem fixedWidth />
                  Portafolio
                </Link>
              </li>
            </ul>
          </Box>
          <Box>
            <Typography component="span" variant='h3'>
              Otros proyectos
            </Typography>
            <ul className='fa-ul'>
              <li className='fa-li'>
                <Link href="https://juggernautplays.com/">
                  <FontAwesomeIcon icon={faChevronRight} listItem fixedWidth />
                  JuggernautPlays
                </Link>
              </li>
              <li className='fa-li'>
                <Link href="https://entgamers.pro/">
                  <FontAwesomeIcon icon={faChevronRight} listItem fixedWidth />
                  EntGamers
                </Link>
              </li>
            </ul>
          </Box>
          <Box>
            <Typography component="span" variant='h3'>
              Contacto
            </Typography>
            <ul className='fa-ul'>
              <li className='fa-li'>
                <Link href="https://www.facebook.com/SrJuggernaut/">
                  <FontAwesomeIcon icon={faChevronRight} listItem fixedWidth />
                  Facebook
                </Link>
              </li>
              <li className='fa-li'>
                <Link href="https://twitter.com/srjuggernaut">
                  <FontAwesomeIcon icon={faChevronRight} listItem fixedWidth />
                  Twitter
                </Link>
              </li>
            </ul>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
