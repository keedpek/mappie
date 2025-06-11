import { MAIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '@/constants/routes'
import MainPage from '@/pages/MainPage/MainPage'
import LoginPage from '@/pages/LoginPage/LoginPage'
import RegistrationPage from '@/pages/RegistrationPage/RegistrationPage'
import RouteConfig from '@/types/routeConfig'

const routes: RouteConfig[] = [
  {
    path: MAIN_ROUTE,
    component: MainPage,
  },
  {
    path: LOGIN_ROUTE,
    component: LoginPage,
  },
  {
    path: REGISTRATION_ROUTE,
    component: RegistrationPage,
  },
]

export default routes
