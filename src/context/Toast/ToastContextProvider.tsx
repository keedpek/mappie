import { FC, useEffect, useState } from 'react'

import { IToast } from '@/types/Toast/IToast'
import { IToastContext } from '@/types/Toast/IToastContext'
import { IToastProviderProps } from '@/types/Toast/IToastProviderProps'
import { createToastId } from '@/utils/createToastId'

import { ToastContext } from './ToastContext'

export const ToastProvider: FC<IToastProviderProps> = ({ children }) => {
  const [toastsList, setToastsList] = useState<IToast[]>([])

  const addToast = (message: string, type: IToast['type']): void => {
    setToastsList((prev) => [
      ...prev,
      {
        id: createToastId(),
        message: message,
        type: type,
      },
    ])
  }

  const removeToast = (id: string): void => {
    setToastsList((prev) => prev.filter((toast) => toast.id !== id))
  }

  const value: IToastContext = {
    addToast,
    removeToast,
    toastsList,
  }

  useEffect(() => {
    toastsList.forEach((toast) => {
      const timeoutId = setTimeout(() => {
        removeToast(toast.id)
      }, 2000)
      return () => clearTimeout(timeoutId)
    })
  }, [toastsList])

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}
