import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LatLngExpression } from 'leaflet'

import { DEFAULT_LOCATION } from '@/constants/map'
import AddressObj from '@/types/AddressObj'
import PlaceObj from '@/types/PlaceObj'

interface MapState {
  searchedPlaces: PlaceObj[] | null
  searchedAddresses: AddressObj[] | null
  searchCenter: LatLngExpression
  searchRadius: number
  routePlace: LatLngExpression
}

const initialState: MapState = {
  searchedPlaces: null,
  searchedAddresses: null,
  searchCenter: DEFAULT_LOCATION.center,
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
    setSearchCenter: (state, action: PayloadAction<LatLngExpression>) => {
      state.searchCenter = action.payload
    },
    setSearchRadius: (state, action: PayloadAction<number>) => {
      state.searchRadius = action.payload
    },
    setRoutePlace: (state, action: PayloadAction<LatLngExpression>) => {
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
