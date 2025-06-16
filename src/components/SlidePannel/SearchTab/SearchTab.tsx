import { FC, useRef, useState } from 'react'
import style from './SearchTab.module.css'
import SearchBar from '@/components/SlidePannel/SearchBar/SearchBar'
import useInput from '@/utils/hooks/useInput'
import { filters, Filter } from '@/constants/filters'
import magGlass from '@/assets/searchbtnOff.svg'

const SearchTab: FC = () => {
  const searchedPlace = useInput('')
  const searchRadius = useInput('')
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})

  const handleClick = (filter: Filter) => {
    const input = inputRefs.current[filter.id]
    if (!input) return

    input.checked = !input.checked
    const newSelected = input.checked
      ? [...selectedFilters, filter.id]
      : selectedFilters.filter((f) => f !== filter.id)

    setSelectedFilters(newSelected)
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
          {filters.map((filter, index) => {
            const isSelected = selectedFilters.includes(filter.id)
            return (
              <li
                key={index}
                className={`${style.filter} ${isSelected && style.selected}`}
                onClick={() => {
                  handleClick(filter)
                }}
              >
                <input
                  className={style.checkbox}
                  type="checkbox"
                  id={filter.title}
                  ref={(el) => {
                    inputRefs.current[filter.id] = el
                  }}
                  checked={isSelected}
                  onChange={() => handleClick(filter)}
                />
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
            {...searchRadius}
            type="number"
          />
          <span>км</span>
        </div>
      </div>
      <button className={style.searchBtn} onClick={handleSearch}>
        <img src={magGlass} />
      </button>
    </div>
  )
}

export default SearchTab
