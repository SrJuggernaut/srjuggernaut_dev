import ProjectsGrid from '@/app/portafolio/_components/ProjectsGrid'
import SkeletonProjectsGrid from '@/app/portafolio/_components/SkeletonProjectsGrid'
import { Typography } from '@mui/material'
import { FC, Suspense } from 'react'

const PortafolioPage:FC = () => {
  return (
    <>
      <Typography variant='h1' align='center'>Portafolio</Typography>
      <Suspense fallback={(<SkeletonProjectsGrid />)}>
        <ProjectsGrid />
      </Suspense>
    </>
  )
}

export default PortafolioPage
