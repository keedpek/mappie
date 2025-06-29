import { createContext } from 'react'

import { IToastContext } from '@/types/Toast/IToastContext'

export const ToastContext = createContext<IToastContext | undefined>(undefined)
