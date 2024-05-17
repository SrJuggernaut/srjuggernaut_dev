import { MarkdownBlock } from '@/types/content'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, IconButton, Typography } from '@mui/material'
import { FormikErrors } from 'formik'
import dynamic from 'next/dynamic'
import { FC, Suspense } from 'react'

interface MarkdownEditorProps {
  value: MarkdownBlock
  onChange: (value: MarkdownBlock) => void
  onDelete: () => void
  error?: string | string[] | FormikErrors<MarkdownBlock>
}

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor'),
  { ssr: false }
)

const MarkdownEditor:FC<MarkdownEditorProps> = ({ value, onChange, onDelete, error }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        backgroundColor: 'background.paper',
        padding: 2,
        borderRadius: 1,
        position: 'relative'
      }}
    >
      <IconButton onClick={onDelete} sx={{ position: 'absolute', right: 8, top: 8 }}>
        <FontAwesomeIcon icon={faTimes} />
      </IconButton>
      <Typography variant="subtitle1">Markdown</Typography>
      {error !== undefined && typeof error === 'string' && (
        <Typography variant="body1" color="error">{error}</Typography>
      )}
      {error !== undefined && Array.isArray(error) && typeof error[0] === 'string' && (error as string[]).map((error, index) => (
        <Typography key={`error-${index}`} variant="body1" color="error">{error}</Typography>
      ))}
      {error !== undefined && typeof error === 'object' && !Array.isArray(error) && typeof error === 'object' && typeof error.data !== 'undefined' && typeof error.data === 'object' && typeof error.data.content !== 'undefined' && typeof error.data.content === 'string' && (
        <Typography variant="body1" color="error">{error.data.content}</Typography>
      )}
      <Suspense>
        <MDEditor
          value={value.data.content}
          onChange={(newMarkdown) => onChange({ ...value, data: { ...value.data, content: newMarkdown ?? '' } })}
        />
      </Suspense>
    </Box>
  )
}

export default MarkdownEditor
