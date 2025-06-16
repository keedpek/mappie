import { FC, useState } from 'react'
import style from './MapComponent.module.css'
import { Map } from '@pbe/react-yandex-maps'
import Loader from '@/UI/Loader/Loader'

const MapComponent: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  return (
    <div className={`${style.container}`}>
      <Map
        height={'100vh'}
        defaultState={{ center: [55.48, 28.79], zoom: 15 }}
        onLoad={() => setIsLoading(false)}
      />
      {isLoading && <Loader size="l" />}
    </div>
  )
}

export default MapComponent
