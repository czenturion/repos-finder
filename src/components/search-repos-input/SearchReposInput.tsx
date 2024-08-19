import { FC } from 'react'
import s from './searchReposInput.module.scss'
import { TextField } from '@mui/material'
import { SearchReposInputT } from '@/types/componetTypes'
import { setSearchQuery } from '@/features/searchSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootStateT } from '@/store/store'

const SearchReposInput: FC<SearchReposInputT> = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { searchQuery } = useSelector((state: RootStateT) => state.search)

  return (
    <TextField
      fullWidth
      autoFocus
      className={ s.repoSearchInput }
      variant="standard"
      placeholder="Введите поисковый запрос"
      defaultValue={ searchQuery }
      onChange={ (e) => dispatch(setSearchQuery(e.target.value)) }
      InputProps={ {
        disableUnderline: true
      } }
    />
  )
}

export default SearchReposInput
