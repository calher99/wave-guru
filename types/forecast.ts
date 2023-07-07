export interface ForecastData {
  alt: number;
  coast: {
    coast_direction: number;
    coast_distance: number;
    coast_model_direction: number;
    coast_model_distance: number;
    id_model: number;
    land: number;
    land_land: number;
    land_sea: number;
    latlon_coast: [number, number];
    latlon_land: [number, number];
    latlon_model_coast: [number, number];
    latlon_sea: [number, number];
    resolution: number;
    resolution_hv: [number, number];
    spot_ls: {
      gid: number;
      id: string;
      land: boolean;
      level: number;
      ls_area: number;
      parent_id: number;
      sea: boolean;
      source: string;
    };
    time: number;
  };
  default_vars: {
    [key: string]: string[];
  };
  fcst: {
    APCP: Array<number | null>;
    APCP1: Array<number | null>;
    FLHGT: number[];
    GUST: number[];
    HCDC: Array<number | null>;
    LCDC: Array<number | null>;
    MCDC: Array<number | null>;
    PCPT: number[];
    RH: number[];
    SLHGT: number[];
    SLP: number[];
  };
}
