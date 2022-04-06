import { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

import { GeoLocation } from 'api/types';
import { GetGeoLocation } from 'components/Map/GetGeoLocation';
import { MapWeatherImages } from 'components/MapWeatherImages';
import { SearchLocation } from 'components/SearchLocation';

export function CurrentWeatherPage() {
  const [currentLocation, setCurrentLocation] = useState<GeoLocation | null>(null);
  const [location, setLocation] = useState<GeoLocation | null>(null);

  return (
    <Flex mt={5}>
      <Box width="50%">
        <Flex h="50px" justify="space-evenly" align="center">
          <Text fontSize="lg">Current location</Text>

          <GetGeoLocation setCurrentLocation={setCurrentLocation} />
        </Flex>

        <Box
          pr={5}
          borderRight="2px"
          borderColor="gray.100"
          h="90%"
          className="map-weather-images-container"
        >
          <MapWeatherImages location={currentLocation} />
        </Box>
      </Box>

      <Box width="50%">
        <Box h="50px">
          <SearchLocation updateLocation={setLocation} />
        </Box>

        <MapWeatherImages location={location} />
      </Box>
    </Flex>
  );
}
