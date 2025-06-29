import { yupResolver } from '@hookform/resolvers/yup'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { object, ObjectSchema, ref, string } from 'yup'

import { LOGIN_ROUTE } from '@/constants/routes'
import { IRegistrationFormData } from '@/types/Authentication/IRegistrationFormData'
import Loader from '@/UI/Loader/Loader'
import { formatAuthError } from '@/utils/formatAuthError'
import { useAuth } from '@/utils/hooks/useAuth'
import { useToast } from '@/utils/hooks/useToast'

import GoogleBtn from '../GoogleBtn/GoogleBtn'
import style from './RegistrationForm.module.css'

const registrationSchema: ObjectSchema<IRegistrationFormData> = object({
  email: string()
    .email('Некорректный адрес почты')
    .required('Почта является обязательным полем'),
  password: string()
    .min(6, 'Минимальная длина пароля 6 символов')
    .matches(/[0-9]/, 'Пароль должен содержать цифры')
    .required('Пароль является обязательным полем'),
  confirmedPassword: string()
    .oneOf([ref('password')], 'Пароли должны совпадать')
    .required('Подтверждение пароля обязательно'),
})

const RegistrationForm: FC = () => {
  const { register, handleSubmit, formState } = useForm<IRegistrationFormData>({
    mode: 'onChange',
    resolver: yupResolver(registrationSchema),
  })
  const { errors } = formState
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { registerUser } = useAuth()
  const { addToast } = useToast()

  const handleRegistration = async (data: IRegistrationFormData) => {
    try {
      setIsLoading(true)
      await registerUser(data.email, data.password)
      addToast('Регистрация прошла успешно!', 'success')
    } catch (error) {
      addToast(formatAuthError(error.message), 'error')
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
