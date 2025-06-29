import architecture from '@/assets/filters/arcitecture.svg'
import bank from '@/assets/filters/bank.svg'
import bed from '@/assets/filters/bed.svg'
import bicycle from '@/assets/filters/bicycle.svg'
import car from '@/assets/filters/car.svg'
import coffee from '@/assets/filters/coffee.svg'
import culture from '@/assets/filters/culture.svg'
import entertainment from '@/assets/filters/entertainment.svg'
import food from '@/assets/filters/food.svg'
import gasStation from '@/assets/filters/gasStation.svg'
import history from '@/assets/filters/history.svg'
import industry from '@/assets/filters/industry.svg'
import nature from '@/assets/filters/nature.svg'
import other from '@/assets/filters/other.svg'
import religion from '@/assets/filters/religion.svg'
import shop from '@/assets/filters/shop.svg'
import sport from '@/assets/filters/sport.svg'
import { IFilter } from '@/types/IFilter'

export const filters: IFilter[] = [
  {
    id: 'Nature',
    overpassCategories: [
      'tourism=nature_reserve',
      'leisure=park',
      'natural=water',
      'natural=peak',
    ],
    title: 'Природа',
    icon: nature,
  },
  {
    id: 'Culture',
    overpassCategories: [
      'tourism=museum',
      'tourism=gallery',
      'tourism=arts_centre',
    ],
    title: 'Культура',
    icon: culture,
  },
  {
    id: 'History',
    overpassCategories: [
      'historic=monument',
      'historic=memorial',
      'historic=castle',
      'historic=ruins',
    ],
    title: 'История',
    icon: history,
  },
  {
    id: 'Religion',
    overpassCategories: ['amenity=place_of_worship'],
    title: 'Религия',
    icon: religion,
  },
  {
    id: 'Architecture',
    overpassCategories: ['tourism=landmark', 'building=yes'],
    title: 'Архитектура',
    icon: architecture,
  },
  {
    id: 'Industry',
    overpassCategories: ['historic=industrial', 'man_made=tower'],
    title: 'Индустриальные объекты',
    icon: industry,
  },
  {
    id: 'Other',
    overpassCategories: ['amenity=bench', 'amenity=toilets', 'amenity=shelter'],
    title: 'Разное',
    icon: other,
  },
  {
    id: 'Entertainment',
    overpassCategories: [
      'tourism=theme_park',
      'tourism=zoo',
      'tourism=aquarium',
    ],
    title: 'Развлечения',
    icon: entertainment,
  },
  {
    id: 'Sport',
    overpassCategories: [
      'tourism=theme_park',
      'tourism=zoo',
      'tourism=aquarium',
    ],
    title: 'Спорт',
    icon: sport,
  },
  {
    id: 'Car',
    overpassCategories: ['amenity=parking', 'amenity=car_rental'],
    title: 'Авто',
    icon: car,
  },
  {
    id: 'GasStation',
    overpassCategories: ['amenity=fuel'],
    title: 'Заправки',
    icon: gasStation,
  },
  {
    id: 'Bicycle',
    overpassCategories: ['amenity=bicycle_rental', 'amenity=bicycle_parking'],
    title: 'Велосипеды',
    icon: bicycle,
  },
  {
    id: 'Shop',
    overpassCategories: ['shop'],
    title: 'Магазины',
    icon: shop,
  },
  {
    id: 'Food',
    overpassCategories: ['amenity=restaurant', 'amenity=fast_food'],
    title: 'Еда',
    icon: food,
  },
  {
    id: 'Coffee',
    overpassCategories: ['amenity=cafe'],
    title: 'Кофе',
    icon: coffee,
  },
  {
    id: 'Bank',
    overpassCategories: ['amenity=bank', 'amenity=atm'],
    title: 'Банки',
    icon: bank,
  },
  {
    id: 'Bed',
    overpassCategories: ['amenity=hotel', 'amenity=hostel'],
    title: 'Место для сна',
    icon: bed,
  },
]

export const icons = {
  nature: nature,
  culture: culture,
  history: history,
  religion: religion,
  architecture: architecture,
  industry: industry,
  entertainment: entertainment,
  sport: sport,
  car: car,
  gasStation: gasStation,
  bicycle: bicycle,
  shop: shop,
  food: food,
  coffee: coffee,
  bank: bank,
  bed: bed,
  other: other,
}
