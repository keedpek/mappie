import { LatLngExpression } from 'leaflet'

export default interface PlaceObj {
  id: string
  img: string
  title: string
  description: string
  adress: string
  coordinates: LatLngExpression
  category: string
}
