'use client'
import Imagotype from '@/components/assets/Imagotype'
import useStore from '@/state/useStore'
import { faBars, faMoon, faSun, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppBar, Box, Container, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Link as MuiLink } from '@mui/material'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const Header = () => {
  const toggleTheme = useStore((state) => state.toggleTheme)
  const theme = useStore((state) => state.theme)
  const [isDrawerOpened, setIsDrawerOpened] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const menuLinks = [
    { id: '10e1b01e-1f12-49a7-890a-d893c71c2688', label: 'Home', url: '/' },
    { id: '3d14fcb4-3541-44f6-ac43-1a09a54d387e', label: 'Curriculum', url: '/curriculum' },
    { id: 'd866bb0b-d707-40df-9393-be71786008ee', label: 'Contacto', url: '/contacto' }
  ]

  const handleScroll = () => {
    if (window.scrollY > 15) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <AppBar
        component="header"
        position='fixed'
        color={isScrolled ? 'primary' : 'transparent'}
        elevation={isScrolled ? 4 : 0}
      >
        <Container
          fixed
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: isScrolled ? '5px 0' : '10px 0',
            transition: 'all 0.3s ease-in-out'
          }}
        >
          <MuiLink sx={{ color: 'inherit' }} component={NextLink} href='/' >
            <Imagotype
              sx={{
                height: '40px',
                width: 'auto',
                fill: 'currentColor'
              }}
            />
          </MuiLink>
          <Box>
            <IconButton
              color='inherit'
              onClick={() => {
                toggleTheme()
              }}
            >
              {theme === 'dark'
                ? (
                  <FontAwesomeIcon icon={faSun} />
                )
                : (
                  <FontAwesomeIcon icon={faMoon} />
                )}
            </IconButton>
            <IconButton
              color='inherit'
              onClick={() => setIsDrawerOpened(true)}
            >
              <FontAwesomeIcon icon={faBars} />
            </IconButton>
          </Box>
        </Container>
      </AppBar>
      <Drawer
        anchor='right'
        open={isDrawerOpened}
        onClose={() => setIsDrawerOpened(false)}
      >
        <Box
          component='nav'
          sx={(theme) => ({
            width: '100vw',
            height: '100%',
            [theme.breakpoints.up('sm')]: {
              maxWidth: '250px'
            }
          })}
        >
          <Box
            sx={{
              display: 'flex',
              padding: 1,
              justifyContent: 'space-between'
            }}
          >
            <Imagotype
              sx={{
                height: '40px',
                width: 'auto',
                fill: 'currentColor'
              }}
            />
            <IconButton
              color='inherit'
              onClick={() => setIsDrawerOpened(false)}
            >
              <FontAwesomeIcon icon={faTimes} fixedWidth/>
            </IconButton>
          </Box>
          <Divider />
          <List
            onClick={() => setIsDrawerOpened(false)}
          >
            {menuLinks.map((link) => {
              const isCurrent = link.url === pathname
              return (
                <ListItem key={link.id} disablePadding>
                  <ListItemButton component={NextLink} href={link.url} sx={{ width: '100%' }} selected={isCurrent}>
                    <ListItemText primary={link.label} />
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </Box>
      </Drawer>
    </>
  )
}

export default Header
