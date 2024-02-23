import { Models } from '@/lib/appwrite'
export interface ContactFormData {
  name: string
  email: string
  message: string
  read?: boolean
}

export type ContactFormDocument = Models.Document & ContactFormData

export type ContactFormList = Models.DocumentList<ContactFormDocument>
