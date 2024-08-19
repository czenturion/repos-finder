import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { searchRepositories } from '@/services/github'

// Типы данных
export interface Repository {
  id: number
  name: string
  language: string
  forks: number
  stargazers_count: number
  updated_at: string
  topics: string[]
  description: string
  license: License
}

type License = {
  name: string
}

export interface RepositoryDetails {
  name: string
  language: string
  description: string
  license: { name: string }
  stargazers_count: string
  topics: string[]
}

interface RepoState {
  repos: Repository[]
  totalCount: number
  loading: boolean
  error: string | null
}

type fetchRepositoriesPropsT = {
  searchQuery: string
  page: number
  rowsPerPage: number
  sort: string
}

// Начальное состояние
const initialState: RepoState = {
  repos: [],
  totalCount: 0,
  loading: false,
  error: null
}

// Асинхронные операции
export const fetchRepositories = createAsyncThunk(
  'repos/fetchRepositories',
  async ({ searchQuery, page, rowsPerPage, sort }: fetchRepositoriesPropsT, { rejectWithValue }) => {
    try {
      const data = await searchRepositories(searchQuery, page, rowsPerPage, sort)
      return data
    } catch (error: any) {
      if (error.status) {
        return rejectWithValue(error.message)
      } else {
        return rejectWithValue("An unknown error occurred")
      }
    }
  }
)


// Slice
const repoSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRepositories.fulfilled, (state, action) => {
        state.loading = false
        state.repos = action.payload.items
        state.totalCount = action.payload.total_count
      })
      .addCase(fetchRepositories.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})

export default repoSlice.reducer