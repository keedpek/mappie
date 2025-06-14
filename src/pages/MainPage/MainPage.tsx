import MapComponent from '@/components/layout/MapComponent/MapComponent'
import SideBar from '@/components/layout/SideBar/SideBar'
import SlidePannel from '@/components/layout/SlidePannel/SlidePannel'
import { FC } from 'react'

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
