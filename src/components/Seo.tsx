import React from 'react'
import Head from 'next/head'

export interface SeoPros {
  title?: string
  description?: string
  image?: string
  children?: React.ReactNode
}

const Seo: React.FC<SeoPros> = ({ description, image, title, children }) => {
  return (
    <Head>
      {title && (
        <>
          <title key="title">{`${title} - SrJuggernaut Dev`}</title>
          <meta property="og:title" content={title} key="og_title" />
          <meta property="twitter:title" content={title} key="twitter_title" />
        </>
      )}
      {description && (
        <>
          <meta name="description" content={description} key="description" />
          <meta property="og:description" content={description} key="og_description" />
          <meta property="twitter:description" content={description} key="twitter_description" />
        </>
      )}
      {image && (
        <>
          <meta property="og:image" content={image} key="og_image" />
          <meta property="twitter:image" content={image} key="twitter_image" />
        </>
      )}
      {children}
    </Head>
  )
}

export default Seo
