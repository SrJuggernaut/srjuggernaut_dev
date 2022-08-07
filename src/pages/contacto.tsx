import { useFormik } from 'formik'
import { faFacebook, faInstagram, faLinkedin, faTwitch, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, IconButton, TextField, Typography } from '@mui/material'
import NextLink from 'next/link'
import React, { useContext } from 'react'

import Contained from '@components/layouts/Contained'
import { sendContactForm } from '@services/contact'
import { ContactFormData, contactFormSchema } from '@models/appModels'
import createAlert from '@utilities/createAlert'
import appContext from '@contexts/app/appContext'
import Seo from '@components/Seo'

const Contacto = () => {
  const { appDispatch } = useContext(appContext)
  const formik = useFormik<ContactFormData>({
    initialValues: {
      name: '',
      email: '',
      message: ''
    },
    onSubmit: async (values) => {
      try {
        await sendContactForm(values)
        const successAlert = createAlert({ text: 'Mensaje enviado con éxito', severity: 'success' })
        appDispatch({ type: 'ADD_ALERT', payload: successAlert })
        setTimeout(() => {
          appDispatch({ type: 'REMOVE_ALERT', payload: successAlert.id })
        }
        , 5000)
      } catch (error) {
        const errorAlert = createAlert({ text: 'Error al enviar el mensaje', severity: 'error' })
        appDispatch({ type: 'ADD_ALERT', payload: errorAlert })
        setTimeout(() => {
          appDispatch({ type: 'REMOVE_ALERT', payload: errorAlert.id })
        }
        , 5000)
      }
    },
    validationSchema: contactFormSchema
  })

  const redesSociales = [
    { id: '331731c0-7a5f-4dc3-b83d-1901c8c2d7cd', name: 'Facebook', url: 'https://www.facebook.com/SrJuggernaut', icon: 'facebook' },
    { id: 'cb119fe1-cfb2-4a74-bc5b-2efbf2f1265f', name: 'Twitter', url: 'https://twitter.com/SrJuggernaut', icon: 'twitter' }
  ]
  return (
    <Contained>
      <Seo
        title='Contacto'
        description='Si tienes un proyecto, comunidad, negocio, etc que necesita un sitio web y deseas cotizar puedes contactarme enviando un mensaje...'
      />

      <Typography variant="h1" align="center">Contáctame</Typography>
      <Typography variant="body1" align="center">
        Si tienes un proyecto, comunidad, negocio, etc que necesita un sitio web y deseas cotizar puedes contactarme enviando un mensaje mediante el formulario.
      </Typography>
      <Box
        sx={(theme) => ({
          display: 'grid',
          gridTemplateColumns: '1fr',
          [theme.breakpoints.up('md')]: {
            gridTemplateColumns: '1fr 1fr'
          }
        })}
      >
        <Box>
          <Typography variant="h2" align="center" gutterBottom>
            Con un mensaje
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
          >
            <TextField
              label="Nombre"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.errors.name) && formik.touched.name}
              helperText={formik.errors.name && formik.touched.name && formik.errors.name}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.errors.email) && formik.touched.email}
              helperText={formik.errors.email && formik.touched.email && formik.errors.email}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Mensaje"
              name="message"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.errors.message) && formik.touched.message}
              helperText={formik.errors.message && formik.touched.message && formik.errors.message}
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              margin="normal"
            />
            <Box
              sx={{
                display: 'flex',
                marginBlock: 1
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!formik.isValid || formik.isSubmitting}
                fullWidth
              >
                Enviar
                {formik.isSubmitting && (
                  <FontAwesomeIcon icon={faSpinner} spin />
                )}
              </Button>
            </Box>
          </Box>
        </Box>
        <Box>
          <Typography variant="h2" align="center" gutterBottom>
            En mis redes sociales
          </Typography>
          <Typography variant="body1" align="center">
            Para un contacto directo, puedes contactarme en mis redes sociales, donde estare feliz de responderte cosas sencillas de manera mas rápida.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              marginBlock: 1
            }}
          >
            {redesSociales.map(redSocial => (
              <NextLink
                key={redSocial.id}
                href={redSocial.url}
                passHref
              >
                <IconButton
                  component="a"
                  color="primary"
                  target="_blank"
                >
                  <Box
                    sx={{
                      display: 'flex',
                      aspectRatio: '1/1',
                      padding: '5px'
                    }}
                  >
                    {{
                      facebook: <FontAwesomeIcon icon={faFacebook} size="lg" />,
                      twitter: <FontAwesomeIcon icon={faTwitter} size="lg" />,
                      instagram: <FontAwesomeIcon icon={faInstagram} size="lg" />,
                      twitch: <FontAwesomeIcon icon={faTwitch} size="lg" />,
                      youtube: <FontAwesomeIcon icon={faYoutube} size="lg" />,
                      linkedin: <FontAwesomeIcon icon={faLinkedin} size="lg" />

                    }[redSocial.icon]}
                  </Box>
                </IconButton>
              </NextLink>
            ))}
          </Box>
        </Box>
      </Box>
    </Contained>
  )
}

export default Contacto
