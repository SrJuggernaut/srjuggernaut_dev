export interface MarkdownBlock {
  id: string
  type: 'markdown'
  data: {
    content: string
  }
}

export interface ImageBlock {
  id: string
  type: 'image'
  data: {
    url: string
    alt: string
    caption?: string
  }
}

export type ContentBlock = MarkdownBlock | ImageBlock
