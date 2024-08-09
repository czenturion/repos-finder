import { FC } from 'react'
import s from './searchReposInput.module.scss'
import { TextField } from '@mui/material'
import { SearchReposInputT } from '../../types/componetTypes'

const SearchReposInput: FC<SearchReposInputT> = ({ searchQuery, setSearchQuery }) => {
  return (
    <TextField
      label="Search Repositories"
      variant="filled"
      fullWidth
      value={ searchQuery }
      autoFocus
      onChange={ (e) => setSearchQuery(e.target.value) }
      InputLabelProps={{
        shrink: false, // Отменяет сжатие лейбла на верх
      }}
      InputProps={{
        classes: {
          root: s.inputRoot
        }
      }}
    />
  )
}

export default SearchReposInput