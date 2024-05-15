import { MEDIA_STORAGE_ID } from '@/lib/env'
import { getFileView } from '@/services/frontend/storage'
import { FC } from 'react'
import FileSelector from './FileSelector'

export interface MediaFileSelectorProps {
  onSelected: (file: string) => void
  openButtonLabel?: string
  dialogTitleText?: string
  dialogDescriptionText?: string
  dialogSelectLabel?: string
  dialogCancelLabel?: string
  accept?: string[]
}

const MediaFileSelector:FC<MediaFileSelectorProps> = ({ accept, onSelected, openButtonLabel, dialogTitleText, dialogDescriptionText, dialogSelectLabel, dialogCancelLabel }) => {
  return (
    <FileSelector
      bucketId={MEDIA_STORAGE_ID}
      onSelect={(file) => {
        const selectedFile = getFileView(MEDIA_STORAGE_ID, file.$id)
        onSelected(selectedFile.toString())
      }}
      openButtonLabel={openButtonLabel ?? 'Seleccionar archivo'}
      dialogCancelLabel={dialogCancelLabel ?? 'Cancelar'}
      dialogDescriptionText={dialogDescriptionText ?? 'Selecciona un archivo'}
      dialogSelectLabel={dialogSelectLabel ?? 'Seleccionar'}
      dialogTitleText={dialogTitleText ?? 'Selecciona un archivo'}
      accept={accept}

    />
  )
}

export default MediaFileSelector
