import { LngLat, RouteFeature, RouteOptions } from '@yandex/ymaps3-types'

export const buildRoute = async (
  start: LngLat,
  end: LngLat,
  type: RouteOptions['type']
): Promise<RouteFeature> => {
  const routes = await ymaps3.route({
    points: [start, end],
    type: type,
  })

  if (!routes[0]) return

  const route = routes[0].toRoute()

  if (route.geometry.coordinates.length == 0) return

  return route
}
