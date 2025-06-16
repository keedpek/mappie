import nature from '@/assets/filters/nature.svg'
import culture from '@/assets/filters/culture.svg'
import history from '@/assets/filters/history.svg'
import religion from '@/assets/filters/religion.svg'
import architecture from '@/assets/filters/arcitecture.svg'
import industry from '@/assets/filters/industry.svg'
import entertainment from '@/assets/filters/entertainment.svg'
import sport from '@/assets/filters/sport.svg'
import car from '@/assets/filters/car.svg'
import gasStation from '@/assets/filters/gasStation.svg'
import bicycle from '@/assets/filters/bicycle.svg'
import shop from '@/assets/filters/shop.svg'
import food from '@/assets/filters/food.svg'
import coffee from '@/assets/filters/coffee.svg'
import bank from '@/assets/filters/bank.svg'
import bed from '@/assets/filters/bed.svg'
import other from '@/assets/filters/other.svg'
import Filter from '@/types/Filter'

export const filters: Filter[] = [
  {
    id: 'Nature',
    title: 'Природа',
    icon: nature,
  },
  {
    id: 'Culture',
    title: 'Культура',
    icon: culture,
  },
  {
    id: 'History',
    title: 'История',
    icon: history,
  },
  {
    id: 'Religion',
    title: 'Религия',
    icon: religion,
  },
  {
    id: 'Architecture',
    title: 'Архитектура',
    icon: architecture,
  },
  {
    id: 'Industry',
    title: 'Индустриальные объекты',
    icon: industry,
  },
  {
    id: 'Other',
    title: 'Разное',
    icon: other,
  },
  {
    id: 'Entertainment',
    title: 'Развлечения',
    icon: entertainment,
  },
  {
    id: 'Sport',
    title: 'Спорт',
    icon: sport,
  },
  {
    id: 'Car',
    title: 'Авто',
    icon: car,
  },
  {
    id: 'GasStation',
    title: 'Заправки',
    icon: gasStation,
  },
  {
    id: 'Bicycle',
    title: 'Велосипеды',
    icon: bicycle,
  },
  {
    id: 'Shop',
    title: 'Магазины',
    icon: shop,
  },
  {
    id: 'Food',
    title: 'Еда',
    icon: food,
  },
  {
    id: 'Coffee',
    title: 'Кофе',
    icon: coffee,
  },
  {
    id: 'Bank',
    title: 'Банки',
    icon: bank,
  },
  {
    id: 'Bed',
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
