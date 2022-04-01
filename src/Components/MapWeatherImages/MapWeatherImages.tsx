import { Box, Flex } from '@chakra-ui/react';
import { GeoLocation } from '../../api/types';
import { CarrouselImages } from '../CarrouselImages';
import { MapLocation } from '../Map/MapLocation';
import { Weather } from '../Weather';

interface MapWeatherImagesProps {
  location: GeoLocation | null;
}

export function MapWeatherImages({ location }: MapWeatherImagesProps) {
  if (!location) {
    return null;
  }

  return (
    <Box mx={5} mt={5}>
      <Flex mb={5}>
        <Box w="70%">
          <MapLocation location={location} />
        </Box>
        <Flex w="30%" justifyContent="center" alignItems="center" ml={5}>
          <Weather location={location} />
        </Flex>
      </Flex>
      <Box h="400px">
        <CarrouselImages location={location} />
      </Box>
    </Box>
  );
}
