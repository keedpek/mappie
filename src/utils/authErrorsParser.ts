export const formatAuthError = (error: string) => {
  if (error.includes('invalid-credential')) {
    return 'Некорректные email или пароль'
  }
}
