import { LatLngExpression } from 'leaflet'
import { FC } from 'react'
import { Marker } from 'react-leaflet'

import { userMarkerIcon } from '@/constants/markerIcons'

interface UserMarkerProps {
  coords: LatLngExpression
}

const UserMarker: FC<UserMarkerProps> = ({ coords }) => {
  return <Marker position={coords} icon={userMarkerIcon}></Marker>
}

export default UserMarker
