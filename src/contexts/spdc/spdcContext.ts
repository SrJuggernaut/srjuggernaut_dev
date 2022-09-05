import { createContext } from 'react'

import { SdpcContext } from '@interfaces/tools/sdpc'

const sdpcContext = createContext<SdpcContext>({
  sdpcState: {
    description: '',
    tags: [],
    categories: [],
    selectedTags: []
  },
  sdpcDispatch: () => null
})

export default sdpcContext
