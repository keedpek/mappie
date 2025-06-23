import { FC } from 'react'

import { placemark } from '@/constants/icons'
import { YMapMarker } from '@/lib/ymaps'
import AddressObj from '@/types/AddressObj'

import style from './Marker.module.css'

interface AddresMarkerProps {
  place: AddressObj
}

const AddresMarker: FC<AddresMarkerProps> = ({ place }) => {
  return (
    <YMapMarker coordinates={place.coordinates}>
      <div className={style.markerContainer}>
        <div className={`${style.text}`}>{place.title}</div>
        <div>
          <img
            className={style.categoryImg}
            src={placemark.replace('white', 'tomato')}
            alt="placemark"
          />
        </div>
      </div>
    </YMapMarker>
  )
}

export default AddresMarker
