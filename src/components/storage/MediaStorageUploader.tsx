import DropUploader from '@/components/storage/DropUploader'
import { MEDIA_STORAGE_ID } from '@/lib/env'
import { getFileView, uploadFile } from '@/services/frontend/storage'
import { Typography } from '@mui/material'
import { FC, useCallback } from 'react'

export interface MediaStorageUploaderProps {
  accept?: Record<string, string[]>
  onSelected: (url: string) => void
}

const MediaStorageUploader:FC<MediaStorageUploaderProps> = ({ onSelected, accept }) => {
  const handleDropAccept = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(async (file) => {
      const uploadedImage = await uploadFile(MEDIA_STORAGE_ID, file)
      const uploadedImageUrl = getFileView(MEDIA_STORAGE_ID, uploadedImage.$id)
      onSelected(uploadedImageUrl.toString())
    })
  }, [])
  return (
    <DropUploader
      options={{
        accept,
        onDropAccepted: handleDropAccept
      }}
      sx={{
        minHeight: '150px'
      }}
    >
      <Typography component='span'>
        Arrastra y suelta una imagen, o haz click para seleccionar
      </Typography>
    </DropUploader>
  )
}

export default MediaStorageUploader
