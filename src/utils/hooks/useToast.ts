import { useContext } from 'react'

import { ToastContext } from '@/context/Toast/ToastContext'
import { IToastContext } from '@/types/Toast/IToastContext'

export const useToast = (): IToastContext => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('Нет провайдера ToastProvider')
  }
  return context
}
