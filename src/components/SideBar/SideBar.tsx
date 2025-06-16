import { FC } from 'react'
import style from './SideBar.module.css'
import {
  bookmarkOff,
  bookmarkOn,
  searchbtnOff,
  searchbtnOn,
  mappieLogo,
  logIn,
} from '@/constants/icons'
import avatarPlaceholder from '@/assets/avatarPlaceholder.png'
import { useAppSelector } from '@/utils/hooks/reduxHooks'
import { useTabToggle } from '@/utils/hooks/useTabToggle'
import { LOGIN_ROUTE } from '@/constants/routes'
import { useNavigate } from 'react-router-dom'

const SideBar: FC = () => {
  const isAuth = useAppSelector((store) => store.user.isAuth)
  const activeTab = useAppSelector((store) => store.navigation.activeTab)
  const tabToggle = useTabToggle()
  const navigate = useNavigate()

  const handleLoginClick = () => {
    navigate(LOGIN_ROUTE)
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
        <img className={style.logo} src={mappieLogo} />
      </div>

      <nav className={style.menuContainer}>
        <ul className={style.menu}>
          <li>
            <button
              className={`${style.btn} ${style.search} ${activeTab === 'search' && style.active}`}
              onClick={handleSearchClick}
            >
              <img src={activeTab === 'search' ? searchbtnOn : searchbtnOff} />
            </button>
          </li>
          <li>
            <button
              className={`${style.btn} ${style.favourites} ${activeTab === 'favourites' && style.active}`}
              onClick={handleFavouritesClick}
            >
              <img
                src={activeTab === 'favourites' ? bookmarkOn : bookmarkOff}
              />
            </button>
          </li>
        </ul>
      </nav>

      {isAuth ? (
        <div className={style.avatarContainer}>
          <img className={style.avatar} src={avatarPlaceholder} />
        </div>
      ) : (
        <button className={style.loginBtn} onClick={handleLoginClick}>
          <img src={logIn} />
        </button>
      )}
    </aside>
  )
}

export default SideBar
