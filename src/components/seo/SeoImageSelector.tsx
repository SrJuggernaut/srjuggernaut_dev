import { SEO_IMAGES_STORAGE_ID } from '@/lib/env'
import { getFileView } from '@/services/frontend/storage'
import { FC } from 'react'
import FileSelector from '../storage/FileSelector'

export interface SeoImageSelectorProps {
  onSelect: (image: string) => void
}

const SeoImageSelector:FC<SeoImageSelectorProps> = ({ onSelect }) => {
  return (
    <FileSelector
      bucketId={SEO_IMAGES_STORAGE_ID}
      onSelect={(imageFile) => {
        onSelect(getFileView(SEO_IMAGES_STORAGE_ID, imageFile.$id).toString())
      }}
      openButtonLabel='Selecciona una imagen'
      dialogTitleText='Selecciona una imagen'
      dialogDescriptionText='La imagen seleccionada se usara como imagen de SEO para tus publicaciones'
      dialogCancelLabel='Cancelar'
      dialogSelectLabel='Seleccionar'
      accept={['image/jpg', 'image/jpeg', 'image/png']}
    />
  )
}

export default SeoImageSelector
