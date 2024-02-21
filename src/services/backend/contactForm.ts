import { databases, Permission, Role } from '@/lib/nodeAppwrite'
import { DATABASE_ID, ensureDatabase } from '@/services/backend/database'
import { ADMIN_TEAM_ID, ensureAdminTeam } from '@/services/backend/teams'

export const CONTACT_FORM_COLLECTION_ID = 'CONTACT_FORM'
export const CONTACT_FORM_COLLECTION_NAME = 'Contact Forms'

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
    } finally {
      existCollection = true
    }
  }
})()
