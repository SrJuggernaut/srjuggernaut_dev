import { Models } from 'appwrite'
import { StateCreator } from 'zustand'

export type SessionSlice = {
  status: 'starting'| 'loading' | 'idle'
  session?: Models.Session
  account?: Models.User<Record<string, any>>
  teams?: Models.TeamList<Record<string, any>>
  setStatus: (status: SessionSlice['status']) => void
  setSession: (session:SessionSlice['session']) => void
  setAccount: (account:SessionSlice['account']) => void
  setTeams: (teams: SessionSlice['teams']) => void
}

const sessionSlice: StateCreator<SessionSlice, [], [], SessionSlice> = (set) => ({
  status: 'starting',
  session: undefined,
  account: undefined,
  teams: undefined,
  setStatus: (status) => set(() => ({ status })),
  setSession: (session) => set(() => ({ session })),
  setAccount: (account) => set(() => ({ account })),
  setTeams: (teams) => set(() => ({ teams }))
})

export default sessionSlice
