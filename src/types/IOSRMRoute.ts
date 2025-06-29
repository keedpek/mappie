import { LatLngExpression } from 'leaflet'

export interface IOSRMRoute {
  route: LatLngExpression[]
  duration: number
  distance: number
}
