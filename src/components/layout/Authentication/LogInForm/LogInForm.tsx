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
import { REGISTRATION_ROUTE } from '@/constants/routes'
import Loader from '@/components/UI/Loader/Loader'
import GoogleBtn from '../GoogleBtn/GoogleBtn'

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

  const handleLogin = async (data: LogInFormData) => {
    try {
      setIsLoading(true)
      await signInWithEmailAndPassword(auth, data.email, data.password)
      dispatch(setIsAuth(true))
      dispatch(setEmail(data.email))
    } catch (error) {
      setAuthError(error.message)
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
        <button className={style.submitBtn}>
          {isLoading ? <Loader color="white" /> : 'Войти'}
        </button>
        {authError && <p className={style.error}>Неверные данные</p>}
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
