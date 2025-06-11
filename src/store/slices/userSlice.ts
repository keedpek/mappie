import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  isAuth: boolean
  name: string
  email: string
}

const initialState: UserState = {
  isAuth: false,
  name: '',
  email: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
  },
})

export const { setIsAuth, setEmail, setName } = userSlice.actions

export default userSlice.reducer
