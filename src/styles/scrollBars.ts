import { Box, styled } from '@mui/material'

const ScrollBars = styled(Box)(({ theme }) => ({
  scrollbarWidth: 'thin',
  scrollbarColor: `${theme.palette.secondary.main} rgba(0,0,0,0.3)`,
  '&::-webkit-scrollbar': {
    width: '5px',
    height: '5px'
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(0,0,0,0.3)',
    borderRadius: '5px'
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '5px',
    border: 'transparent'
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: theme.palette.secondary.dark
  }
}))

export default ScrollBars
