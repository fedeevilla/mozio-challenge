export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const radio = 6371;
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(dLon);

  return radio * Math.acos(a);
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}
