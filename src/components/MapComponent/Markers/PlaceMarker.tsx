import { FC } from 'react'
import { Marker } from 'react-leaflet'

import {
  setActiveTab,
  setPannelState,
  setSelectedPlace,
} from '@/store/slices/navigationSlice'
import { IPlaceObj } from '@/types/IPlaceObj'
import { createLeafletCategoryIcon } from '@/utils/findCategoryImg'
import { useAppDispatch } from '@/utils/hooks/reduxHooks'

interface PlaceMarkerProps {
  place: IPlaceObj
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
