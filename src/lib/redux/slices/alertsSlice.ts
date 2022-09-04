import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { Alert } from '@interfaces/alert'
import { nanoid } from 'nanoid'

type AlertsState = Alert[]

const initialState: AlertsState = []

export const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<Omit<Alert, 'id'>>) => {
      return [
        ...state,
        {
          id: nanoid(),
          ...action.payload
        }
      ]
    },
    removeAlert: (state, action: PayloadAction<string | undefined>) => {
      if (action.payload) {
        return state.filter((alert) => alert.id !== action.payload)
      } else {
        return state.slice(1)
      }
    }
  }
})

const { actions, reducer } = alertsSlice

export const { addAlert, removeAlert } = actions

export { reducer as alertsReducer }
