import { FileSelectorState } from '@/components/storage/fileSelector/context/context'

export type FileSelectorAction =
| { type: 'setFile', payload: FileSelectorState['selectedFile'] }

const fileSelectorContextReducer = (state: FileSelectorState, action: FileSelectorAction): FileSelectorState => {
  switch (action.type) {
    case 'setFile':
      return {
        ...state,
        selectedFile: action.payload
      }
    default:
      return state
  }
}

export default fileSelectorContextReducer
