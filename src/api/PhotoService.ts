import { axiosClient } from '.';

const API_URL = 'https://api.unsplash.com/search/photos';

export const getPhotosFromLocation = async (location) => {
  const response = await axiosClient
    .get(API_URL, {
      params: {
        query: location,
        client_id: 'w4VWNIZr3jwbhU960W0T3swh30KUiH7oGRLOaBXQ0og'
      }
    })
    .then(({ data }) => data);

  const photos = response.results.map((item) => item.urls?.raw);

  return photos;
};

export const getPhotoFromLocation = async (location) => {
  const photos = await getPhotosFromLocation(location);

  return photos[0];
};

export const getRandomPhotoFromLocation = async (location) => {
  const photos = await getPhotosFromLocation(location);

  return photos[Math.floor(Math.random() * photos.length)];
};
