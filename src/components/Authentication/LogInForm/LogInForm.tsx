import { FC, useState } from 'react'
import style from './LogInForm.module.css'
import { useDispatch } from 'react-redux'
import { setEmail, setIsAuth } from '@/store/slices/userSlice'
import { useForm } from 'react-hook-form'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import { LogInFormData } from '@/types/authentication'
import { MAIN_ROUTE, REGISTRATION_ROUTE } from '@/constants/routes'
import Loader from '@/UI/Loader/Loader'
import GoogleBtn from '../GoogleBtn/GoogleBtn'
import { formatAuthError } from '@/utils/authErrorsParser'
import { useNavigate } from 'react-router-dom'

const logInSchema = object({
  email: string()
    .email('Некорректный адрес почты')
    .required('Почта является обязательным полем'),
  password: string().required('Пароль является обязательным полем'),
})

const LogInForm: FC = () => {
  const { register, handleSubmit, formState } = useForm<LogInFormData>({
    mode: 'onChange',
    resolver: yupResolver(logInSchema),
  })
  const { errors } = formState
  const [authError, setAuthError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (data: LogInFormData) => {
    try {
      setIsLoading(true)
      const response = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
      console.log(response)
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
      <h1>Вход:</h1>
      <form
        className={style.form}
        onSubmit={handleSubmit((data) => handleLogin(data))}
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

        <button className={style.submitBtn} disabled={isLoading}>
          {isLoading ? <Loader color="white" /> : 'Войти'}
        </button>
        {authError && <p className={style.error}>{authError}</p>}
      </form>
      <GoogleBtn />
      <div className={style.registerLink}>
        <span>Еще не заригестрированы?&nbsp;</span>
        <a href={REGISTRATION_ROUTE}>Зарегистрироваться</a>
      </div>
    </div>
  )
}

export default LogInForm
