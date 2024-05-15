import FilesGrid from '@/components/storage/fileSelector/FilesGrid'
import fileSelectorContext from '@/components/storage/fileSelector/context/context'
import { Models, Query } from '@/lib/appwrite'
import { getFilesList } from '@/services/frontend/storage'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Pagination, Typography } from '@mui/material'
import { FC, useContext, useEffect, useState } from 'react'

export interface FileSelectorDialogProps {
  dialogTitleText?: string
  dialogDescriptionText?: string
  dialogSelectLabel?: string
  dialogCancelLabel?: string
  accept?: string[]
  setOpenFileSelector: (open: boolean) => void
  onSelect: (file: Models.File) => void
}

const FileSelectorDialog: FC<FileSelectorDialogProps> = ({ dialogTitleText, dialogDescriptionText, dialogSelectLabel, dialogCancelLabel, accept, setOpenFileSelector, onSelect }) => {
  const { state: { bucketId, selectedFile } } = useContext(fileSelectorContext)
  const [pagination, setPagination] = useState<{ page: number, pageSize: number }>({ page: 1, pageSize: 10 })
  const [currentFiles, setCurrentFiles] = useState<Models.FileList>({ total: 0, files: [] })

  useEffect(() => {
    const queries = [
      Query.orderDesc('$createdAt'),
      Query.limit(pagination.pageSize),
      Query.offset((pagination.page - 1) * pagination.pageSize)
    ]
    if (accept !== undefined && accept.length > 0) {
      queries.push(Query.equal('mimeType', accept))
    }
    getFilesList(bucketId, queries)
      .then((files) => {
        setCurrentFiles(files)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [pagination.page, pagination.pageSize])

  return (
    <Dialog
      open
      onClose={() => setOpenFileSelector(false)}
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle>
        {dialogTitleText ?? 'Seleccionar archivo'}
      </DialogTitle>
      <DialogContent>
        {dialogDescriptionText !== undefined && dialogDescriptionText.length > 0 && <Typography>{dialogDescriptionText}</Typography>}
        <FilesGrid
          files={currentFiles.files}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            paddingBlockStart: 2
          }}
        >

          <Pagination
            count={Math.ceil(currentFiles.total / pagination.pageSize)}
            page={pagination.page}
            onChange={(_, page) => setPagination({ ...pagination, page })}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setOpenFileSelector(false)}
        >
          {dialogCancelLabel ?? 'Cancelar'}
        </Button>
        <Button
          disabled={selectedFile === undefined}
          onClick={() => {
            if (selectedFile === undefined) return
            onSelect(selectedFile)
            setOpenFileSelector(false)
          }}
        >
          {dialogSelectLabel ?? 'Seleccionar'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FileSelectorDialog
