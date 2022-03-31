import { useEffect, useState } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

import { MapLocation } from '../../Components/Map/MapLocation';
import { Weather } from '../../Components/Weather';
import { GetGeoLocation } from '../../Components/Map/GetGeoLocation';

interface Location {
  lat: number;
  lng: number;
}

export function HomePage() {
  const [location, setLocation] = useState<Location | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);

  useEffect(() => {
    if (currentLocation) {
      setLocation(currentLocation);
    }
  }, [currentLocation]);

  if (!location) {
    return <GetGeoLocation updateLocation={setCurrentLocation} />;
  }

  const { lat, lng } = location;

  // show current location
  // search location

  // show current weather
  // show forecast weather

  return (
    <Box>
      <Button colorScheme="blue" width="200px" onClick={() => setLocation(currentLocation)}>
        <Text fontSize="lg">Current location</Text>
      </Button>

      <Flex>
        <MapLocation lat={lat} lng={lng} updateLocation={setLocation} />
        <Weather lat={lat} lng={lng} />
      </Flex>
    </Box>
  );
}
