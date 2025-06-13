import { FC } from 'react'
import style from './FavouritesList.module.css'
import PlaceObj from '@/types/PlaceObj'
import useInput from '@/utils/hooks/useInput'
import SearchBar from '@/components/SearchBar/SearchBar'
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
          {places.map((place) => (
            <li key={place.title}>
              <FavPlaceCard place={place} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FavouritesList
