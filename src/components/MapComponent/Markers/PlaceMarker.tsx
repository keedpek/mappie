import { FC } from 'react'
import { Marker } from 'react-leaflet'

import {
  setActiveTab,
  setPannelState,
  setSelectedPlace,
} from '@/store/slices/navigationSlice'
import PlaceObj from '@/types/PlaceObj'
import { createLeafletCategoryIcon } from '@/utils/findCategoryImg'
import { useAppDispatch } from '@/utils/hooks/reduxHooks'

interface PlaceMarkerProps {
  place: PlaceObj
}

const PlaceMarker: FC<PlaceMarkerProps> = ({ place }) => {
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(setSelectedPlace(place))
    dispatch(setPannelState(true))
    dispatch(setActiveTab('favourites'))
  }
  return (
    <Marker
      position={place.coordinates}
      icon={createLeafletCategoryIcon(place.category)}
      eventHandlers={{
        click: handleClick,
      }}
    ></Marker>
  )
}

export default PlaceMarker
