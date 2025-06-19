import { useRef } from 'react'
import ymaps from 'yandex-maps'

import PlaceObj from '@/types/PlaceObj'
import { YaGeoObjectCollection, YaSearchOptions } from '@/types/yandex'

type Coords = [number, number]

const useYMaps = () => {
  const ymapRef = useRef<ymaps.Map | null>(null)
  const ymapsAny = window.ymaps as typeof ymaps & {
    search: (
      query: string,
      options?: YaSearchOptions
    ) => Promise<YaGeoObjectCollection>
  }

  const loadYandexMaps = (mapRef: React.RefObject<HTMLDivElement>) => {
    if (!mapRef) {
      throw new Error("Can't find mapRef")
    }
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script')

      script.src = `https://api-maps.yandex.ru/2.1/?apikey=${import.meta.env.VITE_YMAP_API_KEY}&lang=ru_RU`
      script.async = true
      script.onload = () => {
        if (window.ymaps) {
          window.ymaps.ready(() => {
            if (!ymapRef.current) {
              initMap(mapRef)
            }
            getUserGeolocation().then((res) => {
              setMapCenter(ymapRef, res)
            })
            resolve()
          })
        }
      }
      script.onerror = () => {
        reject(new Error('Failed to load Yandex Maps API'))
      }
      document.head.appendChild(script)
    })
  }

  const getUserGeolocation = async () => {
    const response = await window.ymaps.geolocation.get()
    const geometry = response.geoObjects.get(0).geometry as ymaps.IGeometry & {
      getCoordinates: () => Coords
    }
    const coords = geometry.getCoordinates()
    return coords
  }

  const setMapCenter = async (
    map: React.RefObject<ymaps.Map>,
    coords: Coords
  ) => {
    map.current.setCenter(coords)
    map.current.geoObjects.add(
      new window.ymaps.Placemark(coords, { balloonContent: 'Вы здесь' })
    )
  }

  const initMap = (mapRef: React.RefObject<HTMLDivElement>) => {
    const myMap = new window.ymaps.Map(mapRef.current, {
      center: [53.9, 27.5667],
      zoom: 10,
      type: 'yandex#map',
    })

    ymapRef.current = myMap
  }

  const searchPlaces = async (
    query: string,
    types: string[],
    radius: number,
    coords?: Coords
  ) => {
    try {
      const center = coords || (await getUserGeolocation())
      const foundPlaces: PlaceObj[] = []
      const response = await ymapsAny.search(query, {
        boundedBy: [
          [center[0] - radius, center[1] - radius],
          [center[0] + radius, center[1] + radius],
        ],
        types: types,
      })
      response.geoObjects.toArray().forEach((obj) => {
        console.log(obj.properties)
        console.log(obj.getAdressLine())
      })
    } catch (error) {
      console.error(error)
    }
  }
  return {
    loadYandexMaps,
    initMap,
    getUserGeolocation,
    setMapCenter,
    searchPlaces,
    ymapRef,
  }
}

export default useYMaps
