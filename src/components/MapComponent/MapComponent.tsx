import { FC, useEffect } from 'react'
import { YMapLocationRequest } from 'ymaps3'

import { DEFAULT_LOCATION } from '@/constants/map'
import {
  reactify,
  YMap,
  YMapDefaultFeaturesLayer,
  YMapDefaultSchemeLayer,
} from '@/lib/ymaps'
import { setSearchCenter } from '@/store/slices/mapSlice'
import Loader from '@/UI/Loader/Loader'
import { useAppDispatch, useAppSelector } from '@/utils/hooks/reduxHooks'
import useGeolocation from '@/utils/hooks/useGeolocation'

import style from './MapComponent.module.css'
import AddresMarker from './PlaceMarker/AddresMarker'
import PlaceMarker from './PlaceMarker/PlaceMarker'
import Route from './Route/Route'
import SearchCircle from './SearchCircle/SearchCircle'
import UserMarker from './UserMarker/UserMarker'

const MapComponent: FC = () => {
  const {
    coords,
    trackedCoords,
    error,
    getGeolocation,
    watchGeolocation,
    clearWatch,
  } = useGeolocation()

  const {
    searchedPlaces,
    searchedAddresses,
    searchCenter,
    searchRadius,
    routePlace,
  } = useAppSelector((store) => store.map)
  const dispatch = useAppDispatch()

  const location: YMapLocationRequest = {
    center: trackedCoords ? trackedCoords : DEFAULT_LOCATION,
    zoom: 15,
  }

  useEffect(() => {
    getGeolocation()
    watchGeolocation()
    if (coords && JSON.stringify(searchCenter) !== JSON.stringify(coords)) {
      dispatch(setSearchCenter(coords))
    }
    return clearWatch
  }, [
    clearWatch,
    coords,
    dispatch,
    getGeolocation,
    searchCenter,
    watchGeolocation,
  ])

  if (!coords || !trackedCoords) {
    return <Loader size="l" />
  }

  return (
    <div className={`${style.container}`}>
      <YMap location={reactify.useDefault(location)}>
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />

        {!error && trackedCoords && (
          <UserMarker coords={trackedCoords || DEFAULT_LOCATION} />
        )}
        <SearchCircle radius={searchRadius} center={searchCenter} />
        {searchedPlaces &&
          searchedPlaces.map((place) => (
            <PlaceMarker key={place.id} place={place} />
          ))}
        {searchedAddresses &&
          searchedAddresses.map((address) => (
            <AddresMarker key={address.id} place={address} />
          ))}
        {routePlace && (
          <Route from={[27.4894325, 53.9137759]} to={routePlace} />
        )}
      </YMap>
    </div>
  )
}

export default MapComponent
