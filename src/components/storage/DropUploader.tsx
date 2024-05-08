import { Box, SxProps } from '@mui/system'
import { FC, ReactNode } from 'react'
import { DropzoneOptions, useDropzone } from 'react-dropzone'

interface DropUploaderProps {
  options: DropzoneOptions,
  children?: ReactNode,
  sx?: SxProps
}

const DropUploader:FC<DropUploaderProps> = ({ children, sx = {}, options }) => {
  const { getRootProps, getInputProps, isDragAccept, isDragReject, isDragActive } = useDropzone(options)
  return (
    <Box
      {...getRootProps()}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        border: '1px dashed',
        borderColor: isDragReject ? 'error.main' : isDragAccept ? 'success.main' : isDragActive ? 'primary.main' : 'divider',
        borderRadius: 1,
        cursor: 'pointer',
        ...sx
      }}
    >
      <input {...getInputProps()} />
      {children}
    </Box>
  )
}

export default DropUploader
