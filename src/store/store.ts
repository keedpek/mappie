import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import navigationSlice from './slices/navigationSlice'

const rootReduser = combineReducers({
  user: userSlice,
  navigation: navigationSlice,
})

export const store = configureStore({
  reducer: rootReduser,
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
