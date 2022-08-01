import { NextApiRequest, NextApiResponse } from 'next'

const errorHandler = (req:NextApiRequest, res:NextApiResponse) => {
  res.status(405)
  res.json({ error: 'Method Not Allowed' })
}

export default errorHandler
