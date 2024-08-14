import { Box, Button, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import s from './home.module.scss'
import SearchReposInput from '../../components/search-repos-input/SearchReposInput'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { fetchRepositories } from '../../features/repoSlice'
import ResultTable from '../../components/result-table/ResultTable'
import RepositoryDetails from '../../components/repository-details/RepositoryDetails'


const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRepo, setSelectedRepo] = useState<any>(null)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [sort, setSort] = React.useState('')
  const dispatch = useDispatch<AppDispatch>()
  const { repos, loading, error } = useSelector((state: RootState) => state.repos)

  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchRepositories({ query: searchQuery, page, rowsPerPage, sort }))
    }
    console.log(sort)
  }, [dispatch, page, rowsPerPage, sort])

  const handleSearch = () => {
    setPage(0)
    dispatch(fetchRepositories({ query: searchQuery, page, rowsPerPage, sort }))
  }

  return (
    <Container disableGutters maxWidth={ false } className={ s.homePageContainer }>
      <Box className={ s.searchReposInputContainer }>
        <SearchReposInput searchQuery={ searchQuery } setSearchQuery={ setSearchQuery }/>
        <Button className={ s.findBtn } onClick={ handleSearch } variant="contained">ИСКАТЬ</Button>
      </Box>
      { repos.length > 0
        ? (
          <Box className={ s.resultsContainer }>
            <Box className={ s.tableContainer }>
              <Typography className={ s.resultTitle }>Результаты поиска</Typography>
              <ResultTable
                repos={ repos }
                page={ page }
                setPage={ setPage }
                loading={ loading }
                rowsPerPage={ rowsPerPage }
                setRowsPerPage={ setRowsPerPage }
                setSelectedRepo={ setSelectedRepo }
                setSort={ setSort }
              />
            </Box>
            <Box className={ s.detailsContainer }>
              { selectedRepo
                ? <RepositoryDetails repo={ selectedRepo }/>
                : (
                  <Typography className={ s.detailsHint }>
                    Выберите репозиторий
                  </Typography>
                )
              }
            </Box>
          </Box>
        )
        : (
          <Box className={ s.welcomeMsg }>
            <Typography variant="h4" align="center">
              Добро пожаловать
            </Typography>
          </Box>
        ) }
    </Container>
  )
}

export default Home