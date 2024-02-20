import { teams } from '@/lib/nodeAppwrite'

export const ADMIN_TEAM_ID = 'ADMIN'
export const ADMIN_TEAM_NAME = 'Administrator'

export const ensureAdminTeam = (() => {
  let existAdminTeam = false
  return async () => {
    if (existAdminTeam) return
    try {
      await teams.get(ADMIN_TEAM_ID)
    } catch {
      await teams.create(ADMIN_TEAM_ID, ADMIN_TEAM_NAME)
    } finally {
      existAdminTeam = true
    }
  }
})()
