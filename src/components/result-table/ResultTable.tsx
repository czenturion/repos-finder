import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer, TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from '@mui/material'
import React from 'react'
import { Repository } from '../../features/repoSlice'
import s from './resultTable.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import Loader from '../loader/Loader'

interface Column {
  id: 'name' | 'language' | 'forks' | 'stars' | 'updated'
  label: string
  minWidth?: number
  sortable?: boolean
  type?: 'number'
  align?: 'right'
  format?: (value: number) => string
}


const columns: readonly Column[] = [
  {
    id: 'name',
    label: 'Название',
    sortable: true
  },
  {
    id: 'language',
    label: 'Язык',
    sortable: true
  },
  {
    id: 'forks',
    label: 'Число форков',
    type: 'number',
    sortable: true,
    format: (value: number) => value.toLocaleString('en-US')
  },
  {
    id: 'stars',
    label: 'Число звезд',
    sortable: true,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US')
  },
  {
    id: 'updated',
    label: 'Дата обновления',
    sortable: true,
    align: 'right',
    format: (value: number) => value.toFixed(2)
  }
];

type ResultTablePropsT = {
  repos: Repository[]
  loading: boolean
  page: number
  rowsPerPage: number
  setPage: (p: number) => void
  setRowsPerPage: (p: number) => void
  setSelectedRepo: (r: Repository) => void
  setSort: (s: string) => void
}

const ResultTable: React.FC<ResultTablePropsT> = ({
                                                    repos,
                                                    loading,
                                                    page,
                                                    setPage,
                                                    rowsPerPage,
                                                    setRowsPerPage,
                                                    setSelectedRepo,
                                                    setSort
                                                  }) => {
  const totalCount = useSelector((state: RootState) => state.repos.totalCount)

  const handleChangePage = (_event: unknown, newPage: number) => {
    console.log(newPage)
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Box>
      {
        loading
          ? <Loader/>
          : <Box>
            <TableContainer className={ s.table }>
              <Table sx={ { paddingBottom: '52px' } }>
                <TableHead>
                  <TableRow>
                    { columns.map((column) => (
                      <TableCell
                        key={ column.id }
                      >
                        <TableSortLabel
                          className={ s.headTitle }
                          onClick={ () => setSort(column.label) }
                        >
                          { column.label }
                        </TableSortLabel>
                      </TableCell>
                    )) }
                  </TableRow>
                </TableHead>
                <TableBody>
                  { repos.map((repo) => (
                    <TableRow key={ repo.id } onClick={ () => setSelectedRepo(repo) }>
                      <TableCell>{ repo.name }</TableCell>
                      <TableCell>{ repo.language }</TableCell>
                      <TableCell>{ repo.forks }</TableCell>
                      <TableCell>{ repo.stargazers_count }</TableCell>
                      <TableCell>{ repo.updated_at.slice(0, 10) }</TableCell>
                    </TableRow>
                  )) }
                </TableBody>
              </Table>
              <TablePagination
                sx={ { position: 'fixed', bottom: '0', right: '33%', background: 'white', width: '100%' } }
                page={ page }
                component="div"
                rowsPerPageOptions={ [5, 10, 25] }
                rowsPerPage={ rowsPerPage }
                onPageChange={ handleChangePage }
                onRowsPerPageChange={ handleChangeRowsPerPage }
                count={ Math.round(totalCount / rowsPerPage) }
              />
            </TableContainer>
          </Box>
      }
    </Box>
  )
}

export default ResultTable
