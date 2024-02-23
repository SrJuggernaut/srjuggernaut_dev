'use client'
import useStore from '@/state/useStore'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { FC, ReactNode, useMemo } from 'react'
import { darkTheme, lightTheme } from 'srjuggernaut-mui-theme'

interface ProviderProps {
  children: ReactNode
}

const Provider:FC<ProviderProps> = ({ children }) => {
  const currentTheme = useStore((state) => state.theme)

  const theme = useMemo(() => createTheme(currentTheme === 'light' ? lightTheme : currentTheme === 'dark' ? darkTheme : darkTheme), [currentTheme])

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  )
}

export default Provider
