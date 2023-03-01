import { ItemSelect, Location } from "../types";
import { mockData } from "./mockData";

const filterCities = (inputValue: string) => {
  const mockedOptions: ItemSelect[] = mockData.map((item) => {
    return {
      value: item[0],
      label: item[0],
      lat: item[1],
      lon: item[2],
    };
  }) as ItemSelect[];

  return mockedOptions.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

export const fetchCity = async (inputValue: string): Promise<ItemSelect[]> =>
  new Promise((resolve) =>
    setTimeout(() => resolve(filterCities(inputValue)), 1000)
  );

export const distanceBetweenTwoCities = async (
  city1: string,
  city2: string
): Promise<number> =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve(calculateDistanceBetweenTwoCities(city1, city2)),
      1000
    )
  );

export const calculateDistanceBetweenTwoCities = (
  city1: string,
  city2: string
) => {
  const locations: Record<string, { lat: number; lon: number }> = {};

  mockData.forEach((location: Location) => {
    const [city, lat, lon] = location;

    locations[city] = { lat, lon };
  });

  const city1Coords = locations[city1];
  const city2Coords = locations[city2];

  if (!city1Coords || !city2Coords) {
    throw new Error("City not found");
  }

  return calculateDistance(
    city1Coords.lat,
    city1Coords.lon,
    city2Coords.lat,
    city2Coords.lon
  );
};

function calculateDistance(
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
