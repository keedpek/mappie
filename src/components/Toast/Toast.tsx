import { FC } from 'react'
import { createPortal } from 'react-dom'

import { useToast } from '@/utils/hooks/useToast'

import style from './Toast.module.css'

const Toast: FC = () => {
  const { toastsList } = useToast()

  return createPortal(
    <div className={style.toastContainer}>
      {toastsList.map(({ id, type, message }) => (
        <div key={id} className={`${style.toast} ${style[type]}`}>
          <p>{message}</p>
        </div>
      ))}
    </div>,
    document.body
  )
}

export default Toast
