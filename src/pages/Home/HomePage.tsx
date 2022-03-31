import React from 'react';
import { Flex, Button, Text } from '@chakra-ui/react';
import useGeolocation from 'react-navigator-geolocation';
import { MapCurrentLocation } from '../../Components/Map/CurrentLocation';
import { Weather } from '../../Components/Weather';

function HomePage() {
  const { isAvailable, isEnabled, coords, suppressRequest } = useGeolocation({
    suppressOnMount: false,
    positionOptions: { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 }
  });

  if (!isAvailable) {
    // Your browser doesn't support Geolocation API
    return null;
  }

  if (!isEnabled) {
    return (
      <Flex className="HomePage" direction="column">
        <Button colorScheme="blue" width="200px" onClick={() => suppressRequest(false)}>
          <Text fontSize="lg">Get current location</Text>
        </Button>
      </Flex>
    );
  }

  return (
    <Flex>
      <MapCurrentLocation lat={coords?.latitude!} lng={coords?.longitude!} />
      <Weather lat={coords?.latitude!} lng={coords?.longitude!} />
    </Flex>
  );
}

export default HomePage;
