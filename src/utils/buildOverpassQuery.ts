import { LatLngExpression } from 'leaflet'

export const buildOverpassQuery = (
  searchQuery: string,
  categories: string[],
  radius: number,
  center: LatLngExpression
): string => {
  if (Array.isArray(center)) {
    const [lat, lon] = center
    const categoryQuery = categories.length
      ? `${categories.map((category) => `node[${category}](around:${radius},${lat},${lon});`).join('\n')}`
      : `node["amenity"](around:${radius},${lat},${lon});\n`

    const query = `
    [out:json][timeout:25];
    (
      ${categoryQuery}
    );
    out body;
    > ;
    out skel qt;
    `
    return query
  }
}
