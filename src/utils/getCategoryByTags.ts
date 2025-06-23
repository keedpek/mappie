import { filters } from '@/constants/filters'

export const getCategoryByTags = (tags: Record<string, string>) => {
  for (const filter of filters) {
    for (const category of filter.overpassCategories) {
      const [key, value] = category.split('=')

      if (!value) {
        if (key in tags) {
          return filter.id
        }
      } else {
        if (tags[key] === value) {
          return filter.id
        }
      }
    }
  }
  return 'Other'
}
