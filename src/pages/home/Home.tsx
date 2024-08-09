import { Box, Container } from '@mui/material'
import { useState } from 'react'
import s from './home.module.scss'
import SearchReposInput from '../../components/search-repos-input/SearchReposInput'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRepo, setSelectedRepo] = useState<any>(null)
  const [repos, setRepos] = useState<any[]>([])

  console.log(searchQuery)

  return (
    <Container disableGutters maxWidth={false}>
      <Box className={s.searchReposInputContainer}>
        <SearchReposInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </Box>
      Home page
    </Container>
  )
}

export default Home