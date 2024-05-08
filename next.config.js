const imageRemotePatternsFromEnv = () => {
  const remoteImagePatterns = process.env.IMAGES_DOMAIN_LIST
  if (!remoteImagePatterns) return []
  return remoteImagePatterns.split(',').map(hostname => {
    return { hostname }
  })
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  images: {
    remotePatterns: imageRemotePatternsFromEnv()
  }
}

module.exports = nextConfig
