import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LngLat } from '@yandex/ymaps3-types'

import { DEFAULT_LOCATION } from '@/constants/map'
import AddressObj from '@/types/AddressObj'
import PlaceObj from '@/types/PlaceObj'

interface MapState {
  searchedPlaces: PlaceObj[] | null
  searchedAddresses: AddressObj[] | null
  searchCenter: LngLat
  searchRadius: number
  routePlace: LngLat
}

const initialState: MapState = {
  searchedPlaces: null,
  searchedAddresses: null,
  searchCenter: DEFAULT_LOCATION,
  searchRadius: 0,
  routePlace: null,
}

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setSearchedPlaces: (state, action: PayloadAction<PlaceObj[] | null>) => {
      state.searchedPlaces = action.payload
    },
    setSearchedAddresses: (
      state,
      action: PayloadAction<AddressObj[] | null>
    ) => {
      state.searchedAddresses = action.payload
    },
    setSearchCenter: (state, action: PayloadAction<LngLat>) => {
      state.searchCenter = action.payload
    },
    setSearchRadius: (state, action: PayloadAction<number>) => {
      state.searchRadius = action.payload
    },
    setRoutePlace: (state, action: PayloadAction<LngLat>) => {
      state.routePlace = action.payload
    },
  },
})

export const {
  setSearchedPlaces,
  setSearchedAddresses,
  setSearchCenter,
  setSearchRadius,
  setRoutePlace,
} = mapSlice.actions

export default mapSlice.reducer
