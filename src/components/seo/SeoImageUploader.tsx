import DropUploader from '@/components/storage/DropUploader'
import { SEO_IMAGES_STORAGE_ID } from '@/lib/env'
import { getFileView, uploadFile } from '@/services/frontend/storage'
import { Typography } from '@mui/material'
import { FC, useCallback } from 'react'

export interface SeoImageUploaderProps {
  onSelected: (url: string) => void
}

const SeoImageUploader:FC<SeoImageUploaderProps> = ({ onSelected }) => {
  const handleDropAccept = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(async (file) => {
      const uploadedImage = await uploadFile(SEO_IMAGES_STORAGE_ID, file)
      const uploadedImageUrl = getFileView(SEO_IMAGES_STORAGE_ID, uploadedImage.$id)
      onSelected(uploadedImageUrl.toString())
    })
  }, [])
  return (
    <DropUploader
      options={{
        accept: {
          'image/jpg': ['.jpg'],
          'image/jpeg': ['.jpg', '.jpeg'],
          'image/png': ['.png']
        },
        multiple: false,
        maxFiles: 1,
        onDropAccepted: handleDropAccept
      }}
      sx={{ aspectRatio: '12/4' }}
    >
      <Typography component='span'>
        Arrastra y suelta una imagen, o haz click para seleccionar
      </Typography>
      <Typography component='span' variant='caption'>
        Formatos permitidos: .jpg, .jpeg, .png
      </Typography>
      <Typography component='span' variant='caption'>
      Aspect ratio recomendado: 120:63
      </Typography>
    </DropUploader>
  )
}

export default SeoImageUploader
