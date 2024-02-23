import { Card, CardContent, Container, Typography } from '@mui/material'
import { darkTheme } from 'srjuggernaut-mui-theme'
import LoginForm from './_components/LoginForm'

const LoginPage = () => {
  return (
    <>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 120px)'
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: darkTheme.breakpoints?.values?.sm
          }}
        >
          <CardContent>
            <Typography variant="h1" align="center">Iniciar sesión</Typography>
            <LoginForm />
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

export default LoginPage
