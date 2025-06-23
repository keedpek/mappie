import { FC } from 'react'

import { YMapMarker } from '@/lib/ymaps'
import {
  setActiveTab,
  setPannelState,
  setSelectedPlace,
} from '@/store/slices/navigationSlice'
import PlaceObj from '@/types/PlaceObj'
import { findCategoryImg } from '@/utils/findCategoryImg'
import { useAppDispatch } from '@/utils/hooks/reduxHooks'

import style from './Marker.module.css'

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
    <YMapMarker coordinates={place.coordinates}>
      <div className={style.markerContainer} onClick={handleClick}>
        <div className={`${style.text}`}>{place.title}</div>
        <div>
          <img
            className={style.categoryImg}
            src={findCategoryImg(place)}
            alt="category"
          />
        </div>
      </div>
    </YMapMarker>
  )
}

export default PlaceMarker
