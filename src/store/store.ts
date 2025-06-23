import { combineReducers, configureStore } from '@reduxjs/toolkit'

import favouritesSlice from './slices/favouritesSlice'
import mapSlice from './slices/mapSlice'
import navigationSlice from './slices/navigationSlice'
import userSlice from './slices/userSlice'

const rootReduser = combineReducers({
  user: userSlice,
  navigation: navigationSlice,
  favourites: favouritesSlice,
  map: mapSlice,
})

export const store = configureStore({
  reducer: rootReduser,
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
