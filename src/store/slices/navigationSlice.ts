import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IPlaceObj } from '@/types/IPlaceObj'
import { NavTab } from '@/types/NavTab'

interface NavigationState {
  activeTab: NavTab
  isPannelOpen: boolean
  selectedPlace: IPlaceObj | null
}

const initialState: NavigationState = {
  activeTab: '',
  isPannelOpen: false,
  selectedPlace: null,
}

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<NavTab>) => {
      state.activeTab = action.payload
    },
    setPannelState: (state, action: PayloadAction<boolean>) => {
      state.isPannelOpen = action.payload
    },
    setSelectedPlace: (state, action: PayloadAction<IPlaceObj>) => {
      state.selectedPlace = action.payload
    },
  },
})

export const { setActiveTab, setPannelState, setSelectedPlace } =
  navigationSlice.actions

export default navigationSlice.reducer
