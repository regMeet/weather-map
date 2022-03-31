import { axiosClient } from '.';
import { GeoLocation } from './types';

const API_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

export const getLocationFromCoords = async ({ lat, lng }: GeoLocation) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const response = await axiosClient
    .get(`${API_URL}/${lng},${lat}.json`, {
      params: {
        types: 'place',
        access_token: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
      }
    })
    .then(({ data }) => data.features[0]);

  return response.place_name;
};

// TODO: Check autocomplete results
// check types of places: country, region, postcode, district, place, locality,
// neighborhood, address, and poi
export const getLocations = async (searchQuery: string) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const places = await axiosClient
    .get(`${API_URL}/${searchQuery}.json`, {
      params: {
        types: 'place',
        access_token: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
      }
    })
    .then(({ data }) => data.features);

  const locations = places.map(({ place_name, center }) => ({
    id: place_name,
    name: place_name,
    lat: center[1],
    lng: center[0]
  }));

  return locations;
};
