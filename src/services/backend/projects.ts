import { ADMIN_TEAM_ID, DATABASE_ID, PROJECT_COLLECTION_ID, PROJECT_COLLECTION_NAME } from '@/lib/env'
import { Permission, Role, databases } from '@/lib/nodeAppwrite'
import { ensureDatabase } from './database'

export const ensureProjectsCollection = (() => {
  let existCollection = false
  return async () => {
    await ensureDatabase()
    if (existCollection) return
    try {
      await databases.getCollection(DATABASE_ID, PROJECT_COLLECTION_ID)
    } catch {
      const permissions = [
        Permission.create(Role.team(ADMIN_TEAM_ID)),
        Permission.read(Role.any()),
        Permission.update(Role.team(ADMIN_TEAM_ID)),
        Permission.delete(Role.team(ADMIN_TEAM_ID))
      ]
      await databases.createCollection(DATABASE_ID, PROJECT_COLLECTION_ID, PROJECT_COLLECTION_NAME, permissions, false, true)
      await databases.createStringAttribute(DATABASE_ID, PROJECT_COLLECTION_ID, 'title', 128, true, undefined, false, false)
      await databases.createStringAttribute(DATABASE_ID, PROJECT_COLLECTION_ID, 'slug', 128, true, undefined, false, false)
      await databases.createStringAttribute(DATABASE_ID, PROJECT_COLLECTION_ID, 'description', 300, true, undefined, false, false)
      await databases.createUrlAttribute(DATABASE_ID, PROJECT_COLLECTION_ID, 'image', true, undefined, false)
      await databases.createStringAttribute(DATABASE_ID, PROJECT_COLLECTION_ID, 'links', 2048, true, undefined, false, false)
      await databases.createStringAttribute(DATABASE_ID, PROJECT_COLLECTION_ID, 'technologies', 32, true, undefined, true, false)
      await databases.createStringAttribute(DATABASE_ID, PROJECT_COLLECTION_ID, 'content', 102_400, true, undefined, false, false)
    } finally {
      existCollection = true
    }
  }
})()
