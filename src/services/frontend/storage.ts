import { ID, ImageFormat, ImageGravity, UploadProgress, storage } from '@/lib/appwrite'

type OnProgress = (progress:UploadProgress) => void

export const uploadFile = async (bucketId: string, file: File, onProgress?: OnProgress) => {
  return await storage.createFile(bucketId, ID.unique(), file, undefined, onProgress)
}

export const updateFile = async (bucketId: string, fileId: string, name: string, permissions?:string[]) => {
  return await storage.updateFile(bucketId, fileId, name, permissions)
}

export const deleteFile = async (bucketId: string, fileId: string) => {
  return await storage.deleteFile(bucketId, fileId)
}

interface ImagePreviewData {
  width?: number
  height?: number
  gravity?: ImageGravity
  quality?: number
  borderWidth?: number
  borderColor?: string
  borderRadius?: number
  opacity?: number
  rotation?: number
  background?: string
  output?:ImageFormat
}

export const getFilePreview = (bucketId: string, fileId: string, { width, height, gravity, quality, borderWidth, borderColor, borderRadius, opacity, rotation, background, output }: ImagePreviewData) => {
  return storage.getFilePreview(bucketId, fileId, width, height, gravity, quality, borderWidth, borderColor, borderRadius, opacity, rotation, background, output)
}

export const getFilePreviewDownloadUrl = (bucketId: string, fileId: string) => {
  return storage.getFileDownload(bucketId, fileId)
}

export const getFileView = (bucketId: string, fileId: string) => {
  return storage.getFileView(bucketId, fileId)
}

export const getFilesList = (bucketId: string, queries?: string[], search?: string) => {
  return storage.listFiles(bucketId, queries, search)
}
