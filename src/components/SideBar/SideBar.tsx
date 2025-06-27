import { FC } from 'react'

import {
  bookmarkOff,
  bookmarkOn,
  logIn,
  mappieLogo,
  searchbtnOff,
  searchbtnOn,
} from '@/constants/icons'
import { useAppSelector } from '@/utils/hooks/reduxHooks'
import { useAuth } from '@/utils/hooks/useAuth'
import { useTabToggle } from '@/utils/hooks/useTabToggle'
import { useToast } from '@/utils/hooks/useToast'

import style from './SideBar.module.css'

const SideBar: FC = () => {
  const activeTab = useAppSelector((store) => store.navigation.activeTab)
  const tabToggle = useTabToggle()
  const { logout } = useAuth()
  const { addToast } = useToast()

  const handleLogoutClick = async () => {
    try {
      logout()
    } catch (error) {
      addToast(error.message, 'error')
    }
  }

  const handleSearchClick = () => {
    tabToggle('search')
  }

  const handleFavouritesClick = () => {
    tabToggle('favourites')
  }

  return (
    <aside className={style.container}>
      <div className={style.logoContainer}>
        <img className={style.logo} src={mappieLogo} alt="mappie" />
      </div>

      <nav className={style.menuContainer}>
        <ul className={style.menu}>
          <li>
            <button
              className={`${style.btn} ${style.search} ${activeTab === 'search' && style.active}`}
              onClick={handleSearchClick}
            >
              <img
                src={activeTab === 'search' ? searchbtnOn : searchbtnOff}
                alt="search"
              />
            </button>
          </li>
          <li>
            <button
              className={`${style.btn} ${style.favourites} ${activeTab === 'favourites' && style.active}`}
              onClick={handleFavouritesClick}
            >
              <img
                src={activeTab === 'favourites' ? bookmarkOn : bookmarkOff}
                alt="favourites"
              />
            </button>
          </li>
        </ul>
      </nav>
      <button className={style.loginBtn} onClick={handleLogoutClick}>
        <img src={logIn} alt="login" />
      </button>
    </aside>
  )
}

export default SideBar
