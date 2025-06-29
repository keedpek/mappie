import { AUTH_ERRORS } from '@/constants/authErrors'

export const formatAuthError = (error: string): string => {
  const [key] = Object.entries(AUTH_ERRORS).find(([key]) => error.includes(key))
  return AUTH_ERRORS[key] || 'Ошибка авторизации'
}
