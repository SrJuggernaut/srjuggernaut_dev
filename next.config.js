const imageRemotePatternsFromEnv = () => {
  const remoteImagePatterns = process.env.IMAGES_DOMAIN_LIST
  if (!remoteImagePatterns) return []
  return remoteImagePatterns.split(',').map(pattern => {
    return {
      protocol: pattern.startsWith('http') ? 'http' : 'https',
      hostname: pattern.replace(/^https?:\/\//, '')
    }
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
