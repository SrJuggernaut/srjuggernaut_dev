import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type ThemeState = 'light' | 'dark'

const initialState: ThemeState = typeof window !== 'undefined' ? window.localStorage.getItem('theme') as 'light' | 'dark' : 'dark'

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      return action.payload
    }
  }
})

const { actions, reducer } = themeSlice

export const { setTheme } = actions

export { reducer as themeReducer }
