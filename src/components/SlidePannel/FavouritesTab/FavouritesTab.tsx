import { FC, useEffect } from 'react'

import { setFavouritePlaces } from '@/store/slices/favouritesSlice'
import PlaceObj from '@/types/PlaceObj'
import { useAppDispatch, useAppSelector } from '@/utils/hooks/reduxHooks'
import { getUserStoredFavourites } from '@/utils/localStorageHandler'

import FavouritesList from './FavouritesList/FavouritesList'
import SelectedPlaceCard from './SelectedPlaceCard/SelectedPlaceCard'

const FavouritesTab: FC = () => {
  const selectedPlace = useAppSelector(
    (store) => store.navigation.selectedPlace
  )
  const favPlaces = useAppSelector((store) => store.favourites.favouritePlaces)
  const user = useAppSelector((store) => store.user.email)
  const dispatch = useAppDispatch()

  useEffect(() => {
    let stored: PlaceObj[] = []
    if (user) {
      stored = getUserStoredFavourites(user)
    }
    dispatch(setFavouritePlaces(stored))
  }, [dispatch, user])

  return selectedPlace ? (
    <SelectedPlaceCard
      placeInfo={selectedPlace}
      isFavourite={favPlaces.includes(selectedPlace)}
    />
  ) : (
    <FavouritesList places={favPlaces} />
  )
}

export default FavouritesTab
