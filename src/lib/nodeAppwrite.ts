import { Client, Databases, Teams } from 'node-appwrite'

const client = new Client()

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? '')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? '')
  .setKey(process.env.APPWRITE_KEY_SECRET ?? '')

export const databases = new Databases(client)

export const teams = new Teams(client)

export { Permission, Role, type Models } from 'node-appwrite'
export { client }
