import { useState } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

import { GeoLocation } from '../../api/types';
import { GetGeoLocation } from '../Map/GetGeoLocation';
import { MapWeatherImages } from '../MapWeatherImages';
import { SearchLocation } from '../SearchLocation';

export function ShowWeather() {
  const [currentLocation, setCurrentLocation] = useState<GeoLocation | null>(null);
  const [location, setLocation] = useState<GeoLocation | null>(null);

  return (
    <Flex>
      <Box width="50%">
        <Flex>
          <GetGeoLocation setCurrentLocation={setCurrentLocation} />
          <Button
            colorScheme="blue"
            width="200px"
            onClick={() => setCurrentLocation(currentLocation)}
          >
            <Text fontSize="lg">Current location</Text>
          </Button>
        </Flex>

        <MapWeatherImages location={currentLocation} />
      </Box>

      <Box width="50%">
        <SearchLocation updateLocation={setLocation} />

        <MapWeatherImages location={location} />
      </Box>
    </Flex>
  );
}
