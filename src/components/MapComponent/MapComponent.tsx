import { Map } from '@pbe/react-yandex-maps'
import { FC, useState } from 'react'

import Loader from '@/UI/Loader/Loader'

import style from './MapComponent.module.css'

const MapComponent: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const handleOnLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className={`${style.container}`}>
      <Map
        height={'100vh'}
        defaultState={{ center: [55.48, 28.79], zoom: 15 }}
        onLoad={handleOnLoad}
      />
      {isLoading && <Loader size="l" />}
    </div>
  )
}

export default MapComponent
