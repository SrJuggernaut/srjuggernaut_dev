import FilesGrid from '@/components/storage/fileSelector/FilesGrid'
import fileSelectorContext from '@/components/storage/fileSelector/context/context'
import { Models, Query } from '@/lib/appwrite'
import { getFilesList } from '@/services/frontend/storage'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Pagination, Typography } from '@mui/material'
import { FC, useContext, useEffect, useState } from 'react'

export interface FileSelectorDialogProps {
  DialogTitleText?: string
  DialogDescriptionText?: string
  DialogSelectLabel?: string
  DialogCancelLabel?: string
  accept?: string[]
  setOpenFileSelector: (open: boolean) => void
  onSelect: (file: Models.File) => void
}

const FileSelectorDialog: FC<FileSelectorDialogProps> = ({ DialogTitleText, DialogDescriptionText, DialogSelectLabel, DialogCancelLabel, accept, setOpenFileSelector, onSelect }) => {
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
        console.log('Data fetched:', files)
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
        {DialogTitleText ?? 'Seleccionar archivo'}
      </DialogTitle>
      <DialogContent>
        {DialogDescriptionText !== undefined && DialogDescriptionText.length > 0 && <Typography>{DialogDescriptionText}</Typography>}
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
          {DialogCancelLabel ?? 'Cancelar'}
        </Button>
        <Button
          disabled={selectedFile === undefined}
          onClick={() => {
            if (selectedFile === undefined) return
            onSelect(selectedFile)
            setOpenFileSelector(false)
          }}
        >
          {DialogSelectLabel ?? 'Seleccionar'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FileSelectorDialog
