import PlaceObj from '@/types/PlaceObj'
import mock from '@/constants/mock'
import { StoredFavPlaces } from '@/types/StoredFavPlaces'

const STORAGE_KEY = 'favouritePlaces'

export const getAllFromStorage = (): StoredFavPlaces => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY))
  return data ? data : {}
}

export const getUserStoredFavourites = (email: string): PlaceObj[] => {
  return getAllFromStorage()[email] || []
}

export const addFavouritePlaceToStorage = (place: PlaceObj, email: string) => {
  const storedPlaces = getAllFromStorage()
  const userFavourites = getUserStoredFavourites(email)

  if (!userFavourites.some((p) => p.id === place.id)) {
    userFavourites.push(place)
  }

  storedPlaces[email] = userFavourites

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storedPlaces))
}

export const removePlaceFromStorage = (place: PlaceObj, email: string) => {
  const storedPlaces = getAllFromStorage()
  let userFavourites = getUserStoredFavourites(email)
  userFavourites = userFavourites.filter((p) => p.id !== place.id)

  storedPlaces[email] = userFavourites

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storedPlaces))
}

export const setMock = () => {
  localStorage.setItem('favouritePlaces', JSON.stringify(mock))
}
