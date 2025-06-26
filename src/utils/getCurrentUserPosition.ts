import { LatLngExpression } from 'leaflet'

export const getCurrentUserPosition = () => {
  return new Promise<LatLngExpression>((res, rej) => {
    if (!navigator.geolocation) {
      rej('Геолокация не поддерживается браузером')
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        res([coords.latitude, coords.longitude] as LatLngExpression)
      },
      (err) => {
        rej(err.message)
      }
    )
  })
}
