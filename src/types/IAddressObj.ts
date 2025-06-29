import { LatLngExpression } from 'leaflet'

export interface IAddressObj {
  id: string
  title: string
  address: string
  coordinates: LatLngExpression
}
