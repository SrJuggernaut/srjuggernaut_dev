import { Typography } from '@mui/material'
import AdminTabs from './_components/AdminTabs'

const AdminPage = () => {
  return (
    <>
      <Typography variant="h1" align="center">Panel de administración</Typography>
      <AdminTabs />
    </>
  )
}

export default AdminPage
