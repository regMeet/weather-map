import { useState, useCallback } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import type { MarkerDragEvent, LngLat } from 'react-map-gl';
import { Box } from '@chakra-ui/react';

import ControlPanel from './ControlPanel';
import Pin from '../Pin';

interface MapProps {
  lat: number;
  lng: number;
}

export function MapCurrentLocation({ lat, lng }: MapProps) {
  const viewPort = {
    latitude: lat,
    longitude: lng,
    zoom: 14
  };

  const [marker, setMarker] = useState({
    latitude: lat,
    longitude: lng
  });

  const [events, logEvents] = useState<Record<string, LngLat>>({});

  const onMarkerDragStart = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDragStart: event.lngLat }));
  }, []);

  const onMarkerDrag = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDrag: event.lngLat }));

    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat
    });
  }, []);

  const onMarkerDragEnd = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
  }, []);

  return (
    <Box w="500px" h="500px">
      <Map initialViewState={viewPort} mapStyle="mapbox://styles/mapbox/dark-v9">
        <Marker
          latitude={marker.latitude}
          longitude={marker.longitude}
          anchor="bottom"
          draggable
          onDragStart={onMarkerDragStart}
          onDrag={onMarkerDrag}
          onDragEnd={onMarkerDragEnd}
        >
          <Pin size={20} />
        </Marker>

        <NavigationControl />
      </Map>
      <ControlPanel events={events} />
    </Box>
  );
}
