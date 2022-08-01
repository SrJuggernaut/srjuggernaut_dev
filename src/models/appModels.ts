import * as Yup from 'yup'

export class ApiError extends Error {
  status: number
  message: string
  constructor (status: number, message: string) {
    super(message)
    this.status = status
    this.message = message
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}

export interface ApiResponse<T> {
  message: string
  data?: T
}

export interface ApiErrorResponse {
  error: string
}

export const contactFormSchema = Yup.object({
  name: Yup.string().required('El nombre es requerido'),
  email: Yup.string().email('El email no es válido').required('El email es requerido'),
  message: Yup.string().required('El mensaje es requerido')
})

export type ContactFormData = Yup.InferType<typeof contactFormSchema>
