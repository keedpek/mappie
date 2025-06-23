import { FC } from 'react'

import { useToast } from '@/context/ToastContext'

import style from './Toast.module.css'

const Toast: FC = () => {
  const { toastsList } = useToast()

  return (
    <div className={style.toastContainer}>
      {toastsList.map((toast) => (
        <div key={toast.id} className={`${style.toast} ${style[toast.type]}`}>
          <p>{toast.message}</p>
        </div>
      ))}
    </div>
  )
}

export default Toast
