interface CoastType {
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
}

interface WGModeltype {
  hr_end: number;
  hr_start: number;
  hr_step: number;
  id_model: number;
  initdate: string;
  initstamp: number;
  lat: number[];
  lon: number[];
  maps: boolean;
  model: string;
  model_longname: string;
  model_name: string;
  priority: number;
  pro: boolean;
  resolution: number;
  resolution_real: number;
  rundef: string;
  runs: number[];
  wave: boolean;
}

export interface Forecast3data {
  alt: number;
  coast: CoastType;
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
    TCDC: Array<number | null>;
    TMP: number[];
    TMPE: number[];
    WINDDIR: number[];
    WINDSPD: number[];
    dsrc: string;
    hours: number[];
    id_model: number;
    img_var_map: any[];
    init_d: string;
    init_dm: string;
    init_h: string;
    initdate: string;
    initstamp: number;
    initstr: string;
    model_longname: string;
    model_name: string;
    update_last: string;
    update_next: string;
    vars: string[];
  };
  fcst_land: any;
  id_model: number;
  id_spot: number;
  lat: number;
  levels: number;
  lon: number;
  md5chk: string;
  model: string;
  model_alt: number;
  sunrise: string;
  sunset: string;
  wgmodel: WGModeltype;
}
export interface Forecast84data {
  alt: number;
  coast: CoastType;
  default_vars: {
    [key: string]: string[];
  };
  fcst: {
    DIRPW: number[];
    HTSGW: number[];
    PERPW: number[];
    SWDIR1: number[];
    SWDIR2: number[];
    SWELL1: number[];
    SWELL2: number[];
    SWPER1: number[];
    SWPER2: number[];
    WVDIR: number[];
    WVHGT: number[];
    WVPER: number[];
    dsrc: string;
    hours: number[];
    id_model: number;
    img_var_map: any[];
    init_d: string;
    init_dm: string;
    init_h: string;
    initdate: string;
    initstamp: number;
    initstr: string;
    model_longname: string;
    model_name: string;
    update_last: string;
    update_next: string;
    vars: string[];
  };
  fcst_land: any;
  id_model: number;
  id_spot: number;
  lat: number;
  levels: number;
  lon: number;
  md5chk: string;
  model: string;
  model_alt: number;
  sunrise: string;
  sunset: string;
  wgmodel: WGModeltype;
}

export interface ForecastHourData {
  GUST: number;
  hour: number;
  id: string;
  SWELLDIR: number;
  SWELLHGT: number;
  SWELLPER: number;
  WINDDIR: number;
  WINDSPD: number;
}

export interface ForecastDayData {
  date: string;
  id: string;
  data: ForecastHourData[];
}
