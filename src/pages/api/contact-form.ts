import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

import { contactFormSchema } from '@models/appModels'
import errorHandler from '@services/api/errorHandler'
import { createContactForm } from '@services/api/contactForm/contactFormStore'

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: errorHandler,
  onNoMatch: (req, res) => {
    res.status(405)
    res.json({ error: 'Method Not Allowed' })
  }
})

handler.post(async (req, res, next) => {
  try {
    const contactFormData = await contactFormSchema.validate(req.body)
    const createdContactForm = await createContactForm(contactFormData)
    res.status(201)
    res.json({
      message: 'Contact form created',
      data: createdContactForm
    })
  } catch (error) {
    next(error)
  }
})

export default handler
