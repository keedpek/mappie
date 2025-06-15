import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/utils/hooks/reduxHooks'
import FavouritesList from './FavouritesList/FavouritesList'
import SelectedPlaceCard from './SelectedPlaceCard/SelectedPlaceCard'
import { getUserStoredFavourites } from '@/utils/localStorageHandler'
import { setFavouritePlaces } from '@/store/slices/favouritesSlice'
import PlaceObj from '@/types/PlaceObj'

const FavouritesTab: FC = () => {
  const selectedPlace = useAppSelector(
    (store) => store.navigation.selectedPlace
  )
  const favPlaces = useAppSelector((store) => store.favourites.favouritePlaces)
  const dispatch = useAppDispatch()
  const user = useAppSelector((store) => store.user.email)

  useEffect(() => {
    let stored: PlaceObj[] = []
    if (user) {
      stored = getUserStoredFavourites(user)
    }
    dispatch(setFavouritePlaces(stored))
  }, [dispatch, user])

  if (selectedPlace) {
    return <SelectedPlaceCard placeInfo={selectedPlace} />
  } else {
    return <FavouritesList places={favPlaces} />
  }
}

export default FavouritesTab
