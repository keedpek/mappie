import { FC } from 'react'
import type { LngLat, YMapLocationRequest } from 'ymaps3'

import {
  reactify,
  YMap,
  YMapDefaultFeaturesLayer,
  YMapDefaultSchemeLayer,
} from '@/lib/ymaps'
import { useAppSelector } from '@/utils/hooks/reduxHooks'

// import useYMaps from '@/utils/hooks/useYMaps'
import style from './MapComponent.module.css'
import PlaceMarker from './PlaceMarker/PlaceMarker'

const MapComponent: FC = () => {
  const LOCATION: YMapLocationRequest = {
    center: [27.75, 53.85],
    zoom: 9,
  }
  const searchedPlaces = useAppSelector((store) => store.map.searchedPlaces)
  const mockPlaces = [
    {
      id: '1',
      img: 'https://via.placeholder.com/100x80?text=Shop+1',
      title: 'Магазин "Солнечный"',
      description: 'Продуктовый магазин у дома',
      adress: 'ул. Ленина, д. 10',
      coordinates: [27.71, 53.81] as LngLat,
      category: 'Shop',
    },
    {
      id: '2',
      img: 'https://via.placeholder.com/100x80?text=Cafe+2',
      title: 'Кафе "Уют"',
      description: 'Уютное семейное кафе с домашней кухней',
      adress: 'ул. Гоголя, д. 5',
      coordinates: [27.72, 53.82] as LngLat,
      category: 'Coffee',
    },
    {
      id: '3',
      img: 'https://via.placeholder.com/100x80?text=Park+3',
      title: 'Парк культуры и отдыха',
      description: 'Большой зелёный парк с аттракционами',
      adress: 'проспект Победы, д. 1',
      coordinates: [27.73, 53.83] as LngLat,
      category: 'Entertainment',
    },
    {
      id: '4',
      img: 'https://via.placeholder.com/100x80?text=Pharmacy+4',
      title: 'Аптека №1',
      description: 'Круглосуточная аптека',
      adress: 'ул. Московская, д. 15',
      coordinates: [27.74, 53.84] as LngLat,
      category: 'History',
    },
    {
      id: '5',
      img: 'https://via.placeholder.com/100x80?text=Bank+5',
      title: 'Банк Беларусбанка',
      description: 'Отделение банка с услугами для физических лиц',
      adress: 'ул. Интернациональная, д. 8',
      coordinates: [27.75, 53.85] as LngLat,
      category: 'Bank',
    },
    {
      id: '6',
      img: 'https://via.placeholder.com/100x80?text=Gas+Station+6',
      title: 'АЗС №7',
      description: 'Автозаправочная станция круглосуточно',
      adress: 'трасса М1, выезд 12',
      coordinates: [27.76, 53.86] as LngLat,
      category: 'GasStation',
    },
  ]
  // const mapDivRef = useRef<HTMLDivElement>(null)
  // const { loadYandexMaps } = useYMaps()

  // useEffect(() => {
  //   loadYandexMaps(mapDivRef)
  //     .then(() => {
  //       setIsLoading(false)
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //     })
  // }, [loadYandexMaps])

  return (
    <div className={`${style.container}`}>
      <YMap location={reactify.useDefault(LOCATION)}>
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />

        {mockPlaces.map((place) => (
          <PlaceMarker place={place} />
        ))}
      </YMap>
    </div>
  )
}

export default MapComponent
