import { Client } from 'node-appwrite'

const client = new Client()

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? '')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? '')
  .setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY ?? '')

export type { ID, Models } from 'node-appwrite'
export { client }
