import { NextApiRequest, NextApiResponse } from 'next'
import { Prisma } from '@prisma/client'
import { ValidationError } from 'yup'

import { ApiError } from '@models/appModels'

const errorHandler = (err:unknown, req:NextApiRequest, res:NextApiResponse) => {
  if (err instanceof ValidationError) {
    res.status(400)
    res.json({ error: err.message })
  } else if (err instanceof ApiError) {
    res.status(err.status)
    res.json({ error: err.message })
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
    case 'P2000':
    case 'P2007':
    case 'P2009':
    case 'P2011':
    case 'P2012':
    case 'P2013':
    case 'P2019':
      res.status(400)
      res.json({ error: err.message })
      break
    case 'P2025': {
        interface Error2025 extends Prisma.PrismaClientKnownRequestError{
          meta:{
            cause: string
          }
        }
        const error2002 = err as Error2025
        res.status(404)
        res.json({ error: error2002.meta.cause })
        break
    }
    case 'P2001':
      res.status(404)
      res.json({ error: 'Not Found' })
      break
    case 'P2002': {
        interface Error2002 extends Prisma.PrismaClientKnownRequestError{
          meta:{
            target: Array<string>
          }
        }
        const error2002 = err as Error2002
        res.status(409)
        res.json({ error: `Unique constraint failed on: "${error2002.meta.target[0]}"` })
        break
    }
    case 'P2003':
    case 'P2004':
    case 'P2014':
      res.status(409)
      res.json({ error: 'Conflict' })
      break
    case 'P2006':
    case 'P2008':
    case 'P2010':
    case 'P2015':
    case 'P2016':
    case 'P2017':
    case 'P2018':
    case 'P2020':
    case 'P2021':
    case 'P2022':
    case 'P2023':
    case 'P2024':
    case 'P2026':
    case 'P2027':
    default:
      console.log('Unexpected prisma error:', err)
      res.status(500)
      res.json({ error: 'Internal Server Error' })
      break
    }
  } else if (err instanceof Prisma.PrismaClientRustPanicError) {
    console.log('Unexpected prisma error:', err)
    res.status(500)
    res.json({ error: 'Internal Server Error' })
  } else {
    console.error('Unknown error:', err)
    res.status(500)
    res.json({ error: 'Internal Server Error' })
  }
}

export default errorHandler
