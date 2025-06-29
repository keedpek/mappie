import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LatLngExpression } from 'leaflet'

import { DEFAULT_LOCATION } from '@/constants/map'
import { IAddressObj } from '@/types/IAddressObj'
import { IPlaceObj } from '@/types/IPlaceObj'

interface MapState {
  searchedPlaces: IPlaceObj[] | null
  searchedAddresses: IAddressObj[] | null
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
    setSearchedPlaces: (state, action: PayloadAction<IPlaceObj[] | null>) => {
      state.searchedPlaces = action.payload
    },
    setSearchedAddresses: (
      state,
      action: PayloadAction<IAddressObj[] | null>
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
