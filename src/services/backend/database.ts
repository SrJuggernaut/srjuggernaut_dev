import { DATABASE_ID, DATABASE_NAME } from '@/lib/env'
import { databases } from '@/lib/nodeAppwrite'

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
