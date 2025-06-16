import { FC } from 'react'
import style from './SelectedPlaceCard.module.css'
import PlaceObj from '@/types/PlaceObj'
import {
  bookmarkSaved,
  bookmarkOff,
  placemark,
  pannelLeftArrow,
} from '@/constants/icons'
import { icons } from '@/constants/filters'
import { useAppDispatch, useAppSelector } from '@/utils/hooks/reduxHooks'
import { setSelectedPlace } from '@/store/slices/navigationSlice'
import {
  addFavouritePlace,
  removeFromFavourites,
} from '@/store/slices/favouritesSlice'
import {
  addFavouritePlaceToStorage,
  removePlaceFromStorage,
} from '@/utils/localStorageHandler'

interface SelectedPlaceCardProps {
  placeInfo: PlaceObj
  isFavourite: boolean
}

const SelectedPlaceCard: FC<SelectedPlaceCardProps> = ({
  placeInfo,
  isFavourite,
}) => {
  const user = useAppSelector((store) => store.user.email)
  const dispatch = useAppDispatch()

  const handleSaveClick = () => {
    if (isFavourite) {
      removePlaceFromStorage(placeInfo, user)
      dispatch(removeFromFavourites(placeInfo))
    } else {
      addFavouritePlaceToStorage(placeInfo, user)
      dispatch(addFavouritePlace(placeInfo))
    }
  }

  const handleCloseBtnClick = () => {
    dispatch(setSelectedPlace(null))
  }

  return (
    <>
      <button className={style.closeBtn} onClick={handleCloseBtnClick}>
        <img src={pannelLeftArrow} />
        <span>Избранные</span>
      </button>
      <div className={style.container}>
        <div className={style.imgContainer}>
          <img className={style.img} src={placeInfo.img} />
        </div>
        <div className={style.typeIcons}>
          {/* TODO: динамические типы реального места */}
          <img src={icons.architecture} />
          <img src={icons.history} />
        </div>
        <h2 className={style.title}>{placeInfo.title}</h2>
        <div className={style.description}>
          <p>{placeInfo.description}</p>
        </div>
        <div className={style.btnContainer}>
          <button
            className={`${style.btn} ${isFavourite ? style.saved : style.unsaved}`}
            onClick={handleSaveClick}
          >
            <img src={isFavourite ? bookmarkSaved : bookmarkOff} />
            <span>{isFavourite ? 'Сохранено' : 'Сохранить'}</span>
          </button>
          <button className={`${style.btn} ${style.path}`}>
            <img src={placemark} />
            <span>Маршрут</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default SelectedPlaceCard
