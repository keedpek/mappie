import { FC } from 'react'
import style from './SideBar.module.css'
import bookmarkOff from '@/assets/bookmarkOff.svg'
import bookmarkOn from '@/assets/bookmarkOn.svg'
import searchbtnOff from '@/assets/searchbtnOff.svg'
import searchbtnOn from '@/assets/searchbtnOn.svg'
import logo from '@/assets/mappieLogo.svg'
import avatarPlaceholder from '@/assets/avatarPlaceholder.png'
import logIn from '@/assets/logIn.svg'
import { useAppDispatch, useAppSelector } from '@/utils/hooks/reduxHooks'
import { setActiveTab } from '@/store/slices/navigationSlice'

const SideBar: FC = () => {
  const isAuth = useAppSelector((store) => store.user.isAuth)
  const activeTab = useAppSelector((store) => store.navigation.activeTab)
  const dispatch = useAppDispatch()

  return (
    <aside className={style.container}>
      <div className={style.logoContainer}>
        <img className={style.logo} src={logo} />
      </div>

      <nav className={style.menuContainer}>
        <ul className={style.menu}>
          <li>
            <button
              className={`${style.btn} ${style.search} ${activeTab === 'search' && style.active}`}
              onClick={() => {
                void (activeTab === 'search'
                  ? dispatch(setActiveTab(''))
                  : dispatch(setActiveTab('search')))
              }}
            >
              <img src={activeTab === 'search' ? searchbtnOn : searchbtnOff} />
            </button>
          </li>
          <li>
            <button
              className={`${style.btn} ${style.favourites} ${activeTab === 'favourites' && style.active}`}
              onClick={() => {
                void (activeTab === 'favourites'
                  ? dispatch(setActiveTab(''))
                  : dispatch(setActiveTab('favourites')))
              }}
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
        <button className={style.loginBtn}>
          <img src={logIn} />
        </button>
      )}
    </aside>
  )
}

export default SideBar
