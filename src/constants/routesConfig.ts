import { MAIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '@/constants/routes'
import MainPage from '@/pages/MainPage/MainPage'
import LoginPage from '@/pages/LoginPage/LoginPage'
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
