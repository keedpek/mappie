import { IToast } from './IToast'

export interface IToastContext {
  addToast: (message: string, type: IToast['type']) => void
  removeToast: (id: string) => void
  toastsList: IToast[]
}
