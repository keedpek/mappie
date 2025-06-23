import { FC } from 'react'

import imgPlaceholder from '@/assets/placePhotoPlaceholder.webp'
import {
  bookmarkOff,
  bookmarkSaved,
  pannelLeftArrow,
  placemark,
} from '@/constants/icons'
import {
  addFavouritePlace,
  removeFromFavourites,
} from '@/store/slices/favouritesSlice'
import { setRoutePlace } from '@/store/slices/mapSlice'
import { setSelectedPlace } from '@/store/slices/navigationSlice'
import PlaceObj from '@/types/PlaceObj'
import { findCategoryImg } from '@/utils/findCategoryImg'
import { useAppDispatch, useAppSelector } from '@/utils/hooks/reduxHooks'
import { useToast } from '@/utils/hooks/useToast'
import {
  addFavouritePlaceToStorage,
  removePlaceFromStorage,
} from '@/utils/localStorageHandler'

import style from './SelectedPlaceCard.module.css'

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
  const { addToast } = useToast()

  const handleSaveClick = () => {
    if (isFavourite) {
      removePlaceFromStorage(placeInfo, user)
      dispatch(removeFromFavourites(placeInfo))
      addToast('Место убрано из избранных', 'success')
    } else {
      addFavouritePlaceToStorage(placeInfo, user)
      dispatch(addFavouritePlace(placeInfo))
      addToast('Место добавлено в избранные', 'success')
    }
  }

  const handleRouteClick = () => {
    dispatch(setRoutePlace(placeInfo.coordinates))
  }

  const handleCloseBtnClick = () => {
    dispatch(setSelectedPlace(null))
  }

  return (
    <>
      <button className={style.closeBtn} onClick={handleCloseBtnClick}>
        <img src={pannelLeftArrow} alt="back" />
        <span>Избранные</span>
      </button>
      <div className={style.container}>
        <div className={style.imgContainer}>
          <img
            className={style.img}
            src={placeInfo.img || imgPlaceholder}
            alt="place img"
          />
        </div>
        <div className={style.typeIcons}>
          <img src={findCategoryImg(placeInfo)} alt="type" />
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
            <img
              src={isFavourite ? bookmarkSaved : bookmarkOff}
              alt={isFavourite ? 'delete' : 'save'}
            />
            <span>{isFavourite ? 'Сохранено' : 'Сохранить'}</span>
          </button>
          <button
            className={`${style.btn} ${style.path}`}
            onClick={handleRouteClick}
          >
            <img src={placemark} alt="navigate" />
            <span>Маршрут</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default SelectedPlaceCard
