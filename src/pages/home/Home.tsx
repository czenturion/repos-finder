import { Alert, Box, Button, Container, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { AppDispatch, RootStateT } from '@/store/store'
import { useDispatch, useSelector } from 'react-redux'
import { setPage } from '@/features/searchSlice'
import { fetchRepositories } from '@/features/repoSlice'
import s from './home.module.scss'
import SearchReposInput from '@components/search-repos-input/SearchReposInput'
import ResultTable from '@components/result-table/ResultTable'
import RepositoryDetails from '@components/repository-details/RepositoryDetails'


const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { searchQuery, page, rowsPerPage, sort, selectedRepo } = useSelector((state: RootStateT) => state.search)

  const { repos, error } = useSelector((state: RootStateT) => state.repos)

  useEffect(() => {
    if (searchQuery.length > 0) {
      dispatch(fetchRepositories({ searchQuery, page, rowsPerPage, sort }))
    }
  }, [page, rowsPerPage, sort])

  const handleSearch = () => {
    dispatch(setPage(0))
    dispatch(fetchRepositories({ searchQuery, page, rowsPerPage, sort }))
  }

  return (
    <Container disableGutters maxWidth={ false } className={ s.homePageContainer }>
      <Box className={ s.searchReposInputContainer }>
        <SearchReposInput/>
        <Button className={ s.findBtn } onClick={ handleSearch } variant="contained">ИСКАТЬ</Button>
      </Box>
      { repos.length > 0
        ? (
          <Box className={ s.resultsContainer }>
            <Box className={ s.tableContainer }>
              <Typography className={ s.resultTitle }>Результаты поиска</Typography>
              <ResultTable/>
            </Box>
            <Box className={ s.detailsContainer }>
              { selectedRepo
                ? <RepositoryDetails/>
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
      <Alert severity="error">This is an error Alert.</Alert>
    </Container>
  )
}

export default Home