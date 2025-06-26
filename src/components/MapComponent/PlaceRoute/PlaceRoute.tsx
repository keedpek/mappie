import L, { LatLngExpression } from 'leaflet'
import { FC, useEffect, useRef, useState } from 'react'
import { useMap } from 'react-leaflet'

import { getOSRMRoute } from '@/api/search'
import { setRoutePlace } from '@/store/slices/mapSlice'
import { useAppDispatch } from '@/utils/hooks/reduxHooks'

import RouteModal from './RouteModal/RouteModal'

interface PlaceRouteProps {
  from: LatLngExpression
  to: LatLngExpression
}

const PlaceRoute: FC<PlaceRouteProps> = ({ from, to }) => {
  const map = useMap()
  const routeRef = useRef<L.Polyline>(null)
  const dispatch = useAppDispatch()
  const [duration, setDuration] = useState(0)
  const [distance, setDistance] = useState(0)

  const handleCloseModal = () => {
    map.removeLayer(routeRef.current)
    dispatch(setRoutePlace(null))
  }

  useEffect(() => {
    getOSRMRoute(from, to).then(({ route, duration, distance }) => {
      if (routeRef.current) {
        map.removeLayer(routeRef.current)
        routeRef.current = null
      }
      const latLngArr = route.map(([lng, lat]) => [lat, lng])

      const routeLine = L.polyline(latLngArr, {
        color: '#5E7BC7',
        weight: 5,
      })

      routeRef.current = routeLine
      setDuration(duration)
      setDistance(distance)

      routeLine.addTo(map)
      map.fitBounds(routeLine.getBounds(), { padding: [50, 50] })
    })
  }, [from, map, to])

  return (
    <RouteModal
      duration={duration}
      distance={distance}
      onClose={handleCloseModal}
    />
  )
}

export default PlaceRoute
