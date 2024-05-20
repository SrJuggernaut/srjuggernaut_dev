import EditProject from '@/app/admin/projects/edit/_components/EditProject'
import { FC, Suspense } from 'react'

const editProjectPage:FC = () => {
  return (
    <Suspense>
      <EditProject />
    </Suspense>
  )
}

export default editProjectPage
