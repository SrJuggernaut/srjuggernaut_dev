import { SdpcAction, SdpcState } from '@interfaces/tools/sdpc'
import { nanoid } from 'nanoid'

const sdpcReducer = (state: SdpcState, action: SdpcAction): SdpcState => {
  const isBrowser = typeof window !== 'undefined'
  switch (action.type) {
  case 'setDescription':
    return {
      ...state,
      description: action.payload
    }
  case 'addTag':{
    const { payload } = action
    const { tags } = state
    if (tags.some(tag => tag.tag === payload.tag)) return state
    const newTag = {
      ...payload,
      id: nanoid()
    }
    const newTags = [...tags, newTag]
    if (isBrowser) {
      localStorage.setItem('sdpcTags', JSON.stringify(newTags))
    }
    return { ...state, tags: newTags }
  }
  case 'addTagAndSelect':{
    const { payload } = action
    const { tags, selectedTags } = state
    if (tags.some(tag => tag.tag === payload.tag)) return state
    const newTag = {
      ...payload,
      id: nanoid()
    }
    const newTags = [...tags, newTag]
    const newSelectedTags = [...selectedTags, newTag]
    if (isBrowser) {
      localStorage.setItem('sdpcTags', JSON.stringify(newTags))
    }
    return { ...state, tags: newTags, selectedTags: newSelectedTags }
  }
  case 'addCategory':{
    const { payload } = action
    const { categories } = state
    const newCategory = {
      ...payload,
      id: nanoid()
    }
    const newCategories = [...categories, newCategory]
    if (isBrowser) {
      localStorage.setItem('sdpcCategories', JSON.stringify(newCategories))
    }
    return { ...state, categories: newCategories }
  }
  case 'addTags':{
    const { payload } = action
    const { tags } = state
    const filteredTags = payload.filter(tag => !tags.some(t => t.tag === tag.tag))
    const newTags = filteredTags.map(tag => ({
      ...tag,
      id: nanoid()
    }))
    if (isBrowser) {
      localStorage.setItem('sdpcTags', JSON.stringify([...tags, ...newTags]))
    }
    return { ...state, tags: [...tags, ...newTags] }
  }
  case 'addTagsAndSelect':{
    const { payload } = action
    const { tags, selectedTags } = state
    const filteredTags = payload.filter(tag => !tags.some(t => t.tag === tag.tag))
    const newTags = filteredTags.map(tag => ({
      ...tag,
      id: nanoid()
    }))
    if (isBrowser) {
      localStorage.setItem('sdpcTags', JSON.stringify([...tags, ...newTags]))
    }
    return { ...state, tags: [...tags, ...newTags], selectedTags: [...selectedTags, ...newTags] }
  }
  case 'addCategories':{
    const { payload } = action
    const { categories } = state
    const newCategories = payload.map(category => ({
      ...category,
      id: nanoid()
    }))
    if (isBrowser) {
      localStorage.setItem('sdpcCategories', JSON.stringify([...categories, ...newCategories]))
    }
    return { ...state, categories: [...categories, ...newCategories] }
  }
  case 'removeTag':{
    const { payload } = action
    const { tags } = state
    const newTags = tags.filter(tag => tag.id !== payload)
    if (isBrowser) {
      localStorage.setItem('sdpcTags', JSON.stringify(newTags))
    }
    return { ...state, tags: newTags }
  }
  case 'removeCategory':{
    const { payload } = action
    const { categories } = state
    const newCategories = categories.filter(category => category.id !== payload)
    if (isBrowser) {
      localStorage.setItem('sdpcCategories', JSON.stringify(newCategories))
    }
    return { ...state, categories: newCategories }
  }
  case 'removeTags':{
    const { payload } = action
    const { tags } = state
    const newTags = tags.filter(tag => !payload.includes(tag.id))
    if (isBrowser) {
      localStorage.setItem('sdpcTags', JSON.stringify(newTags))
    }
    return { ...state, tags: newTags }
  }
  case 'removeCategories':{
    const { payload } = action
    const { categories } = state
    const newCategories = categories.filter(category => !payload.includes(category.id))
    if (isBrowser) {
      localStorage.setItem('sdpcCategories', JSON.stringify(newCategories))
    }
    return { ...state, categories: newCategories }
  }
  case 'removeAllTags':{
    if (isBrowser) {
      localStorage.removeItem('sdpcTags')
    }
    return { ...state, tags: [] }
  }
  case 'removeAllCategories':{
    if (isBrowser) {
      localStorage.removeItem('sdpcCategories')
    }
    return { ...state, categories: [] }
  }
  case 'selectTag':{
    const { payload } = action
    const { tags, selectedTags } = state
    const tag = tags.find(tag => tag.id === payload)
    if (tag) {
      const newSelectedTags = [...selectedTags, tag]
      return { ...state, selectedTags: newSelectedTags }
    } else {
      return state
    }
  }
  case 'deselectTag':{
    const { payload } = action
    const { selectedTags } = state
    const newSelectedTags = selectedTags.filter(tag => tag.id !== payload)
    return { ...state, selectedTags: newSelectedTags }
  }
  case 'deselectAllTags':{
    return { ...state, selectedTags: [] }
  }
  default:
    return state
  }
}

export default sdpcReducer
