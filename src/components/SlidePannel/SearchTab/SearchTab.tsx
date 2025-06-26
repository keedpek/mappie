import { FC, useState } from 'react'

import { searchByAddres, searchPlaces } from '@/api/search'
import SearchBar from '@/components/SlidePannel/SearchBar/SearchBar'
import { filters } from '@/constants/filters'
import { searchbtnOff } from '@/constants/icons'
import {
  setSearchedAddresses,
  setSearchedPlaces,
  setSearchRadius,
} from '@/store/slices/mapSlice'
import Filter from '@/types/Filter'
import Loader from '@/UI/Loader/Loader'
import { useAppDispatch, useAppSelector } from '@/utils/hooks/reduxHooks'
import useInput from '@/utils/hooks/useInput'
import { useToast } from '@/utils/hooks/useToast'

import style from './SearchTab.module.css'

const SearchTab: FC = () => {
  const searchedPlace = useInput('')
  const searchRadius = useInput('')
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const center = useAppSelector((store) => store.map.searchCenter)
  const dispatch = useAppDispatch()
  const { addToast } = useToast()

  const handleFilterClick = (filter: Filter) => () => {
    setSelectedFilters((prev) => {
      if (prev[filter.id]) {
        const newState = { ...prev }
        delete newState[filter.id]
        return newState
      }
      return { ...prev, [filter.id]: filter.overpassCategories }
    })
  }

  const handleSearch = async () => {
    setIsLoading(true)
    try {
      if (searchedPlace.value) {
        const response = await searchByAddres(
          searchedPlace.value,
          center,
          Number(searchRadius.value)
        )
        if (response.length === 0) {
          addToast('Места не найдены', 'error')
        }
        dispatch(setSearchedAddresses(response))
        dispatch(setSearchedPlaces(null))
      } else {
        const filtersArray: string[] = []
        for (const id in selectedFilters) {
          filtersArray.push(...selectedFilters[id])
        }
        const response = await searchPlaces(
          searchedPlace.value,
          filtersArray,
          Number(searchRadius.value),
          center
        )
        if (response.length === 0) {
          addToast('Места не найдены', 'error')
        }
        dispatch(setSearchedPlaces(response.slice(0, 200)))
        dispatch(setSearchedAddresses(null))
      }
      dispatch(setSearchRadius(Number(searchRadius.value)))
    } catch (error) {
      addToast(error.message, 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={style.tabContainer}>
      <SearchBar state={searchedPlace} />
      <div className={style.filters}>
        <h2>Искать:</h2>
        <ul className={style.filterContainer}>
          {filters.map((filter) => {
            const isSelected = filter.id in selectedFilters
            return (
              <li
                key={filter.id}
                className={`${style.filter} ${isSelected && style.selected}`}
                onClick={handleFilterClick(filter)}
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
          <span>м</span>
        </div>
      </div>
      <button
        className={style.searchBtn}
        onClick={handleSearch}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader size="s" color="white" />
        ) : (
          <img src={searchbtnOff} alt="search button" />
        )}
      </button>
    </div>
  )
}

export default SearchTab
