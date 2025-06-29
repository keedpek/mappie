import { yupResolver } from '@hookform/resolvers/yup'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { object, ObjectSchema, string } from 'yup'

import { REGISTRATION_ROUTE } from '@/constants/routes'
import { ILogInFormData } from '@/types/Authentication/ILogInFormData'
import Loader from '@/UI/Loader/Loader'
import { formatAuthError } from '@/utils/formatAuthError'
import { useAuth } from '@/utils/hooks/useAuth'
import { useToast } from '@/utils/hooks/useToast'

import GoogleBtn from '../GoogleBtn/GoogleBtn'
import style from './LogInForm.module.css'

const logInSchema: ObjectSchema<ILogInFormData> = object({
  email: string()
    .email('Некорректный адрес почты')
    .required('Почта является обязательным полем'),
  password: string().required('Пароль является обязательным полем'),
})

const LogInForm: FC = () => {
  const { register, handleSubmit, formState } = useForm<ILogInFormData>({
    mode: 'onChange',
    resolver: yupResolver(logInSchema),
  })
  const { errors } = formState
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { loginWithEmailAndPassword } = useAuth()
  const { addToast } = useToast()

  const handleLogin = async (data: ILogInFormData) => {
    try {
      setIsLoading(true)
      await loginWithEmailAndPassword(data.email, data.password)
      addToast(`Добро пожаловать, ${data.email}!`, 'success')
    } catch (error) {
      addToast(formatAuthError(error.message), 'error')
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
