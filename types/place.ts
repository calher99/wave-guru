import { TAutocompleteDropdownItem } from "react-native-autocomplete-dropdown";

export interface BaseSuggestion {
  value: string;
  data: number;
  g: string;
  id_user: number;
  lat: number;
  lon: number;
  type: string;
}

export interface Place extends BaseSuggestion {
  countryCode?: string;
}
