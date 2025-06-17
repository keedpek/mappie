import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '@/constants/routes'
import LoginPage from '@/pages/LoginPage/LoginPage'
import MainPage from '@/pages/MainPage/MainPage'
import RegistrationPage from '@/pages/RegistrationPage/RegistrationPage'
import RouteConfig from '@/types/RouteConfig'

const routes: RouteConfig[] = [
  {
    path: MAIN_ROUTE,
    component: MainPage,
    privateRoute: true,
  },
  {
    path: LOGIN_ROUTE,
    component: LoginPage,
    privateRoute: false,
  },
  {
    path: REGISTRATION_ROUTE,
    component: RegistrationPage,
    privateRoute: false,
  },
]

export default routes
