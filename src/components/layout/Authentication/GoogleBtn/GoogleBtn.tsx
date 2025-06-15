import { FC, useState } from 'react'
import style from './GoogleBtn.module.css'
import google from '@/assets/google-icon-logo.svg'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '@/firebase'
import { useDispatch } from 'react-redux'
import { setEmail, setIsAuth } from '@/store/slices/userSlice'
import { formatAuthError } from '@/utils/authErrorsParser'
import { useNavigate } from 'react-router-dom'
import { MAIN_ROUTE } from '@/constants/routes'

const GoogleBtn: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      const response = await signInWithPopup(auth, googleProvider)
      console.log(response)
      dispatch(setIsAuth(true))
      dispatch(setEmail(response.user.email))
      navigate(MAIN_ROUTE)
    } catch (error) {
      setError(formatAuthError(error.message))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <button
        className={style.googleBtn}
        onClick={handleLogin}
        disabled={isLoading}
      >
        <img src={google} />
        <span>Войти с помощью Google</span>
      </button>
      {error && <p className={style.error}>{error}</p>}
    </>
  )
}

export default GoogleBtn
