import { FC } from 'react'

import MapComponent from '@/components/MapComponent/MapComponent'
import SideBar from '@/components/SideBar/SideBar'
import SlidePannel from '@/components/SlidePannel/SlidePannel'

const MainPage: FC = () => {
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <SideBar />
      <SlidePannel />
      <MapComponent />
    </div>
  )
}

export default MainPage
