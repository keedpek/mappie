import { FC } from 'react'

import imgPlaceholder from '@/assets/placePhotoPlaceholder.webp'
import { bookmarkOn, pannelLeftArrow } from '@/constants/icons'
import { removeFromFavourites } from '@/store/slices/favouritesSlice'
import { setSelectedPlace } from '@/store/slices/navigationSlice'
import PlaceObj from '@/types/PlaceObj'
import { descriptionClipping } from '@/utils/descriptionClipping'
import { useAppDispatch, useAppSelector } from '@/utils/hooks/reduxHooks'
import { removePlaceFromStorage } from '@/utils/localStorageHandler'

import style from './FavPlaceCard.module.css'

interface FavPlaceCardProps {
  place: PlaceObj
}

const FavPlaceCard: FC<FavPlaceCardProps> = ({ place }) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((store) => store.user.email)

  const handleRemoveClick = () => {
    removePlaceFromStorage(place, user)
    dispatch(removeFromFavourites(place))
  }

  const handlePlaceSelect = () => {
    dispatch(setSelectedPlace(place))
  }

  return (
    <div className={style.container}>
      <div className={style.heading}>
        <div className={style.imgContainer}>
          <img
            className={style.img}
            src={place.img || imgPlaceholder}
            alt="place img"
          />
        </div>
        <h2 className={style.title}>{place.title}</h2>
      </div>
      <div className={style.description}>
        <p>{descriptionClipping(place.description, 150)}</p>
      </div>
      <div className={style.btnContainer}>
        <button className={`${style.btn}`} onClick={handleRemoveClick}>
          <img src={bookmarkOn} alt="delete" />
        </button>
        <button
          className={`${style.btn} ${style.rotate}`}
          onClick={handlePlaceSelect}
        >
          <img src={pannelLeftArrow} alt="open" />
        </button>
      </div>
    </div>
  )
}

export default FavPlaceCard
