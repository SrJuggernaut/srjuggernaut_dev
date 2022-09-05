import { FC, ReactNode, useEffect, useReducer } from 'react'

import { spdcContext, spdcReducer } from '@contexts/spdc/'
import { SdpcState } from '@interfaces/tools/sdpc'

export interface SpdcProviderProps {
  children: ReactNode
}

const SpdcProvider: FC<SpdcProviderProps> = ({ children }) => {
  const initialState: SdpcState = {
    description: '',
    tags: [],
    categories: [],
    selectedTags: []
  }
  const [sdpcState, sdpcDispatch] = useReducer(spdcReducer, initialState)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sdpcDispatch({ type: 'addTags', payload: JSON.parse(localStorage.getItem('sdpcTags') || '[]') })
      sdpcDispatch({ type: 'addCategories', payload: JSON.parse(localStorage.getItem('sdpcCategories') || '[]') })
    }
  }, [])
  return (
    <spdcContext.Provider
      value={{
        sdpcState,
        sdpcDispatch
      }}
    >
      {children}
    </spdcContext.Provider>
  )
}
export default SpdcProvider
