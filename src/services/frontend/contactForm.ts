import { ID, databases } from '@/lib/appwrite'
import { CONTACT_FORM_COLLECTION_ID, DATABASE_ID } from '@/lib/env'
import { ContactFormData, ContactFormDocument, ContactFormList } from '@/types/contactForm'

type CreateContactForm = (data: ContactFormData) => Promise<ContactFormDocument>

export const createContactForm:CreateContactForm = async (data: { name: string, email: string, message: string }) => {
  return await databases.createDocument<ContactFormDocument>(DATABASE_ID, CONTACT_FORM_COLLECTION_ID, ID.unique(), data)
}

type GetContactForm = (id: string) => Promise<ContactFormDocument>

export const getContactForm:GetContactForm = async (id) => {
  return await databases.getDocument<ContactFormDocument>(DATABASE_ID, CONTACT_FORM_COLLECTION_ID, id)
}

type GetContactForms = () => Promise<ContactFormList>

export const getContactForms:GetContactForms = async () => {
  return await databases.listDocuments<ContactFormDocument>(DATABASE_ID, CONTACT_FORM_COLLECTION_ID)
}

type UpdateContactForm = (id: string, data: ContactFormData) => Promise<ContactFormDocument>

export const updateContactForm:UpdateContactForm = async (id, data) => {
  return await databases.updateDocument<ContactFormDocument>(DATABASE_ID, CONTACT_FORM_COLLECTION_ID, id, data)
}

type DeleteContactForm = (id: string) => Promise<void>

export const deleteContactForm:DeleteContactForm = async (id) => {
  await databases.deleteDocument(DATABASE_ID, CONTACT_FORM_COLLECTION_ID, id)
}
