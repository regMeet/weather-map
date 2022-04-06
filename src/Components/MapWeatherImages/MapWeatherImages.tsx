import { AspectRatio, Box, HStack, VStack } from '@chakra-ui/react';

import { GeoLocation } from 'api/types';
import { CarrouselImages } from 'components/CarrouselImages';
import { MapLocation } from 'components/Map/MapLocation';
import { Weather } from 'components/Weather';

interface MapWeatherImagesProps {
  location: GeoLocation | null;
}

export function MapWeatherImages({ location }: MapWeatherImagesProps) {
  if (!location) {
    return null;
  }

  // TODO: make it responsive
  return (
    <Box mx={5} mt={5} h="100%" className="map-weather-images">
      <HStack mb={5} h="50%" className="map-weather">
        <Box w="70%">
          <AspectRatio ratio={4 / 3} h="100%">
            <MapLocation location={location} />
          </AspectRatio>
        </Box>
        <VStack w="30%" justifyContent="center" alignItems="center" ml={5}>
          <Weather location={location} />
        </VStack>
      </HStack>
      <Box h="50%">
        <CarrouselImages location={location} />
      </Box>
    </Box>
  );
}
