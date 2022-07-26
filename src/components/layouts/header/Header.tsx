import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

import Imagotype from '@components/logo/Imagotype'
import appContext from '@contexts/app/appContext'
import Container from '@styles/container'

const Header = () => {
  const { dispatch, state } = useContext(appContext)
  const [isDrawerOpened, setIsDrawerOpened] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
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
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: isScrolled ? '5px 0' : '10px 0',
            transition: 'all 0.3s ease-in-out'
          }}
        >
          <Imagotype
            sx={{
              height: '40px',
              width: 'auto',
              fill: 'currentColor'
            }}
          />
          <Box>
            <IconButton
              color='inherit'
              onClick={() => dispatch({ type: 'SET_THEME', payload: state.theme === 'light' ? 'dark' : 'light' })}
            >
              {state.theme === 'dark'
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
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  )
}

export default Header
