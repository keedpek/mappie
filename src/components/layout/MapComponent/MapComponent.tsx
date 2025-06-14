import { FC } from 'react'
import style from './MapComponent.module.css'
import { useAppSelector } from '@/utils/hooks/reduxHooks'

const MapComponent: FC = () => {
  const isPannelOpen = useAppSelector((store) => store.navigation.isPannelOpen)

  return (
    <div className={`${style.container} ${!isPannelOpen && style.wide}`}>
      map
    </div>
  )
}

export default MapComponent
