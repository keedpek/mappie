import { LngLat } from '@yandex/ymaps3-types'

export default interface AddressObj {
  id: string
  title: string
  address: string
  coordinates: LngLat
}
