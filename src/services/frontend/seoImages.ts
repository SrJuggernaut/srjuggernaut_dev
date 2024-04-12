import { ID, ImageFormat, ImageGravity, UploadProgress, storage } from '@/lib/appwrite'
import { SEO_IMAGES_STORAGE_ID } from '@/lib/env'

type OnProgress = (progress:UploadProgress) => void

export const uploadSeoImage = async (image: File, onProgress: OnProgress) => {
  return await storage.createFile(SEO_IMAGES_STORAGE_ID, ID.unique(), image, undefined, onProgress)
}

export const deleteSeoImage = async (imageId: string) => {
  return await storage.deleteFile(SEO_IMAGES_STORAGE_ID, imageId)
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

export const getSeoImagePreview = (imageId: string, { width, height, gravity, quality, borderWidth, borderColor, borderRadius, opacity, rotation, background, output }: ImagePreviewData) => {
  return storage.getFilePreview(SEO_IMAGES_STORAGE_ID, imageId, width, height, gravity, quality, borderWidth, borderColor, borderRadius, opacity, rotation, background, output)
}

export const getSeoImageDownload = (imageId: string) => {
  return storage.getFileDownload(SEO_IMAGES_STORAGE_ID, imageId)
}

export const getSeoImage = (imageId: string) => {
  return storage.getFileView(SEO_IMAGES_STORAGE_ID, imageId)
}

export const getSeoImagesList = (queries?: string[], search?: string) => {
  return storage.listFiles(SEO_IMAGES_STORAGE_ID, queries, search)
}
