const isLocalUrl = (url: string): boolean => {
  return url.startsWith('/')
}

export default isLocalUrl
