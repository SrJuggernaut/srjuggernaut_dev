import { ID, databases } from '@/lib/appwrite'
import { DATABASE_ID, PROJECT_COLLECTION_ID } from '@/lib/env'
import { ProjectData, ProjectDocument, ProjectDocumentData, ProjectDocumentParsed, ProjectDocumentParsedList } from '@/types/project'
import { ObjectSchema, array, object, string } from 'yup'
import { contentSchema } from './content'

export const projectDataSchema: ObjectSchema<ProjectData> = object({
  title: string().max(128, 'El titulo es demasiado extenso, máximo 128 caracteres').required('El tiúlo es requerido'),
  slug: string().max(128, 'El slug es demasiado extenso, máximo 128 caracteres').matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/gm, 'El slug no es valido').required('El slug es requerido'),
  description: string().max(300, 'La descripción es demasiado extensa, máximo 300 caracteres').required('La descripción es requerida'),
  image: string().url('El link de la imagen no es válido').required('La imagen es requerida'),
  links: array().of(object({
    label: string().required('El label es requerido'),
    url: string().url('El link no es válido').required('El link es requerido'),
    icon: string().url('El icon no es válido').optional()
  })).required('Los links son requeridos'),
  technologies: array().of(string().required('La tecnología es requerida')).required('Las tecnologías son requeridas'),
  content: contentSchema.required('El contenido es requerido')
})

const projectDataToDocumentData = (data: ProjectData):ProjectDocumentData => {
  return {
    ...data,
    links: JSON.stringify(data.links),
    content: JSON.stringify(data.content)
  }
}

const projectDocumentToProjectDocumentParsed = (data: ProjectDocument):ProjectDocumentParsed => {
  return {
    ...data,
    links: JSON.parse(data.links),
    content: JSON.parse(data.content)
  }
}

export const createProject = async (data: ProjectData): Promise<ProjectDocumentParsed> => {
  const documentData = projectDataToDocumentData(data)
  const createdProject = await databases.createDocument<ProjectDocument>(DATABASE_ID, PROJECT_COLLECTION_ID, ID.unique(), documentData)
  return projectDocumentToProjectDocumentParsed(createdProject)
}

export const getProject = async (id: ProjectDocument['$id']): Promise<ProjectDocumentParsed> => {
  const project = await databases.getDocument<ProjectDocument>(DATABASE_ID, PROJECT_COLLECTION_ID, id)
  const projectData = projectDocumentToProjectDocumentParsed(project)
  return projectData
}

export const getProjects = async (queries:string[]): Promise<ProjectDocumentParsedList> => {
  const projects = await databases.listDocuments<ProjectDocument>(DATABASE_ID, PROJECT_COLLECTION_ID, queries)
  const projectData = projects.documents.map(projectDocumentToProjectDocumentParsed)
  return {
    ...projects,
    documents: projectData
  }
}

export const updateProject = async (id: ProjectDocument['$id'], data: ProjectData): Promise<ProjectDocumentParsed> => {
  const documentData = projectDataToDocumentData(data)
  const updatedProject = await databases.updateDocument<ProjectDocument>(DATABASE_ID, PROJECT_COLLECTION_ID, id, documentData)
  const projectData = projectDocumentToProjectDocumentParsed(updatedProject)
  return projectData
}

export const deleteProject = async (id: ProjectDocument['$id']) => {
  await databases.deleteDocument(DATABASE_ID, PROJECT_COLLECTION_ID, id)
}
