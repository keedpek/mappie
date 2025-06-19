import { LngLat } from '@yandex/ymaps3-types'

export default interface PlaceObj {
  id: string
  img: string
  title: string
  description: string
  adress: string
  coordinates: LngLat
  category: string
}
