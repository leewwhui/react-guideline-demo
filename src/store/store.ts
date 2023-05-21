import { configureStore } from '@reduxjs/toolkit'
import elementReducer from './elementSlice/elementSlice'

export const store = configureStore({
  reducer: {
    element: elementReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch