import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID } from '@/lib/env'
import { Account, Client, Databases, Storage, Teams } from 'appwrite'

const client = new Client()

client
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID)

export const databases = new Databases(client)

export const account = new Account(client)

export const teams = new Teams(client)

export const storage = new Storage(client)

export { AppwriteException, ID, ImageFormat, ImageGravity, Query, type Models, type UploadProgress } from 'appwrite'
export { client }
