import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import PlaceObj from '@/types/PlaceObj'

interface FavouritesState {
  favouritePlaces: PlaceObj[]
}

const initialState: FavouritesState = {
  favouritePlaces: [],
}

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    setFavouritePlaces: (state, action: PayloadAction<PlaceObj[]>) => {
      state.favouritePlaces = action.payload
    },
    addFavouritePlace: (state, action: PayloadAction<PlaceObj>) => {
      state.favouritePlaces.push(action.payload)
    },
    removeFromFavourites: (state, action: PayloadAction<PlaceObj>) => {
      state.favouritePlaces = state.favouritePlaces.filter(
        (place) => place.id !== action.payload.id
      )
    },
  },
})

export const { setFavouritePlaces, addFavouritePlace, removeFromFavourites } =
  favouritesSlice.actions

export default favouritesSlice.reducer
