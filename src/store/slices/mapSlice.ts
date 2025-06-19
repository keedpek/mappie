import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import PlaceObj from '@/types/PlaceObj'

interface MapState {
  searchedPlaces: PlaceObj[] | null
}

const initialState: MapState = {
  searchedPlaces: null,
}

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setSearchedPlaces: (state, action: PayloadAction<PlaceObj[] | null>) => {
      state.searchedPlaces = action.payload
    },
  },
})

export const { setSearchedPlaces } = mapSlice.actions

export default mapSlice.reducer
