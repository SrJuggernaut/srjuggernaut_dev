import { Box, Button, Chip, IconButton, Paper, styled, TextField, Typography } from '@mui/material'
import { FC, ReactNode, useContext, useState } from 'react'

import Contained from '@components/layouts/Contained'
import { spdcContext, SpdcProvider } from '@contexts/spdc'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBroom, faCopy, faLink, faPlus } from '@fortawesome/free-solid-svg-icons'
import Link from '@components/Link'

export interface SDPCProps {
  children: ReactNode
}

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5)
}))

const SDPCInner: FC = () => {
  const { sdpcState, sdpcDispatch } = useContext(spdcContext)
  const [tagToAdd, setTagToAdd] = useState('')
  const [promptToInterpret, setPromptToInterpret] = useState('')

  const handleInterpretPrompt = (promptInterpreting:string) => {
    const description = promptInterpreting.split(', ').shift()
    const tagsToAdd = promptInterpreting.replace(' ', '').split(', ').slice(1).map((tag) => ({ tag, categories: [] }))
    if (description) sdpcDispatch({ type: 'setDescription', payload: description })
    if (tagsToAdd.length > 0) {
      sdpcDispatch({ type: 'addTagsAndSelect', payload: tagsToAdd })
    }
  }
  return (
    <Contained>
      <Typography variant="h1" align="center">Stable diffusion prompt creator</Typography>
      <Typography variant="body1">
        Este es un proyecto que he desarrollado para facilitar la creación de prompts para generar imágenes con IA.
      </Typography>
      <Typography variant="h2">Interpreta un prompt</Typography>
      <Typography variant="body2">
        Pega un prompt en el siguiente campo y pulsa el botón para interpretarlo, esto rellenará el campo de descripción y añadirá las etiquetas que encuentre, puedes consegir el prompt en paginas como <Link href='https://lexica.art'>Lexica Art</Link>.
      </Typography>
      <TextField
        label="Prompt a interpretar"
        value={promptToInterpret}
        onChange={(e) => setPromptToInterpret(e.target.value)}
        margin="normal"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleInterpretPrompt(promptToInterpret)
          }
        }}
        InputProps={{
          endAdornment: (
            <IconButton
              size="small"
              onClick={() => {
                handleInterpretPrompt(promptToInterpret)
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </IconButton>
          )

        }}
        multiline
        fullWidth
      />
      <Typography variant="h2">
        Descripción
      </Typography>
      <Typography variant="body2">
        Describe el prompt que vas a crear, la descripción debe ser lo más clara posible para que el resultado sea lo más parecido a lo que esperas.
      </Typography>
      <TextField
        label="Descripción"
        placeholder="Escribe la descripción de la imagen que quieres generar"
        value={sdpcState.description}
        onChange={(e) => sdpcDispatch({ type: 'setDescription', payload: e.target.value })}
        margin="normal"
        multiline
        fullWidth
      />
      <Typography variant="h2" align="center">Tags</Typography>
      <Typography variant="body2">
        Los tags son las palabras clave que se usarán para generar la imagen.
      </Typography>
      <TextField
        label="Añadir tag"
        placeholder="Escribe el tag que quieres añadir"
        value={tagToAdd}
        onChange={(e) => setTagToAdd(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            sdpcDispatch({ type: 'addTag', payload: { tag: tagToAdd, categories: [] } })
            setTagToAdd('')
          }
        }}
        InputProps={{
          endAdornment: (
            <IconButton
              size="small"
              onClick={() => {
                sdpcDispatch({ type: 'addTag', payload: { tag: tagToAdd, categories: [] } })
                setTagToAdd('')
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </IconButton>
          )
        }}
        margin="normal"
        fullWidth
      />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: 1
        }}
      >
        {sdpcState.tags.length > 0 && (
          <Box>
            <Typography variant="h3" align="center">Tags disponibles</Typography>
            <Paper
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0.5,
                m: 0
              }}
              component="ul"
            >
              {sdpcState.tags.map(({ id, tag, categories }) => (
                <ListItem
                  key={`tag-${id}`}
                >
                  <Chip
                    sx={{ marginTop: 0.5, marginBottom: 0.5 }}
                    disabled={sdpcState.selectedTags.some(({ id: selectedTagId }) => selectedTagId === id)}
                    label={(
                      <>
                        {tag}
                        <IconButton
                          size="small"
                          target="_blank"
                          sx={{ marginLeft: 0.5 }}
                          href={`https://lexica.art/?q=${tag.replace(' ', '+')}`}
                          disabled={sdpcState.selectedTags.some((selectedTag) => selectedTag.id === id)}
                        >
                          <FontAwesomeIcon
                            icon={faLink}
                            size="xs"
                          />
                        </IconButton>
                      </>
                    )}
                    onClick={() => sdpcDispatch({ type: 'selectTag', payload: id })}
                    onDelete={() => sdpcDispatch({ type: 'removeTag', payload: id })}
                  />
                </ListItem>
              ))}
            </Paper>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginBlock: 1
              }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={() => sdpcDispatch({ type: 'removeAllTags' })}
                startIcon={
                  <FontAwesomeIcon icon={faBroom} />
                }
              >
          Limpiar tags disponibles
              </Button>
            </Box>
          </Box>
        )}
        {sdpcState.selectedTags.length > 0 && (
          <Box>
            <Typography variant="h3" align="center">Tags seleccionados</Typography>
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0.5,
                m: 0
              }}
              component="ul">
              {sdpcState.selectedTags.map(({ id, tag, categories }) => (
                <ListItem
                  key={`tag-${id}`}
                >
                  <Chip
                    sx={{ marginTop: 0.5, marginBottom: 0.5 }}
                    key={`selected-tag-${id}`}
                    label={(
                      <>
                        {tag}
                        <IconButton
                          size="small"
                          target="_blank"
                          sx={{ marginLeft: 0.5 }}
                          href={`https://lexica.art/?q=${tag.replace(' ', '+')}`}
                          onClick={e => e.stopPropagation()}
                        >
                          <FontAwesomeIcon
                            icon={faLink}
                            size="xs"
                          />
                        </IconButton>
                      </>
                    )}
                    onDelete={() => sdpcDispatch({ type: 'deselectTag', payload: id })}
                  />
                </ListItem>
              ))}
            </Paper>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginBlock: 1
              }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={() => sdpcDispatch({ type: 'deselectAllTags' })}
                startIcon={
                  <FontAwesomeIcon icon={faBroom} />
                }
              >
              Limpiar tags seleccionados
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      <Typography variant="h2" align="center">Prompt</Typography>
      <Typography variant="body2">
        El prompt es el texto resultante de la combinación de los tags seleccionados y la descripción, puedes usarlo en Stable Diffusion para generar la imagen.
      </Typography>
      <TextField
        label="Prompt resultante"
        value={`${sdpcState.description}${sdpcState.selectedTags.length > 0 && sdpcState.description ? ', ' : ''}${sdpcState.selectedTags.map(({ tag }) => tag).join(', ')}`}
        margin="normal"
        InputProps={{
          readOnly: true,
          endAdornment: (
            <IconButton
              size="small"
              onClick={() => {
                navigator.clipboard.writeText(`${sdpcState.description}${sdpcState.selectedTags.length > 0 && sdpcState.description ? ', ' : ''}${sdpcState.selectedTags.map(({ tag }) => tag).join(', ')}`)
              }}
            >
              <FontAwesomeIcon icon={faCopy} />
            </IconButton>
          )

        }}
        disabled
        multiline
        fullWidth
      />
    </Contained>
  )
}

const SDPC: FC = () => (<SpdcProvider><SDPCInner /></SpdcProvider>)

export default SDPC
