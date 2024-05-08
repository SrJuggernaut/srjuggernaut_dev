import fileSelectorContext from '@/components/storage/fileSelector/context/context'
import fileSelectorContextReducer from '@/components/storage/fileSelector/context/reducer'
import { FC, ReactNode, useReducer } from 'react'

export interface FileSelectorContextProviderProps {
  bucketId:string
  children: ReactNode
}

const FileSelectorContextProvider: FC<FileSelectorContextProviderProps> = ({ bucketId, children }) => {
  const [state, dispatch] = useReducer(fileSelectorContextReducer, { bucketId, selectedFile: undefined })

  return (
    <fileSelectorContext.Provider value={{ state, dispatch }}>
      {children}
    </fileSelectorContext.Provider>
  )
}

export default FileSelectorContextProvider
