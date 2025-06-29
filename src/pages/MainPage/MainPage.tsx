import { FC } from 'react'

import MapComponent from '@/components/MapComponent/MapComponent'
import SideBar from '@/components/SideBar/SideBar'
import SlidePannel from '@/components/SlidePannel/SlidePannel'

const MainPage: FC = () => {
  return (
    <main>
      <SideBar />
      <SlidePannel />
      <MapComponent />
    </main>
  )
}

export default MainPage
