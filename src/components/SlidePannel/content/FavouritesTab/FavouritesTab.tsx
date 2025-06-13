import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/utils/hooks/reduxHooks'
import FavouritesList from './FavouritesList/FavouritesList'
import SelectedPlaceCard from './SelectedPlaceCard/SelectedPlaceCard'
import { getFromStorage } from '@/utils/localStorageHandler'
import { setFavouritePlaces } from '@/store/slices/favouritesSlice'

const FavouritesTab: FC = () => {
  const selectedPlace = useAppSelector(
    (store) => store.navigation.selectedPlace
  )
  const favPlaces = useAppSelector((store) => store.favourites.favouritePlaces)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const stored = getFromStorage()
    dispatch(setFavouritePlaces(stored))
  }, [])

  if (selectedPlace) {
    return <SelectedPlaceCard placeInfo={selectedPlace} />
  } else {
    return <FavouritesList places={favPlaces} />
  }
}

export default FavouritesTab
