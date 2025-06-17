import { FC } from 'react'

export default interface RouteConfig {
  path: string
  component: FC
  privateRoute: boolean
}
