import { YMaps } from '@pbe/react-yandex-maps'
import { FC } from 'react'

import MapComponent from '@/components/MapComponent/MapComponent'
import SideBar from '@/components/SideBar/SideBar'
import SlidePannel from '@/components/SlidePannel/SlidePannel'

const MainPage: FC = () => {
  return (
    <YMaps query={{ apikey: import.meta.env.VITE_YMAP_API_KEY, lang: 'ru_RU' }}>
      <div style={{ display: 'flex', width: '100%' }}>
        <SideBar />
        <SlidePannel />
        <MapComponent />
      </div>
    </YMaps>
  )
}

export default MainPage
