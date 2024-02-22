import appSlice, { AppSlice } from '@/state/appSlice'
import feedbackSlice, { FeedbackSlice } from '@/state/feedbackSlice'
import sessionSlice, { SessionSlice } from '@/state/sessionSlice'
import { create } from 'zustand'

const useStore = create<AppSlice & FeedbackSlice & SessionSlice>()((...a) => ({
  ...appSlice(...a),
  ...feedbackSlice(...a),
  ...sessionSlice(...a)
}))

export default useStore
