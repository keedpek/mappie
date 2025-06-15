import { FC } from 'react'
import style from './FavPlaceCard.module.css'
import bookmark from '@/assets/bookmarkOn.svg'
import arrow from '@/assets/pannelLeftArrow.svg'
import { descriptionClipping } from '@/utils/descriptionClipping'
import PlaceObj from '@/types/PlaceObj'
import { useAppDispatch, useAppSelector } from '@/utils/hooks/reduxHooks'
import { setSelectedPlace } from '@/store/slices/navigationSlice'
import { removeFromFavourites } from '@/store/slices/favouritesSlice'
import { removePlaceFromStorage } from '@/utils/localStorageHandler'

interface FavPlaceCardProps {
  place: PlaceObj
}

const FavPlaceCard: FC<FavPlaceCardProps> = ({ place }) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((store) => store.user.email)

  return (
    <div className={style.container}>
      <div className={style.heading}>
        <div className={style.imgContainer}>
          <img className={style.img} src={place.img} />
        </div>
        <h2 className={style.title}>{place.title}</h2>
      </div>
      <div className={style.description}>
        <p>{descriptionClipping(place.description, 150)}</p>
      </div>
      <div className={style.btnContainer}>
        <button
          className={`${style.btn}`}
          onClick={() => {
            removePlaceFromStorage(place, user)
            dispatch(removeFromFavourites(place))
          }}
        >
          <img src={bookmark} />
        </button>
        <button
          className={`${style.btn} ${style.rotate}`}
          onClick={() => {
            dispatch(setSelectedPlace(place))
          }}
        >
          <img src={arrow} />
        </button>
      </div>
    </div>
  )
}

export default FavPlaceCard
