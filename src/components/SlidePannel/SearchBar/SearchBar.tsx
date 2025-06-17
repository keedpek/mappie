import { FC } from 'react'

import { searchIcon } from '@/constants/icons'

import style from './SearchBar.module.css'

interface SearchBarProps {
  state: {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  }
}

const SearchBar: FC<SearchBarProps> = ({ state }) => {
  return (
    <div className={style.container}>
      <img src={searchIcon} alt="search icon" />
      <input className={style.input} {...state} placeholder="Место, адрес..." />
    </div>
  )
}

export default SearchBar
