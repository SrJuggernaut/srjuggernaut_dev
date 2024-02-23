import useHandleError from '@/hooks/useHandleError'
import { Query } from '@/lib/appwrite'
import { getContactForms, updateContactForm } from '@/services/frontend/contactForm'
import { ContactFormDocument, ContactFormList } from '@/types/contactForm'
import { Box, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridFilterModel, GridPaginationModel, GridSortModel } from '@mui/x-data-grid'
import { useCallback, useEffect, useState } from 'react'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', minWidth: 100, valueGetter: (params) => params.row.$id },
  { field: 'read', headerName: 'Leido', minWidth: 50, type: 'boolean', editable: true },
  { field: 'name', headerName: 'Nombre', minWidth: 250, filterable: false },
  { field: 'email', headerName: 'Email', minWidth: 250, filterable: false },
  { field: 'message', headerName: 'Mensaje', minWidth: 450, filterable: false },
  { field: '$createdAt', headerName: 'Fecha de creación', minWidth: 150, filterable: false, type: 'dateTime', valueGetter: (params) => new Date(params.row.$createdAt) },
  { field: '$updatedAt', headerName: 'Fecha de actualización', minWidth: 150, filterable: false, type: 'dateTime', valueGetter: (params) => new Date(params.row.$updatedAt) }
]

const TabContactForm = () => {
  const { handleError } = useHandleError()
  const [contactForms, setContactForms] = useState<ContactFormList>({ total: 0, documents: [] })
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 10 })
  const [sortModel, setSortModel] = useState<GridSortModel>([])
  const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] })
  const [loading, setLoading] = useState(true)

  const getData = useCallback(async ({ limit, skip, sort, filter }:{ limit: number, skip: number, sort: GridSortModel, filter: GridFilterModel}) => {
    setLoading(true)
    const queries:string[] = [
      Query.limit(limit),
      Query.offset(skip)
    ]
    if (sort.length > 0) {
      sort.forEach((sortType) => {
        if (sortType.sort === 'asc') {
          queries.push(Query.orderAsc(sortType.field))
        } else if (sortType.sort === 'desc') {
          queries.push(Query.orderDesc(sortType.field))
        }
      })
    }
    if (filter.items.length > 0) {
      filter.items.forEach((filterItem) => {
        if (filterItem.value === '' || filterItem.value === null || filterItem.value === undefined) return
        queries.push(Query.equal(filterItem.field, filterItem.value === 'true'))
      })
    }
    const contactForms = await getContactForms(queries)
    setContactForms(contactForms)
    setLoading(false)
  }, [])

  const handleUpdateRow = useCallback(async (newRow: ContactFormDocument, oldRow: ContactFormDocument) => {
    if (newRow.read === oldRow.read) return oldRow
    const { $id, email, message, name, read } = newRow
    const updatedRow = await updateContactForm($id, { email, message, name, read })
    return updatedRow
  }, [])

  useEffect(() => {
    getData({ limit: paginationModel.pageSize, skip: paginationModel.page * paginationModel.pageSize, sort: sortModel, filter: filterModel })
      .catch(console.error)
  }, [paginationModel.page, paginationModel.pageSize, sortModel, filterModel.items])

  return (
    <>
      <Typography variant="h2" align="center">Formularios de contacto</Typography>
      <Box
        sx={{
          width: '100%',
          minHeight: '450px'
        }}
      >
        <DataGrid
          loading={loading}
          columns={columns}
          getRowId={(row) => row.$id}
          rows={contactForms.documents}
          rowCount={contactForms.total}
          initialState={{
            columns: { columnVisibilityModel: { id: false } }
          }}
          paginationMode='server'
          pageSizeOptions={[10, 25, 50, 100]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          sortingMode='server'
          onSortModelChange={setSortModel}
          sortModel={sortModel}
          filterMode='server'
          onFilterModelChange={setFilterModel}
          filterModel={filterModel}
          rowSelection={false}
          processRowUpdate={handleUpdateRow}
          onProcessRowUpdateError={(error:unknown) => {
            handleError(error, 'Error al procesar la actualización de una fila', 'Ocurrio un error al procesar la actualización de una fila. Por favor, intenta de nuevo.')
          }}
        />
      </Box>
    </>
  )
}

export default TabContactForm
