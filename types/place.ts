export interface BaseSuggestion {
  value: string;
  data: number;
  g?: string;
  id_user?: number;
  lat: number;
  lon: number;
  alt?: number;
  type?: string;
}

export interface Place extends BaseSuggestion {
  countryCode?: string;
  id?: string;
}
