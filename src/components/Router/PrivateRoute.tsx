import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { LOGIN_ROUTE } from '@/constants/routes'
import { useAppSelector } from '@/utils/hooks/reduxHooks'

const PrivateRoute: FC = () => {
  const isAuth = useAppSelector((store) => store.user.isAuth)
  return isAuth ? <Outlet /> : <Navigate to={LOGIN_ROUTE} />
}

export default PrivateRoute
