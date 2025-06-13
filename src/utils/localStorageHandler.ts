import PlaceObj from '@/types/PlaceObj'
import mock from '@/constants/mock'

export const getFromStorage = (): PlaceObj[] => {
  return JSON.parse(localStorage.getItem('favouritePlaces'))
}

export const addFavouritePlaceToStorage = (place: PlaceObj) => {
  const storedPlaces = getFromStorage()
  localStorage.setItem(
    'favouritePlaces',
    JSON.stringify([...storedPlaces, place])
  )
}

export const removePlaceFromStorage = (place: PlaceObj) => {
  const storedPlaces = getFromStorage()
  localStorage.setItem(
    'favouritePlaces',
    JSON.stringify(storedPlaces.filter((stPlase) => stPlase.id !== place.id))
  )
}

export const setMock = () => {
  localStorage.setItem('favouritePlaces', JSON.stringify(mock))
}
