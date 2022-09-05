import { Dispatch } from 'react'

export interface StableDPTag {
  id: string
  tag: string
  categories: string[]
}

export interface StableDPTagCategory {
  id: string
  name: string
  description: string
}

export interface StableDPTagCategoryWithTags extends StableDPTagCategory {
  tags: StableDPTag[]
}

export interface SdpcState {
  description: string
  tags: StableDPTag[]
  categories: StableDPTagCategory[]
  selectedTags: StableDPTag[]
}

export type SdpcAction = |
  { type: 'setDescription', payload: string } |
  { type: 'addTag', payload: Omit<StableDPTag, 'id'> } |
  { type: 'addTagAndSelect', payload: Omit<StableDPTag, 'id'> } |
  { type: 'addCategory', payload: Omit<StableDPTagCategory, 'id'> } |
  { type: 'addTags', payload: Omit<StableDPTag, 'id'>[] } |
  { type: 'addTagsAndSelect', payload: Omit<StableDPTag, 'id'>[] } |
  { type: 'addCategories', payload: Omit<StableDPTagCategory, 'id'>[] } |
  { type: 'removeTag', payload: string } |
  { type: 'removeCategory', payload: string } |
  { type: 'removeTags', payload: string[] } |
  { type: 'removeCategories', payload: string[] } |
  { type: 'removeAllTags'} |
  { type: 'removeAllCategories'} |
  { type: 'selectTag', payload: string } |
  { type: 'deselectTag', payload: string } |
  { type: 'deselectAllTags' }

export interface SdpcContext {
  sdpcState: SdpcState
  sdpcDispatch: Dispatch<SdpcAction>
}
