'use client'
import useHandleError from '@/hooks/useHandleError'
import { Query } from '@/lib/appwrite'
import { getProjects } from '@/services/frontend/projects'
import { ProjectDocumentParsedList } from '@/types/project'
import { Box, Pagination } from '@mui/material'
import { FC, useCallback, useEffect, useState } from 'react'
import ProjectCard from './ProjectCard'
import SkeletonProjectsGrid from './SkeletonProjectsGrid'

interface ProjectsPagination {
  page: number
  pageSize: number
}

const ProjectsGrid:FC = () => {
  const { handleError } = useHandleError()
  const [pagination, setPagination] = useState<ProjectsPagination>({ page: 1, pageSize: 6 })
  const [projects, setProjects] = useState<ProjectDocumentParsedList | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  const getData = useCallback(async ({ page, pageSize }:ProjectsPagination) => {
    setLoading(true)
    try {
      const queries:string[] = [
        Query.limit(pageSize),
        Query.offset((page - 1) * pageSize),
        Query.orderDesc('$createdAt')
      ]
      const projects = await getProjects(queries)
      return projects
    } catch (error) {
      handleError(error, 'Error al obtener los proyectos', 'Ocurrió un error al obtener los proyectos. Por favor, intenta de nuevo.')
    }
  }, [])

  useEffect(() => {
    getData({ page: pagination.page, pageSize: pagination.pageSize })
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [pagination.page, pagination.pageSize])
  return (
    <>
      {!loading || projects === undefined
        ? (
          <>
            {projects !== undefined && projects.documents.length > 0 &&
              (
                <>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                      gap: 2,
                      padding: 2
                    }}
                  >
                    {projects.documents.map((project) => (
                      <ProjectCard
                        key={`project-card-${project.$id}`}
                        project={project}
                      />
                    ))}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      padding: 2
                    }}
                  >
                    <Pagination
                      count={Math.ceil(projects.total / pagination.pageSize)}
                      page={pagination.page}
                      onChange={(_, page) => { setPagination({ page, pageSize: pagination.pageSize }) }}
                    />
                  </Box>
                </>
              )}
          </>
        )
        : <SkeletonProjectsGrid />
      }
    </>
  )
}

export default ProjectsGrid
