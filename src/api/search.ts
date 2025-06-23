import AddressObj from '@/types/AddressObj'
import PlaceObj from '@/types/PlaceObj'
import { buildOverpassQuery } from '@/utils/buildOverpassQuery'
import { coordsToFixed } from '@/utils/coordsToFixed'
import { getCategoryByTags } from '@/utils/getCategoryByTags'

import { $overpass, $yandexGeocoder } from '.'

export const searchPlaces = async (
  search: string,
  categories: string[],
  radius: number,
  lat: number,
  lon: number
): Promise<PlaceObj[]> => {
  const query = buildOverpassQuery(search, categories, radius, lat, lon)

  const response = await $overpass.post('/interpreter', query, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  return response.data.elements.map(
    (place): PlaceObj => ({
      id: place.id + '',
      img:
        place.tags['image'] || place.tags['wikidata']
          ? `https://commons.wikimedia.org/wiki/Special:FilePath/${place.tags['wikidata']}`
          : null,
      title: place.tags.name || 'Неизвестно',
      description:
        place.tags.description || place.tags.addr?.street || 'Без описания',
      adress: place.tags.addr || 'Неизвестно',
      coordinates: coordsToFixed([place.lon, place.lat]),
      category: getCategoryByTags(place.tags),
    })
  )
}

export const searchByAddres = async (
  searchQuery: string,
  lat: number,
  lon: number,
  radius: number
): Promise<AddressObj[]> => {
  let queryParams = `/?apikey=${import.meta.env.VITE_YMAP_API_KEY}&geocode=${searchQuery.split(' ').join('+')}`
  if (radius) {
    const spn = (radius * 2) / 1000 + ''
    queryParams += `&rspn=1&ll=${lat},${lon}&spn${spn},${spn}`
  }
  queryParams += '&format=json'
  const res = await $yandexGeocoder.get(queryParams)
  const places = res.data.response.GeoObjectCollection.featureMember
  return places.map(
    (place): AddressObj => ({
      id: place.GeoObject.Point.pos,
      title: place.GeoObject.name,
      address:
        place.GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted,
      coordinates: place.GeoObject.Point.pos
        .split(' ')
        .map((coord) => Number(coord)),
    })
  )
}
