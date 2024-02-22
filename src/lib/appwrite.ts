import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID } from '@/lib/env'
import { Account, Client, Databases, Teams } from 'appwrite'

const client = new Client()

client
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID)

export const databases = new Databases(client)

export const account = new Account(client)

export const teams = new Teams(client)

export { AppwriteException, ID, type Models } from 'appwrite'
export { client }
