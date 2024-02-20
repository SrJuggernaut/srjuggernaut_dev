import { databases } from '@/lib/nodeAppwrite'

export const DATABASE_ID = 'WEB_APP_DATABASE'
export const DATABASE_NAME = 'Web App Database'

export const ensureDatabase = (() => {
  let existDatabase = false
  return async () => {
    if (existDatabase) return
    try {
      await databases.get(DATABASE_ID)
    } catch {
      await databases.create(DATABASE_ID, DATABASE_NAME, true)
    } finally {
      existDatabase = true
    }
  }
})()
