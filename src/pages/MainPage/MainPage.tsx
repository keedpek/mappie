import SideBar from '@/components/SideBar/SideBar'
import { FC } from 'react'

const MainPage: FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div>slidebar</div>
      <div>mapplaceholder</div>
    </div>
  )
}

export default MainPage
