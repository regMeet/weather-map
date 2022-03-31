import { useEffect } from 'react';
import { Flex, Button, Text } from '@chakra-ui/react';
import useGeolocation from 'react-navigator-geolocation';

interface GetGeoLocationProps {
  updateLocation: ({ lat, lng }) => void;
}

export function GetGeoLocation({ updateLocation }: GetGeoLocationProps) {
  const { isAvailable, isEnabled, coords, suppressRequest } = useGeolocation({
    suppressOnMount: false,
    positionOptions: { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 }
  });

  useEffect(() => {
    if (coords) {
      updateLocation({ lat: coords.latitude, lng: coords.longitude });
    }
  }, [coords]);

  if (!isAvailable) {
    // Your browser doesn't support Geolocation API
    return null;
  }

  if (!isEnabled) {
    return (
      <Flex className="HomePage" direction="column">
        <Button colorScheme="blue" width="200px" onClick={() => suppressRequest(false)}>
          <Text fontSize="lg">Enable location</Text>
        </Button>
      </Flex>
    );
  }

  return null;
}
