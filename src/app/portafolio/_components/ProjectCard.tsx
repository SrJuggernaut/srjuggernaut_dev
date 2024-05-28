import { ProjectDocumentParsed } from '@/types/project'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { FC } from 'react'

export interface ProjectCardProps {
  project: ProjectDocumentParsed
}

const ProjectCard:FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card>
      <CardActionArea
        component={NextLink}
        href={`/portafolio/${project.slug}`}
      >
        <CardMedia
          sx={{
            position: 'relative',
            aspectRatio: '120/63',
            width: '100%'
          }}
        >
          <NextImage
            src={project.image}
            alt={project.title}
            fill
          />
        </CardMedia>
        <CardContent>
          <Typography variant="subtitle1" component="h3" gutterBottom>{project.title}</Typography>
          <Typography>{project.description.substring(0, Math.min(project.description.substring(0, 60).length, project.description.substring(0, 60).lastIndexOf(' ')))}&hellip;</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ProjectCard
