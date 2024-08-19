import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RepositoryDetails } from './repoSlice'

interface SearchState {
  searchQuery: string
  selectedRepo: RepositoryDetails | null
  page: number
  rowsPerPage: number
  sort: string
}

const initialState: SearchState = {
  searchQuery: '',
  selectedRepo: null,
  page: 0,
  rowsPerPage: 10,
  sort: '',
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload
    },
    setSelectedRepo(state, action: PayloadAction<any>) {
      state.selectedRepo = action.payload
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    setRowsPerPage(state, action: PayloadAction<number>) {
      state.rowsPerPage = action.payload
    },
    setSort(state, action: PayloadAction<string>) {
      state.sort = action.payload
    },
  },
})

export const { setSearchQuery, setSelectedRepo, setPage, setRowsPerPage, setSort } = searchSlice.actions

export default searchSlice.reducer