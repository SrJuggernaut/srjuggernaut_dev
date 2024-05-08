import FileSelectorDialog from '@/components/storage/fileSelector/FileSelectorDialog'
import FileSelectorContextProvider from '@/components/storage/fileSelector/context/Provider'
import { Models } from '@/lib/appwrite'
import { Button } from '@mui/material'
import { FC, useState } from 'react'

export interface FileSelectorOpenerProps {
  bucketId: string
  openButtonLabel: string
  onSelect: (file: Models.File) => void
  accept?: string[]
  DialogTitleText?: string
  DialogDescriptionText?: string
  DialogSelectLabel?: string
  DialogCancelLabel?: string

}

const FileSelector: FC<FileSelectorOpenerProps> = ({ accept, bucketId, DialogCancelLabel, DialogDescriptionText, DialogSelectLabel, DialogTitleText, openButtonLabel = 'Seleccionar', onSelect }) => {
  const [openFileSelector, setOpenFileSelector] = useState(false)
  return (
    <>
      <Button
        variant="outlined"
        onClick={() => setOpenFileSelector(true)}
      >
        {openButtonLabel}
      </Button>
      {openFileSelector && (
        <FileSelectorContextProvider
          bucketId={bucketId}
        >
          <FileSelectorDialog
            accept={accept}
            setOpenFileSelector={setOpenFileSelector}
            onSelect={onSelect}
            DialogCancelLabel={DialogCancelLabel}
            DialogDescriptionText={DialogDescriptionText}
            DialogSelectLabel={DialogSelectLabel}
            DialogTitleText={DialogTitleText}
          />
        </FileSelectorContextProvider>
      )}
    </>
  )
}

export default FileSelector
