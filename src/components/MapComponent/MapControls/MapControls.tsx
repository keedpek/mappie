import { FC, useState } from 'react'
import { createPortal } from 'react-dom'
import { useMap } from 'react-leaflet'

import { locationBtn } from '@/constants/icons'
import Loader from '@/UI/Loader/Loader'
import { getCurrentUserPosition } from '@/utils/getCurrentUserPosition'

import style from './MapControls.module.css'

const MapControls: FC = () => {
  const map = useMap()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleLocationClik = async () => {
    setIsLoading(true)
    const center = await getCurrentUserPosition()
    if (center) {
      map.flyTo(center, map.getZoom())
    }
    setIsLoading(false)
  }
  const handleZoomInClik = () => map.zoomIn()
  const handleZoomOutClik = () => map.zoomOut()

  return createPortal(
    <div className={style.controlsContainer}>
      <div className={style.btnGroup}>
        <button onClick={handleLocationClik}>
          {isLoading ? (
            <Loader size="s" color="purple" />
          ) : (
            <img src={locationBtn} alt="geolocation btn" />
          )}
        </button>
      </div>
      <div className={style.btnGroup}>
        <button onClick={handleZoomInClik}>+</button>
        <button onClick={handleZoomOutClik}>-</button>
      </div>
    </div>,
    document.body
  )
}

export default MapControls
