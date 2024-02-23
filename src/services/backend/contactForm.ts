import { ADMIN_TEAM_ID, CONTACT_FORM_COLLECTION_ID, CONTACT_FORM_COLLECTION_NAME, DATABASE_ID } from '@/lib/env'
import { Permission, Role, databases } from '@/lib/nodeAppwrite'
import { ensureDatabase } from '@/services/backend/database'
import { ensureAdminTeam } from '@/services/backend/teams'

export const ensureContactFormCollection = (() => {
  let existCollection = false
  return async () => {
    await ensureDatabase()
    await ensureAdminTeam()
    if (existCollection) return
    try {
      await databases.getCollection(DATABASE_ID, CONTACT_FORM_COLLECTION_ID)
    } catch {
      const permissions = [
        Permission.create(Role.any()),
        Permission.read(Role.team(ADMIN_TEAM_ID)),
        Permission.update(Role.team(ADMIN_TEAM_ID)),
        Permission.delete(Role.team(ADMIN_TEAM_ID))
      ]
      await databases.createCollection(DATABASE_ID, CONTACT_FORM_COLLECTION_ID, CONTACT_FORM_COLLECTION_NAME, permissions, false, true)
      await databases.createStringAttribute(DATABASE_ID, CONTACT_FORM_COLLECTION_ID, 'name', 128, true, undefined, false)
      await databases.createEmailAttribute(DATABASE_ID, CONTACT_FORM_COLLECTION_ID, 'email', true, undefined, false)
      await databases.createStringAttribute(DATABASE_ID, CONTACT_FORM_COLLECTION_ID, 'message', 1024, true, undefined, false)
      await databases.createBooleanAttribute(DATABASE_ID, CONTACT_FORM_COLLECTION_ID, 'read', false, true)
    } finally {
      existCollection = true
    }
  }
})()
