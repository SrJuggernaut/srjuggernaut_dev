'use client'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { FC } from 'react'
import { InferType, object, string } from 'yup'

export const contactFormSchema = object({
  name: string().required('El nombre es requerido'),
  email: string().email('El email no es válido').required('El email es requerido'),
  message: string().required('El mensaje es requerido')
})

export type ContactFormData = InferType<typeof contactFormSchema>

const ContactForm:FC = () => {
  const formik = useFormik<ContactFormData>({
    initialValues: {
      name: '',
      email: '',
      message: ''
    },
    onSubmit: async (values) => {
      // TODO: Implementar envío de mensajes
    },
    validationSchema: contactFormSchema
  })

  return (
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
        error={formik.errors.name !== undefined && formik.touched.name !== undefined}
        helperText={formik.errors.name !== undefined && formik.touched.name !== undefined && formik.errors.name}
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
        error={formik.errors.email !== undefined && formik.touched.email !== undefined}
        helperText={formik.errors.email !== undefined && formik.touched.email !== undefined && formik.errors.email}
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
        error={formik.errors.message !== undefined && formik.touched.message !== undefined}
        helperText={formik.errors.message !== undefined && formik.touched.message !== undefined && formik.errors.message}
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
  )
}

export default ContactForm
