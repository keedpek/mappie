import { FC, useState } from 'react'
import style from './SelectedPlaceCard.module.css'
import PlaceObj from '@/types/PlaceObj'
import savedBookmark from '@/assets/bookmarkSaved.svg'
import bookmark from '@/assets/bookmarkOff.svg'
import placemark from '@/assets/placemark.svg'
import arrow from '@/assets/pannelLeftArrow.svg'
//TODO: добавить типы в объект места
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
import UnauthorizedPopup from '@/components/UnauthorizedPopup/UnauthorizedPopup'

interface SelectedPlaceCardProps {
  placeInfo: PlaceObj
}

const SelectedPlaceCard: FC<SelectedPlaceCardProps> = ({ placeInfo }) => {
  const favPlaces = useAppSelector((store) => store.favourites.favouritePlaces)
  const isFavourite = favPlaces.includes(placeInfo)
  const user = useAppSelector((store) => store.user.email)
  const dispatch = useAppDispatch()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleSaveClick = () => {
    if (isFavourite) {
      removePlaceFromStorage(placeInfo, user)
      dispatch(removeFromFavourites(placeInfo))
    } else if (user) {
      addFavouritePlaceToStorage(placeInfo, user)
      dispatch(addFavouritePlace(placeInfo))
    }
  }

  return (
    <>
      <button
        className={style.closeBtn}
        onClick={() => dispatch(setSelectedPlace(null))}
      >
        <img src={arrow} />
        <span>Избранные</span>
      </button>
      <div className={style.container}>
        <div className={style.imgContainer}>
          <img className={style.img} src={placeInfo.img} />
        </div>
        <div className={style.typeIcons}>
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
            onClick={
              user
                ? handleSaveClick
                : () => {
                    setIsModalOpen(true)
                  }
            }
          >
            <img src={isFavourite ? savedBookmark : bookmark} />
            <span>{isFavourite ? 'Сохранено' : 'Сохранить'}</span>
          </button>
          <button className={`${style.btn} ${style.path}`}>
            <img src={placemark} />
            <span>Маршрут</span>
          </button>
        </div>
      </div>
      {isModalOpen && (
        <UnauthorizedPopup
          onClose={() => {
            setIsModalOpen(false)
          }}
        />
      )}
    </>
  )
}

export default SelectedPlaceCard
