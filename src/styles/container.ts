import { Box, styled } from '@mui/material'

const Container = styled(Box)(({ theme }) => ({
  margin: '0 auto',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    maxWidth: theme.breakpoints.values.sm
  },
  [theme.breakpoints.up('md')]: {
    maxWidth: theme.breakpoints.values.md
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: theme.breakpoints.values.lg
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: theme.breakpoints.values.xl
  }
}))

export default Container
