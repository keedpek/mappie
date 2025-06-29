import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IPlaceObj } from '@/types/IPlaceObj'

interface FavouritesState {
  favouritePlaces: IPlaceObj[]
}

const initialState: FavouritesState = {
  favouritePlaces: [],
}

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    setFavouritePlaces: (state, action: PayloadAction<IPlaceObj[]>) => {
      state.favouritePlaces = action.payload
    },
    addFavouritePlace: (state, action: PayloadAction<IPlaceObj>) => {
      state.favouritePlaces.push(action.payload)
    },
    removeFromFavourites: (state, action: PayloadAction<IPlaceObj>) => {
      state.favouritePlaces = state.favouritePlaces.filter(
        (place) => place.id !== action.payload.id
      )
    },
  },
})

export const { setFavouritePlaces, addFavouritePlace, removeFromFavourites } =
  favouritesSlice.actions

export default favouritesSlice.reducer
