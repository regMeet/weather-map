import GoogleMap, { Coords } from 'google-map-react';
import { Box, Flex, Text } from '@chakra-ui/react';

interface MarkerProps extends Coords {
  text: string;
}

const Marker = ({ text }: MarkerProps) => (
  <Flex>
    <Box bg="tomato" borderRadius="10px">
      <Text fontSize="xl">{text}</Text>
    </Box>
  </Flex>
);

interface MapProps {
  lat: number;
  lng: number;
  locations?: MarkerProps[];
}

// TODO: pass default values
export function MapCurrentLocation({ lat, lng, locations = [] }: MapProps) {
  return (
    // Important! Always set the container height explicitly
    <Box w="500px" h="500px">
      <div style={{ width: '100%', height: '100%' }}>
        <GoogleMap
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY! }}
          defaultCenter={{ lat, lng }}
          defaultZoom={12}
        >
          <Marker lat={lat} lng={lng} text="A place" />
          {locations?.map((coords) => (
            <Marker lat={coords.lat} lng={coords.lng} text={coords.text} />
          ))}
        </GoogleMap>
      </div>
    </Box>
  );
}
