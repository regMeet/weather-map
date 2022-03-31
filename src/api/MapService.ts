import { axiosClient } from '.';

const API_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/longitude,latitude.json';

export const getLocationFromCoords = async ({ lat, lng }) => {
  const URL = API_URL.replace('longitude', lng).replace('latitude', lat);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const response = await axiosClient
    .get(URL, {
      params: {
        types: 'place',
        access_token: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
      }
    })
    .then(({ data }) => data.features[0]);

  return response.place_name;
};
