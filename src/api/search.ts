import { LatLngExpression } from 'leaflet'

import { IAddressObj } from '@/types/IAddressObj'
import { IOSRMRoute } from '@/types/IOSRMRoute'
import { IPlaceObj } from '@/types/IPlaceObj'
import { buildOverpassQuery } from '@/utils/buildOverpassQuery'
import { getCategoryByTags } from '@/utils/getCategoryByTags'

import { $OSRM, $overpass, $yandexGeocoder } from '.'

export const searchPlaces = async (
  search: string,
  categories: string[],
  radius: number,
  center: LatLngExpression
): Promise<IPlaceObj[]> => {
  const query = buildOverpassQuery(search, categories, radius, center)

  const response = await $overpass.post('/interpreter', query, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  const places = response.data.elements.map(
    ({ id, tags, lat, lon }): IPlaceObj => ({
      id: id + '',
      img:
        tags['image'] || tags['wikidata']
          ? `https://commons.wikimedia.org/wiki/Special:FilePath/${tags['wikidata']}`
          : null,
      title: tags.name || 'Неизвестно',
      description: tags.description || tags.addr?.street || 'Без описания',
      adress: tags.addr || 'Неизвестно',
      coordinates: [lat, lon],
      category: getCategoryByTags(tags),
    })
  )
  return places.filter(({ title }) => title !== 'Неизвестно')
}

export const searchByAddres = async (
  searchQuery: string,
  center: LatLngExpression,
  radius: number
): Promise<IAddressObj[]> => {
  let queryParams = `/?apikey=${import.meta.env.VITE_YMAP_API_KEY}&geocode=${searchQuery.split(' ').join('+')}`
  if (radius && Array.isArray(center)) {
    const spn = (radius * 2) / 1000 + ''
    const [lat, lon] = center
    queryParams += `&rspn=1&ll=${lat},${lon}&spn${spn},${spn}`
  }
  queryParams += '&format=json'
  const response = await $yandexGeocoder.get(queryParams)
  const places = response.data.response.GeoObjectCollection.featureMember.map(
    (place): IAddressObj => ({
      id: place.GeoObject.Point.pos,
      title: place.GeoObject.name,
      address:
        place.GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted,
      coordinates: place.GeoObject.Point.pos
        .split(' ')
        .reverse()
        .map((coord) => Number(coord)),
    })
  )
  return places.filter((place) => place.address.includes('Беларусь'))
}

export const getOSRMRoute = async (
  from: LatLngExpression,
  to: LatLngExpression
): Promise<IOSRMRoute> => {
  if (Array.isArray(from) && Array.isArray(to)) {
    const [startLat, startLng] = from
    const [endLat, endLng] = to

    const response = await $OSRM.get(
      `/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`
    )

    return {
      route: response.data.routes[0].geometry.coordinates,
      duration: response.data.routes[0].duration,
      distance: response.data.routes[0].distance,
    }
  }
}
