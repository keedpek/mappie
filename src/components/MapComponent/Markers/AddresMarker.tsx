import { FC } from 'react'
import { Marker, Popup } from 'react-leaflet'

import { addressMarkerIcon } from '@/constants/markerIcons'
import AddressObj from '@/types/AddressObj'

interface AddresMarkerProps {
  place: AddressObj
}

const AddresMarker: FC<AddresMarkerProps> = ({ place }) => {
  return (
    <Marker position={place.coordinates} icon={addressMarkerIcon}>
      <Popup>{place.address}</Popup>
    </Marker>
  )
}

export default AddresMarker
