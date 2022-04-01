import { axiosClient } from '.';

const API_URL = 'https://api.unsplash.com/search/photos';

// search endpoint
export const getPhotosFromLocation = async (location) => {
  const response = await axiosClient
    .get(API_URL, {
      params: {
        query: location,
        client_id: 'w4VWNIZr3jwbhU960W0T3swh30KUiH7oGRLOaBXQ0og',
        per_page: 5
      }
    })
    .then(({ data }) => data);

  const photos = response.results.map((item) => ({ photoUrl: item.urls?.raw, id: item.id }));

  return photos;
};

export const getPhotoFromLocation = async (location) => {
  const photos = await getPhotosFromLocation(location);

  return photos[0];
};

// TODO: use random endpoint
// https://unsplash.com/documentation#get-a-random-photo
export const getRandomPhotoFromLocation = async (location) => {
  const photos = await getPhotosFromLocation(location);

  return photos[Math.floor(Math.random() * photos.length)];
};
