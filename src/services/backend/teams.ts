import { ADMIN_EMAIL, ADMIN_TEAM_ID, ADMIN_TEAM_NAME } from '@/lib/env'
import { teams } from '@/lib/nodeAppwrite'

const ensureAdmin = (() => {
  let isAdmin = false
  return async () => {
    const adminEmail = ADMIN_EMAIL
    if (adminEmail === '') {
      // If there is no admin email, we don't need to ensure it
      isAdmin = true
    }
    if (isAdmin) return
    const adminMembers = await teams.listMemberships(ADMIN_TEAM_ID)
    if (adminMembers.total === 0 || !adminMembers.memberships.some((member) => member.userEmail === adminEmail)) {
      await teams.createMembership(ADMIN_TEAM_ID, [], adminEmail)
    }
    isAdmin = true
  }
})()

export const ensureAdminTeam = (() => {
  let existAdminTeam = false
  return async () => {
    if (existAdminTeam) return
    try {
      await teams.get(ADMIN_TEAM_ID)
    } catch {
      await teams.create(ADMIN_TEAM_ID, ADMIN_TEAM_NAME)
    } finally {
      await ensureAdmin()
      existAdminTeam = true
    }
  }
})()
