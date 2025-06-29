import L, { LatLngExpression } from 'leaflet'
import { FC, useEffect, useRef, useState } from 'react'
import { useMap } from 'react-leaflet'

import { getOSRMRoute } from '@/api/search'
import { ROUTELINE_STYLE } from '@/constants/LeafletStyles/routeLineStyle'
import { setRoutePlace } from '@/store/slices/mapSlice'
import Loader from '@/UI/Loader/Loader'
import { useAppDispatch } from '@/utils/hooks/reduxHooks'
import { useToast } from '@/utils/hooks/useToast'

import RouteModal from './RouteModal/RouteModal'

interface PlaceRouteProps {
  from: LatLngExpression
  to: LatLngExpression
}

const PlaceRoute: FC<PlaceRouteProps> = ({ from, to }) => {
  const map = useMap()
  const routeRef = useRef<L.Polyline>(null)
  const dispatch = useAppDispatch()
  const { addToast } = useToast()
  const [duration, setDuration] = useState<number>(0)
  const [distance, setDistance] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const handleCloseModal = () => {
    map.removeLayer(routeRef.current)
    dispatch(setRoutePlace(null))
  }

  useEffect(() => {
    setIsLoading(true)
    setError(false)
    getOSRMRoute(from, to)
      .then(({ route, duration, distance }) => {
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
      })
      .catch(() => {
        addToast('Что-то пошло не так', 'error')
        setError(true)
      })
      .finally(() => setIsLoading(false))
  }, [addToast, from, map, to])

  if (isLoading) {
    return <Loader size="l" color="purple" />
  }

  return error ? null : (
    <RouteModal
      duration={duration}
      distance={distance}
      onClose={handleCloseModal}
    />
  )
}

export default PlaceRoute
