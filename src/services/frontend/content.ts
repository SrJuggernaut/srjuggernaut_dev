import { ContentBlock, ImageBlock, MarkdownBlock } from '@/types/content'
import { nanoid } from 'nanoid'
import { ObjectSchema, array, lazy, object, string } from 'yup'

export const markdownBlockSchema: ObjectSchema<MarkdownBlock> = object({
  id: string().uuid().required('El ID es requerido'),
  type: string().oneOf(['markdown']).required('El tipo es requerido'),
  data: object({
    content: string().required('El contenido es requerido')
  }).required('Los datos son requeridos')
})

export const createNewMarkdownBlock = (): MarkdownBlock => {
  return {
    id: nanoid(),
    type: 'markdown',
    data: {
      content: ''
    }
  }
}

export const imageBlockSchema: ObjectSchema<ImageBlock> = object({
  id: string().uuid().required('El ID es requerido'),
  type: string().oneOf(['image']).required('El tipo es requerido'),
  data: object({
    url: string().url('El link de la imagen no es válido').required('La imagen es requerida'),
    alt: string().required('El texto alternativo es requerido'),
    caption: string().optional()
  })
})

export const createNewImageBlock = (): ImageBlock => {
  return {
    id: nanoid(),
    type: 'image',
    data: {
      url: '',
      alt: '',
      caption: ''
    }
  }
}

export const contentBlockSchema = lazy((item: ContentBlock) => {
  if (item.type === 'markdown') {
    return markdownBlockSchema
  } else if (item.type === 'image') {
    return imageBlockSchema
  } else {
    throw new Error('Invalid content block type')
  }
})

export const contentSchema = array().of(contentBlockSchema).required('El contenido es requerido')
