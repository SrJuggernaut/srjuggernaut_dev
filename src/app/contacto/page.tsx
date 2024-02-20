import ContactForm from '@/app/contacto/_components/ContactForm'
import { ensureContactFormCollection } from '@/services/backend/contactForm'
import { faFacebook, faInstagram, faLinkedin, faTwitch, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, IconButton, Typography } from '@mui/material'
import NextLink from 'next/link'

const redesSociales = [
  { id: '331731c0-7a5f-4dc3-b83d-1901c8c2d7cd', name: 'Facebook', url: 'https://www.facebook.com/SrJuggernaut', icon: 'facebook' },
  { id: 'cb119fe1-cfb2-4a74-bc5b-2efbf2f1265f', name: 'Twitter', url: 'https://twitter.com/SrJuggernaut', icon: 'twitter' }
]

const ContactoPage = async () => {
  await ensureContactFormCollection()
  return (
    <>
      <Typography variant="h1" align="center">Contáctame</Typography>
      <Typography variant="body1" align="center">
        Si tienes un proyecto, comunidad, negocio, etc que necesita un sitio web y deseas cotizar puedes contactarme enviando un mensaje mediante el formulario.
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            sx: '1fr',
            md: '1fr 1fr'
          }
        }}
      >
        <Box>
          <Typography variant="h2" align="center" gutterBottom>
            Con un mensaje
          </Typography>
          <ContactForm />
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
              <IconButton
                key={redSocial.id}
                component={NextLink}
                href={redSocial.url}
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
            ))}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default ContactoPage
