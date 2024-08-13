import { FC } from 'react'
import s from './searchReposInput.module.scss'
import { TextField } from '@mui/material'
import { SearchReposInputT } from '../../types/componetTypes'

const SearchReposInput: FC<SearchReposInputT> = ({ searchQuery, setSearchQuery }) => {
  return (
    <TextField
      fullWidth
      autoFocus
      className={s.repoSearchInput}
      variant="standard"
      placeholder="Введите поисковый запрос"
      defaultValue={ searchQuery }
      onChange={ (e) => setSearchQuery(e.target.value) }
      InputProps={{
        disableUnderline: true,
      }}
    />
  )
}

export default SearchReposInput
