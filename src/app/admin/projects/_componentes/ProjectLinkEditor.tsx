import IconSelector from '@/components/ui/IconSelector'
import { ProjectLink } from '@/types/project'
import { faChevronDown, faChevronUp, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, IconButton, Paper, TextField, Tooltip } from '@mui/material'
import { FormikErrors, FormikTouched } from 'formik'
import { FC } from 'react'

export interface ProjectLinkEditorProps {
  index: number
  totalLinks: number
  value: ProjectLink
  onChange: (value: ProjectLink) => void
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  error?: string | FormikErrors<ProjectLink>
  touched?: FormikTouched<ProjectLink>
}

const ProjectLinkEditor:FC<ProjectLinkEditorProps> = ({ index, onChange, onDelete, onMoveUp, onMoveDown, value, error, totalLinks, touched }) => {
  return (
    <Paper
      sx={{
        display: 'grid',
        gap: 2,
        alignItems: 'center',
        marginBlock: 1,
        paddingBlock: 1,
        paddingInline: 2,
        gridTemplateColumns: 'repeat(9, 1fr)'

      }}
    >
      <Tooltip
        title="Indice"
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gridColumn: {
              xs: '1/3',
              sm: '1/4',
              md: '1/2',
              lg: '1/2'
            },
            order: 1
          }}
        >
          {index + 1}
        </Box>
      </Tooltip>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gridColumn: {
            xs: '3/10',
            sm: '4/10',
            md: '2/4',
            lg: '8/10'
          },
          order: {
            xs: 2,
            lg: 5
          }
        }}
      >
        <IconButton
          size="medium"
          onClick={onMoveUp}
          disabled={index === 0}
        >
          <FontAwesomeIcon icon={faChevronUp} size="xs" />
        </IconButton>
        <IconButton
          size="medium"
          onClick={onMoveDown}
          disabled={index === totalLinks - 1}
        >
          <FontAwesomeIcon icon={faChevronDown} size="xs" />
        </IconButton>
        <IconButton
          size="medium"
          onClick={onDelete}
        >
          <FontAwesomeIcon icon={faTimes} size="xs" />
        </IconButton>
      </Box>
      <Box
        sx={{
          gridColumn: {
            xs: '1/10',
            md: '4/10',
            lg: '2/4'
          },
          order: {
            xs: 3,
            lg: 2
          }
        }}
      >
        <TextField
          label="Etiqueta"
          name="label"
          value={value.label}
          onChange={(e) => onChange({ ...value, label: e.target.value })}
          error={touched?.label !== undefined && typeof error === 'object' && error?.label !== undefined}
          helperText={touched?.label !== undefined && typeof error === 'object' && error?.label}
          fullWidth
        />
      </Box>
      <Box
        sx={{
          gridColumn: {
            xs: '1/10',
            md: '1/5',
            lg: '4/6'
          },
          order: {
            xs: 4,
            lg: 3
          }
        }}
      >
        <TextField
          label="Url"
          name="url"
          value={value.url}
          onChange={(e) => onChange({ ...value, url: e.target.value })}
          error={touched?.url !== undefined && typeof error === 'object' && error?.url !== undefined}
          helperText={touched?.url !== undefined && typeof error === 'object' && error?.url}
          fullWidth
        />
      </Box>
      <Box
        sx={{
          gridColumn: {
            xs: '1/10',
            md: '5/10',
            lg: '6/8'
          },
          order: {
            xs: 5,
            lg: 4
          }
        }}
      >
        <IconSelector
          value={value.icon || ''}
          onChange={(icon) => {
            onChange({ ...value, icon })
          }}
          label="Icono"
        />
      </Box>
    </Paper>
  )
}

export default ProjectLinkEditor
