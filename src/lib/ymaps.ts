import React from 'react'
import ReactDom from 'react-dom'

const [ymaps3React] = await Promise.all([
  ymaps3.import('@yandex/ymaps3-reactify'),
  ymaps3.ready.then(() => {
    ymaps3.import.registerCdn(
      'https://cdn.jsdelivr.net/npm/{package}',
      '@yandex/ymaps3-default-ui-theme@0.0'
    )
    ymaps3
      .getDefaultConfig()
      .setApikeys({ router: import.meta.env.VITE_YMAP_API_KEY })
  }),
])

export const reactify = ymaps3React.reactify.bindTo(React, ReactDom)
export const {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapMarker,
  YMapFeature,
  YMapControls,
  YMapControl,
} = reactify.module(ymaps3)
