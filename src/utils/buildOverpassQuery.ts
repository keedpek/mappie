export const buildOverpassQuery = (
  searchQuery: string,
  categories: string[],
  radius: number,
  lat: number,
  lon: number
): string => {
  const categoryQuery = categories.length
    ? `${categories.map((category) => `node[${category}](around:${radius},${lon},${lat});`).join('\n')}`
    : `node["amenity"](around:${radius},${lon},${lat});\n`

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
