export const loadMap = () => {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')

    script.src = `"https://api-maps.yandex.ru/v3/?apikey=${import.meta.env.VITE_YMAP_API_KEY}&lang=ru_RU`
    script.async = true
    script.onload = () => {
      resolve()
    }
    script.onerror = () => {
      reject(new Error('Failed to load Yandex Maps API'))
    }
    document.head.appendChild(script)
  })
}
