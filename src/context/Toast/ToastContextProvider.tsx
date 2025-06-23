import { FC, useEffect, useState } from 'react'

import { IToast } from '@/types/IToast'
import { IToastContext } from '@/types/IToastContext'
import { IToastProviderProps } from '@/types/IToastProviderProps'
import { getToastId } from '@/utils/getToastId'

import { ToastContext } from './ToastContext'

export const ToastProvider: FC<IToastProviderProps> = ({ children }) => {
  const [toastsList, setToastsList] = useState<IToast[]>([])

  const addToast = (message: string, type: IToast['type']) => {
    setToastsList((prev) => [
      ...prev,
      {
        id: getToastId(),
        message: message,
        type: type,
      },
    ])
  }

  const removeToast = (id: string) => {
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
