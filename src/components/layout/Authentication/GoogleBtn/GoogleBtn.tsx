import { FC } from 'react'
import style from './GoogleBtn.module.css'
import google from '@/assets/google-icon-logo.svg'

const GoogleBtn: FC = () => {
  return (
    <button className={style.googleBtn}>
      <img src={google} />
      <span>Войти с помощью Google</span>
    </button>
  )
}

export default GoogleBtn
