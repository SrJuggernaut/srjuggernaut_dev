import AdminTabs from '@/app/admin/_components/AdminTabs'
import { Typography } from '@mui/material'
import { FC, Suspense } from 'react'

const AdminPage:FC = () => {
  return (
    <>
      <Typography variant="h1" align="center">Panel de administración</Typography>
      <Suspense>
        <AdminTabs />
      </Suspense>
    </>
  )
}

export default AdminPage
