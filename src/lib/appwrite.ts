import { Account, Client, Databases, Teams } from 'appwrite'

const client = new Client()

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? '')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? '')

export const databases = new Databases(client)

export const account = new Account(client)

export const teams = new Teams(client)

export { AppwriteException, ID, type Models } from 'appwrite'
export { client }
