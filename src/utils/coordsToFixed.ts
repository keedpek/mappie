import { LngLat } from '@yandex/ymaps3-types'

export const coordsToFixed = (coords: LngLat) => {
  return [
    Number(Number(coords[0]).toFixed(6)),
    Number(Number(coords[1]).toFixed(6)),
  ] as LngLat
}
