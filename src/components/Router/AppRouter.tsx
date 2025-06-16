import { FC } from 'react'
import routes from '../../constants/routesConfig'
import { Route, Routes } from 'react-router-dom'
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage'
import PrivateRoute from './PrivateRoute'

const AppRouter: FC = () => {
  return (
    <Routes>
      {routes.map(({ path, component, privateRoute }) =>
        privateRoute ? (
          <Route Component={PrivateRoute}>
            <Route path={path} Component={component} />
          </Route>
        ) : (
          <Route path={path} Component={component} />
        )
      )}
      <Route path="*" Component={NotFoundPage} />
    </Routes>
  )
}

export default AppRouter
