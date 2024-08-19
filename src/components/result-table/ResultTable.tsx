import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from '@mui/material'
import React from 'react'
import s from './resultTable.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootStateT } from '@/store/store'
import Loader from '@components/loader/Loader'
import { setPage, setSelectedRepo, setRowsPerPage, setSort } from '@/features/searchSlice'
import { ResultTablePropsT } from '@/types/componetTypes'
import { columns } from '@/store/consts'


const ResultTable: React.FC<ResultTablePropsT> = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { repos, loading, totalCount } = useSelector((state: RootStateT) => state.repos)
  const { page, rowsPerPage } = useSelector((state: RootStateT) => state.search)

  // Функция для TablePagination, для изменения текущей страницы
  const handleChangePage = (_event: unknown, newPage: number) => {
    dispatch(setPage(newPage))
  }

  // Функция для TablePagination, для изменения кол-ва записей на странице
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRowsPerPage(parseInt(event.target.value)))
  }

  return (
    <Box>
      {
        loading
          ? <Loader/>
          : <Box>
            <TableContainer className={ s.table }>
              <Table>
                <TableHead>
                  <TableRow className={ s.tableHead }>
                    { columns.map((column) => (
                      <TableCell
                        key={ column.id }
                        className={ s.column }
                      >
                        <TableSortLabel
                          className={ s.headTitle }
                          onClick={ () => dispatch(setSort(column.id)) }
                        >
                          { column.label }
                        </TableSortLabel>
                      </TableCell>
                    )) }
                  </TableRow>
                </TableHead>
                <TableBody>
                  { repos.map((repo) => (
                    <TableRow className={ s.repo } key={ repo.id } onClick={ () => dispatch(setSelectedRepo(repo)) }>
                      <TableCell className={ s.repoName }>{ repo.name }</TableCell>
                      <TableCell>{ repo.language }</TableCell>
                      <TableCell>{ repo.forks }</TableCell>
                      <TableCell>{ repo.stargazers_count }</TableCell>
                      <TableCell>{ repo.updated_at.slice(0, 10).split('-').reverse().join('-') }</TableCell>
                    </TableRow>
                  )) }
                </TableBody>
              </Table>
              <TablePagination
                className={ s.paginator }
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
