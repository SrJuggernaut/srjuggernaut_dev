import { Box, Card, CardContent, CardMedia, Skeleton } from '@mui/material'
import { FC } from 'react'

const SkeletonProjectsGrid:FC = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: 2,
        padding: 2
      }}
    >
      {[...Array.from({ length: 6 })].map((_, index) => (
        <Card
          key={`skeleton-project-card-${index}`}
        >
          <CardMedia
            sx={{
              position: 'relative',
              aspectRatio: '120/63',
              width: '100%'
            }}
          >
            <Skeleton
              variant="rectangular"
              component="div"
              sx={{
                width: '100%',
                aspectRatio: '120/63',
                height: '100%'
              }}
            />
          </CardMedia>
          <CardContent>
            <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}

export default SkeletonProjectsGrid
