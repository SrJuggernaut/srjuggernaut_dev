'use client'
import useHandleError from '@/hooks/useHandleError'
import { getCurrentUser, getCurrentUserTeams, login } from '@/services/frontend/account'
import useStore from '@/state/useStore'
import { Box, Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { object, string } from 'yup'

interface LoginData {
  email: string
  password: string
}

const loginSchema = object({
  email: string().email('El email no es válido').required('El email es requerido'),
  password: string().required('La contraseña es requerida')
})

const LoginForm = () => {
  const { handleError } = useHandleError()
  const router = useRouter()
  const status = useStore((state) => state.status)
  const account = useStore((state) => state.account)
  const setStatus = useStore((state) => state.setStatus)
  const setAccount = useStore((state) => state.setAccount)
  const setTeams = useStore((state) => state.setTeams)
  const setSession = useStore((state) => state.setSession)

  const formik = useFormik<LoginData>({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async ({ email, password }) => {
      setStatus('loading')
      try {
        const session = await login(email, password)
        const user = await getCurrentUser()
        const teams = await getCurrentUserTeams()
        setSession(session)
        setAccount(user)
        setTeams(teams)
      } catch (error) {
        setAccount(undefined)
        setTeams(undefined)
        setSession(undefined)
        handleError(error, 'Error al iniciar sesión', 'Ocurrio un error al iniciar sesión. Por favor, intenta de nuevo.')
      } finally {
        setStatus('idle')
      }
    },
    validationSchema: loginSchema,
    validateOnMount: true
  })

  useEffect(() => {
    if (status === 'idle' && account !== undefined) {
      router.push('/')
    }
  }, [status])

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email !== undefined && formik.errors.email !== undefined}
        helperText={formik.touched.email !== undefined && formik.errors.email !== undefined && formik.errors.email}
        margin="normal"
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Contraseña"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password !== undefined && formik.errors.password !== undefined}
        helperText={formik.touched.password !== undefined && formik.errors.password !== undefined && formik.errors.password}
        margin="normal"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={formik.isSubmitting || !formik.isValid}
        sx={{ mt: 2, mb: 2 }}
      >
        Iniciar sesión
      </Button>
    </Box>
  )
}

export default LoginForm
