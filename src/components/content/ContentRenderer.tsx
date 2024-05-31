import { ContentBlock } from '@/types/content'
import { Box, Typography } from '@mui/material'
import NextImage from 'next/image'
import { FC, JSX } from 'react'
import Markdown from 'react-markdown'

export interface ContentRendererProps {
  content: ContentBlock[]
}

const ContentRenderer:FC<ContentRendererProps> = ({ content }) => {
  const contentElements: JSX.Element[] = content.map((block) => {
    switch (block.type) {
      case 'markdown':
        return <Markdown key={`markdown-${block.id}`} >{block.data.content}</Markdown>
      case 'image':
        return (
          <Box key={`image-${block.id}`} sx={{ position: 'relative', width: '100%', aspectRatio: '2/1' }}>
            <NextImage
              src={block.data.url}
              alt={block.data.alt}
              fill
              style={{ objectFit: 'contain' }}
              sizes="(max-width: 768px) 100vw, 768px"
              priority={false}
            />
            {block.data.caption && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  padding: 1
                }}
              >
                <Typography variant="caption">{block.data.caption}</Typography>
              </Box>
            )}
          </Box>
        )
      default:
        throw new Error('Unknown content type:', block)
    }
  })
  return (
    <>{contentElements}</>
  )
}

export default ContentRenderer
