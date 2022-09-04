import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { themeReducer, alertsReducer } from '@lib/redux/slices'

const reducer = combineReducers({
  theme: themeReducer,
  alerts: alertsReducer
})

export const store = configureStore({
  reducer
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
