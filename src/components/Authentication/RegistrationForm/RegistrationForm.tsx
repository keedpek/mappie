import { FC, useState } from 'react'
import style from './RegistrationForm.module.css'
import { setEmail, setIsAuth } from '@/store/slices/userSlice'
import { useForm } from 'react-hook-form'
import { object, ref, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import { RegistrationFormData } from '@/types/authentication'
import { LOGIN_ROUTE, MAIN_ROUTE } from '@/constants/routes'
import Loader from '@/UI/Loader/Loader'
import GoogleBtn from '../GoogleBtn/GoogleBtn'
import { formatAuthError } from '@/utils/authErrorsParser'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/utils/hooks/reduxHooks'

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
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleRegistration = async (data: RegistrationFormData) => {
    try {
      setIsLoading(true)
      const response = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
      dispatch(setIsAuth(true))
      dispatch(setEmail(response.user.email))
      navigate(MAIN_ROUTE)
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
