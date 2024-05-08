import { FileSelectorAction } from '@/components/storage/fileSelector/context/reducer'
import { Models } from '@/lib/appwrite'
import { Dispatch, createContext } from 'react'

export interface FileSelectorState {
  bucketId: string
  selectedFile?: Models.File
}

export interface FileSelectorContext {
  state: FileSelectorState
  dispatch: Dispatch<FileSelectorAction>
}

const fileSelectorContext = createContext<FileSelectorContext>({ state: { selectedFile: undefined, bucketId: '' }, dispatch: () => {} })

export default fileSelectorContext
