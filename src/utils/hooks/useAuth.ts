import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import { LOGIN_ROUTE, MAIN_ROUTE } from '@/constants/routes'
import { auth, googleProvider } from '@/firebase'
import { logoutUser, setUser } from '@/store/slices/userSlice'

import { useAppDispatch } from './reduxHooks'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const loginWithEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<void> => {
    const response = await signInWithEmailAndPassword(auth, email, password)
    dispatch(setUser({ isAuth: true, email: response.user.email }))
    navigate(MAIN_ROUTE)
  }

  const loginWithGoogle = async (): Promise<void> => {
    const response = await signInWithPopup(auth, googleProvider)
    dispatch(setUser({ isAuth: true, email: response.user.email }))
    navigate(MAIN_ROUTE)
  }

  const registerUser = async (
    email: string,
    password: string
  ): Promise<void> => {
    const response = await createUserWithEmailAndPassword(auth, email, password)
    dispatch(setUser({ isAuth: true, email: response.user.email }))
    navigate(MAIN_ROUTE)
  }

  const logout = async (): Promise<void> => {
    await signOut(auth)
    dispatch(logoutUser())
    navigate(LOGIN_ROUTE)
  }

  return { loginWithEmailAndPassword, loginWithGoogle, registerUser, logout }
}
