interface BaseSuggestion {
  value: string;
  data: number;
  g: string;
  id_user: number;
  lat: number;
  lon: number;
  type: string;
}
interface Place {
  id: number;
  lat: number;
  lon: number;
  name: string;
  country: string;
  countryCode: string;
}
