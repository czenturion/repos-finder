import { configureStore } from '@reduxjs/toolkit'
import repoReducer from '../features/repoSlice'

// Определяем структуру корневого состояния
export const store = configureStore({
  reducer: {
    // Добавляем редьюсер для управления репозиториями
    repos: repoReducer
  }
})

// Тип корневого состояния
export type RootState = ReturnType<typeof store.getState>

// Тип диспетчера (dispatch)
export type AppDispatch = typeof store.dispatch