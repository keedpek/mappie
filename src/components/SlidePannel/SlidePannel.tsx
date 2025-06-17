import { FC } from 'react'

import { pannelLeftArrow } from '@/constants/icons'
import { setActiveTab, setPannelState } from '@/store/slices/navigationSlice'
import { useAppDispatch, useAppSelector } from '@/utils/hooks/reduxHooks'

import FavouritesTab from './FavouritesTab/FavouritesTab'
import SearchTab from './SearchTab/SearchTab'
import style from './SlidePannel.module.css'

const SlidePannel: FC = () => {
  const activeBar = useAppSelector((store) => store.navigation.activeTab)
  const isPannelOpen = useAppSelector((store) => store.navigation.isPannelOpen)
  const dispatch = useAppDispatch()

  const handleCloseBtnClick = () => {
    dispatch(setPannelState(false))
    dispatch(setActiveTab(''))
  }

  return (
    <div className={`${style.container} ${!isPannelOpen && style.close}`}>
      {activeBar === 'search' && <SearchTab />}
      {activeBar === 'favourites' && <FavouritesTab />}
      <button onClick={handleCloseBtnClick} className={style.closeBtn}>
        <img src={pannelLeftArrow} alt="close" />
      </button>
    </div>
  )
}

export default SlidePannel
