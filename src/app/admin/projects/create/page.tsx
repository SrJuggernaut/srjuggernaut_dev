'use client'
import ProjectLinkEditor from '@/app/admin/projects/_componentes/ProjectLinkEditor'
import ContentEditor from '@/components/content/ContentEditor'
import SeoImageSelector from '@/components/seo/SeoImageSelector'
import SeoImageUploader from '@/components/seo/SeoImageUploader'
import useHandleError from '@/hooks/useHandleError'
import { createProject, projectDataSchema } from '@/services/frontend/projects'
import useStore from '@/state/useStore'
import { ProjectData, ProjectLink } from '@/types/project'
import { faArrowRotateRight, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, IconButton, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { nanoid } from 'nanoid'
import NextImage from 'next/image'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

const CreateProjectPage:FC = () => {
  const { handleError } = useHandleError()
  const addAlert = useStore((state) => state.addAlert)
  const router = useRouter()

  const formik = useFormik<ProjectData>({
    initialValues: {
      title: '',
      slug: '',
      description: '',
      image: '/img/DefaultSeoImage.jpg',
      links: [],
      technologies: [],
      content: []
    },
    onSubmit: async (values) => {
      try {
        const createdProject = await createProject(values)
        addAlert({ id: nanoid(), title: 'Proyecto creado', text: 'El proyecto se ha creado correctamente', severity: 'success' })
        router.push(`/admin/projects/edit?id=${createdProject.$id}`)
      } catch (error) {
        handleError(error, 'Error al crear el proyecto', 'Ocurrió un error al crear el proyecto. Por favor, intenta de nuevo.', 'error')
      }
    },
    validationSchema: projectDataSchema
  })

  return (
    <>
      <Typography variant="h1" align="center"gutterBottom>Crear proyecto</Typography>
      <Box
        component="form"
        onSubmit={formik.submitForm}
      >
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
          <TextField
            id="title"
            name="title"
            label="Título"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title !== undefined && formik.errors.title !== undefined}
            helperText={formik.errors.title !== undefined && formik.errors.title}
            fullWidth
            margin="normal"
          />
          <TextField
            id="slug"
            name="slug"
            label="Slug"
            value={formik.values.slug}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.slug !== undefined && formik.errors.slug !== undefined}
            helperText={formik.errors.slug !== undefined && formik.errors.slug}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <>
                  <IconButton
                    size="small"
                    onClick={() => {
                      formik.setFieldValue('slug', formik.values.title.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '_'))
                    }}
                  >
                    <FontAwesomeIcon icon={faArrowRotateRight} fixedWidth />
                  </IconButton>
                </>
              )
            }}
          />
        </Box>
        <TextField
          id="description"
          name="description"
          label="Descripción"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description !== undefined && formik.errors.description !== undefined}
          helperText={formik.errors.description !== undefined && formik.errors.description}
          fullWidth
          margin="normal"
          multiline
          minRows={3}
        />
        <Typography variant="h2" gutterBottom>Imagen</Typography>
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
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              aspectRatio: '120/63',
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <NextImage
              src={formik.values.image}
              alt="Imagen del proyecto"
              fill
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}
          >
            <SeoImageUploader
              onSelected={(imageUrl) => {
                formik.setFieldValue('image', imageUrl)
              }}
            />
            <SeoImageSelector
              onSelect={(imageUrl) => {
                formik.setFieldValue('image', imageUrl)
              }}
            />
          </Box>
        </Box>
        <Typography variant="h2" gutterBottom>Links</Typography>
        <Box>
          {formik.values.links.length > 0
            ? formik.values.links.map((link, index) => (
              <ProjectLinkEditor
                index={index}
                totalLinks={formik.values.links.length}
                key={`link-${index}`}
                value={link}
                error={formik.errors.links?.[index]}
                touched={formik.touched.links?.[index]}
                onChange={(value) => {
                  const newLinks = [...formik.values.links]
                  newLinks[index] = value
                  formik.setFieldValue('links', newLinks)
                }}
                onDelete={() => {
                  const newLinks = [...formik.values.links]
                  newLinks.splice(index, 1)
                  formik.setFieldValue('links', newLinks)
                }}
                onMoveDown={() => {
                  const newLinks = [...formik.values.links]
                  if (index < newLinks.length - 1) {
                    const temp = newLinks[index]
                    newLinks[index] = newLinks[index + 1]
                    newLinks[index + 1] = temp
                    formik.setFieldValue('links', newLinks)
                  }
                }}
                onMoveUp={() => {
                  const newLinks = [...formik.values.links]
                  if (index > 0) {
                    const temp = newLinks[index]
                    newLinks[index] = newLinks[index - 1]
                    newLinks[index - 1] = temp
                    formik.setFieldValue('links', newLinks)
                  }
                }}
              />
            ))
            : (
              <>
                <Typography variant="body1">No hay links agregados</Typography>
              </>
            )
          }
          <Button
            type="button"
            fullWidth
            variant="outlined"
            onClick={() => {
              formik.setFieldValue('links', [...formik.values.links, { label: '', url: '', icon: undefined }as ProjectLink])
            }}
          >
            Agregar link
          </Button>
        </Box>
        <Typography variant="h2" gutterBottom>Tecnologías</Typography>
        <Box>
          {formik.values.technologies.length > 0
            ? formik.values.technologies.map((technology, index) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
                key={`technology-${index}`}
              >
                <TextField
                  id={`technology-${index}`}
                  name={`technology-${index}`}
                  label={`Tecnología ${index + 1}`}
                  value={technology}
                  onChange={(event) => {
                    const newTechnologies = [...formik.values.technologies]
                    newTechnologies[index] = event.target.value
                    formik.setFieldValue('technologies', newTechnologies)
                  }}
                  error={formik.touched.technologies !== undefined && formik.errors.technologies !== undefined && formik.errors.technologies?.[index] !== undefined}
                  helperText={formik.touched.technologies !== undefined && formik.errors.technologies !== undefined && formik.errors.technologies?.[index] !== undefined ? formik.errors.technologies?.[index] : undefined}
                  fullWidth
                  margin="normal"
                />
                <IconButton
                  onClick={() => {
                    const newTechnologies = [...formik.values.technologies]
                    newTechnologies.splice(index, 1)
                    formik.setFieldValue('technologies', newTechnologies)
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </IconButton>
              </Box>
            ))
            : (
              <Typography variant="body1">No hay tecnologías agregadas</Typography>
            )
          }
          <Button
            type="button"
            fullWidth
            variant="outlined"
            onClick={() => {
              formik.setFieldValue('technologies', [...formik.values.technologies, ''])
            }}
          >
            Agregar tecnología
          </Button>
        </Box>
        <Typography variant="h2" gutterBottom>Contenido</Typography>
        <ContentEditor
          value={formik.values.content}
          onChange={(value) => formik.setFieldValue('content', value)}
          error={(formik.touched.content !== undefined && formik.errors.content !== undefined) ? formik.errors.content : undefined}
        />
        <Button
          // type="submit"
          type="button"
          onClick={(event) => {
            event.preventDefault()
            formik.submitForm()
          }}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Crear proyecto
        </Button>
      </Box>
    </>
  )
}

export default CreateProjectPage
