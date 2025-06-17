import { FC } from 'react'

import SearchBar from '@/components/SlidePannel/SearchBar/SearchBar'
import PlaceObj from '@/types/PlaceObj'
import useInput from '@/utils/hooks/useInput'

import style from './FavouritesList.module.css'
import FavPlaceCard from './FavPlaceCard/FavPlaceCard'

interface FavouritesListProps {
  places: PlaceObj[]
}

const FavouritesList: FC<FavouritesListProps> = ({ places }) => {
  const favouritesSearch = useInput('')

  return (
    <div className={style.tabContainer}>
      <SearchBar state={favouritesSearch} />
      <div className={style.favouritesContainer}>
        <h2>Избранное:</h2>
        <ul className={style.list}>
          {places.length ? (
            places.map((place) => (
              <li key={place.id}>
                <FavPlaceCard place={place} />
              </li>
            ))
          ) : (
            <p>У вас нет избранных мест</p>
          )}
        </ul>
      </div>
    </div>
  )
}

export default FavouritesList
