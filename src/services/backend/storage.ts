import { ADMIN_TEAM_ID, SEO_IMAGES_STORAGE_ID, SEO_IMAGES_STORAGE_NAME } from '@/lib/env'
import { Compression, Permission, storage } from '@/lib/nodeAppwrite'
import { Role } from 'appwrite'

export const ensureSeoImagesBucket = (() => {
  let existBucket = false
  return async () => {
    if (existBucket) return
    try {
      await storage.getBucket(SEO_IMAGES_STORAGE_ID)
    } catch {
      const permissions = [
        Permission.create(Role.team(ADMIN_TEAM_ID)),
        Permission.read(Role.any()),
        Permission.update(Role.team(ADMIN_TEAM_ID)),
        Permission.delete(Role.team(ADMIN_TEAM_ID))
      ]
      const fiveMB = 5 * 1024 * 1024
      await storage.createBucket(SEO_IMAGES_STORAGE_ID, SEO_IMAGES_STORAGE_NAME, permissions, false, true, fiveMB, ['jpg', 'jpeg', 'png', 'webp'], Compression.Gzip, false, true)
    } finally {
      existBucket = true
    }
  }
})()
