import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AppRouter from './components/Router/AppRouter'
import { LOGIN_ROUTE, MAIN_ROUTE } from './constants/routes'
import { auth } from './firebase'
import { logoutUser, setUser } from './store/slices/userSlice'
import Loader from './UI/Loader/Loader'
import { useAppDispatch } from './utils/hooks/reduxHooks'

function App() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser({ isAuth: true, email: user.email }))
        navigate(MAIN_ROUTE)
      } else {
        dispatch(logoutUser())
        navigate(LOGIN_ROUTE)
      }
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [dispatch, navigate])

  if (isLoading) {
    return <Loader size="l" color="purple" />
  }

  return <AppRouter />
}

export default App
