import { Icon } from 'leaflet'

import { placemark, userMarker } from '@/constants/icons'

export const userMarkerIcon = new Icon({
  iconUrl: userMarker,
  iconSize: [32, 24],
})

export const addressMarkerIcon = new Icon({
  iconUrl: placemark.replace('white', 'tomato'),
  iconSize: [32, 40],
})
