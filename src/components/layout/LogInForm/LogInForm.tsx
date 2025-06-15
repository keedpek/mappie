import { FC } from 'react'
import style from './LogInForm.module.css'
import { useForm } from 'react-hook-form'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { LogInFormData } from '@/types/authentication'
import { REGISTRATION_ROUTE } from '@/constants/routes'
import google from '@/assets/google-icon-logo.svg'

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

  return (
    <div className={style.container}>
      <h1>Вход:</h1>
      <form
        className={style.form}
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <input className={style.input} type="email" {...register('email')} />
        <input
          className={style.input}
          type="password"
          {...register('password')}
        />
        <button className={style.submitBtn}>Войти</button>
      </form>
      <button className={style.googleBtn}>
        <img src={google} />
        <span>Войти с помощью Google</span>
      </button>
      <div className={style.registerLink}>
        <span>Еще не заригестрированы?&nbsp;</span>
        <a href={REGISTRATION_ROUTE}>Зарегистрироваться</a>
      </div>
    </div>
  )
}

export default LogInForm
