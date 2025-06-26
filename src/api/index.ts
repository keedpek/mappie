import axios from 'axios'

export const $overpass = axios.create({
  baseURL: `https://overpass-api.de/api`,
})

export const $yandexGeocoder = axios.create({
  baseURL: 'https://geocode-maps.yandex.ru/1.x',
})

export const $OSRM = axios.create({
  baseURL: 'https://router.project-osrm.org/route/v1',
})
