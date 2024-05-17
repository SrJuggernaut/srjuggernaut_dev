import MediaFileSelector from '@/components/storage/MediaFileSelector'
import MediaStorageUploader from '@/components/storage/MediaStorageUploader'
import { ImageBlock } from '@/types/content'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, IconButton, TextField, Typography } from '@mui/material'
import { FormikErrors } from 'formik'
import NextImage from 'next/image'
import { FC } from 'react'

interface ImageEditorProps {
  value: ImageBlock
  onChange: (value: ImageBlock) => void
  onDelete: () => void
  error?: string | string[] | FormikErrors<ImageBlock>
}

const ImageEditor: FC<ImageEditorProps> = ({ value, onChange, onDelete, error }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.paper',
        padding: 2,
        borderRadius: 1,
        position: 'relative'
      }}
    >
      <IconButton onClick={onDelete} sx={{ position: 'absolute', right: 8, top: 8 }}>
        <FontAwesomeIcon icon={faTimes} />
      </IconButton>
      <Typography variant="subtitle1">Imagen</Typography>
      {error !== undefined && typeof error === 'string' && (
        <Typography variant="body1" color="error">{error}</Typography>
      )}
      {error !== undefined && Array.isArray(error) && typeof error[0] === 'string' && (error as string[]).map((error, index) => (
        <Typography key={`error-${index}`} variant="body1" color="error">{error}</Typography>
      ))}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '1fr 1fr'
          },
          gap: 2
        }}
      >
        {value.data.url !== ''
          ? (
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1',
                overflow: 'hidden',
                borderRadius: 1
              }}
            >
              <NextImage src={value.data.url} alt={value.data.alt} fill style={{ objectFit: 'contain', objectPosition: 'center' }} />
            </Box>
          )
          : (<Typography variant="body1">Sin imagen</Typography>)
        }

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <MediaStorageUploader accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }} onSelected={(url) => onChange({ ...value, data: { ...value.data, url } })} />
          <MediaFileSelector accept={['image/png', 'image/jpg', 'image/jpeg']} onSelected={(url) => onChange({ ...value, data: { ...value.data, url } })} openButtonLabel='Seleccionar imagen' dialogTitleText='Selecciona una imagen'/>
        </Box>
        <TextField
          id={`alt-${value.id}`}
          name={`alt-${value.id}`}
          label="Texto alternativo"
          value={value.data.alt}
          onChange={(event) => onChange({ ...value, data: { ...value.data, alt: event.target.value } })}
          error={error !== undefined && typeof error === 'object' && !Array.isArray(error) && typeof error.data !== 'undefined' && typeof error.data.alt !== 'undefined' && typeof error.data.alt === 'string'}
          helperText={error !== undefined && typeof error === 'object' && !Array.isArray(error) && typeof error.data !== 'undefined' && typeof error.data.alt !== 'undefined' && error.data.alt}
          fullWidth
          margin="normal"
        />
        <TextField
          id={`caption-${value.id}`}
          name={`caption-${value.id}`}
          label="Leyenda"
          value={value.data.caption}
          onChange={(event) => onChange({ ...value, data: { ...value.data, caption: event.target.value } })}
          error={error !== undefined && typeof error === 'object' && !Array.isArray(error) && typeof error.data !== 'undefined' && typeof error.data.caption !== 'undefined' && typeof error.data.caption === 'string'}
          helperText={error !== undefined && typeof error === 'object' && !Array.isArray(error) && typeof error.data !== 'undefined' && typeof error.data.caption !== 'undefined' && error.data.caption}
          fullWidth
          multiline
          margin="normal"
        />
      </Box>
    </Box>
  )
}

export default ImageEditor
