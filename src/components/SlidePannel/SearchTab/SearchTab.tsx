import { FC, useState } from 'react'
import style from './SearchTab.module.css'
import SearchBar from '@/components/SlidePannel/SearchBar/SearchBar'
import useInput from '@/utils/hooks/useInput'
import Filter from '@/types/Filter'
import { filters } from '@/constants/filters'
import { searchbtnOff } from '@/constants/icons'

const SearchTab: FC = () => {
  const searchedPlace = useInput('')
  const searchRadius = useInput('')
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const handleClick = (filter: Filter) => () => {
    setSelectedFilters((prev) =>
      prev.includes(filter.id)
        ? prev.filter((f) => f !== filter.id)
        : [...prev, filter.id]
    )
  }

  const handleSearch = () => {
    //TODO: сделать
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
                <img className={style.icon} src={filter.icon} />
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
        <img src={searchbtnOff} />
      </button>
    </div>
  )
}

export default SearchTab
