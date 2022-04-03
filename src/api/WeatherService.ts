import { axiosClient } from '.';
import { removeAccents } from '../Components/Util';

const API_URL = 'http://api.openweathermap.org';

interface WeatherServiceProps {
  location?: string;
  lat?: number;
  lng?: number;
}

export const searchWeather = async ({ location, lat, lng }: WeatherServiceProps) => {
  const params = {
    units: 'metric',
    appid: process.env.REACT_APP_WEATHER_API_KEY,
    q: '',
    lat: 0,
    lon: 0
  };

  if (location) {
    params.q = removeAccents(location);
  } else if (lat && lng) {
    params.lat = lat;
    params.lon = lng;
  }

  const response = await axiosClient
    .get(`${API_URL}/data/2.5/weather`, { params })
    .then(({ data }) => data);

  return response;
};

export const searchForecast = async ({ location, lat, lng }: WeatherServiceProps) => {
  const params = {
    units: 'metric',
    appid: process.env.REACT_APP_WEATHER_API_KEY,
    q: '',
    lat: 0,
    lon: 0
  };

  if (location) {
    params.q = location;
  } else if (lat && lng) {
    params.lat = lat;
    params.lon = lng;
  }

  const response = await axiosClient
    .get(`${API_URL}/data/2.5/forecast`, { params })
    .then(({ data }) => data);

  const temps = response.list.map((item) => ({
    date: item.dt,
    temp: item.main.feels_like,
    icon: item.weather[0].icon
  }));

  // const temps = response.list.reduce((filtered, item) => {
  //   if (item.dt_txt.includes('03:00:00')) {
  //     filtered.push({
  //       date: item.dt,
  //       temp: item.main.feels_like,
  //       icon: item.weather[0].icon
  //     });
  //   }
  //   return filtered;
  // }, []);

  return temps;
};
