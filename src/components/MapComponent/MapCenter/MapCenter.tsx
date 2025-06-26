import { LatLngExpression } from 'leaflet'
import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

interface MapCenterProps {
  center: LatLngExpression
}

const MapCenter: React.FC<MapCenterProps> = ({ center }) => {
  const map = useMap()

  useEffect(() => {
    if (center) {
      map.flyTo(center, map.getZoom())
    }
  }, [center, map])

  return null
}

export default MapCenter
