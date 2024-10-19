export interface CityProps {
  id: string;
  name: string;
  type: string;
  state_acronym: string;
  state_name: string;
  region_imediate: string;
  region_intermediate: string;
  region: string;
  lat: string;
  lon: string;
  neighborhood: {
    name: string;
    lat: string;
    lon: string;
  }[];
  reviewsCount: number;
}