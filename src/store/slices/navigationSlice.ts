import { NavTab } from '@/types/NavTab'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface NavigationState {
  activeTab: NavTab
}

const initialState: NavigationState = {
  activeTab: '',
}

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<NavTab>) => {
      state.activeTab = action.payload
    },
  },
})

export const { setActiveTab } = navigationSlice.actions

export default navigationSlice.reducer
