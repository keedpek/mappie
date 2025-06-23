import { LngLat, RouteFeature, RouteOptions } from '@yandex/ymaps3-types'
import { FC, useEffect, useState } from 'react'

import { YMapControl, YMapControls, YMapFeature } from '@/lib/ymaps'
import { buildRoute } from '@/utils/buildRoute'

import style from './Route.module.css'

interface RouteProps {
  from: LngLat
  to: LngLat
}

const Route: FC<RouteProps> = ({ from, to }) => {
  const [route, setRoute] = useState<RouteFeature>(null)
  const [routeType, setRouteType] = useState<RouteOptions['type']>('driving')
  const [routeDuration, setRouteDuration] = useState<number>(0)
  const [routeLength, setRouteLength] = useState<number>(0)

  useEffect(() => {
    buildRoute(from, to, routeType).then(handleNewRoute)
  }, [from, routeType, to])

  const handleTabClick = (type: RouteOptions['type']) => {
    return () => {
      setRouteType(type)
    }
  }

  const handleNewRoute = (newRoute: RouteFeature) => {
    if (!newRoute) {
      alert('Маршрут не найден')
      setRoute(null)
      return
    }

    setRoute(newRoute)
    setRouteDuration(newRoute.properties.duration)
    setRouteLength(newRoute.properties.length)
  }

  return (
    <>
      {route && <YMapFeature {...route} />}
      <YMapControls position="top right">
        <YMapControl>
          <div className={style.btnContainer}>
            <button className={style.btn} onClick={handleTabClick('driving')}>
              На машине
            </button>
            <button className={style.btn} onClick={handleTabClick('walking')}>
              Пешком
            </button>
          </div>
        </YMapControl>
      </YMapControls>
    </>
  )
}

export default Route
