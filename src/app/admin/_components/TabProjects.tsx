'use client'
import useHandleError from '@/hooks/useHandleError'
import { Query } from '@/lib/appwrite'
import { getProjects } from '@/services/frontend/projects'
import { ProjectDocumentParsedList } from '@/types/project'
import { Box, Button, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridFilterModel, GridPaginationModel, GridSortModel } from '@mui/x-data-grid'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { useCallback, useEffect, useState } from 'react'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', minWidth: 100, valueGetter: (params) => params.row.$id },
  { field: 'image', headerName: 'Imagen', maxWidth: 125, flex: 1, filterable: false, sortable: false, renderCell: (params) => <NextImage src={params.row.image} alt={params.row.title} width={120} height={63} /> },
  { field: 'title', headerName: 'Título', minWidth: 250, flex: 1 },
  { field: 'slug', headerName: 'Slug', minWidth: 250, flex: 1, filterable: false, sortable: false },
  { field: 'description', headerName: 'Descripción', minWidth: 250, flex: 1 }
]

const TabProjects = () => {
  const { handleError } = useHandleError()
  const [contactForms, setContactForms] = useState<ProjectDocumentParsedList>({ total: 0, documents: [] })
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
    const contactForms = await getProjects(queries)
    return contactForms
  }, [])

  useEffect(() => {
    getData({ limit: paginationModel.pageSize, skip: paginationModel.page * paginationModel.pageSize, sort: sortModel, filter: filterModel })
      .then((data) => {
        setContactForms(data)
      })
      .catch((error) => {
        handleError(error,
          'Error al obtener los proyectos',
          'Ocurrió un error al obtener los proyectos. Por favor, intenta de nuevo.'
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }, [paginationModel.page, paginationModel.pageSize, sortModel, filterModel.items])

  return (
    <>
      <Typography variant="h2" align="center">proyectos</Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          marginBlock: 1
        }}
      >
        <Button
          variant="contained"
          component={NextLink}
          href="/admin/projects/create"
        >
          Crear proyecto
        </Button>
      </Box>
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
            columns: { columnVisibilityModel: { id: false, slug: false } }
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
        />
      </Box>
    </>
  )
}

export default TabProjects
