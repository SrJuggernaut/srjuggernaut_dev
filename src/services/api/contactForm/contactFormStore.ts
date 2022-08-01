import { Prisma } from '@prisma/client'

import prismaClient from '@lib/prismaClient'

export const createContactForm = async (data: Prisma.ContactFormCreateArgs['data']) => {
  const contactForm = await prismaClient.contactForm.create({ data })
  return contactForm
}
