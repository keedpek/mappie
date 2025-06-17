import { yupResolver } from '@hookform/resolvers/yup'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { object, ref, string } from 'yup'

import { LOGIN_ROUTE } from '@/constants/routes'
import { RegistrationFormData } from '@/types/authentication'
import Loader from '@/UI/Loader/Loader'
import { formatAuthError } from '@/utils/authErrorsParser'
import { useAuth } from '@/utils/hooks/useAuth'

import GoogleBtn from '../GoogleBtn/GoogleBtn'
import style from './RegistrationForm.module.css'

const logInSchema = object({
  email: string()
    .email('Некорректный адрес почты')
    .required('Почта обязательна'),
  password: string()
    .min(6, 'Пароль должен содержать хотя бы 6 символов')
    .matches(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру')
    .required('Пароль обязателен'),
  confirmedPassword: string()
    .oneOf([ref('password')], 'Пароли должны совпадать')
    .required('Подтверждение пароля обязательно'),
})

const RegistrationForm: FC = () => {
  const { register, handleSubmit, formState } = useForm<RegistrationFormData>({
    mode: 'onChange',
    resolver: yupResolver(logInSchema),
  })
  const { errors } = formState
  const [authError, setAuthError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { registerUser } = useAuth()

  const handleRegistration = async (data: RegistrationFormData) => {
    try {
      setIsLoading(true)
      registerUser(data.email, data.password)
    } catch (error) {
      setAuthError(formatAuthError(error.message))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={style.container}>
      <h1>Регистрация:</h1>
      <form
        className={style.form}
        onSubmit={handleSubmit((data) => handleRegistration(data))}
      >
        <div className={style.formField}>
          <input
            className={style.input}
            type="email"
            placeholder="Введите email:"
            {...register('email')}
          />
          <p className={style.error}>{errors.email?.message}</p>
        </div>

        <div className={style.formField}>
          <input
            className={style.input}
            type="password"
            placeholder="Введите пароль:"
            {...register('password')}
          />
          <p className={style.error}>{errors.password?.message}</p>
        </div>

        <div className={style.formField}>
          <input
            className={style.input}
            type="password"
            placeholder="Подтвердите пароль:"
            {...register('confirmedPassword')}
          />
          <p className={style.error}>{errors.confirmedPassword?.message}</p>
        </div>

        <button className={style.submitBtn} disabled={isLoading}>
          {isLoading ? <Loader color="white" /> : 'Зарегистрироваться'}
        </button>
        {authError && <p className={style.error}>{authError}</p>}
      </form>
      <GoogleBtn />
      <div className={style.registerLink}>
        <span>Уже заригестрированы?&nbsp;</span>
        <a href={LOGIN_ROUTE}>Войти</a>
      </div>
    </div>
  )
}

export default RegistrationForm
