import { FC, useState } from 'react'

import SearchBar from '@/components/SlidePannel/SearchBar/SearchBar'
import { filters } from '@/constants/filters'
import { searchbtnOff } from '@/constants/icons'
import Filter from '@/types/Filter'
import useInput from '@/utils/hooks/useInput'
import useYMaps from '@/utils/hooks/useYMaps'

import style from './SearchTab.module.css'

const SearchTab: FC = () => {
  const searchedPlace = useInput('')
  const searchRadius = useInput('')
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const { searchPlaces } = useYMaps()

  const handleClick = (filter: Filter) => () => {
    setSelectedFilters((prev) =>
      prev.includes(filter.id)
        ? prev.filter((f) => f !== filter.id)
        : [...prev, filter.id]
    )
  }

  const handleSearch = () => {
    searchPlaces(
      searchedPlace.value,
      selectedFilters,
      Number(searchRadius.value)
    )
  }

  return (
    <div className={style.tabContainer}>
      <SearchBar state={searchedPlace} />
      <div className={style.filters}>
        <h2>Искать:</h2>
        <ul className={style.filterContainer}>
          {filters.map((filter) => {
            const isSelected = selectedFilters.includes(filter.id)
            return (
              <li
                key={filter.id}
                className={`${style.filter} ${isSelected && style.selected}`}
                onClick={handleClick(filter)}
              >
                <img
                  className={style.icon}
                  src={filter.icon}
                  alt="search input"
                />
                <h3>{filter.title}</h3>
              </li>
            )
          })}
        </ul>
      </div>
      <div className={style.radiusFilter}>
        <h2>В радиусе</h2>
        <div className={style.radiusContainer}>
          <input
            className={style.radiusInput}
            type="number"
            {...searchRadius}
          />
          <span>км</span>
        </div>
      </div>
      <button className={style.searchBtn} onClick={handleSearch}>
        <img src={searchbtnOff} alt="search button" />
      </button>
    </div>
  )
}

export default SearchTab
