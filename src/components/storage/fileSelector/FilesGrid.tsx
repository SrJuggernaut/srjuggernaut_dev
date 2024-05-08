import FileCard from '@/components/storage/fileSelector/FileCard'
import { Models } from '@/lib/appwrite'
import { Box } from '@mui/material'
import { FC } from 'react'

export interface FileGridProps {
  files: Models.File[]
}

const FilesGrid:FC<FileGridProps> = ({ files }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 2,
        p: 2
      }}
    >
      {files.length > 0 && files.map((file, index) => (
        <FileCard
          key={`file-card-${file.$id}`}
          file={file}
        />
      ))}
    </Box>
  )
}

export default FilesGrid
