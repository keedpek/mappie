import circle from '@turf/circle'
import { DrawingStyle, LngLat, PolygonGeometry } from '@yandex/ymaps3-types'
import { FC } from 'react'

import { YMapFeature } from '@/lib/ymaps'

interface SearchCircleProps {
  radius: number
  center: LngLat
}

const SearchCircle: FC<SearchCircleProps> = ({ radius, center }) => {
  const CIRCLE_STYLE: DrawingStyle = {
    simplificationRate: 0,
    stroke: [{ color: '#5E7BC753', width: 2, dash: [20, 10] }],
    fill: '#5E7BC73A',
  }

  if (radius) {
    const searchCircle = circle(center, radius, { units: 'meters' })
    return (
      <YMapFeature
        geometry={searchCircle.geometry as PolygonGeometry}
        style={CIRCLE_STYLE}
      />
    )
  }
}

export default SearchCircle
