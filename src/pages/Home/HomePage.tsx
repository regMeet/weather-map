import { useState } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

import { MapLocation } from '../../Components/Map/MapLocation';
import { Weather } from '../../Components/Weather';
import { SearchLocation } from '../../Components/SearchLocation';
import { GetGeoLocation } from '../../Components/Map/GetGeoLocation';
import { GeoLocation } from '../../api/types';

export function HomePage() {
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

        {currentLocation && (
          <Flex>
            <MapLocation location={currentLocation} />
            <Weather location={currentLocation} />
          </Flex>
        )}
      </Box>

      <Box width="50%">
        {/* z-index not working */}
        <Box zIndex={50}>
          <SearchLocation updateLocation={setLocation} />
        </Box>

        {location && (
          <Flex zIndex={1}>
            <MapLocation location={location} updateLocation={setLocation} draggable />
            <Weather location={location} />
          </Flex>
        )}
      </Box>
    </Flex>
  );
}
