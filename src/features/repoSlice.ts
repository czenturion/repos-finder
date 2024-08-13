import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getRepositoryDetails, searchRepositories } from '../services/github'
import axios from 'axios'

// Типы данных
export interface Repository {
  id: number
  name: string
  language: string
  forks: number
  stargazers_count: number
  updated_at: string
}

interface RepositoryDetails {
  name: string
  description: string
  license: { name: string }
}

interface RepoState {
  repos: Repository[]
  totalCount: number
  details: RepositoryDetails | null
  loading: boolean
  error: string | null
}

// Начальное состояние
const initialState: RepoState = {
  repos: [],
  totalCount: 0,
  details: null,
  loading: false,
  error: null
}

// Асинхронные операции
export const fetchRepositories = createAsyncThunk(
  'repos/fetchRepositories',
  async ({ query, page }: { query: string, page: number }, { rejectWithValue }) => {
    try {
      const data = await searchRepositories(query, page)
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message)
      } else {
        return rejectWithValue("An unknown error occurred")
      }
    }
  }
)

export const fetchRepositoryDetails = createAsyncThunk(
  'repos/fetchRepositoryDetails',
  async ({ owner, repo }: { owner: string; repo: string }, { rejectWithValue }) => {
    try {
      return await getRepositoryDetails(owner, repo)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error!.response!.data.message)
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
      .addCase(fetchRepositoryDetails.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRepositoryDetails.fulfilled, (state, action) => {
        state.loading = false
        state.details = action.payload
      })
      .addCase(fetchRepositoryDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})

export default repoSlice.reducer