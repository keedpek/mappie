import { createContext } from 'react'

import { IToastContext } from '@/types/IToastContext'

export const ToastContext = createContext<IToastContext | undefined>(undefined)
