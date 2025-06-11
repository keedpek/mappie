import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'

const rootReduser = combineReducers({
  user: userSlice,
})

export const store = configureStore({
  reducer: rootReduser,
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
