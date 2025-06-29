import { LatLngExpression } from 'leaflet'

export interface IPlaceObj {
  id: string
  img: string
  title: string
  description: string
  adress: string
  coordinates: LatLngExpression
  category: string
}
