import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import routes from '@/constants/routesConfig'

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
    </Routes>
  )
}

export default AppRouter
