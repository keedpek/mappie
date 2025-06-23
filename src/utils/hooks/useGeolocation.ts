import { LngLat } from '@yandex/ymaps3-types'
import { useRef, useState } from 'react'

const useGeolocation = () => {
  const [coords, setCoords] = useState<LngLat | null>(null)
  const [trackedCoords, setTrackedCoords] = useState<LngLat | null>(null)
  const [error, setError] = useState<string | null>(null)
  const watchRef = useRef<number | null>(null)

  const getGeolocation = () => {
    if (!navigator.geolocation) {
      setError('Геолокация не поддерживается браузером')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (res) => {
        setCoords([res.coords.longitude, res.coords.latitude] as LngLat)
      },
      (err) => {
        setError(err.message)
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 5000,
      }
    )
    return coords
  }

  const watchGeolocation = () => {
    if (!navigator.geolocation) {
      setError('Геолокация не поддерживается браузером')
    }

    watchRef.current = navigator.geolocation.watchPosition(
      (res) => {
        setTrackedCoords([res.coords.longitude, res.coords.latitude])
      },
      (err) => {
        setError(err.message)
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 5000,
      }
    )
  }

  const clearWatch = () => {
    if (watchRef.current !== null) {
      navigator.geolocation.clearWatch(watchRef.current)
    }
  }

  return {
    coords,
    trackedCoords,
    error,
    clearWatch,
    getGeolocation,
    watchGeolocation,
  }
}

export default useGeolocation
