import L, { LatLngExpression } from 'leaflet'
import { FC, useEffect, useRef, useState } from 'react'
import { useMap } from 'react-leaflet'

import { getOSRMRoute } from '@/api/search'
import { ROUTELINE_STYLE } from '@/constants/LeafletStyles/routeLineStyle'
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
  const [duration, setDuration] = useState<number>(0)
  const [distance, setDistance] = useState<number>(0)

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
      const latLngArr = route.map((coords) => {
        if (Array.isArray(coords)) {
          const [lng, lat] = coords
          return [lat, lng] as LatLngExpression
        } else if ('lat' in coords && 'lng' in coords) {
          return [coords.lat, coords.lng] as LatLngExpression
        }
      })

      const routeLine = L.polyline(latLngArr, ROUTELINE_STYLE)

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
