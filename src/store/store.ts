import { configureStore } from '@reduxjs/toolkit'
import repoReducer from '../features/repoSlice'
import searchReducer from '../features/searchSlice'

// Определяем структуру корневого состояния
export const store = configureStore({
  reducer: {
    // Добавляем редьюсер для управления репозиториями
    repos: repoReducer,
    search: searchReducer
  }
})

// Тип корневого состояния
export type RootStateT = ReturnType<typeof store.getState>

// Тип диспетчера (dispatch)
export type AppDispatch = typeof store.dispatch