import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  isAuth: boolean
  email: string
}

const initialState: UserState = {
  isAuth: false,
  email: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.isAuth = action.payload.isAuth
      state.email = action.payload.email
    },

    logoutUser: (state) => {
      state.isAuth = false
      state.email = ''
    },
  },
})

export const { setUser, logoutUser } = userSlice.actions

export default userSlice.reducer
