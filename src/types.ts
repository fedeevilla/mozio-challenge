export interface ItemSelect {
  id: string;
  value: string;
  label: string;
  lat: number;
  lon: number;
}

export type Location = [string, number, number];

export type Distance = {
  city: string;
  distance: number;
};
