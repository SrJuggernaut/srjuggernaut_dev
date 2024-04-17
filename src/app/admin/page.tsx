import { Typography } from '@mui/material'
import { FC } from 'react'
import AdminTabs from './_components/AdminTabs'

const AdminPage:FC = () => {
  return (
    <>
      <Typography variant="h1" align="center">Panel de administración</Typography>
      <AdminTabs />
    </>
  )
}

export default AdminPage
