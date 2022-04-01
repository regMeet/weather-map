import { Box, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { getLocationFromCoords } from '../../api/MapService';

import { getPhotosFromLocation } from '../../api/PhotoService';
import { GeoLocation } from '../../api/types';

interface CarrouselImagesProps {
  location: GeoLocation;
}

export function CarrouselImages({ location: { lat, lng, name } }: CarrouselImagesProps) {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    async function getImages() {
      let location = name;
      if (!name) {
        location = await getLocationFromCoords({ lat, lng });
      }

      const images = await getPhotosFromLocation(location);
      setPhotos(images);
    }
    getImages();
  }, [lat, lng]);

  if (photos.length === 0) {
    return <div>loading photos</div>;
  }

  return (
    <Carousel centerMode centerSlidePercentage={31} infiniteLoop autoPlay interval={2000}>
      {photos.map(({ photoUrl, id }) => (
        <Box key={id} mx={5}>
          <Image src={photoUrl} alt="" objectFit="cover" h="300px" />
        </Box>
      ))}
    </Carousel>
  );
}
