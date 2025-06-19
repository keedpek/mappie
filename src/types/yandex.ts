import ymaps from 'yandex-maps'

export type ymapsExtended = typeof ymaps & YaMaps

export interface YaMaps {
  geocode: (
    query: string,
    options?: YaGeocodeOptions
  ) => Promise<YaGeoObjectCollection>
  search: (
    query: string,
    options?: YaSearchOptions
  ) => Promise<YaGeoObjectCollection>
}

export interface YaGeocodeOptions {
  radius?: number
  boundedBy?: [[number, number], [number, number]]
  sort?: string
  results?: number
  skip?: number
  strictBounds?: boolean
}

export interface YaSearchOptions {
  boundedBy?: [[number, number], [number, number]]
  types?: string[]
  results?: number
  skip?: number
  strictBounds?: boolean
  searchCoordOrder?: 'longlat' | 'latlong'
  region?: string
}

export interface YaGeoObjectCollection {
  geoObjects: {
    get(index: number): YaGeoObject | null
    toArray(): YaGeoObject[]
  }
}

export interface YaGeoObject {
  properties: {
    get(key: string): string
  }
  geometry: {
    getCoordinates(): [number, number]
  }
  getAdressLine(): string
}
