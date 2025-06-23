import { FC } from 'react'
import { createPortal } from 'react-dom'

import { useToast } from '@/utils/hooks/useToast'

import style from './Toast.module.css'

const Toast: FC = () => {
  const { toastsList } = useToast()

  return createPortal(
    <div className={style.toastContainer}>
      {toastsList.map((toast) => (
        <div key={toast.id} className={`${style.toast} ${style[toast.type]}`}>
          <p>{toast.message}</p>
        </div>
      ))}
    </div>,
    document.body
  )
}

export default Toast
