import { FC, useState } from 'react'

import { googleIcon } from '@/constants/icons'
import { formatAuthError } from '@/utils/authErrorsParser'
import { useAuth } from '@/utils/hooks/useAuth'

import style from './GoogleBtn.module.css'

const GoogleBtn: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState('')
  const { loginWithGoogle } = useAuth()

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      loginWithGoogle()
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
        <img src={googleIcon} alt="google icon" />
        <span>Войти с помощью Google</span>
      </button>
      {error && <p className={style.error}>{error}</p>}
    </>
  )
}

export default GoogleBtn
