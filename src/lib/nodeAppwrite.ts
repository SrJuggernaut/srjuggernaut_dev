import { APPWRITE_ENDPOINT, APPWRITE_KEY_SECRET, APPWRITE_PROJECT_ID } from '@/lib/env'
import { Client, Databases, Teams } from 'node-appwrite'

const client = new Client()

client
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID)
  .setKey(APPWRITE_KEY_SECRET)

export const databases = new Databases(client)

export const teams = new Teams(client)

export { Permission, Role, type Models } from 'node-appwrite'
export { client }
