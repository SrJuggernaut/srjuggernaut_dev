import fileSelectorContext from '@/components/storage/fileSelector/context/context'
import { Models } from '@/lib/appwrite'
import { getFilePreview } from '@/services/frontend/storage'
import { Card, CardActionArea, CardContent, CardMedia, Tooltip, Typography } from '@mui/material'
import NextImage from 'next/image'
import { FC, useContext } from 'react'

export interface FileCardProps {
  file: Models.File
}

const FileCard: FC<FileCardProps> = ({ file }) => {
  const { state: { bucketId, selectedFile }, dispatch } = useContext(fileSelectorContext)
  return (
    <Card
      variant={selectedFile !== undefined && selectedFile.$id === file.$id ? 'outlined' : 'elevation'}
    >
      <CardActionArea
        onClick={() => {
          if (selectedFile !== undefined && selectedFile.$id === file.$id) {
            dispatch({ type: 'setFile', payload: undefined })
            return
          }
          dispatch({ type: 'setFile', payload: file })
        }}
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'space-between'
        }}
      >
        <CardMedia
          sx={{
            width: '100%',
            position: 'relative',
            aspectRatio: '1/1'
          }}
        >
          <NextImage
            src={getFilePreview(bucketId, file.$id, { width: 550, height: 550 }).toString()}
            alt={file.name}
            fill
            sizes='560px'
          />
        </CardMedia>
        <CardContent
          sx={{
            width: '100%',
            flexGrow: 1
          }}
        >
          <Tooltip title={file.name}>
            <Typography variant='subtitle2' sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {file.name}
            </Typography>
          </Tooltip>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default FileCard
