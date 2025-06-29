import 'leaflet/dist/leaflet.css'

import { LatLngExpression } from 'leaflet'
import { FC, useEffect, useState } from 'react'
import { Circle, MapContainer, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'

import { CIRCLE_STYLE } from '@/constants/LeafletStyles/radiusCircleStyle'
import { setSearchCenter } from '@/store/slices/mapSlice'
import { getCurrentUserPosition } from '@/utils/getCurrentUserPosition'
import { useAppDispatch, useAppSelector } from '@/utils/hooks/reduxHooks'
import { useToast } from '@/utils/hooks/useToast'

import MapCenter from './MapCenter/MapCenter'
import MapControls from './MapControls/MapControls'
import AddresMarker from './Markers/AddresMarker'
import PlaceMarker from './Markers/PlaceMarker'
import UserMarker from './Markers/UserMarker'
import PlaceRoute from './PlaceRoute/PlaceRoute'

const MapComponent: FC = () => {
  const {
    searchedPlaces,
    searchedAddresses,
    searchCenter,
    searchRadius,
    routePlace,
  } = useAppSelector((store) => store.map)
  const dispatch = useAppDispatch()
  const { addToast } = useToast()
  const [userCoords, setUserCoords] = useState<LatLngExpression>(null)

  useEffect(() => {
    getCurrentUserPosition()
      .then((res) => {
        setUserCoords(res)
        dispatch(setSearchCenter(res))
      })
      .catch((err) => addToast(err, 'error'))
  })

  return (
    <MapContainer center={searchCenter} zoom={16} zoomControl={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapCenter center={userCoords} />
      <MapControls />

      {userCoords && <UserMarker coords={userCoords} />}

      <MarkerClusterGroup>
        {searchedPlaces &&
          searchedPlaces.map((place) => (
            <PlaceMarker key={place.id} place={place} />
          ))}
      </MarkerClusterGroup>

      <MarkerClusterGroup>
        {searchedAddresses &&
          searchedAddresses.map((place) => (
            <AddresMarker key={place.id} place={place} />
          ))}
      </MarkerClusterGroup>

      {searchRadius && (
        <Circle
          center={searchCenter}
          radius={searchRadius}
          pathOptions={CIRCLE_STYLE}
        />
      )}

      {routePlace && <PlaceRoute from={userCoords} to={routePlace} />}
    </MapContainer>
  )
}

export default MapComponent
