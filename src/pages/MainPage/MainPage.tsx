import { FC, useEffect } from 'react'

import MapComponent from '@/components/MapComponent/MapComponent'
import SideBar from '@/components/SideBar/SideBar'
import SlidePannel from '@/components/SlidePannel/SlidePannel'
import { setMapCenter, setSearchCenter } from '@/store/slices/mapSlice'
import { getCurrentUserPosition } from '@/utils/getCurrentUserPosition'
import { useAppDispatch } from '@/utils/hooks/reduxHooks'
import { useToast } from '@/utils/hooks/useToast'

const MainPage: FC = () => {
  const dispatch = useAppDispatch()
  const { addToast } = useToast()
  useEffect(() => {
    getCurrentUserPosition()
      .then((res) => {
        dispatch(setMapCenter(res))
        dispatch(setSearchCenter(res))
      })
      .catch((err) => addToast(err, 'error'))
  })

  return (
    <main>
      <SideBar />
      <SlidePannel />
      <MapComponent />
    </main>
  )
}

export default MainPage
