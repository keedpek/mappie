import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '@/constants/routes'

import style from './UnauthorizedPopup.module.css'

interface UnauthorizedPopupProps {
  onClose: () => void
}

const UnauthorizedPopup: FC<UnauthorizedPopupProps> = ({ onClose }) => {
  const navigate = useNavigate()

  return (
    <div className={style.overlay} onClick={onClose}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <button className={style.closeBtn} onClick={onClose}>
          &times;
        </button>
        <h2>Доступ запрещён</h2>
        <p>Войдите в аккаунт, чтобы выполнить это действие.</p>
        <div className={style.actions}>
          <button
            className={`${style.btn} ${style.loginBtn}`}
            onClick={() => navigate(LOGIN_ROUTE)}
          >
            Войти
          </button>
          <button
            className={`${style.btn} ${style.registerBtn}`}
            onClick={() => navigate(REGISTRATION_ROUTE)}
          >
            Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  )
}

export default UnauthorizedPopup
