import { LatLngExpression } from 'leaflet'

export default interface AddressObj {
  id: string
  title: string
  address: string
  coordinates: LatLngExpression
}
