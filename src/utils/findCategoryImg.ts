import { Icon } from 'leaflet'

import { filters } from '@/constants/filters'

export const findCategoryImg = (category: string) => {
  const filter = filters.find(({ id }) => id === category)
  return filter ? filter.icon : filters.find((f) => f.id === 'Other').icon
}

export const createLeafletCategoryIcon = (category: string) => {
  return new Icon({
    iconUrl: findCategoryImg(category),
    iconSize: [30, 30],
  })
}
