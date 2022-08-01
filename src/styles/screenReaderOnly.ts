import { Typography, styled } from '@mui/material'

const ScreenReaderOnly = styled(Typography)({
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
})

export default ScreenReaderOnly
