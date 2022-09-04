import { useDispatch } from 'react-redux'

import { store } from '@lib/redux'

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch

export default useAppDispatch
