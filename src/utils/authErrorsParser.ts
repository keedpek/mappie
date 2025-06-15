export const formatAuthError = (error: string) => {
  if (error.includes('invalid-credential')) {
    return 'Некорректные email или пароль'
  } else if (error.includes('email-already-in-use')) {
    return 'Пользователь с таким email уже зарегистрирован'
  }
  return error
}
