import { account, teams } from '@/lib/appwrite'

export const login = async (email: string, password: string) => {
  return await account.createEmailSession(email, password)
}

export const getCurrentSession = async () => {
  return await account.getSession('current')
}

export const getCurrentUser = async () => {
  return await account.get()
}

export const getCurrentUserTeams = async () => {
  return await teams.list()
}
