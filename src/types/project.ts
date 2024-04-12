import { Models } from '@/lib/appwrite'
import { ContentBlock } from '@/types/content'

export interface ProjectLink {
  label: string
  url: string
  icon?: string
}

export interface ProjectData {
  title: string
  slug: string
  description: string
  image: string
  links: ProjectLink[]
  technologies: string[]
  content: ContentBlock[]
}

export interface ProjectDocumentData {
  title: string
  slug: string
  description: string
  image: string
  links: string
  technologies: string[]
  content: string
}

export type ProjectDocument = ProjectDocumentData & Models.Document

export type ProjectDocumentList = Models.DocumentList<ProjectDocument>

export type ProjectDocumentParsed = ProjectData & Models.Document

export type ProjectDocumentParsedList = Models.DocumentList<ProjectDocumentParsed>
