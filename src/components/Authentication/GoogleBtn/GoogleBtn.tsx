import { FC, useState } from 'react'

import { googleIcon } from '@/constants/icons'
import { formatAuthError } from '@/utils/authErrorsParser'
import { useAuth } from '@/utils/hooks/useAuth'
import { useToast } from '@/utils/hooks/useToast'

import style from './GoogleBtn.module.css'

const GoogleBtn: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { loginWithGoogle } = useAuth()
  const { addToast } = useToast()

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      await loginWithGoogle()
      addToast(`Добро пожаловать!`, 'success')
    } catch (error) {
      addToast(formatAuthError(error.message), 'error')
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
    </>
  )
}

export default GoogleBtn
