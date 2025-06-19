import { filters } from '@/constants/filters'
import PlaceObj from '@/types/PlaceObj'

export const findCategoryImg = (place: PlaceObj) => {
  const filter = filters.find((filter) => filter.id === place.category)
  return filter ? filter.icon : filters.find((f) => f.id === 'Other').icon
}
