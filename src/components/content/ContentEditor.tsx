import ImageEditor from '@/components/content/editor/ImageEditor'
import MarkdownEditor from '@/components/content/editor/MarkdownEditor'
import { createNewImageBlock, createNewMarkdownBlock } from '@/services/frontend/content'
import { ContentBlock, ImageBlock, MarkdownBlock } from '@/types/content'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography } from '@mui/material'
import { FormikErrors } from 'formik'
import { FC, useCallback, useRef, useState } from 'react'

export interface ContentEditorProps {
  value: ContentBlock[]
  onChange: (value: ContentBlock[]) => void
  error?: string | string[] | FormikErrors<ContentBlock[]>
}

const ContentEditor:FC<ContentEditorProps> = ({ onChange, value, error }) => {
  const [openAddBlockMenu, setOpenAddBlockMenu] = useState<boolean>(false)
  const addBlockButton = useRef(null)

  const handleChangeBlock = useCallback((value: ContentBlock[], block: ContentBlock, index: number) => {
    const newValue = [...value]
    newValue[index] = block
    onChange(newValue)
  }, [])

  const handleDeleteBlock = useCallback((value: ContentBlock[], index: number) => {
    const newValue = [...value]
    newValue.splice(index, 1)
    onChange(newValue)
  }, [])

  return (
    <>
      {error !== undefined && typeof error === 'string' && (
        <Typography variant="body1" color="error">{error}</Typography>
      )}
      {error !== undefined && Array.isArray(error) && typeof error[0] === 'string' && (error as string[]).map((error, index) => (
        <Typography key={`error-${index}`} variant="body1" color="error">{error}</Typography>
      ))}
      {value.length > 0
        ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              width: '100%',
              marginBlock: 2
            }}
          >
            {value.map((block, index) => {
              switch (block.type) {
                case 'markdown':
                  return (
                    <MarkdownEditor
                      key={`block-${index}-${block.id}`}
                      value={block}
                      onChange={blockValue => {
                        handleChangeBlock(value, blockValue, index)
                      }}
                      onDelete={() => handleDeleteBlock(value, index)}
                      error={(typeof error !== 'undefined' && typeof error !== 'string' && Array.isArray(error)) ? error[index] as FormikErrors<MarkdownBlock> : undefined}
                    />
                  )
                case 'image':
                  return (
                    <ImageEditor
                      key={`block-${index}-${block.id}`}
                      value={block}
                      onChange={blockValue => {
                        handleChangeBlock(value, blockValue, index)
                      }}
                      onDelete={() => handleDeleteBlock(value, index)}
                      error={(typeof error !== 'undefined' && typeof error !== 'string' && Array.isArray(error)) ? error[index] as FormikErrors<ImageBlock> : undefined}
                    />
                  )
                default:
                  return <Typography key={`block-${index}`} variant="body1">Tipo de bloque desconocido</Typography>
              }
            })}
          </Box>
        )
        : <Typography variant="body1">No hay contenido</Typography>
      }
      <Menu
        id="add-block-menu"
        anchorEl={addBlockButton.current}
        open={openAddBlockMenu}
        onClose={() => setOpenAddBlockMenu(false)}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              const newValue = [...value]
              newValue.push(createNewMarkdownBlock())
              onChange(newValue)
              setOpenAddBlockMenu(false)
            }}
          >
            <ListItemIcon>
              <FontAwesomeIcon icon={faMarkdown} />
            </ListItemIcon>
            <ListItemText primary="Markdown" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              const newValue = [...value]
              newValue.push(createNewImageBlock())
              onChange(newValue)
              setOpenAddBlockMenu(false)
            }}
          >
            <ListItemIcon>
              <FontAwesomeIcon icon={faImage} />
            </ListItemIcon>
            <ListItemText primary="Imagen" />
          </MenuItem>
        </MenuList>
      </Menu>
      <Button
        ref={addBlockButton}
        type="button"
        fullWidth
        variant="outlined"
        onClick={(event) => setOpenAddBlockMenu(true)}
      >
        Agregar bloque
      </Button>
    </>
  )
}

export default ContentEditor
