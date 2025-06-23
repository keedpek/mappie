import { LngLat } from '@yandex/ymaps3-types'
import { FC } from 'react'

import { userMarker } from '@/constants/icons'
import { YMapMarker } from '@/lib/ymaps'

import style from './UserMarker.module.css'

interface UserMarkerProps {
  coords: LngLat
}

const UserMarker: FC<UserMarkerProps> = ({ coords }) => {
  return (
    <YMapMarker coordinates={coords}>
      <img className={style.marker} src={userMarker} alt="user geolocation" />
    </YMapMarker>
  )
}

export default UserMarker
