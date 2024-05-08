import AdminTabs from '@/app/admin/_components/AdminTabs'
import { Typography } from '@mui/material'
import { FC } from 'react'

const AdminPage:FC = () => {
  return (
    <>
      <Typography variant="h1" align="center">Panel de administración</Typography>
      <AdminTabs />
    </>
  )
}

export default AdminPage
