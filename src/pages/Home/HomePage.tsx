import React from 'react';
import { Flex, Button, Text, Box } from '@chakra-ui/react';
import useGeolocation from 'react-navigator-geolocation';

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
    <Box>
      <Text fontSize="2xl">Coordinates granted</Text>
      <Text fontSize="xl">{`${coords?.latitude}, ${coords?.longitude}`}</Text>
    </Box>
  );
}

export default HomePage;
