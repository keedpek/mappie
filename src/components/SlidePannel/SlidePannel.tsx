import { FC } from 'react'
import style from './SlidePannel.module.css'
import { useAppDispatch, useAppSelector } from '@/utils/hooks/reduxHooks'
import SearchTab from './content/SearchTab/SearchTab'
import FavouritesTab from './content/FavouritesTab/FavouritesTab'
import { setActiveTab, setPannelState } from '@/store/slices/navigationSlice'
import arrow from '@/assets/pannelLeftArrow.svg'

const SlidePannel: FC = () => {
  const activeBar = useAppSelector((store) => store.navigation.activeTab)
  const isPannelOpen = useAppSelector((store) => store.navigation.isPannelOpen)
  const dispatch = useAppDispatch()

  return (
    <div
      className={`${style.container} ${isPannelOpen ? style.open : style.close}`}
    >
      {activeBar === 'search' && <SearchTab />}
      {activeBar === 'favourites' && <FavouritesTab />}
      <button
        onClick={() => {
          dispatch(setPannelState(false))
          dispatch(setActiveTab(''))
        }}
        className={style.closeBtn}
      >
        <img src={arrow} />
      </button>
    </div>
  )
}

export default SlidePannel
