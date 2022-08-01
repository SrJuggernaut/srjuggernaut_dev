import type { ContactFormData } from '@models/appModels'

export const sendContactForm = async (contactFormData: ContactFormData) => {
  const response = await fetch('/api/contact-form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contactFormData)
  })
  const json = await response.json()
  return json
}
