import { FC } from 'react'

export interface IRouteConfig {
  path: string
  component: FC
  privateRoute: boolean
}
